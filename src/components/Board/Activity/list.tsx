import React, { useEffect } from "react";
import { getActivityText, getInitials } from "../../../util";

import { ACTIVITIES_PER_PAGE } from "../../../util/constants";
import { Avatar } from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import Box from "@material-ui/core/Box";
import DeserveIcon from "@material-ui/icons/EmojiEvents";
import DoPagination from "../../common/Pagination";
import HighlightIcon from "@material-ui/icons/Highlight";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import LoveIcon from "@material-ui/icons/Favorite";
import MinusOneIcon from "@material-ui/icons/ExposureNeg1Outlined";
import PlusOneIcon from "@material-ui/icons/ExposurePlus1";
import { Suspense } from "react";
import SvgIcon from "@material-ui/core/SvgIcon";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";
import { getActivities } from "../../../redux/actions/board";
import getPastTime from "../../../util/getPastTime";
import { useActivities } from "../../../redux/state/board";
import { useDispatch } from "react-redux";
import useMainStyles from "../../styles";
import { useParams } from "react-router-dom";
import useStyles from "../../styles";
import { getAvatar } from "../../../util/getAvatar";
// import { getRandomAvatarColor } from "../../../util/getRandomColor";

const ActivityList = () => {
  const dispatch = useDispatch();
  const { cursor } = useMainStyles();
  const { boardId } = useParams<{ boardId: string }>();
  const { activities, totalActivities } = useActivities();
  const {
    avatarStyle,
    breakText,
    userdelineStyle,
    nameStyle,
    actionStyle,
    highlightIconStyle,
    minusOneIconStyle,
    loveIconStyle,
    plusIconStyle,
    deserveIconStyle,
    customBadge,
    reactionStyle,
  } = useStyles();

  useEffect(() => {}, []);

  const loadActivities = (pageNo: number) => {
    dispatch(getActivities(boardId, "", pageNo, ACTIVITIES_PER_PAGE));
  };

  const handlePage = (page: number) => {
    loadActivities(page);
  };

  const getReactionIcon = (type: string) => {
    let iconStyle = "";
    let ReactionIcon = null;
    switch (type) {
      case "love":
        iconStyle = loveIconStyle;
        ReactionIcon = LoveIcon;
        break;
      case "minusOne":
        iconStyle = minusOneIconStyle;
        ReactionIcon = MinusOneIcon;
        break;
      case "plusOne":
        iconStyle = plusIconStyle;
        ReactionIcon = PlusOneIcon;
        break;
      case "highlight":
        iconStyle = highlightIconStyle;
        ReactionIcon = HighlightIcon;
        break;
      case "deserve":
        iconStyle = deserveIconStyle;
        ReactionIcon = DeserveIcon;
        break;
      default:
        break;
    }

    return (
      <Zoom in={true} timeout={1500}>
        <Tooltip arrow title={type}>
          <IconButton className={iconStyle} color="secondary" size="small">
            <SvgIcon
              component={ReactionIcon as any}
              className={reactionStyle}
            />
          </IconButton>
        </Tooltip>
      </Zoom>
    );
  };

  return (
    <Suspense fallback={<div></div>}>
      <Box>
        <List>
          {activities?.length
            ? activities?.map((activity: { [Key: string]: any }) => (
                <ListItem
                  alignItems="flex-start"
                  className={cursor}
                  disableGutters
                >
                  <ListItemAvatar style={{ minWidth: 40 }}>
                    <Badge
                      classes={{ badge: customBadge }}
                      overlap="circle"
                      badgeContent={
                        activity.action === "react" ||
                        activity.action === "un-react"
                          ? getReactionIcon(activity.type)
                          : null
                      }
                    >
                      {activity?.member?.avatarId ? (
                        <Avatar
                          className={`${avatarStyle}`}
                          src={getAvatar(activity?.member?.avatarId)}
                        ></Avatar>
                      ) : (
                        <Avatar
                          className={`${avatarStyle}`}
                          // style={{ background: getRandomAvatarColor() }}
                          color="primary"
                        >
                          <Typography variant="subtitle1" className={nameStyle}>
                            {getInitials(activity?.member?.name) || "TM"}
                          </Typography>
                        </Avatar>
                      )}
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box className={`${breakText}`}>
                        <Typography variant="subtitle1" className={nameStyle}>
                          {activity?.member?.name || "Team Member"}
                          <span className={actionStyle}>
                            {getActivityText(activity?.action)}
                          </span>
                          <span
                            className={` ${actionStyle} ${userdelineStyle}`}
                          >
                            {activity?.title}
                          </span>
                          <span className={actionStyle}>
                            &nbsp;{activity?.primaryAction}&nbsp;
                          </span>
                          <span
                            className={` ${actionStyle} ${userdelineStyle}`}
                          >
                            {activity?.primaryTitle}
                          </span>
                          <span className={actionStyle}>
                            &nbsp;{activity?.secondaryAction}&nbsp;
                          </span>
                          <span
                            className={` ${actionStyle} ${userdelineStyle}`}
                          >
                            {activity?.secondaryTitle}
                          </span>
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Typography variant="subtitle2">
                        {getPastTime(activity?.createdAt)}
                      </Typography>
                    }
                  />
                </ListItem>
              ))
            : null}
        </List>
      </Box>
      <Box mt={2} bottom="0" position="fixed">
        <DoPagination
          type="modal"
          handlePage={handlePage}
          totalCount={totalActivities}
          pageCount={ACTIVITIES_PER_PAGE}
        />
      </Box>
    </Suspense>
  );
};

export default ActivityList;
