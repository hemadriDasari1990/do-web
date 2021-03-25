import React, { useEffect, useState, Suspense } from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";

import { BOARD_DASHBOARD } from "../../../routes/config";
import Box from "@material-ui/core/Box";
import SubjectOutlinedIcon from "@material-ui/icons/SubjectOutlined";
import DashboardIcon from "@material-ui/icons/Dashboard";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import LinkOutlinedIcon from "@material-ui/icons/LinkOutlined";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import LockOutlinedIcon from "@material-ui/icons/EnhancedEncryptionOutlined";
import Menu from "@material-ui/core/Menu";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";
import formateNumber from "../../../util/formateNumber";
import getCardSubHeaderText from "../../../util/getCardSubHeaderText";
import { replaceStr } from "../../../util";
import { useBoardLoading } from "../../../redux/state/board";
import { useHistory } from "react-router";
import useStyles from "../../styles";
import AvatarGroupList from "../../common/AvatarGroupList";
import SummaryField from "../../common/SummaryField";
import { getMembers } from "../../../util/member";
import InsertInvitationOutlinedIcon from "@material-ui/icons/InsertInvitationOutlined";
import { useProjectLoading } from "../../../redux/state/project";
import ListSkeleton from "../../common/skeletons/list";
import { useTeamLoading } from "../../../redux/state/team";
import Loader from "../../Loader/components";
import Status from "../../common/Status";

const useLocalStyles = makeStyles((theme: Theme) => ({
  buttonStyle: {
    textAlign: "end",
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
      width: "100%",
    },
  },
  boxCompletedTextStyle: {
    color: "#15ce15",
  },
  boxInProgressTextStyle: {
    color: "#ff0000",
  },
}));

const BoardList = (props: any) => {
  const {
    boards,
    handleMenu,
    setSelectedBoard,
    selectedBoard,
    lastBoard,
  } = props;
  const {} = useLocalStyles();
  const { loading: projectLoading } = useProjectLoading();
  const {
    cursor,
    // cardStyle,
    avatarBoxStyle,
    // boxStyle,
    // boxTextStyle,
    boxMainStyle,
    boxGridStyle,
    boxTopGridStyle,
    iconBoxStyle,
  } = useStyles();
  const history = useHistory();

  /* Redux hooks */
  const { loading } = useBoardLoading();
  const { loading: sendInviteLoading } = useTeamLoading();

  /* Local state */
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [open, setOpen] = React.useState(false);
  const [showMoreIndex, setShowMoreIndex] = React.useState(0);
  const [showMore, setShowMore] = React.useState(false);
  const [clipboardText, setClipboardText] = React.useState("Copy board URL");
  const [selectedIndex, setSelectedIndex] = useState<any>(null);
  /* React Hooks */
  useEffect(() => {}, []);
  const handleCopy = (board: { [Key: string]: any }) => {
    if (!board) {
      return;
    }
    setClipboardText("Copied");
    setSelectedBoard(board);
    navigator.clipboard.writeText(
      (((process.env.REACT_APP_PROTOCOL as string) +
        process.env.REACT_APP_SERVER) as string) +
        ":" +
        process.env.REACT_APP_PORT +
        "/board/" +
        board?._id
    );
  };

  /* Handler functions */
  const renderCardAction = (board: { [Key: string]: any }, index: number) => {
    return (
      <Box display="flex" mt={1}>
        <Box mt={0.5}>{getCardSubHeaderText(board.updatedAt)}</Box>
        <Box ml={1} mt={0.5}>
          <Loader
            enable={selectedIndex === index && sendInviteLoading}
            showInline
          />
        </Box>

        {!sendInviteLoading && (
          <Box>
            <Tooltip arrow title="Action">
              <IconButton
                aria-label={"key-" + index}
                size="small"
                onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                  handleButton(event, board, index)
                }
              >
                <Zoom in={true} timeout={2000}>
                  <MoreHorizIcon />
                </Zoom>
              </IconButton>
            </Tooltip>
          </Box>
        )}
        {renderMenu(board, index)}
      </Box>
    );
  };

  const handleButton = (
    event: React.MouseEvent<HTMLButtonElement>,
    board: { [Key: string]: any },
    index: number
  ) => {
    event.stopPropagation();
    setOpen(!open);
    setAnchorEl(event.currentTarget);
    setSelectedBoard(board);
    setSelectedIndex(index);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedIndex(null);
  };

  const handleMenuItem = async (
    event: React.MouseEvent<HTMLDivElement | MouseEvent>,
    action: string
  ) => {
    handleMenu(event, action);
    setOpen(false);
  };

  const renderMenu = (board: { [Key: string]: any }, index: number) => {
    const teamMembersLength: number = getMembers(board?.teams)?.length;
    return (
      <>
        {selectedIndex === index && (
          <Menu
            id={"key-" + index}
            open={open}
            onClose={handleClose}
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            keepMounted
            getContentAnchorEl={null}
            TransitionComponent={Zoom}
          >
            <ListItem
              button={true}
              onClick={(event: React.MouseEvent<HTMLDivElement | MouseEvent>) =>
                handleMenuItem(event, "edit")
              }
            >
              <ListItemAvatar style={{ minWidth: 35 }}>
                <EditIcon />
              </ListItemAvatar>
              <ListItemText
                primary={<b>Edit Board</b>}
                secondary="Update the board"
              />
            </ListItem>
            <ListItem
              button={true}
              onClick={(event: React.MouseEvent<HTMLDivElement | MouseEvent>) =>
                handleMenuItem(event, "delete")
              }
            >
              <ListItemAvatar style={{ minWidth: 35 }}>
                <DeleteOutlineIcon />
              </ListItemAvatar>
              <ListItemText
                primary={<b>Delete Board</b>}
                secondary="Once deleted can't be done"
              />
            </ListItem>
            {selectedIndex === index &&
            teamMembersLength > 0 &&
            board?.status !== "completed" ? (
              <ListItem
                button={true}
                onClick={(
                  event: React.MouseEvent<HTMLDivElement | MouseEvent>
                ) => handleMenuItem(event, "invite")}
              >
                <ListItemAvatar style={{ minWidth: 35 }}>
                  <InsertInvitationOutlinedIcon />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <b>
                      {!board?.inviteSent ? "Send Invite" : "Resend Invite"}
                    </b>
                  }
                  secondary={`Invite will be sent to ${formateNumber(
                    teamMembersLength
                  )} ${teamMembersLength > 1 ? "members" : "member"}`}
                />
              </ListItem>
            ) : null}
          </Menu>
        )}
      </>
    );
  };

  const renderCardTitle = (board: { [Key: string]: any }) => {
    return (
      <Box display="flex">
        <Box
          mt={0.7}
          mr={2}
          className={cursor}
          onClick={() => handleCard(board)}
        >
          <Typography variant="h3" color="primary">
            {board?.title}
          </Typography>
        </Box>
      </Box>
    );
  };

  const handleShowMore = (
    event: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    event.stopPropagation();
    setShowMoreIndex(index);
    setShowMore(!showMore);
  };

  const renderSecondaryText = (message: string, index: number) => {
    return (
      <Box display="flex">
        <Typography component="p" variant="body2">
          {!showMore && message && message.length > 70
            ? message.slice(0, 70)
            : message}
          {/* {showMore && message && showMoreIndex === index ? message : null}
              {showMore && message && showMoreIndex !== index
                ? message.slice(0, 200)
                : null} */}
          {message.length > 70 ? (
            <span
              onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                handleShowMore(event, index)
              }
              className={cursor}
            >
              {showMore && showMoreIndex === index
                ? " Show Less"
                : "... Show More"}
            </span>
          ) : null}
        </Typography>
      </Box>
    );
  };

  const renderCardContent = (board: { [Key: string]: any }, index: number) => {
    return (
      <Box minHeight={50}>
        <Box my={2} display="flex">
          <Box mr={2}>
            <SubjectOutlinedIcon />
          </Box>

          <Zoom in={true} timeout={2000}>
            <Typography>
              {renderSecondaryText(board.description, index)}
            </Typography>
          </Zoom>
        </Box>
        <Box my={2} display="flex" justifyContent="space-between">
          <SummaryField
            title="Teams"
            value={
              <AvatarGroupList
                dataList={board?.teams}
                noDataMessage="No Teams"
              />
            }
          />
          <SummaryField
            title="Members"
            value={
              <AvatarGroupList
                dataList={getMembers(board?.teams)}
                noDataMessage="No Members"
              />
            }
          />
          <SummaryField
            title="Sprint"
            value={formateNumber(board?.sprint || 0)}
          />
        </Box>
        <Box my={2} display="flex" justifyContent="space-between">
          <SummaryField
            title="Status"
            value={<Status value={board?.status} />}
          />
          <SummaryField
            title="Total sections"
            value={formateNumber(board?.totalSections || 0)}
          />
          <SummaryField
            title="Invite sent"
            value={` ${formateNumber(board?.inviteCount)} ${
              board?.inviteCount === 1 ? "time" : "times"
            }`}
          />
        </Box>
        <Box mt={2} display="flex">
          <Box mt={0.3}>
            <Typography variant="subtitle1">Actions</Typography>
          </Box>
          {board?.isLocked && (
            <Box mx={1} mt={0.2}>
              <Tooltip arrow title="Locked for others">
                <LockOutlinedIcon color="primary" />
              </Tooltip>
            </Box>
          )}
          {board?.status !== "draft" && (
            <Box>
              <Tooltip
                arrow
                placement="right"
                title={
                  selectedBoard?._id === board?._id && clipboardText
                    ? clipboardText
                    : "Copy board URL"
                }
              >
                <Zoom in={true} timeout={1500}>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => handleCopy(board)}
                  >
                    <LinkOutlinedIcon />
                  </IconButton>
                </Zoom>
              </Tooltip>
            </Box>
          )}
        </Box>
      </Box>
    );
  };

  const handleCard = (board: { [Key: string]: any }) => {
    if (board?.status === "draft") {
      return;
    }
    history.push(replaceStr(BOARD_DASHBOARD, ":boardId", board?._id));
  };

  return (
    <Suspense fallback={<ListSkeleton />}>
      {projectLoading && <ListSkeleton />}
      <Grid container spacing={2}>
        {!loading && Array.isArray(boards)
          ? boards.map((b: { [Key: string]: any }, index: number) => (
              <Grid
                key={b?._id}
                item
                xl={3}
                lg={3}
                md={4}
                sm={6}
                xs={12}
                ref={lastBoard}
              >
                <Box className={boxMainStyle}>
                  <Box
                    className={`${boxTopGridStyle}`}
                    // style={{ background: getRandomBGColor() }}
                  ></Box>
                  <Box className={boxGridStyle}>
                    <Box className={iconBoxStyle}>
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        p={0.5}
                      >
                        <DashboardIcon
                          // style={{ background: getRandomBGColor() }}
                          className={avatarBoxStyle}
                          color="secondary"
                        />
                      </Box>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                      {renderCardTitle(b)}
                      {renderCardAction(b, index)}
                    </Box>
                    <Box>
                      <Typography component="p">
                        {renderCardContent(b, index)}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            ))
          : null}
      </Grid>
    </Suspense>
  );
};

export default BoardList;
