import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Process from "./process";
import React from "react";
import Team from "../../../assets/team.svg";
import Typography from "@material-ui/core/Typography";
import UnderlineText from "../../common/UnderlineText";
import Wave from "../../../assets/wave.svg";
import hemadri from "../../../assets/hemadri.jpg";
import { makeStyles } from "@material-ui/core/styles";
import sreesha from "../../../assets/sreesha.jpeg";
import useStyles from "../../styles";

const CreateAccountGrid = React.lazy(
  () => import("../../Home/createAccountGrid")
);
const ProfileCardSecondary = React.lazy(
  () => import("../../ProfileCardSecondary")
);
const useLocalStyles = makeStyles({
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
});

export default function About() {
  const { parahStyle, createAccountStyle } = useLocalStyles();
  const { bannerStyle, titleStyle } = useStyles();
  return (
    <React.Fragment>
      <Box>
        <Box className={bannerStyle}>
          <Container>
            <Box py={3}>
              <Grid container spacing={2}>
                <Grid item xl={7} lg={7} md={7} sm={12} xs={12}>
                  <Box>
                    <Box>
                      <Typography
                        variant="h1"
                        color="secondary"
                        className={titleStyle}
                      >
                        Lets do retro is the online collaborative retrospective
                        platform
                      </Typography>
                      <Typography
                        component="p"
                        className={parahStyle}
                        color="secondary"
                      >
                        At Lets do retro, we’ve built a platform for modern
                        retrospectives, enabling collocated, distributed, and
                        remote teams to discuss what worked and what didn't.
                      </Typography>
                      <Typography
                        variant="h2"
                        // className={titleStyle}
                        color="secondary"
                      >
                        Our mission is to empower teams to create the next big
                        thing.
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xl={5} lg={5} md={5} sm={12} xs={12}>
                  <Box mt={-3} textAlign="center">
                    <img src={Team} height="400px" width="300px" />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Box>
        <Box>
          <Container>
            <Box p={5} textAlign="center">
              <Typography variant="h1">Contributors</Typography>
              <Typography component="p" className={parahStyle}>
                Behind every great human achievement, there is a team.
              </Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item lg={3} xl={3} md={3} sm={8} xs={12}>
                <ProfileCardSecondary
                  path={hemadri}
                  title="Hemadri Dasari"
                  subTitle="Founder and Senior Developer"
                  fbPath={process.env.REACT_APP_HEMADRI_FB_URL}
                  linkedinPath={process.env.REACT_APP_HEMADRI_LINKEDIN_URL}
                  button={true}
                />
              </Grid>
              <Grid item lg={3} xl={3} md={3} sm={8} xs={12}>
                <ProfileCardSecondary
                  path={sreesha}
                  title="Sreesha Venkita Krishnan"
                  subTitle="Senior QA Professional"
                  fbPath={process.env.REACT_APP_SREESHA_FB_URL}
                  linkedinPath={process.env.REACT_APP_SREESHA_LINKEDIN_URL}
                  button={true}
                />
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Container>
          <Box mt={5} textAlign="center">
            <Typography variant="h1">Individual Stories</Typography>
          </Box>
          <Box mt={3}>
            <Grid container spacing={2}>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <Box>
                  <UnderlineText title="Hemadri Dasari" />
                  <Box mt={2}>
                    <Typography variant="h5">
                      He is a Founder & Developer of Let's do retro Inc. He
                      started as side project in the middle of Jan 2021. He is
                      currently working in a team and not very pleased with the
                      current retrospective board. So he decided to create his
                      own modern respective tool and see if that could make it
                      better than the one which they are currently using.
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <Box>
                  <UnderlineText title="Hemadri Dasari" />
                  <Box mt={2}>
                    <Typography variant="h5">
                      He built this application from Analysis, Planning, UX/UI
                      design, both FE & BE Implementation including end to end
                      architecture. He has coded close to 3 months developing
                      this beautiful platform in his offline time.
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <Box>
                  <UnderlineText title="Sreesha Venkita krishnan" />
                  <Box mt={2}>
                    <Typography variant="h5">
                      A quality assurance specialist and a key advisor, she is a
                      key contributor in developing and implementing quality
                      assurance policies.
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
      <Box py={3}>
        <Process />
      </Box>
      <Box mb={-0.9}>
        <img src={Wave} />
      </Box>
      <Box className={createAccountStyle}>
        <CreateAccountGrid />
      </Box>
    </React.Fragment>
  );
}
