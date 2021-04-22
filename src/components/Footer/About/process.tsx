import React, { useEffect } from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Step from "./step";
import Typography from "@material-ui/core/Typography";
import useStyles from "../../styles";

const useLocalStyles = makeStyles((theme: Theme) => ({
  hintTextStyle: {
    color: "#172b4d3d",
    fontWeight: 700,
  },
}));

const Process = () => {
  const { hintTextStyle } = useLocalStyles();
  const { dotBannerStyle, titleStyle } = useStyles();
  useEffect(() => {}, []);

  return (
    <Box>
      <Container>
        <Box mb={5} textAlign="center">
          <Typography className={titleStyle} variant="h1">
            Our history
          </Typography>
        </Box>
      </Container>
      <Box className={dotBannerStyle}>
        <Container>
          <Grid container spacing={3}>
            <Grid item xl={3} lg={3} md={3}>
              <Step
                title="2021"
                subTitle="Hemadri D Initiated"
                description="21st JAN"
                index={0}
              />
            </Grid>
            <Grid item xl={3} lg={3} md={3}>
              <Step
                title="2021"
                subTitle="Development started"
                description="22nd JAN"
                index={1}
              />
            </Grid>
            <Grid item xl={3} lg={3} md={3}>
              <Step
                title="2021"
                subTitle="Setup completed"
                description="25th JAN"
                index={2}
              />
            </Grid>
            <Grid item xl={3} lg={3} md={3}>
              <Step
                title="2021"
                subTitle="Initial version released"
                description="Mid FEB"
                index={3}
              />
            </Grid>
          </Grid>
          <Grid container spacing={6}>
            <Grid item xl={1} lg={1} md={1}></Grid>
            <Grid item xl={3} lg={3} md={3}>
              <Step
                title="2021"
                subTitle="Demoed to Sreesha V"
                description="Mid Feb"
                index={0}
              />
            </Grid>
            <Grid item xl={3} lg={3} md={3}>
              <Step
                title="2021"
                subTitle="Suggestions received"
                description="Mid FEB"
                index={4}
              />
            </Grid>
            <Grid item xl={3} lg={3} md={3}>
              <Step
                title="2021"
                subTitle="Suggestions implemented"
                description="2nd MARCH"
                index={1}
              />
            </Grid>
            <Grid item xl={3} lg={3} md={3}>
              <Step
                title="2021"
                subTitle="Redesigned theme"
                description="5th MARCH"
                index={5}
              />
            </Grid>
            <Grid item xl={3} lg={3} md={3}>
              <Step
                title="2021"
                subTitle="Gained more confidence"
                description="3rd APRIL"
                index={2}
              />
            </Grid>
            <Grid item xl={3} lg={3} md={3}>
              <Box mt={3}>
                <Typography
                  className={`${titleStyle} ${hintTextStyle}`}
                  variant="h1"
                >
                  To be continued...
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Process;
