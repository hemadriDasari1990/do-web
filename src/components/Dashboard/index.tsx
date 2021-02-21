import React, { useEffect, useState } from "react";

import Box from '@material-ui/core/Box'
import { Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';
import socket from "../../socket";
import { useLogin } from "../../redux/state/login"

const Department = React.lazy(() => import("../Department"));
const DoSnackbar = React.lazy(() => import("../Snackbar/components"));

const useStyles = makeStyles(() => ({
    root: {
        minHeight: "90vh"
    },
}));

const Dashboard = () => {
    const { root } = useStyles();

    /* React states */
    const [showSuccess, setShowSuccess] = useState(false);

    /* Redux hooks */
    const { token } = useLogin();

    /* React Hooks */
    useEffect(() => {
    }, []);

    useEffect(() => {
        socket.on("login-success", () => {
            setShowSuccess(true);
          });
        return () => {
            socket.off("login-success");
        };  
    }, [token]);
    
    /* Handler functions */
    const handleSuccessClose = () => {
        setShowSuccess(false);
    }

    return (
        <React.Fragment>
            <Box className={root}>
                <Container>
                    <Box>
                        <Department />
                    </Box>
                    <DoSnackbar open={showSuccess} handleClose={handleSuccessClose} status="success">
                        <Typography variant="h6" color="secondary">Login successfull</Typography>
                    </DoSnackbar>
                </Container>
            </Box>
        </React.Fragment>
    )
}

export default Dashboard;
