import Box from "@material-ui/core/Box";
// import FacebookIcon from "@material-ui/icons/Facebook";
import IconButton from "@material-ui/core/IconButton";
// import LinkedInIcon from "@material-ui/icons/LinkedIn";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";

const useStyles = makeStyles({
  subTitleStyle: {
    textTransform: "uppercase",
    fontSize: ".75rem",
  },
  imageStyle: {
    marginBottom: 12,
    verticalAlign: "bottom",
  },
});

function ProfileCard(props: any) {
  const { path, title, subTitle, fbPath, linkedinPath, button } = props;
  const { subTitleStyle, imageStyle } = useStyles();
  const history = useHistory();

  const handleButton = (path: string) => {
    history.push(path);
  };

  return (
    <React.Fragment>
      <Box>
        <img
          src={path}
          height="100%"
          width="300px"
          className={imageStyle}
          loading="lazy"
        />
      </Box>
      <Box mt={3}>
        <Box>
          <Typography gutterBottom variant="h2">
            {title}
          </Typography>
        </Box>
        <Typography gutterBottom variant="h5" className={subTitleStyle}>
          {subTitle}
        </Typography>
        {/* <Box>
          <Typography variant="body2">{tagLine}</Typography>
        </Box>
        <Box mt={2}>
          <Typography variant="h6">{content}</Typography>
        </Box> */}
      </Box>
      <Box>
        {button && (
          <Box display="flex">
            {/* <Typography component="h6" variant="h6">
              Social Profiles
            </Typography> */}
            <Box mt={-0.5} ml={5}>
              {fbPath && (
                <IconButton size="small" onClick={() => handleButton(fbPath)}>
                  {/* <FacebookIcon color="primary" /> */}
                </IconButton>
              )}
            </Box>
            <Box mt={-0.5} ml={2}>
              {linkedinPath && (
                <IconButton
                  size="small"
                  onClick={() => handleButton(linkedinPath)}
                >
                  {/* <LinkedInIcon color="primary" /> */}
                </IconButton>
              )}
            </Box>
          </Box>
        )}
      </Box>
    </React.Fragment>
  );
}

export default ProfileCard;
