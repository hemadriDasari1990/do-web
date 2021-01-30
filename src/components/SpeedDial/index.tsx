import React, { useState } from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

const Feedback = React.lazy(() => import("../Feedback"));

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    transform: 'translateZ(0px)',
    flexGrow: 1,
  },
  exampleWrapper: {
    position: 'relative',
    marginTop: theme.spacing(3),
    height: 380,
  },
  speedDial: {
    position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
  },
  speedDialAction: {
    // backgroundImage: 'linear-gradient(90deg, #0072ff 0%, #0095ffba 100%);'
  }
}));

function SpeedDials() {
  const { root, exampleWrapper, speedDial, speedDialAction } = useStyles();
  
  /* Local States */
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    setOpen(true);
  };

  const renderPopper = () => (
    <Paper style={{width: "fit-content"}}>
      <Feedback showFeedbacks={false} />
    </Paper>
  )

  return (
    <Box className={root}>
      <Box className={exampleWrapper}>
        <SpeedDial
          ariaLabel="SpeedDial example"
          className={speedDial}
          icon={<QuestionAnswerIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          direction="up"
          color="primary"
        >
          <SpeedDialAction
            key="feedback"
            icon={renderPopper()}
            tooltipTitle="Feedback"
            className={speedDialAction}
            color="primary"
            onClick={() => handleClick()}
          />
        </SpeedDial>
      </Box>
    </Box>
  );
}

export default SpeedDials;