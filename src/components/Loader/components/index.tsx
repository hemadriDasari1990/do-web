import { Theme, makeStyles } from "@material-ui/core/styles";

import Backdrop from "@material-ui/core/Backdrop";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";

/* Inspired by the Facebook spinners. */
const useStyles = makeStyles((theme: Theme) => ({
  backdropStyle: {
    zIndex: theme.zIndex.drawer + 1,
  },
  loaderStyle: {
    left: "50%",
    top: "50%",
    position: "fixed",
  },
}));

const Loader = (props: any) => {
  const { backdropStyle, loaderStyle } = useStyles();
  const { backdrop, enable, showInline } = props;

  if (enable && backdrop) {
    return (
      <Backdrop className={backdropStyle} open={enable}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <CircularProgress />
        </Box>
      </Backdrop>
    );
  }
  if (enable && !backdrop && showInline) {
    return (
      <Box>
        <CircularProgress size={20} disableShrink variant="indeterminate" />
      </Box>
    );
  }

  if (enable && !backdrop) {
    return (
      <Box
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        className={loaderStyle}
      >
        <CircularProgress />
      </Box>
    );
  }
  return null;
};

export default Loader;
