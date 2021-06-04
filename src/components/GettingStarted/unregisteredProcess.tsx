import React, { useEffect } from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
import InstantRetroGrid from "../Home/instantRetroGrid";
// import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import useStyles from "../styles";

const useLocalStyles = makeStyles((theme: Theme) => ({}));

const UnregisteredProcess = () => {
  const {} = useLocalStyles();
  const {} = useStyles();

  useEffect(() => {}, []);

  return (
    <Box mt={5}>
      <Box>
        <Box mb={3}>
          <Typography variant="h1">Fun, Easy & 100% Free!</Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="h4">
            Take your retrospectives from good to great without driving yourself
            crazy. All it takes is few seconds.
          </Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="h4">
            Save yourself endless amounts of time - before, during, and after
            the retrospective meeting.
          </Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="h4">
            Letsdoretro.com is 100% free online retrospective tool, so there’s
            nothing to lose and a lot to gain.
          </Typography>
        </Box>
        <InstantRetroGrid
          title="Quick Start Retro"
          subTitle="Free forever — no signup required"
        />
      </Box>
    </Box>
  );
};

export default UnregisteredProcess;
