import { Suspense, useEffect, useState } from "react";
import { useLoading, useReactions } from "../../../redux/state/reaction";

import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import Box from "@material-ui/core/Box";
import DeserveIcon from "@material-ui/icons/EmojiEvents";
import DoPagination from "../../common/Pagination";
import Grid from "@material-ui/core/Grid";
import HighlightIcon from "@material-ui/icons/Highlight";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Loader from "../../Loader/components";
import LoveIcon from "@material-ui/icons/Favorite";
import MinusOneIcon from "@material-ui/icons/ExposureNeg1Outlined";
import NoRecords from "../../NoRecords";
import PlusOneIcon from "@material-ui/icons/ExposurePlus1";
import { REACTIONS_PER_PAGE } from "../../../util/constants";
import React from "react";
import SvgIcon from "@material-ui/core/SvgIcon";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";
import { getAvatar } from "../../../util/getAvatar";
import getPastTime from "../../../util/getPastTime";
import { getReactions } from "../../../redux/actions/reaction";
import { useDispatch } from "react-redux";
import useStyles from "../../styles";

const ReactionsView = React.memo((props: any) => {
  const { note } = props;
  const {
    highlightIconStyle,
    minusOneIconStyle,
    loveIconStyle,
    plusIconStyle,
    deserveIconStyle,
    reactionStyle,
    avatarStyle,
    customBadge,
  } = useStyles();

  const dispatch = useDispatch();
  const { reactions, totalReactions } = useReactions();
  const { loading } = useLoading();
  const [newReactions, setNewReactions] = useState([]);
  const [page, setPage] = useState<number>(0);

  const getReactionIcon = (type: string) => {
    let iconStyle = "";
    let ReactionIcon = LoveIcon;
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
            <SvgIcon component={ReactionIcon} className={reactionStyle} />
          </IconButton>
        </Tooltip>
      </Zoom>
    );
  };

  useEffect(() => {
    setNewReactions(reactions);
  }, [reactions]);

  useEffect(() => {
    loadReactions(page);
  }, []);

  const loadReactions = (pageNo: number) => {
    dispatch(getReactions(note?._id, pageNo, REACTIONS_PER_PAGE));
  };

  const handlePage = (page: number) => {
    setPage(page);
    loadReactions(page);
  };

  return (
    <Suspense fallback={<div />}>
      {!newReactions || !newReactions?.length ? (
        <NoRecords message="No Reactions found!" hideImage={true} />
      ) : null}
      <Loader enable={loading} backdrop={true} />
      <List disablePadding>
        <Grid container spacing={2}>
          {newReactions?.map((reaction: { [Key: string]: any }) => (
            <Grid item xl={4} lg={4} md={4} sm={4} xs={12} key={reaction._id}>
              <ListItem disableGutters>
                <ListItemIcon>
                  <Badge
                    classes={{ badge: customBadge }}
                    overlap="circle"
                    badgeContent={getReactionIcon(reaction.type)}
                  >
                    {reaction?.reactedBy?.avatarId ? (
                      <Avatar
                        src={getAvatar(reaction?.reactedBy?.avatarId)}
                        className={avatarStyle}
                      ></Avatar>
                    ) : (
                      <Avatar className={`${avatarStyle}`} color="primary">
                        {reaction?.reactedBy?.name ? (
                          <Typography variant="h5">
                            {reaction?.reactedBy?.name.substring(0, 1)}
                          </Typography>
                        ) : null}
                      </Avatar>
                    )}
                  </Badge>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <React.Fragment>
                      <Typography variant="h5">
                        {reaction?.reactedBy?.name || "Team Member"}
                      </Typography>
                    </React.Fragment>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography component="span" variant="body2">
                        {getPastTime(reaction.createdAt)}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
            </Grid>
          ))}
        </Grid>
      </List>
      <Box mt={2} display="flex" justifyContent="center">
        <DoPagination
          type="modal"
          handlePage={handlePage}
          totalCount={totalReactions}
          pageCount={REACTIONS_PER_PAGE}
        />
      </Box>
    </Suspense>
  );
});

export default ReactionsView;
