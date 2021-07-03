import {
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from "react-beautiful-dnd";
import React, { useCallback, useEffect, useState } from "react";

import AddIcon from "@material-ui/icons/Add";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grid from "@material-ui/core/Grid";
import NoteListSkeleton from "../common/skeletons/notesList";
import Typography from "@material-ui/core/Typography";
import UpdateNote from "./Update";
import Zoom from "@material-ui/core/Zoom";
import { getNotesBySectionId } from "../../redux/actions/note";
import { makeStyles } from "@material-ui/core/styles";
import { useAuthenticated } from "../../redux/state/common";
import { useBoard } from "../../redux/state/board";
import { useDispatch } from "react-redux";
import { useLoading } from "../../redux/state/note";
import { useSocket } from "../../redux/state/socket";
import { useParams } from "react-router-dom";

const NotesList = React.lazy(() => import("./list"));

const useStyles = makeStyles(() => ({
  buttonStyle: {
    height: 35,
    // color: "#5E6C84",
    backgroundColor: "inherit",
    justifyContent: "flex-start !important",
    "&:hover": {
      backgroundColor: "#EBECF0",
      boxShadow: "none",
    },
  },
}));

function Note(props: any) {
  const { sectionId, sectionIndex, totalNotes } = props;
  const { buttonStyle } = useStyles();
  const authenticated = useAuthenticated();
  const { board } = useBoard();
  const { socket } = useSocket();
  const dispatch = useDispatch();
  const { loading } = useLoading(sectionId);
  const { boardId } = useParams<{ boardId: string }>();

  const enableActions = () => {
    if (authenticated && boardDetails?.startedAt && !boardDetails?.isLocked) {
      return true;
    }
    if (
      !authenticated &&
      boardDetails?.status === "inprogress" &&
      !boardDetails?.isPrivate
    ) {
      return true;
    }

    if (boardDetails?.startedAt && !boardDetails?.isLocked) {
      return true;
    }
    return false;
  };

  /* Local states */
  const [note, setNote] = useState<any>(null);
  const [showNote, setShowNote] = useState(false);
  const [selectedSectionId, setSelectedSectionId] = useState<any>(null);
  const [boardDetails, setBoardDetails] = useState<any>(board);

  /* React Hooks */
  useEffect(() => {
    if ((!board?.isPrivate && !authenticated) || authenticated) {
      dispatch(getNotesBySectionId(sectionId, sectionId));
    }
  }, [sectionId]);

  useEffect(() => {});

  useEffect(() => {
    /* Start session */
    socket.on(
      `start-session-response`,
      (updatedBoard: { [Key: string]: any }) => {
        if (!updatedBoard) {
          return;
        }
        console.log("updatedBoard", updatedBoard);
        /* This is applicable only if user is authenticated and starting the session */
        if (boardId === updatedBoard?._id) {
          setBoardDetails(updatedBoard);
        }
      }
    );

    /* Resume session */
    socket.on(
      `resume-session-response`,
      (updatedBoard: { [Key: string]: any }) => {
        if (!updatedBoard) {
          return;
        }
        console.log("updatedBoard", updatedBoard);
        if (boardId === updatedBoard?._id) {
          setBoardDetails(updatedBoard);
        }
      }
    );

    /* End session */
    socket.on(
      `end-session-response`,
      (updatedBoard: { [Key: string]: any }) => {
        if (!updatedBoard) {
          return;
        }
        console.log("me...", updatedBoard);
        if (boardId === updatedBoard?._id) {
          setBoardDetails(updatedBoard);
        }
      }
    );

    return () => {};
  }, [boardDetails]);

  useEffect(() => {
    /* Update note */
    socket.on(
      `update-note-response-${sectionId}`,
      (newNote: { [Key: string]: any }) => {
        if (note) {
          setNote(null);
        }
      }
    );

    /* Add new note */
    socket.on(
      `create-note-response-${sectionId}`,
      (newNote: { [Key: string]: any }) => {
        if (sectionId === newNote?.sectionId) {
          setSelectedSectionId(null);
        }
      }
    );

    return () => {};
  }, [showNote]);

  useEffect(() => {
    /* Delete note */
    socket.on(
      `delete-note-response-${sectionId}`,
      (deleteNote: { [Key: string]: any }) => {
        if (sectionId === deleteNote?.sectionId) {
          setNote(null);
        }
      }
    );

    return () => {};
  }, [note]);

  const editNote = (note: { [Key: string]: any }) => {
    if (!note) {
      return;
    }
    setShowNote(true);
    setSelectedSectionId(note.sectionId);
    setNote(note);
  };

  const deleteNote = (note: { [Key: string]: any }) => {
    if (!note) {
      return;
    }
    setSelectedSectionId(note.sectionId);
    setNote(note);
  };

  const createNote = (currentSectionId: string) => {
    setShowNote(true);
    setSelectedSectionId(currentSectionId);
  };

  const handleClickAway = () => {
    setShowNote(false);
  };

  const handleCancel = () => {
    setNote(null);
    setShowNote(false);
  };

  const getBackgroundColor = (
    isDraggingOver: boolean,
    isDraggingFrom: boolean
  ): string => {
    if (isDraggingOver) {
      return "#cecfd4";
    }
    if (isDraggingFrom) {
      return "#e0e2e6";
    }
    return "inherit";
  };

  const renderUpdateNote = useCallback(() => {
    return (
      <Box p={1}>
        <ClickAwayListener onClickAway={() => handleClickAway()}>
          <UpdateNote
            selectedNote={note}
            sectionId={sectionId}
            handleCancel={handleCancel}
            totalNotes={totalNotes}
            setShowNote={setShowNote}
          />
        </ClickAwayListener>
      </Box>
    );
  }, [selectedSectionId, sectionId, showNote, note]);

  const renderCreateNoteButton = useCallback(() => {
    return (
      <Grid container>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Box mb={1}>
            <Zoom in={true} timeout={1500}>
              <Button
                variant="contained"
                size="small"
                fullWidth
                classes={{ root: buttonStyle }}
                onClick={() => createNote(sectionId)}
                startIcon={<AddIcon />}
              >
                <Typography variant="subtitle1">Create another note</Typography>
              </Button>
            </Zoom>
          </Box>
        </Grid>
      </Grid>
    );
  }, [showNote, enableActions()]);

  return (
    <React.Fragment>
      {loading ? <NoteListSkeleton /> : null}
      <Droppable
        droppableId={sectionId}
        type="NOTE"
        ignoreContainerClipping={false} // undefined or false
        // isDropDisabled={isDropDisabled}
        isCombineEnabled={false} //always false
      >
        {(
          dropProvided: DroppableProvided,
          dropSnapshot: DroppableStateSnapshot
        ) => (
          <div
            {...dropProvided.droppableProps}
            ref={dropProvided.innerRef}
            style={{
              backgroundColor: getBackgroundColor(
                dropSnapshot.isDraggingOver,
                Boolean(dropSnapshot.draggingFromThisWith)
              ),
              opacity: "inherit",
            }}
          >
            <NotesList
              editNote={editNote}
              dropProvided={dropProvided}
              showNote={showNote}
              deleteNote={deleteNote}
              sectionIndex={sectionIndex}
              sectionId={sectionId}
              board={boardDetails}
            />
          </div>
        )}
      </Droppable>
      {!showNote && enableActions() && <>{renderCreateNoteButton()}</>}
      {showNote ? <>{renderUpdateNote()}</> : null}
    </React.Fragment>
  );
}

export default React.memo(Note);
