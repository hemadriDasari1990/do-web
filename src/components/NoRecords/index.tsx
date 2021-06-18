import Box from "@material-ui/core/Box";
import DoImage from "../common/Image";
import Empty from "../../assets/empty.svg";
import React from "react";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";

function NoRecords(props: any) {
  const { message, hideImage, icon } = props;
  return (
    <Box style={{ textAlign: "center" }}>
      {!hideImage && (
        <Zoom in={true} timeout={2000}>
          <DoImage
            src={icon || Empty}
            height="200px"
            width="fit-content"
            placeholderImg={icon || Empty}
            errorImg={icon || Empty}
          />
        </Zoom>
      )}
      <Box mt={3}>
        <Typography variant="h4">{message}</Typography>
      </Box>
    </Box>
  );
}

export default NoRecords;
