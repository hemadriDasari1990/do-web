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
    width: 100,
    height: 100,
    // borderRadius: 6,
  },
  specialText: {
    fontSize: "1.25rem",
    letterSpacing: 0.3,
  },
  subTitleStyle: {
    fontSize: "1rem",
  },
});

function ProfileCardSecondary(props: any) {
  const { path, title, subTitle, fbPath, linkedinPath, button } = props;
  const { imageStyle, specialText, subTitleStyle } = useStyles(props);

  const handleButton = (path: string) => {
    const win: any = window.open(path, "_blank");
    win.focus();
  };

  return (
    <React.Fragment>
      <Box mb={2}>
        <Avatar src={path} className={imageStyle}></Avatar>
      </Box>
      <Box mb={0.3}>
        <Typography variant="h4" className={specialText}>
          {title}
        </Typography>
      </Box>
      <Box mb={1}>
        <Typography component="p" className={subTitleStyle}>
          {subTitle}
        </Typography>
      </Box>

      <Box display="flex" justifyContent="flex-start">
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
            <Box mt={-0.5} ml={1}>
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
