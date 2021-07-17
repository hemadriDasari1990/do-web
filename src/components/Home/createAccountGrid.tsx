import Box from "@material-ui/core/Box";
import CreateAccount from "./create";
import DoImage from "../common/Image";
import Hidden from "@material-ui/core/Hidden";
import React from "react";
import Typography from "@material-ui/core/Typography";
import useStyles from "../styles";
import Grid from "@material-ui/core/Grid";

const CreateAccountGrid = () => {
  const { boxGridStyle, createAccountStyle } = useStyles();

  return (
    <Box className={boxGridStyle}>
      <Grid container spacing={2}>
        <Grid
          item
          xl={8}
          lg={8}
          md={6}
          sm={12}
          xs={12}
          className={createAccountStyle}
        >
          <Box mb={2}>
            <Typography variant="h1" color="secondary">
              Get started with Letsdoretro today
            </Typography>
          </Box>
          <Hidden only={["md", "sm", "xs"]}>
            <Typography color="secondary">
              Join thousands of agile teams and students who already enjoy our
              retrospective tool.
            </Typography>
          </Hidden>
          <Hidden only={["xl", "lg"]}>
            <Typography
              variant="body1"
              style={{ fontWeight: "normal" }}
              color="secondary"
            >
              Join thousands of agile teams and students who already enjoy our
              retrospective tool.
            </Typography>
          </Hidden>
          <Box mt={3}>
            <CreateAccount
              title="Sign up for free"
              subTitle="Free forever — no credit card required"
              subTitleColor="secondary"
              titleColor="primary"
            />
          </Box>
        </Grid>
        <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
          <Hidden only={["xs", "sm"]}>
            <DoImage
              src="good-team.svg"
              height="300px"
              width="300px"
              placeholderImg="good-team.svg"
              errorImg="good-team.svg"
            />
          </Hidden>
        </Grid>
      </Grid>

      {/* <Hidden only={["xs", "sm"]}>
          <DoImage
            src="team.svg"
            height="300px"
            width="300px"
            placeholderImg="team.svg"
            errorImg="team.svg"
          />
        </Hidden> */}
    </Box>
  );
};

export default CreateAccountGrid;
