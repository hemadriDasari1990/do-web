import {
  DragDropContext,
  Draggable,
  DraggableLocation,
  DraggableProvided,
  DropResult,
  Droppable,
  DroppableProvided,
} from "react-beautiful-dnd";
import React, { Suspense, useCallback, useEffect, useState } from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";
import { useBoard, useBoardLoading } from "../../redux/state/board";
import { useLoading, useSection } from "../../redux/state/section";

import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import { BOARDS } from "../../routes/config";
import BoardHeaderSkeleton from "../common/skeletons/boardHeader";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Invite from "../common/Invite";
import KeyboardBackspaceOutlinedIcon from "@material-ui/icons/KeyboardBackspaceOutlined";
import { List } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import LockIcon from "@material-ui/icons/Lock";
import Menu from "@material-ui/core/Menu";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import PauseIcon from "@material-ui/icons/Pause";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PublicIcon from "@material-ui/icons/Public";
import SectionsListSkeleton from "../common/skeletons/sectionsList";
import Slide from "@material-ui/core/Slide";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import UserAvatar from "../Drawer/Account/userAvatar";
import Visibility from "../common/visibility";
import Zoom from "@material-ui/core/Zoom";
import { addProjectToStore } from "../../redux/actions/project";
import formateNumber from "../../util/formateNumber";
import { getMembers } from "../../util/member";
import { getSectionsByBoard } from "../../redux/actions/section";
// import { deleteSection } from "../../redux/actions/section";
import { reorder } from "../../util";
import socket from "../../socket";
import { useAuthenticated } from "../../redux/state/common";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useLogin } from "../../redux/state/login";
import { useParams } from "react-router";
import useStyles from "../styles";

const PersistentDrawerRight = React.lazy(() => import("../Drawer/DrawerRight"));
const UserAccount = React.lazy(() => import("../Drawer/Account"));
const Note = React.lazy(() => import("../Note"));
const NoRecords = React.lazy(() => import("../NoRecords"));
const ResponsiveDialog = React.lazy(() => import("../Dialog"));
const UpdateSection = React.lazy(() => import("./Update"));
const AvatarGroupList = React.lazy(() => import("../common/AvatarGroupList"));
const Timer = React.lazy(() => import("../common/Timer"));

const useLocalStyles = makeStyles((theme: Theme) => ({
  sectionHeader: {
    padding: "5px 15px 5px 15px",
  },
  titleStyle: {
    width: "fit-content",
  },
  sectionGridStyle: {
    border: "2px solid #172b4d",
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
    backgroundColor: "#0072ff21",
  },
  boxTextStyle: {
    padding: "5px 15px 5px 15px",
    color: "#0072ff",
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
    // sectionGridStyle,
  } = useLocalStyles();
  const { buttonStyle, iconBackStyle } = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { boardId } = useParams<{ boardId: string }>();

  /* Redux hooks */
  const { section } = useSection();
  const { totalSections: totalSectionCount, board } = useBoard();
  const { loading } = useLoading();
  const { loading: boardLoading } = useBoardLoading();
  const authenticated = useAuthenticated();
  const { userId } = useLogin();

  console.log("board", board);
  /* Local state */
  const [action, setAction] = useState(false);
  const [selectedSection, setSelectedSection] = useState<any>(null);
  const [sections, setSections] = useState<Array<{ [Key: string]: any }>>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openAccount, setOpenAccount] = useState(false);
  const [deleteDialog, setOpenDeleteDialog] = useState(false);
  const [endSessionDialog, setEndSessionDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [boardDetails, setBoardDetails] = useState(board);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [totalSections, setTotalSections] = useState(totalSectionCount);
  const [startSession, setStartSession] = useState(false);
  const [openInviteDialog, setOpenInviteDialog] = useState(false);
  const [openChangeVisibilityDialog, setOpenChangeVisibilityDialog] = useState(
    false
  );

  /* React Hooks */
  useEffect(() => {
    setAction(false);
    dispatch(getSectionsByBoard(boardId));
    setAction(true);
  }, []);

  useEffect(() => {
    /* Start session */
    socket.on(
      `start-session-response`,
      (updatedBoard: { [Key: string]: any }) => {
        if (!updatedBoard) {
          return;
        }
        setBoardDetails(updatedBoard);
        setStartSession(true);
      }
    );
    /* End session */
    socket.on(
      `end-session-response`,
      (updatedBoard: { [Key: string]: any }) => {
        if (!updatedBoard) {
          return;
        }
        setBoardDetails(updatedBoard);
      }
    );

    return () => {
      socket.off("start-session-responsee");
      socket.off("end-session-response");
    };
  }, [boardDetails]);

  useEffect(() => {
    socket.on(
      `change-visibility-response`,
      (updated: { [Key: string]: any }) => {
        if (!updated) {
          return;
        }
        const newBoardDetails = { ...boardDetails };
        newBoardDetails.isPrivate = updated?.isPrivate;
        setBoardDetails(newBoardDetails);
        setOpenChangeVisibilityDialog(false);
      }
    );
    return () => {
      socket.off("change-visibility-response");
    };
  }, [openChangeVisibilityDialog]);

  useEffect(() => {
    // if (!board?.startedAt && !board?.completedAt) {
    //   setBoardDetails(board);
    // }
    setBoardDetails(board);
    dispatch(addProjectToStore(board?.project));
  }, [board]);

  useEffect(() => {
    /* Update Section Title */
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
        if (!newSection?._id) {
          return;
        }
        updateSections(newSection);
      }
    );
    return () => {
      socket.off("update-section-response");
      socket.off("create-section-response");
      socket.off("delete-section-response");
    };
  }, [sections]);

  useEffect(() => {
    if (!loading && action && Array.isArray(section)) {
      setSections(section);
      setAction(false);
      setTotalSections(totalSectionCount);
    }
  }, [action, section, loading]);

  /* Handler functions */
  const editSection = () => {
    setOpenDialog(true);
  };

  const handleDeleteSection = () => {
    setOpen(false);
    setOpenDeleteDialog(true);
  };

  const handleAccount = () => {
    setOpenAccount(!openAccount);
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
    if (!sectionData) {
      return;
    }
    sectionData.totalNotes =
      operation === "add"
        ? sectionData?.totalNotes + 1
        : sectionData?.totalNotes >= 1
        ? sectionData?.totalNotes - 1
        : 0;
    newSections[sectionIndex] = sectionData;
    setSections(newSections);
  };

  const filterSections = (deletedSection: { [Key: string]: any }) => {
    if (!deletedSection || !sections?.length) {
      return;
    }

    const filteredSections: Array<{ [Key: string]: any }> = sections.filter(
      (item) => item._id !== deletedSection?._id
    );
    setSections(filteredSections);
    setTotalSections(totalSections - 1);
    setSelectedSection(null);
  };

  const updateSections = (newSection: { [Key: string]: any }) => {
    if (!newSection) {
      return;
    }
    setSections([...sections, newSection]);
    setTotalSections(totalSections + 1);
  };

  const filterLatestSections = (section: { [Key: string]: any }) => {
    if (!selectedSection) {
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
    sectionData.title = section.title;
    newSections[sectionIndex] = sectionData;
    setSections(newSections);
    setSelectedSection(null);
  };

  const handleDelete = () => {
    socket.emit("delete-section", selectedSection?._id);
    setOpenDeleteDialog(false);
  };

  const handleCreateNewSection = () => {
    setOpenDialog(true);
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
      <UpdateSection
        selectedSection={selectedSection}
        openDialog={openDialog}
        handleClose={handleClose}
      />
    );
  };

  const handleEndSession = () => {
    socket.emit("end-session", {
      action: "end",
      id: boardDetails?._id,
      completedAt: Date.now(),
    });
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

  const handleInviteClose = () => {
    setOpenInviteDialog(false);
  };

  const renderInviteMemberDialog = () => {
    return (
      <Invite
        selectedBoard={boardDetails}
        openDialog={openInviteDialog}
        handleClose={handleInviteClose}
      />
    );
  };

  const handleVisibilityClose = () => {
    setOpenChangeVisibilityDialog(false);
  };

  const renderChangeVisibilityDialog = () => {
    return (
      <Visibility
        selectedBoard={boardDetails}
        openDialog={openChangeVisibilityDialog}
        handleClose={handleVisibilityClose}
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
            Are you sure you want to delete {selectedSection?.title}?
          </Typography>
        </ResponsiveDialog>
      </Box>
    );
  }, [deleteDialog]);

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
              <MoreHorizIcon />
            </Zoom>
          </IconButton>
        </Tooltip>
        {renderMenu(item)}
      </>
    );
  };

  const handleBack = () => {
    history.push(BOARDS);
  };

  const handleStartSession = () => {
    socket.emit("start-session", {
      action: "start",
      id: boardDetails?._id,
      startedAt: Date.now(),
    });
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

  const removeDeletedNote = (noteId: string, selectedSectionId: string) => {
    if (!noteId || !sections?.length || !selectedSectionId) {
      return;
    }
    /* Clone original sections */
    const newSections: Array<{ [Key: string]: any }> = [...sections];
    /* Find source section index */
    const currentSectionIndex: number = sections.findIndex(
      (newSection: { [Key: string]: any }) =>
        newSection?._id === selectedSectionId
    );
    /* Find source notes */
    const currentSectionNotes: Array<{ [Key: string]: any }> =
      sections[currentSectionIndex]?.notes;

    const filteredNotes: Array<{
      [Key: string]: any;
    }> = currentSectionNotes.filter(
      (item: { [Key: string]: any }) => item._id !== noteId
    );
    newSections[currentSectionIndex].notes = filteredNotes;
    setSections(newSections);
  };

  const updateNote = (
    newNote: { [Key: string]: any },
    selectedSectionId: string
  ) => {
    if (selectedSectionId !== newNote?.sectionId) {
      return;
    }
    /* Clone original sections */
    const newSections: Array<{ [Key: string]: any }> = [...sections];
    /* Find source section index */
    const currentSectionIndex: number = sections.findIndex(
      (newSection: { [Key: string]: any }) =>
        newSection?._id === selectedSectionId
    );
    /* Find source notes */
    const currentSectionNotes: Array<{ [Key: string]: any }> =
      sections[currentSectionIndex]?.notes;

    const notesList = [...currentSectionNotes];
    const noteIndex = notesList.findIndex(
      (n: { [Key: string]: any }) => n._id === newNote._id
    );
    const noteData = currentSectionNotes[noteIndex];
    if (noteData) {
      noteData.description = newNote.description;
      noteData.updatedBy = newNote.updatedBy;
      noteData.updatedById = newNote.updatedById;
      noteData.isAnnonymous = newNote.isAnnonymous;
      notesList[noteIndex] = noteData;
      newSections[currentSectionIndex].notes = notesList;
    } else {
      newSections[currentSectionIndex].notes = [...notesList, newNote];
    }
    setSections(newSections);
  };

  const addNotes = (
    newNote: { [Key: string]: any },
    selectedSectionId: string
  ) => {
    if (!newNote || selectedSectionId !== newNote?.sectionId) {
      return;
    }
    /* Clone original sections */
    const newSections: Array<{ [Key: string]: any }> = [...sections];
    /* Find source section index */
    const currentSectionIndex: number = sections.findIndex(
      (newSection: { [Key: string]: any }) =>
        newSection?._id === selectedSectionId
    );
    /* Find source notes */
    const currentSectionNotes: Array<{ [Key: string]: any }> =
      sections[currentSectionIndex]?.notes;

    const notesList = [...currentSectionNotes];
    newSections[currentSectionIndex].notes = [...notesList, newNote];
    updateTotalNotes(selectedSectionId, "add");
    setSections(newSections);
  };

  const reorderNotesList = (
    source: DraggableLocation,
    destination: DraggableLocation
  ) => {
    /* Clone original sections */
    const newSections: Array<{ [Key: string]: any }> = [...sections];
    /* Find source section index */
    const currentSectionIndex: number = sections.findIndex(
      (newSection: { [Key: string]: any }) =>
        newSection?._id === source.droppableId
    );
    /* Find source notes */
    const currentSectionNotes: Array<{ [Key: string]: any }> =
      sections[currentSectionIndex]?.notes;
    /* Reorder notes */
    const reorderedNotes = reorder(
      currentSectionNotes,
      source.index,
      destination.index
    );
    newSections[currentSectionIndex].notes = reorderedNotes;
    return newSections;
  };

  const moveNotesBetweenSections = (
    source: DraggableLocation,
    destination: DraggableLocation
  ) => {
    /* Clone original sections */
    const newSections: Array<{ [Key: string]: any }> = [...sections];
    /* Find source section index */
    const sourceSectionIndex: number = sections.findIndex(
      (newSection: { [Key: string]: any }) =>
        newSection?._id === source.droppableId
    );
    /* Find destination section index */
    const destinationSectionIndex: number = sections.findIndex(
      (newSection: { [Key: string]: any }) =>
        newSection?._id === destination.droppableId
    );
    /* Find current section */
    const sourceSection: { [Key: string]: any } = sections[sourceSectionIndex];
    const destinationSection: { [Key: string]: any } =
      sections[destinationSectionIndex];
    const sourceNote = sourceSection.notes[source.index];

    // 1. Remove note from source section
    sourceSection.notes.splice(source.index, 1);
    /* Decrease notes count */
    sourceSection.totalNotes =
      sourceSection.totalNotes >= 1 ? sourceSection.totalNotes - 1 : 0;

    // 2. insert note into destination section
    destinationSection.notes.splice(destination.index, 0, sourceNote);
    /* Increase notes count */
    destinationSection.totalNotes = destinationSection.totalNotes + 1;

    newSections[sourceSectionIndex] = sourceSection;
    newSections[destinationSectionIndex] = destinationSection;
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
    if (result.type === "SECTION") {
      // if the list is scrolled it looks like there is some strangeness going on
      // with react-window. It looks to be scrolling back to scroll: 0
      // I should log an issue with the project
      const newSections: Array<{ [Key: string]: any }> = reorder(
        sections,
        source.index,
        destination.index
      );
      setSections([...newSections]);
      return;
    }

    // reordering in same list
    if (
      result.type === "NOTE" &&
      source.droppableId === destination.droppableId
    ) {
      // socket.emit("update-note-position", )
      const newSections = reorderNotesList(source, destination);
      setSections(newSections);
      return;
    }

    // moving notes between sections
    socket.emit("move-note-to-section", {
      noteId: result.draggableId,
      sourceSectionId: source.droppableId,
      destinationSectionId: destination.droppableId,
    });
    const newSections = moveNotesBetweenSections(source, destination);
    setSections(newSections);
  };

  const renderStartSession = useCallback(() => {
    return (
      <Box mr={2} className={buttonStyle}>
        <Button
          variant="outlined"
          color="default"
          className={buttonOutlinedStartStyle}
          startIcon={
            <PlayArrowIcon color="primary" className={startSessionIconStyle} />
          }
          onClick={() => handleStartSession()}
        >
          <Typography className={startSessionTextStyle} variant="h6">
            Start Session
          </Typography>
        </Button>
      </Box>
    );
  }, [boardLoading, authenticated, boardDetails]);

  const renderEndSession = useCallback(() => {
    return (
      <Box mx={2} className={buttonStyle}>
        <Button
          variant="outlined"
          color="default"
          className={buttonOutlinedStopStyle}
          startIcon={
            <PauseIcon color="primary" className={stopSessionIconStyle} />
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
    );
  }, [boardLoading, authenticated, boardDetails]);

  const renderTimer = useCallback(() => {
    return <Timer startDateTime={boardDetails?.startedAt} interval={1000} />;
  }, [boardLoading, boardDetails]);

  const renderDiffInDays = useCallback(() => {
    return <Box>{dateDiffInDays()}</Box>;
  }, [boardLoading, boardDetails]);

  const renderCreateNewSection = useCallback(() => {
    return (
      <Box mr={2}>
        <Hidden only={["xl", "lg", "md", "sm"]}>
          <IconButton
            size="small"
            className={iconBackStyle}
            onClick={() => handleBack()}
          >
            <AddOutlinedIcon color="primary" />
          </IconButton>
        </Hidden>
        <Hidden only={["xs"]}>
          <Box className={buttonStyle}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddOutlinedIcon color="secondary" />}
              onClick={() => handleCreateNewSection()}
            >
              <Typography color="secondary" variant="subtitle1">
                Create New Section
              </Typography>
            </Button>
          </Box>
        </Hidden>
      </Box>
    );
  }, [boardLoading, authenticated]);

  const renderGoBackToBoards = useCallback(() => {
    return (
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
              startIcon={<KeyboardBackspaceOutlinedIcon color="primary" />}
              onClick={() => handleBack()}
            >
              <Typography color="primary" variant="subtitle1">
                Go Back to Boards
              </Typography>
            </Button>
          </Box>
        </Hidden>
      </Box>
    );
  }, [boardLoading, authenticated]);

  const handleDrawerClose = () => {
    setOpenAccount(false);
  };

  const onDragStart = () => {
    // Add a little vibration if the browser supports it.
    // Add's a nice little physical feedback
    if (window.navigator.vibrate) {
      window.navigator.vibrate(100);
    }
  };

  const inviteMember = () => {
    setOpenInviteDialog(true);
  };

  const changeVisibility = () => {
    setOpenChangeVisibilityDialog(true);
  };

  return (
    <Suspense fallback={<div />}>
      {/* <Loader enable={loading} /> */}
      {renderDeleteDialog()}
      {renderUpdateDialog()}
      {renderEndSessionDialog()}
      {renderInviteMemberDialog()}
      {renderChangeVisibilityDialog()}
      {loading ? (
        <BoardHeaderSkeleton />
      ) : (
        <Grid container spacing={2}>
          <Slide
            direction="right"
            in={true}
            timeout={1500}
            mountOnEnter
            unmountOnExit
          >
            <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
              <Box display="flex">
                <Box>
                  <Typography variant="h3" style={{ color: "#071040" }}>
                    {boardDetails?.title}&nbsp;(
                    {formateNumber(totalSections) || 0})
                  </Typography>
                </Box>
                {!boardLoading && boardDetails?.teams?.length ? (
                  <Box ml={2} mt={0.5}>
                    <AvatarGroupList dataList={boardDetails?.teams} />
                  </Box>
                ) : null}
                {!boardLoading && boardDetails?.teams?.length ? (
                  <Box ml={2} mt={0.5}>
                    <AvatarGroupList
                      dataList={getMembers(boardDetails?.teams)}
                    />
                  </Box>
                ) : null}
                {authenticated && (
                  <Box ml={1} mt={0.3}>
                    <Button
                      color="primary"
                      onClick={() => inviteMember()}
                      startIcon={<PersonAddIcon />}
                    >
                      <Typography variant="subtitle1">Invite</Typography>
                    </Button>
                  </Box>
                )}
                {authenticated && (
                  <Box ml={1} mt={0.3}>
                    <Button
                      color="primary"
                      onClick={() => changeVisibility()}
                      startIcon={
                        boardDetails?.isPrivate ? <LockIcon /> : <PublicIcon />
                      }
                    >
                      <Typography variant="subtitle1">
                        {boardDetails?.isPrivate ? "Private" : "Public"}
                      </Typography>
                    </Button>
                  </Box>
                )}
              </Box>
            </Grid>
          </Slide>
          <Slide
            direction="left"
            in={true}
            timeout={1500}
            mountOnEnter
            unmountOnExit
          >
            <Grid item xl={8} lg={8} md={8} sm={12} xs={12}>
              <Box display="flex" justifyContent="flex-end">
                {!boardLoading &&
                boardDetails?.startedAt &&
                !boardDetails?.completedAt ? (
                  <Box>{renderTimer()}</Box>
                ) : null}
                {!boardLoading &&
                boardDetails?.startedAt &&
                boardDetails?.completedAt ? (
                  <Box mt={0.3} mr={2}>
                    {renderDiffInDays()}
                  </Box>
                ) : null}
                <Box>
                  {!boardLoading &&
                  authenticated &&
                  boardDetails &&
                  !boardDetails.startedAt ? (
                    <>{renderStartSession()}</>
                  ) : null}
                  {!boardLoading &&
                  authenticated &&
                  boardDetails?.startedAt &&
                  !boardDetails.completedAt ? (
                    <>{renderEndSession()}</>
                  ) : null}
                </Box>
                {!boardLoading && authenticated ? (
                  <>{renderGoBackToBoards()}</>
                ) : null}
                {!boardLoading && authenticated ? (
                  <>{renderCreateNewSection()}</>
                ) : null}
                {authenticated && (
                  <Box mt={-0.5}>
                    <UserAvatar handleAccount={handleAccount} hideName={true} />
                  </Box>
                )}
                <PersistentDrawerRight
                  open={openAccount}
                  handleDrawerClose={handleDrawerClose}
                >
                  <UserAccount handleDrawerClose={handleDrawerClose} />
                </PersistentDrawerRight>
              </Box>
            </Grid>
          </Slide>
        </Grid>
      )}
      {loading ? <SectionsListSkeleton /> : null}
      {!loading && (
        <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
          <List>
            <Droppable
              droppableId="section"
              type="SECTION"
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
                            isDragDisabled={!userId}
                          >
                            {(
                              draggableProvided: DraggableProvided
                              // draggableSnapshot: DraggableStateSnapshot
                            ) => (
                              <Grid
                                item
                                // key={item._id}
                                xl={3}
                                lg={3}
                                md={4}
                                sm={6}
                                xs={12}
                                ref={draggableProvided.innerRef}
                                {...draggableProvided.draggableProps}
                              >
                                <div
                                  // ref={draggableProvided.innerRef}
                                  // {...draggableProvided.draggableProps}
                                  // {...draggableProvided.dragHandleProps}
                                  // style={getItemStyle(
                                  //   provided.draggableStyle,
                                  //   snapshot.isDragging
                                  // )}
                                  className={`${sectionStyle}`}
                                  // data-isDragging={
                                  //   draggableSnapshot.isDragging &&
                                  //   !draggableSnapshot.isDropAnimating
                                  // }
                                >
                                  <ListItem
                                    disableGutters
                                    {...draggableProvided.dragHandleProps}
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
                                              variant="h3"
                                            >
                                              {item.title}&nbsp;(
                                              {formateNumber(item.totalNotes) ||
                                                0}
                                              )
                                            </Typography>
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
                                    sectionIndex={index}
                                    startSession={startSession}
                                    key={item._id}
                                    noteList={item.notes}
                                    sectionId={item._id}
                                    updateTotalNotes={updateTotalNotes}
                                    removeDeletedNote={removeDeletedNote}
                                    updateNote={updateNote}
                                    addNotes={addNotes}
                                  />
                                </div>
                              </Grid>
                            )}
                          </Draggable>
                        )
                      )}
                    {droppableProvided.placeholder}
                  </Grid>
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
