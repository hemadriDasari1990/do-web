import React, { useEffect } from "react";
import { Theme, makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box'
import { Container } from '@material-ui/core';
import { getDepartmentDetails } from "../../redux/actions/department";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";

const ProjectList = React.lazy(() => import("../Project/List"));

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        minHeight: "90vh"
    },
}));

const DepartmentDashboard = () => {
    const { root } = useStyles();
    const dispatch = useDispatch();
    const { departmentId } = useParams<{ departmentId: string }>();

    /* React Hooks */
    useEffect(() => {
        dispatch(getDepartmentDetails(departmentId));
    }, []);
    
    /* Handler functions */

    return (
        <React.Fragment>
            <Box className={root}>
                <Container>
                    <Box>
                        <ProjectList />
                    </Box>
                </Container>
            </Box>
        </React.Fragment>
    )
}

export default DepartmentDashboard;
