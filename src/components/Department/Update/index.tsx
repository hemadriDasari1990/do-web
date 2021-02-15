import React, { useEffect, useState } from "react";
import { Theme, makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box'
import CreateNewDepartment from '../../../assets/department.svg'
import Grid from '@material-ui/core/Grid'
// import { PROJECT_DASHBOARD } from "../../../routes/config";
import TextField from '@material-ui/core/TextField'
import Zoom from '@material-ui/core/Zoom'
import { updateDepartment } from "../../../redux/actions/department"
import { useDispatch } from "react-redux";
import { useLogin } from "../../../redux/state/login"

// import { useLoading, useDepartment } from "../../../redux/state/department"

// import { createDepartment } from "../../../redux/actions/department"
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
    const { openDialog, department, setShowForm, selectedDepartment } = props;
    const { textFieldStyle } = useStyles();
    const { organizationId } = useLogin();
    const dispatch = useDispatch();
    
    /* Local state */
    const [formData, setFormData] = useState<{[Key: string]: any}>({
        title: selectedDepartment.title,
        description: selectedDepartment.description,
        organizationId
    });
    const { title, description } = formData;

    useEffect(() => {
    }, []);

    useEffect(() => {
        if(department?._id === selectedDepartment?._id){
            setFormData({ ...formData, title: selectedDepartment.title,
                description: selectedDepartment.description });
        }
    }, [department, selectedDepartment]);
    
    /* Handler functions */
    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    const handleClose = () => {
        setShowForm(false);
    }

    const handleSubmit = () => {
        dispatch(updateDepartment(formData));
    }

    const disableButton = () => {
        if(!title || !title.trim().length){
            return true;
        }
        if(!description || !description.trim().length){
            return true;
        }
        return false;
    }

    const renderDialog = () => {
        return (
            <ResponsiveDialog open={openDialog} title="Create New Department" pcta="Save" scta="Cancel" handleSave={handleSubmit} handleClose={handleClose} disablePrimaryCTA={disableButton()}>
                <Grid container spacing={2}>
                    <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                        <Box mt={5}>
                            <Zoom in={true} timeout={2000}>
                                <img src={CreateNewDepartment} height="150px" width="fit-content"/>
                            </Zoom>
                        </Box>
                    </Grid>
                    <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                        <TextField
                            name="title"
                            id="title"
                            label="Department Name"
                            placeholder="Enter your department name"
                            value={title}
                            defaultValue={title}
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
                            defaultValue={description}
                            placeholder="Enter description about department"
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
