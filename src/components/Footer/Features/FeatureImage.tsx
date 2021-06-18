import Box from "@material-ui/core/Box";
import DoImage from "../../common/Image";
import React from "react";
import Zoom from "@material-ui/core/Zoom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({});

function FeaturesImage(props: any) {
  const { image } = props;
  const {} = useStyles();
  return (
    <React.Fragment>
      <Box textAlign="center">
        <Zoom in={true} timeout={2000}>
          <DoImage
            src={image}
            height="180px"
            width="fit-content"
            placeholderImg={image}
            errorImg={image}
          />
        </Zoom>
      </Box>
    </React.Fragment>
  );
}

export default FeaturesImage;
