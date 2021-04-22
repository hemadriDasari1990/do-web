import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import GridItem from "./gridItem";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Link from "@material-ui/core/Link";
import React from "react";
import { SIGNUP } from "../../../routes/config";
import ScrumBoard from "../../../assets/board";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import useStyles from "../../styles";

const useLocalStyles = makeStyles({
  iconStyle: {
    color: "#57f",
  },
  listStyle: {
    fontSize: "0.8rem",
  },
});

export default function Retrospective() {
  const {} = useLocalStyles();
  const { titleStyle, bannerStyle, cursor } = useStyles();
  const history = useHistory();

  const handleSignup = () => {
    history.push(SIGNUP);
  };

  return (
    <React.Fragment>
      <Box className={bannerStyle}>
        <Container>
          <Grid container spacing={6}>
            <Grid item xl={7} lg={7} md={7} sm={12} xs={12}>
              <Box my={3}>
                <Box>
                  <Typography
                    variant="h1"
                    color="secondary"
                    className={titleStyle}
                  >
                    The guide to retrospectives
                  </Typography>
                  <Typography
                    variant="h1"
                    color="secondary"
                    className={titleStyle}
                  >
                    Remote or in person
                  </Typography>
                  <Box mt={3}>
                    <Typography component="h6" color="secondary">
                      Identify how to improve teamwork by reflecting on what
                      worked, what didn’t, and why. We recommend running a
                      Retrospective with your team every couple of weeks or at
                      the end of a project milestone.
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xl={5} lg={5} md={5} sm={12} xs={12}>
              <Box textAlign="center">
                <Zoom in={true} timeout={2000}>
                  <ScrumBoard
                    stickyNoteColor="#57f"
                    hairColor="#2f2e41"
                    borderColor="#cccccc"
                    primarySkinColor="#ffb8b8"
                    secondarySkinColor="#a0616a"
                    shoeColor="#cccccc"
                    pantColor="#2f2e41"
                    shirtColor="#cccccc"
                    cornerCircleColor="#cccccc"
                    width={381}
                    height={320}
                  />
                </Zoom>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Container>
        <Grid container spacing={2}>
          <Grid item xl={10} lg={10} md={10} sm={12} xs={12}>
            <Box my={3}>
              <Typography variant="h1" className={titleStyle}>
                What is a sprint retrospective and how do you run one?
              </Typography>
            </Box>
            <Box mt={3}>
              <GridList cols={3} cellHeight={150} spacing={2}>
                <GridListTile cols={1} rows={2.1}>
                  <GridItem
                    item={{
                      step: "#",
                      index: 0,
                      title: `Sometimes it feels like your team is on a hamster wheel.
                      You’re constantly producing, the wheel keeps spinning, your
                      legs keep moving faster, and eventually, you end up burnt out
                      and exhausted.`,
                    }}
                  />
                </GridListTile>
                <GridListTile cols={2} rows={2}>
                  <GridItem
                    item={{
                      step: "#",
                      index: 2,
                      title: `But, what if you were to step off that wheel periodically?
                      Maybe you’d realize that a little grease makes things a whole
                      lot easier. Or perhaps you’d figure out a way to add a motor –
                      meaning you didn’t need to work nearly as hard.`,
                    }}
                  />
                </GridListTile>
                <GridListTile cols={3} rows={1.3}>
                  <GridItem
                    item={{
                      step: "#",
                      index: 4,
                      title: `Those periodic opportunities to evaluate your work are the
                      magic behind retrospectives. Let’s talk about what they are
                      and how they can save your team a whole lot of fruitless
                      spinning.`,
                    }}
                  />
                </GridListTile>
              </GridList>
            </Box>
          </Grid>
          <Grid item xl={10} lg={10} md={10} sm={12} xs={12}>
            <Box my={3}>
              <Typography variant="h1" className={titleStyle}>
                What is a retrospective?
              </Typography>
            </Box>
            <Box mt={3}>
              <GridList cols={3} cellHeight={150} spacing={2}>
                <GridListTile cols={1} rows={1.9}>
                  <GridItem
                    item={{
                      step: "#",
                      index: 1,
                      title: `A retrospective is a meeting where a team examines how it’s
                      working together with the goal of improving their future
                      collaborations.`,
                    }}
                  />
                </GridListTile>
                <GridListTile cols={2} rows={1.9}>
                  <GridItem
                    item={{
                      step: "#",
                      index: 3,
                      title: `You might also hear retrospective meetings referred to as
                      Scrum retrospectives, sprint retrospectives, or even
                      post-mortems. Agile teams perform retrospectives at the end of
                      sprints – which are short periods of time (or timeboxes) in
                      which teams complete a set amount of work.`,
                    }}
                  />
                </GridListTile>
                <GridListTile cols={3} rows={1.5}>
                  <GridItem
                    item={{
                      step: "#",
                      index: 5,
                      title: ` Retrospectives give teams information about what went well
                      (and what didn’t) that they can use to improve their next
                      sprints.`,
                    }}
                  />
                </GridListTile>
              </GridList>
            </Box>
          </Grid>

          <Grid item xl={10} lg={10} md={10} sm={12} xs={12}>
            <Box my={3}>
              <Typography variant="h1" className={titleStyle}>
                Why retrospectives are a crucial tool for teams
              </Typography>
            </Box>

            <Box mt={3}>
              <Box mb={3}>
                <Typography component="p">
                  When the average organization invests upwards of 15% of their
                  collective time in meetings, I understand if you’re hesitant
                  to pull your team together for yet another sit-down. However,
                  agile retrospectives are well worth the time and effort.
                  Here’s why:
                </Typography>
              </Box>
              <Box m={3}>
                <Box mb={2}>
                  <Typography variant="h2">
                    1. Teams can speak their minds
                  </Typography>
                </Box>
                <Box mt={3}>
                  <GridList cols={3} cellHeight={150} spacing={2}>
                    <GridListTile cols={1} rows={2.6}>
                      <GridItem
                        item={{
                          step: "#",
                          index: 1,
                          title: `You might have a few vocal team members who are comfortable
                          speaking up when they hit a bump in the road. But, you might
                          have even more team members who just keep their heads down
                          in their work – even if something isn’t working quite right.`,
                        }}
                      />
                    </GridListTile>
                    <GridListTile cols={2} rows={2.6}>
                      <GridItem
                        item={{
                          step: "#",
                          index: 3,
                          title: `A retrospective meeting invites all of your team members to
                          chime in with their insights. What went well in your last
                          sprint? What could’ve gone better? How will you act on that
                          information?`,
                        }}
                      />
                      <GridItem
                        item={{
                          step: "#",
                          index: 5,
                          title: ` Your retrospective provides an opportunity for everyone to
                          voice their opinions (and not just your most extroverted
                          team members).`,
                        }}
                      />
                    </GridListTile>
                    <GridListTile cols={3} rows={1.5}>
                      <GridItem
                        item={{
                          step: "#",
                          index: 0,
                          title: `  When the average organization invests upwards of 15% of
                          their collective time in meetings, I understand if you’re
                          hesitant to pull your team together for yet another
                          sit-down. However, agile retrospectives are well worth the
                          time and effort. Here’s why:`,
                        }}
                      />
                    </GridListTile>
                  </GridList>
                </Box>
              </Box>
            </Box>
            <Box mt={3}>
              <Box m={3}>
                <Box mb={2}>
                  <Typography variant="h2">
                    2. Challenges are addressed
                  </Typography>
                </Box>
                <Box mt={3}>
                  <GridList cols={3} cellHeight={150} spacing={2}>
                    <GridListTile cols={1} rows={1.9}>
                      <GridItem
                        item={{
                          step: "#",
                          index: 1,
                          title: `We all know the sentiment that goes something like,
                          “Insanity is doing the same thing over and over again and
                          expecting a different result.”`,
                        }}
                      />
                    </GridListTile>
                    <GridListTile cols={2} rows={1.9}>
                      <GridItem
                        item={{
                          step: "#",
                          index: 3,
                          title: `It seems sensible on paper, yet it’s a trap that many teams
                          fall into. You get so caught up in getting stuff done, you
                          don’t often step back and evaluate how you get stuff done.
                          There are likely sticking points and tensions you aren’t
                          even aware of.`,
                        }}
                      />
                    </GridListTile>
                    <GridListTile cols={3} rows={1.3}>
                      <GridItem
                        item={{
                          step: "#",
                          index: 5,
                          title: `Those all bubble to the surface in project retrospectives.
                          This isn’t just a vent session – it’s a chance for your team
                          to address those challenges and work together more
                          efficiently and effectively.`,
                        }}
                      />
                    </GridListTile>
                  </GridList>
                </Box>
              </Box>
              <Box m={3}>
                <Box mb={2}>
                  <Typography variant="h2">
                    3. Collaborations improve
                  </Typography>
                </Box>
                <Box mt={3}>
                  <GridList cols={3} cellHeight={150} spacing={2}>
                    <GridListTile cols={1.5} rows={1.9}>
                      <GridItem
                        item={{
                          step: "#",
                          index: 1,
                          title: `That brings us to the biggest benefit of retrospectives.
                          When your agile team takes advantage of these regular
                          intervals to evaluate their collaborations, their processes
                          and output get better and better.`,
                        }}
                      />
                    </GridListTile>
                    <GridListTile cols={1.5} rows={1.5}>
                      <GridItem
                        item={{
                          step: "#",
                          index: 3,
                          title: `They’ll continue to identify areas for improvement and then
                          actually act on them. The result? An unstoppable team.`,
                        }}
                      />
                    </GridListTile>
                  </GridList>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Container>
        <Grid container spacing={6}>
          <Grid item xl={10} lg={10} md={10} sm={12} xs={12}>
            <Box my={3}>
              <Typography variant="h1" className={titleStyle}>
                How to perform a sprint retrospective in 6 steps
              </Typography>
            </Box>
            <Box mt={3}>
              <Box mb={3}>
                <Typography component="p">
                  Now that you’re armed with the questions you want to ask,
                  you’re ready to pull your retrospective meeting together. Here
                  are six steps to make it happen.
                </Typography>
              </Box>
            </Box>
            <Box mt={3}>
              <GridList cols={3} cellHeight={150} spacing={2}>
                <GridListTile cols={1} rows={2.3}>
                  <GridItem
                    item={{
                      step: "1. Use start quick retro feature",
                      index: 1,
                      title: `You don’t need to start from scratch. Lets do retrospective will help you discuss positive and negative feedback and plan improvements. We recommend using default board feature.`,
                    }}
                  />
                </GridListTile>
                <GridListTile cols={2} rows={2.2}>
                  <GridItem
                    item={{
                      step: "2. Schedule your sprints",
                      index: 3,
                      title: `In order to figure out when you’ll be hosting your sprint
                          retrospective meeting, you need to know when your sprints are
                          happening. Schedule those out on your team’s calendar. If you
                          aren’t sure how long you’ll need, two weeks per sprint is a
                          solid starting point. Generally, sprints shouldn’t be longer
                          than a month.`,
                    }}
                  />
                </GridListTile>
                <GridListTile cols={3} rows={1.2}>
                  <GridItem
                    item={{
                      step: "3. Invite your team",
                      index: 0,
                      title: `A retrospective should happen at the end of each sprint. Put
                      them on the calendar now and add your team members to that
                      meeting event, so you make sure it happens. Your entire team
                      should participate.`,
                    }}
                  />
                </GridListTile>
                <GridListTile cols={2} rows={4}>
                  <GridItem
                    item={{
                      step: "4. Ask the right questions",
                      index: 5,
                      title: `Good news: I’ve already outlined those above. Start with those
                      to get the conversation underway, but be prepared that other
                      talking points will come up. If the team starts to explore an
                      unnecessary tangent, steer them back to evaluating your past
                      sprint and improving your next one.`,
                    }}
                  />
                  <GridItem
                    item={{
                      step: "6. Discuss how it went",
                      index: 1,
                      title: `At the end of your next sprint comes another retrospective,
                      where you can discuss how any changes you made panned out.
                      It’s like a snowball that keeps on rolling – your
                      collaborations will continue to improve.
                      \n
                      If your team points to the same challenges in this retrospective? That’s a sign that either you didn’t follow through on addressing the issue, or what you tried to implement wasn’t successful.`,
                    }}
                  />
                </GridListTile>
                <GridListTile cols={1} rows={4}>
                  <GridItem
                    item={{
                      step: "5. Work to improve your processes",
                      index: 4,
                      title: `Following your retrospective, your agile team will move into
                      their next sprint. This is not only a time when they’ll be
                      getting more work done, but also improving their processes and
                      interactions based on what was discussed in your
                      retrospective. Make sure you’re actually turning those ideas
                      into action.`,
                    }}
                  />
                </GridListTile>
              </GridList>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Container>
        <Grid container spacing={6}>
          <Grid item xl={10} lg={10} md={10} sm={12} xs={12}>
            <Box my={3}>
              <Typography variant="h1" className={titleStyle}>
                Beware of the barriers to a successful retrospective
              </Typography>
            </Box>
            <Box mt={3}>
              <Box mb={3}>
                <Typography component="p">
                  Following the above steps will help you get your retrospective
                  rolling. But, keep your eye out for a few common roadblocks
                  that could throw your retrospective meeting off track.
                </Typography>
              </Box>
            </Box>

            <Box mt={3}>
              <GridList cols={3} cellHeight={150} spacing={2}>
                <GridListTile cols={1} rows={3.5}>
                  <GridItem
                    item={{
                      step: "People",
                      index: 1,
                      title: `At the end of a sprint, team members might feel a little
                      burned out. Now you’re asking them to share honest and
                      comprehensive feedback, which can be a little stressful.
                      Encourage them to get candid and set that example yourself.`,
                    }}
                  />
                </GridListTile>
                <GridListTile cols={2} rows={3.5}>
                  <GridItem
                    item={{
                      step: "Processes",
                      index: 3,
                      title: `Would you go to the gym and do the same exercise over and over
                      again? Probably not. Yet, that’s the approach so many teams
                      take to their retrospectives. While templates are helpful,
                      there isn’t a rinse-and-repeat process or retrospective
                      format. Be prepared to probe your systems and processes in
                      different ways to get the most helpful insights.`,
                    }}
                  />
                  <GridItem
                    item={{
                      step: "Tools",
                      index: 0,
                      title: `Technology is on your side, so use a tool that allows every
                      team member to access and add thoughts and ideas in an easy
                      and non-confrontational structure. Intuitive tools that
                      recognize and highlight contributions can help drive
                      engagement on remote and in-person teams.`,
                    }}
                  />
                </GridListTile>
                <GridListTile cols={3} rows={2}>
                  <GridItem
                    item={{
                      step: "Time",
                      index: 5,
                      title: `Your retrospective shouldn’t be an afterthought. In order for
                      it to be beneficial, you need to dedicate adequate time to it.
                      You don’t want to rush to deliver – you want to make time to
                      increase your capacity to deliver. That’s not a five-minute
                      conversation, so leave your team plenty of time to dig deep.`,
                    }}
                  />
                </GridListTile>
              </GridList>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Container>
        <Grid container spacing={6}>
          <Grid item xl={10} lg={10} md={10} sm={12} xs={12}>
            <Box my={3}>
              <Typography variant="h1" className={titleStyle}>
                Questions your team should ask (and answer) during your
                retrospective
              </Typography>
            </Box>
            <Box mt={3}>
              <Box mb={3}>
                <Typography component="p">
                  So, you’ve reached the end of the sprint and are planning to
                  do a retrospective. If you’re expecting your team to roll up
                  their sleeves and start picking apart their own
                  collaborations, you’re going to be disappointed.
                </Typography>
              </Box>
              <Box mb={3}>
                <Typography component="p">
                  The Scrum Master needs to lead this conversation, and they’ll
                  want to come prepared with some questions to get the
                  discussion rolling. Here are four questions your team should
                  be sure to address.
                </Typography>
              </Box>
            </Box>

            <Box mt={3}>
              <GridList cols={3} cellHeight={150} spacing={2}>
                <GridListTile cols={1} rows={3.3}>
                  <GridItem
                    item={{
                      step: "1. What went well?",
                      index: 4,
                      title: `Start with the positive and have your team outline all of the
                      things they were pleased with during this sprint. Did they fix
                      more bugs than they thought they would? Did they solve a
                      difficult problem? Navigate around a roadblock? These are
                      things you’ll continue doing.`,
                    }}
                  />
                </GridListTile>
                <GridListTile cols={2} rows={3.3}>
                  <GridItem
                    item={{
                      step: "2. What didn’t go well?",
                      index: 2,
                      title: `This one isn’t as fun to answer, but it can be enlightening.
                      Your team should share their frustrations and challenges from
                      this past sprint – and they should do so in a constructive and
                      respectful way, of course. These are things you’ll stop doing.`,
                    }}
                  />
                  <GridItem
                    item={{
                      step: "3. What ideas do we have for next time?",
                      index: 1,
                      title: ` Your retrospectives are about continuous improvement. This
                      question will help your team figure out how they’ll apply what
                      they learned to their next sprints, so things can run even
                      smoother. These are things you’ll continue doing.`,
                    }}
                  />
                </GridListTile>
                <GridListTile cols={3} rows={1.4}>
                  <GridItem
                    item={{
                      step: "4. How will we implement these actions?",
                      index: 3,
                      title: `If you answer the above questions, all you have is a bunch of
                      information. In order for it to be valuable, you need to put
                      it into action. That’s what this question is all about. It
                      requires that your team identifies what you’ll actually do
                      with the things you’ve uncovered. These are your action items.`,
                    }}
                  />
                </GridListTile>
              </GridList>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Container>
        <Grid container spacing={6}>
          <Grid item xl={10} lg={10} md={10} sm={12} xs={12}>
            <Box>
              <Typography variant="h1" className={titleStyle}>
                Stay organized
              </Typography>
            </Box>
            <Box mt={3}>
              <Box mb={3}>
                <Typography component="p">
                  The bulk of your retrospective should be dedicated to the
                  actual discussion. However, it’s smart to leave five minutes
                  for icebreakers and introductions, five minutes for a quick
                  overview of the latest sprint, and then five to 10 minutes at
                  the end to discuss how that retrospective went – and how your
                  next retrospective could be better.
                </Typography>
              </Box>
              <Box mb={3}>
                <Typography component="p">
                  Lets do retro can help your remote team run amazing
                  retros.&nbsp;
                  <Link className={cursor} onClick={() => handleSignup()}>
                    Sign up for a free lets do retro account
                  </Link>
                  &nbsp;to give it a try!
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
