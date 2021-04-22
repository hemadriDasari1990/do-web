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
import NoteListSkeleton from "../common/skeletons/notesList";
import Tooltip from "@material-ui/core/Tooltip";
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
  const { sectionId, startSession, sectionIndex } = props;
  const { buttonStyle } = useStyles();
  const authenticated = useAuthenticated();
  const { board } = useBoard();
  const { socket } = useSocket();
  const dispatch = useDispatch();
  const { loading } = useLoading(sectionId);

  const enableActions = () => {
    if (authenticated && (startSession || board?.startedAt)) {
      return true;
    }
    if (!authenticated && board?.status === "inprogress" && !board?.isPrivate) {
      return true;
    }
    return false;
  };

  /* Local states */

  const [note, setNote] = useState<any>(null);
  const [showNote, setShowNote] = useState(false);
  const [selectedSectionId, setSelectedSectionId] = useState<any>(null);

  /* React Hooks */

  useEffect(() => {
    dispatch(getNotesBySectionId(sectionId, sectionId));
  }, [sectionId]);

  useEffect(() => {
    /* Update note */
    socket.on(
      `update-note-response-${sectionId}`,
      (newNote: { [Key: string]: any }) => {
        setNote(null);
        setShowNote(false);
      }
    );

    /* Add new note */
    socket.on(
      `create-note-response-${sectionId}`,
      (newNote: { [Key: string]: any }) => {
        if (sectionId === newNote?.sectionId) {
          setShowNote(false);
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
    setShowNote(false);
  };

  const getBackgroundColor = (
    isDraggingOver: boolean,
    isDraggingFrom: boolean
  ): string => {
    if (isDraggingOver) {
      return "#fffae9";
    }
    if (isDraggingFrom) {
      return "#f5f7ff";
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
  }, [showNote, enableActions()]);

  return (
    <React.Fragment>
      {showNote ? <>{renderUpdateNote()}</> : null}
      {!showNote && enableActions() && <>{renderCreateNoteButton()}</>}
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
            ref={dropProvided.innerRef}
            style={{
              backgroundColor: getBackgroundColor(
                dropSnapshot.isDraggingOver,
                Boolean(dropSnapshot.draggingFromThisWith)
              ),
              opacity: "inherit",
              margin:
                dropSnapshot.isDraggingOver ||
                Boolean(dropSnapshot.draggingFromThisWith)
                  ? 8
                  : 0,
              borderRadius: 6,
            }}
          >
            <NotesList
              editNote={editNote}
              dropProvided={dropProvided}
              showNote={showNote}
              deleteNote={deleteNote}
              sectionIndex={sectionIndex}
              sectionId={sectionId}
            />
          </div>
        )}
      </Droppable>
    </React.Fragment>
  );
}

export default Note;
