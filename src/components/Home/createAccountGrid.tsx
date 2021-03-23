import { Theme, makeStyles } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
import CreateAccount from "./create";
import Hidden from "@material-ui/core/Hidden";
import React from "react";
import Typography from "@material-ui/core/Typography";
import CreateNewTeam from "../../assets/team.svg";
import GoodTeam from "../../assets/good-team.svg";

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
        <img src={GoodTeam} height="400px" width="300px" />
        <Box>
          <Box>
            <Hidden only={["xl", "lg", "md"]}>
              <Typography variant="h1">
                Try Letsdoretro.com for your teams
              </Typography>
            </Hidden>
            <Hidden only={["sm", "xs"]}>
              <Typography variant="h1" className={titleStyle}>
                Try letsdoretro.com for your teams
              </Typography>
            </Hidden>
          </Box>
          <Box py={3}>
            <Typography variant="h3">
              It's absolutely free to use. Get started from here
            </Typography>
          </Box>
          <Box>
            <CreateAccount title="Get Started" />
          </Box>
        </Box>
        <img src={CreateNewTeam} height="400px" width="300px" />
      </Box>
    </Box>
  );
};

export default CreateAccountGrid;
