import React, { useEffect } from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import FlightTakeoffOutlinedIcon from "@material-ui/icons/FlightTakeoffOutlined";
import Grid from "@material-ui/core/Grid";
import GroupAddOutlinedIcon from "@material-ui/icons/GroupAddOutlined";
import Hidden from "@material-ui/core/Hidden";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import ProjectOutlinedIcon from "@material-ui/icons/AccountTreeOutlined";
import Step from "./step";
import StepItem from "./stepItem";
import Typography from "@material-ui/core/Typography";
import { getRandomColor } from "../../util/getRandomColor";
import useStyles from "../styles";

const useLocalStyles = makeStyles((theme: Theme) => ({}));

const Process = () => {
  const {} = useLocalStyles();
  const { dotBannerStyle, titleStyle } = useStyles();

  useEffect(() => {}, []);

  return (
    <Box>
      <Container>
        <Hidden only={["xs", "sm"]}>
          <Box my={5}>
            <Typography variant="h1" className={titleStyle}>
              Our 5 step process.
            </Typography>
          </Box>
        </Hidden>
        <Hidden only={["xl", "lg", "md"]}>
          <Box my={3} textAlign="center">
            <Typography variant="h2">Our 5 step process.</Typography>
          </Box>
        </Hidden>
      </Container>
      <Box className={dotBannerStyle}>
        <Container>
          <Grid container spacing={2}>
            <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
              <Step
                title="01."
                subTitle="Create a Team"
                description="Create your team so that you can invite them while creating a board."
                index={0}
                icon={
                  <GroupAddOutlinedIcon style={{ color: getRandomColor(0) }} />
                }
              />
            </Grid>
            <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
              <Step
                title="02."
                subTitle="Create Members"
                description="They are individual team members."
                index={1}
                icon={
                  <PersonOutlineOutlinedIcon
                    style={{ color: getRandomColor(1) }}
                  />
                }
              />
            </Grid>
            <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
              <Step
                title="03."
                subTitle="Add members"
                description="Add members to the team with a click."
                index={2}
                icon={
                  <PersonAddOutlinedIcon style={{ color: getRandomColor(2) }} />
                }
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xl={1} lg={1} md={1} sm={6} xs={12}></Grid>
            <Grid item xl={3} lg={3} md={3} sm={6} xs={12}>
              <Step
                title="04."
                subTitle="Create a Project"
                description="Create project and add boards to the project."
                index={3}
                icon={
                  <ProjectOutlinedIcon style={{ color: getRandomColor(3) }} />
                }
              />
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={6} xs={12}>
              <Step
                title="05."
                subTitle="Launch Retro"
                description="Launch quick retro with just few clicks."
                index={4}
                icon={
                  <FlightTakeoffOutlinedIcon
                    style={{ color: getRandomColor(4) }}
                  />
                }
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Container>
        <StepItem />
      </Container>
    </Box>
  );
};

export default Process;
