import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import FacebookIcon from "@material-ui/icons/Facebook";
import IconButton from "@material-ui/core/IconButton";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { getRandomColor } from "../../util/getRandomColor";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";
const useStyles = makeStyles({
  subTitleStyle: (props: any) => ({
    textTransform: "uppercase",
    color: getRandomColor(props.index),
  }),
  imageStyle: {
    verticalAlign: "bottom",
    width: 150,
    height: 150,
    borderRadius: 6,
  },
});

function ProfileCardSecondary(props: any) {
  const { path, title, subTitle, fbPath, linkedinPath, button } = props;
  const { subTitleStyle, imageStyle } = useStyles(props);
  const history = useHistory();

  const handleButton = (path: string) => {
    history.push(path);
  };

  return (
    <React.Fragment>
      <Box>
        <Avatar src={path} className={imageStyle}></Avatar>
      </Box>
      <Box mt={3}>
        <Box mb={2}>
          <Typography gutterBottom variant="h2">
            {title}
          </Typography>
        </Box>
        <Typography gutterBottom variant="h5" className={subTitleStyle}>
          {subTitle}
        </Typography>
      </Box>
      <Box>
        {button && (
          <Box display="flex" mt={2}>
            <Typography component="h6" variant="h6">
              Social Profiles
            </Typography>
            <Box mt={-0.5} ml={5}>
              {fbPath && (
                <IconButton size="small" onClick={() => handleButton(fbPath)}>
                  <FacebookIcon color="primary" />
                </IconButton>
              )}
            </Box>
            <Box mt={-0.5} ml={2}>
              {linkedinPath && (
                <IconButton
                  size="small"
                  onClick={() => handleButton(linkedinPath)}
                >
                  <LinkedInIcon color="primary" />
                </IconButton>
              )}
            </Box>
          </Box>
        )}
      </Box>
    </React.Fragment>
  );
}

export default ProfileCardSecondary;
