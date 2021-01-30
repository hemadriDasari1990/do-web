import React, { useEffect, useState } from "react";
import { Theme, makeStyles } from '@material-ui/core/styles';
import { useBoard, useLoading } from "../../../redux/state/board"

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import { DASHBOARD } from "../../../routes/config";
import TextField from '@material-ui/core/TextField'
import { createBoard } from "../../../redux/actions/board"
import { replaceStr } from "../../../util";
import { showCreateBoardButton } from "../../../redux/actions/common"
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme: Theme) => ({
    textFieldStyle: {
        width: "100% !important",
        marginTop: theme.spacing(3)
    }
}));

const Create = (props: any) => {
    const { handleDrawerClose } = props;
    const { textFieldStyle } = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    
    /* Redux hooks */
    const { board } = useBoard();
    const { loading } = useLoading();

    /* Local state */
    const [title, setTitle] = useState("");
    const [descrition, setDescrition] = useState("");
    const [noOfSections, setNoOfSections] = useState("");
    const [apiTriggered, setApiTriggered] = useState(false);
    const [sprint, setSprint] = useState("");
    const [duration, setDuration] = useState("");

    /* React Hooks */
    useEffect(() => {
        if(!loading && apiTriggered && board?._id){
            handleDrawerClose();
            history.push(replaceStr(DASHBOARD, ":boardId", board?._id));
            dispatch(showCreateBoardButton(false));
        }
        if(!loading && apiTriggered && !board?._id){
            // setShowError(true);
        }
    }, [loading, apiTriggered, board])

    useEffect(() => {
        dispatch(showCreateBoardButton(true));
    }, []);
    
    /* Handler functions */
    const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }

    const handleDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescrition(event.target.value);
    }

    const handleSections = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNoOfSections(event.target.value);
    }

    const handleSprint = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSprint(event.target.value);
    }

    const handleDuration = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDuration(event.target.value);
    }

    const handleSubmit = () => {
        setApiTriggered(false);
        dispatch(createBoard({
            title,
            descrition,
            noOfSections: noOfSections ? parseInt(noOfSections): 0,
            sprint: sprint ? parseInt(sprint): 0,
            duration
        }));
        setApiTriggered(true);
    }

    const handleReset = () => {
        setTitle("");
        setDescrition("");
        setNoOfSections("");
        setSprint("");
        setDuration("");
    }

    return (
        <React.Fragment>
            <Box>
                <TextField
                    name="title"
                    id="title"
                    label="Title"
                    defaultValue="Title about board"
                    value={title}
                    onChange={handleTitle}
                    required
                    className={textFieldStyle}
                />
            </Box>
            <Box>
                <TextField
                    name="description"
                    id="description"
                    label="Description"
                    defaultValue="Description"
                    value={descrition}
                    onChange={handleDescription}
                    required
                    className={textFieldStyle}
                />
            </Box>
            <Box>
                <TextField
                    name="noOfSections"
                    id="noOfSections"
                    label="Number Of Sections"
                    defaultValue="noOfSections"
                    value={noOfSections}
                    onChange={handleSections}
                    required
                    className={textFieldStyle}
                />
            </Box>
            <Box>
                <TextField
                    name="sprint"
                    id="sprint"
                    label="Sprint no?"
                    defaultValue="sprint"
                    value={sprint}
                    onChange={handleSprint}
                    required
                    className={textFieldStyle}
                />
            </Box>
            <Box>
                <TextField
                    name="duration"
                    id="duration"
                    label="Duration of Retro?"
                    defaultValue="duration"
                    value={duration}
                    onChange={handleDuration}
                    placeholder="Enter Duration in HH:MM format"
                    required
                    className={textFieldStyle}
                />
            </Box>
            <Box mt={5} display="flex" justifyContent="space-between">
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleSubmit()}
                >
                    Submit
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => handleReset()}
                >
                    Reset
                </Button>
            </Box>
        </React.Fragment>
    )
}

export default Create;
