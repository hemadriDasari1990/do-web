import React, { useState } from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { Tooltip } from '@material-ui/core';
import Zoom from '@material-ui/core/Zoom'
import { makeStyles } from '@material-ui/core/styles';
// import socket from "../../socket";
import { updateNote } from '../../redux/actions';
import { useDispatch } from "react-redux";

const useStyles = makeStyles(() => ({
    textfieldStyle: {
        "& .MuiFilledInput-root": {
            background: "#fff",
            borderRadius: 10,
            border: "2px solid #0072ff",
            paddingTop: "0px !important"
        },
    }
}));

export default function NoteUpdate(props: any) {
    const { sectionId, selectedNote, setShowNote } = props;
    const { textfieldStyle } = useStyles();
    const dispatch = useDispatch();

    /* Local states */
    const [description, setDescription] = useState(selectedNote?.description || "");

    /* Handler functions */
    const handleNote = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    }

    const saveNote = () => {
        dispatch(updateNote({
            description: description,
            sectionId,
            noteId: selectedNote?._id
        }));
    }

  return (
    <React.Fragment>
        <Box mb={1}>
            <TextField 
                variant="filled"
                size="medium"
                fullWidth 
                multiline 
                onChange={handleNote}
                className={textfieldStyle}
                value={description}
                InputProps={{
                    disableUnderline: true,
                    style: {
                        minHeight: 90,
                        paddingTop: 40
                    },
                }}
            />
        </Box>
        <Box display="flex" justifyContent="space-between">
            <Box>
                <Tooltip title="Save Note">
                    <Zoom in={true} timeout={1500}>
                        <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            onClick={() => setShowNote(false)}
                        >
                            Cancel
                        </Button>
                    </Zoom>
                </Tooltip>
            </Box>
            <Box>
                <Tooltip title="Save Note">
                    <Zoom in={true} timeout={1500}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            disabled={!description.trim()} 
                            onClick={() => saveNote()}
                        >
                            Add Note
                        </Button>
                    </Zoom>
                </Tooltip>
            </Box>
        </Box>
    </React.Fragment>
  );
}