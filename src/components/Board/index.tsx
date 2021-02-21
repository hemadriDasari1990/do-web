import React, { useEffect, useState } from "react";
import { Theme, makeStyles } from '@material-ui/core/styles';
import { useBoard, useBoardLoading } from "../../redux/state/board"
import { useHistory, useParams } from "react-router";
import { useProject, useProjectLoading } from "../../redux/state/project"

import AddIcon from '@material-ui/icons/Add';
import BackIcon from '@material-ui/icons/Reply';
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import { Container } from '@material-ui/core';
import { DEPARTMENT_DASHBOARD } from '../../routes/config';
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import { deleteBoard } from "../../redux/actions/board";
import { getProjectDetails } from "../../redux/actions/project";
import { replaceStr } from "../../util";
import { useDispatch } from "react-redux";

const ResponsiveDialog = React.lazy(() => import("../Dialog"));
const Loader = React.lazy(() => import("../Loader/components"));
const BoardList = React.lazy(() => import("./List"));
const NoRecords = React.lazy(() => import("../NoRecords"));
const UpdateBoard = React.lazy(() => import("./Update"));

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        minHeight: "90vh"
    },
    buttonStyle: {
        textAlign: "end",
        [theme.breakpoints.down('xs')]: {
          textAlign: "center",
          width: "100%"
        }
    },
    countStyle: {
        borderRadius: 5,
        border: "1px solid #0072ff",
        minWidth: 30,
        height: 30
    },
    countTextStyle: {
        top: "50%",
        textAlign: "center",
        fontWeight: 600
    },
}));

const BoardDashboard = () => {
    const { root, buttonStyle, countStyle, countTextStyle } = useStyles();
    const dispatch = useDispatch();
    const { projectId } = useParams<{ projectId: string }>();
    const { project, boards: boardsList, totalBoards: totalBoardsCount } = useProject();
    const { loading } = useBoardLoading();
    const { loading: projectloading } = useProjectLoading();
    const { board } = useBoard();
    const history = useHistory();

    /* React states */
    const [boards, setBoards] = useState<Array<{[Key: string]: any}>>([]);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [selectedBoard, setSelectedBoard] = useState<{[Key: string]: any}>({});
    const [showBoardForm, setShowBoardForm] = useState(false);
    const [totalBoards, setTotalBoards] = useState(totalBoardsCount);

    /* React Hooks */
    useEffect(() => {
        dispatch(getProjectDetails(projectId));
    }, []);

    useEffect(() => {
        if(boardsList){
          setShowBoardForm(false);
          setBoards(boardsList);
          setTotalBoards(totalBoardsCount);
        }
    }, [boardsList])

    useEffect(() => {
        if(!loading && !project?._id){
          // setShowError(true);
        }

        if(!loading && board?.deleted){
            const boardsList = boards.filter((b: {[Key: string]: any}) => b._id !== selectedBoard._id);
            setBoards(boardsList);
            setSelectedBoard({});
            handleCloseDeleteDialog();
        }
        
        if(!loading && board?._id){
          const boardsList = [...boards];
          const boardIndex = boardsList.findIndex((b: {[Key: string]: any}) => b._id === board._id);
          const boardData = boards[boardIndex];
          if(boardData){
            boardData.title = board.title;
            boardData.description = board.description;
            boardsList[boardIndex] = boardData;
            setBoards(boardsList);
          } else {
            setBoards((currentBoards: Array<{[Key:string]: any}>) => [...currentBoards, board]);
            setTotalBoards(totalBoards + 1);
          }
          setSelectedBoard({});
          setShowBoardForm(false);
      }
    }, [loading, board]);
    
    /* Handler functions */
    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    }
    
    const handleMenu = async (event: React.MouseEvent<HTMLDivElement | MouseEvent>, val: string) => {
        switch (val) {
          case 'edit':
            setShowBoardForm(true);
            break;
          case 'delete':
            setOpenDeleteDialog(true);
            break;
          default:
            break
        }
    }

    const handleDelete = () => {
        dispatch(deleteBoard(selectedBoard._id));
        setOpenDeleteDialog(false);
    }

      
    const renderDeleteDialog = () => {
        return (
          <Box>
            <ResponsiveDialog open={openDeleteDialog} title="Delete Note" pcta="Delete" scta="Cancel" handleSave={handleDelete} handleClose={handleClose}>
              <Typography variant="h4"> Are you sure you want to delete {selectedBoard?.title}?</Typography>
            </ResponsiveDialog>
          </Box>
        )
    }


    const handleUpdateForm = () => {
        setShowBoardForm(false);
        handleClose();
    }

    const handleCreateNewBoard = () => {
        setShowBoardForm(true);
    }

    const handleClose = () => {
        setOpenDeleteDialog(false);
    }

    const handleBack = () => {
        history.push(replaceStr(DEPARTMENT_DASHBOARD, ":departmentId", project?.departmentId));
    }

    const renderCreateNewBoard = () => {
        return (
            <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon color="secondary" />}
                onClick={() => handleCreateNewBoard()}
            >
                <Typography color="secondary" variant="body1" >Create New Board</Typography>
            </Button>
        )
      }
    
    return (
        <React.Fragment>
            <Loader backdrop={true} enable={projectloading} />
            {renderDeleteDialog()}
            <Box className={root}>
                <Container>
                    <Box py={2}>
                        <Grid container spacing={2}>
                            <Grid item xl={6} lg={6} md={4} sm={8} xs={12}>
                                <Box display="flex">
                                <Hidden only={["xs"]}>
                                    <Typography variant="h1">{project?.title}</Typography> 
                                </Hidden>
                                <Hidden only={["xl", "lg", "md", "sm"]}>
                                    <Typography variant="h2">{project?.title}</Typography> 
                                </Hidden>
                                <Tooltip title="Total Boards">
                                <Box ml={2} mt={1} className={countStyle}>
                                    <Typography color="primary" className={countTextStyle}>{totalBoards}</Typography>
                                </Box>
                                </Tooltip>
                                </Box>
                            </Grid>
                            <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
                                <Box className={buttonStyle}>
                                    <Button
                                        variant="outlined"
                                        color="default"
                                        startIcon={<BackIcon color="primary" />}
                                        onClick={() => handleBack()}
                                    >
                                        <Typography color="primary" variant="body1" >Go Back to Projects</Typography>
                                    </Button>
                                </Box>
                            </Grid>
                            <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
                                <Box className={buttonStyle}>
                                    {renderCreateNewBoard()}
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                    {!loading && (!boards || !boards?.length) && (
                    <Box mt={10}>
                        <NoRecords message="No Projects found! Please add"/>
                        <Box mt={5} textAlign="center">
                            {renderCreateNewBoard()}
                        </Box>
                    </Box>
                    )}
                    <UpdateBoard selectedBoard={selectedBoard} openDialog={showBoardForm} handleUpdateForm={handleUpdateForm} />
                    <Box>
                        <BoardList boards={boards} handleMenu={handleMenu} setSelectedBoard={setSelectedBoard} />
                    </Box>
                </Container>
            </Box>
        </React.Fragment>
    )
}

export default BoardDashboard;
