import React, { useEffect, useState } from "react";
import { deleteNote, markAsRead } from '../../redux/actions';

import Box from '@material-ui/core/Box'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import DoneAllOutlinedIcon from '@material-ui/icons/DoneAllOutlined';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Menu from '@material-ui/core/Menu'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Paper from '@material-ui/core/Paper'
import ScheduleIcon from '@material-ui/icons/Schedule';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography'
import Zoom from '@material-ui/core/Zoom'
import { createOrUpdateReaction } from '../../redux/actions';
import getPastTime from '../../util/getPastTime';
import { makeStyles } from '@material-ui/core/styles';
import socket from "../../socket";
import { useAuthenticated } from "../../redux/state/common";
import { useDispatch } from "react-redux";
import { useNote } from "../../redux/state/note";

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
    iconButtonStyle: {
        borderRadius: 5
    }
}));

const NoteList = (props: any) => {
    const { notes, editNote, sectionId } = props;
    const { paperStyle, iconButtonStyle } = useStyles();
    const dispatch = useDispatch();
    const authenticated = useAuthenticated();
    
    /* Redux hooks */
    const { note } = useNote();
    
    /* Local state */
    const [selectedNote, setSelectedNote] = useState<{[Key: string]: any}>({});
    const [deleteDialog, setOpenDeleteDialog] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const [clickAwayAnchorEl, setClickAwayAnchorEl] = React.useState<HTMLElement | null>(null);
    const [notesList, setNotesList] = useState(notes);
    const [open, setOpen] = React.useState(false);
    
    /* React Hooks */

    useEffect(() => {
       
    }, []);

    useEffect(() => {
        setNotesList(notes);
        socket.on(`new-reaction-${sectionId}`, (newReaction: {[Key:string]: any}) => {
            updateTotalReactions(newReaction);
        });
        return () => {
            socket.off(`new-reaction-${sectionId}`);
        };
    }, [notes]);

    useEffect(() => {
        socket.on(`mark-read-${sectionId}`, (updatedNote: {[Key:string]: any}) => {
            updateNote(updatedNote);
        });
        return () => {
            socket.off(`mark-read-${sectionId}`);
        };
    }, [note]);
    
    /* Handler functions */
    // const deleteNoteById = (note: {[Key:string]: any}) => {
    //     setSelectedNote(note);
    //     setOpenDeleteDialog(true);
    // }
  
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
        noteData.totalReactions = noteData.totalReactions + 1;
        newNotes[noteIndex] = noteData;
        setNotesList(newNotes);
    }

    const updateNote = (updatedNote: {[Key: string]: any}) => {
        if(!updatedNote){
            return;
        }
        const newNotes: Array<{[Key: string]: any}> = [...notesList];
        const noteIndex: number = newNotes.findIndex(
            (newNote: {[Key: string]: any}) => newNote._id === updatedNote._id,
        )
        const noteData: {[Key: string]: any} = newNotes[noteIndex];
        if(!noteData){
            return;
        }
        noteData.read = updatedNote.read;
        newNotes[noteIndex] = noteData;
        setNotesList(newNotes);
    }

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

    const handleButton = (event: React.MouseEvent<HTMLButtonElement>, note: {[Key: string]: any}) => {
        event.stopPropagation();
        setOpen(!open);
        setClickAwayAnchorEl(event.currentTarget);
        setSelectedNote(note);
    }

    const handleMarkRead = (note: {[Key: string]: any}) => {
        dispatch(markAsRead(note._id, {
            read: !note.read
        }));
    }

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
                onClose={handleClose}
                anchorEl={clickAwayAnchorEl}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                getContentAnchorEl={null}
                TransitionComponent={Zoom}
            >
                <ListItem button={true} onClick={() => handleMenuItem('edit')}>
                    <ListItemAvatar style={{ minWidth: 35 }}>
                        <EditIcon />
                    </ListItemAvatar>
                    <ListItemText
                        primary={<b>Edit Note</b>}
                        secondary="Update the note"
                    />
                </ListItem>
                {authenticated && <ListItem button={true}
                onClick={() => handleMenuItem('delete')}
                >
                <ListItemAvatar style={{ minWidth: 35 }}>
                    <DeleteOutlineIcon />
                </ListItemAvatar>
                <ListItemText
                    primary={<b>Delete Note</b>}
                    secondary="Once deleted can't be done"
                />
                </ListItem>}
            </Menu>
        </ClickAwayListener>
          
        )
      }

      const handleMenuItem = async (action: string) => {
        switch(action){
            case 'edit':
                editNote(selectedNote);
                break;
            case 'delete':
                setOpenDeleteDialog(true);
                break;
            default:
                break;
        }
        setOpen(false);
      }

    return (
        <React.Fragment>
            {renderDeleteDialog()}
            {renderMenu()}
            <Grid container spacing={0}>
                {Array.isArray(notesList) && notesList.map((note: {[Key: string]: any}) => (
                    <Grid item key={note._id} xl={12} lg={12} md={12} sm={12} xs={12}>
                        <Box p={1}>
                            <Paper className={paperStyle}>
                                <Box style={{minHeight: 40}}>
                                    <Typography variant="h6">{note.description}</Typography>
                                </Box>
                                <Box pt={2} display="flex" justifyContent="space-between">
                                    <Box display="flex">
                                        <Box>
                                            <ReactionView note={note} />
                                        </Box>
                                    </Box>
                                    <Box display="flex">
                                        <Box mt={0.2} mr={0.5} display="flex">
                                            <Box mt={0.1} mr={0.4}>
                                                <ScheduleIcon style={{ fontSize: 20, color: "#878787" }} />
                                            </Box>
                                            <Box>
                                                <Typography variant="h6">{getPastTime(note.createdAt)}</Typography>
                                            </Box>
                                        </Box>
                                        <Tooltip title="Add your reaction">
                                            <IconButton className={iconButtonStyle} aria-label="reaction-menu" size="small" onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleReactionClick(event, note)}>
                                                +<InsertEmoticonIcon />
                                            </IconButton>
                                        </Tooltip>
                                        {authenticated && <Tooltip title={note.read ? "Mark as unread": "Mark as read"}>
                                            <IconButton size="small" onClick={() => handleMarkRead(note)}>
                                                <DoneAllOutlinedIcon color={note.read ? "primary" : "inherit"} />
                                            </IconButton>
                                        </Tooltip>}
                                        <Tooltip title="Action">
                                            <IconButton size="small" aria-label="note-menu" onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleButton(event, note)}>
                                                <Zoom in={true} timeout={2000}>
                                                    <MoreHorizIcon />
                                                </Zoom>
                                            </IconButton>
                                        </Tooltip>
                                        
                                        {/* {authenticated && <Tooltip title="Delete">
                                            <IconButton size="small" onClick={() => deleteNoteById(note)}>
                                                <DeleteIcon className={deleteIconStyle} />
                                            </IconButton>
                                        </Tooltip>}  */}
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
