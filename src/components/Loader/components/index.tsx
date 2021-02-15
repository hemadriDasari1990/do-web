import { Theme, makeStyles } from '@material-ui/core/styles';

import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react'

/* Inspired by the Facebook spinners. */
const useStyles = makeStyles((theme: Theme) => ({
  backdropStyle: {
    zIndex: theme.zIndex.drawer + 1
  },
}));

const Loader = (props: any) => {
  const { backdropStyle } = useStyles();
  const { backdrop, enable } = props;

  if(enable && backdrop){
    return (
      <Backdrop className={backdropStyle} open={enable}>
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
          <CircularProgress />
        </Box>
      </Backdrop>
    )
  }

  if(enable && !backdrop){
    return (
        <Box justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
    )
  }
  return null;
}

export default Loader;
