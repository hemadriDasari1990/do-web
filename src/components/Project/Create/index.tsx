import React, { useEffect, useState } from "react";
import { Theme, makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box'
import CreateNewProject from '../../../assets/create.svg'
import Grid from '@material-ui/core/Grid'
// import { PROJECT_DASHBOARD } from "../../../routes/config";
import TextField from '@material-ui/core/TextField'
import Zoom from '@material-ui/core/Zoom'
import { updateProject } from "../../../redux/actions/project"
import { useDispatch } from "react-redux";
import { useParams } from "react-router";

// import { useLoading, useProject } from "../../../redux/state/project"

// import { createProject } from "../../../redux/actions/project"
// import { replaceStr } from "../../../util";
// import { showCreateBoardButton } from "../../../redux/actions/common"
// import { useDispatch } from "react-redux";

// import { useHistory } from "react-router";

const ResponsiveDialog = React.lazy(() => import("../../Dialog"));

const useStyles = makeStyles((theme: Theme) => ({
    textFieldStyle: {
        marginTop: theme.spacing(3)
    }
}));

const Create = (props: any) => {
    const { openDialog, setShowForm } = props;
    const { textFieldStyle } = useStyles();
    const { departmentId } = useParams<{departmentId: string}>();
    const dispatch = useDispatch();
    
    /* Local state */
    const [formData, setFormData] = useState<{[Key: string]: any}>({
        title: '',
        description: '',
        departmentId
    });
    const { title, description } = formData;

    useEffect(() => {
    }, []);
    
    /* Handler functions */
    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    const handleClose = () => {
        setShowForm(false);
    }

    const handleSubmit = () => {
        dispatch(updateProject(formData));
    }

    const disableButton = () => {
        if(!title.trim().length){
            return true;
        }
        if(!description.trim().length){
            return true;
        }
        return false;
    }

    const renderDialog = () => {
        return (
            <ResponsiveDialog open={openDialog} title="Create New Project" pcta="Save" scta="Cancel" handleSave={handleSubmit} handleClose={handleClose} disablePrimaryCTA={disableButton()}>
                <Grid container spacing={2}>
                    <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                        <Box mt={5} textAlign="center">
                            <Zoom in={true} timeout={2000}>
                                <img src={CreateNewProject} height="130px" width="fit-content"/>
                            </Zoom>
                        </Box>
                    </Grid>
                    <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                        <TextField
                            name="title"
                            id="title"
                            label="Project Name"
                            placeholder="Enter your project name"
                            value={title}
                            onChange={handleInput}
                            required
                            fullWidth
                            className={textFieldStyle}
                        />
                        <TextField
                            multiline
                            name="description"
                            id="description"
                            label="Description"
                            placeholder="Enter description about project"
                            value={description}
                            onChange={handleInput}
                            required
                            fullWidth
                            className={textFieldStyle}
                        />
                    </Grid>
                </Grid>
            </ResponsiveDialog>
        )
    }

    return (
        <React.Fragment>
            {renderDialog()}
        </React.Fragment>
    )
}

export default Create;
