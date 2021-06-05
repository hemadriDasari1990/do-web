import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";
import React, { useCallback, useEffect, useState } from "react";
import { getInitials, getMemberId, reorder } from "../../util";

import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import ColoredLine from "../common/ColoredLine";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import DoneAllOutlinedIcon from "@material-ui/icons/DoneAllOutlined";
import EditIcon from "@material-ui/icons/Edit";
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
import { getAvatar } from "../../util/getAvatar";
import getPastTime from "../../util/getPastTime";
import { makeStyles } from "@material-ui/core/styles";
import { useAuthenticated } from "../../redux/state/common";
import { useBoard } from "../../redux/state/board";
import { useLogin } from "../../redux/state/login";
import { useNote } from "../../redux/state/note";
import { useParams } from "react-router-dom";
import { useSocket } from "../../redux/state/socket";
import useStyles from "../styles";
import useTableStyles from "../styles/table";

const ResponsiveDialog = React.lazy(() => import("../Dialog"));
const ReactionPopover = React.lazy(() => import("./Reaction"));
const ReactionView = React.lazy(() => import("./Reaction/view"));
const NoteDetails = React.lazy(() => import("./Details"));

const useLocalStyles = makeStyles(() => ({
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
    padding: 8,
    minHeight: 70,
    borderRadius: 6,
    boxShadow:
      "0 5px 10px rgba(154,160,185,.05), 0 15px 40px rgba(166,173,201,.2)",
  },
  iconButtonStyle: {
    borderRadius: 5,
  },
  hightlightNoteStyle: {
    // "-ms-transform": "rotate(2deg)" /* IE 9 */,
    // transform: "rotate(2deg)",
  },
  pastTimeStyle: {
    verticalAlign: "middle",
    lineHeight: 1,
  },
  timeIconStyle: {
    fontSize: 20,
    color: "#6f7588",
  },
  svgIconStyle: {
    fontSize: "1.2rem",
  },
  noteContainer: {
    /* flex child */
    flexGrow: 1,
    /*
    flex parent
    needed to allow width to grow greater than body
  */
    // display: "inline-flex",
    /* stop the list collapsing when empty */
    // minHeight: 420,
    /*
    not relying on the items for a margin-bottom
    as it will collapse when the list is empty
  */
  },
  dropZoneStyle: {
    /* stop the list collapsing when empty */
    // minWidth: 600,
    /* stop the list collapsing when it has no items */
    minHeight: 5,
  },
  noteItemStyle: {},
}));

const NoteList = (props: any) => {
  const { sectionId, editNote, dropProvided, deleteNote, sectionIndex } = props;
  const {
    paperStyle,
    iconButtonStyle,
    hightlightNoteStyle,
    pastTimeStyle,
    timeIconStyle,
    svgIconStyle,
    dropZoneStyle,
    noteItemStyle,
  } = useLocalStyles();
  const { cursor } = useStyles();

  /* Redux hooks */
  const authenticated = useAuthenticated();
  const { board } = useBoard();
  const { userId, memberId } = useLogin();
  const enableActions = !board?.isLocked || authenticated || board.isInstant;
  const { socket } = useSocket();
  const { noteList } = useNote(sectionId);
  const { boardId } = useParams<{ boardId: string }>();
  const { avatarStyle } = useTableStyles();
  const joinedMemberId = getMemberId();

  /* Local state */
  const [selectedNote, setSelectedNote] = useState<any>(null);
  const [deleteDialog, setOpenDeleteDialog] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [
    clickAwayAnchorEl,
    setClickAwayAnchorEl,
  ] = React.useState<HTMLElement | null>(null);
  const [open, setOpen] = React.useState(false);
  const [showDialog, setShowDialog] = React.useState(false);
  const [notes, setNotes] = useState(noteList || []);

  /* React Hooks */
  useEffect(() => {
    setNotes(noteList);
  }, [noteList]);

  useEffect(() => {
    socket.on(
      `add-reaction-response-${sectionId}`,
      (data: { [Key: string]: any }) => {
        updateTotalReactions(data);
      }
    );
    return () => {
      socket.off(`add-reaction-response-${sectionId}`);
    };
  }, [notes]);

  useEffect(() => {
    /* Delete note */
    socket.on(
      `delete-note-response-${sectionId}`,
      (deleteNote: { [Key: string]: any }) => {
        if (sectionId === deleteNote?.sectionId) {
          removeDeletedNote(deleteNote);
        }
      }
    );

    /* Update note */
    socket.on(
      `update-note-response-${sectionId}`,
      (newNote: { [Key: string]: any }) => {
        if (sectionId === newNote?.sectionId) {
          updateNote(newNote);
        }
      }
    );

    /* Add new note */
    socket.on(
      `create-note-response-${sectionId}`,
      (newNote: { [Key: string]: any }) => {
        if (sectionId === newNote?.sectionId) {
          addNotes(newNote);
        }
      }
    );

    socket.on(
      `mark-note-read-response-${sectionId}`,
      (updatedNote: { [Key: string]: any }) => {
        updateNote(updatedNote);
      }
    );

    socket.on(
      `update-note-position-response-${sectionId}`,
      (response: { [Key: string]: any }) => {
        if (response?.updated) {
          const newNotes: Array<{ [Key: string]: any }> = reorder(
            notes,
            response?.sourceIndex,
            response?.destinationIndex
          );
          setNotes(newNotes);
        }
      }
    );

    return () => {
      socket.off(`create-note-response-${sectionId}`);
      socket.off(`update-note-response-${sectionId}`);
      socket.off(`delete-note-response-${sectionId}`);
      socket.off(`mark-note-read-response--${sectionId}`);
      socket.off(`update-note-position-response-${sectionId}`);
    };
  }, [notes]);

  useEffect(() => {
    /* move notes between sections response */
    socket.on(
      `move-note-to-source-section-response-${sectionId}`,
      (source: { [Key: string]: any }) => {
        /* Hanlde source section notes */
        if (sectionId === source?.droppableId) {
          /* Remove note from source section */
          const newNotes = notes?.length ? [...notes] : [];
          if (newNotes?.length) {
            newNotes.splice(source.index, 1);
          }
          setNotes([...newNotes]);
        }
      }
    );

    socket.on(
      `move-note-to-destination-section-response-${sectionId}`,
      (
        sourceNote: { [Key: string]: any },
        destination: { [Key: string]: any }
      ) => {
        /* Hanlde destination section notes */
        if (sectionId === destination?.droppableId) {
          /* Add note into destination section */
          const newNotes = notes?.length ? [...notes] : [];
          newNotes.push(sourceNote);
          setNotes([...newNotes]);
        }
      }
    );

    return () => {
      socket.off(`move-note-to-destination-section-response-${sectionId}`);
      socket.off(`move-note-to-source-section-response-${sectionId}`);
    };
  }, [notes]);

  const updateNote = (updatedNote: { [Key: string]: any }) => {
    if (!updatedNote || sectionId !== updatedNote?.sectionId) {
      return;
    }

    const newNotes: Array<{ [Key: string]: any }> = notes?.length
      ? [...notes]
      : [];
    const noteIndex: number = newNotes.findIndex(
      (newNote: { [Key: string]: any }) => newNote._id === updatedNote._id
    );
    const noteData: { [Key: string]: any } = newNotes[noteIndex];
    if (!noteData) {
      return;
    }
    noteData.read = updatedNote.read;
    noteData.description = updatedNote.description;
    noteData.updatedById = updatedNote.updatedById;
    newNotes[noteIndex] = noteData;
    setNotes(newNotes);
  };

  const addNotes = (newNote: { [Key: string]: any }) => {
    if (!newNote || sectionId !== newNote?.sectionId) {
      return;
    }

    if (notes?.length) {
      const newNotes = [...notes];
      setNotes([...newNotes, newNote]);
      return;
    }
    setNotes([newNote]);
  };

  const removeDeletedNote = (note: { [Key: string]: any }) => {
    if (!note || sectionId !== note?.sectionId || !notes?.length) {
      return;
    }
    let newNotes = [...notes];
    const filteredNotes: Array<{
      [Key: string]: any;
    }> = newNotes.filter(
      (item: { [Key: string]: any }) => item._id !== note?._id
    );
    setNotes(filteredNotes);
  };

  /* Handler functions */
  // const deleteNoteById = (note: {[Key:string]: any}) => {
  //     setSelectedNote(note);
  //     setOpenDeleteDialog(true);
  // }

  const handlePopoverClose = (
    event: React.MouseEvent<Document, MouseEvent>
  ) => {
    event.preventDefault();
    setAnchorEl(null);
  };

  const updateTotalReactions = (newReaction: { [Key: string]: any }) => {
    if (!notes || !newReaction) {
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
        case "highlight":
          noteData.totalHighlight =
            parseInt(noteData.totalHighlight) > 0
              ? noteData.totalHighlight - 1
              : 0;
          break;
        case "minusOne":
          noteData.totalMinusOne =
            parseInt(noteData.totalMinusOne) > 0
              ? noteData.totalMinusOne - 1
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
      noteData.reactions = noteData?.reactions?.filter(
        (reaction: { [Key: string]: any }) => reaction?._id !== newReaction?._id
      );
      noteData.totalReactions = noteData.totalReactions - 1;
    } else {
      const oldReaction = noteData?.reactions?.find(
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
          case "highlight":
            noteData.totalHighlight =
              parseInt(noteData.totalHighlight) > 0
                ? noteData.totalHighlight - 1
                : 0;
            break;
          case "minusOne":
            noteData.totalMinusOne =
              parseInt(noteData.totalMinusOne) > 0
                ? noteData.totalMinusOne - 1
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
          case "highlight":
            noteData.totalHighlight =
              parseInt(noteData.totalHighlight) > 0
                ? noteData.totalHighlight + 1
                : 1;
            break;
          case "minusOne":
            noteData.totalMinusOne =
              parseInt(noteData.totalMinusOne) > 0
                ? noteData.totalMinusOne + 1
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
        const reactionIndex = noteData?.reactions?.findIndex(
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
          case "highlight":
            noteData.totalHighlight =
              parseInt(noteData.totalHighlight) > 0
                ? noteData.totalHighlight + 1
                : 1;
            break;
          case "minusOne":
            noteData.totalMinusOne =
              parseInt(noteData.totalMinusOne) > 0
                ? noteData.totalMinusOne + 1
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
    setNotes(newNotes);
  };

  const handleReaction = (
    event: React.MouseEvent<HTMLButtonElement>,
    type: string,
    note: { [Key: string]: any }
  ) => {
    event.stopPropagation();
    socket.emit("add-reaction", {
      noteId: note._id,
      type,
      sectionId: note.sectionId,
      boardId,
      isAnnonymous: board?.isAnnonymous,
      joinedMemberId: joinedMemberId,
    });
    setAnchorEl(null);
  };

  const handleDelete = () => {
    socket.emit(`delete-note`, {
      id: selectedNote._id,
      memberId: memberId || joinedMemberId,
      sectionId: selectedNote?.sectionId,
      description: selectedNote?.description,
      boardId,
    });
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

  const renderDeleteDialog = useCallback(() => {
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
          <Typography variant="h5">
            Are you sure you want to delete {selectedNote?.description}?
          </Typography>
        </ResponsiveDialog>
      </Box>
    );
  }, [deleteDialog]);

  const renderNoteViewDialog = useCallback(() => {
    return (
      <Box>
        <ResponsiveDialog
          open={showDialog}
          title="Note Details"
          hideButton={true}
          handleClose={handleViewClose}
        >
          <NoteDetails note={selectedNote} />
        </ResponsiveDialog>
      </Box>
    );
  }, [showDialog]);

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
    // setSelectedNote(note);
    socket.emit("mark-note-read", {
      userId,
      id: note._id,
      read: !note.read,
      boardId,
    });
  };

  const handleMarkReadOnly = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
  };

  const handleClickAwayClose = () => {
    setClickAwayAnchorEl(null);
    setOpen(false);
  };

  const renderMenu = useCallback(() => {
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
          <ListItem button={true} onClick={() => handleMenuItem("delete")}>
            <ListItemAvatar style={{ minWidth: 35 }}>
              <DeleteOutlineIcon />
            </ListItemAvatar>
            <ListItemText
              primary={<b>Delete Note</b>}
              secondary="Once deleted can't be done"
            />
          </ListItem>
        </Menu>
      </ClickAwayListener>
    );
  }, [open]);

  const handleMenuItem = async (action: string) => {
    switch (action) {
      case "edit":
        editNote(selectedNote);
        break;
      case "delete":
        deleteNote(selectedNote);
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
    setAnchorEl(null);
  };

  const renderPastTime = (note: { [Key: string]: any }) => {
    return (
      <Box mt={0.4} mr={0.5} display="flex" className={pastTimeStyle}>
        <Box mr={0.4}>
          <ScheduleIcon className={timeIconStyle} />
        </Box>
        <Box>
          <Typography variant="h6">{getPastTime(note?.createdAt)}</Typography>
        </Box>
      </Box>
    );
  };

  const renderEmoji = useCallback(
    (note: { [Key: string]: any }) => {
      return (
        <Tooltip arrow title="Add your reaction">
          <IconButton
            className={iconButtonStyle}
            aria-label="reaction-menu"
            size="small"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
              handleReactionClick(event, note)
            }
          >
            +
            <InsertEmoticonIcon className={svgIconStyle} />
          </IconButton>
        </Tooltip>
      );
    },
    [enableActions]
  );

  const renderMarkRead = useCallback(
    (note: { [Key: string]: any }) => {
      return (
        <Tooltip
          arrow
          title={note.read ? "Mark as not discussed" : "Mark as discussed"}
        >
          <IconButton
            size="small"
            aria-label="note-menu"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
              handleMarkRead(event, note)
            }
          >
            <Zoom in={true} timeout={2000}>
              <DoneAllOutlinedIcon
                style={{
                  color: note.read ? "#57f" : "inherit",
                }}
                className={svgIconStyle}
              />
            </Zoom>
          </IconButton>
        </Tooltip>
      );
    },
    [authenticated]
  );

  const renderRead = useCallback(
    (note: { [Key: string]: any }) => {
      return (
        <Tooltip arrow title={note.read ? "Discussed" : "Not discussed yet"}>
          <IconButton
            size="small"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
              handleMarkReadOnly(event)
            }
          >
            <DoneAllOutlinedIcon
              style={{
                color: note.read ? "#57f" : "inherit",
              }}
              className={svgIconStyle}
            />
          </IconButton>
        </Tooltip>
      );
    },
    [authenticated]
  );

  const renderMenuIcon = useCallback(
    (note: { [Key: string]: any }) => {
      return (
        <Tooltip arrow title="Action">
          <IconButton
            size="small"
            aria-label="note-menu"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
              handleButton(event, note)
            }
          >
            <Zoom in={true} timeout={2000}>
              <MoreHorizIcon className={svgIconStyle} />
            </Zoom>
          </IconButton>
        </Tooltip>
      );
    },
    [enableActions]
  );

  const renderName = (note: { [Key: string]: any }) => {
    return (
      <Tooltip title={note?.createdBy?.name || "Team member"}>
        <Avatar
          src={getAvatar(note?.createdBy?.avatarId)}
          className={avatarStyle}
        >
          {note?.createdBy?.name && (
            <Typography variant="subtitle1" style={{ color: "#57f" }}>
              {getInitials(note?.createdBy?.name)}
            </Typography>
          )}
        </Avatar>
      </Tooltip>
    );
  };

  return (
    <React.Fragment>
      {renderDeleteDialog()}
      {renderNoteViewDialog()}
      {(authenticated ||
        joinedMemberId === selectedNote?.createdById ||
        board?.isInstant) &&
        renderMenu()}
      <div
        ref={dropProvided?.innerRef}
        className={`${dropZoneStyle}`}
        style={{ padding: "8px 8px 0px 8px" }}
      >
        {Array.isArray(notes) && notes?.length
          ? notes.map((note: { [Key: string]: any }, index: number) => (
              <Draggable
                key={note._id}
                draggableId={note._id}
                index={index}
                isDragDisabled={!authenticated && !board?.isInstant}
                disableInteractiveElementBlocking={true}
              >
                {(
                  dragProvided: DraggableProvided,
                  dragSnapshot: DraggableStateSnapshot
                ) => (
                  <div
                    ref={dragProvided.innerRef}
                    {...dragProvided.draggableProps}
                    {...dragProvided.dragHandleProps}
                    className={noteItemStyle}
                  >
                    <Box
                      pb={1}
                      onClick={(event: React.MouseEvent<HTMLDivElement>) =>
                        handleNote(event, note)
                      }
                      className={cursor}
                    >
                      <Paper
                        className={`${paperStyle} ${
                          dragSnapshot.isDragging ? hightlightNoteStyle : ""
                        }`}
                      >
                        <Box display="flex" justifyContent="space-between">
                          <ColoredLine index={sectionIndex} />
                          <Box display="flex">
                            <Box mr={1}>{renderPastTime(note)}</Box>
                            {renderName(note)}
                          </Box>
                        </Box>
                        <Box style={{ minHeight: 40 }}>
                          <Typography
                            variant="h6"
                            style={{ color: "#172B4D", fontWeight: 400 }}
                          >
                            {note.description}
                          </Typography>
                        </Box>
                        <Box
                          pt={1}
                          display="flex"
                          justifyContent="space-between"
                        >
                          <Box display="flex">
                            <Box>
                              <ReactionView note={note} />
                            </Box>
                          </Box>
                          <Box display="flex">
                            {enableActions && <>{renderEmoji(note)}</>}
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
                            {(authenticated ||
                              (!authenticated && board?.isInstant)) && (
                              <>{renderMarkRead(note)}</>
                            )}
                            {!authenticated && !board?.isInstant && (
                              <>{renderRead(note)}</>
                            )}
                            {(authenticated ||
                              joinedMemberId === selectedNote?.createdById ||
                              board?.isInstant) && <>{renderMenuIcon(note)}</>}
                          </Box>
                        </Box>
                      </Paper>
                      <ReactionPopover
                        handleReaction={handleReaction}
                        anchorEl={anchorEl}
                        note={selectedNote}
                        handlePopoverClose={handlePopoverClose}
                        setAnchorEl={setAnchorEl}
                      />
                    </Box>
                  </div>
                )}
              </Draggable>
            ))
          : null}
        {dropProvided?.placeholder}
      </div>
    </React.Fragment>
  );
};

export default NoteList;
