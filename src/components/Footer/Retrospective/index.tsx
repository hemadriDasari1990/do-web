import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import ScrumBoard from "../../../assets/board.svg";
import Zoom from "@material-ui/core/Zoom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DoneOutlinedIcon from "@material-ui/icons/DoneOutlined";
const SideNote = React.lazy(() => import("../../common/SideNote"));
const Caption = React.lazy(() => import("../../common/Caption"));

const useStyles = makeStyles({
  parahStyle: {
    fontSize: "1.25rem",
    letterSpacing: 0.3,
    lineHeight: 1.4,
    fontWeight: 400,
    marginTop: 20,
  },
  locationStyle: {
    // background: "#091E42",
  },
  createAccountStyle: {
    background: "#f4f5f7",
  },
  addressStyle: {
    lineHeight: 2,
  },
});

export default function Retrospective() {
  const { parahStyle } = useStyles();

  return (
    <React.Fragment>
      <Container>
        <Box py={5}>
          <Grid container spacing={6}>
            <Grid item xl={7} lg={7} md={7} sm={12} xs={12}>
              <Box my={7} maxWidth={700}>
                <Box>
                  <Typography component="p" variant="h1">
                    Retrospective
                  </Typography>
                  <Typography component="p" className={parahStyle}>
                    Identify how to improve teamwork by reflecting on what
                    worked, what didn’t, and why. We recommend running a
                    Retrospective with your team every couple of weeks or at the
                    end of a project milestone.
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xl={5} lg={5} md={5} sm={12} xs={12}>
              <Box mt={5} textAlign="center">
                <Zoom in={true} timeout={2000}>
                  <img src={ScrumBoard} height="200px" width="fit-content" />
                </Zoom>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={6}>
            <Grid item xl={9} lg={9} md={8} sm={12} xs={12}>
              <Box my={7} maxWidth={700}>
                <Box>
                  <Typography component="p" variant="h1">
                    Instructions for running Retrospective
                  </Typography>
                  <Box my={3} display="flex">
                    <Typography variant="h2">1. Prep</Typography>
                    <Box mt={1} ml={0.5}>
                      <Caption title="15 MIN" />
                    </Box>
                  </Box>
                  <Box>
                    <Typography component="p" variant="h3">
                      <p>
                        For remote teams, start by creating a new collaboration
                        like a retro board.
                      </p>
                    </Typography>
                    <Typography component="p" variant="h3">
                      <p>
                        For in-person teams, find a whiteboard or large paper,
                        and set out Post-It notes and markers in a meeting room.
                      </p>
                    </Typography>
                    <Typography component="p" variant="h3">
                      <p>
                        On the page, board, paper, or whiteboard, create three
                        columns with the headings “What we did well”, “What we
                        can do better”, and “Actions”.
                      </p>
                    </Typography>
                    <Typography component="p" variant="h3">
                      <p>
                        And, if possible, get a neutral third party to help
                        facilitate the meeting. This will encourage greater
                        participation and uncover more insights.
                      </p>
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xl={3} lg={3} md={4} sm={12} xs={12}>
              <Box mt={5} textAlign="center">
                <SideNote
                  title="EXAMPLE: RETRO BOARD"
                  showLink={true}
                  link="Open in board"
                  description="Running this Play remotely? Use this free Retrospective template to guide the conversation and capture your session’s output."
                />
              </Box>
              <Box mt={5} textAlign="center">
                <SideNote
                  title="EXAMPLE: RETRO BOARD"
                  showLink={true}
                  link="Open in board"
                  description="Running this Play remotely? Use this free Retrospective template to guide the conversation and capture your session’s output."
                />
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={6}>
            <Grid item xl={9} lg={9} md={8} sm={12} xs={12}>
              <Box my={7} maxWidth={700}>
                <Box my={3} display="flex">
                  <Typography variant="h2">2. Set the stage</Typography>
                  <Box mt={1} ml={0.5}>
                    <Caption title="5 MIN" />
                  </Box>
                </Box>
                <List component="nav">
                  <ListItem alignItems="flex-start">
                    <ListItemIcon>
                      <DoneOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Don’t make it personal, don’t take it personallyn" />
                  </ListItem>
                  <ListItem alignItems="flex-start">
                    <ListItemIcon>
                      <DoneOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Listen with an open mind" />
                  </ListItem>
                  <ListItem alignItems="flex-start">
                    <ListItemIcon>
                      <DoneOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Everyone’s experience is valid" />
                  </ListItem>
                  <ListItem alignItems="flex-start">
                    <ListItemIcon>
                      <DoneOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Set the time period you’re discussing (last sprint, last quarter, entire project, etc.)" />
                  </ListItem>
                  <ListItem alignItems="flex-start">
                    <ListItemIcon>
                      <DoneOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Focus on improvement, rather than placing blame" />
                  </ListItem>
                </List>
                <Typography component="p" variant="h3">
                  <p>
                    If you’ve run a Retrospective previously, quickly revisit
                    the themes and actions from last time to build a sense of
                    continuity.
                  </p>
                </Typography>
              </Box>
            </Grid>
            <Grid item xl={3} lg={3} md={4} sm={12} xs={12}>
              <Box mt={5} textAlign="center">
                <SideNote
                  title="EXAMPLE: RETRO BOARD"
                  showLink={true}
                  link="Open in board"
                  description="Running this Play remotely? Use this free Retrospective template to guide the conversation and capture your session’s output."
                />
              </Box>
              <Box mt={5} textAlign="center">
                <SideNote
                  title="EXAMPLE: RETRO BOARD"
                  showLink={true}
                  link="Open in board"
                  description="Running this Play remotely? Use this free Retrospective template to guide the conversation and capture your session’s output."
                />
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={6}>
            <Grid item xl={9} lg={9} md={8} sm={12} xs={12}>
              <Box my={7} maxWidth={700}>
                <Box my={3} display="flex">
                  <Typography variant="h2">3. What we did well</Typography>
                  <Box mt={1} ml={0.5}>
                    <Caption title="15 MIN" />
                  </Box>
                </Box>
                <Typography component="p" variant="h3">
                  <p>
                    Using either a digital whiteboard or a physical one, have
                    each team member write down what the team did well, one idea
                    per note. Post the notes, and group similar or duplicate
                    ideas together. Discuss each one briefly as a team.
                  </p>
                </Typography>
              </Box>
            </Grid>
            <Grid item xl={3} lg={3} md={4} sm={12} xs={12}>
              <Box mt={5} textAlign="center">
                <SideNote
                  title="EXAMPLE: RETRO BOARD"
                  showLink={true}
                  link="Open in board"
                  description="Running this Play remotely? Use this free Retrospective template to guide the conversation and capture your session’s output."
                />
              </Box>
              <Box mt={5} textAlign="center">
                <SideNote
                  title="EXAMPLE: RETRO BOARD"
                  showLink={true}
                  link="Open in board"
                  description="Running this Play remotely? Use this free Retrospective template to guide the conversation and capture your session’s output."
                />
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={6}>
            <Grid item xl={9} lg={9} md={8} sm={12} xs={12}>
              <Box my={7} maxWidth={700}>
                <Box my={3} display="flex">
                  <Typography variant="h2">4. What we can do better</Typography>
                  <Box mt={1} ml={0.5}>
                    <Caption title="10 MIN" />
                  </Box>
                </Box>
                <Typography component="p" variant="h3">
                  <p>
                    Have everyone write down what they think can be improved,
                    one idea per note. Post the notes, and group similar or
                    duplicate ideas together. Discuss each theme as a team.
                  </p>
                </Typography>
              </Box>
            </Grid>
            <Grid item xl={3} lg={3} md={4} sm={12} xs={12}>
              <Box mt={5} textAlign="center">
                <SideNote
                  title="EXAMPLE: RETRO BOARD"
                  showLink={true}
                  link="Open in board"
                  description="Running this Play remotely? Use this free Retrospective template to guide the conversation and capture your session’s output."
                />
              </Box>
              <Box mt={5} textAlign="center">
                <SideNote
                  title="TIP: MAKE SURE ALL ARE HEARD"
                  showLink={true}
                  link="Open in board"
                  description="If the discussion is dominated by one or two people, the facilitator should step in and call on others before moving on."
                />
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={6}>
            <Grid item xl={9} lg={9} md={8} sm={12} xs={12}>
              <Box my={7} maxWidth={700}>
                <Box my={3} display="flex">
                  <Typography variant="h2">5. Actions</Typography>
                  <Box mt={1} ml={0.5}>
                    <Caption title="10 MIN" />
                  </Box>
                </Box>
                <Typography component="p" variant="h3">
                  <p>
                    Have everyone brainstorm actions that can be taken to
                    improve problem areas, one idea per note.
                  </p>
                </Typography>
                <Typography component="p" variant="h3">
                  <p>
                    Post the notes and group similar or duplicate ideas. Discuss
                    each idea as a team, and assign owners to these actions and
                    due dates as necessary.
                  </p>
                </Typography>
              </Box>
            </Grid>
            <Grid item xl={3} lg={3} md={4} sm={12} xs={12}>
              <Box mt={5} textAlign="center">
                <SideNote
                  title="TIP: UPDATE YOUR WORKFLOWS"
                  showLink={true}
                  link="Open in board"
                  description="If any of the action items have corresponding Jira issues, include links to them on the page so it's easy to see their status."
                />
              </Box>
              <Box mt={5} textAlign="center">
                <SideNote
                  title="TIP: MAKE SURE ALL ARE HEARD"
                  showLink={true}
                  link="Open in board"
                  description="Incorporate actions from the retrospective into your day-to-day, whether it’s in stand-ups, or weekly team status updates."
                />
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={6}>
            <Grid item xl={9} lg={9} md={8} sm={12} xs={12}>
              <Box my={7} maxWidth={700}>
                <Box>
                  <Typography component="p" variant="h1">
                    Follow-up
                  </Typography>
                  <Box my={3} display="flex">
                    <Typography variant="h2">Challenge takeaways</Typography>
                  </Box>
                  <Box>
                    <Typography component="p" variant="h3">
                      <p>
                        Are follow-up tasks being completed, or forgotten? Are
                        you getting to the root of your problems? Would a
                        different set of activities help you dig deeper?
                        Retrospectives can be customized—make it your own!
                      </p>
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography component="p" variant="h1">
                    Variations
                  </Typography>
                  <Box my={3} display="flex">
                    <Typography variant="h2">Past two-months map</Typography>
                  </Box>
                  <Box>
                    <Typography component="p" variant="h3">
                      <p>
                        Create a timeline spanning the past two months and have
                        team members call out significant events. Doing this at
                        the start of the Play helps refresh everyone's memory
                        and sets the stage.
                      </p>
                    </Typography>
                  </Box>
                  <Box my={3} display="flex">
                    <Typography variant="h2">Dot voting</Typography>
                  </Box>
                  <Box>
                    <Typography component="p" variant="h3">
                      <p>
                        If a lot of ideas emerge in the “Actions” category, vote
                        on which ones you’ll immediately prioritize.
                      </p>
                    </Typography>
                  </Box>
                  <Box>
                    <Typography component="p" variant="h3">
                      <p>
                        If you’re using Letsdoretro, have the team vote on the
                        three ideas they’d like to see at the top of the list by
                        adding their face to the card (shortcut: hover + space).
                        Select owners for the top-voted items.
                      </p>
                    </Typography>
                  </Box>
                  <Box>
                    <Typography component="p" variant="h3">
                      <p>
                        For in-person meetings, everyone grabs a marker and
                        places a dot on their top three preferences. Tally up
                        the dots and follow same step as above.
                      </p>
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xl={3} lg={3} md={4} sm={12} xs={12}>
              <Box mt={5} textAlign="center">
                <SideNote
                  title="DOT VOTING"
                  showLink={true}
                  link="See example"
                  description="If you need to find consensus on the ideas that emerge, use dot voting to guide the conversation."
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  );
}
