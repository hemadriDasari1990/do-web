import React, { useEffect } from "react";
import { Theme, makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box'
import { Container } from '@material-ui/core';
import { getOrganizationDetails } from "../../redux/actions/organization";
import { useDispatch } from "react-redux";
import { useLogin } from "../../redux/state/login"

const DepartmentList = React.lazy(() => import("../Department/List"));

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        minHeight: "90vh"
    },
}));

const Dashboard = () => {
    const { root } = useStyles();
    const dispatch = useDispatch();

    /* React states */
    
    /* Redux hooks */
    const { organizationId } = useLogin();

    /* React Hooks */
    useEffect(() => {
        dispatch(getOrganizationDetails(organizationId));
    }, []);
    
    /* Handler functions */

    return (
        <React.Fragment>
            <Box className={root}>
                <Container>
                    <Box>
                        <DepartmentList />
                    </Box>
                </Container>
            </Box>
        </React.Fragment>
    )
}

export default Dashboard;
