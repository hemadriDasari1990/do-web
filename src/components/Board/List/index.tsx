import React, { useEffect } from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";

import { BOARD_DASHBOARD } from "../../../routes/config";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import LinkOutlinedIcon from "@material-ui/icons/LinkOutlined";
import List from "@material-ui/core/List";
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
  const { boards, handleMenu, setSelectedBoard, selectedBoard } = props;
  const { boxInProgressTextStyle, boxCompletedTextStyle } = useLocalStyles();
  const {
    cursor,
    cardStyle,
    avatarBoxStyle,
    boxStyle,
    boxTextStyle,
  } = useStyles();
  const history = useHistory();

  /* Redux hooks */
  const { loading } = useBoardLoading();

  /* Local state */
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [open, setOpen] = React.useState(false);
  const [showMoreIndex, setShowMoreIndex] = React.useState(0);
  const [showMore, setShowMore] = React.useState(false);
  const [clipboardText, setClipboardText] = React.useState("Copy board URL");

  /* React Hooks */
  useEffect(() => {}, []);

  const handleCopy = (board: { [Key: string]: any }) => {
    if (!board) {
      return;
    }
    setClipboardText("Copied");
    setSelectedBoard(board);
    navigator.clipboard.writeText(
      "http://" + process.env.REACT_APP_SERVER + "/board/" + board?._id
    );
  };

  const getRandomBGColor = () => {
    let colorValues = [
      "linear-gradient(50deg, #ea087b 0%, #ff5656 100%)",
      "linear-gradient(50deg, #0072ff 0%, #0095ffba 100%)",
      "linear-gradient(50deg, #ffc800 0%, #ff0000ba 100%)",
      "linear-gradient(50deg, #2d7bf1 0%, #27fd00 100%)",
      "linear-gradient(50deg, rgb(255 224 0) 0%, rgb(255 0 59 / 94%) 100%)",
      "linear-gradient(90deg, #f8ff00 0%, #3ad59f 100%)",
    ];
    return colorValues[Math.floor(Math.random() * colorValues.length)];
  };

  /* Handler functions */
  const renderCardAction = (board: { [Key: string]: any }) => {
    return (
      <Box display="flex">
        {board?.status === "draft" && (
          <Box mt={0.2}>
            <Tooltip title="Completed">
              <Typography variant="h6" color="primary">
                Draft
              </Typography>
            </Tooltip>
          </Box>
        )}
        {board?.status === "pending" && (
          <Box mt={0.2}>
            <Tooltip title="Completed">
              <Typography variant="h6" color="primary">
                New
              </Typography>
            </Tooltip>
          </Box>
        )}
        {board?.status === "inprogress" && (
          <Box mt={0.2}>
            <Tooltip title="Completed">
              <Typography variant="h6" className={boxInProgressTextStyle}>
                In Progress
              </Typography>
            </Tooltip>
          </Box>
        )}
        {board?.status === "completed" && (
          <Box mr={1} mt={0.2}>
            <Tooltip title="Completed">
              <Typography variant="h6" className={boxCompletedTextStyle}>
                Completed
              </Typography>
            </Tooltip>
          </Box>
        )}
        <Box>
          <Tooltip title="Action">
            <IconButton
              aria-label="settings"
              size="small"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                handleButton(event, board)
              }
            >
              <Zoom in={true} timeout={2000}>
                <MoreHorizIcon />
              </Zoom>
            </IconButton>
          </Tooltip>
        </Box>
        {renderMenu()}
      </Box>
    );
  };

  const handleButton = (
    event: React.MouseEvent<HTMLButtonElement>,
    board: { [Key: string]: any }
  ) => {
    event.stopPropagation();
    setOpen(!open);
    setAnchorEl(event.currentTarget);
    setSelectedBoard(board);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMenuItem = async (
    event: React.MouseEvent<HTMLDivElement | MouseEvent>,
    action: string
  ) => {
    handleMenu(event, action);
    setOpen(false);
  };

  const renderMenu = () => {
    return (
      <Menu
        id="fade-menu"
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
      </Menu>
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
          <Typography variant="h5">{board?.title}</Typography>
        </Box>
      </Box>
    );
  };

  const renderCardSubTitle = (board: { [Key: string]: any }) => {
    return (
      <Box mt={0.2} display="flex">
        {getCardSubHeaderText(board.updatedAt)}
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
        <List>
          <ListItem alignItems="flex-start">
            <Zoom in={true} timeout={2000}>
              <ListItemText
                secondary={renderSecondaryText(board.description, index)}
              />
            </Zoom>
          </ListItem>
        </List>
      </Box>
    );
  };

  const handleCard = (board: { [Key: string]: any }) => {
    if (board?.status === "draft") {
      return;
    }
    history.push(replaceStr(BOARD_DASHBOARD, ":boardId", board?._id));
  };

  const renderCardActions = (board: { [Key: string]: any }) => {
    return (
      <Box display="flex" justifyContent="space-between">
        <Box display="flex">
          <Box display="flex" className={boxStyle} mr={2}>
            <Box className={boxTextStyle}>
              <Typography color="primary" variant="body2">
                Sprint {formateNumber(board?.sprint || 0)}
              </Typography>
            </Box>
          </Box>
          <Box display="flex" className={boxStyle}>
            <Box className={boxTextStyle}>
              <Typography color="primary" variant="body2">
                {formateNumber(board?.totalSections || 0)}
                {board?.totalSections == 1 ? " section" : " sections"}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box display="flex">
          {board?.isLocked && (
            <Box mr={1} mt={0.2}>
              <Tooltip title="Locked for others">
                <LockOutlinedIcon color="primary" />
              </Tooltip>
            </Box>
          )}
          {board?.status !== "draft" && (
            <Box>
              <Tooltip
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

  /* Handler functions */

  return (
    <React.Fragment>
      <List>
        <Grid container spacing={2}>
          {!loading && Array.isArray(boards)
            ? boards.map((b: { [Key: string]: any }, index: number) => (
                <Grid key={b?._id} item xl={3} lg={3} md={4} sm={6} xs={12}>
                  <Card className={cardStyle}>
                    <CardHeader
                      avatar={
                        <DashboardIcon
                          style={{ background: getRandomBGColor() }}
                          className={avatarBoxStyle}
                          color="secondary"
                        />
                      }
                      action={renderCardAction(b)}
                      title={renderCardTitle(b)}
                      subheader={renderCardSubTitle(b)}
                    />
                    <CardContent>
                      {renderCardContent(b, index)}
                      <Box ml={2} mb={1}>
                        {renderCardActions(b)}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            : null}
        </Grid>
      </List>
    </React.Fragment>
  );
};

export default BoardList;
