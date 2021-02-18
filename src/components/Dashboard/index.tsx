import React, { useEffect, useState } from "react";
import { Theme, makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box'
import { Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography'
import { getOrganizationDetails } from "../../redux/actions/organization";
import socket from "../../socket";
import { useDispatch } from "react-redux";
import { useLogin } from "../../redux/state/login"

const DepartmentList = React.lazy(() => import("../Department/List"));
const DoSnackbar = React.lazy(() => import("../Snackbar/components"));

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        minHeight: "90vh"
    },
}));

const Dashboard = () => {
    const { root } = useStyles();
    const dispatch = useDispatch();

    /* React states */
    const [showSuccess, setShowSuccess] = useState(false);

    /* Redux hooks */
    const { organizationId, token } = useLogin();

    /* React Hooks */
    useEffect(() => {
        dispatch(getOrganizationDetails(organizationId));
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
                        <DepartmentList />
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
