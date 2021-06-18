import BoardIcon from "../../../assets/board";
import Box from "@material-ui/core/Box";
import DoImage from "../../common/Image";
import Hidden from "@material-ui/core/Hidden";
import React from "react";
import Zoom from "@material-ui/core/Zoom";

const BottomIllustrations = () => {
  return (
    <React.Fragment>
      <Box display="flex" justifyContent="space-between" mb={-0.9}>
        <Hidden only={["xs"]}>
          <Box>
            <Zoom in={true} timeout={2000}>
              <BoardIcon
                stickyNoteColor="#ffc800"
                stickyNoteColor1="#fd7171"
                stickyNoteColor2="#7b68ee"
                stickyNoteColor3="#49ccf9"
                stickyNoteColor4="#00b884"
                hairColor="#2f2e41"
                borderColor="#2f2e41"
                primarySkinColor="#ffb8b8"
                secondarySkinColor="#a0616a"
                shoeColor="#2f2e41"
                shirtColor="#cccccc"
                cornerCircleColor="#cccccc"
                width={423}
                height={300}
              />
            </Zoom>
          </Box>
        </Hidden>
        <Hidden only={["xs"]}>
          <Box pb={-3}>
            <Zoom in={true} timeout={2000}>
              <DoImage
                src="add-note.svg"
                height={300}
                width={550}
                placeholderImg="add-note.svg"
                errorImg="add-note.svg"
              />
            </Zoom>
          </Box>
        </Hidden>
      </Box>
    </React.Fragment>
  );
};

export default BottomIllustrations;
