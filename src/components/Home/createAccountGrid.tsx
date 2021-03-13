import { Theme, makeStyles } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
import CreateAccount from "./create";
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
    <Box textAlign="center" p={5}>
      <Box>
        <Hidden only={["xl", "lg", "md"]}>
          <Typography variant="h1">
            Try Letsdoretro.com for your teams
          </Typography>
        </Hidden>
        <Hidden only={["sm", "xs"]}>
          <Typography variant="h1" className={titleStyle}>
            Try Letsdoretro.com for your teams
          </Typography>
        </Hidden>
      </Box>
      <Box py={3}>
        <Typography variant="h3">
          It's absolutely free to use. Get started from here
        </Typography>
      </Box>
      <Box>
        <CreateAccount />
      </Box>
    </Box>
  );
};

export default CreateAccountGrid;
