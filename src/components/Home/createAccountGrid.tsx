import { Theme, makeStyles } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
import CreateAccount from "./create";
import CreateNewTeam from "../../assets/team.svg";
import GoodTeam from "../../assets/good-team.svg";
import Hidden from "@material-ui/core/Hidden";
import React from "react";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) => ({
  titleStyle: {
    fontSize: "3.5rem",
  },
}));

const CreateAccountGrid = () => {
  const { titleStyle } = useStyles();

  return (
    <Box textAlign="center">
      <Box display="flex" justifyContent="space-between">
        <img src={GoodTeam} height="300px" width="300px" />
        <Box mt="3%">
          <Box>
            <Hidden only={["xl", "lg", "md"]}>
              <Typography variant="h1">
                Get started with Let's Do Retro today
              </Typography>
            </Hidden>
            <Hidden only={["sm", "xs"]}>
              <Typography variant="h1" className={titleStyle}>
                Get started with Let's Do Retro today
              </Typography>
            </Hidden>
          </Box>
          <Box>
            <Typography>
              Join thousands of agile teams and students who already enjoy our
              retrospective tool
            </Typography>
          </Box>
          <Box mt={3}>
            <CreateAccount
              title="Sign up for free"
              subTitle="Free forever — no credit card required"
            />
          </Box>
        </Box>
        <img src={CreateNewTeam} height="300px" width="300px" />
      </Box>
    </Box>
  );
};

export default CreateAccountGrid;
