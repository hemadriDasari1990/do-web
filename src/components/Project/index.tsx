import React, { useEffect } from "react";
import { Theme, makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box'
import { Container } from '@material-ui/core';
import { getProjectDetails } from "../../redux/actions/project";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";

const BoardList = React.lazy(() => import("../Board/List"));

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        minHeight: "90vh"
    },
}));

const ProjectDashboard = () => {
    const { root } = useStyles();
    const dispatch = useDispatch();
    const { projectId } = useParams<{ projectId: string }>();

    /* React Hooks */
    useEffect(() => {
        dispatch(getProjectDetails(projectId));
    }, []);
    
    /* Handler functions */

    return (
        <React.Fragment>
            <Box className={root}>
                <Container>
                    <Box>
                        <BoardList />
                    </Box>
                </Container>
            </Box>
        </React.Fragment>
    )
}

export default ProjectDashboard;
