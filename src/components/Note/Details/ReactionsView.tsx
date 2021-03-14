import React, { Suspense, useEffect, useState } from "react";

import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import DeserveIcon from "@material-ui/icons/EmojiEvents";
import DisAgreeIcon from "@material-ui/icons/ThumbDownAlt";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LoveIcon from "@material-ui/icons/Favorite";
import NoRecords from "../../NoRecords";
import Plus2Icon from "@material-ui/icons/ExposurePlus2";
import PlusOneIcon from "@material-ui/icons/ExposurePlus1";
import SvgIcon from "@material-ui/core/SvgIcon";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";
// import getCreatedDate from "../../../util/getCreatedDate";
import getPastTime from "../../../util/getPastTime";
// import getRandomBGColor from "../../../util/getRandomColor";
// import formateNumber from "../../../util/formateNumber";
import { makeStyles } from "@material-ui/core/styles";
import useStyles from "../../styles";

const useLocalStyles = makeStyles(() => ({
  customBadge: {
    top: "90%",
    background: "unset",
    border: "unset",
  },
  avatarStyle: {
    width: 30,
    height: 30,
    backgroundColor: "#e8eef5",
  },
}));

const ReactionsView = (props: any) => {
  const { reactions } = props;
  const { customBadge, avatarStyle } = useLocalStyles();
  const {
    plusTwoIconStyle,
    disAgreeIconStyle,
    loveIconStyle,
    plusIconStyle,
    deserveIconStyle,
    reactionStyle,
  } = useStyles();

  const [newReactions, setNewReactions] = useState(reactions);

  const getReactionIcon = (type: string) => {
    let iconStyle = "";
    let ReactionIcon = LoveIcon;
    switch (type) {
      case "love":
        iconStyle = loveIconStyle;
        ReactionIcon = LoveIcon;
        break;
      case "disagree":
        iconStyle = disAgreeIconStyle;
        ReactionIcon = DisAgreeIcon;
        break;
      case "plusOne":
        iconStyle = plusIconStyle;
        ReactionIcon = PlusOneIcon;
        break;
      case "plusTwo":
        iconStyle = plusTwoIconStyle;
        ReactionIcon = Plus2Icon;
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
        <Tooltip title={type}>
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

  return (
    <Suspense fallback={<div />}>
      {!newReactions || !newReactions?.length ? (
        <NoRecords message="No Reactions found!" />
      ) : null}
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
                    <Avatar className={avatarStyle} />
                  </Badge>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <React.Fragment>
                      <Typography variant="h5">Team Member</Typography>
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
    </Suspense>
  );
};

export default ReactionsView;
