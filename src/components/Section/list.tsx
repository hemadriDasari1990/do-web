import {
  DragDropContext,
  Draggable,
  DraggableLocation,
  DraggableProvided,
  DraggableStateSnapshot,
  DropResult,
  Droppable,
  DroppableProvided,
} from "react-beautiful-dnd";
import React, { Suspense, useCallback, useEffect, useState } from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";
import { useBoard, useBoardLoading } from "../../redux/state/board";
import { useLoading, useSection } from "../../redux/state/section";

import Box from "@material-ui/core/Box";
import DeleteIcon from "@material-ui/icons/DeleteForever";
import DoSnackbar from "../Snackbar/components";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import { List } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import PieChartOutlinedIcon from "@material-ui/icons/PieChartOutlined";
import ReactionSummaryDialog from "./Reaction";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";
import formateNumber from "../../util/formateNumber";
import getRandomBGColor from "../../util/getRandomColor";
import { getSectionsByBoard } from "../../redux/actions/section";
import { reorder } from "../../util";
import { useAuthenticated } from "../../redux/state/common";
import { useDispatch } from "react-redux";
import { useLogin } from "../../redux/state/login";
import { useParams } from "react-router";
import { useSocket } from "../../redux/state/socket";

const Note = React.lazy(() => import("../Note"));
const NoRecords = React.lazy(() => import("../NoRecords"));
const ResponsiveDialog = React.lazy(() => import("../Dialog"));
const UpdateSection = React.lazy(() => import("./Update"));

const useLocalStyles = makeStyles((theme: Theme) => ({
  sectionHeader: {
    padding: "5px 15px 5px 15px",
  },
  titleStyle: {
    width: "fit-content",
  },
  sectionStyle: (props: any) => ({
    /* like display:flex but will allow bleeding over the window width */
    display: "flex", // Change this to flex for window scroll
    flexWrap: props?.viewType, // nowrap is row wrap is next line
    overflowX: "auto",
    height: "100%",
    whiteSpace: "nowrap",
  }),
  listItemStyle: {
    cursor: "pointer",
  },
  sectionContainer: {
    margin: 4,
    backgroundColor: "#EBECF0",
    [theme.breakpoints.only("xl")]: {
      minWidth: 440,
      maxWidth: 440,
    },
    [theme.breakpoints.only("lg")]: {
      minWidth: 440,
      maxWidth: 440,
    },
    // "@media (min-width: 1280px)": {
    //   minWidth: 440,
    //   maxWidth: 440,
    // },
    borderRadius: 6,
    display: "inline-block",
    flex: "0 0 272px",
    height: "fit-content",
  },
  sectionHeaderStyle: (props: any) => ({
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  }),
  listStyle: {
    flexGrow: 1,
    position: "absolute",
    top: 43,
    bottom: 0,
  },
}));

const SectionList = (props: any) => {
  const { startSession } = props;
  const {
    sectionHeader,
    titleStyle,
    listItemStyle,
    sectionStyle,
    sectionContainer,
    sectionHeaderStyle,
    listStyle,
  } = useLocalStyles(props);

  const dispatch = useDispatch();

  const { boardId } = useParams<{ boardId: string }>();
  const { socket } = useSocket();

  /* Redux hooks */
  const { section } = useSection();
  const { loading } = useLoading();
  const authenticated = useAuthenticated();
  const { userId } = useLogin();
  const { board } = useBoard();
  const { loading: boardLoading } = useBoardLoading();

  /* Local state */
  const [action, setAction] = useState(false);
  const [selectedSection, setSelectedSection] = useState<any>(null);
  const [sections, setSections] = useState<Array<{ [Key: string]: any }>>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [serverResponse, setServerResponse] = useState<any>(null);
  const [deleteDialog, setOpenDeleteDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openAnalytics, setOpenAnalytics] = useState(false);

  /* React Hooks */
  useEffect(() => {
    setAction(false);
    if (
      (!boardLoading && !board?.isPrivate && !authenticated) ||
      authenticated
    ) {
      dispatch(getSectionsByBoard(boardId));
    }
    setAction(true);
  }, [boardLoading, board]);

  useEffect(() => {
    socket.on(
      `minus-note-count-response`,
      (deleteNote: { [Key: string]: any }) => {
        updateTotalNotes(deleteNote?.sectionId, "substract");
      }
    );

    socket.on(`plus-note-count-response`, (newNote: { [Key: string]: any }) => {
      updateTotalNotes(newNote?.sectionId, "add");
    });

    return () => {
      socket.off(`plus-note-count-response`);
      socket.off(`minus-note-count-response`);
    };
  }, [sections]);

  useEffect(() => {
    /* Update Section Name */
    socket.on(
      `update-section-response`,
      (updatedSection: { [Key: string]: any }) => {
        if (!updatedSection) {
          return;
        }

        filterLatestSections(updatedSection);
      }
    );
    /* Delete section  */
    socket.on(
      `delete-section-response`,
      (deletedSection: { [Key: string]: any }) => {
        if (!deletedSection?.deleted) {
          return;
        }
        filterSections(deletedSection);
      }
    );
    /* Delete section  */
    socket.on(
      `create-section-response`,
      (newSection: { [Key: string]: any }) => {
        if (!newSection?._id && !newSection?.errorId) {
          return;
        }

        if (newSection?.errorId) {
          setServerResponse(newSection);
          return;
        }

        updateSections(newSection);
      }
    );

    /* Update section position */
    socket.on(
      "update-section-position-response",
      (response: { [Key: string]: any }) => {
        if (response?.updated) {
          const newSections: Array<{ [Key: string]: any }> = reorder(
            sections,
            response.sourceIndex,
            response.destinationIndex
          );
          setSections([...newSections]);
        }
      }
    );

    return () => {
      socket.off("update-section-response");
      socket.off("create-section-response");
      socket.off("delete-section-response");
      socket.off("update-section-position-response");
    };
  }, [sections]);

  useEffect(() => {
    if (!loading && action && Array.isArray(section)) {
      setSections(section);
      setAction(false);
    }
  }, [action, section, loading]);

  /* Handler functions */
  const editSection = () => {
    setAnchorEl(null);
    setOpen(false);
    setOpenDialog(true);
  };

  const handleDeleteSection = () => {
    setOpen(false);
    setOpenDeleteDialog(true);
  };

  const updateTotalNotes = useCallback(
    (sectionId: string, operation: string) => {
      if (!sections) {
        return;
      }
      const newSections: Array<{ [Key: string]: any }> = [...sections];
      const sectionIndex: number = newSections.findIndex(
        (newSection) => newSection._id === sectionId
      );
      const sectionData: { [Key: string]: any } = newSections[sectionIndex];
      if (!sectionData) {
        return;
      }
      sectionData.totalNotes =
        operation === "add"
          ? sectionData?.totalNotes + 1
          : sectionData?.totalNotes > 1
          ? sectionData?.totalNotes - 1
          : 0;
      newSections[sectionIndex] = sectionData;
      setSections(newSections);
    },
    [sections]
  );

  const filterSections = (deletedSection: { [Key: string]: any }) => {
    if (!deletedSection || !sections?.length) {
      return;
    }

    const filteredSections: Array<{ [Key: string]: any }> = sections.filter(
      (item) => item._id !== deletedSection?._id
    );
    setSections(filteredSections);
    setSelectedSection(null);
  };

  const updateSections = (newSection: { [Key: string]: any }) => {
    if (!newSection) {
      return;
    }
    setSections([...sections, newSection]);
  };

  const filterLatestSections = (section: { [Key: string]: any }) => {
    if (!section) {
      return;
    }
    const newSections: Array<{ [Key: string]: any }> = [...sections];
    const sectionIndex = newSections.findIndex(
      (s: { [Key: string]: any }) => s._id === section._id
    );
    const sectionData = newSections[sectionIndex];
    if (!sectionData) {
      return;
    }
    sectionData.name = section?.name;
    newSections[sectionIndex] = sectionData;
    setSections(newSections);
    setSelectedSection(null);
  };

  const handleDialogClose = () => {
    setOpenAnalytics(false);
  };

  const renderReactionsummaryDialog = useCallback(() => {
    return (
      <ReactionSummaryDialog
        section={selectedSection}
        handleDialogClose={handleDialogClose}
        openDialog={openAnalytics}
      />
    );
  }, [openAnalytics, selectedSection]);

  const handleMenuClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  const handleViewAnalytics = (section: { [Key: string]: any }) => {
    setOpenAnalytics(true);
    setSelectedSection(section);
  };

  const renderMenu = (item: { [Key: string]: any }) => {
    return (
      <Menu
        id={item._id}
        open={open}
        onClose={handleMenuClose}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        keepMounted
        getContentAnchorEl={null}
        TransitionComponent={Zoom}
      >
        <ListItem
          button={true}
          className={listItemStyle}
          onClick={() => editSection()}
        >
          <ListItemAvatar style={{ minWidth: 35 }}>
            <EditIcon />
          </ListItemAvatar>
          <ListItemText
            primary={<b>Edit Section</b>}
            secondary="Update Section"
          />
        </ListItem>
        <ListItem
          button={true}
          className={listItemStyle}
          onClick={() => handleDeleteSection()}
        >
          <ListItemAvatar style={{ minWidth: 35 }}>
            <DeleteIcon />
          </ListItemAvatar>
          <ListItemText
            primary={<b>Delete Section</b>}
            secondary="Once deleted can't be undone"
          />
        </ListItem>
      </Menu>
    );
  };

  const handleMenu = (
    event: React.MouseEvent<HTMLButtonElement>,
    item: { [Key: string]: any }
  ) => {
    setSelectedSection(item);
    setOpen(!open);
    setAnchorEl(event.currentTarget);
  };

  const renderMenuAction = (item: { [Key: string]: any }) => {
    return (
      <>
        <Tooltip arrow title="Update">
          <IconButton
            id={item?._id}
            size="small"
            aria-label="settings"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
              handleMenu(event, item)
            }
          >
            <Zoom in={true} timeout={2000}>
              <MoreHorizIcon color="secondary" />
            </Zoom>
          </IconButton>
        </Tooltip>
        {renderMenu(item)}
      </>
    );
  };

  const handleDelete = () => {
    socket.emit("delete-section", {
      id: selectedSection?._id,
      boardId: boardId,
    });
    setOpenDeleteDialog(false);
  };

  const renderUpdateDialog = () => {
    return (
      <UpdateSection
        selectedSection={selectedSection}
        openDialog={openDialog}
        handleClose={handleClose}
      />
    );
  };

  const renderDeleteDialog = useCallback(() => {
    return (
      <Box>
        <ResponsiveDialog
          open={deleteDialog}
          title="Delete Section"
          pcta="Delete"
          handleSave={handleDelete}
          handleClose={handleClose}
          maxWidth={440}
        >
          <Typography variant="h5">
            Are you sure you want to delete {selectedSection?.name}?
          </Typography>
        </ResponsiveDialog>
      </Box>
    );
  }, [deleteDialog]);

  const handleClose = () => {
    if (openDialog) {
      setOpenDialog(false);
    }

    if (deleteDialog) {
      setOpenDeleteDialog(false);
    }
  };

  const onDragEnd = (result: DropResult) => {
    // dropped nowhere
    if (!result.destination) {
      return;
    }

    const source: DraggableLocation = result.source;
    const destination: DraggableLocation = result.destination;

    // did not move anywhere - can bail early
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // reordering column
    if (result.type === "SECTION") {
      // if the list is scrolled it looks like there is some strangeness going on
      // with react-window. It looks to be scrolling back to scroll: 0
      const sourceSection: { [Key: string]: any } = sections[source.index];
      const destinationSection: { [Key: string]: any } =
        sections[destination.index];
      socket.emit("update-section-position", {
        sourceSection,
        destinationSection,
        sourceIndex: source.index,
        destinationIndex: destination.index,
      });
      return;
    }

    // reordering in same list
    if (
      result.type === "NOTE" &&
      source.droppableId === destination.droppableId
    ) {
      socket.emit(`update-note-position`, {
        sourceIndex: source.index,
        destinationIndex: destination.index,
        sectionId: source.droppableId,
      });
      return;
    }
    // moving notes between sections
    socket.emit("move-note-to-section", {
      boardId,
      userId,
      noteId: result.draggableId,
      sourceSectionId: source.droppableId,
      destinationSectionId: destination.droppableId,
      source,
      destination,
    });
  };

  const onDragStart = () => {
    // Add a little vibration if the browser supports it.
    // Add's a nice little physical feedback
    if (window.navigator.vibrate) {
      window.navigator.vibrate(100);
    }
  };

  const renderAnalytics = (section: { [Key: string]: any }) => {
    return (
      <Tooltip arrow title="View Reactions Summary" placement="bottom">
        <IconButton
          aria-label="reaction-menu"
          size="small"
          onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
            handleViewAnalytics(section)
          }
        >
          <PieChartOutlinedIcon color="secondary" />
        </IconButton>
      </Tooltip>
    );
  };

  const handleErrorClose = () => {
    setServerResponse({});
  };

  const renderError = () => {
    return (
      <DoSnackbar
        open={serverResponse?.errorId}
        status={"error"}
        handleClose={handleErrorClose}
      >
        <Typography variant="h6" color="secondary">
          {serverResponse?.message}
        </Typography>
      </DoSnackbar>
    );
  };

  return (
    <Suspense fallback={<div />}>
      {/* <Loader enable={loading} /> */}
      {renderError()}
      {renderReactionsummaryDialog()}
      {renderDeleteDialog()}
      {renderUpdateDialog()}
      {!loading && (
        <List className={listStyle} disablePadding>
          <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
            <Droppable
              droppableId="section"
              type="SECTION"
              direction="horizontal"
              ignoreContainerClipping={true}
              isCombineEnabled={false}
            >
              {(droppableProvided: DroppableProvided) => (
                <div
                  ref={droppableProvided.innerRef}
                  {...droppableProvided.droppableProps}
                  className={sectionStyle}
                >
                  {Array.isArray(sections) &&
                    sections.map(
                      (item: { [Key: string]: any }, index: number) => (
                        <Draggable
                          draggableId={item._id}
                          index={index}
                          isDragDisabled={!authenticated && !board?.isInstant}
                          key={item._id}
                        >
                          {(
                            draggableProvided: DraggableProvided,
                            draggableSnapshot: DraggableStateSnapshot
                          ) => (
                            <div
                              ref={draggableProvided.innerRef}
                              {...draggableProvided.draggableProps}
                              className={`${sectionContainer}`}
                            >
                              <ListItem
                                {...draggableProvided.dragHandleProps}
                                is-dragging={draggableSnapshot.isDragging}
                                disableGutters
                                className={`${sectionHeaderStyle}`}
                                style={{
                                  background: getRandomBGColor(index),
                                  position: "relative",
                                }}
                              >
                                <ListItemText
                                  primary={
                                    <Box
                                      display="flex"
                                      justifyContent="space-between"
                                      className={`${titleStyle}`}
                                    >
                                      <Box>
                                        <Typography
                                          className={sectionHeader}
                                          variant="h5"
                                          color="secondary"
                                        >
                                          {item?.name}&nbsp;(
                                          {formateNumber(item?.totalNotes) || 0}
                                          )
                                        </Typography>
                                      </Box>
                                    </Box>
                                  }
                                />
                                <ListItemSecondaryAction>
                                  {item.totalNotes
                                    ? renderAnalytics(item)
                                    : null}
                                  {authenticated || board?.isInstant
                                    ? renderMenuAction(item)
                                    : null}
                                </ListItemSecondaryAction>
                              </ListItem>
                              {renderMenu(item)}
                              <Note
                                sectionIndex={index}
                                startSession={startSession}
                                key={item._id}
                                sectionId={item._id}
                                totalNotes={item.totalNotes}
                              />
                            </div>
                          )}
                        </Draggable>
                      )
                    )}
                  {droppableProvided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </List>
      )}
      {!loading && !sections?.length && (
        <NoRecords message="No Sections found" />
      )}
    </Suspense>
  );
};

export default SectionList;
