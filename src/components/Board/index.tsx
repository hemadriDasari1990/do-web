import React, { Suspense, useCallback, useEffect, useState } from "react";
import { useBoard, useBoardLoading } from "../../redux/state/board";
import { useTeam, useTeamLoading } from "../../redux/state/team";

import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Caption from "../common/Caption";
import DoPagination from "../common/Pagination";
import DoSearch from "../common/search";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import KeyboardBackspaceOutlinedIcon from "@material-ui/icons/KeyboardBackspaceOutlined";
import ListSkeleton from "../common/skeletons/list";
import { PER_PAGE } from "../../util/constants";
import { PROJECTS } from "../../routes/config";
import TitleWithCountSkeleton from "../common/skeletons/titleWithCount";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { deleteBoard } from "../../redux/actions/board";
import formateNumber from "../../util/formateNumber";
import { getBoards } from "../../redux/actions/board";
import { replaceStr } from "../../util";
// import SortOutlinedIcon from "@material-ui/icons/SortOutlined";
import { sendInvitationToTeams } from "../../redux/actions/team";
import useDebounce from "../common/useDebounce";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useProject } from "../../redux/state/project";
import useStyles from "../styles";

const ResponsiveDialog = React.lazy(() => import("../Dialog"));
const BoardList = React.lazy(() => import("./List"));
const NoRecords = React.lazy(() => import("../NoRecords"));
const UpdateBoard = React.lazy(() => import("./Update"));
const DoSnackbar = React.lazy(() => import("../Snackbar/components"));

const BoardDashboard = () => {
  const { root, buttonStyle, alignCenterStyle } = useStyles();
  const dispatch = useDispatch();
  const { project } = useProject();
  const { boards: boardsList, totalBoards: totalBoardsCount } = useBoard();
  const { loading } = useBoardLoading();
  const { board } = useBoard();
  const history = useHistory();
  const { inviteBoardResponse, inviteSent } = useTeam();
  const { loading: teamLoading } = useTeamLoading();

  /**
   * Utility function to paginate
   */
  // const observer: any = useRef();

  /* React states */
  const [queryString, setQueryString] = useState("");
  const [boards, setBoards] = useState<Array<{ [Key: string]: any }>>([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState<any>(null);
  const [showBoardForm, setShowBoardForm] = useState(false);
  const [totalBoards, setTotalBoards] = useState(totalBoardsCount);
  const [openError, setOpenError] = useState(false);
  const [page, setPage] = useState<number>(0);
  const [apiCalled, setApiCalled] = useState(false);
  const debouncedValue = useDebounce(queryString, 500);

  /* React Hooks */

  const loadBoards = (pageNo: number, searchValue: string) => {
    setApiCalled(false);
    dispatch(getBoards(project?._id, searchValue, pageNo, PER_PAGE));
    setApiCalled(true);
  };

  useEffect(() => {
    loadBoards(page, debouncedValue);
  }, [debouncedValue]);

  useEffect(() => {
    if (!loading && apiCalled && boardsList) {
      setShowBoardForm(false);
      setBoards(boardsList);
      // setTotalBoards(project?.totalBoards);
      setApiCalled(false);
    }
  }, [boardsList, apiCalled, loading]);

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

    if (!loading && board?._id && showBoardForm) {
      const boardsList = [...boards];
      const boardIndex = boardsList.findIndex(
        (b: { [Key: string]: any }) => b._id === board._id
      );
      const boardData = boards[boardIndex];
      if (boardData) {
        boardData.name = board.name;
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
      setSelectedBoard(null);
      setShowBoardForm(false);
    }
  }, [loading, board]);

  useEffect(() => {
    setTotalBoards(totalBoardsCount);
  }, [totalBoardsCount]);

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
    event.stopPropagation();
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
            Are you sure you want to delete {selectedBoard?.name}?
          </Typography>
        </ResponsiveDialog>
      </Box>
    );
  };

  const handleInput = (value: string) => {
    setQueryString(value);
  };

  const handleUpdateForm = () => {
    setShowBoardForm(false);
    // handleClose();
  };

  const handleCreateNewBoard = () => {
    setSelectedBoard(null);
    setShowBoardForm(true);
  };

  const handleClose = () => {
    setOpenDeleteDialog(false);
  };

  const handleBack = () => {
    history.push(replaceStr(PROJECTS, ":projectId", board?.projectId));
  };

  const renderCreateNewBoard = () => {
    return (
      <>
        <Hidden only={["xs", "md", "sm"]}>
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

        <Hidden only={["xl", "lg"]}>
          <Tooltip title="Create New Board" placement="bottom" arrow>
            <Fab color="primary" onClick={() => handleCreateNewBoard()}>
              <AddOutlinedIcon color="primary" />
            </Fab>
          </Tooltip>
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

  const handlePage = (page: number) => {
    setPage(page);
    loadBoards(page, "");
  };

  const renderUpdateBoard = useCallback(() => {
    return (
      <UpdateBoard
        selectedBoard={selectedBoard}
        openDialog={showBoardForm}
        handleUpdateForm={handleUpdateForm}
        totalBoards={totalBoards}
      />
    );
  }, [selectedBoard, showBoardForm]);

  return (
    <Suspense fallback={<ListSkeleton />}>
      {renderDeleteDialog()}
      {renderSnackbar()}
      {renderUpdateBoard()}
      <Box className={root}>
        <Box py={2}>
          <Grid container spacing={2}>
            <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
              {loading ? (
                <TitleWithCountSkeleton />
              ) : (
                <Box display="flex">
                  <Hidden only={["xs"]}>
                    <Typography variant="h2">
                      {project?.name}&nbsp;({formateNumber(totalBoards) || 0})
                    </Typography>
                  </Hidden>
                  <Hidden only={["xl", "lg", "md", "sm"]}>
                    <Typography variant="h4">
                      {project?.name}&nbsp;({formateNumber(totalBoards) || 0})
                    </Typography>
                  </Hidden>
                  <Box ml={1} mt={1.9}>
                    <Caption title="Boards" />
                  </Box>
                </Box>
              )}
            </Grid>
            <Grid item xl={4} lg={4} md={4} xs={12} sm={12}>
              <Box mt={1}>
                <DoSearch
                  placeHolder="Search boards by name"
                  handleSearch={handleInput}
                />
              </Box>
            </Grid>
            <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
              <Box display="flex" justifyContent={"flex-end"} mt={1.2}>
                <Hidden only={["xl", "lg"]}>
                  <Tooltip title="Go Back to Projects" placement="bottom" arrow>
                    <Fab color="primary" onClick={() => handleBack()}>
                      <KeyboardBackspaceOutlinedIcon color="primary" />
                    </Fab>
                  </Tooltip>
                </Hidden>

                <Hidden only={["xs", "sm", "md"]}>
                  <Box className={buttonStyle} mr={2}>
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
                  <Box className={buttonStyle} ml={1}>
                    {renderCreateNewBoard()}
                  </Box>
                ) : null}
              </Box>
            </Grid>
          </Grid>
        </Box>
        {!loading && (!boards || !boards?.length) && (
          <Box className={alignCenterStyle}>
            <NoRecords message="No Boards found! Please add" />
            <Box mt={3} textAlign="center">
              {renderCreateNewBoard()}
            </Box>
          </Box>
        )}

        <Box>
          <BoardList
            boards={boards}
            handleMenu={handleMenu}
            setSelectedBoard={setSelectedBoard}
            selectedBoard={selectedBoard}
          />
        </Box>
        <Box>
          <DoPagination
            handlePage={handlePage}
            totalCount={totalBoards}
            pageCount={PER_PAGE}
          />
        </Box>
      </Box>
    </Suspense>
  );
};

export default BoardDashboard;
