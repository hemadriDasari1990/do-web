import React from "react";

import Box from "@material-ui/core/Box";

import ScrumBoard from "../../../assets/board.svg";
import Zoom from "@material-ui/core/Zoom";
import Hidden from "@material-ui/core/Hidden";
import ProjectIcon from "../../../assets/project.svg";

const BottomIllustrations = () => {
  return (
    <React.Fragment>
      <Box display="flex" justifyContent="space-between" mb={-0.9}>
        <Hidden only={["xs"]}>
          <Box>
            <Zoom in={true} timeout={2000}>
              <img src={ScrumBoard} height={300} width="fit-content" />
            </Zoom>
          </Box>
        </Hidden>
        <Hidden only={["xs"]}>
          <Box>
            <Zoom in={true} timeout={2000}>
              <img src={ProjectIcon} height={300} width="fit-content" />
            </Zoom>
          </Box>
        </Hidden>
      </Box>
    </React.Fragment>
  );
};

export default BottomIllustrations;
