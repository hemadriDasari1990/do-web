import { ORGANIZATION, ORGANIZATION_DASHBOARD } from "../../../routes/config";
import React, { useEffect, useState } from "react";
import { Theme, makeStyles } from '@material-ui/core/styles';
import { useLoading, useLogin } from "../../../redux/state/login"

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import Link from '@material-ui/core/Link';
import SecureLogin from '../../../assets/secure-login.svg'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Zoom from '@material-ui/core/Zoom'
import { login } from "../../../redux/actions/login"
import { replaceStr } from "../../../util";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

const DoSnackbar = React.lazy(() => import("../../Snackbar/components"));

const useStyles = makeStyles((theme: Theme) => ({
    textFieldStyle: {
        width: "100% !important",
        marginTop: theme.spacing(3)
    }
}));

const Login = () => {
    const { textFieldStyle } = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    
    /* Redux hooks */
    const { token, organizationId, message } = useLogin();
    const { loading } = useLoading();

    /* Local state */
    const [formData, setFormData] = useState<{[Key: string]: any}>({
        uniqueKey: '',
        password: ''
    });
    const { uniqueKey, password } = formData;
    const [apiTriggered, setApiTriggered] = useState(false);
    const [showError, setShowError] = useState(false);

    /* React Hooks */
    useEffect(() => {
        if(!loading && apiTriggered && token){
            history.push(replaceStr(ORGANIZATION_DASHBOARD, ":organizationId", organizationId));
        }
        if(!loading && apiTriggered && !token){
            setShowError(true);
        }
    }, [loading, apiTriggered, token])
    
    /* Handler functions */
    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }
    
    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setApiTriggered(false);
        dispatch(login(formData));
        setApiTriggered(true);
    }

    const handleReset = () => {
        setFormData({
            uniqueKey: '',
            password: ''
        });
    }

    const handleCreateOrganization = () => {
        history.push(ORGANIZATION);
    }

    const disableButton = () => {
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
                    <Typography variant="h1">Login into Organization</Typography>
                </Box>
                <Grid container spacing={2}>
                    <Hidden only={["xs"]}>
                        <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                            <Box my={10}>
                                <Zoom in={true} timeout={2000}>
                                    <img src={SecureLogin} height="300px" width="fit-content"/>
                                </Zoom>
                            </Box>
                        </Grid>
                    </Hidden>
                    <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                        <Box mt={3}>
                            <Typography variant="h4">Enter Organization details</Typography>
                        </Box>
                        <TextField
                            name="uniqueKey"
                            id="uniqueKey"
                            label="Unique Key"
                            value={uniqueKey}
                            onChange={handleInput}
                            autoComplete='off'
                            required
                            className={textFieldStyle}
                        />
                        <TextField
                            type="password"
                            name="password"
                            id="password"
                            label="Password"
                            value={password}
                            onChange={handleInput}
                            autoComplete='off'
                            required
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
                                    Login
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
                        <Hidden only={["xl", "lg", "md", "sm"]}>
                            <Box mt={3} display="flex">
                                <Box mr={1}>
                                    <Typography variant="h5">Don't have an account?</Typography>
                                </Box>
                                <Box>
                                    <Link component="button" onClick={handleCreateOrganization}>
                                        <Typography variant="h5">Create Organization</Typography>
                                    </Link>
                                </Box>
                            </Box>
                        </Hidden>
                        <Hidden only={["xs"]}>
                            <Box mt={3} display="flex">
                                <Box mr={1}>
                                    <Typography variant="h4">Don't have an account?</Typography>
                                </Box>
                                <Box>
                                    <Link component="button" onClick={handleCreateOrganization}>
                                        <Typography variant="h4">Create Organization</Typography>
                                    </Link>
                                </Box>
                            </Box>
                        </Hidden>
                    </Grid>
                </Grid>
                <DoSnackbar open={showError} handleClose={handleClose} status="error">
                    <Typography variant="h6" color="secondary">{message}</Typography>
                </DoSnackbar>
            </Container>
        </React.Fragment>
    )
}

export default Login;
