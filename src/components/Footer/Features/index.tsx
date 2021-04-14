import { Theme, makeStyles } from "@material-ui/core/styles";

import AddIcon from "../../../assets/add.svg";
import AddMemberIcon from "../../../assets/add-member.svg";
import AnnonymousIcon from "../../../assets/annonymous.svg";
import BoardIcon from "../../../assets/board.svg";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import DragIcon from "../../../assets/drag.svg";
import FeaturesOverview from "../../../assets/features-overview.svg";
import Grid from "@material-ui/core/Grid";
import JoinTeamIcon from "../../../assets/join-team.svg";
import ProjectIcon from "../../../assets/department.svg";
import PublicDiscussionIcon from "../../../assets/public-discussion.svg";
import React from "react";
import ReactionsIcon from "../../../assets/reactions.svg";
import TeamIcon from "../../../assets/team.svg";
import TimeManagementIcon from "../../../assets/time-management.svg";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";
import useStyles from "../../styles";

const FeatureContent = React.lazy(() => import("./FeatureContent"));
const FeatureImage = React.lazy(() => import("./FeatureImage"));

const useLocalStyles = makeStyles((theme: Theme) => ({
  imageStyle: {
    height: 270,
    [theme.breakpoints.down("xs")]: {
      height: 230,
      textAlign: "center",
      marginLeft: 0,
    },
  },
}));

export default function Features() {
  const { imageStyle } = useLocalStyles();
  const { titleStyle, bannerStyle } = useStyles();

  return (
    <React.Fragment>
      <Box py={3} className={bannerStyle}>
        <Container>
          <Grid container spacing={2}>
            <Grid item xl={8} lg={8} md={8} sm={12} xs={12}>
              <Box>
                <Typography
                  className={titleStyle}
                  variant="h1"
                  color="secondary"
                >
                  Features to help
                </Typography>
              </Box>
              <Box>
                <Typography
                  className={titleStyle}
                  variant="h1"
                  color="secondary"
                >
                  Your team/group run
                </Typography>
              </Box>
              <Box mb={2}>
                <Typography
                  className={titleStyle}
                  variant="h1"
                  color="secondary"
                >
                  Restrospectives differently
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" color="secondary">
                  Let's do retro is a free application. Yes! you heard it right
                  it's absolutely free to use.
                </Typography>
              </Box>
              <Box mb={5}>
                <Typography variant="body1" color="secondary">
                  The biggest difference is that its 100% free to use. Powering
                  a productive team means using a powerful tool with great fun.
                  From departments to projects to boards and run boards,
                  letdoretro’s intuitive features give any team/group the
                  ability to quickly set up and run retrospectives.
                </Typography>
              </Box>
            </Grid>
            <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
              <Box>
                <Zoom in={true} timeout={2000}>
                  <img
                    src={FeaturesOverview}
                    className={imageStyle}
                    width="fit-content"
                  />
                </Zoom>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box py={5}>
        <Container>
          <Grid container spacing={4}>
            <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
              <FeatureImage image={TeamIcon} />
              <FeatureContent
                title="Create Team"
                description="Create unlimited prjects, manage individual projects or 100's at once with unlimited retro boards"
              />
            </Grid>
            <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
              <FeatureImage image={AddMemberIcon} />
              <FeatureContent
                title="Create Members"
                description="Create unlimited prjects, manage individual projects or 100's at once with unlimited retro boards"
              />
            </Grid>
            <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
              <FeatureImage image={JoinTeamIcon} />
              <FeatureContent
                title="Add Members to the team"
                description="Create unlimited prjects, manage individual projects or 100's at once with unlimited retro boards"
              />
            </Grid>

            <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
              <FeatureImage image={ProjectIcon} />
              <FeatureContent
                title="Create a Project"
                description="Create unlimited prjects, manage individual projects or 100's at once with unlimited retro boards"
              />
            </Grid>
            <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
              <FeatureImage image={BoardIcon} />
              <FeatureContent
                title="Create a retrospective board"
                description="A retrospective board designed to keep you improving, just a single click and generate sections dynamically and express reactions on each note."
              />
            </Grid>
            <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
              <FeatureImage image={TimeManagementIcon} />
              <FeatureContent
                title="Timebox the meeting"
                description="A swiss timer to help you timebox your meetings, start or stop the timer anytime you want."
              />
            </Grid>
            <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
              <FeatureImage image={AddIcon} />
              <FeatureContent
                title="Add a note"
                description="Collect thoughts, ideas and feedback as notes, with realtime update everything is instantly visible to everyone."
              />
            </Grid>
            <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
              <FeatureImage image={ReactionsIcon} />
              <FeatureContent
                title="Express reactions"
                description="Let's do retro allows you to express different types of reactions on each note like -1, I love it, +1, +2 and Deserve. With this  make decisions democratically and improve along the way."
              />
            </Grid>
            <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
              <FeatureImage image={AnnonymousIcon} />
              <FeatureContent
                title="Run anonymous retrospectives"
                description="Let them speak fearlessly: Collect feedback annonymously and see the magic of honest feedback."
              />
            </Grid>
            <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
              <FeatureImage image={PublicDiscussionIcon} />
              <FeatureContent
                title="Public or private"
                description="Designed to give you flexibility and total control on what to share and with whom. Blazing fast performance for public boards even with 2000+ concurrent sessions."
              />
            </Grid>
            <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
              <FeatureImage image={DragIcon} />
              <FeatureContent
                title="Move notes across the board"
                description="Drag and drop notes to merge them, move them across the board, your board your rules."
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </React.Fragment>
  );
}
