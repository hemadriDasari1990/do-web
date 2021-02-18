import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Hidden } from '@material-ui/core';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import { makeStyles } from '@material-ui/core/styles';

const ProfileCard = React.lazy(() => import("../../ProfileCard"));

const useStyles = makeStyles({
    titleStyle: {
        fontSize: "3.5rem",
        lineHeight: 1.143
    },
});

export default function Developers() {
  const { titleStyle } = useStyles();
  
  return (
    <React.Fragment>
        <Container fixed disableGutters>
            <Box pt={5}>
                <Hidden only={["xs"]}>
                    <Grid container>
                        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                            <>
                                <Zoom in={true} timeout={1500}>
                                    <Typography className={titleStyle} variant="h1">Hello,</Typography>
                                </Zoom>
                                <Zoom in={true} timeout={1500}>
                                    <Typography className={titleStyle} variant="h1">we are a team of one developer and one QA engineer</Typography>
                                </Zoom>
                            </>
                        </Grid>
                    </Grid>
                </Hidden>
                <Hidden only={["xl", "lg", "md", "sm"]}>
                    <Grid container>
                        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                            <>
                                <Zoom in={true} timeout={1500}>
                                    <Typography variant="h2">Hello,</Typography>
                                </Zoom>
                                <Zoom in={true} timeout={1500}>
                                    <Typography variant="h2">we are a team of one developer and one QA engineer</Typography>
                                </Zoom>
                            </>
                        </Grid>
                    </Grid>
                </Hidden>
                <Grid container>
                    <Grid item xl={8} lg={8} md={8} sm={12} xs={12}>
                        <>
                            <Box mt={5}>
                                <Typography component="h6" variant="h6">
                                    Hemadri Dasari is a Founder & Developer of Let's do retro Inc. He started as side project in the middle of Jan 2021. He is currently working in a team and not very pleased with the current retrospective board. So he decided to create his own modern respective application with beautiful UI and allow users to express reactions and see if that could make it better than the one which we are currently using.
                                </Typography>
                            </Box>
                            <Box mt={2}>
                                <Typography component="h6" variant="h6">
                                    Hemadri Dasari had build this application end to end from Analysis, Planning, UX/UI design, Both FE & BE Implementation including solution & DB design. He has coded close to 1 month developing this beautiful
                                    platform in his offline time.
                                </Typography>
                            </Box>
                        </>
                    </Grid>
                </Grid>
                
                <Box my={3}>
                    <Typography component="h3" variant="h3">
                    The contributors
                    </Typography>
                </Box>
                <Grid container spacing={2}>
                    <Grid item lg={4} xl={4} md={4} sm={6} xs={12}>
                        {/* <Zoom in={true} timeout={2000}> */}
                            <ProfileCard
                            path="https://media-exp1.licdn.com/dms/image/C4D03AQHe9wGR_VbQ9g/profile-displayphoto-shrink_800_800/0/1608972491530?e=1617235200&v=beta&t=nOg-8ROEMwwu2zBhrsjv2j8PbbA2FWELmLxnwBpEXgw"
                            title="Hemadri Dasari"
                            subTitle="Founder & Developer"
                            fbPath={'https://www.facebook.com/Hemadri.Dasari.1990'}
                            linkedinPath={
                                'https://www.linkedin.com/in/hemadri-dasari-15051990/'
                            }
                            button={true}
                            buttonName="Facebook"
                            buttonOneName="Linekdin"
                            tagLine="Full Stack Developer at Mashreq Bank, Dubai"
                            content=""
                            />
                        {/* </Zoom> */}
                    </Grid>
                    <Grid item lg={4} xl={4} md={4} sm={6} xs={12}>
                        {/* <Zoom in={true} timeout={2000}> */}
                            <ProfileCard
                            path="https://media-exp1.licdn.com/dms/image/C5103AQErndFCozlkYA/profile-displayphoto-shrink_800_800/0/1516337167165?e=1617235200&v=beta&t=dY_-K-1CqvA2c2SXDLkihMvWYVtxyBizYa8Xi_crVcg"
                            title="Sreesha Venkita Krishnan"
                            subTitle="Senior Testing professional"
                            fbPath={'https://www.facebook.com/rajesh.pemmasani'}
                            linkedinPath={
                                'https://www.linkedin.com/in/rajesh-pemmasani-56673170/'
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
        </Container>
    </React.Fragment>
  );
}
