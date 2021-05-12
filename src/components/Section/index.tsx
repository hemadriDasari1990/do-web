import React, { Suspense, useCallback, useEffect, useState } from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";
import { clearBoard, getBoardDetails } from "../../redux/actions/board";
import {
  getDownloadFile,
  replaceStr,
  formatNumberWithCommas,
} from "../../util";
import { useBoard, useBoardLoading } from "../../redux/state/board";
import { useHistory, useParams } from "react-router";
import CardTravelIcon from "@material-ui/icons/CardTravel";
import API from "../../network";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import { BOARDS } from "../../routes/config";
import BoardHeaderSkeleton from "../common/skeletons/boardHeader";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
// import ClearIcon from "@material-ui/icons/Clear";
import { DOWNLOAD_BOARD_REPORT } from "../../network/endpoints";
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
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import Slide from "@material-ui/core/Slide";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import ViewColumnIcon from "@material-ui/icons/ViewColumn";
import ViewStreamIcon from "@material-ui/icons/ViewStream";
import Visibility from "../common/visibility";
import Zoom from "@material-ui/core/Zoom";
import { addProjectToStore } from "../../redux/actions/project";
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
import Tour from "reactour";
import AdminUser from "../common/User";
import Recommendation from "../Recommendation";

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
  const { buttonStyle, titleBoxStyle, tourStyle } = useStyles();
  const dispatch = useDispatch();
  const { boardId } = useParams<{ boardId: string }>();
  const { totalSections: totalSectionsCount, board } = useBoard();
  const { loading } = useBoardLoading();
  const { userId } = useLogin();
  const history = useHistory();
  const { loading: boardLoading } = useBoardLoading();
  const { socket } = useSocket();
  const authenticated = useAuthenticated();
  const { members: joinedMembersList } = useJoinedMembers();
  // const emailFromLS = localStorage.getItem(`${boardId}`) as string;
  const { token } = useParams<{ token: string }>();

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
  const [startTour, setStartTour] = useState(false);
  // const [openInviteTooltip, setOpenInviteTootltip] = useState(true);
  // const [openVisibilityTooltip, setOpenVisibilityTootltip] = useState(true);
  // const [openSessionTooltip, setOpenSessionTootltip] = useState(true);
  // const [openSectionTooltip, setOpenSectionTootltip] = useState(true);

  useEffect(() => {
    if (boardId) {
      dispatch(getBoardDetails(boardId));
      dispatch(getJoinedMembers(boardId, "", 0, MEMBERS_PER_PAGE));
      if (!authenticated && token) {
        socket.emit("check-if-member-joined-board", {
          token,
          boardId: boardId,
        });
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
          updateJoinedMember(response);
        } else {
          setJoinedMembers((currentMembers: Array<{ [Key: string]: any }>) => [
            ...currentMembers,
            response,
          ]);
        }
        setJoinedMember(response);
        setOpenSnackbar(true);
        setOpenAddGuestDialog(false);
      }
    );

    return () => {
      socket.off("join-member-to-board-response");
    };
  }, [joinedMembers]);

  useEffect(() => {
    /* Add if member already joined */
    socket.on(
      `check-if-member-joined-board-response`,
      (response: { [Key: string]: any }) => {
        // if (response?._id) {
        //   setJoinedMembers((currentMembers: Array<{ [Key: string]: any }>) => [
        //     ...currentMembers,
        //     response,
        //   ]);
        // } else {
        //   /* ask user to choose avatar */
        //   setOpenAddGuestDialog(true);
        // }
        if (!response?._id) {
          setOpenAddGuestDialog(true);
        }
      }
    );

    return () => {
      socket.off("check-if-member-joined-board-response");
    };
  }, [joinedMembers]);

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
    if (
      !authenticated &&
      !token &&
      !loading &&
      !board?.isPrivate &&
      !board?.isAnnonymous &&
      board?.startedAt
    ) {
      setOpenAddGuestDialog(true);
    }
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
        setTotalSections(totalSections + 1);
      }
    );
    /* Add sectisection count responseon  */
    socket.on(
      `plus-total-section-response`,
      (newSection: { [Key: string]: any }) => {
        if (!newSection?._id) {
          return;
        }
        setTotalSections(totalSections - 1);
      }
    );
    return () => {
      socket.off("plus-total-section-response");
      socket.off("minus-total-section-response");
    };
  }, [boardDetails]);

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
      (board?.status === "draft" || (board?.status === "new" && !userId))
    ) {
      setMessage(
        "The Retro session isn't started yet. Please contact organisor."
      );
      setShowDialog(true);
    }
    if (!userId && !loading && board?.isPrivate) {
      setMessage(
        "The board isn't public. Please request organizer to make it public"
      );
      setShowDialog(true);
    }
    if (!loading && board?.status === "completed" && !userId) {
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

  const updateJoinedMember = (existingMember: { [Key: string]: any }) => {
    if (!existingMember || !joinedMembers?.length) {
      return;
    }
    const newJoinedMembers: Array<{ [Key: string]: any }> = [...joinedMembers];
    const memberIndex: number = newJoinedMembers.findIndex(
      (newJoinedMember: { [Key: string]: any }) =>
        newJoinedMember._id === existingMember._id
    );
    const joinedMember: { [Key: string]: any } = newJoinedMembers[memberIndex];
    if (!joinedMember) {
      setJoinedMembers([joinedMember, joinedMembers]);
      return;
    }
    joinedMember.avatarId = existingMember.avatarId;
    newJoinedMembers[memberIndex] = joinedMember;

    setJoinedMembers(newJoinedMembers);
  };

  const handleAccount = () => {
    setOpenAccount(!openAccount);
  };

  const handleView = (type: string) => {
    setViewType(type);
  };

  const handleStartTour = () => {
    setStartTour(true);
  };

  const handleCloseTour = () => {
    setStartTour(false);
  };

  const renderDialog = () => {
    return (
      <Box>
        <ResponsiveDialog
          open={showDialog}
          title={board?.status === "completed" && !userId ? "Hey!" : ""}
          handleSave={handleDialogClose}
          pcta="Ok"
          maxWidth={440}
          hideSecondary={true}
          hideButton={
            board?.status === "draft" || (board?.status === "new" && !userId)
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
          <Fab
            id="create-section"
            color="primary"
            onClick={() => handleCreateNewSection()}
          >
            <AddOutlinedIcon style={{ color: getRandomColor(1) }} />
          </Fab>
        </Box>
        {/* </HtmlTooltip> */}
      </Box>
    );
  }, [boardLoading, authenticated]);

  const renderTourButton = () => {
    return (
      <Tooltip title="Start Tour">
        <Box mr={1} className={buttonStyle}>
          <Fab color="primary" onClick={() => handleStartTour()}>
            <CardTravelIcon style={{ color: getRandomColor(4) }} />
          </Fab>
        </Box>
      </Tooltip>
    );
  };

  const renderView = () => {
    return (
      <Box display="flex">
        <Box mr={1} className={buttonStyle}>
          <Fab
            id="grid-view"
            color="primary"
            onClick={() => handleView("wrap")}
          >
            <ViewStreamIcon style={{ color: getRandomColor(0) }} />
          </Fab>
        </Box>
        <Box mr={1} className={buttonStyle}>
          <Fab
            id="list-view"
            color="primary"
            onClick={() => handleView("nowrap")}
          >
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
    const response: any = await API(
      replaceStr(DOWNLOAD_BOARD_REPORT, "{boardId}", boardDetails._id),
      {
        method: "GET",
        credentials: "include",
        responseType: "blob", // Important
      }
    );
    await getDownloadFile(response, `${boardDetails.name}.xlsx`);
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
    });
    handleClose();
  };

  const handleStartSession = () => {
    socket.emit("start-session", {
      action: "start",
      id: boardDetails?._id,
      startedAt: Date.now(),
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

  const tourConfig: any = [
    {
      content: () => (
        <Box>
          <AdminUser />
          <Box mt={3}>
            <Typography variant="h6">
              Welcome to your retrospective board
            </Typography>
          </Box>
          <Box my={1}>
            <Typography variant="h6">
              We're thrilled to count you in the letsdoretro community.{" "}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6">
              My name is Hemadri (but please, call me Hemanth), and I'm going to
              show you everything that letsdoretro.com can offer to your team.
              In just 2 mins, you will be able to launch your first
              retrospective board.{" "}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      selector: '[id="invite"]',
      content: () => (
        <Box>
          <AdminUser />
          <Box mt={3}>
            <Typography variant="h6">
              We're currently on your <b>team dashboard.</b>
            </Typography>
          </Box>
          <Box my={1}>
            <Typography variant="h6">
              This is the place where you can see the summary of your account,
              recent projects, boards and most importantly quick retro launch in
              seconds.
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6">
              You will also be able to{" "}
              <b>access your recent projects or boards</b> from there.
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      selector: '[id="visibility"]',
      content: () => (
        <Box>
          <AdminUser />
          <Box mt={3}>
            <Typography variant="h6">
              We'd love your feedback on your experience with our Retro tool
            </Typography>
          </Box>
          <Box my={1}>
            <Typography variant="h6">
              You can access this feature to share us the feedback about what
              you like, dis like about the tool and suggestions to improve the
              system.
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      selector: '[id="invited-members"]',
      content: () => (
        <Box>
          <AdminUser />
          <Box mt={3}>
            <Typography variant="h6">
              Your team members do not need to create a retro account to join a
              retrospective board.
            </Typography>
          </Box>
          <Box my={1}>
            <Typography variant="h6">
              You can access this feature to manage teams, members and team
              members.
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      selector: '[id="timer"]',
      content: () => (
        <Box>
          <AdminUser />
          <Box mt={3}>
            <Typography variant="h6">
              You can use this feature to manage your account like you can
              change password, email address, name and security questions
              anytime.
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      selector: '[id="download"]',
      content: () => (
        <Box>
          <AdminUser />
          <Box mt={3}>
            <Typography variant="h6">
              You can use this feature to change your avatar. We have plenty of
              cool avatars.
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      selector: '[id="create-section"]',
      content: () => (
        <Box>
          <AdminUser />
          <Box mt={3}>
            <Typography variant="h6">
              Okay, this is cool, but I would like to launch my first
              retrospective now!
            </Typography>
          </Box>
          <Box my={1}>
            <Typography variant="h6">
              Start quick retro is the awesome feature to launch a retrospective
              board in just 3 steps but, we would recommend to create your team
              first and add your team members to the team. If this is already
              done then you're in right place.
            </Typography>
          </Box>
          <Box my={1}>
            <Typography variant="h6">
              As a step, select the project or if you havent created a project
              then just type your project name or select from the drop down and
              enter description about your project.
            </Typography>
          </Box>
          <Box my={1}>
            <Typography variant="h6">
              In the 2nd step, choose no of sections.
            </Typography>
          </Box>
          <Box my={1}>
            <Typography variant="h6">
              In the 3rd step, select the team that you would like to invite to
              join the restrospective session. That's it click on start retro
              button to create the board.
            </Typography>
          </Box>
        </Box>
      ),
      position: "left",
    },
    {
      selector: '[id="grid-view"]',
      content: () => (
        <Box>
          <AdminUser />
          <Box mt={3}>
            <Typography variant="h6">
              You're all set! Now all you have to do is to start your first
              retrospective!
            </Typography>
          </Box>
          <Box my={1}>
            <Typography variant="h6">
              Any questions? Hit me up via the chat module on the bottom right
              corner of the page.
            </Typography>
          </Box>
          <Box my={1}>
            <Typography variant="subtitle1">
              We wish you some excellent retrospectives!
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      selector: '[id="list-view"]',
      content: () => (
        <Box>
          <AdminUser />
          <Box mt={3}>
            <Typography variant="h6">
              You're all set! Now all you have to do is to start your first
              retrospective!
            </Typography>
          </Box>
          <Box my={1}>
            <Typography variant="h6">
              Any questions? Hit me up via the chat module on the bottom right
              corner of the page.
            </Typography>
          </Box>
          <Box my={1}>
            <Typography variant="subtitle1">
              We wish you some excellent retrospectives!
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      selector: '[id="show-menu"]',
      content: () => (
        <Box>
          <AdminUser />
          <Box mt={3}>
            <Typography variant="h6">
              You're all set! Now all you have to do is to start your first
              retrospective!
            </Typography>
          </Box>
          <Box my={1}>
            <Typography variant="h6">
              Any questions? Hit me up via the chat module on the bottom right
              corner of the page.
            </Typography>
          </Box>
          <Box my={1}>
            <Typography variant="subtitle1">
              We wish you some excellent retrospectives!
            </Typography>
          </Box>
        </Box>
      ),
    },
  ];

  const renderTour = () => (
    <Tour
      onRequestClose={handleCloseTour}
      steps={tourConfig}
      isOpen={startTour}
      // maskClassName="mask"
      // className="helper"
      rounded={5}
      accentColor="#57f"
      className={tourStyle}
    />
  );

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
      {renderTour()}
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
            <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
              <Box display="flex">
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
                      id="invite"
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
                      id="visibility"
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
                <Box ml={1} mt={0.5} id="invited-members">
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
            <Grid item xl={8} lg={8} md={8} sm={12} xs={12}>
              <Box display="flex" justifyContent="flex-end">
                {!boardLoading &&
                boardDetails?.startedAt &&
                !boardDetails?.completedAt ? (
                  <Box id="timer">{renderTimer()}</Box>
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
                  authenticated &&
                  boardDetails &&
                  !boardDetails.startedAt ? (
                    <>{renderStartSession()}</>
                  ) : null}
                  {!boardLoading &&
                  authenticated &&
                  boardDetails?.startedAt &&
                  !boardDetails.completedAt ? (
                    <>{renderEndSession()}</>
                  ) : null}
                </Box>
                {!boardLoading && authenticated ? (
                  <>{renderGoBackToBoards()}</>
                ) : null}
                {boardDetails?.completedAt && (
                  <Box mr={1}>
                    <Tooltip title="Download to Excel" placement="bottom" arrow>
                      <Button
                        color="primary"
                        onClick={() => handleDownloadReport()}
                        startIcon={
                          <SaveAltIcon style={{ color: getRandomColor(4) }} />
                        }
                        id="download"
                      >
                        <Typography variant="subtitle1">
                          Download to Excel
                        </Typography>
                      </Button>
                    </Tooltip>
                  </Box>
                )}

                {!boardLoading && authenticated ? (
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
                {!boardLoading && authenticated ? renderTourButton() : null}
                <Box>
                  <Button
                    color="primary"
                    onClick={() => handleAccount()}
                    startIcon={
                      <MoreHorizIcon style={{ color: getRandomColor(0) }} />
                    }
                  >
                    <Typography id="show-menu" variant="subtitle1">
                      Show Menu
                    </Typography>
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

      <Box className={boxStyle}>
        <SectionList startSession={startSession} viewType={viewType} />
      </Box>
      {/* <Box className={boxStyle}>
        <Action />
      </Box> */}
    </Suspense>
  );
}
