import { Theme, makeStyles } from "@material-ui/core/styles";

import Backdrop from "@material-ui/core/Backdrop";
import Box from "@material-ui/core/Box";
import DoImage from "../../common/Image";
import React from "react";
import loader from "../../../assets/loader.svg";

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

const Loader = React.memo((props: any) => {
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
          <DoImage src={loader} placeholderImg={loader} errorImg={loader} />
        </Box>
      </Backdrop>
    );
  }
  if (enable && !backdrop && showInline) {
    return (
      <Box>
        <DoImage src={loader} placeholderImg={loader} errorImg={loader} />
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
        <DoImage src={loader} placeholderImg={loader} errorImg={loader} />
      </Box>
    );
  }
  return null;
});

export default Loader;
