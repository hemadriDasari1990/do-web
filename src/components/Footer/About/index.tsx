import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Wave from "../../../assets/wave.svg";
import GoodTeam from "../../../assets/good-team.svg";
import UnderlineText from "../../common/UnderlineText";

// const ProfileCard = React.lazy(() => import("../../ProfileCard"));
const Features = React.lazy(() => import("./Features"));
const CreateAccountGrid = React.lazy(
  () => import("../../Home/createAccountGrid")
);
const TeamGrid = React.lazy(() => import("../TeamGrid"));
const ProfileCardSecondary = React.lazy(
  () => import("../../ProfileCardSecondary")
);
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

export default function About() {
  const { parahStyle, createAccountStyle, addressStyle } = useStyles();

  return (
    <React.Fragment>
      <Container>
        <Box py={5}>
          <Grid container spacing={2}>
            <Grid item xl={7} lg={7} md={7} sm={12} xs={12}>
              <UnderlineText title="Who we are" />
              <Box my={7}>
                <Box>
                  <Typography component="p" variant="h1">
                    The power of teamwork
                  </Typography>
                  <Typography component="p" className={parahStyle}>
                    Behind every great human achievement, there is a team.
                  </Typography>
                  <Typography component="p" className={parahStyle}>
                    Our mission is to help teams run retrospectives in a modern
                    way.
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xl={5} lg={5} md={5} sm={12} xs={12}>
              <Box mt={-7}>
                <img src={GoodTeam} height="400px" width="300px" />
              </Box>
            </Grid>
          </Grid>
          <Box>
            <Features />
          </Box>

          <Box my={7}>
            <Box p={5} textAlign="center">
              <Typography variant="h1">Our people</Typography>
              <Typography component="p" className={parahStyle}>
                This is our team, a lot of smiling happy people who work hard to
                empower your teams.
              </Typography>
            </Box>
            <Box>
              <TeamGrid />
            </Box>
          </Box>
          <Box my={7}>
            <Box>
              <Box p={5} textAlign="center">
                <Typography variant="h2">Contributors</Typography>
                <Typography component="p" className={parahStyle}>
                  This is our team, a lot of smiling happy people who work hard
                  to empower your teams.
                </Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item lg={3} xl={3} md={3} sm={8} xs={12}>
                  {/* <Zoom in={true} timeout={2000}> */}
                  <ProfileCardSecondary
                    path="https://media-exp1.licdn.com/dms/image/C4D03AQHe9wGR_VbQ9g/profile-displayphoto-shrink_800_800/0/1608972491530?e=1617235200&v=beta&t=nOg-8ROEMwwu2zBhrsjv2j8PbbA2FWELmLxnwBpEXgw"
                    title="Hemadri Dasari"
                    subTitle="Founder & CEO"
                    fbPath={"https://www.facebook.com/Hemadri.Dasari.1990"}
                    linkedinPath={
                      "https://www.linkedin.com/in/hemadri-dasari-15051990/"
                    }
                    button={true}
                    buttonName="Facebook"
                    buttonOneName="Linekdin"
                    tagLine="Full Stack Developer at Mashreq Bank, Dubai"
                    content=""
                  />
                  {/* </Zoom> */}
                </Grid>
                <Grid item lg={3} xl={3} md={3} sm={8} xs={12}>
                  {/* <Zoom in={true} timeout={2000}> */}
                  <ProfileCardSecondary
                    path="https://media-exp1.licdn.com/dms/image/C5103AQErndFCozlkYA/profile-displayphoto-shrink_800_800/0/1516337167165?e=1617235200&v=beta&t=dY_-K-1CqvA2c2SXDLkihMvWYVtxyBizYa8Xi_crVcg"
                    title="Sreesha Venkita Krishnan"
                    subTitle="Senior Testing professional"
                    fbPath={"https://www.facebook.com/rajesh.pemmasani"}
                    linkedinPath={
                      "https://www.linkedin.com/in/rajesh-pemmasani-56673170/"
                    }
                    button={true}
                    buttonName="Facebook"
                    buttonOneName="Linekdin"
                    tagLine="Senior QA Engineer at Mashreq Bank, Dubai"
                    content={``}
                  />
                  {/* </Zoom> */}
                </Grid>
                <Grid item lg={3} xl={3} md={3} sm={8} xs={12}>
                  {/* <Zoom in={true} timeout={2000}> */}
                  <ProfileCardSecondary
                    path="https://media-exp1.licdn.com/dms/image/C5103AQErndFCozlkYA/profile-displayphoto-shrink_800_800/0/1516337167165?e=1617235200&v=beta&t=dY_-K-1CqvA2c2SXDLkihMvWYVtxyBizYa8Xi_crVcg"
                    title="Sreesha Venkita Krishnan"
                    subTitle="Senior Testing professional"
                    fbPath={"https://www.facebook.com/rajesh.pemmasani"}
                    linkedinPath={
                      "https://www.linkedin.com/in/rajesh-pemmasani-56673170/"
                    }
                    button={true}
                    buttonName="Facebook"
                    buttonOneName="Linekdin"
                    tagLine="Senior QA Engineer at Mashreq Bank, Dubai"
                    content={``}
                  />
                  {/* </Zoom> */}
                </Grid>
                <Grid item lg={3} xl={3} md={3} sm={8} xs={12}>
                  {/* <Zoom in={true} timeout={2000}> */}
                  <ProfileCardSecondary
                    path="https://media-exp1.licdn.com/dms/image/C4D03AQHe9wGR_VbQ9g/profile-displayphoto-shrink_800_800/0/1608972491530?e=1617235200&v=beta&t=nOg-8ROEMwwu2zBhrsjv2j8PbbA2FWELmLxnwBpEXgw"
                    title="Hemadri Dasari"
                    subTitle="Founder"
                    fbPath={"https://www.facebook.com/Hemadri.Dasari.1990"}
                    linkedinPath={
                      "https://www.linkedin.com/in/hemadri-dasari-15051990/"
                    }
                    button={true}
                    buttonName="Facebook"
                    buttonOneName="Linekdin"
                    tagLine="Full Stack Developer at Mashreq Bank, Dubai"
                    content=""
                  />
                  {/* </Zoom> */}
                </Grid>
                <Grid item lg={3} xl={3} md={3} sm={8} xs={12}>
                  {/* <Zoom in={true} timeout={2000}> */}
                  <ProfileCardSecondary
                    path="https://media-exp1.licdn.com/dms/image/C5103AQErndFCozlkYA/profile-displayphoto-shrink_800_800/0/1516337167165?e=1617235200&v=beta&t=dY_-K-1CqvA2c2SXDLkihMvWYVtxyBizYa8Xi_crVcg"
                    title="Sreesha Venkita Krishnan"
                    subTitle="Senior Testing professional"
                    fbPath={"https://www.facebook.com/rajesh.pemmasani"}
                    linkedinPath={
                      "https://www.linkedin.com/in/rajesh-pemmasani-56673170/"
                    }
                    button={true}
                    buttonName="Facebook"
                    buttonOneName="Linekdin"
                    tagLine="Senior QA Engineer at Mashreq Bank, Dubai"
                    content={``}
                  />
                  {/* </Zoom> */}
                </Grid>
              </Grid>
            </Box>
          </Box>
          <UnderlineText title="Individual Stories" />
          <Box>
            <Grid container spacing={2}>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <Box>
                  <Typography variant="body1">
                    <b>Hemadri Dasari</b> is a Founder & Developer of Let's do
                    retro Inc. He started as side project in the middle of Jan
                    2021. He is currently working in a team and not very pleased
                    with the current retrospective board. So he decided to
                    create his own modern respective application with beautiful
                    UI and allow users to express reactions and see if that
                    could make it better than the one which we are currently
                    using.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <Box>
                  <Typography variant="body1">
                    <b>Hemadri Dasari</b> had build this application end to end
                    from Analysis, Planning, UX/UI design, Both FE & BE
                    Implementation including solution & DB design. He has coded
                    close to 1 month developing this beautiful platform in his
                    offline time.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <Box>
                  <Typography variant="body1">
                    <b>Hemadri Dasari</b> is a Founder & Developer of Let's do
                    retro Inc. He started as side project in the middle of Jan
                    2021. He is currently working in a team and not very pleased
                    with the current retrospective board. So he decided to
                    create his own modern respective application with beautiful
                    UI and allow users to express reactions and see if that
                    could make it better than the one which we are currently
                    using.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <Box>
                  <Typography variant="body1">
                    <b>Hemadri Dasari</b> had build this application end to end
                    from Analysis, Planning, UX/UI design, Both FE & BE
                    Implementation including solution & DB design. He has coded
                    close to 1 month developing this beautiful platform in his
                    offline time.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box pt={5}>
            <Box>
              <UnderlineText title="Our Work Locations (1)" />
            </Box>
          </Box>
        </Box>
        <Box mb={2}>
          <Typography variant="h3" component="p" className={addressStyle}>
            Dubai
          </Typography>
          <Typography variant="h6" component="p" className={addressStyle}>
            +971 545678591
          </Typography>
          <Typography
            variant="subtitle1"
            component="p"
            className={addressStyle}
          >
            405, 4th Floor
          </Typography>
          <Typography
            variant="subtitle1"
            component="p"
            className={addressStyle}
          >
            Tulip Hotel Apartments
          </Typography>
        </Box>
      </Container>
      <Box mb={-0.9}>
        <img src={Wave} />
      </Box>
      <Box py={5} className={createAccountStyle}>
        <CreateAccountGrid />
      </Box>
    </React.Fragment>
  );
}
