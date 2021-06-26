import React, { useState } from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";

import AdminUser from "../common/User";
import Box from "@material-ui/core/Box";
import CardTravelIcon from "@material-ui/icons/CardTravel";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Tour from "reactour";
import Typography from "@material-ui/core/Typography";
import useStyles from "../styles";

const useLocalStyles = makeStyles((theme: Theme) => ({
  iconButtonStyle: {
    background: "#eaeaf121",
    borderRadius: 6,
    padding: 8,
    "&:hover": {
      background: "linear-gradient(180deg,#7997ff 0,#57f 100%) ",
      borderRadius: 6,
      padding: 8,
    },
  },
}));

const WelcomeTour = React.memo((props: any) => {
  const {} = props;
  const { tourStyle } = useStyles();
  const { iconButtonStyle } = useLocalStyles();

  /* React local states */
  const [tourOpen, setTourOpen] = useState(false);

  /* Handler functions */
  const closeTour = () => {
    setTourOpen(false);
  };

  const openTour = () => {
    setTourOpen(true);
  };

  const tourConfig: any = [
    {
      content: () => (
        <Box>
          <AdminUser />
          <Box mt={3}>
            <Typography variant="h5">Welcome to letsdoretro.com</Typography>
          </Box>
          <Box my={1}>
            <Typography variant="body2">
              We're thrilled to count you in the lets do retro community.{" "}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2">
              My name is Hemadri (but please, call me Hemanth), and I'm going to
              show you everything that letsdoretro.com can offer to your team.
              In just 2 mins, you will be able to launch your first
              retrospective board.{" "}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      selector: '[id="drawer-dashboard-view"]',
      content: () => (
        <Box>
          <AdminUser />
          <Box mt={3}>
            <Typography variant="body2">
              We're currently on your <b>team dashboard.</b>
            </Typography>
          </Box>
          <Box my={1}>
            <Typography variant="body2">
              This is the place where you can see the summary of your account,
              recent projects, boards and most importantly quick retro launch in
              seconds.
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2">
              You will also be able to{" "}
              <b>access your recent projects or boards</b> from there.
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      selector: '[id="drawer-create-feedback"]',
      content: () => (
        <Box>
          <AdminUser />
          <Box mt={3}>
            <Typography variant="body2">
              We'd love your feedback on your experience with our Retro tool
            </Typography>
          </Box>
          <Box my={1}>
            <Typography variant="body2">
              You can access this feature to share us the feedback about what
              you like, dis like about the tool and suggestions to improve the
              system.
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      selector: '[id="drawer-create-team"]',
      content: () => (
        <Box>
          <AdminUser />
          <Box mt={3}>
            <Typography variant="body2">
              Your team members do not need to create a retro account to join a
              retrospective board.
            </Typography>
          </Box>
          <Box my={1}>
            <Typography variant="body2">
              You can access this feature to manage teams, members and team
              members.
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      selector: '[id="drawer-manage-account"]',
      content: () => (
        <Box>
          <AdminUser />
          <Box mt={3}>
            <Typography variant="body2">
              You can use this feature to manage your account like you can
              change password, email address, name and security questions
              anytime.
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      selector: '[id="help"]',
      content: () => (
        <Box>
          <AdminUser />
          <Box mt={3}>
            <Typography variant="body2">
              You can use this feature to explore more about retrospectives and
              help you get started.
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      selector: '[id="drawer-user"]',
      content: () => (
        <Box>
          <AdminUser />
          <Box mt={3}>
            <Typography variant="body2">
              You can use this feature to change your avatar. We have plenty of
              cool avatars.
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      selector: '[id="start-quick-retro"]',
      content: () => (
        <Box>
          <AdminUser />
          <Box mt={3}>
            <Typography variant="body2">
              Okay, this is cool, but I would like to launch my first
              retrospective now!
            </Typography>
          </Box>
          <Box my={1}>
            <Typography variant="body2">
              Quick start retro is the awesome feature to launch a retrospective
              board in just 3 steps but, we would recommend to create your team
              first and add your team members to the team. If this is already
              done then you're in right place.
            </Typography>
          </Box>
          <Box my={1}>
            <Typography variant="body2">
              As a first step, select project or if you havent created a project
              then just type your project name or select from the drop down and
              enter description about your project.
            </Typography>
          </Box>
          <Box my={1}>
            <Typography variant="body2">
              In the 2nd step, Choose default board template and choose
              anonymous board if you want to run retrospective anonymously.
            </Typography>
          </Box>
          <Box my={1}>
            <Typography variant="body2">
              In the 3rd step, This step is optional if you've choose
              anonymously. board otherwise select the team that you would like
              to invite to join the restrospective session. That's it click on
              start retro button to create the board.
            </Typography>
          </Box>
        </Box>
      ),
      position: "left",
    },
    {
      content: () => (
        <Box>
          <AdminUser />
          <Box mt={3}>
            <Typography variant="body2">
              You're all set! Now all you have to do is to start your first
              retrospective!
            </Typography>
          </Box>
          <Box my={1}>
            <Typography variant="body2">
              Any questions? Hit me up via the chat module on the bottom right
              corner of the page.
            </Typography>
          </Box>
          <Box my={1}>
            <Typography variant="h5">
              We wish you some excellent retrospectives!
            </Typography>
          </Box>
        </Box>
      ),
    },
  ];

  return (
    <React.Fragment>
      <Tooltip arrow title="Welcome tour" placement="right">
        <IconButton
          size="medium"
          classes={{ root: iconButtonStyle }}
          onClick={() => openTour()}
        >
          <CardTravelIcon id="drawer-welcome-tour" color="secondary" />
        </IconButton>
      </Tooltip>

      <Tour
        onRequestClose={closeTour}
        steps={tourConfig}
        isOpen={tourOpen}
        // maskClassName="mask"
        rounded={5}
        accentColor="#57f"
        className={tourStyle}
      />
    </React.Fragment>
  );
});

export default WelcomeTour;
