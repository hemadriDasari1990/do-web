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
        <Hidden only={["xs", "sm"]}>
          <DoImage
            src="good-team.svg"
            height="300px"
            width="300px"
            placeholderImg="good-team.svg"
            errorImg="good-team.svg"
          />
        </Hidden>
        <Box mt="3%">
          <Box>
            <Hidden only={["md", "sm", "xs"]}>
              <Typography variant="h1" className={titleStyle}>
                Get started with Letsdoretro today
              </Typography>
            </Hidden>
            <Hidden only={["xl", "lg", "sm", "xs"]}>
              <Typography variant="h1">
                Get started with Letsdoretro today
              </Typography>
            </Hidden>
          </Box>
          <Hidden only={["md", "sm", "xs"]}>
            <Typography>
              Join thousands of agile teams and students who already enjoy our
              retrospective tool
            </Typography>
          </Hidden>
          <Hidden only={["xl", "lg"]}>
            <Typography variant="body2">
              Join thousands of agile teams and students who already enjoy our
              retrospective tool
            </Typography>
          </Hidden>
          <Box mt={3}>
            <CreateAccount
              title="Sign up for free"
              subTitle="Free forever — no credit card required"
            />
          </Box>
        </Box>
        <Hidden only={["xs", "sm"]}>
          <DoImage
            src="team.svg"
            height="300px"
            width="300px"
            placeholderImg="team.svg"
            errorImg="team.svg"
          />
        </Hidden>
      </Box>
    </Box>
  );
};

export default CreateAccountGrid;
