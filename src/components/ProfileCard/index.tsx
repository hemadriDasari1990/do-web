import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import FacebookIcon from "@material-ui/icons/Facebook";
import IconButton from "@material-ui/core/IconButton";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  media: {
    height: 80,
    width: 80,
    float: "right",
  },
  actions: {},
  actionAreaStyle: {
    // background: "#f4f5f7",
  },
});

function ProfileCard(props: any) {
  const {
    path,
    title,
    subTitle,
    fbPath,
    linkedinPath,
    content,
    button,
    tagLine,
  } = props;
  const { media, actions, actionAreaStyle } = useStyles();

  const handleButton = (path: string) => {
    // history.push(path)
  };
  return (
    <React.Fragment>
      <Card>
        <CardActionArea className={actionAreaStyle}>
          <Box pt={1} pr={1}>
            <Avatar alt={title} src={path} className={media} />
          </Box>
          <CardContent>
            <Box>
              <Typography gutterBottom variant="h2" color="primary">
                {title}
              </Typography>
            </Box>
            <Typography gutterBottom variant="h5">
              {subTitle}
            </Typography>
            <Box>
              <Typography variant="body2">{tagLine}</Typography>
            </Box>
            <Box mt={2}>
              <Typography variant="h6">{content}</Typography>
            </Box>
          </CardContent>
        </CardActionArea>
        {button && (
          <CardActions className={actions}>
            <Box>
              <Typography component="h6" variant="h6">
                Social Profiles
              </Typography>
            </Box>
            <Box>
              {fbPath && (
                <IconButton onClick={() => handleButton(fbPath)}>
                  <FacebookIcon color="primary" />
                </IconButton>
              )}
              {linkedinPath && (
                <IconButton onClick={() => handleButton(linkedinPath)}>
                  <LinkedInIcon color="primary" />
                </IconButton>
              )}
            </Box>
          </CardActions>
        )}
      </Card>
    </React.Fragment>
  );
}

export default ProfileCard;
