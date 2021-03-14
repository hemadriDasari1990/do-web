import React, { useEffect, useState } from "react";
import { useBoard, useBoardLoading } from "../../redux/state/board";
import { useHistory, useParams } from "react-router";
import { useProject, useProjectLoading } from "../../redux/state/project";

import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { DEPARTMENT_DASHBOARD } from "../../routes/config";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import KeyboardBackspaceOutlinedIcon from "@material-ui/icons/KeyboardBackspaceOutlined";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { deleteBoard } from "../../redux/actions/board";
import { getProjectDetails } from "../../redux/actions/project";
import { replaceStr } from "../../util";
import { useDispatch } from "react-redux";
import useStyles from "../styles";

const ResponsiveDialog = React.lazy(() => import("../Dialog"));
const Loader = React.lazy(() => import("../Loader/components"));
const BoardList = React.lazy(() => import("./List"));
const NoRecords = React.lazy(() => import("../NoRecords"));
const UpdateBoard = React.lazy(() => import("./Update"));

const BoardDashboard = () => {
  const {
    root,
    buttonStyle,
    countStyle,
    countTextStyle,
    iconBackStyle,
  } = useStyles();
  const dispatch = useDispatch();
  const { projectId } = useParams<{ projectId: string }>();
  const {
    project,
    boards: boardsList,
    totalBoards: totalBoardsCount,
  } = useProject();
  const { loading } = useBoardLoading();
  const { loading: projectLoading } = useProjectLoading();
  const { board } = useBoard();
  const history = useHistory();

  /* React states */
  const [boards, setBoards] = useState<Array<{ [Key: string]: any }>>([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState<{ [Key: string]: any }>(
    {}
  );
  const [showBoardForm, setShowBoardForm] = useState(false);
  const [totalBoards, setTotalBoards] = useState(totalBoardsCount);

  /* React Hooks */
  useEffect(() => {
    dispatch(getProjectDetails(projectId));
  }, []);

  useEffect(() => {
    if (boardsList) {
      setShowBoardForm(false);
      setBoards(boardsList);
      setTotalBoards(totalBoardsCount);
    }
  }, [boardsList]);

  useEffect(() => {
    if (!loading && !project?._id) {
      // setShowError(true);
    }

    if (!loading && board?.deleted) {
      const boardsList = boards.filter(
        (b: { [Key: string]: any }) => b._id !== selectedBoard._id
      );
      setBoards(boardsList);
      setSelectedBoard({});
      handleCloseDeleteDialog();
    }

    if (!loading && board?._id) {
      const boardsList = [...boards];
      const boardIndex = boardsList.findIndex(
        (b: { [Key: string]: any }) => b._id === board._id
      );
      const boardData = boards[boardIndex];
      if (boardData) {
        boardData.title = board.title;
        boardData.description = board.description;
        boardsList[boardIndex] = boardData;
        setBoards(boardsList);
      } else {
        setBoards((currentBoards: Array<{ [Key: string]: any }>) => [
          ...currentBoards,
          board,
        ]);
        setTotalBoards(totalBoards + 1);
      }
      setSelectedBoard({});
      setShowBoardForm(false);
    }
  }, [loading, board]);

  /* Handler functions */
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleMenu = async (
    event: React.MouseEvent<HTMLDivElement | MouseEvent>,
    val: string
  ) => {
    switch (val) {
      case "edit":
        setShowBoardForm(true);
        break;
      case "delete":
        setOpenDeleteDialog(true);
        break;
      default:
        break;
    }
  };

  const handleDelete = () => {
    dispatch(deleteBoard(selectedBoard._id));
    setOpenDeleteDialog(false);
  };

  const renderDeleteDialog = () => {
    return (
      <Box>
        <ResponsiveDialog
          open={openDeleteDialog}
          title="Delete Note"
          pcta="Delete"
          scta="Cancel"
          handleSave={handleDelete}
          handleClose={handleClose}
          maxWidth={440}
        >
          <Typography variant="h4">
            {" "}
            Are you sure you want to delete {selectedBoard?.title}?
          </Typography>
        </ResponsiveDialog>
      </Box>
    );
  };

  const handleUpdateForm = () => {
    setShowBoardForm(false);
    handleClose();
  };

  const handleCreateNewBoard = () => {
    setSelectedBoard({});
    setShowBoardForm(true);
  };

  const handleClose = () => {
    setOpenDeleteDialog(false);
  };

  const handleBack = () => {
    history.push(
      replaceStr(DEPARTMENT_DASHBOARD, ":departmentId", project?.departmentId)
    );
  };

  const renderCreateNewBoard = () => {
    return (
      <>
        <Hidden only={["xs"]}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddOutlinedIcon color="secondary" />}
            onClick={() => handleCreateNewBoard()}
          >
            <Typography color="secondary" variant="subtitle1">
              Create New Board
            </Typography>
          </Button>
        </Hidden>

        <Hidden only={["xl", "lg", "md", "sm"]}>
          <IconButton
            className={iconBackStyle}
            onClick={() => handleCreateNewBoard()}
          >
            <AddOutlinedIcon color="primary" />
          </IconButton>
        </Hidden>
      </>
    );
  };

  return (
    <React.Fragment>
      <Loader enable={loading || projectLoading} />
      {renderDeleteDialog()}
      <Box className={root}>
        <Box>
          <Grid container spacing={2}>
            <Grid
              item
              xl={boards?.length ? 8 : 8}
              lg={boards?.length ? 8 : 8}
              md={boards?.length ? 8 : 8}
              sm={12}
              xs={12}
            >
              <Box display="flex">
                <Hidden only={["xs"]}>
                  <Typography variant="h1">{project?.title}</Typography>
                </Hidden>
                <Hidden only={["xl", "lg", "md", "sm"]}>
                  <Typography variant="h4">{project?.title}</Typography>
                </Hidden>
                <Tooltip title="Total Boards">
                  <Box ml={2} className={countStyle}>
                    <Typography color="primary" className={countTextStyle}>
                      {totalBoards}
                    </Typography>
                  </Box>
                </Tooltip>
              </Box>
            </Grid>
            <Grid item xl={4} lg={4} md={8} sm={12} xs={12}>
              <Box display="flex" justifyContent="space-between">
                <Hidden only={["xl", "lg", "md"]}>
                  <IconButton
                    className={iconBackStyle}
                    onClick={() => handleBack()}
                  >
                    <KeyboardBackspaceOutlinedIcon color="primary" />
                  </IconButton>
                </Hidden>
                <Hidden only={["xs", "sm"]}>
                  <Box className={buttonStyle}>
                    <Button
                      variant="outlined"
                      color="default"
                      startIcon={
                        <KeyboardBackspaceOutlinedIcon color="primary" />
                      }
                      onClick={() => handleBack()}
                    >
                      <Typography color="primary" variant="subtitle1">
                        Go Back to Projects
                      </Typography>
                    </Button>
                  </Box>
                </Hidden>
                {boards?.length ? (
                  <Box className={buttonStyle}>{renderCreateNewBoard()}</Box>
                ) : null}
              </Box>
            </Grid>
            {/* {boards?.length ? (
              <Grid item xl={2} lg={2} md={4} sm={6} xs={12}>
                <Box className={buttonStyle}>{renderCreateNewBoard()}</Box>
              </Grid>
            ) : null} */}
          </Grid>
        </Box>
        {!loading && (!boards || !boards?.length) && (
          <Box mt={10}>
            <NoRecords message="No Boards found! Please add" />
            <Box mt={5} textAlign="center">
              {renderCreateNewBoard()}
            </Box>
          </Box>
        )}
        <UpdateBoard
          selectedBoard={selectedBoard}
          openDialog={showBoardForm}
          handleUpdateForm={handleUpdateForm}
        />
        <Box>
          <BoardList
            boards={boards}
            handleMenu={handleMenu}
            setSelectedBoard={setSelectedBoard}
            selectedBoard={selectedBoard}
          />
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default BoardDashboard;
