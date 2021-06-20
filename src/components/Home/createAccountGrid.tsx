import { Theme, makeStyles } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
import CreateAccount from "./create";
import DoImage from "../common/Image";
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
        <DoImage
          src="good-team.svg"
          height="300px"
          width="300px"
          placeholderImg="good-team.svg"
          errorImg="good-team.svg"
        />
        <Box mt="3%">
          <Box>
            <Hidden only={["md", "sm", "xs"]}>
              <Typography variant="h1" className={titleStyle}>
                Get started with Let's Do Retro today
              </Typography>
            </Hidden>
            <Hidden only={["xl", "lg"]}>
              <Typography variant="h2">
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
        <DoImage
          src="team.svg"
          height="300px"
          width="300px"
          placeholderImg="team.svg"
          errorImg="team.svg"
        />
      </Box>
    </Box>
  );
};

export default CreateAccountGrid;
