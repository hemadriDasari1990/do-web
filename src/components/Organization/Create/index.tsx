import React, { useEffect, useState } from "react";
import { Theme, makeStyles } from '@material-ui/core/styles';
import { useOrganization, useOrganizationLoading } from "../../../redux/state/organization"

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import CreateOrganization from '../../../assets/create.svg'
import Grid from '@material-ui/core/Grid'
import { Hidden } from '@material-ui/core';
import { LOGIN } from "../../../routes/config";
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Zoom from '@material-ui/core/Zoom'
import { createOrganization } from "../../../redux/actions/organization"
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

const DoSnackbar = React.lazy(() => import("../../Snackbar/components"));

const useStyles = makeStyles((theme: Theme) => ({
    textFieldStyle: {
        marginTop: theme.spacing(2)
    },
}));

const Create = () => {
    const { textFieldStyle } = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    
    /* Redux hooks */
    const { organization, message } = useOrganization();
    const { loading } = useOrganizationLoading();

    /* Local state */
    const [formData, setFormData] = useState<{[Key: string]: any}>({
        title: '',
        description: '',
        uniqueKey: '',
        password: ''
    });
    const { title, description, uniqueKey, password } = formData;
    const [apiTriggered, setApiTriggered] = useState(false);
    const [showError, setShowError] = useState(false);
    
    /* React Hooks */
    useEffect(() => {
        if(!loading && apiTriggered && organization?._id){
            history.push(LOGIN);
        }
        if(!loading && apiTriggered && !organization?._id){
            setShowError(true);
        }
    }, [loading, apiTriggered, organization])

    useEffect(() => {
    }, []);
    
    /* Handler functions */
    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }
    
    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setApiTriggered(false);
        dispatch(createOrganization(formData));
        setApiTriggered(true);
    }

    const handleReset = () => {
        setFormData({
            title: '',
            description: '',
            uniqueKey: '',
            password: ''
        });
    }

    const handleLogin = () => {
        history.push(LOGIN);
    }

    const disableButton = () => {
        if(!title.trim().length){
            return true;
        }
        if(!description.trim().length){
            return true;
        }
        if(uniqueKey.trim().length < 6){
            return true;
        }
        if(password.trim().length < 6){
            return true;
        }
        return false;
    }

    const handleClose = () => {
        setShowError(false);
    }

    return (
        <React.Fragment>
            <Container>
                <Box pt={5}>
                    <Typography variant="h1">Create Organization</Typography>
                </Box>
                <Grid container spacing={2}>
                    <Hidden only={["xs"]}>
                        <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                            <Box mt={5} textAlign="center">
                                <Zoom in={true} timeout={2000}>
                                    <img src={CreateOrganization} height="300px" width="fit-content"/>
                                </Zoom>
                            </Box>
                        </Grid>
                    </Hidden>
                    <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                        <Box mt={3}>
                            <Typography variant="h4">Enter Organization details</Typography>
                        </Box>
                        <TextField
                            name="title"
                            id="title"
                            label="Organization Name"
                            placeholder="Enter your organization name"
                            value={title}
                            onChange={handleInput}
                            autoComplete='off'
                            required
                            fullWidth
                            className={textFieldStyle}
                        />
                        <TextField
                            name="description"
                            id="description"
                            label="Description"
                            placeholder="Enter description about organization"
                            value={description}
                            onChange={handleInput}
                            autoComplete='off'
                            required
                            fullWidth
                            className={textFieldStyle}
                        />
                        <TextField
                            name="uniqueKey"
                            id="uniqueKey"
                            label="Unique Key"
                            placeholder="Enter unique key"
                            value={uniqueKey}
                            onChange={handleInput}
                            autoComplete='off'
                            required
                            fullWidth
                            className={textFieldStyle}
                        />
                        <TextField
                            type="password"
                            name="password"
                            id="password"
                            label="Password"
                            placeholder="Enter password"
                            value={password}
                            onChange={handleInput}
                            autoComplete='off'
                            required
                            fullWidth
                            className={textFieldStyle}
                        />
                        <Box mt={5} display="flex">
                            <Box mr={2}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleSubmit(event)}
                                    disabled={disableButton()}
                                >
                                    Register
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
                        <Box mt={3} display="flex">
                            <Box mr={1}>
                                <Typography variant="h4">Already have an account?</Typography>
                            </Box>
                            <Box>
                                <Link component="button" onClick={handleLogin}>
                                    <Typography variant="h4">Login</Typography>
                                </Link>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                <DoSnackbar open={showError} handleClose={handleClose} status="error">
                    <Typography variant="h6" color="secondary">{message}</Typography>
                </DoSnackbar>
            </Container>
        </React.Fragment>
    )
}

export default Create;
