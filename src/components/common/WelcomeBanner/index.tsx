import { Theme, makeStyles } from "@material-ui/core/styles";
import { useUser, useUserSummary } from "../../../redux/state/user";

import ArrowForwardOutlinedIcon from "@material-ui/icons/ArrowForwardOutlined";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { PROJECTS } from "../../../routes/config";
import React from "react";
import SuperHero from "../../../assets/group-discussion.svg";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => ({
  bannerStyle: {
    backgroundColor: "#fff",
    borderRadius: 6,
    height: 280,
  },
  bannerHeaderStyle: {
    height: 60,
    background: "linear-gradient(180deg,#7997ff 0,#57f 100%)",
  },
}));

export default function WelcomeBanner(props: any) {
  const { name } = useUser();
  const { bannerStyle } = useStyles();
  const history = useHistory();
  const { summary } = useUserSummary();

  const viewProjects = () => {
    history.replace({
      pathname: PROJECTS,
      state: {},
    });
  };

  return (
    <>
      <Box display="flex" justifyContent="center" mb={-10}>
        <Zoom in={true} timeout={2000}>
          <img src={SuperHero} height="150px" width="fit-content" />
        </Zoom>
      </Box>
      <Box className={bannerStyle}>
        <Box p={2} pt={17}>
          <Box mb={1} textAlign="center">
            <Typography variant="h4">{name}</Typography>
          </Box>
          <Box mb={1} textAlign="center">
            <Typography variant="h6">
              Welcome to the brand new retro platform
            </Typography>
          </Box>

          <Box mt={3} textAlign="center">
            <Box>
              <Button
                variant="contained"
                color="primary"
                onClick={() => viewProjects()}
                endIcon={<ArrowForwardOutlinedIcon color="secondary" />}
              >
                <Typography variant="subtitle1" color="secondary">
                  {summary?.totalProjects ? "Goto Projects" : "Create Project"}
                </Typography>
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
