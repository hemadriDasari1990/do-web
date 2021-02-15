import React, { useEffect, useState } from "react";

import Box from '@material-ui/core/Box'
// import Button from '@material-ui/core/Button'
// import Zoom from '@material-ui/core/Zoom'
import DeleteIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
// import DisAgreeIcon from '@material-ui/icons/ThumbDownAlt';
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
// import InputAdornment from '@material-ui/core/InputAdornment';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import Paper from '@material-ui/core/Paper'
import Tooltip from '@material-ui/core/Tooltip';
// import LoveIcon from '@material-ui/icons/Favorite';
// import SaveIcon from '@material-ui/icons/Save';
// import TextField from '@material-ui/core/TextField'
// import { Tooltip } from '@material-ui/core';
import Typography from '@material-ui/core/Typography'
import { createOrUpdateReaction } from '../../redux/actions';
import { deleteNote } from '../../redux/actions';
// import Zoom from '@material-ui/core/Zoom'
// import formateNumber from "../../util/formateNumber";
// import getPastTime from "../../util/getPastTime";
import { makeStyles } from '@material-ui/core/styles';
import socket from "../../socket";
import { useDispatch } from "react-redux";

// import { useLoading, useNote } from "../../redux/state/note";
// import { useReaction } from "../../redux/state/reaction";

const ResponsiveDialog = React.lazy(() => import("../Dialog"));
const ReactionPopover = React.lazy(() => import("./Reaction"));
const ReactionView = React.lazy(() => import("./Reaction/view"));

const useStyles = makeStyles(() => ({
    cursorStyle: {
        cursor: 'pointer'
    },
    adornmentStyle: {
        marginTop: "0px !important", 
        marginRight: 0, 
        top: 12,
        right: 10,
        // position: "absolute"
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
    },
    paperStyle: {
        padding: 10, 
        minHeight: 70,
        borderRadius: 6,
        boxShadow: "0 5px 10px rgba(154,160,185,.05), 0 15px 40px rgba(166,173,201,.2)"
    },
    deleteIconStyle: {
        color: "#ff0000"
    },
    iconButtonStyle: {
        borderRadius: 5
    }
}));

// const StyledBadge = withStyles(() =>
//   createStyles({
//     badge: {
//         height: 20,
//         width: "fit-content",
//         borderRadius: 20,
//     },
//   }),
// )(Badge);

const NoteList = (props: any) => {
    const { notes, editNote, sectionId } = props;
    const { paperStyle, deleteIconStyle, iconButtonStyle } = useStyles();
    const dispatch = useDispatch();

    /* Redux hooks */
    // const { note } = useNote();
    // const { loading } = useLoading();
    // const { reaction } = useReaction();

    // const { loading: reactionloading } = useReactionLoading();

    /* Local state */
    // const [isSelected, setIsSelected] = useState(false);
    const [selectedNote, setSelectedNote] = useState<{[Key: string]: any}>({});
    const [deleteDialog, setOpenDeleteDialog] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const [notesList, setNotesList] = useState(notes);
    // const [typing, setTyping] = useState("");

    /* React Hooks */
    // useEffect(() => {
        // dispatch(getNotesBySectionId(sectionId));

        // /* Add new note */
        // socket.on("update-note", (newNote: {[Key:string]: any}) => {
        //     if(sectionId === newNote?.sectionId){
        //         setNotes((currentNotes: Array<{[Key:string]: any}>) => [...currentNotes, newNote]);
        //         updateTotalNotes(sectionId, "add");
        //         setShowNote(false);
        //     }
        // });

        /* Add new reaction */
        // socket.on("new-reaction", (newReaction: {[Key:string]: any}) => {
        //     console.log("noteData", notesList)
        //     updateTotalReactions(newReaction);
        // });
        
        // return () => {
        //     socket.off("new-reaction");
        //     // socket.off("new-note");
        //     // socket.off("delete-note");
        //     // socket.disconnect();
        // };
    // }, []);

    useEffect(() => {
       
    }, []);

    useEffect(() => {
        setNotesList(notes);
        socket.on(`new-reaction-${sectionId}`, (newReaction: {[Key:string]: any}) => {
            console.log("test", 123, selectedNote)
            updateTotalReactions(newReaction);
        });
        
        return () => {
            socket.off(`new-reaction-${sectionId}`);
        };
    }, [notes]);
    
    /* Handler functions */
    const deleteNoteById = (note: {[Key:string]: any}) => {
        setSelectedNote(note);
        setOpenDeleteDialog(true);
    }

    // const handleReactionClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    //     setAnchorEl(event.currentTarget);
    //   };
  
    const handlePopoverClose = () => {
      setAnchorEl(null);
    };

    const updateTotalReactions = (newReaction: {[Key: string]: any}) => {
        if(!notesList){
            return;
        }
        const newNotes: Array<{[Key: string]: any}> = [...notes];
        const noteIndex: number = newNotes.findIndex(
            (newNote: {[Key: string]: any}) => newNote._id === newReaction.noteId,
        )
        const noteData: {[Key: string]: any} = newNotes[noteIndex];

        if(!noteData){
            return;
        }
        // noteData.reactions.push(newReaction);
        switch(newReaction?.type){
            case "plusOne":
                noteData.totalPlusOne = parseInt(noteData.totalPlusOne) > 0 ? noteData.totalPlusOne + 1: 1;
                break;
            case "plusTwo":
                noteData.totalPlusTwo = parseInt(noteData.totalPlusTwo) > 0 ? noteData.totalPlusTwo + 1: 1;
                break;
            case "disagree":
                noteData.totalDisAgreed = parseInt(noteData.totalDisAgreed) > 0 ? noteData.totalDisAgreed + 1: 1;
                break;
            case "love":
                noteData.totalLove = parseInt(noteData.totalLove) > 0 ? noteData.totalLove + 1: 1;
                break;
            case "deserve":
                noteData.totalDeserve = parseInt(noteData.totalDeserve) > 0 ? noteData.totalDeserve + 1: 1;
                break;
            default:
                break;
        }

        newNotes[noteIndex] = noteData;
        setNotesList(newNotes);
    }

    // const saveNote = () => {
    //     dispatch(updateNote({
    //         description: description,
    //         sectionId,
    //         noteId: selectedNote?._id
    //     }));
    // }

    // const handleInputFocus = (note: {[Key: string]: any}) => {
    //     setSelectedNote(note);
    //     // setIsSelected(true);
    // }

    // // const handleNote = (event: React.ChangeEvent<HTMLInputElement>) => {
    // //     setDescription(event.target.value);
    // // }

    // const handleExistingNote = (event: React.ChangeEvent<HTMLInputElement>, note: {[Key: string]: any}) => {
    //     setDescription(event.target.value);
    //     setSelectedNote(note);
    // }

    const handleReaction = (type: string, note: {[Key: string]: any}) => {
        dispatch(createOrUpdateReaction({
            noteId: note._id,
            type
        }));
    }

    const handleDelete = () => {
        dispatch(deleteNote(selectedNote._id));
        setOpenDeleteDialog(false);
    }

    const handleClose = () => {
        setOpenDeleteDialog(false);
    }

    const handleReactionClick = (event: React.MouseEvent<HTMLButtonElement>, note: {[Key: string]: any}) => {
        setAnchorEl(event.currentTarget);
        setSelectedNote(note);
    };

    const renderDeleteDialog = () => {
        return (
            <Box>
                <ResponsiveDialog open={deleteDialog} title="Delete Note" pcta="Delete" scta="Cancel" handleSave={handleDelete} handleClose={handleClose}>
                    <Typography variant="h4">Are you sure you want to delete {selectedNote?.description}?</Typography>
                </ResponsiveDialog>
            </Box>
        )
    }

    return (
        <React.Fragment>
            {renderDeleteDialog()}
            <Grid container spacing={0}>
                {Array.isArray(notesList) && notesList.map((note: {[Key: string]: any}) => (
                    <Grid item key={note._id} xl={12} lg={12} md={12} sm={12} xs={12}>
                        <Box p={1}>
                            <Paper className={paperStyle}>
                                <Box style={{minHeight: 40}}>
                                    <Typography variant="h6">{note.description}</Typography>
                                </Box>
                                <Box pt={2} display="flex" justifyContent="space-between">
                                    <Box>
                                        <ReactionView note={note} />
                                    </Box>
                                    <Box display="flex">
                                        <Tooltip title="Add your reaction">
                                            <IconButton className={iconButtonStyle} size="small" onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleReactionClick(event, note)}>
                                                +<InsertEmoticonIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Edit">
                                            <IconButton size="small" onClick={() => editNote(note)}>
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton size="small" onClick={() => deleteNoteById(note)}>
                                                <DeleteIcon className={deleteIconStyle} />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                </Box>
                            </Paper>
                            <ReactionPopover handleReaction={handleReaction} anchorEl={anchorEl} note={selectedNote} handlePopoverClose={handlePopoverClose} />
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </React.Fragment>
    )
}

export default NoteList;
