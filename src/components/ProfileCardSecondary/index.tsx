import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import FacebookIcon from "@material-ui/icons/Facebook";
import IconButton from "@material-ui/core/IconButton";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  imageStyle: {
    verticalAlign: "bottom",
    width: 120,
    height: 120,
    // borderRadius: 6,
  },
  specialText: {
    fontSize: 26,
    letterSpacing: -1,
  },
});

function ProfileCardSecondary(props: any) {
  const { path, title, subTitle, fbPath, linkedinPath, button } = props;
  const { imageStyle, specialText } = useStyles(props);

  const handleButton = (path: string) => {
    const win: any = window.open(path, "_blank");
    win.focus();
  };

  return (
    <React.Fragment>
      <Box display="flex" justifyContent="center">
        <Avatar src={path} className={imageStyle}></Avatar>
      </Box>
      <Box mt={1} textAlign="center">
        <Box mb={0.3}>
          <Typography gutterBottom variant="h3" className={specialText}>
            {title}
          </Typography>
        </Box>
        <Typography gutterBottom component="p">
          {subTitle}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center">
        {button && (
          <Box display="flex" mt={1}>
            <Typography component="h6" variant="h6">
              Social Profiles
            </Typography>
            <Box mt={-0.5} ml={2}>
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
