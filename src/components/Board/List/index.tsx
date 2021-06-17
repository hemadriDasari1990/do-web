import React, { Suspense, useState } from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";
import getRandomBGColor, { getRandomColor } from "../../../util/getRandomColor";

import ArrowForwardOutlinedIcon from "@material-ui/icons/ArrowForwardOutlined";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroupList from "../../common/AvatarGroupList";
import { BOARD_DASHBOARD } from "../../../routes/config";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { Divider } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import FilterNoneOutlinedIcon from "@material-ui/icons/FilterNoneOutlined";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import InsertInvitationOutlinedIcon from "@material-ui/icons/InsertInvitationOutlined";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListSkeleton from "../../common/skeletons/list";
import Menu from "@material-ui/core/Menu";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Status from "../../common/Status";
import SummaryField from "../../common/SummaryField";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";
import { formatNumberWithCommas } from "../../../util";
import formateNumber from "../../../util/formateNumber";
import { getBoardDetails } from "../../../redux/actions/board";
import getCardSubHeaderText from "../../../util/getCardSubHeaderText";
import { getMembers } from "../../../util/member";
import { replaceStr } from "../../../util";
import spinner from "../../../assets/Spinner.svg";
import { useBoardLoading } from "../../../redux/state/board";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useProjectLoading } from "../../../redux/state/project";
import useStyles from "../../styles";
import useTableStyles from "../../styles/table";
import { useTeamLoading } from "../../../redux/state/team";

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

const BoardList = React.memo((props: any) => {
  const { boards, handleMenu, setSelectedBoard, hideMenu, showProject } = props;
  const {} = useLocalStyles();
  const { loading: projectLoading } = useProjectLoading();
  const { cursor, boxMainStyle, avatarBoxStyle } = useStyles();
  const { smallAvatarStyle } = useTableStyles();
  const history = useHistory();
  const dispatch = useDispatch();

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

  const handleCopy = (
    event: React.MouseEvent<HTMLButtonElement>,
    board: { [Key: string]: any },
    index: number
  ) => {
    event.stopPropagation();
    event.preventDefault();
    if (!board) {
      return;
    }
    setClipboardText("Copied");
    setSelectedIndex(index);
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
      <Box display="flex">
        <Box mt={0.4}>
          <Typography variant="h6">
            {formatNumberWithCommas(board?.views) || 0}{" "}
            {board?.views === 1 ? "View" : "Views"}
          </Typography>
        </Box>
        {selectedIndex === index && sendInviteLoading ? (
          <Box ml={1} mt={-0.4}>
            <img src={spinner} />
          </Box>
        ) : null}

        {!hideMenu && !sendInviteLoading && (
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
    event.preventDefault();
    setOpen(!open);
    setAnchorEl(event.currentTarget);
    if (typeof setSelectedBoard === "function") {
      setSelectedBoard(board);
    }
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
    event.stopPropagation();
    event.preventDefault();
    handleMenu(event, action);
    setOpen(false);
  };

  const handleClickAwayClose = (
    event: React.MouseEvent<Document, MouseEvent>
  ) => {
    event.preventDefault();
    setAnchorEl(null);
    setOpen(false);
  };

  const renderMenu = (board: { [Key: string]: any }, index: number) => {
    const teamMembersLength: number = getMembers(board?.teams)?.length;
    return (
      <ClickAwayListener onClickAway={handleClickAwayClose}>
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
              onClick={(event: React.MouseEvent<HTMLDivElement | MouseEvent>) =>
                event.stopPropagation()
              }
            >
              <ListItem
                button={true}
                onClick={(
                  event: React.MouseEvent<HTMLDivElement | MouseEvent>
                ) => handleMenuItem(event, "edit")}
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
                onClick={(
                  event: React.MouseEvent<HTMLDivElement | MouseEvent>
                ) => handleMenuItem(event, "delete")}
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
                    secondary={`Send invite to ${formateNumber(
                      teamMembersLength
                    )} ${teamMembersLength > 1 ? "members" : "member"}`}
                  />
                </ListItem>
              ) : null}
            </Menu>
          )}
        </>
      </ClickAwayListener>
    );
  };

  const handleShowMore = (
    event: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    event.stopPropagation();
    event.preventDefault();
    setShowMoreIndex(index);
    setShowMore(!showMore);
  };

  const renderSecondaryText = (message: string, index: number) => {
    return (
      <Box display="flex">
        <Typography variant="subtitle1">
          {!showMore && message && message?.length > 70
            ? message.slice(0, 70)
            : message}
          {message.length > 70 && index === showMoreIndex ? (
            <span
              onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                handleShowMore(event, index)
              }
              className={cursor}
              style={{ fontWeight: 300 }}
            >
              {showMore && showMoreIndex === index
                ? " see less"
                : " ...see more"}
            </span>
          ) : null}
        </Typography>
      </Box>
    );
  };

  const renderCardActions = (board: { [Key: string]: any }, index: number) => {
    return (
      <Box display="flex" justifyContent="space-between" width="100%">
        <Box>
          <AvatarGroupList
            dataList={board?.joinedMembers}
            noDataMessage={board?.isAnnonymous ? "Annonymous" : "No Members"}
          />
        </Box>
        <Box display="flex">
          <Box mr={2} mt={0.4}>
            <Status value={board?.status} />
          </Box>
          {showProject && (
            <Box mr={2}>
              <Avatar
                className={smallAvatarStyle}
                style={{ background: getRandomColor(index) }}
              >
                <Tooltip arrow title={board?.project?.name}>
                  <Typography variant="h6" color="secondary">
                    {board?.project?.name?.substring(0, 1)?.toUpperCase()}
                  </Typography>
                </Tooltip>
              </Avatar>
            </Box>
          )}
          <Box mr={2}>
            {board?.status !== "draft" && (
              <Tooltip
                arrow
                title={
                  selectedIndex === index && clipboardText
                    ? clipboardText
                    : "Copy board URL"
                }
              >
                <Zoom in={true} timeout={1500}>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                      handleCopy(event, board, index)
                    }
                  >
                    <FilterNoneOutlinedIcon fontSize="small" />
                  </IconButton>
                </Zoom>
              </Tooltip>
            )}
          </Box>
          <Box>
            <Tooltip title="View Board" arrow>
              <IconButton
                onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                  viewBoard(event, board)
                }
                size="small"
              >
                {" "}
                <ArrowForwardOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>
    );
  };

  const renderCardContent = (board: { [Key: string]: any }, index: number) => {
    return (
      <Box>
        <SummaryField
          title="Description"
          value={renderSecondaryText(board.description || "--", index)}
        />
      </Box>
    );
  };

  const handleCard = (
    event: React.MouseEvent<HTMLDivElement>,
    board: { [Key: string]: any }
  ) => {
    event.stopPropagation();
    event.preventDefault();
    if (board?.status === "draft") {
      return;
    }
    dispatch(getBoardDetails(board?._id));
    return history.replace({
      pathname: replaceStr(BOARD_DASHBOARD, ":boardId", board?._id),
      state: {
        board: board,
      },
    });
  };

  const viewBoard = (
    event: React.MouseEvent<HTMLButtonElement>,
    board: { [Key: string]: any }
  ) => {
    event.stopPropagation();
    event.preventDefault();
    if (board?.status === "draft") {
      return;
    }
    return history.replace({
      pathname: replaceStr(BOARD_DASHBOARD, ":boardId", board?._id),
      state: {
        board: board,
      },
    });
  };

  return (
    <Suspense fallback={<ListSkeleton />}>
      {projectLoading && <ListSkeleton />}
      <Grid container spacing={2}>
        {!loading && Array.isArray(boards)
          ? boards.map((b: { [Key: string]: any }, index: number) => (
              <Grid key={b?._id} item xl={3} lg={3} md={6} sm={12} xs={12}>
                <Card
                  className={`${boxMainStyle} ${cursor}`}
                  onClick={(event: React.MouseEvent<HTMLDivElement>) =>
                    handleCard(event, b)
                  }
                >
                  <CardHeader
                    avatar={
                      <DashboardOutlinedIcon
                        className={`${avatarBoxStyle}`}
                        color="secondary"
                        style={{ background: getRandomBGColor(index) }}
                      />
                    }
                    action={renderCardAction(b, index)}
                    title={b?.name}
                    subheader={getCardSubHeaderText(b.createdAt)}
                  />
                  <CardContent>{renderCardContent(b, index)}</CardContent>
                  <Box mb={1}>
                    <Divider />
                  </Box>
                  <CardActions style={{ justifyContent: "space-between" }}>
                    {renderCardActions(b, index)}
                  </CardActions>
                </Card>
              </Grid>
            ))
          : null}
      </Grid>
    </Suspense>
  );
});

export default BoardList;
