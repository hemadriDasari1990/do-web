import Box from "@material-ui/core/Box";
import CreateAccount from "./create";
import DoImage from "../common/Image";
import Hidden from "@material-ui/core/Hidden";
import React from "react";
import Typography from "@material-ui/core/Typography";
import useStyles from "../styles";

const CreateAccountGrid = () => {
  const { titleStyle } = useStyles();

  return (
    <Box textAlign="center" pb={3}>
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
          <Box mb={2}>
            <Typography variant="h1" className={titleStyle}>
              Get started with Letsdoretro today
            </Typography>
          </Box>
          <Hidden only={["md", "sm", "xs"]}>
            <Typography>
              Join thousands of agile teams and students who already enjoy our
              retrospective tool
            </Typography>
          </Hidden>
          <Hidden only={["xl", "lg"]}>
            <Typography variant="body1" style={{ fontWeight: "normal" }}>
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
