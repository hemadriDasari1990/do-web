import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import React from "react";
// import Tooltip from '@material-ui/core/Tooltip'
import Typography from "@material-ui/core/Typography";
import WelcomeImage from "../../../assets/online-discussion.svg";
import Zoom from "@material-ui/core/Zoom";
import { makeStyles } from "@material-ui/core/styles";
import { useUser } from "../../../redux/state/user";

const useStyles = makeStyles(() => ({
  boxStyle: {
    backgroundColor: "#fff",
    borderRadius: 10,
    boxShadow: "rgb(100 100 111 / 20%) 0px 7px 29px 0px",
  },
}));

const Banner = () => {
  const { boxStyle } = useStyles();

  /* Redux hooks */
  const { user } = useUser();

  return (
    <React.Fragment>
      <Box className={boxStyle}>
        <Grid container spacing={6}>
          <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
            <Box mt={4}>
              <Box>
                <Typography variant="h2" color="primary">
                  Hello, {user?.name}!
                </Typography>
              </Box>
              <Box mt={1}>
                <Typography variant="body2">{user?.description}</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
            <Box mt={-10} textAlign="center">
              <Zoom in={true} timeout={2000}>
                <img src={WelcomeImage} height="200px" width="fit-content" />
              </Zoom>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default Banner;
