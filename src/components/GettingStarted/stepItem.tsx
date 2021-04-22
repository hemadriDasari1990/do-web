import React, { useEffect } from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import SubStepItem from "./subStepItem";
import { Typography } from "@material-ui/core";
import useStyles from "../styles";

const useLocalStyles = makeStyles((theme: Theme) => ({}));

const StepItem = (props: any) => {
  const {} = props;
  const {} = useLocalStyles();
  const { titleStyle } = useStyles();
  useEffect(() => {}, []);

  return (
    <Box mt={5}>
      <Grid container spacing={6}>
        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
          <Box>
            <Typography variant="h3">
              Some things about creating a team:
            </Typography>
          </Box>
          <SubStepItem
            items={[
              {
                step: "01",
                index: 0,
                title: "Goto Dashboard",
              },
              {
                step: "02",
                index: 1,
                title: "Click on manage teams icon on the left side navbar",
              },
              {
                step: "03",
                index: 2,
                title: "Click on Create New Team button under Teams tab",
              },
              {
                step: "04",
                index: 3,
                title: "A dialog will open",
              },
              {
                step: "05",
                index: 4,
                title: "Enter your team name",
              },
              {
                step: "06",
                index: 5,
                title: "Enter description about the team",
              },
              {
                step: "07",
                index: 6,
                title: "Click on Save button",
              },
            ]}
          />
        </Grid>
        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
          <Box my={7}>
            <Typography variant="h1" className={titleStyle}>
              Steps to create a Team
            </Typography>
          </Box>
          <Box mt={5}>
            <Typography variant="h5">
              A team is a group of individual members working together to
              understand what worked and what didn't. The team collaborates
              effectively, understand, improve and do things better.
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={6}>
        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
          <Box my={7}>
            <Typography variant="h1" className={titleStyle}>
              Steps to create members
            </Typography>
          </Box>
          <Box mt={5}>
            <Typography variant="h5">
              Team members help their team acheive a common goal. Participating
              in meetings and voicing concerns as well as suggestions for
              improvement. Maintaining a high level of professionalism while
              representing the team.
            </Typography>
          </Box>
        </Grid>
        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
          <Box>
            <Typography variant="h3">
              Some things about creating members:
            </Typography>
          </Box>
          <SubStepItem
            items={[
              {
                step: "01",
                index: 0,
                title: "Click on Members tab",
              },
              {
                step: "02",
                index: 1,
                title: "Click on Create New Member button",
              },
              {
                step: "03",
                index: 2,
                title: "Enter member full name",
              },
              {
                step: "04",
                index: 3,
                title: "PEnter member email address",
              },
              {
                step: "05",
                index: 4,
                title: "Click on Save button",
              },
              {
                step: "06",
                index: 5,
                title: "Repeat from step 2 to create more members",
              },
            ]}
          />
        </Grid>
      </Grid>
      <Grid container spacing={6}>
        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
          <Box>
            <Typography variant="h3">
              Some things about adding members to the team:
            </Typography>
          </Box>
          <SubStepItem
            items={[
              {
                step: "01",
                index: 0,
                title: "Switch to teams tab",
              },
              {
                step: "02",
                index: 1,
                title: "Take a look at the table displayed",
              },
              {
                step: "03",
                index: 2,
                title: "Click on Add Member icon displayed under actions",
              },
              {
                step: "04",
                index: 3,
                title: "Click on member avatar to add",
              },
              {
                step: "05",
                index: 4,
                title: "Click on the same icon if you would like to remove",
              },
            ]}
          />
        </Grid>
        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
          <Box my={7}>
            <Typography variant="h1" className={titleStyle}>
              Steps to add members to the team
            </Typography>
          </Box>
          <Box mt={5}>
            <Typography variant="h5">
              Adding members to the team is very easy, all it requires is just a
              click:)
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={6}>
        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
          <Box my={7}>
            <Typography variant="h1" className={titleStyle}>
              Steps to create a Project
            </Typography>
          </Box>
          <Box mt={5}>
            <Box mb={2}>
              <Typography variant="h3">
                This is optional step if you are starting quick retro from
                dashbaord.
              </Typography>
            </Box>

            <Typography variant="h5">
              A project is any undertaking, carried out individually or
              collaboratively and possibly involving research or design, that is
              carefully planned to achieve a particular aim. Projects help us
              make desired changes in an organized manner and with reduced
              probability of failure.
            </Typography>
          </Box>
        </Grid>
        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
          <Box>
            <Typography variant="h3">
              Some things about creating a project:
            </Typography>
          </Box>
          <SubStepItem
            items={[
              {
                step: "01",
                index: 0,
                title: "Got to Dashboard",
              },
              {
                step: "02",
                index: 1,
                title: "Click on Goto Projects",
              },
              {
                step: "03",
                index: 2,
                title: "Click on Create New Project button",
              },
              {
                step: "04",
                index: 3,
                title: "A dialog will open",
              },
              {
                step: "05",
                index: 4,
                title: "Enter project name",
              },
              {
                step: "06",
                index: 5,
                title: "Enter project description",
              },
              {
                step: "07",
                index: 0,
                title: "Click on Save button",
              },
            ]}
          />
        </Grid>
      </Grid>
      <Grid container spacing={6}>
        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
          <Box>
            <Typography variant="h3">
              Some things about starting quick retro:
            </Typography>
          </Box>
          <SubStepItem
            items={[
              {
                step: "01",
                index: 0,
                title: "Goto Dashboard",
              },
              {
                step: "02",
                index: 1,
                title:
                  "Look for Start quick retro section on the top right side",
              },
              {
                step: "03",
                index: 2,
                title: "Select/Add project name",
              },
              {
                step: "04",
                index: 3,
                title: "Enter Project description (Optional step)",
              },
              {
                step: "05",
                index: 4,
                title: "Board name will be auto generated",
              },
              {
                step: "06",
                index: 5,
                title: "Enter no of sections or choose step 7",
              },
              {
                step: "07",
                index: 0,
                title: "Click on create default board",
              },
              {
                step: "08",
                index: 1,
                title: "Enter description about board",
              },
              {
                step: "09",
                index: 2,
                title: "Select one/more teams from dropdown",
              },
              {
                step: "10",
                index: 3,
                title: "Click on Start Retro button",
              },
            ]}
          />
        </Grid>
        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
          <Box my={7}>
            <Typography variant="h1" className={titleStyle}>
              Steps to launch quick retro
            </Typography>
          </Box>
          <Box mt={5}>
            <Typography variant="h5">
              A quick retro is designed to start retrospective session instantly
              with just a few clicks. All it takes is less than 30 seconds with
              5 clicks to start the retro session.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StepItem;
