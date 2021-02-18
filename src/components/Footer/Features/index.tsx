import AddIcon from '../../../assets/add.svg'
import AnnonymousIcon from '../../../assets/annonymous.svg'
import BoardIcon from '../../../assets/board.svg'
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CreateIcon from '../../../assets/create.svg'
import DepartmentIcon from '../../../assets/department.svg'
import DragIcon from '../../../assets/drag.svg'
import Grid from '@material-ui/core/Grid';
import ProjectIcon from '../../../assets/project.svg'
import PublicDiscussionIcon from '../../../assets/public-discussion.svg'
import React from 'react';
import ReactionsIcon from '../../../assets/reactions.svg'
import SecureLoginIcon from '../../../assets/secure-login.svg'
import TimeManagementIcon from '../../../assets/time-management.svg'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const FeatureContent = React.lazy(() => import("./FeatureContent"));
const FeatureImage = React.lazy(() => import("./FeatureImage"));

const useStyles = makeStyles({
    titleStyle: {
        fontSize: "3.5rem",
        lineHeight: 1.143
    },
});

export default function Features() {
  const { } = useStyles();
  
  return (
    <React.Fragment>
        <Container fixed disableGutters>
            <Box pt={5}>
                <Box>
                    <Typography variant="h1">
                        An alternative to other retro tools
                    </Typography>
                    <Box mt={3}>
                        <Typography variant="body1">
                            Let's do retro is a free application. Yes! you heard it right it's absolutely free to use.
                        </Typography>
                    </Box>
                    <Box mt={3}>
                        <Typography variant="body1">
                            The biggest difference is that its free, can organize/manage all (departments, projects, boards) under one organization account and express reactions on each note added. 
                            If you’re evaluating Let's do retro vs other retrospective tools out there, then you’re already doing the right thing by finding a tool that will help you manage all your projects and retro boards in one place and maintain the history of everything. Let's do retro is 100% free.
                        </Typography>
                    </Box>
                    <Box mt={3}>
                        <Grid container spacing={2}>
                            <FeatureContent direction="right" title="Create an Organization Account" description="Create unlimited departments, projects, boards in one place under your organization account" />
                            <FeatureImage direction="left" image={CreateIcon} />
                        </Grid>
                    </Box>
                    <Box mt={3}>
                        <Grid container spacing={2}>
                            <FeatureImage direction="left" image={SecureLoginIcon} />
                            <FeatureContent direction="right" title="Comeback and Login anytime" description="You can login anytime with your organization credentials and access everything." />
                        </Grid>
                    </Box>
                    <Box mt={3}>
                        <Grid container spacing={2}>
                            <FeatureContent direction="left" title="Create a Department" description="Create unlimited departments, manage individual departments or 100's at once" />
                            <FeatureImage direction="right" image={DepartmentIcon} />
                        </Grid>
                    </Box>
                    <Box mt={3}>
                        <Grid container spacing={2}>
                            <FeatureImage direction="left" image={ProjectIcon} />
                            <FeatureContent direction="right" title="Create a Project" description="Create unlimited prjects, manage individual projects or 100's at once with unlimited retro boards" />
                        </Grid>
                    </Box>
                    <Box mt={3}>
                        <Grid container spacing={2}>
                            <FeatureContent direction="left" title="Create a retrospective board" description="A retrospective board designed to keep you improving, just a single click and generate sections dynamically and express reactions on each note." />
                            <FeatureImage direction="right" image={BoardIcon} />
                        </Grid>
                    </Box>
                    <Box mt={3}>
                        <Grid container spacing={2}>
                            <FeatureImage direction="left" image={TimeManagementIcon} />
                            <FeatureContent direction="right" title="Timebox the meeting" description="A swiss timer to help you timebox your meetings, start or stop the timer anytime you want." />
                        </Grid>
                    </Box>
                    <Box mt={3}>
                        <Grid container spacing={2}>
                            <FeatureContent direction="left" title="Add a note" description="Collect thoughts, ideas and feedback as notes, with realtime update everything is instantly visible to everyone." />
                            <FeatureImage direction="right" image={AddIcon} />
                        </Grid>
                    </Box>
                    <Box mt={3}>
                        <Grid container spacing={2}>
                            <FeatureImage direction="left" image={ReactionsIcon} />
                            <FeatureContent direction="right" title="Express reactions" description="Let's do retro allows you to express different types of reactions on each note like I disagree, I love it, +1, +2 and Deserve this. With this  make decisions democratically and improve along the way." />
                        </Grid>
                    </Box>
                    <Box mt={3}>
                        <Grid container spacing={2}>
                            <FeatureContent direction="left" title="Run anonymous retrospectives" description="Let them speak fearlessly: Collect feedback annonymously and see the magic of honest feedback." />
                            <FeatureImage direction="right" image={AnnonymousIcon} />
                        </Grid>
                    </Box>
                    <Box mt={3}>
                        <Grid container spacing={2}>
                            <FeatureImage direction="left" image={PublicDiscussionIcon} />
                            <FeatureContent direction="right" title="Public or private" description="Designed to give you flexibility and total control on what to share and with whom. Blazing fast performance for public boards even with 2000+ concurrent sessions." />
                        </Grid>
                    </Box>
                    <Box mt={3}>
                        <Grid container spacing={2}>
                            <FeatureContent direction="left" title="Move notes across the board" description="Drag and drop notes to merge them, move them across the board, your board your rules." />
                            <FeatureImage direction="right" image={DragIcon} />
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </Container>
    </React.Fragment>
  );
}
