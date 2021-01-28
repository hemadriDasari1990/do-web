import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import LikeIcon from '@material-ui/icons/ThumbUpAlt'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import PersonIcon from '@material-ui/icons/Person';
import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'

function FeedbackList(props: any) {
    const { feedbacks } = props;
    return (
      <>
        <List>
          <Grid container spacing={2}>
            {Array.isArray(feedbacks) &&
              feedbacks.map((feedback: {[Key: string]: any}) => (
                <Grid
                  key={feedback._id}
                  item
                  xl={4} lg={4} md={6} sm={6} xs={12} 
                >
                  <ListItem
                    alignItems="flex-start"
                    className="b-r-15 cursor mb-10"
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <PersonIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={feedback.title}
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            color="textPrimary"
                          >
                            {feedback.description}
                          </Typography>{' '}
                        </React.Fragment>
                      }
                    />
                    <ListItemSecondaryAction>
                      {feedback.like ? (
                        <Tooltip title="Likes the tool">
                          <LikeIcon color="primary" />
                        </Tooltip>
                      ) : null}
                    </ListItemSecondaryAction>
                  </ListItem>
                </Grid>
              ))}
          </Grid>
        </List>
      </>
    )
  }

export default FeedbackList;
