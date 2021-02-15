import React, { useState } from "react";
import { Theme, makeStyles } from '@material-ui/core/styles';

// import { BOARD_DASHBOARD } from "../../../routes/config";
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import ScrumBoard from '../../../assets/board.svg'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Zoom from '@material-ui/core/Zoom'
import { updateBoard } from "../../../redux/actions/board"
// import { createBoard } from "../../../redux/actions/board"
// import { replaceStr } from "../../../util";
// import { showCreateBoardButton } from "../../../redux/actions/common"
import { useDispatch } from "react-redux";
import { useParams } from "react-router";

// import { useBoard, useLoading } from "../../../redux/state/board"

// import { useHistory } from "react-router";

const useStyles = makeStyles((theme: Theme) => ({
    textFieldStyle: {
        width: "100% !important",
        marginTop: theme.spacing(3)
    }
}));

const Create = () => {
    const { textFieldStyle } = useStyles();
    const dispatch = useDispatch();
    
    /* Redux hooks */
    const { projectId } = useParams<{ projectId: string }>();
    
    /* Local state */
    const [formData, setFormData] = useState<{[Key: string]: any}>({
        title: "",
        description: "",
        noOfSections: 0,
        sprint: 0,
        duration: null
    });
    const { title, description, noOfSections, sprint, duration } = formData;

    /* React Hooks */
    
    /* Handler functions */
    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    const handleReset = () => {
        setFormData({
            title,
            description,
            noOfSections: 0,
            sprint: 0,
            duration: null
        });
    }

    const handleSubmit = (data: {[Key: string]: any}) => {
        dispatch(updateBoard(data));
    }

    return (
        <React.Fragment>
            <Grid container spacing={2}>
                <Hidden only={["xs"]}>
                    <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                        <Box mt={5}>
                            <Zoom in={true} timeout={2000}>
                                <img src={ScrumBoard} height="300px" width="fit-content"/>
                            </Zoom>
                        </Box>
                    </Grid>
                </Hidden>
                <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                    <Box>
                        <Typography variant="h1">Create New Board</Typography>
                    </Box>
                    <Box>
                        <TextField
                            name="title"
                            id="title"
                            label="Title"
                            placeholder="Enter title of the board"
                            value={title}
                            onChange={handleInput}
                            required
                            className={textFieldStyle}
                        />
                    </Box>
                    <Box>
                        <TextField
                            name="description"
                            id="description"
                            label="Description"
                            placeholder="Enter description of the board"
                            value={description}
                            onChange={handleInput}
                            required
                            className={textFieldStyle}
                        />
                    </Box>
                    <Box>
                        <TextField
                            name="noOfSections"
                            id="noOfSections"
                            label="Number Of Sections"
                            placeholder="Enter no of senctions"
                            value={noOfSections}
                            onChange={handleInput}
                            required
                            className={textFieldStyle}
                        />
                    </Box>
                    <Box>
                        <TextField
                            name="sprint"
                            id="sprint"
                            label="Sprint no?"
                            placeholder="Enter your sprint number"
                            value={sprint}
                            onChange={handleInput}
                            required
                            className={textFieldStyle}
                        />
                    </Box>
                    <Box>
                        <TextField
                            name="duration"
                            id="duration"
                            label="Duration of Retro?"
                            value={duration}
                            onChange={handleInput}
                            placeholder="Enter Duration in HH:MM format"
                            required
                            className={textFieldStyle}
                        />
                    </Box>
                    <Box mt={5} display="flex">
                        <Box mr={5}>
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                onClick={() => handleSubmit({
                                    title,
                                    description,
                                    noOfSections: noOfSections ? parseInt(noOfSections): 0,
                                    sprint: sprint ? parseInt(sprint): 0,
                                    duration,
                                    projectId
                                })}
                            >
                                Submit
                            </Button>
                        </Box>
                        <Box>
                            <Button
                                variant="outlined"
                                color="primary"
                                size="small"
                                onClick={() => handleReset()}
                            >
                                Reset
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            
        </React.Fragment>
    )
}

export default Create;
