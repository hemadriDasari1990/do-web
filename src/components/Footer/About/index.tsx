import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import DoImage from "../../common/Image";
import Grid from "@material-ui/core/Grid";
import Process from "./process";
import React from "react";
import Typography from "@material-ui/core/Typography";
import UnderlineText from "../../common/UnderlineText";
import { makeStyles } from "@material-ui/core/styles";
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
  const assetUrl = process.env.REACT_APP_STATIC_ASSETS_URL as string;

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
                      src="team.svg"
                      height="300px"
                      width="300px"
                      placeholderImg="team.svg"
                      errorImg="team.svg"
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
                  path={assetUrl + "avatars/1.svg"}
                  title="Lakshmi V"
                  subTitle="Founder"
                  fbPath={process.env.REACT_APP_HEMADRI_FB_URL}
                  linkedinPath={process.env.REACT_APP_HEMADRI_LINKEDIN_URL}
                  button={true}
                />
              </Grid>
              <Grid item lg={3} xl={3} md={3} sm={8} xs={12}>
                <ProfileCardSecondary
                  path={assetUrl + "sreesha.jpeg"}
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
                  <UnderlineText title="Lakshmi V" />
                  <Box mt={2}>
                    <Typography variant="body1">
                      She is the Founder of Let's Do Retro Inc. She started as a
                      side project in the middle of Jan 2021. She is not very
                      pleased with the current retrospective tools out there in
                      the market. So she decided to create her own next
                      generation retrospective tool and see if that could make
                      it better than what is currently available in the market.
                      She worked hard for 3 months to built this platform.
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
                path={assetUrl + "rajesh-pemmasani.jpeg"}
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
                path={assetUrl + "lokesh-pemmasani.jpeg"}
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
        <DoImage src="wave.svg" placeholderImg="wave.svg" errorImg="wave.svg" />
      </Box>
      <Box className={createAccountStyle}>
        <CreateAccountGrid />
      </Box>
    </React.Fragment>
  );
}
