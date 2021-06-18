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
  const { sectionId, startSession, sectionIndex, totalNotes } = props;
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

    if (startSession || board?.startedAt) {
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
    if ((!board?.isPrivate && !authenticated) || authenticated) {
      dispatch(getNotesBySectionId(sectionId, sectionId));
    }
  }, [sectionId]);

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
  }, [selectedSectionId, sectionId, showNote]);

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
            />
          </div>
        )}
      </Droppable>
      {!showNote && enableActions() && <>{renderCreateNoteButton()}</>}
      {showNote ? <>{renderUpdateNote()}</> : null}
    </React.Fragment>
  );
}

export default Note;
