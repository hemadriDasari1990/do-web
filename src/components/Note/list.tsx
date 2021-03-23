import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";
import React, { useEffect, useState } from "react";
import { deleteNote, markAsRead } from "../../redux/actions";

import Box from "@material-ui/core/Box";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import DoneAllOutlinedIcon from "@material-ui/icons/DoneAllOutlined";
import EditIcon from "@material-ui/icons/Edit";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Paper from "@material-ui/core/Paper";
import ScheduleIcon from "@material-ui/icons/Schedule";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";
import { createOrUpdateReaction } from "../../redux/actions";
import getPastTime from "../../util/getPastTime";
import { makeStyles } from "@material-ui/core/styles";
import socket from "../../socket";
import { useAuthenticated } from "../../redux/state/common";
import { useBoard } from "../../redux/state/board";
import { useDispatch } from "react-redux";
import { useLogin } from "../../redux/state/login";
// import getRandomBGColor from "../../util/getRandomColor";

const ResponsiveDialog = React.lazy(() => import("../Dialog"));
const ReactionPopover = React.lazy(() => import("./Reaction"));
const ReactionView = React.lazy(() => import("./Reaction/view"));
const NoRecords = React.lazy(() => import("../NoRecords"));
const NoteDetails = React.lazy(() => import("./Details"));

const useStyles = makeStyles(() => ({
  cursorStyle: {
    cursor: "pointer",
  },
  adornmentStyle: {
    marginTop: "0px !important",
    marginRight: 0,
    top: 12,
    right: 10,
  },
  startAdornmentStyle: {
    top: 1,
    position: "absolute",
    borderRadius: 30,
    backgroundColor: "#dfedff",
    height: 20,
    marginTop: "8px !important",
  },
  textfieldStyle: {
    "& .MuiFilledInput-root": {
      background: "#fff",
      borderRadius: 6,
    },
  },
  iconStyle: {
    marginTop: 5,
  },
  paperStyle: {
    padding: 10,
    minHeight: 70,
    borderRadius: 6,
    boxShadow:
      "0 5px 10px rgba(154,160,185,.05), 0 15px 40px rgba(166,173,201,.2)",
  },
  iconButtonStyle: {
    borderRadius: 5,
  },
  hightlightNoteStyle: {
    border: "2px solid #1e1e58",
  },
  pastTimeStyle: {
    verticalAlign: "middle",
    lineHeight: 1,
  },
  timeIconStyle: {
    fontSize: 20,
    color: "#5b6a86",
  },
  svgIconStyle: {
    fontSize: "1.2rem",
  },
}));

const NoteList = (props: any) => {
  const { notes, editNote, dropProvided, showNote } = props;
  const {
    paperStyle,
    iconButtonStyle,
    hightlightNoteStyle,
    pastTimeStyle,
    timeIconStyle,
    svgIconStyle,
  } = useStyles();
  const dispatch = useDispatch();
  const authenticated = useAuthenticated();
  const { board } = useBoard();
  const { userId } = useLogin();
  const enableActions = !board?.isLocked || authenticated;

  /* Redux hooks */
  // const { note } = useNote();

  /* Local state */
  const [selectedNote, setSelectedNote] = useState<{ [Key: string]: any }>({});
  const [deleteDialog, setOpenDeleteDialog] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [
    clickAwayAnchorEl,
    setClickAwayAnchorEl,
  ] = React.useState<HTMLElement | null>(null);
  const [notesList, setNotesList] = useState(notes);
  const [open, setOpen] = React.useState(false);
  const [showDialog, setShowDialog] = React.useState(false);

  /* React Hooks */

  useEffect(() => {
    setNotesList(notes);
  }, [notes]);

  useEffect(() => {
    socket.on(
      `new-reaction-${selectedNote?._id}`,
      (data: { [Key: string]: any }) => {
        updateTotalReactions(data);
      }
    );
    return () => {
      socket.off(`new-reaction-${selectedNote?._id}`);
    };
  }, [selectedNote]);

  useEffect(() => {
    socket.on(
      `mark-read-${selectedNote?._id}`,
      (updatedNote: { [Key: string]: any }) => {
        updateNote(updatedNote);
      }
    );
    return () => {
      socket.off(`mark-read-${selectedNote?._id}`);
    };
  }, [selectedNote]);

  /* Handler functions */
  // const deleteNoteById = (note: {[Key:string]: any}) => {
  //     setSelectedNote(note);
  //     setOpenDeleteDialog(true);
  // }

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const updateTotalReactions = (newReaction: { [Key: string]: any }) => {
    if (!notesList || !newReaction) {
      return;
    }
    const newNotes: Array<{ [Key: string]: any }> = [...notes];
    const noteIndex: number = newNotes.findIndex(
      (newNote: { [Key: string]: any }) => newNote._id === newReaction.noteId
    );
    const noteData: { [Key: string]: any } = newNotes[noteIndex];
    if (!noteData) {
      return;
    }
    if (newReaction?.removed) {
      switch (newReaction?.type) {
        case "plusOne":
          noteData.totalPlusOne =
            parseInt(noteData.totalPlusOne) > 0 ? noteData.totalPlusOne - 1 : 0;
          break;
        case "plusTwo":
          noteData.totalPlusTwo =
            parseInt(noteData.totalPlusTwo) > 0 ? noteData.totalPlusTwo - 1 : 0;
          break;
        case "disagree":
          noteData.totalDisAgreed =
            parseInt(noteData.totalDisAgreed) > 0
              ? noteData.totalDisAgreed - 1
              : 1;
          break;
        case "love":
          noteData.totalLove =
            parseInt(noteData.totalLove) > 0 ? noteData.totalLove - 1 : 0;
          break;
        case "deserve":
          noteData.totalDeserve =
            parseInt(noteData.totalDeserve) > 0 ? noteData.totalDeserve - 1 : 0;
          break;
        default:
          break;
      }
      noteData.reactions = noteData.reactions?.filter(
        (reaction: { [Key: string]: any }) => reaction?._id !== newReaction?._id
      );
      noteData.totalReactions = noteData.totalReactions - 1;
    } else {
      const oldReaction = noteData.reactions?.find(
        (reaction: { [Key: string]: any }) => reaction?._id === newReaction?._id
      );
      if (oldReaction) {
        switch (oldReaction?.type) {
          case "plusOne":
            noteData.totalPlusOne =
              parseInt(noteData.totalPlusOne) > 0
                ? noteData.totalPlusOne - 1
                : 0;
            break;
          case "plusTwo":
            noteData.totalPlusTwo =
              parseInt(noteData.totalPlusTwo) > 0
                ? noteData.totalPlusTwo - 1
                : 0;
            break;
          case "disagree":
            noteData.totalDisAgreed =
              parseInt(noteData.totalDisAgreed) > 0
                ? noteData.totalDisAgreed - 1
                : 1;
            break;
          case "love":
            noteData.totalLove =
              parseInt(noteData.totalLove) > 0 ? noteData.totalLove - 1 : 0;
            break;
          case "deserve":
            noteData.totalDeserve =
              parseInt(noteData.totalDeserve) > 0
                ? noteData.totalDeserve - 1
                : 0;
            break;
          default:
            break;
        }
        switch (newReaction?.type) {
          case "plusOne":
            noteData.totalPlusOne =
              parseInt(noteData.totalPlusOne) > 0
                ? noteData.totalPlusOne + 1
                : 1;
            break;
          case "plusTwo":
            noteData.totalPlusTwo =
              parseInt(noteData.totalPlusTwo) > 0
                ? noteData.totalPlusTwo + 1
                : 1;
            break;
          case "disagree":
            noteData.totalDisAgreed =
              parseInt(noteData.totalDisAgreed) > 0
                ? noteData.totalDisAgreed + 1
                : 1;
            break;
          case "love":
            noteData.totalLove =
              parseInt(noteData.totalLove) > 0 ? noteData.totalLove + 1 : 1;
            break;
          case "deserve":
            noteData.totalDeserve =
              parseInt(noteData.totalDeserve) > 0
                ? noteData.totalDeserve + 1
                : 1;
            break;
          default:
            break;
        }
        const reactionIndex = noteData.reactions?.findIndex(
          (reaction: { [Key: string]: any }) =>
            reaction?._id === newReaction?._id
        );
        noteData.reactions[reactionIndex] = newReaction;
      } else {
        switch (newReaction?.type) {
          case "plusOne":
            noteData.totalPlusOne =
              parseInt(noteData.totalPlusOne) > 0
                ? noteData.totalPlusOne + 1
                : 1;
            break;
          case "plusTwo":
            noteData.totalPlusTwo =
              parseInt(noteData.totalPlusTwo) > 0
                ? noteData.totalPlusTwo + 1
                : 1;
            break;
          case "disagree":
            noteData.totalDisAgreed =
              parseInt(noteData.totalDisAgreed) > 0
                ? noteData.totalDisAgreed + 1
                : 1;
            break;
          case "love":
            noteData.totalLove =
              parseInt(noteData.totalLove) > 0 ? noteData.totalLove + 1 : 1;
            break;
          case "deserve":
            noteData.totalDeserve =
              parseInt(noteData.totalDeserve) > 0
                ? noteData.totalDeserve + 1
                : 1;
            break;
          default:
            break;
        }
        noteData.reactions = [newReaction, ...noteData.reactions];
        noteData.totalReactions = noteData.totalReactions + 1;
      }
    }
    newNotes[noteIndex] = noteData;
    setNotesList(newNotes);
  };

  const updateNote = (updatedNote: { [Key: string]: any }) => {
    if (!updatedNote) {
      return;
    }
    const newNotes: Array<{ [Key: string]: any }> = [...notesList];
    const noteIndex: number = newNotes.findIndex(
      (newNote: { [Key: string]: any }) => newNote._id === updatedNote._id
    );
    const noteData: { [Key: string]: any } = newNotes[noteIndex];
    if (!noteData) {
      return;
    }
    noteData.read = updatedNote.read;
    newNotes[noteIndex] = noteData;
    setNotesList(newNotes);
  };

  const handleReaction = (
    event: React.MouseEvent<HTMLButtonElement>,
    type: string,
    note: { [Key: string]: any }
  ) => {
    event.stopPropagation();
    setSelectedNote(note);
    dispatch(
      createOrUpdateReaction({
        noteId: note._id,
        type,
        reactedBy: userId,
      })
    );
  };

  const handleDelete = () => {
    dispatch(deleteNote(selectedNote._id));
    setOpenDeleteDialog(false);
  };

  const handleClose = () => {
    setOpenDeleteDialog(false);
  };

  const handleReactionClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    note: { [Key: string]: any }
  ) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedNote(note);
  };

  const renderDeleteDialog = () => {
    return (
      <Box>
        <ResponsiveDialog
          open={deleteDialog}
          title="Delete Note"
          pcta="Delete"
          handleSave={handleDelete}
          handleClose={handleClose}
          maxWidth={440}
        >
          <Typography variant="h4">
            Are you sure you want to delete {selectedNote?.description}?
          </Typography>
        </ResponsiveDialog>
      </Box>
    );
  };

  const renderNoteViewDialog = () => {
    return (
      <Box>
        <ResponsiveDialog
          open={showDialog}
          title={<Box display="flex">{renderPastTime(selectedNote)}</Box>}
          hideButton={true}
          handleClose={handleViewClose}
        >
          <NoteDetails note={selectedNote} />
        </ResponsiveDialog>
      </Box>
    );
  };

  const handleViewClose = () => {
    setShowDialog(false);
  };

  const handleButton = (
    event: React.MouseEvent<HTMLButtonElement>,
    note: { [Key: string]: any }
  ) => {
    event.stopPropagation();
    setOpen(!open);
    setClickAwayAnchorEl(event.currentTarget);
    setSelectedNote(note);
  };

  const handleMarkRead = (
    event: React.MouseEvent<HTMLButtonElement>,
    note: { [Key: string]: any }
  ) => {
    event.stopPropagation();
    setSelectedNote(note);
    dispatch(
      markAsRead(note._id, {
        read: !note.read,
      })
    );
  };

  const handleClickAwayClose = () => {
    setClickAwayAnchorEl(null);
    setOpen(false);
  };

  const renderMenu = () => {
    return (
      <ClickAwayListener onClickAway={handleClickAwayClose}>
        <Menu
          id="note-menu"
          open={open}
          onClose={handleClickAwayClose}
          anchorEl={clickAwayAnchorEl}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          keepMounted
          getContentAnchorEl={null}
          TransitionComponent={Zoom}
        >
          <ListItem button={true} onClick={() => handleMenuItem("edit")}>
            <ListItemAvatar style={{ minWidth: 35 }}>
              <EditIcon />
            </ListItemAvatar>
            <ListItemText
              primary={<b>Edit Note</b>}
              secondary="Update the note"
            />
          </ListItem>
          {authenticated && (
            <ListItem button={true} onClick={() => handleMenuItem("delete")}>
              <ListItemAvatar style={{ minWidth: 35 }}>
                <DeleteOutlineIcon />
              </ListItemAvatar>
              <ListItemText
                primary={<b>Delete Note</b>}
                secondary="Once deleted can't be done"
              />
            </ListItem>
          )}
        </Menu>
      </ClickAwayListener>
    );
  };

  const handleMenuItem = async (action: string) => {
    switch (action) {
      case "edit":
        editNote(selectedNote);
        break;
      case "delete":
        setOpenDeleteDialog(true);
        break;
      default:
        break;
    }
    setOpen(false);
  };

  const handleNote = (
    event: React.MouseEvent<HTMLDivElement>,
    note: { [Key: string]: any }
  ) => {
    event.stopPropagation();
    setShowDialog(true);
    setSelectedNote(note);
  };

  const renderPastTime = (note: { [Key: string]: any }) => {
    return (
      <Box mt={0.4} mr={0.5} display="flex" className={pastTimeStyle}>
        <Box mr={0.4}>
          <ScheduleIcon className={timeIconStyle} />
        </Box>
        <Box>
          <Typography variant="body2">
            {getPastTime(note?.createdAt)}
          </Typography>
        </Box>
      </Box>
    );
  };

  console.log("handleClickAwayClose", open);

  return (
    <React.Fragment>
      {renderDeleteDialog()}
      {renderNoteViewDialog()}
      {renderMenu()}
      <div ref={dropProvided?.innerRef}>
        <Grid container spacing={0}>
          {Array.isArray(notesList) && notesList?.length
            ? notesList.map((note: { [Key: string]: any }, index: number) => (
                <Draggable key={note._id} draggableId={note._id} index={index}>
                  {(
                    dragProvided: DraggableProvided,
                    dragSnapshot: DraggableStateSnapshot
                  ) => (
                    <Grid
                      item
                      key={note._id}
                      xl={12}
                      lg={12}
                      md={12}
                      sm={12}
                      xs={12}
                    >
                      <div
                        // isDragging={dragSnapshot.isDragging}
                        data-isGroupedOver={Boolean(
                          dragSnapshot.combineTargetFor
                        )}
                        // isClone={isClone}
                        ref={dragProvided.innerRef}
                        {...dragProvided.draggableProps}
                        {...dragProvided.dragHandleProps}
                        // style={getStyle(provided, style)}
                        // data-isDragging
                        data-isDragging={dragSnapshot.isDragging}
                        data-testid={note._id}
                        data-index={index}
                      >
                        <Box
                          p={1}
                          onClick={(event: React.MouseEvent<HTMLDivElement>) =>
                            handleNote(event, note)
                          }
                        >
                          <Paper
                            className={`${paperStyle} ${
                              dragSnapshot.isDragging ? hightlightNoteStyle : ""
                            }`}
                            // style={{
                            //   borderBottom: `2px solid ${getRandomBGColor()}`,
                            //   borderImage: getRandomBGColor(),
                            //   borderImageSlice: 1,
                            // }}
                          >
                            <Box style={{ minHeight: 40 }}>
                              <Typography variant="h6">
                                {note.description}
                              </Typography>
                            </Box>
                            <Box
                              pt={2}
                              display="flex"
                              justifyContent="space-between"
                            >
                              <Box display="flex">
                                <Box>
                                  <ReactionView note={note} />
                                </Box>
                              </Box>
                              <Box display="flex">
                                {renderPastTime(note)}
                                {enableActions && (
                                  <Tooltip arrow title="Add your reaction">
                                    <IconButton
                                      className={iconButtonStyle}
                                      aria-label="reaction-menu"
                                      size="small"
                                      onClick={(
                                        event: React.MouseEvent<
                                          HTMLButtonElement
                                        >
                                      ) => handleReactionClick(event, note)}
                                    >
                                      +
                                      <InsertEmoticonIcon
                                        className={svgIconStyle}
                                      />
                                    </IconButton>
                                  </Tooltip>
                                )}
                                {/* {enableActions && (
                                  <Tooltip arrow title="Add Comment">
                                    <IconButton
                                      size="small"
                                      aria-label="note-menu"
                                    >
                                      <Zoom in={true} timeout={2000}>
                                        <ChatOutlinedIcon
                                          className={svgIconStyle}
                                        />
                                      </Zoom>
                                    </IconButton>
                                  </Tooltip>
                                )} */}
                                {authenticated && (
                                  <Tooltip
                                    arrow
                                    title={
                                      note.read
                                        ? "Mark as unread"
                                        : "Mark as read"
                                    }
                                  >
                                    <IconButton
                                      size="small"
                                      aria-label="note-menu"
                                      onClick={(
                                        event: React.MouseEvent<
                                          HTMLButtonElement
                                        >
                                      ) => handleMarkRead(event, note)}
                                    >
                                      <Zoom in={true} timeout={2000}>
                                        <DoneAllOutlinedIcon
                                          color={
                                            note.read ? "primary" : "inherit"
                                          }
                                          className={svgIconStyle}
                                        />
                                      </Zoom>
                                    </IconButton>
                                  </Tooltip>
                                )}
                                {!authenticated && (
                                  <Tooltip
                                    arrow
                                    title={note.read ? "Read" : "Not read yet"}
                                  >
                                    <DoneAllOutlinedIcon
                                      color={note.read ? "primary" : "inherit"}
                                      className={svgIconStyle}
                                    />
                                  </Tooltip>
                                )}
                                {enableActions && (
                                  <Tooltip arrow title="Action">
                                    <IconButton
                                      size="small"
                                      aria-label="note-menu"
                                      onClick={(
                                        event: React.MouseEvent<
                                          HTMLButtonElement
                                        >
                                      ) => handleButton(event, note)}
                                    >
                                      <Zoom in={true} timeout={2000}>
                                        <MoreHorizIcon
                                          className={svgIconStyle}
                                        />
                                      </Zoom>
                                    </IconButton>
                                  </Tooltip>
                                )}
                              </Box>
                            </Box>
                          </Paper>
                          <ReactionPopover
                            handleReaction={handleReaction}
                            anchorEl={anchorEl}
                            note={selectedNote}
                            handlePopoverClose={handlePopoverClose}
                          />
                        </Box>
                      </div>
                    </Grid>
                  )}
                </Draggable>
              ))
            : null}
        </Grid>
        {!notesList?.length && !showNote && (
          <Box py={2}>
            <NoRecords message="No notes found" />
          </Box>
        )}
        {dropProvided?.placeholder}
      </div>
    </React.Fragment>
  );
};

export default NoteList;
