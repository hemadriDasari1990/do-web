import React, { useEffect, useState } from "react";
import { createOrUpdateReaction, deleteNote, getNotesBySectionId, updateNote } from '../../redux/actions';
import { createStyles, makeStyles, withStyles } from '@material-ui/core/styles';

import AgreeIcon from '@material-ui/icons/ThumbUpAlt';
import Badge from '@material-ui/core/Badge'
import Box from '@material-ui/core/Box'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import DeleteIcon from '@material-ui/icons/Delete';
import DisAgreeIcon from '@material-ui/icons/ThumbDownAlt';
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment';
import LoveIcon from '@material-ui/icons/Favorite';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField'
import { Tooltip } from '@material-ui/core';
import Typography from '@material-ui/core/Typography'
import Zoom from '@material-ui/core/Zoom'
import formateNumber from "../../util/formateNumber";
import getPastTime from "../../util/getPastTime";
import socket from "../../socket";
import { useDispatch } from "react-redux";

// import { useLoading, useNote } from "../../redux/state/note";
// import { useReaction, useReactionLoading } from "../../redux/state/reaction";
const ResponsiveDialog = React.lazy(() => import("../Dialog"));

const useStyles = makeStyles(() => ({
    cursorStyle: {
        cursor: 'pointer'
    },
    adornmentStyle: {
        marginTop: "0px !important", 
        marginRight: 0, 
        top: 12,
        right: 10,
        position: "absolute"
    },
    startAdornmentStyle: {
        top: 1,
        position: "absolute",
        borderRadius: 30,
        backgroundColor: "#dfedff",
        height: 20,
        marginTop: "8px !important"
    },
    pastTimeStyle: {
        color: "#0072ff",
        padding: 10,
        fontWeight: 600
    },
    textfieldStyle: {
        "& .MuiFilledInput-root": {
            background: "#fff",
            borderRadius: 10
        }
    },
    iconStyle: {
        marginTop: 5
    }
}));

const StyledBadge = withStyles(() =>
  createStyles({
    badge: {
        height: 20,
        width: "fit-content",
        borderRadius: 20,
    },
  }),
)(Badge);

const NoteList = (props: any) => {
    const { sectionId, selectedSectionId, showNote, handleClickAway, noteList, setShowNote, updateTotalNotes } = props;
    const { cursorStyle, adornmentStyle, startAdornmentStyle, pastTimeStyle, textfieldStyle, iconStyle } = useStyles();
    const dispatch = useDispatch();
    
    /* Redux hooks */
    // const { note } = useNote();
    // const { loading } = useLoading();
    // const { reaction } = useReaction();
    // const { loading: reactionloading } = useReactionLoading();

    /* Local state */
    const [isSelected, setIsSelected] = useState(false);
    const [selectedNote, setSelectedNote] = useState<{[Key: string]: any}>({});
    const [description, setDescription] = useState("");
    const [notes, setNotes] = useState(noteList || []);
    const [deleteDialog, setOpenDeleteDialog] = useState(false);
    
    /* React Hooks */
    useEffect(() => {
        dispatch(getNotesBySectionId(sectionId));

        /* Delete note */
        socket.on("delete-note", (newNote: {[Key:string]: any}) => {
            filterNotes(newNote?._id);
            updateTotalNotes(sectionId, "substract");
        });

        /* Add new note */
        socket.on("update-note", (newNote: {[Key:string]: any}) => {
            if(sectionId === newNote?.sectionId){
                setNotes((currentNotes: Array<{[Key:string]: any}>) => [...currentNotes, newNote]);
                updateTotalNotes(sectionId, "add");
                setShowNote(false);
            }
        });

        /* Add new reaction */
        socket.on("new-reaction", (newReaction: {[Key:string]: any}) => {
            updateTotalReactions(newReaction);
        });
        
        return () => {
            socket.off("new-reaction");
            socket.off("new-note");
            socket.off("delete-note");
            socket.disconnect();
        };
    }, []);
    
    /* Handler functions */
    const deleteNoteById = (note: {[Key:string]: any}) => {
        dispatch(deleteNote(note._id));
        setSelectedNote(note);
        setOpenDeleteDialog(true);
    }

    const updateTotalReactions = (newReaction: {[Key: string]: any}) => {
        if(!notes){
            return;
        }
        const newNotes: Array<{[Key: string]: any}> = [...notes];
        const noteIndex: number = newNotes.findIndex(
            newNote => newNote._id === newReaction.noteId,
        )
        const noteData: {[Key: string]: any} = newNotes[noteIndex];
        if(!noteData){
            return;
        }

        switch(newReaction?.type){
            case "agree":
                noteData.totalAgreed = parseInt(noteData.totalAgreed) > 0 ? noteData.totalAgreed + 1: 1;
                break;
            case "disagree":
                noteData.totalDisAgreed = parseInt(noteData.totalDisAgreed) > 0 ? noteData.totalDisAgreed + 1: 1;
                break;
            case "love":
                noteData.totalLove = parseInt(noteData.totalLove) > 0 ? noteData.totalLove + 1: 1;
                break;
            default:
                break;
        }
        newNotes[noteIndex] = noteData;
        setNotes(newNotes);
    }

    const saveNote = () => {
        dispatch(updateNote({
            description: description,
            sectionId,
            noteId: selectedNote?._id
        }));
    }

    const handleInputFocus = (note: {[Key: string]: any}) => {
        setSelectedNote(note);
        setIsSelected(true);
    }

    const handleNote = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    }

    const handleExistingNote = (event: React.ChangeEvent<HTMLInputElement>, note: {[Key: string]: any}) => {
        setDescription(event.target.value);
        setSelectedNote(note);
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

    const handleReaction = (noteId: string, type: string) => {
        dispatch(createOrUpdateReaction({
            noteId,
            type
        }));
    }

    const handleDelete = () => {
        setOpenDeleteDialog(false);
    }

    const handleClose = () => {
        setOpenDeleteDialog(false);
    }

    const renderDeleteDialog = () => {
        return (
            <Box>
                <ResponsiveDialog open={deleteDialog} title="Delete Note" pcta="Delete" scta="Cancel" handleSave={handleDelete} handleClose={handleClose}>
                    <Typography variant="h4"> Are you sure you want to delete {selectedNote?.description}?</Typography>
                </ResponsiveDialog>
            </Box>
        )
    }

    return (
        <React.Fragment>
            {renderDeleteDialog()}
            <Box p={1}>
            {selectedSectionId === sectionId && showNote && <Box mb={2}>
                    <ClickAwayListener onClickAway={handleClickAway}>
                        <TextField 
                            variant="filled"
                            size="medium"
                            fullWidth 
                            multiline 
                            onFocus={() => handleInputFocus({})}
                            onBlur={() => handleInputFocus({})}
                            onChange={handleNote}
                            className={textfieldStyle}
                            InputProps={{
                                style: {
                                    minHeight: 90,
                                    paddingTop: 40
                                },
                                ...(isSelected ? { endAdornment:
                                    <InputAdornment position="start">
                                        <Box display="flex" mb={3} justifyContent="space-between" className={adornmentStyle}>
                                            <Box>
                                                <Tooltip title="Save Note">
                                                    <Zoom in={true} timeout={1500}>
                                                        <SaveIcon color="primary" className={cursorStyle} onClick={() => saveNote()} />
                                                    </Zoom>
                                                </Tooltip>
                                            </Box>
                                        </Box>
                                    </InputAdornment> }: {})
                            }}
                        />
                    </ClickAwayListener>
                </Box>}
                {Array.isArray(notes) && notes.map((note: {[Key: string]: any}) => (
                    <Grid item key={note._id} xl={12} lg={12} md={12} sm={12} xs={12}>
                        <Box mb={1}>
                            <TextField 
                                variant="filled" 
                                fullWidth 
                                multiline 
                                onFocus={() => handleInputFocus(note)}
                                onBlur={() => handleInputFocus(note)}
                                value={note._id === selectedNote._id ? description || note.description: note.description}
                                // defaultValue={note.description}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleExistingNote(event, note)}
                                className={textfieldStyle}
                                InputProps={{
                                    style: {
                                        minHeight: 90,
                                        paddingTop: 40
                                    },
                                    startAdornment: (
                                        <InputAdornment position="start" className={startAdornmentStyle}>
                                            <small className={pastTimeStyle}>
                                                {getPastTime(note.updatedAt)}
                                            </small>
                                        </InputAdornment>
                                      ),
                                    endAdornment:
                                        <InputAdornment position="start">
                                            <Box display="flex" mb={3} justifyContent="space-between" className={adornmentStyle}>
                                                <Box mr={2}>
                                                    <Tooltip title="Save Note">
                                                        <IconButton className={iconStyle} size="small" color={(note?.description?.trim() === description?.trim()) || !description?.trim() ? "default": "primary"} disabled={(note?.description?.trim() === description?.trim()) || !description?.trim()} onClick={() => saveNote()}>
                                                            <SaveIcon fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Box>
                                                <Box mr={2}>
                                                    <Tooltip title="I Agree">
                                                        <Zoom in={true} timeout={1500}>
                                                            <StyledBadge color="primary" badgeContent={formateNumber(note?.totalAgreed)} showZero={true}>
                                                                <IconButton onClick={() => handleReaction(note._id, "agree")} className={iconStyle} size="small">
                                                                    <AgreeIcon fontSize="small" />
                                                                </IconButton>
                                                            </StyledBadge>
                                                        </Zoom>
                                                    </Tooltip>
                                                </Box>
                                                <Box mr={2}>
                                                    <Tooltip title="I Dis Agree">
                                                        <Zoom in={true} timeout={1500}>
                                                            <StyledBadge color="primary" badgeContent={formateNumber(note?.totalDisAgreed)} showZero={true}>
                                                                <IconButton onClick={() => handleReaction(note._id, "disagree")} className={iconStyle} size="small">
                                                                    <DisAgreeIcon fontSize="small" />
                                                                </IconButton>
                                                            </StyledBadge>
                                                        </Zoom>
                                                    </Tooltip>
                                                </Box>
                                                <Box mr={2}>
                                                    <Tooltip title="I Love It">
                                                        <Zoom in={true} timeout={1500}>
                                                            <StyledBadge color="primary" badgeContent={formateNumber(note?.totalLove)} showZero={true}>
                                                                <IconButton onClick={() => handleReaction(note._id, "love")} className={iconStyle} size="small">
                                                                    <LoveIcon fontSize="small" />
                                                                </IconButton>
                                                            </StyledBadge>
                                                        </Zoom>
                                                    </Tooltip>
                                                </Box>
                                                <Box mt={0.5}>
                                                    <Tooltip title="Delete Note">
                                                        <Zoom in={true} timeout={1500}>
                                                            <IconButton className={iconStyle} size="small" onClick={() => deleteNoteById(note)}>
                                                                <DeleteIcon fontSize="small" />
                                                            </IconButton>
                                                        </Zoom>
                                                    </Tooltip>
                                                </Box>
                                            </Box>
                                        </InputAdornment>
                                }}
                            />
                        </Box>
                    </Grid>
                ))}
            </Box>
        </React.Fragment>
    )
}

export default NoteList;
