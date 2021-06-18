import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import DoImage from "../../common/Image";
import Grid from "@material-ui/core/Grid";
import Process from "./process";
import React from "react";
import Team from "../../../assets/team.svg";
import Typography from "@material-ui/core/Typography";
import UnderlineText from "../../common/UnderlineText";
import Wave from "../../../assets/wave.svg";
import hemadri from "../../../assets/hemadri.jpg";
import lokeshPemmasani from "../../../assets/lokesh-pemmasani.jpeg";
import { makeStyles } from "@material-ui/core/styles";
import rajeshPemmasani from "../../../assets/rajesh-pemmasani.jpeg";
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
                        Good Software takes hard work.
                      </Typography>
                      <Typography
                        component="p"
                        className={parahStyle}
                        color="secondary"
                      >
                        At Lets do retro, we’ve built a platform for
                        retrospectives, enabling collocated, distributed, and
                        remote teams to discuss what worked and what didn't.
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xl={5} lg={5} md={5} sm={12} xs={12}>
                  <Box mt={-3} textAlign="center">
                    <DoImage
                      src={Team}
                      height="300px"
                      width="300px"
                      placeholderImg={Team}
                      errorImg={Team}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Box>
        <Box>
          <Container>
            <Box my={5}>
              <Typography variant="h2" className={titleStyle}>
                The faces behind Letsdoretro.
              </Typography>
              <Typography component="p" className={parahStyle}>
                Letsdoretro team is lightweight, 100% remote.
              </Typography>
            </Box>
            <Box my={5}>
              <Typography variant="h2">Our team</Typography>
              <Typography component="p" className={parahStyle}>
                We are a team of 2 humans across 2 cities, working hard (and
                remotely) to make your life easier. From banking to e-commerce
                or Telecommunications, we have different skills, but the one we
                have in common is our entrepreneurial spirit that runs through
                the team and sparks lots of innovation and fun.
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
          <Box mt={5} mb={3}>
            <Typography variant="h2">Individual Stories</Typography>
          </Box>
          <Box>
            <Grid container spacing={2}>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <Box>
                  <UnderlineText title="Hemadri Dasari" />
                  <Box mt={2}>
                    <Typography variant="body1">
                      He is a Founder & Developer of Let's Do Retro Inc. He
                      started as side project in the middle of Jan 2021. He is
                      currently working in a team and not very pleased with the
                      current retrospective board & other tools out there in the
                      market. So he decided to create his own next generation
                      retrospective tool and see if that could make it better
                      than what is currently available in the market. He worked
                      hard for 3 months to built this platform in his offline
                      time.
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <Box>
                  <UnderlineText title="Work Experience" />
                  <Box mt={2}>
                    <Typography variant="body1">
                      Hemadri Dasari currently working as a Senior Lead
                      Developer in Abu Dhabi, United Arab Emirates. Prior to
                      this, he served as Senior Front end developer at Mashreq
                      Bank, Dubai. He also worked as Senior Full Stack Developer
                      at Emirates NBD Bank, Dubai and also had multiple roles in
                      Verizon Communications Inc, Cognizant Technology Solutions
                      and Barclays Shared Services. Hemadri has completed his
                      B.E Computer Science & Enginerring from Anna University.
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
                    <Typography variant="body1">
                      A quality assurance specialist and a key advisor, she is a
                      key contributor in developing and implementing quality
                      assurance policies.
                    </Typography>
                    <Typography variant="h5">
                      Got a bug? Blame Sreesha (she’s very sorry 🤷).
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
      <Box>
        <Container>
          <Box my={5}>
            <Typography variant="h2">Our Key Advisors</Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item lg={3} xl={3} md={3} sm={8} xs={12}>
              <ProfileCardSecondary
                path={rajeshPemmasani}
                title="Rajesh Pemmasani"
                subTitle="Assistant Vice President"
                fbPath={process.env.REACT_APP_RAJESH_PEMMASANI_FB_URL}
                linkedinPath={
                  process.env.REACT_APP_RAJESH_PEMMASANI_LINKEDIN_URL
                }
                button={true}
              />
            </Grid>
            <Grid item lg={3} xl={3} md={3} sm={8} xs={12}>
              <ProfileCardSecondary
                path={lokeshPemmasani}
                title="Lokesh Pemmasani"
                subTitle="Principal Solution Architect"
                fbPath={process.env.REACT_APP_LOKESH_PEMMASANI_FB_URL}
                linkedinPath={
                  process.env.REACT_APP_LOKESH_PEMMASANI_LINKEDIN_URL
                }
                button={true}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box py={3}>
        <Process />
      </Box>
      <Box mb={-0.9}>
        <DoImage src={Wave} placeholderImg={Wave} errorImg={Wave} />
      </Box>
      <Box className={createAccountStyle}>
        <CreateAccountGrid />
      </Box>
    </React.Fragment>
  );
}
