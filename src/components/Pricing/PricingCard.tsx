import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import React from "react";
import { SIGNUP } from "../../routes/config";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import useStyles from "../styles";

const useLocalStyles = makeStyles({
  paperStyle: {
    borderRadius: 6,
    boxShadow: "0px 12px 15px rgb(140 152 164 / 10%)",
    wordWrap: "break-word",
    backgroundColor: "#fff",
    backgroundClip: "border-box",
    padding: 10,
    height: "100%",
  },
  greenStyle: {
    color: "#27ae60",
  },
  buttonStyle: {
    height: 45,
    "& .MuiButton-label": {
      justifyContent: "center",
    },
  },
});

const PricingCard = () => {
  const {} = useStyles();
  const { paperStyle, buttonStyle } = useLocalStyles();

  const history = useHistory();

  const handleGetStarted = () => {
    history.push(SIGNUP);
  };

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
          <Paper className={paperStyle}>
            <Box display="flex" justifyContent="space-between" px={2} pb={2}>
              <Typography variant="h1">Free</Typography>
              <Typography variant="h1">$0</Typography>
            </Box>
            <Box>
              <Divider />
            </Box>
            <Box mt={3}>
              <PricingList message="Unlimited Notes" />
              <PricingList message="Upto 20 members" />
              <PricingList message="Unlimited activity log" />
              <PricingList message="Upto 2 projects" />
              <PricingList message="Unlimited boards on 2 projects" />
              <PricingList message="Upto 10 sections" />
              <PricingList message="Upto 2 teams" />
              <Box textAlign="center" mt={7}>
                <Button
                  variant="contained"
                  color="primary"
                  className={buttonStyle}
                  onClick={() => handleGetStarted()}
                  fullWidth
                >
                  <Typography variant="h4" color="secondary">
                    Get Started
                  </Typography>
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
          <Paper className={paperStyle}>
            <Box display="flex" justifyContent="space-between" px={2} pb={2}>
              <Typography variant="h1">Unlimited</Typography>
              <Typography variant="h1">$7</Typography>
            </Box>
            <Box>
              <Divider />
            </Box>
            <Box mt={3}>
              <PricingList message="Unlimited Notes" />
              <PricingList message="Unlimited teams & members" />
              <PricingList message="Unlimited Projects & boards" />
              <PricingList message="Unlimited activity log" />
              <PricingList message="Upto 10 sections" />
              <PricingList message="Invite teams" />
              <PricingList message="Board Customizations" />
              <Box textAlign="center" mt={7}>
                <Button
                  color="primary"
                  className={buttonStyle}
                  disabled
                  fullWidth
                >
                  <Typography variant="h4" color="primary">
                    Coming In Future
                  </Typography>
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
          <Paper className={paperStyle}>
            <Box display="flex" justifyContent="space-between" px={2} pb={2}>
              <Typography variant="h1">Enterprise</Typography>
              <Typography variant="h1">$$</Typography>
            </Box>
            <Box>
              <Divider />
            </Box>
            <Box mt={3}>
              <PricingList message="Everything From Unlimited Plan" />
              <PricingList message="API & SSO Access" />
              <PricingList message="Action Items" />
              <PricingList message="Meeting Notes" />
              <PricingList message="Organization wide permissions" />
              <PricingList message="Organization visible boards" />
              <PricingList message="Priority Support & Onboarding" />
              <Box textAlign="center" mt={7}>
                <Button
                  color="primary"
                  className={buttonStyle}
                  disabled
                  fullWidth
                >
                  <Typography variant="h4" color="primary">
                    Coming In Future
                  </Typography>
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default React.memo(PricingCard);

export const PricingList = (props: any) => {
  const { message } = props;
  const { greenStyle } = useLocalStyles();
  return (
    <Box display="flex" mt={1.5} mx={2}>
      <Box mx={1}>
        <CheckCircleIcon className={greenStyle} />
      </Box>
      <Box mx={1} mt={-0.5}>
        <Typography variant="h5">{message}</Typography>
      </Box>
    </Box>
  );
};

React.memo(PricingList);
