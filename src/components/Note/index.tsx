import {
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from "react-beautiful-dnd";
import React, { useCallback, useEffect, useState } from "react";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import UpdateNote from "./Update";
import Zoom from "@material-ui/core/Zoom";
import { makeStyles } from "@material-ui/core/styles";
import socket from "../../socket";
import { useAuthenticated } from "../../redux/state/common";
import { useBoard } from "../../redux/state/board";

const NotesList = React.lazy(() => import("./list"));

const useStyles = makeStyles(() => ({
  buttonStyle: {
    background: "#fff",
    height: 45,
    boxShadow:
      "0 5px 10px rgba(154,160,185,.05), 0 15px 40px rgba(166,173,201,.2)",
    justifyContent: "center !important",
    "&:hover": {
      boxShadow: "none",
      justifyContent: "center",
    },
  },
}));

function Note(props: any) {
  const {
    sectionId,
    noteList,
    updateTotalNotes,
    startSession,
    sectionIndex,
    removeDeletedNote,
    updateNote,
    addNotes,
  } = props;
  const { buttonStyle } = useStyles();
  const authenticated = useAuthenticated();
  const { board } = useBoard();
  const enableActions =
    (authenticated && startSession) ||
    (!board?.isLocked &&
      board?.status !== "completed" &&
      board?.status !== "draft" &&
      board?.status !== "pending");

  /* Local states */
  const [notes, setNotes] = useState(noteList || []);
  const [note, setNote] = useState<any>(null);
  const [showNote, setShowNote] = useState(false);
  const [selectedSectionId, setSelectedSectionId] = useState<any>(null);

  /* React Hooks */
  useEffect(() => {
    if (notes !== noteList) {
      setNotes(noteList);
    }
  }, [noteList]);

  useEffect(() => {
    /* Delete note */
    socket.on(
      `delete-note-response-${note?._id}`,
      async (deleteNote: { [Key: string]: any }) => {
        console.log("note", note);
        await removeDeletedNote(deleteNote?._id, selectedSectionId);
        await updateTotalNotes(selectedSectionId, "substract");
        setNote(null);
      }
    );

    /* Update note */
    socket.on(
      `update-note-response-${note?._id}`,
      (newNote: { [Key: string]: any }) => {
        console.log("response", 234);
        setNote(null);
        setShowNote(false);
        updateNote(newNote, selectedSectionId);
      }
    );

    return () => {
      socket.off(`update-note-response-${note?._id}`);
      socket.off(`delete-note-response-${note?._id}`);
    };
  }, [notes, note]);

  useEffect(() => {
    /* Add new note */
    socket.on(
      `create-note-response-${selectedSectionId}`,
      (newNote: { [Key: string]: any }) => {
        console.log("response", 123);
        addNotes(newNote, selectedSectionId);
        setShowNote(false);
        setSelectedSectionId(null);
      }
    );

    return () => {
      socket.off(`create-note-response-${selectedSectionId}`);
    };
  }, [notes, selectedSectionId]);

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
    setShowNote(false);
  };

  const renderUpdateNote = useCallback(() => {
    return (
      <Box p={1}>
        <ClickAwayListener onClickAway={() => handleClickAway()}>
          <UpdateNote
            selectedNote={note}
            sectionId={sectionId}
            handleCancel={handleCancel}
            notes={notes}
          />
        </ClickAwayListener>
      </Box>
    );
  }, [selectedSectionId, sectionId, showNote]);

  const renderCreateNoteButton = useCallback(() => {
    return (
      <Grid container>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Box p={1}>
            <Tooltip arrow title="Create Note">
              <Zoom in={true} timeout={1500}>
                <Button
                  variant="contained"
                  size="small"
                  fullWidth
                  classes={{ root: buttonStyle }}
                  onClick={() => createNote(sectionId)}
                >
                  <Typography variant="h5">+ Create Note</Typography>
                </Button>
              </Zoom>
            </Tooltip>
          </Box>
        </Grid>
      </Grid>
    );
  }, [showNote, enableActions]);

  return (
    <React.Fragment>
      {showNote ? <>{renderUpdateNote()}</> : null}
      {!showNote && enableActions && <>{renderCreateNoteButton()}</>}
      <Droppable
        droppableId={sectionId}
        type="NOTE"
        // ignoreContainerClipping={false} // undefined or false
        // isDropDisabled={isDropDisabled}
        // isCombineEnabled={false} //always false
      >
        {(
          dropProvided: DroppableProvided,
          dropSnapshot: DroppableStateSnapshot
        ) => (
          <div ref={dropProvided.innerRef}>
            <NotesList
              notes={notes}
              editNote={editNote}
              dropProvided={dropProvided}
              showNote={showNote}
              deleteNote={deleteNote}
              sectionIndex={sectionIndex}
            />
          </div>
        )}
      </Droppable>
    </React.Fragment>
  );
}

export default Note;
