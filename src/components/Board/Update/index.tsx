import React, { useEffect, useState } from "react";
import { Theme, makeStyles } from '@material-ui/core/styles';

// import { BOARD_DASHBOARD } from "../../../routes/config";
import Box from '@material-ui/core/Box'
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
const ResponsiveDialog = React.lazy(() => import("../../Dialog"));

const useStyles = makeStyles((theme: Theme) => ({
    textFieldStyle: {
        width: "100% !important",
        marginTop: theme.spacing(3)
    }
}));

const Update = (props: any) => {
    const { openDialog, handleUpdateForm, selectedBoard } = props;
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
    useEffect(() => {
        if(selectedBoard?._id){
            setFormData({ ...formData, title: selectedBoard.title,
                description: selectedBoard.description, boardId: selectedBoard._id });
        } 
    }, [selectedBoard]);
    
    /* Handler functions */
    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    const handleClose = () => {
        handleUpdateForm();
        setFormData({
            title,
            description,
            noOfSections: 0,
            sprint: 0,
            duration: null
        });
    }

    const handleSubmit = () => {
        dispatch(updateBoard({
            title,
            description,
            noOfSections: noOfSections ? parseInt(noOfSections): 0,
            sprint: sprint ? parseInt(sprint): 0,
            duration,
            projectId
        }));
    }

    const disableButton = () => {
        if(!title.trim().length){
            return true;
        }
        if(!description.trim().length){
            return true;
        }

        if(!noOfSections || noOfSections === 0){
            return true;
        }

        if(!sprint || sprint === 0){
            return true;
        }
        return false;
    }

    return (
        <React.Fragment>
            <ResponsiveDialog open={openDialog} title="Create or Update Board" pcta="Save" scta="Cancel" handleSave={handleSubmit} handleClose={handleClose} disablePrimaryCTA={disableButton()}>
                <Grid container spacing={2}>
                    <Hidden only={["xs"]}>
                        <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                            <Box mt={15}>
                                <Zoom in={true} timeout={2000}>
                                    <img src={ScrumBoard} height="200px" width="fit-content"/>
                                </Zoom>
                            </Box>
                        </Grid>
                    </Hidden>
                    <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                        <Box>
                            <Hidden only={["xs"]}>
                                <Typography variant="h1">Enter Board Details</Typography>
                            </Hidden>
                            <Hidden only={["xl", "lg", "md", "sm"]}>
                                <Typography variant="h3">Enter Board Details</Typography>
                            </Hidden>
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
                    </Grid>
                </Grid>
            </ResponsiveDialog>
        </React.Fragment>
    )
}

export default Update;
