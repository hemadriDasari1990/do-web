import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import DisLikeIcon from "@material-ui/icons/ThumbDownAlt";
import Grid from "@material-ui/core/Grid";
import LikeIcon from "@material-ui/icons/ThumbUpAlt";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import PersonIcon from "@material-ui/icons/Person";
import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { getRandomColor } from "../../util/getRandomColor";
import useStyles from "../styles";

function FeedbackList(props: any) {
  const { feedbacks, color } = props;
  const { customBadge } = useStyles();

  return (
    <>
      <List>
        <Grid container spacing={2}>
          {Array.isArray(feedbacks) &&
            feedbacks.map((feedback: { [Key: string]: any }, index: number) => (
              <Grid key={feedback._id} item xl={4} lg={4} md={4} sm={6} xs={12}>
                <ListItem
                  alignItems="flex-start"
                  className="b-r-15 cursor mb-10"
                >
                  <ListItemAvatar>
                    <Badge
                      classes={{ badge: customBadge }}
                      overlap="circle"
                      badgeContent={
                        feedback.like ? (
                          <Tooltip arrow title="Likes the tool">
                            <LikeIcon style={{ color: "#ffc800" }} />
                          </Tooltip>
                        ) : (
                          <Tooltip arrow title="DisLike the tool">
                            <DisLikeIcon />
                          </Tooltip>
                        )
                      }
                    >
                      <Avatar style={{ background: getRandomColor(index) }}>
                        <PersonIcon color="secondary" />
                      </Avatar>
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography
                        component="span"
                        variant="body1"
                        color={color}
                      >
                        {feedback.user?.name}{" "}
                      </Typography>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          color={color}
                        >
                          {feedback.title}&nbsp;- &nbsp;{feedback.description}
                        </Typography>{" "}
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </Grid>
            ))}
        </Grid>
      </List>
    </>
  );
}

export default FeedbackList;
