import React, { useEffect } from "react";

// import Badge from '@material-ui/core/Badge'
import Box from '@material-ui/core/Box'
// import { DASHBOARD } from "../../routes/config";
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography';
import converToSeconds from "../../util/converToSeconds";
import { getBoardDetails } from "../../redux/actions/board";
import { makeStyles } from '@material-ui/core/styles';
import { useBoard } from "../../redux/state/board"
import { useDispatch } from "react-redux";
import { useParams } from "react-router";

const SectionList = React.lazy(() => import("../Section/list"));
const Timer = React.lazy(() => import("../common/Timer"));

const useStyles = makeStyles(() => ({
    root: {
        minHeight: "90vh"
    },
    titleStyle: {
        backgroundColor: "#dfedff",
        borderRadius: 20,
        width: "fit-content",
        height: 30
    },
    sectionHeader: {
        fontWeight: "bold",
        padding: "5px 15px 5px 15px",
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
    const durationSeconds: number = converToSeconds(board?.duration);
    // const { loading } = useLoading();

    /* Local state */
    // const [title, setTitle] = useState("");
    // const [descrition, setDescrition] = useState("");
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
                <Box my={5} display="flex" justifyContent="space-between">
                    <Box display="flex">
                        <Typography component="h1" variant="h1">{board?.title}</Typography> 
                        {board?.sprint ? <Box ml={3} mt={1} className={titleStyle}>
                            <Tooltip title={"Sprint " + board?.sprint}>
                                <Typography color="primary" className={sectionHeader} variant="h5">Sprint {board?.sprint}</Typography>
                            </Tooltip>
                        </Box>: null}
                    </Box>
                    <Box display="flex" className={timerBoxStyle}>
                        <Typography className={timerStyle} variant="h3">You have</Typography>
                        <Timer callQueuedTime={durationSeconds} interval={1000} />
                        <Typography className={timerStyle} variant="h3">left</Typography>
                    </Box>
                <Box>
            </Box>
        </Box>
                <Box>
                    <SectionList />
                </Box>
            </Box>
        </React.Fragment>
    )
}

export default Dashboard;
