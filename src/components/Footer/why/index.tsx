import AddNoteIcon from "../../../assets/add-note.svg";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import CreateAccount from "../../Home/create";
import Grid from "@material-ui/core/Grid";
import InfoCard from "../../common/InfoCard";
import InstantRetroGrid from "../../Home/instantRetroGrid";
import React from "react";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";
import { makeStyles } from "@material-ui/core/styles";
import useStyles from "../../styles";

const useLocalStyles = makeStyles({
  iconStyle: {
    color: "#57f",
  },
  listStyle: {
    fontSize: "0.8rem",
  },
});

export default function WhyLetsdoretro() {
  const {} = useLocalStyles();
  const { titleStyle } = useStyles();

  return (
    <React.Fragment>
      <Box>
        <Container>
          <Grid container spacing={6}>
            <Grid item xl={7} lg={7} md={7} sm={12} xs={12}>
              <Box my={3}>
                <Box>
                  <Typography variant="h1" className={titleStyle}>
                    Why Letsdoretro?
                  </Typography>
                  <Box mt={3}>
                    <Typography component="h6">
                      If you want to eliminate all elements of chance or
                      uncertainty when you decide on which retrospective tool to
                      use then choose Letsdoretro. We all know what
                      letsdoretro.com can do.
                    </Typography>
                  </Box>
                </Box>
                <Box display="flex" mt={3}>
                  <Box mr={5}>
                    <InstantRetroGrid
                      title="Start Quick Retro"
                      subTitle="Free forever — no signup required"
                    />
                  </Box>
                  <Box>
                    <CreateAccount
                      title="Signup free"
                      subTitle="Free forever — no credit card required"
                    />
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xl={5} lg={5} md={5} sm={12} xs={12}>
              <Box textAlign="center" mt={8}>
                <Zoom in={true} timeout={2000}>
                  <img src={AddNoteIcon} height="200px" width="fit-content" />
                </Zoom>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={6}>
            <Grid item xl={7} lg={7} md={7} sm={12} xs={12}>
              <Box>
                <Box>
                  <Typography variant="h1" className={titleStyle}>
                    The next generation retrospective tool
                  </Typography>
                  <Box mt={3}>
                    <Typography component="h6">
                      If you have ever been frustrated by the lack of team
                      engagement during retrospective meetings then Letsdoreto
                      can save you from years of frustration, disappointments
                      and regrets. You can soon manage and run extraordinary
                      meetings, if you let Letsdoretro help you.
                    </Typography>
                  </Box>
                  <Box mt={3}>
                    <Typography component="h6">
                      There are countless scrum teams with intelligent
                      developers, scrum masters and project managers who are
                      unable to perform their best, often without knowing it.
                      Because they cannot run effective retrospective meetings
                      and are unable to improve their performance.
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xl={5} lg={5} md={5} sm={12} xs={12}>
              <Box mt={5}>
                <Typography variant="h2">What about you?</Typography>
                <Box mt={1}>
                  <Typography component="h6">
                    If your organization is not satisfied by the way your team
                    performs, and if you are honest enough with yourself to
                    admit it, you have already taken the first big step to
                    success.
                  </Typography>
                </Box>
              </Box>
              <Box mt={3}>
                <Typography variant="h2">Here's what to do?</Typography>
                <Box mt={1}>
                  <Typography component="h6">
                    For your next three retrospective meetings use Letsdoretro.
                    The answers to the following questions will explain why you
                    need a tool like Letsdoretro and how easily you can do
                    something about getting better.
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Box my={3}>
            <Box textAlign="center">
              <Typography variant="h1">Questions</Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                <Box pt={2}>
                  <Box mt={2}>
                    <InfoCard
                      height={230}
                      titleMinHeight={80}
                      title="Q. What is so important about my ability to run good retrospectives?"
                      description="Open feedback and effective communication are the core components of a retrospective meeting which will give you a clear, precise and actionable path to drive long term improvement."
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                <Box pt={2}>
                  <Box mt={2}>
                    <InfoCard
                      titleMinHeight={80}
                      height={230}
                      title={`Q. What does a Good Retrospective Meeting mean?`}
                      description="It means you can pinpoint all the problems in persons, tools, processes and communication. You can make plans and act upon them as a team and iteratively solve those problems."
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                <Box pt={2}>
                  <Box mt={2}>
                    <InfoCard
                      titleMinHeight={80}
                      height={230}
                      title="Q. Are there other advantages to be gained by running better retrospectives?"
                      description={`Yes! retrospective meetings are actually "tools of thought". The more you learn about yourself as a team, the better you become.`}
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                <Box pt={2}>
                  <Box mt={2}>
                    <InfoCard
                      titleMinHeight={80}
                      height={230}
                      title={`Q. Wouldn't I have to use a fancy and expensive set of tools to run retrospectives?`}
                      description={`No, not anymore. You can gain the ability to run awesome retrospectives by using Letsdoretro, you will get amazing results without spending a cent.`}
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                <Box pt={2}>
                  <Box mt={2}>
                    <InfoCard
                      titleMinHeight={80}
                      height={230}
                      title={`Q. How do I know if Letsdoretro is the Best Retrospective Tool to use?`}
                      description="No one tool is strongest in every aspect, the BEST is the one best suited to individual needs. Letsdoretro surpasses all others in Ease of use and an iterative improvement of team performance."
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                <Box pt={2}>
                  <Box mt={2}>
                    <InfoCard
                      titleMinHeight={80}
                      height={230}
                      title="Q. How do I know if Letsdoretro will do wonders for my team?"
                      description={`For running effective retrospective meetings you need a tool that is easily operated, that drives a clear, open and meaningful conversation. Our's is your best next generation lightweight tool.`}
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                <Box pt={2}>
                  <Box mt={2}>
                    <InfoCard
                      titleMinHeight={50}
                      height={230}
                      title={`Q. How can I find out more about Letsdoretro?`}
                      description={`If you have any questions or need more documentation, then do not hesitate to contact us. We will gladly send you more material about Letsdoretro.com. Just send an email to us at letsdoretro@gmail.com or chat with us directly.`}
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                <Box pt={2}>
                  <Box mt={2}>
                    <InfoCard
                      titleMinHeight={50}
                      height={230}
                      title={`Q. Is letsdoretro.com really free?`}
                      description={`Yes! 95% of the features are free and will always remain free. This is our guarantee and commitment to you. Letsdoretro is also working on an Enterprise plan with features like SSO.`}
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </React.Fragment>
  );
}
