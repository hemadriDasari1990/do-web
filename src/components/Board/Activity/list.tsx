import React, { useEffect } from "react";
import {
  useActivities,
  useActivitiesLoading,
} from "../../../redux/state/board";

import { ACTIVITIES_PER_PAGE } from "../../../util/constants";
import AgreeIcon from "@material-ui/icons/ExposurePlus1";
import { Avatar } from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import Box from "@material-ui/core/Box";
import DeserveIcon from "@material-ui/icons/EmojiEvents";
import DisagreeIcon from "@material-ui/icons/ExposureNeg1Outlined";
import DoPagination from "../../common/Pagination";
import HighlightIcon from "@material-ui/icons/Highlight";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Loader from "../../Loader/components";
import LoveIcon from "@material-ui/icons/Favorite";
import { Suspense } from "react";
import SvgIcon from "@material-ui/core/SvgIcon";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";
import { getActivities } from "../../../redux/actions/board";
import { getAvatar } from "../../../util/getAvatar";
import { getInitials } from "../../../util";
import getPastTime from "../../../util/getPastTime";
import { useDispatch } from "react-redux";
import useMainStyles from "../../styles";
import { useParams } from "react-router-dom";
import useStyles from "../../styles";

// import { getRandomAvatarColor } from "../../../util/getRandomColor";

const ActivityList = () => {
  const dispatch = useDispatch();
  const { cursor } = useMainStyles();
  const { boardId } = useParams<{ boardId: string }>();
  const { activities, totalActivities } = useActivities();
  const { loading } = useActivitiesLoading();
  const {
    avatarStyle,
    breakText,
    nameStyle,
    highlightIconStyle,
    disagreeIconStyle,
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
      case "disagree":
        iconStyle = disagreeIconStyle;
        ReactionIcon = DisagreeIcon;
        break;
      case "agree":
        iconStyle = plusIconStyle;
        ReactionIcon = AgreeIcon;
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
      <Loader enable={loading} />
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
                        [
                          "agree",
                          "highlight",
                          "disagree",
                          "love",
                          "deserve",
                        ].includes(activity.type)
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
                        <Typography variant="subtitle2">
                          <span className={nameStyle}>
                            {activity?.member?.name || "Team Member"}
                          </span>
                          <span
                            dangerouslySetInnerHTML={{
                              __html: activity?.message,
                            }}
                          ></span>
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Typography variant="body2">
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
