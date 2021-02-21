import React, { useEffect, useState } from 'react'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grid from '@material-ui/core/Grid'
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography'
import Zoom from '@material-ui/core/Zoom'
import { makeStyles } from '@material-ui/core/styles';
import socket from "../../socket";

const NotesList = React.lazy(() => import("./list"));
const UpdateNote = React.lazy(() => import("./Update"));
const NoRecords = React.lazy(() => import("../NoRecords"));

const useStyles = makeStyles(() => ({
    buttonStyle: {
        height: 45,
        boxShadow: "0 5px 10px rgba(154,160,185,.05), 0 15px 40px rgba(166,173,201,.2)",
        justifyContent: "center !important",
        '&:hover': {
            boxShadow: 'none',
            justifyContent: "center",
        },
    }
}));

function Note(props: any) {
    const { sectionId, noteList, updateTotalNotes } = props;
    const { buttonStyle } = useStyles();

    /* Local states */
    const [notes, setNotes] = useState(noteList || []); 
    const [note, setNote] = useState<{[Key:string]: any}>({}); 
    const [showNote, setShowNote] = useState(false);
    const [selectedSectionId, setSelectedSectionId] = useState("");

    /* React Hooks */
    useEffect(() => {
        /* Delete note */
        socket.on(`delete-note-${sectionId}`, async (newNote: {[Key:string]: any}) => {
            await filterNotes(newNote?._id);
            await updateTotalNotes(sectionId, "substract");
        });

        /* Add new note */
        socket.on(`update-note-${sectionId}`, (newNote: {[Key:string]: any}) => {
            if(sectionId === newNote?.sectionId){
                const notesList = [...notes];
                const noteIndex = notesList.findIndex((n: {[Key: string]: any}) => n._id === newNote._id);
                const noteData = notes[noteIndex];
                if(noteData){
                    noteData.description = newNote.description;
                    notesList[noteIndex] = noteData;
                    setNotes(notesList);
                } else {
                    setNotes((currentNotes: Array<{[Key:string]: any}>) => [...currentNotes, newNote]);
                    updateTotalNotes(sectionId, "add");
                }
                setNote({});
                setShowNote(false);
            }
        });
        return () => {
            socket.off(`update-note-${sectionId}`);
            socket.off(`delete-note-${sectionId}`);
        };
    }, [notes]);

    const editNote = (note: {[Key: string]: any}) => {
        if(!note){
            return;
        }
        setShowNote(true);
        setSelectedSectionId(note.sectionId)
        setNote(note);
    }

    const filterNotes = (noteId: string) => {
        if(!notes){
            return;
        }
        const filteredNotes: Array<{[Key: string]: any}> = notes.filter(
            (item: {[Key: string]: any}) => item._id !== noteId,
        )
        setNotes(filteredNotes);
    }

    const createNote = (sectionId: string) => {
        setShowNote(true);
        setSelectedSectionId(sectionId);
    }

    const handleClickAway = () => {
        setShowNote(false);
    }

    const handleCancel = () => {
        setShowNote(false);
    }

    return (
        <React.Fragment>
            {selectedSectionId === sectionId && showNote && <Box p={1}>
                <ClickAwayListener onClickAway={handleClickAway}>
                    <UpdateNote selectedNote={note} sectionId={sectionId} handleCancel={handleCancel} />
                </ClickAwayListener>
            </Box>}
            {!showNote && <Grid container>
                <Grid item  xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Box p={1}>
                        <Tooltip title="Create Note">
                            <Zoom in={true} timeout={1500}>
                                <Button
                                    variant="contained"
                                    size="small"
                                    fullWidth
                                    classes={{root: buttonStyle}}
                                    onClick={() => createNote(sectionId)}
                                >
                                    <Typography variant="h5">+ Create Note</Typography>
                                </Button>
                            </Zoom>
                        </Tooltip>
                    </Box>
                </Grid>
            </Grid>}
            {!notes?.length && !showNote && (
                <Box my={1}>
                    <NoRecords message="No notes found" />
                </Box>
            )}
            <Box>
                <NotesList notes={notes} sectionId={sectionId} editNote={editNote} />
            </Box>
        </React.Fragment>
    )
}

export default Note;
