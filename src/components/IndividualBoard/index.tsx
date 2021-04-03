import React, { useEffect, useState, Suspense, useCallback } from "react";
import { useBoard, useBoardLoading, useBoards } from "../../redux/state/board";

// import { useHistory } from "react-router";

import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { deleteBoard, getBoards } from "../../redux/actions/board";
import { useDispatch } from "react-redux";
import useStyles from "../styles";
import ListSkeleton from "../common/skeletons/list";
import { sendInvitationToTeams } from "../../redux/actions/team";
import formateNumber from "../../util/formateNumber";
import { PER_PAGE } from "../../util/constants";
import { useTeam, useTeamLoading } from "../../redux/state/team";
import Caption from "../common/Caption";
import TitleWithCountSkeleton from "../common/skeletons/titleWithCount";
import { useUser } from "../../redux/state/user";
import { useLogin } from "../../redux/state/login";
import DoPagination from "../common/Pagination";
import DoSearch from "../common/search";

const ResponsiveDialog = React.lazy(() => import("../Dialog"));
const BoardList = React.lazy(() => import("../Board/List"));
const NoRecords = React.lazy(() => import("../NoRecords"));
const UpdateBoard = React.lazy(() => import("../Board/Update"));
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
  const { name } = useUser();
  const { loading } = useBoardLoading();
  const { boards: boardsList } = useBoards();
  const { board, totalBoards: totalBoardsCount } = useBoard();
  const { accountType, userId } = useLogin();

  // const history = useHistory();
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
  const [apiCalled, setApiCalled] = useState(false);
  const [page, setPage] = useState<number>(0);
  const [queryString, setQueryString] = useState("");

  /* React Hooks */
  useEffect(() => {
    loadBoards(page);
  }, []);

  const loadBoards = (pageNo: number) => {
    setApiCalled(false);
    dispatch(getBoards(userId, accountType, queryString, pageNo, PER_PAGE));
    setApiCalled(true);
  };

  useEffect(() => {
    const usersTimer = setTimeout(async () => {
      await loadBoards(page);
    }, 300);

    return () => {
      clearTimeout(usersTimer);
    };
  }, [queryString]);

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

  const setNewBoards = useCallback(() => {
    setShowBoardForm(false);
    setBoards(boardsList);
    setTotalBoards(totalBoardsCount);
    setApiCalled(false);
  }, [boardsList, apiCalled, loading]);

  useEffect(() => {
    if (!loading && apiCalled) {
      setNewBoards();
    }
  }, [boardsList, apiCalled, loading]);

  const removeDeletedBoard = useCallback(() => {
    const boardsList = boards.filter(
      (b: { [Key: string]: any }) => b._id !== selectedBoard._id
    );
    setBoards(boardsList);
    setTotalBoards(boardsList?.length);
    setSelectedBoard(null);
    handleCloseDeleteDialog();
    setOpenDeleteDialog(false);
  }, [board, loading]);

  const updateBoard = useCallback(() => {
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
  }, [board, loading, apiCalled]);

  useEffect(() => {
    if (!openError && !loading && board?.errorId) {
      setOpenError(true);
    }

    if (!loading && board?.deleted) {
      removeDeletedBoard();
    }

    if (!loading && board?._id && !apiCalled) {
      updateBoard();
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

  const renderBoards = useCallback(() => {
    return (
      <Box>
        <BoardList
          boards={boards}
          handleMenu={handleMenu}
          setSelectedBoard={setSelectedBoard}
          selectedBoard={selectedBoard}
          // lastBoard={lastBoard}
        />
      </Box>
    );
  }, [boards]);

  const handlePage = (page: number) => {
    setPage(page);
    loadBoards(page);
  };

  const handleSearch = (value: string) => {
    setQueryString(value);
  };

  return (
    <Suspense fallback={<ListSkeleton />}>
      {renderDeleteDialog()}
      {renderSnackbar()}
      <Box className={root}>
        <Box py={2}>
          <Grid container spacing={2}>
            <Grid
              item
              xl={boards?.length ? 5 : 8}
              lg={boards?.length ? 5 : 8}
              md={boards?.length ? 5 : 8}
              sm={12}
              xs={12}
            >
              {loading ? (
                <TitleWithCountSkeleton />
              ) : (
                <Box display="flex">
                  <Hidden only={["xs"]}>
                    <Typography variant="h2">{name}</Typography>
                  </Hidden>
                  <Hidden only={["xl", "lg", "md", "sm"]}>
                    <Typography variant="h4">{name}</Typography>
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
            <Grid item xl={3} lg={3} md={3} xs={12} sm={6}>
              <Box mt={1.2}>
                <DoSearch
                  placeHolder="Search boards by its title"
                  handleSearch={handleSearch}
                />
              </Box>
            </Grid>
            <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
              <Box display="flex" justifyContent={"flex-end"} mt={1.2}>
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
          totalBoards={totalBoards}
        />
        {loading ? <ListSkeleton /> : renderBoards()}
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Box></Box>
        <DoPagination handlePage={handlePage} totalCount={totalBoards} />
      </Box>
    </Suspense>
  );
};

export default BoardDashboard;
