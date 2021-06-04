// import ClearIcon from "@material-ui/icons/Clear";
import {
  DOWNLOAD_BOARD_REPORT,
  DOWNLOAD_INSTANT_BOARD_REPORT,
} from "../../network/endpoints";
import React, { Suspense, useCallback, useEffect, useState } from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";
import {
  addMemberToLocalStorage,
  formatNumberWithCommas,
  getDownloadFile,
  getMemberId,
  getMemberIdByToken,
  replaceStr,
} from "../../util";
import { clearBoard, getBoardDetails } from "../../redux/actions/board";
import { useBoard, useBoardLoading } from "../../redux/state/board";
import { useHistory, useParams } from "react-router";

import API from "../../network";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import { BOARDS } from "../../routes/config";
import BoardHeaderSkeleton from "../common/skeletons/boardHeader";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import DoSnackbar from "../Snackbar/components";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
// import HtmlTooltip from "../HTMLTooltip";
// import { IconButton } from "@material-ui/core";
import Invite from "../common/Invite";
import KeyboardBackspaceOutlinedIcon from "@material-ui/icons/KeyboardBackspaceOutlined";
import LockIcon from "@material-ui/icons/Lock";
import { MEMBERS_PER_PAGE } from "../../util/constants";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Notify from "../../assets/notify.svg";
import PauseIcon from "@material-ui/icons/Pause";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PublicIcon from "@material-ui/icons/Public";
import { ROOT } from "../../routes/config";
import Recommendation from "../Recommendation";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import Slide from "@material-ui/core/Slide";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import ViewColumnIcon from "@material-ui/icons/ViewColumn";
import ViewStreamIcon from "@material-ui/icons/ViewStream";
import Visibility from "../common/visibility";
import Zoom from "@material-ui/core/Zoom";
import { addProjectToStore } from "../../redux/actions/project";
import doLogo from "../../assets/do-logo.svg";
import formateNumber from "../../util/formateNumber";
import { getJoinedMembers } from "../../redux/actions/join";
// import { getMembers } from "../../util/member";
import { getRandomColor } from "../../util/getRandomColor";
import { useAuthenticated } from "../../redux/state/common";
import { useDispatch } from "react-redux";
import { useJoinedMembers } from "../../redux/state/join";
import { useLogin } from "../../redux/state/login";
import { useSocket } from "../../redux/state/socket";
import useStyles from "../styles";

const PersistentDrawerRight = React.lazy(() => import("../Drawer/DrawerRight"));
const UserAccount = React.lazy(() => import("../Drawer/Account"));
const AvatarGroupList = React.lazy(() => import("../common/AvatarGroupList"));
const Timer = React.lazy(() => import("../common/Timer"));
const SectionList = React.lazy(() => import("./list"));
const ResponsiveDialog = React.lazy(() => import("../Dialog"));
const UpdateSection = React.lazy(() => import("./Update"));
const AddGuest = React.lazy(() => import("./AddGuest"));

const useLocalStyles = makeStyles((theme: Theme) => ({
  startSessionIconStyle: {
    borderRadius: "50%",
    color: "#0fe220",
  },
  buttonOutlinedStartStyle: {
    backgroundColor: "#dbfdde",
    border: "unset",
    "&.MuiButton-outlined:hover": {
      backgroundColor: "#dbfdde",
      border: "unset",
    },
  },
  startSessionTextStyle: {
    color: "#0fe220",
    fontWeight: 600,
  },
  stopSessionIconStyle: {
    borderRadius: "50%",
    color: "#ff0000",
    padding: 3,
    height: 20,
    width: 20,
  },
  buttonOutlinedStopStyle: {
    backgroundColor: "#ffd2d2",
    border: "unset",
    "&.MuiButton-outlined:hover": {
      backgroundColor: "#ffd2d2",
      border: "unset",
    },
  },
  stopSessionTextStyle: {
    color: "#ff0000",
    fontWeight: 600,
  },
  boxStyle: {
    borderRadius: 6,
  },
  boxTextStyle: {
    padding: "5px 15px 5px 15px",
    color: "#57f",
    fontWeight: 500,
  },
}));

export default function Section() {
  const {
    startSessionIconStyle,
    buttonOutlinedStartStyle,
    startSessionTextStyle,
    stopSessionIconStyle,
    buttonOutlinedStopStyle,
    stopSessionTextStyle,
    boxStyle,
    boxTextStyle,
  } = useLocalStyles();
  const { buttonStyle, titleBoxStyle } = useStyles();
  const dispatch = useDispatch();
  const { boardId } = useParams<{ boardId: string }>();
  const { totalSections: totalSectionsCount, board } = useBoard();
  const { loading } = useBoardLoading();
  const { memberId } = useLogin();
  const history = useHistory();
  const { loading: boardLoading } = useBoardLoading();
  const { socket } = useSocket();
  const authenticated = useAuthenticated();
  const { members: joinedMembersList } = useJoinedMembers();
  // const emailFromLS = localStorage.getItem(`${boardId}`) as string;
  const { token } = useParams<{ token: string }>();
  const joinedMemberId = getMemberId();
  const invitedMemberId = getMemberIdByToken(token);

  /* React state */
  const [showDialog, setShowDialog] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [viewType, setViewType] = useState("nowrap");
  const [totalSections, setTotalSections] = useState(totalSectionsCount);
  const [message, setMessage] = useState("");
  const [startSession, setStartSession] = useState(false);
  const [openInviteDialog, setOpenInviteDialog] = useState(false);
  const [openChangeVisibilityDialog, setOpenChangeVisibilityDialog] = useState(
    false
  );
  const [openAccount, setOpenAccount] = useState(false);
  const [endSessionDialog, setEndSessionDialog] = useState(false);
  const [boardDetails, setBoardDetails] = useState(board);
  const [openAddGuestDialog, setOpenAddGuestDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [boardCompleted, setBoardCompleted] = useState(false);
  const [openStartSessionDialog, setOpenStartSessionDialog] = useState(false);
  const [joinedMember, setJoinedMember] = useState<any>(null);
  const [joinedMembers, setJoinedMembers] = useState<
    Array<{ [Key: string]: any }>
  >([]);
  // const [openInviteTooltip, setOpenInviteTootltip] = useState(true);
  // const [openVisibilityTooltip, setOpenVisibilityTootltip] = useState(true);
  // const [openSessionTooltip, setOpenSessionTootltip] = useState(true);
  // const [openSectionTooltip, setOpenSectionTootltip] = useState(true);

  useEffect(() => {
    if (boardId) {
      dispatch(getBoardDetails(boardId));
      dispatch(getJoinedMembers(boardId, "", 0, MEMBERS_PER_PAGE));
      if (!authenticated && token && joinedMemberId !== invitedMemberId) {
        setOpenAddGuestDialog(true);
        // socket.emit("check-if-member-joined-board", {
        //   token,
        //   boardId: boardId,
        // });
      }
    }
  }, []);

  useEffect(() => {
    /* join memeber to board response */
    socket.on(
      `join-member-to-board-response`,
      (response: { [Key: string]: any }) => {
        if (!response) {
          return;
        }

        if (response?.errorId) {
          setOpenSnackbar(true);
          setOpenAddGuestDialog(false);
          setJoinedMember(response);
          return;
        }
        if (response?.memberId) {
          addMemberToLocalStorage(response?.memberId);
          updateJoinedMember(response);
        } else {
          setJoinedMembers((currentMembers: Array<{ [Key: string]: any }>) => [
            ...currentMembers,
            response,
          ]);
        }
        setJoinedMember(response);
        if (invitedMemberId !== response.memberId) {
          setOpenSnackbar(true);
        }
        if (invitedMemberId === response.memberId) {
          setOpenAddGuestDialog(false);
        }
      }
    );

    return () => {
      socket.off("join-member-to-board-response");
    };
  }, [joinedMembers]);

  // useEffect(() => {
  //   /* Add if member already joined */
  //   socket.on(
  //     `check-if-member-joined-board-response`,
  //     (response: { [Key: string]: any }) => {
  //       // if (response?._id) {
  //       //   setJoinedMembers((currentMembers: Array<{ [Key: string]: any }>) => [
  //       //     ...currentMembers,
  //       //     response,
  //       //   ]);
  //       // } else {
  //       //   /* ask user to choose avatar */
  //       //   setOpenAddGuestDialog(true);
  //       // }
  //       if (!authenticated && !response?._id) {
  //         setOpenAddGuestDialog(true);
  //       }
  //     }
  //   );

  //   return () => {
  //     socket.off("check-if-member-joined-board-response");
  //   };
  // }, [authenticated, joinedMembers]);

  useEffect(() => {
    setBoardDetails(board);
    dispatch(addProjectToStore(board?.project));
    // if (board?.startedAt && email) {
    //   socket.emit("join-member-to-board", {
    //     boardId: boardId,
    //     email,
    //   });
    // }
    /* Ask for guest name and avatar only when board is not annonymous */
    // if (
    //   !authenticated &&
    //   !token &&
    //   !loading &&
    //   !board?.isPrivate &&
    //   !board?.isAnnonymous &&
    //   !board?.isInstant &&
    //   !!board?.startedAt
    // ) {
    //   setOpenAddGuestDialog(true);
    // }
  }, [board]);

  useEffect(() => {
    setJoinedMembers(joinedMembersList);
  }, [joinedMembersList]);

  useEffect(() => {
    setTotalSections(totalSectionsCount);
  }, [totalSectionsCount]);

  useEffect(() => {
    /* Start session */
    socket.on(
      `start-session-response`,
      (updatedBoard: { [Key: string]: any }) => {
        if (!updatedBoard) {
          return;
        }
        setBoardDetails(updatedBoard);
        setJoinedMembers(updatedBoard.joinedMembers);
        setStartSession(true);
      }
    );
    /* End session */
    socket.on(
      `end-session-response`,
      (updatedBoard: { [Key: string]: any }) => {
        if (!updatedBoard) {
          return;
        }
        setBoardDetails(updatedBoard);
        setBoardCompleted(true);
      }
    );

    return () => {
      socket.off("start-session-responsee");
      socket.off("end-session-response");
    };
  }, [board, boardDetails]);

  useEffect(() => {
    /* substract section count response  */
    socket.on(
      `minus-total-section-response`,
      (deletedSection: { [Key: string]: any }) => {
        if (!deletedSection?.deleted) {
          return;
        }
        setTotalSections(totalSections - 1);
      }
    );
    /* Add section count responseon  */
    socket.on(
      `plus-total-section-response`,
      (newSection: { [Key: string]: any }) => {
        if (!newSection?._id) {
          return;
        }
        setTotalSections(totalSections + 1);
      }
    );
    return () => {
      socket.off("plus-total-section-response");
      socket.off("minus-total-section-response");
    };
  }, [totalSections]);

  useEffect(() => {
    socket.on(
      `change-visibility-response`,
      (updated: { [Key: string]: any }) => {
        if (!updated) {
          return;
        }
        const newBoardDetails = { ...boardDetails };
        newBoardDetails.isPrivate = updated?.isPrivate;
        setBoardDetails(newBoardDetails);
        setOpenChangeVisibilityDialog(false);
      }
    );
    return () => {
      socket.off("change-visibility-response");
    };
  }, [boardDetails]);

  useEffect(() => {
    if (
      !loading &&
      (board?.status === "draft" ||
        (board?.status === "new" && !authenticated)) &&
      !board?.isInstant
    ) {
      setMessage(
        "The Retro session isn't started yet. Please contact organisor."
      );
      setShowDialog(true);
    }
    if (!authenticated && !loading && board?.isPrivate && !board?.isInstant) {
      setMessage(
        "The board isn't public. Please request organizer to make it public"
      );
      setShowDialog(true);
    }
    if (
      !loading &&
      board?.status === "completed" &&
      !authenticated &&
      !board?.isInstant
    ) {
      setMessage(
        "The session has been completed. The board is on readonly mode"
      );
      setShowDialog(true);
    }
  }, [board, loading]);

  const handleDialogClose = () => {
    setShowDialog(false);
    if (board?.status !== "completed") {
      history.push(ROOT);
    }
  };

  const updateJoinedMember = (jMember: { [Key: string]: any }) => {
    if (!jMember || !joinedMembers?.length) {
      return;
    }
    const newJoinedMembers: Array<{ [Key: string]: any }> = [...joinedMembers];
    const memberIndex: number = newJoinedMembers.findIndex(
      (newJoinedMember: { [Key: string]: any }) =>
        newJoinedMember?._id === jMember?._id
    );
    const joinedMember: { [Key: string]: any } = newJoinedMembers[memberIndex];
    if (!joinedMember) {
      setJoinedMembers([jMember, ...newJoinedMembers]);
      return;
    }
    joinedMember.avatarId = jMember?.avatarId;
    newJoinedMembers[memberIndex] = joinedMember;

    setJoinedMembers(newJoinedMembers);
  };

  const handleAccount = () => {
    setOpenAccount(!openAccount);
  };

  const handleView = (type: string) => {
    setViewType(type);
  };

  const renderDialog = () => {
    return (
      <Box>
        <ResponsiveDialog
          open={showDialog}
          title={board?.status === "completed" && !authenticated ? "Hey!" : ""}
          handleSave={handleDialogClose}
          pcta="Ok"
          maxWidth={440}
          hideSecondary={true}
          hideButton={
            board?.status === "draft" ||
            (board?.status === "new" && !authenticated)
          }
          hideClose={true}
        >
          <Hidden only={["xs"]}>
            <Box my={5} textAlign="center">
              <Zoom in={true} timeout={2000}>
                <img src={Notify} height="200px" width="fit-content" />
              </Zoom>
            </Box>
          </Hidden>
          <Typography variant="h4">{message}</Typography>
        </ResponsiveDialog>
      </Box>
    );
  };

  // const handleTooltipClose = () => {
  //   if (openSessionTooltip) {
  //     setOpenSessionTootltip(false);
  //   }
  //   if (openVisibilityTooltip) {
  //     setOpenVisibilityTootltip(false);
  //   }
  //   if (openInviteTooltip) {
  //     setOpenInviteTootltip(false);
  //   }
  //   if (openSectionTooltip) {
  //     setOpenSectionTootltip(false);
  //   }
  // };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const renderSnackbar = () => {
    return (
      <DoSnackbar
        open={openSnackbar}
        status={joinedMember?.errorId ? "error" : "success"}
        handleClose={handleSnackbarClose}
      >
        <Typography variant="h6" color="secondary">
          {joinedMember?.errorId ? joinedMember?.message : ""}
          {!joinedMember?.errorId
            ? `${joinedMember?.guestName} joined the session`
            : ""}
        </Typography>
      </DoSnackbar>
    );
  };

  const renderStartSession = useCallback(() => {
    return (
      <Box mr={1} className={buttonStyle}>
        {/* <HtmlTooltip
          open={openSessionTooltip}
          placement="left"
          title={
            <Box display="flex">
              <IconButton size="small">
                <PlayArrowIcon color="secondary" fontSize="small" />
              </IconButton>
              <Box mt={0.3}>
                <Typography variant="subtitle1" color="secondary">
                  Start the session
                </Typography>
              </Box>
              <IconButton size="small" onClick={() => handleTooltipClose()}>
                <ClearIcon fontSize="small" color="secondary" />
              </IconButton>
            </Box>
          }
          arrow
        > */}
        <Button
          variant="outlined"
          color="default"
          className={buttonOutlinedStartStyle}
          startIcon={
            <PlayArrowIcon color="primary" className={startSessionIconStyle} />
          }
          onClick={() => handleStartSessionDialog()}
        >
          <Typography className={startSessionTextStyle} variant="h6">
            Start Session
          </Typography>
        </Button>
        {/* </HtmlTooltip> */}
      </Box>
    );
  }, [boardLoading, authenticated, boardDetails]);

  const renderEndSession = useCallback(() => {
    return (
      <Box mx={1} className={buttonStyle}>
        <Button
          variant="outlined"
          color="default"
          className={buttonOutlinedStopStyle}
          startIcon={
            <PauseIcon color="primary" className={stopSessionIconStyle} />
          }
          onClick={() => handleStopSession()}
        >
          <Typography
            color="primary"
            variant="h6"
            className={stopSessionTextStyle}
          >
            End Session
          </Typography>
        </Button>
      </Box>
    );
  }, [boardLoading, authenticated, boardDetails]);

  const renderTimer = useCallback(() => {
    return <Timer startDateTime={boardDetails?.startedAt} interval={1000} />;
  }, [boardLoading, boardDetails]);

  const renderDiffInDays = useCallback(() => {
    return <Box>{dateDiffInDays()}</Box>;
  }, [boardLoading, boardDetails]);

  const renderCreateNewSection = useCallback(() => {
    return (
      <Box mr={1}>
        {/* <HtmlTooltip
          open={openSectionTooltip}
          title={
            <Box display="flex">
              <IconButton size="small">
                <AddOutlinedIcon fontSize="small" color="secondary" />
              </IconButton>
              <Box mt={0.3}>
                <Typography variant="subtitle1" color="secondary">
                  Add another section
                </Typography>
              </Box>
              <IconButton size="small" onClick={() => handleTooltipClose()}>
                <ClearIcon fontSize="small" color="secondary" />
              </IconButton>
            </Box>
          }
          arrow
        > */}
        <Box className={buttonStyle}>
          <Fab color="primary" onClick={() => handleCreateNewSection()}>
            <AddOutlinedIcon style={{ color: getRandomColor(1) }} />
          </Fab>
        </Box>
        {/* </HtmlTooltip> */}
      </Box>
    );
  }, [boardLoading, authenticated]);

  const renderView = () => {
    return (
      <Box display="flex">
        <Box mr={1} className={buttonStyle}>
          <Fab color="primary" onClick={() => handleView("wrap")}>
            <ViewStreamIcon style={{ color: getRandomColor(0) }} />
          </Fab>
        </Box>
        <Box mr={1} className={buttonStyle}>
          <Fab color="primary" onClick={() => handleView("nowrap")}>
            <ViewColumnIcon style={{ color: getRandomColor(3) }} />
          </Fab>
        </Box>
      </Box>
    );
  };

  const renderGoBackToBoards = useCallback(() => {
    return (
      <Box mr={1} className={buttonStyle}>
        <Button
          variant="outlined"
          color="default"
          startIcon={
            <KeyboardBackspaceOutlinedIcon
              style={{ color: getRandomColor(3) }}
            />
          }
          onClick={() => handleBack()}
        >
          <Typography color="primary" variant="subtitle1">
            Go Back to Boards
          </Typography>
        </Button>
      </Box>
    );
  }, [boardLoading, authenticated]);

  const handleDownloadReport = async () => {
    const url = replaceStr(
      boardDetails?.isInstant
        ? DOWNLOAD_INSTANT_BOARD_REPORT
        : DOWNLOAD_BOARD_REPORT,
      "{boardId}",
      boardDetails._id
    );
    const response: any = await API(url, {
      method: "GET",
      credentials: "include",
      responseType: "blob", // Important
    });
    await getDownloadFile(response, `${boardDetails?.name}.xlsx`);
  };

  const handleDrawerClose = () => {
    setOpenAccount(false);
  };

  const inviteMember = () => {
    setOpenInviteDialog(true);
  };

  const changeVisibility = () => {
    setOpenChangeVisibilityDialog(true);
  };

  const handleBack = () => {
    dispatch(clearBoard());
    history.push(BOARDS);
  };

  const handleStartSessionDialog = () => {
    setOpenStartSessionDialog(true);
  };

  const handleStopSession = () => {
    setEndSessionDialog(true);
  };

  const dateDiffInDays = () => {
    // Discard the time and time-zone information.
    const completedDateTime: any = new Date(
      boardDetails?.completedAt
    ).getTime();
    const startDateTime: any = new Date(boardDetails?.startedAt).getTime();

    let milisec_diff = null;
    if (startDateTime < completedDateTime) {
      milisec_diff = completedDateTime - startDateTime;
    } else {
      milisec_diff = startDateTime - completedDateTime;
    }
    const dd = Math.floor(milisec_diff / 1000 / 60 / 60 / 24);
    milisec_diff -= dd * 1000 * 60 * 60 * 24;
    const hh = Math.floor(milisec_diff / 1000 / 60 / 60);
    milisec_diff -= hh * 1000 * 60 * 60;
    const mm = Math.floor(milisec_diff / 1000 / 60);
    milisec_diff -= mm * 1000 * 60;
    const ss = Math.floor(milisec_diff / 1000);
    milisec_diff -= ss * 1000;

    return (
      <Box className={boxStyle}>
        <Typography variant="subtitle1" className={boxTextStyle}>
          Session Completed in{" "}
          {`${dd ? dd + " days" : ""} ${hh ? hh + " hrs" : ""}`} {mm}{" "}
          {mm === 1 ? "min" : "mins"} {ss} secs
        </Typography>
      </Box>
    );
  };

  // const handleCreateAction = () => {
  //   setOpenActionDialog(true);
  // };

  const handleClose = () => {
    if (openDialog) {
      setOpenDialog(false);
    }

    if (endSessionDialog) {
      setEndSessionDialog(false);
    }

    // if (openActionDialog) {
    //   setOpenActionDialog(false);
    // }

    if (openStartSessionDialog) {
      setOpenStartSessionDialog(false);
    }

    if (openAddGuestDialog) {
      setOpenAddGuestDialog(false);
    }
  };

  const handleEndSession = () => {
    socket.emit("end-session", {
      action: "end",
      id: boardDetails?._id,
      completedAt: Date.now(),
      memberId,
    });
    handleClose();
  };

  const handleStartSession = () => {
    socket.emit("start-session", {
      action: "start",
      id: boardDetails?._id,
      startedAt: Date.now(),
      memberId,
    });
    handleClose();
  };

  const renderEndSessionDialog = () => {
    return (
      <ResponsiveDialog
        open={endSessionDialog}
        title="End Session"
        pcta="End Session"
        scta="Cancel"
        handleSave={handleEndSession}
        handleClose={handleClose}
        maxWidth={440}
        handleSecondarySubmit={handleClose}
      >
        <Typography variant="h4">
          Are you sure you want to end the session?
        </Typography>
      </ResponsiveDialog>
    );
  };

  const renderStartSessionDialog = () => {
    return (
      <ResponsiveDialog
        open={openStartSessionDialog}
        title="Start Session"
        pcta="Start Session"
        scta="Cancel"
        handleSave={handleStartSession}
        handleClose={handleClose}
        maxWidth={440}
        handleSecondarySubmit={handleClose}
      >
        <Typography variant="h4">
          Are you sure you want to start the session?
        </Typography>
      </ResponsiveDialog>
    );
  };

  const handleInviteClose = () => {
    setOpenInviteDialog(false);
  };

  const renderInviteMemberDialog = () => {
    return (
      <Invite
        selectedBoard={boardDetails}
        openDialog={openInviteDialog}
        handleClose={handleInviteClose}
      />
    );
  };

  const handleVisibilityClose = () => {
    setOpenChangeVisibilityDialog(false);
  };

  const renderChangeVisibilityDialog = () => {
    return (
      <Visibility
        selectedBoard={boardDetails}
        openDialog={openChangeVisibilityDialog}
        handleClose={handleVisibilityClose}
      />
    );
  };

  const handleCreateNewSection = () => {
    setOpenDialog(true);
  };

  const renderCreateSection = () => {
    return <UpdateSection openDialog={openDialog} handleClose={handleClose} />;
  };

  const renderAddGuest = () => {
    return (
      <AddGuest openDialog={openAddGuestDialog} handleClose={handleClose} />
    );
  };

  // const renderCreateAction = () => {
  //   return (
  //     <UpdateAction openDialog={openActionDialog} handleClose={handleClose} />
  //   );
  // };

  const handleCloseRecommendation = () => {
    setBoardCompleted(false);
  };

  const renderRecommendation = () => {
    return (
      <Recommendation
        open={boardCompleted}
        handleClose={handleCloseRecommendation}
      />
    );
  };
  return (
    <Suspense fallback={<div />}>
      {renderDialog()}
      {renderCreateSection()}
      {/* {renderCreateAction()} */}
      {renderEndSessionDialog()}
      {renderInviteMemberDialog()}
      {renderChangeVisibilityDialog()}
      {renderAddGuest()}
      {renderSnackbar()}
      {renderStartSessionDialog()}
      {renderRecommendation()}
      {loading ? (
        <BoardHeaderSkeleton />
      ) : (
        <Grid container spacing={1}>
          <Slide
            direction="right"
            in={true}
            timeout={1500}
            mountOnEnter
            unmountOnExit
          >
            <Grid item xl={5} lg={5} md={5} sm={12} xs={12}>
              <Box display="flex">
                <Box mr={1}>
                  <img src={doLogo} width={40} height={40} />
                </Box>
                <Box mt={0.3} mr={1} className={titleBoxStyle} minWidth={100}>
                  <Typography variant="subtitle1" color="primary">
                    {boardDetails?.name}
                  </Typography>
                </Box>
                <Box mt={0.3} className={titleBoxStyle}>
                  <Typography variant="subtitle1" color="primary">
                    {formateNumber(totalSections)}
                  </Typography>
                </Box>

                {authenticated && !board?.isAnnonymous && (
                  <Box ml={1} mt={0.3}>
                    {/* <HtmlTooltip
                      open={openInviteTooltip}
                      title={
                        <Box display="flex">
                          <IconButton size="small">
                            <PersonAddIcon color="secondary" fontSize="small" />
                          </IconButton>
                          <Box mt={0.3}>
                            <Typography variant="subtitle1" color="secondary">
                              Invite team members
                            </Typography>
                          </Box>
                          <IconButton
                            size="small"
                            onClick={() => handleTooltipClose()}
                          >
                            <ClearIcon color="secondary" fontSize="small" />
                          </IconButton>
                        </Box>
                      }
                      arrow
                    > */}
                    <Button
                      color="primary"
                      onClick={() => inviteMember()}
                      startIcon={
                        <PersonAddIcon style={{ color: getRandomColor(0) }} />
                      }
                    >
                      <Typography variant="subtitle1">Invite</Typography>
                    </Button>
                    {/* </HtmlTooltip> */}
                  </Box>
                )}
                {authenticated && (
                  <Box ml={1} mt={0.3}>
                    {/* <HtmlTooltip
                      open={openVisibilityTooltip}
                      placement="right"
                      title={
                        <Box display="flex">
                          <IconButton size="small">
                            {boardDetails?.isPrivate ? (
                              <LockIcon fontSize="small" color="secondary" />
                            ) : (
                              <PublicIcon fontSize="small" color="secondary" />
                            )}
                          </IconButton>
                          <Box mt={0.3}>
                            <Typography variant="subtitle1" color="secondary">
                              Change Visibility
                            </Typography>
                          </Box>
                          <IconButton
                            size="small"
                            onClick={() => handleTooltipClose()}
                          >
                            <ClearIcon fontSize="small" color="secondary" />
                          </IconButton>
                        </Box>
                      }
                      arrow
                    > */}
                    <Button
                      color="primary"
                      onClick={() => changeVisibility()}
                      startIcon={
                        boardDetails?.isPrivate ? (
                          <LockIcon style={{ color: getRandomColor(4) }} />
                        ) : (
                          <PublicIcon style={{ color: getRandomColor(4) }} />
                        )
                      }
                    >
                      <Typography variant="subtitle1">
                        {boardDetails?.isPrivate ? "Private" : "Public"}
                      </Typography>
                    </Button>
                    {/* </HtmlTooltip> */}
                  </Box>
                )}
                <Box ml={1} mt={0.5}>
                  <AvatarGroupList
                    dataList={joinedMembers}
                    keyName="guestName"
                  />
                </Box>
                <Box ml={1} mt={0.5}>
                  <Typography variant="h5">
                    {formatNumberWithCommas(boardDetails?.views) || 0} views
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Slide>

          <Slide
            direction="left"
            in={true}
            timeout={1500}
            mountOnEnter
            unmountOnExit
          >
            <Grid item xl={7} lg={7} md={7} sm={12} xs={12}>
              <Box display="flex" justifyContent="flex-end">
                {!boardLoading &&
                boardDetails?.startedAt &&
                !boardDetails?.completedAt ? (
                  <Box>{renderTimer()}</Box>
                ) : null}
                {!boardLoading &&
                boardDetails?.startedAt &&
                boardDetails?.completedAt ? (
                  <Box mt={0.3} mr={1}>
                    {renderDiffInDays()}
                  </Box>
                ) : null}
                <Box>
                  {!boardLoading &&
                  (authenticated || boardDetails?.isInstant) &&
                  boardDetails &&
                  !boardDetails.startedAt ? (
                    <>{renderStartSession()}</>
                  ) : null}
                  {!boardLoading &&
                  (authenticated || boardDetails?.isInstant) &&
                  boardDetails?.startedAt &&
                  !boardDetails.completedAt ? (
                    <>{renderEndSession()}</>
                  ) : null}
                </Box>
                {!boardLoading && authenticated ? (
                  <>{renderGoBackToBoards()}</>
                ) : null}
                {(authenticated ||
                  boardDetails?.inInstant ||
                  boardDetails?.inAnnonymous) &&
                  boardDetails?.completedAt && (
                    <Box mr={1}>
                      <Tooltip
                        title="Download to Excel"
                        placement="bottom"
                        arrow
                      >
                        <Button
                          color="primary"
                          onClick={() => handleDownloadReport()}
                          startIcon={
                            <SaveAltIcon style={{ color: getRandomColor(4) }} />
                          }
                        >
                          <Typography variant="subtitle1">
                            Download to Excel
                          </Typography>
                        </Button>
                      </Tooltip>
                    </Box>
                  )}

                {!boardLoading && (authenticated || boardDetails?.isInstant) ? (
                  <>{renderCreateNewSection()}</>
                ) : null}
                {/* {!boardLoading && authenticated ? (
                  <Box mr={1}>
                    <Tooltip
                      title="Create Action Item"
                      placement="bottom"
                      arrow
                    >
                      <Box className={buttonStyle}>
                        <Fab
                          color="primary"
                          onClick={() => handleCreateAction()}
                        >
                          <PlaylistAddIcon color="primary" />
                        </Fab>
                      </Box>
                    </Tooltip>
                  </Box>
                ) : null} */}
                {renderView()}
                <Box>
                  <Button
                    color="primary"
                    onClick={() => handleAccount()}
                    startIcon={
                      <MoreHorizIcon style={{ color: getRandomColor(0) }} />
                    }
                  >
                    <Typography variant="subtitle1">Show Menu</Typography>
                  </Button>
                </Box>
                <PersistentDrawerRight
                  open={openAccount}
                  handleDrawerClose={handleDrawerClose}
                >
                  <UserAccount
                    handleDrawerClose={handleDrawerClose}
                    openAccount={openAccount}
                  />
                </PersistentDrawerRight>
              </Box>
            </Grid>
          </Slide>
        </Grid>
      )}
      <SectionList startSession={startSession} viewType={viewType} />
      {/* <Box className={boxStyle}>
        <Action />
      </Box> */}
    </Suspense>
  );
}
