import { Container, Grid } from '@material-ui/core';
import React, { useEffect } from "react";
import { Theme, makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box'
import Hidden from '@material-ui/core/Hidden'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography';
import converToSeconds from "../../util/converToSeconds";
import { getBoardDetails } from "../../redux/actions/board";
import { useBoard } from "../../redux/state/board"
import { useDispatch } from "react-redux";
import { useParams } from "react-router";

// import { useSection } from "../../redux/state/section"

const SectionList = React.lazy(() => import("../Section/list"));
const Timer = React.lazy(() => import("../common/Timer"));
// const NoRecords = React.lazy(() => import("../NoRecords"));

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        minHeight: "90vh"
    },
    titleStyle: {
        backgroundColor: "#f3f8ff",
        borderRadius: 20,
        width: "fit-content",
        marginTop: 'auto',
        marginBottom: 'auto',
    },
    sectionHeader: {
        fontWeight: "bold",
        padding: "5px 15px 5px 15px",
        verticalAlign: "middle"
    },
    timerStyle: {
        color: "#8c8e92",
        fontWeight: 500
    },
    timerBoxStyle: {
        marginLeft: "auto"
    }
}));

const Dashboard = () => {
    const { root, titleStyle, sectionHeader, timerStyle, timerBoxStyle } = useStyles();
    const dispatch = useDispatch();
    const { boardId } = useParams<{ boardId: string }>();
    /* Redux hooks */
    const { board } = useBoard();
    // const { section } = useSection();

    const durationSeconds: number = converToSeconds(board?.duration);
    // const { loading } = useLoading();

    /* Local state */
    // const [title, setTitle] = useState("");
    // const [description, setdescription] = useState("");
    // const [noOfSections, setNoOfSections] = useState("");
    // const [apiTriggered, setApiTriggered] = useState(false);
    // const [showError, setShowError] = useState(false);

    /* React Hooks */
    useEffect(() => {
        dispatch(getBoardDetails(boardId));
    }, []);
    
    /* Handler functions */
    
    return (
        <React.Fragment>
            <Box className={root}>
                <Container>
                    <Grid container spacing={2}>
                        <Grid item xl={8} lg={8} md={8} sm={12} xs={12}>
                            <Box display="flex">
                                <Hidden only={["xs"]}>
                                    <Typography variant="h2">{board?.title}</Typography> 
                                </Hidden>
                                <Hidden only={["xl", "lg", "md", "sm"]}>
                                    <Typography variant="h4">{board?.title}</Typography> 
                                </Hidden>
                                {board?.sprint ? <Box mt={1} ml={2} className={titleStyle}>
                                    <Tooltip title={"Sprint " + board?.sprint}>
                                        <Typography color="primary" className={sectionHeader} variant="h5">Sprint {board?.sprint}</Typography>
                                    </Tooltip>
                                </Box>: null}
                            </Box>
                        </Grid>
                        <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
                            <Hidden only={["xs"]}>
                                <Box display="flex" className={timerBoxStyle}>
                                    <Typography className={timerStyle} variant="h3">You have</Typography>
                                        <Timer callQueuedTime={durationSeconds} interval={1000} />
                                    <Typography className={timerStyle} variant="h3">left</Typography>
                                </Box>
                            </Hidden>
                            <Hidden only={["xl", "lg", "md", "sm"]}>
                                <Box display="flex" className={timerBoxStyle}>
                                    <Typography className={timerStyle} variant="h3">You have</Typography>
                                        <Timer callQueuedTime={durationSeconds} interval={1000} />
                                    <Typography className={timerStyle} variant="h3">left</Typography>
                                </Box>
                            </Hidden>
                        </Grid>
                    </Grid>
                    
                </Container>
                <Box>
                    <SectionList />
                </Box>
            </Box>
        </React.Fragment>
    )
}

export default Dashboard;
