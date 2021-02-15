import React, { useEffect } from "react";
import { Theme, makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box'
import { getBoardDetails } from "../../redux/actions/board";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";

const SectionsList = React.lazy(() => import("../Section/list"));

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        minHeight: "90vh",
        backgroundColor: "#fff"
    },
}));

const BoardDashboard = () => {
    const { root } = useStyles();
    const dispatch = useDispatch();
    const { boardId } = useParams<{ boardId: string }>();

    /* React Hooks */
    useEffect(() => {
        dispatch(getBoardDetails(boardId));
    }, []);
    
    /* Handler functions */

    return (
        <React.Fragment>
            <Box className={root}>
                <Box>
                    <SectionsList />
                </Box>
            </Box>
        </React.Fragment>
    )
}

export default BoardDashboard;
