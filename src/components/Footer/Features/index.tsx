import { Theme, makeStyles } from "@material-ui/core/styles";

import AddIcon from "../../../assets/add.svg";
import AnnonymousIcon from "../../../assets/annonymous.svg";
import BoardIcon from "../../../assets/board.svg";
import BoardSectionIcon from "../../../assets/board-section.png";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import DepartmentIcon from "../../../assets/department.svg";
import DragIcon from "../../../assets/drag.svg";
import Grid from "@material-ui/core/Grid";
import ProjectIcon from "../../../assets/project.svg";
import PublicDiscussionIcon from "../../../assets/public-discussion.svg";
import React from "react";
import ReactionsIcon from "../../../assets/reactions.svg";
import SecureLoginIcon from "../../../assets/secure-login.svg";
import TimeManagementIcon from "../../../assets/time-management.svg";
import Typography from "@material-ui/core/Typography";

const FeatureContent = React.lazy(() => import("./FeatureContent"));
const FeatureImage = React.lazy(() => import("./FeatureImage"));

const useStyles = makeStyles((theme: Theme) => ({
  titleSecondaryStyle: {
    fontSize: "2.5rem",
    lineHeight: 1.143,
    [theme.breakpoints.down("xs")]: {
      fontSize: 30,
    },
  },
}));

export default function Features() {
  const { titleSecondaryStyle } = useStyles();

  return (
    <React.Fragment>
      <Container>
        <Box>
          <Box>
            <Grid container spacing={2}>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Box textAlign="left">
                  <Typography variant="h1" className={titleSecondaryStyle}>
                    Features to help your team/group run restrospectives
                    differently
                  </Typography>
                  <Box mt={3}>
                    <Typography variant="h3">
                      Let's do retro is a free application. Yes! you heard it
                      right it's absolutely free to use.
                    </Typography>
                  </Box>
                  <Box mt={3}>
                    <Typography variant="h3">
                      The biggest difference is that its 100% free to use.
                      Powering a productive team means using a powerful tool
                      with great fun. From departments to projects to boards and
                      run boards, letdoretro’s intuitive features give any
                      team/group the ability to quickly set up and run
                      retrospectives.
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Box mt={3}>
              <Grid container spacing={2}>
                <FeatureContent
                  direction="right"
                  title="Create an User Account"
                  description="Create unlimited departments, projects, boards in one place under your user account"
                />
                <FeatureImage direction="left" image={BoardSectionIcon} />
              </Grid>
            </Box>
            <Box mt={3}>
              <Grid container spacing={2}>
                <FeatureImage direction="left" image={SecureLoginIcon} />
                <FeatureContent
                  direction="right"
                  title="Comeback and Login anytime"
                  description="You can login anytime with your user credentials and access everything."
                />
              </Grid>
            </Box>
            <Box mt={3}>
              <Grid container spacing={2}>
                <FeatureContent
                  direction="left"
                  title="Create a Department"
                  description="Create unlimited departments, manage individual departments or 100's at once"
                />
                <FeatureImage direction="right" image={DepartmentIcon} />
              </Grid>
            </Box>
            <Box mt={3}>
              <Grid container spacing={2}>
                <FeatureImage direction="left" image={ProjectIcon} />
                <FeatureContent
                  direction="right"
                  title="Create a Project"
                  description="Create unlimited prjects, manage individual projects or 100's at once with unlimited retro boards"
                />
              </Grid>
            </Box>
            <Box mt={3}>
              <Grid container spacing={2}>
                <FeatureContent
                  direction="left"
                  title="Create a retrospective board"
                  description="A retrospective board designed to keep you improving, just a single click and generate sections dynamically and express reactions on each note."
                />
                <FeatureImage direction="right" image={BoardIcon} />
              </Grid>
            </Box>
            <Box mt={3}>
              <Grid container spacing={2}>
                <FeatureImage direction="left" image={TimeManagementIcon} />
                <FeatureContent
                  direction="right"
                  title="Timebox the meeting"
                  description="A swiss timer to help you timebox your meetings, start or stop the timer anytime you want."
                />
              </Grid>
            </Box>
            <Box mt={3}>
              <Grid container spacing={2}>
                <FeatureContent
                  direction="left"
                  title="Add a note"
                  description="Collect thoughts, ideas and feedback as notes, with realtime update everything is instantly visible to everyone."
                />
                <FeatureImage direction="right" image={AddIcon} />
              </Grid>
            </Box>
            <Box mt={3}>
              <Grid container spacing={2}>
                <FeatureImage direction="left" image={ReactionsIcon} />
                <FeatureContent
                  direction="right"
                  title="Express reactions"
                  description="Let's do retro allows you to express different types of reactions on each note like I disagree, I love it, +1, +2 and Deserve. With this  make decisions democratically and improve along the way."
                />
              </Grid>
            </Box>
            <Box mt={3}>
              <Grid container spacing={2}>
                <FeatureContent
                  direction="left"
                  title="Run anonymous retrospectives"
                  description="Let them speak fearlessly: Collect feedback annonymously and see the magic of honest feedback."
                />
                <FeatureImage direction="right" image={AnnonymousIcon} />
              </Grid>
            </Box>
            <Box mt={3}>
              <Grid container spacing={2}>
                <FeatureImage direction="left" image={PublicDiscussionIcon} />
                <FeatureContent
                  direction="right"
                  title="Public or private"
                  description="Designed to give you flexibility and total control on what to share and with whom. Blazing fast performance for public boards even with 2000+ concurrent sessions."
                />
              </Grid>
            </Box>
            <Box mt={3}>
              <Grid container spacing={2}>
                <FeatureContent
                  direction="left"
                  title="Move notes across the board"
                  description="Drag and drop notes to merge them, move them across the board, your board your rules."
                />
                <FeatureImage direction="right" image={DragIcon} />
              </Grid>
            </Box>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}
