import { Theme, makeStyles } from "@material-ui/core/styles";

import ActivityIcon from "../../../assets/board-activity.svg";
import AddNoteIcon from "../../../assets/add-note.svg";
import AnnonymousIcon from "../../../assets/annonymous.svg";
import BoardIcon from "../../../assets/board";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import ExportDataIcon from "../../../assets/export-data.svg";
import FeaturesOverview from "../../../assets/features-overview.svg";
import Grid from "@material-ui/core/Grid";
import JoinTeamIcon from "../../../assets/join-team.svg";
import PiechartIcon from "../../../assets/pie-chart.svg";
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
                  Start collaborating
                </Typography>
              </Box>
              <Box>
                <Typography
                  className={titleStyle}
                  variant="h1"
                  color="secondary"
                >
                  in less than
                </Typography>
              </Box>
              <Box mb={2}>
                <Typography
                  className={titleStyle}
                  variant="h1"
                  color="secondary"
                >
                  a minute...
                </Typography>
              </Box>
              <Box mb={5}>
                <Typography variant="body1" color="secondary">
                  Powering a productive team means using a powerful tool with
                  great fun. From projects to boards, adding section, notes and
                  reactions, letdoretro’s intuitive features give any team/group
                  the ability to quickly set up and run retrospectives.
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
          <Box mb={5} textAlign="center">
            <Typography variant="h1">
              Features to help your team succeed
            </Typography>
          </Box>
          <Grid container spacing={4}>
            <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
              <FeatureImage image={TeamIcon} />
              <FeatureContent
                title="Teams"
                description="Create teams and add/invite unlimited developers, managers, and team leaders to collaborate on the Letsdoretro boards"
              />
            </Grid>
            <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
              <FeatureImage image={JoinTeamIcon} />
              <FeatureContent
                title="Invite team members"
                description="Run your retrospectives with unlimited team members and empower your users."
              />
            </Grid>
            <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
              <FeatureImage image={ProjectIcon} />
              <FeatureContent
                title="Projects"
                description="Create unlimited projects, manage individual projects or 100's at once with unlimited retro boards."
              />
            </Grid>
            <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
              <Box textAlign="center">
                <Zoom in={true} timeout={2000}>
                  <BoardIcon
                    stickyNoteColor="#ffc800"
                    stickyNoteColor1="#fd7171"
                    stickyNoteColor2="#7b68ee"
                    stickyNoteColor3="#49ccf9"
                    stickyNoteColor4="#00b884"
                    hairColor="#2f2e41"
                    borderColor="#2f2e41"
                    primarySkinColor="#ffb8b8"
                    secondarySkinColor="#a0616a"
                    shoeColor="#2f2e41"
                    shirtColor="#cccccc"
                    cornerCircleColor="#cccccc"
                    width={281}
                    height={180}
                  />
                </Zoom>
              </Box>
              <FeatureContent
                title="Boards"
                description="Create unlimited retro boards with your dev team using our preconfigured templates or customize your own"
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
              <FeatureImage image={AddNoteIcon} />
              <FeatureContent
                title="Smart comment notes"
                description="Collect thoughts, ideas and feedback as notes, with realtime update everything is instantly visible to everyone."
              />
            </Grid>
            <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
              <FeatureImage image={ReactionsIcon} />
              <FeatureContent
                title="Reactions"
                description="Let's Do Retro allows you to express different types of reactions on each note like Agree, Love, Highlight, Deserve and Disagree. With this make decisions democratically and improve along the way."
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
                description="Designed to give you flexibility to change the board visibility at any time. Blazing fast performance for public boards even with 2000+ concurrent sessions."
              />
            </Grid>
            <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
              <Box textAlign="center">
                <Zoom in={true} timeout={2000}>
                  <BoardIcon
                    stickyNoteColor="#ffc800"
                    stickyNoteColor1="#fd7171"
                    stickyNoteColor2="#7b68ee"
                    stickyNoteColor3="#49ccf9"
                    stickyNoteColor4="#00b884"
                    hairColor="#2f2e41"
                    borderColor="#2f2e41"
                    primarySkinColor="#ffb8b8"
                    secondarySkinColor="#a0616a"
                    shoeColor="#2f2e41"
                    shirtColor="#cccccc"
                    cornerCircleColor="#cccccc"
                    width={281}
                    height={180}
                  />
                </Zoom>
              </Box>
              <FeatureContent
                title="Drag & Drop"
                description="Drag and drop notes to move them across the board, your board your rules."
              />
            </Grid>

            <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
              <FeatureImage image={ExportDataIcon} />
              <FeatureContent
                title="Export to Excel"
                description="Export any board to excel for external use, reporting, or presentation"
              />
            </Grid>
            <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
              <FeatureImage image={ActivityIcon} />
              <FeatureContent
                title="Activity on board"
                description="Reetro makes it possible for you to track all the activities on the board."
              />
            </Grid>
            <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
              <FeatureImage image={PiechartIcon} />
              <FeatureContent
                title="Reactions in Pie chart view"
                description="A summary of reactions of each note, section and board are visible in pie chart view"
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </React.Fragment>
  );
}
