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
import React, { Suspense, useEffect, useState } from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";
import { deleteSection, updateSection } from "../../redux/actions/section";
import { reorder, replaceStr } from "../../util";
import { useLoading, useSection } from "../../redux/state/section";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import KeyboardBackspaceOutlinedIcon from "@material-ui/icons/KeyboardBackspaceOutlined";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { PROJECT_DASHBOARD } from "../../routes/config";
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";
import { getSectionsByBoard } from "../../redux/actions/section";
import socket from "../../socket";
import { startOrCompleteBoard } from "../../redux/actions/board";
import { useAuthenticated } from "../../redux/state/common";
import { useBoard } from "../../redux/state/board";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useParams } from "react-router";
import useStyles from "../styles";
import { getMembers } from "../../util/member";
import SectionsListSkeleton from "../common/skeletons/sectionsList";

const Note = React.lazy(() => import("../Note"));
const NoRecords = React.lazy(() => import("../NoRecords"));
const ResponsiveDialog = React.lazy(() => import("../Dialog"));
const UpdateSection = React.lazy(() => import("./Update"));
const AvatarGroupList = React.lazy(() => import("../common/AvatarGroupList"));
const Timer = React.lazy(() => import("../common/Timer"));

const useLocalStyles = makeStyles((theme: Theme) => ({
  sectionHeader: {
    padding: "5px 15px 5px 15px",
    color: "#071040",
  },
  titleStyle: {
    width: "fit-content",
  },
  sectionGridStyle: {
    border: "2px solid #1e1e58",
    borderRadius: 6,
  },
  sectionStyle: {
    backgroundColor: "#d8d8d833",
    borderRadius: 6,
  },
  listItemStyle: {
    cursor: "pointer",
  },
  startSessionIconStyle: {
    borderRadius: "50%",
    color: "#0fe220",
  },
  buttonOutlinedStartStyle: {
    backgroundColor: "#dbfdde",
    border: "unset",
    "&.MuiButton-outlined:hover": {
      backgroundColor: "#dbfdde",
      border: "unset",
    },
  },
  startSessionTextStyle: {
    color: "#0fe220",
    fontWeight: 600,
  },
  stopSessionIconStyle: {
    borderRadius: "50%",
    color: "#ff0000",
    padding: 3,
    height: 20,
    width: 20,
  },
  buttonOutlinedStopStyle: {
    backgroundColor: "#ffd2d2",
    border: "unset",
    "&.MuiButton-outlined:hover": {
      backgroundColor: "#ffd2d2",
      border: "unset",
    },
  },
  stopSessionTextStyle: {
    color: "#ff0000",
    fontWeight: 600,
  },
  boxStyle: {
    width: "fit-content",
    borderRadius: 6,
    backgroundColor: "#e9e9ec",
  },
  boxTextStyle: {
    padding: "3px 15px 3px 15px",
    color: "#1e1e58",
    fontWeight: 500,
  },
}));

const SectionList = () => {
  const {
    sectionHeader,
    titleStyle,
    sectionStyle,
    listItemStyle,
    startSessionIconStyle,
    buttonOutlinedStartStyle,
    startSessionTextStyle,
    stopSessionIconStyle,
    buttonOutlinedStopStyle,
    stopSessionTextStyle,
    boxStyle,
    boxTextStyle,
    sectionGridStyle,
  } = useLocalStyles();
  const {
    countStyle,
    countTextStyle,
    buttonStyle,
    iconBackStyle,
  } = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { boardId } = useParams<{ boardId: string }>();

  /* Redux hooks */
  const { section } = useSection();
  const { totalSections } = useBoard();
  const { loading } = useLoading();
  const { board } = useBoard();
  const authenticated = useAuthenticated();

  /* Local state */
  const [action, setAction] = useState(false);
  const [selectedSection, setSelectedSection] = useState<{
    [Key: string]: any;
  }>({});
  const [sections, setSections] = useState<Array<{ [Key: string]: any }>>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteDialog, setOpenDeleteDialog] = useState(false);
  const [endSessionDialog, setEndSessionDialog] = useState(false);
  const [sectionInput, setSectionInput] = useState("");
  const [open, setOpen] = useState(false);
  const [boardDetails, setBoardDetails] = useState(board);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  /* React Hooks */
  useEffect(() => {
    setAction(false);
    dispatch(getSectionsByBoard(boardId));
    setAction(true);
    // return () => {
    //   socket.off("move-note-to-section");
    // };
  }, []);

  useEffect(() => {
    if (board?.startedAt) {
      const currentBoard = { ...boardDetails };
      currentBoard.startedAt = board.startedAt;
      setBoardDetails(currentBoard);
    }
    if (board?.startedAt && board?.completedAt) {
      const currentBoard = { ...boardDetails };
      currentBoard.completedAt = board.completedAt;
      setBoardDetails(currentBoard);
    }
    if (!board?.startedAt && !board?.completedAt) {
      setBoardDetails(board);
    }
    setBoardDetails(board);
  }, [board]);

  useEffect(() => {
    /* Update Section Title */
    socket.on("update-section", (updatedSection: { [Key: string]: any }) => {
      if (!updatedSection) {
        return;
      }
      filterLatestSections(updatedSection);
    });
    return () => {
      socket.off("update-section");
    };
  }, [sections]);

  useEffect(() => {
    /* Delete section  */
    socket.on("delete-section", (deletedSection: { [Key: string]: any }) => {
      if (!deletedSection) {
        return;
      }
      filterSections(deletedSection?._id);
    });
    return () => {
      socket.off("delete-section");
    };
  }, [selectedSection, sections]);

  useEffect(() => {
    if (!loading && action && Array.isArray(section)) {
      setSections(section);
      setAction(false);
    }
  }, [action, section, loading]);

  /* Handler functions */
  const editSection = () => {
    setOpen(false);
    setOpenDialog(true);
  };

  const handleDeleteSection = () => {
    setOpen(false);
    setOpenDeleteDialog(true);
  };

  const updateTotalNotes = (sectionId: string, operation: string) => {
    if (!sections) {
      return;
    }
    const newSections: Array<{ [Key: string]: any }> = [...sections];
    const sectionIndex: number = newSections.findIndex(
      (newSection) => newSection._id === sectionId
    );
    const sectionData: { [Key: string]: any } = newSections[sectionIndex];
    sectionData.totalNotes =
      operation === "add"
        ? sectionData.totalNotes + 1
        : sectionData.totalNotes - 1;
    newSections[sectionIndex] = sectionData;
    setSections(newSections);
  };

  const filterSections = (sectionId: string) => {
    if (!sections) {
      return;
    }
    if (sectionId === selectedSection?._id) {
      const filteredSections: Array<{ [Key: string]: any }> = sections.filter(
        (item) => item._id !== sectionId
      );
      setSections(filteredSections);
      setSelectedSection({});
    }
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
    sectionData.title = section.title;
    newSections[sectionIndex] = sectionData;
    setSections(newSections);
    setSelectedSection({});
  };

  const handleSave = () => {
    dispatch(
      updateSection({
        title: sectionInput,
        sectionId: selectedSection?._id,
        projectId: selectedSection?.projectId,
      })
    );
    setOpenDialog(false);
  };

  const handleDelete = () => {
    dispatch(deleteSection(selectedSection?._id));
    setOpenDeleteDialog(false);
  };

  const handleClose = () => {
    if (openDialog) {
      setOpenDialog(false);
    }

    if (deleteDialog) {
      setOpenDeleteDialog(false);
    }

    if (endSessionDialog) {
      setEndSessionDialog(false);
    }
  };

  const renderUpdateDialog = () => {
    return (
      <ResponsiveDialog
        open={openDialog}
        title="Update Section"
        pcta="Update"
        scta="Cancel"
        handleSave={handleSave}
        handleClose={handleClose}
        maxWidth={440}
      >
        <UpdateSection
          value={selectedSection?.title || ""}
          setSectionInput={setSectionInput}
        />
      </ResponsiveDialog>
    );
  };

  const handleEndSession = () => {
    dispatch(
      startOrCompleteBoard("stop", {
        id: boardDetails?._id,
        completedAt: Date.now(),
      })
    );
    handleClose();
  };

  const renderEndSessionDialog = () => {
    return (
      <ResponsiveDialog
        open={endSessionDialog}
        title="End Session"
        pcta="End Session"
        scta="Cancel"
        handleSave={handleEndSession}
        handleClose={handleClose}
        maxWidth={440}
      >
        <Typography variant="h4">
          Are you sure you want to end the session?
        </Typography>
      </ResponsiveDialog>
    );
  };

  const renderDeleteDialog = () => {
    return (
      <Box>
        <ResponsiveDialog
          open={deleteDialog}
          title="Delete Section"
          pcta="Delete"
          scta="Cancel"
          handleSave={handleDelete}
          handleClose={handleClose}
          maxWidth={440}
        >
          <Typography variant="h4">
            Are you sure you want to delete {selectedSection?.title}?
          </Typography>
        </ResponsiveDialog>
      </Box>
    );
  };

  const handleMenuClose = () => {
    setOpen(false);
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
    setOpen(!open);
    setAnchorEl(event.currentTarget);
    setSelectedSection(item);
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
              <MoreHorizIcon />
            </Zoom>
          </IconButton>
        </Tooltip>
        {renderMenu(item)}
      </>
    );
  };

  const handleBack = () => {
    history.push(replaceStr(PROJECT_DASHBOARD, ":projectId", board?.projectId));
  };

  const handleStartSession = () => {
    dispatch(
      startOrCompleteBoard("start", {
        id: boardDetails?._id,
        startedAt: Date.now(),
      })
    );
  };

  const handleStopSession = () => {
    setEndSessionDialog(true);
  };

  const dateDiffInDays = () => {
    // Discard the time and time-zone information.
    const completedDateTime: any = new Date(
      boardDetails?.completedAt
    ).getTime();
    const startDateTime: any = new Date(boardDetails?.startedAt).getTime();

    let milisec_diff = null;
    if (startDateTime < completedDateTime) {
      milisec_diff = completedDateTime - startDateTime;
    } else {
      milisec_diff = startDateTime - completedDateTime;
    }
    const dd = Math.floor(milisec_diff / 1000 / 60 / 60 / 24);
    milisec_diff -= dd * 1000 * 60 * 60 * 24;
    const hh = Math.floor(milisec_diff / 1000 / 60 / 60);
    milisec_diff -= hh * 1000 * 60 * 60;
    const mm = Math.floor(milisec_diff / 1000 / 60);
    milisec_diff -= mm * 1000 * 60;
    const ss = Math.floor(milisec_diff / 1000);
    milisec_diff -= ss * 1000;

    return (
      <Box className={boxStyle}>
        <Typography variant="subtitle1" className={boxTextStyle}>
          Session Completed in{" "}
          {`${dd ? dd + " days" : ""} ${hh ? hh + " hrs" : ""}`} {mm}{" "}
          {mm === 1 ? "min" : "mins"} {ss} secs
        </Typography>
      </Box>
    );
  };

  const reorderNotesList = (
    source: DraggableLocation,
    destination: DraggableLocation
  ) => {
    /* Clone original sections */
    const newSections: Array<{ [Key: string]: any }> = [...sections];
    /* Find source section index */
    const currentIndex: number = sections.findIndex(
      (newSection: { [Key: string]: any }) =>
        newSection?._id === source.droppableId
    );
    /* Find destination section index */
    const nextIndex: number = sections.findIndex(
      (newSection: { [Key: string]: any }) =>
        newSection?._id === destination.droppableId
    );
    /* Find source notes */
    const current: Array<{ [Key: string]: any }> =
      sections[currentIndex]?.notes;
    /* Find destination notes */
    const next: Array<{ [Key: string]: any }> = sections[nextIndex]?.notes;
    /* Find target note */
    const target: { [Key: string]: any } = current[source.index];

    // moving to same list
    if (source.droppableId === destination.droppableId) {
      // console.log("test current", current, currentIndex, sections);
      // console.log("test next", next);
      // console.log("test target", target);
      const reordered: Array<{ [Key: string]: any }> = reorder(
        current,
        source.index,
        destination.index
      );
      // console.log("reordered 1", current);
      // console.log("reordered 2", reordered);
      const section: { [Key: string]: any } = { ...newSections[currentIndex] };
      section.notes = reordered;
      newSections[currentIndex] = section;
      return newSections;
    }

    // moving to different list

    // remove from original
    if (current) {
      current.splice(source.index, 1);
    }

    // insert into next
    if (target) {
      next.splice(destination.index, 0, target);
    }
    const sourceSection: { [Key: string]: any } = sections[currentIndex];
    sourceSection.notes = current;
    newSections[currentIndex] = sourceSection;

    const destinationSection: { [Key: string]: any } = sections[nextIndex];
    destinationSection.notes = next;
    newSections[nextIndex] = destinationSection;

    return newSections;
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
    if (result.type === "COLUMN") {
      const newSections: Array<{ [Key: string]: any }> = reorder(
        sections,
        source.index,
        destination.index
      );
      setSections(newSections);
      return;
    }

    if (result.type === "NOTE") {
      socket.emit("move-note-to-section", {
        noteId: result.draggableId,
        sourceSectionId: source.droppableId,
        destinationSectionId: destination.droppableId,
      });
      const newSections = reorderNotesList(source, destination);
      setSections(newSections);
    }
  };

  return (
    <Suspense fallback={<SectionsListSkeleton />}>
      {/* <Loader enable={loading} /> */}
      {renderDeleteDialog()}
      {renderUpdateDialog()}
      {renderEndSessionDialog()}
      <Grid container spacing={2}>
        <Grid item xl={5} lg={5} md={5} sm={12} xs={12}>
          <Box display="flex">
            <Box mt={1.4}>
              <Typography variant="h2">{boardDetails?.title}</Typography>
            </Box>
            <Tooltip arrow title="Total Sections">
              <Box ml={2} className={countStyle}>
                <Typography color="primary" className={countTextStyle}>
                  {totalSections}
                </Typography>
              </Box>
            </Tooltip>
            {boardDetails?.teams?.length ? (
              <Box ml={2} mt={1.8}>
                <AvatarGroupList dataList={boardDetails?.teams} />
              </Box>
            ) : null}
            {boardDetails?.teams?.length ? (
              <Box ml={2} mt={1.8}>
                <AvatarGroupList dataList={getMembers(boardDetails?.teams)} />
              </Box>
            ) : null}
          </Box>
        </Grid>
        <Grid item xl={7} lg={7} md={7} sm={12} xs={12}>
          <Box
            display="flex"
            justifyContent={
              !boardDetails?.startedAt || !boardDetails?.completedAt
                ? "flex-end"
                : "space-between"
            }
          >
            {boardDetails?.startedAt && !boardDetails?.completedAt ? (
              <Box>
                <Timer
                  startDateTime={boardDetails?.startedAt}
                  interval={1000}
                />
              </Box>
            ) : null}
            {boardDetails?.startedAt && boardDetails?.completedAt ? (
              <Box>{dateDiffInDays()}</Box>
            ) : null}
            <Box>
              {authenticated && boardDetails && !boardDetails.startedAt ? (
                <Box mr={2} className={buttonStyle}>
                  <Button
                    variant="outlined"
                    color="default"
                    className={buttonOutlinedStartStyle}
                    startIcon={
                      <PlayArrowIcon
                        color="primary"
                        className={startSessionIconStyle}
                      />
                    }
                    onClick={() => handleStartSession()}
                  >
                    <Typography className={startSessionTextStyle} variant="h6">
                      Start Session
                    </Typography>
                  </Button>
                </Box>
              ) : null}
              {authenticated &&
              boardDetails?.startedAt &&
              !boardDetails.completedAt ? (
                <Box mx={2} className={buttonStyle}>
                  <Button
                    variant="outlined"
                    color="default"
                    className={buttonOutlinedStopStyle}
                    startIcon={
                      <PauseIcon
                        color="primary"
                        className={stopSessionIconStyle}
                      />
                    }
                    onClick={() => handleStopSession()}
                  >
                    <Typography
                      color="primary"
                      variant="h6"
                      className={stopSessionTextStyle}
                    >
                      End Session
                    </Typography>
                  </Button>
                </Box>
              ) : null}
            </Box>
            {authenticated ? (
              <Box mr={2}>
                <Hidden only={["xl", "lg", "md", "sm"]}>
                  <IconButton
                    size="small"
                    className={iconBackStyle}
                    onClick={() => handleBack()}
                  >
                    <KeyboardBackspaceOutlinedIcon color="primary" />
                  </IconButton>
                </Hidden>
                <Hidden only={["xs"]}>
                  <Box className={buttonStyle}>
                    <Button
                      variant="outlined"
                      color="default"
                      startIcon={
                        <KeyboardBackspaceOutlinedIcon color="primary" />
                      }
                      onClick={() => handleBack()}
                    >
                      <Typography color="primary" variant="subtitle1">
                        Go Back to Boards
                      </Typography>
                    </Button>
                  </Box>
                </Hidden>
              </Box>
            ) : null}
          </Box>
        </Grid>
      </Grid>
      {loading ? <SectionsListSkeleton /> : null}
      {!loading && (
        <DragDropContext onDragEnd={onDragEnd}>
          <List>
            <Droppable
              droppableId="board"
              type="COLUMN"
              direction="horizontal"
              // ignoreContainerClipping={Boolean(containerHeight)}
              // isCombineEnabled={false}
            >
              {(droppableProvided: DroppableProvided) => (
                <div
                  ref={droppableProvided.innerRef}
                  {...droppableProvided.droppableProps}
                >
                  <Grid container spacing={1}>
                    {Array.isArray(sections) &&
                      sections.map(
                        (item: { [Key: string]: any }, index: number) => (
                          <Draggable
                            key={item._id}
                            draggableId={item._id}
                            index={index}
                          >
                            {(
                              draggableProvided: DraggableProvided,
                              draggableSnapshot: DraggableStateSnapshot
                            ) => (
                              <Grid
                                item
                                // key={item._id}
                                xl={3}
                                lg={3}
                                md={4}
                                sm={6}
                                xs={12}
                              >
                                <div
                                  ref={draggableProvided.innerRef}
                                  {...draggableProvided.draggableProps}
                                  {...draggableProvided.dragHandleProps}
                                  // style={getItemStyle(
                                  //   provided.draggableStyle,
                                  //   snapshot.isDragging
                                  // )}
                                  className={`${sectionStyle} ${
                                    draggableSnapshot.isDragging
                                      ? sectionGridStyle
                                      : ""
                                  }`}
                                  data-isDragging={
                                    draggableSnapshot.isDragging &&
                                    !draggableSnapshot.isDropAnimating
                                  }
                                >
                                  <ListItem disableGutters>
                                    <ListItemText
                                      primary={
                                        <Box
                                          display="flex"
                                          justifyContent="space-between"
                                          className={`${titleStyle}`}
                                        >
                                          <Box>
                                            <Tooltip arrow title={item.title}>
                                              <Typography
                                                className={sectionHeader}
                                                variant="h3"
                                              >
                                                {item.title}
                                              </Typography>
                                            </Tooltip>
                                          </Box>
                                          <Box className={countStyle}>
                                            <Tooltip arrow title="Total Notes">
                                              <Typography
                                                color="primary"
                                                className={countTextStyle}
                                              >
                                                {item.totalNotes}
                                              </Typography>
                                            </Tooltip>
                                          </Box>
                                        </Box>
                                      }
                                    />
                                    {authenticated && (
                                      <ListItemSecondaryAction>
                                        {renderMenuAction(item)}
                                      </ListItemSecondaryAction>
                                    )}
                                  </ListItem>
                                  {renderMenu(item)}

                                  <Note
                                    key={item._id}
                                    noteList={item.notes}
                                    sectionId={item._id}
                                    updateTotalNotes={updateTotalNotes}
                                  />
                                </div>
                              </Grid>
                            )}
                          </Draggable>
                        )
                      )}
                  </Grid>
                  {droppableProvided.placeholder}
                </div>
              )}
            </Droppable>
          </List>
        </DragDropContext>
      )}
      {!loading && !sections?.length && (
        <NoRecords message="No Sections found" />
      )}
    </Suspense>
  );
};

export default SectionList;
