import React, { useEffect, useState, Suspense } from "react";
import { useBoard, useBoardLoading } from "../../redux/state/board";
import { useProjectLoading } from "../../redux/state/project";

import { useHistory, useParams } from "react-router";
import { useProject } from "../../redux/state/project";

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
import ListSkeleton from "../common/skeletons/list";
// import SortOutlinedIcon from "@material-ui/icons/SortOutlined";
import { sendInvitationToTeams } from "../../redux/actions/team";
import formateNumber from "../../util/formateNumber";
import { PER_PAGE } from "../../util/constants";
import { useTeam, useTeamLoading } from "../../redux/state/team";
import Caption from "../common/Caption";
import TitleWithCountSkeleton from "../common/skeletons/titleWithCount";

const ResponsiveDialog = React.lazy(() => import("../Dialog"));
const BoardList = React.lazy(() => import("./List"));
const NoRecords = React.lazy(() => import("../NoRecords"));
const UpdateBoard = React.lazy(() => import("./Update"));
const DoSnackbar = React.lazy(() => import("../Snackbar/components"));

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
  const { inviteBoardResponse, inviteSent } = useTeam();
  const { loading: teamLoading } = useTeamLoading();

  /**
   * Utility function to paginate
   */
  // const observer: any = useRef();

  /* React states */
  const [boards, setBoards] = useState<Array<{ [Key: string]: any }>>([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState<any>(null);
  const [showBoardForm, setShowBoardForm] = useState(false);
  const [totalBoards, setTotalBoards] = useState(totalBoardsCount);
  const [openError, setOpenError] = useState(false);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [apiCalled, setApiCalled] = useState(false);

  /* React Hooks */
  useEffect(() => {
    initProject();
  }, []);

  const initProject = () => {
    setApiCalled(false);
    dispatch(getProjectDetails(projectId, limit, offset));
    setApiCalled(true);
  };

  // const lastBoard = useCallback((node) => {
  //   if (projectLoading) return;
  //   if (observer.current) observer.current.disconnect();
  //   observer.current = new IntersectionObserver(
  //     (entries) => {
  //       if (entries[0].isIntersecting) {
  //         initProject();
  //       }
  //     },
  //     { threshold: 1 }
  //   );

  //   if (node) observer.current.observe(node);
  // }, []);

  useEffect(() => {
    if (!projectLoading && apiCalled && boardsList) {
      setShowBoardForm(false);
      setBoards(boardsList);
      setLimit(limit + PER_PAGE);
      setOffset(limit);
      setTotalBoards(totalBoardsCount);
      setApiCalled(false);
    }
  }, [boardsList, apiCalled, projectLoading]);

  useEffect(() => {
    if (!openError && !loading && board?.errorId) {
      setOpenError(true);
    }

    if (!loading && board?.deleted) {
      const boardsList = boards.filter(
        (b: { [Key: string]: any }) => b._id !== selectedBoard._id
      );
      setBoards(boardsList);
      setTotalBoards(boardsList?.length);
      setSelectedBoard(null);
      handleCloseDeleteDialog();
      setOpenDeleteDialog(false);
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
          board,
          ...currentBoards,
        ]);
        setTotalBoards(totalBoards + 1);
      }
      setSelectedBoard({});
      setShowBoardForm(false);
    }
  }, [loading, board]);

  useEffect(() => {
    if (!teamLoading && inviteSent && inviteBoardResponse) {
      const boardsList = [...boards];
      const boardIndex = boardsList.findIndex(
        (b: { [Key: string]: any }) => b._id === inviteBoardResponse._id
      );
      const boardData = boards[boardIndex];
      if (boardData) {
        boardData.inviteSent = inviteBoardResponse.inviteSent;
        boardData.inviteCount = inviteBoardResponse.inviteCount;
        boardsList[boardIndex] = boardData;
        setBoards(boardsList);
      }
      setSelectedBoard(null);
    }
  }, [teamLoading, inviteBoardResponse, inviteSent]);

  /* Handler functions */
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleMenu = (
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
      case "invite":
        dispatch(
          sendInvitationToTeams({
            teamIds: selectedBoard?.teams?.map(
              (team: { [Key: string]: any }) => team?._id
            ),
            boardId: selectedBoard?._id,
          })
        );
        break;
      default:
        break;
    }
  };

  const handleDelete = () => {
    dispatch(deleteBoard(selectedBoard._id));
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
          loading={loading}
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
    setSelectedBoard(null);
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

  const handleSnackbarClose = () => {
    setOpenError(false);
  };

  const renderSnackbar = () => {
    return (
      <DoSnackbar
        open={openError}
        status="error"
        handleClose={handleSnackbarClose}
      >
        <Typography variant="h6" color="secondary">
          {board?.message}
        </Typography>
      </DoSnackbar>
    );
  };

  // const handleSort = () => {};

  return (
    <Suspense fallback={<ListSkeleton />}>
      {renderDeleteDialog()}
      {renderSnackbar()}
      <Box className={root}>
        <Box py={2}>
          <Grid container spacing={2}>
            <Grid
              item
              xl={boards?.length ? 8 : 8}
              lg={boards?.length ? 8 : 8}
              md={boards?.length ? 8 : 8}
              sm={12}
              xs={12}
            >
              {projectLoading ? (
                <TitleWithCountSkeleton />
              ) : (
                <Box display="flex">
                  <Hidden only={["xs"]}>
                    <Typography variant="h2">{project?.title}</Typography>
                  </Hidden>
                  <Hidden only={["xl", "lg", "md", "sm"]}>
                    <Typography variant="h4">{project?.title}</Typography>
                  </Hidden>
                  <Tooltip arrow title="Total Boards">
                    <Box ml={2} className={countStyle}>
                      <Typography color="primary" className={countTextStyle}>
                        {formateNumber(totalBoards) || 0}
                      </Typography>
                    </Box>
                  </Tooltip>
                  <Box ml={1} mt={2.2}>
                    <Caption title="Boards" />
                  </Box>
                </Box>
              )}
            </Grid>
            <Grid item xl={4} lg={4} md={8} sm={12} xs={12}>
              <Box
                display="flex"
                justifyContent={!boards?.length ? "flex-end" : "space-around"}
                mt={1.2}
              >
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
                {/* <Hidden only={["xs", "sm"]}>
                  <IconButton
                    size="small"
                    className={iconBackStyle}
                    onClick={() => handleSort()}
                  >
                    <SortOutlinedIcon color="primary" />
                  </IconButton>
                </Hidden> */}
              </Box>
            </Grid>
            {/* {boards?.length ? (
              <Grid item xl={2} lg={2} md={4} sm={6} xs={12}>
                <Box className={buttonStyle}>{renderCreateNewBoard()}</Box>
              </Grid>
            ) : null} */}
          </Grid>
        </Box>
        {!projectLoading && (!boards || !boards?.length) && (
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
            // lastBoard={lastBoard}
          />
        </Box>
      </Box>
    </Suspense>
  );
};

export default BoardDashboard;
