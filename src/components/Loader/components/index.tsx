import CircularProgress, { CircularProgressProps } from '@material-ui/core/CircularProgress';

import Box from '@material-ui/core/Box'
import React from 'react'

// import { makeStyles } from '@material-ui/core/styles'

/* Inspired by the Facebook spinners. */
// const useStylesFacebook = makeStyles({
//   root: {
//     position: 'relative',
//   },
//   top: {
//     color: '#eef3fd',
//   },
//   bottom: {
//     color: '#0072ff',
//     animationDuration: '550ms',
//     position: 'absolute',
//     left: 0,
//   },
// })

function FacebookProgress(props: CircularProgressProps) {
  // const classes = useStylesFacebook();

  return (
    <Box justifyContent="center" alignItems="center">
      <CircularProgress
        {...props}
      />
    </Box>
  )
}

const Loader = (props: any) => {
  const { showLoader } = props;
    return (
      <React.Fragment>
        {showLoader && <FacebookProgress />}
      </React.Fragment>
    )
}

export default Loader;
