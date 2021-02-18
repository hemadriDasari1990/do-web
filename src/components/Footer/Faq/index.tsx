import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import React from 'react';
import Typography from '@material-ui/core/Typography';
// import Zoom from '@material-ui/core/Zoom';
import { makeStyles } from '@material-ui/core/styles';

const HintMessage = React.lazy(() => import("../../HintMessage"));
const FAQList = React.lazy(() => import("./list"));

const useStyles = makeStyles({
    titleStyle: {
        fontSize: "3.5rem",
        lineHeight: 1.143
    },
});

export default function FAQ() {
  const { } = useStyles();
  
  return (
    <React.Fragment>
        <Container fixed disableGutters>
            <Box pt={5}>
                {/* <Hidden only={["xs"]}>
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
                </Hidden> */}
                {/* <BarChartIcon /> */}
                <Box>
                    <Typography variant="h2">
                        What’s board and how to create one?
                    </Typography>
                    <Box mt={3}>
                        <Typography variant="body1">
                            Boards mean that anyone that has the URL can access the board, add notes and reactions.
                        </Typography>
                    </Box>
                    <Box pt={2}>
                        <HintMessage message="The URL is not publicly available, and we don't index it on search engines as well. Please be careful with who you share the URL with. If you are dealing with sensitive data, please use private (team) boards, or be sure to delete the public board after you finish your meeting." />
                    </Box>
                    <Box mt={2}>
                        <Typography component="p" variant="body2">
                            Here are all the steps you'll need to go through to create a board.
                        </Typography>
                    </Box>
                    <Box>
                    <FAQList list={["Click on the Create Organization button", "Enter the name of your organization", "Provide unique key (This will be required when logging in with your organization account and do not share with unauthorized persons)", "Set your Password (Do remember this password and do not share with unauthorized persons)", "Set your Password (Do remember this password and do not share with unauthorized persons)", "Click on Register"]} 
                        header="1. Create an Organization account for free"
                    />
                    <FAQList list={["Click on the login button", "Provide unique name", "Provide Password", "Click on Signin"]} 
                        header="2. Login with Organization Account (Unique key and password are required to login)"
                    />
                    <FAQList list={["Click on the “Create Department button", "Enter the name of your department", "Provide description", "Click on Submit"]} 
                        header="3. Create Department"
                    />
                    <FAQList list={["Click on the “Create Project button", "Enter the name of your Project", "Provide description", "Click on Submit"]} 
                        header="4. Create Project"
                    />
                    <FAQList list={["Click on the Create Board button", "Enter the name of your Board", "Provide description", "Provide no of sections you need which will generate sections with default title automatically", "Provide your sprint number", "Enter the duration in HH:MM format. This will be used to indicate the duration of the retro event."]} 
                        header="5. Create Board"
                    />
                </Box>
                <Box py={3}>
                    <Typography variant="h2">
                        How to update deafult section title?
                    </Typography>
                    <FAQList list={["Click on each section menu icon and edit", "Provide new section title and save"]} 
                        header="1. Update Section Title"
                    />
                </Box>
                <Box py={3}>
                    <Typography variant="h2">
                        How to Add a note under each section?
                    </Typography>
                    <FAQList list={["Click on + Create Note button", "Enter the details in note", "Click on Save"]} 
                        header="1. Add a note"
                    />
                </Box>
                <Box py={3}>
                    <Typography variant="h2">
                        How to Add a reaction to note?
                    </Typography>
                    <FAQList list={["Click on smiley icon displayed on each note", `click on your preferred reaction like "I disagree, I love it, +1, +2, Deserves medal" on popover displayed`]} 
                        header="1. Add a reaction"
                    />
                </Box>
                </Box>
            </Box>
        </Container>
    </React.Fragment>
  );
}
