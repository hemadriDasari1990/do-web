import Box from "@material-ui/core/Box";
import Empty from "../../assets/empty.svg";
import React from "react";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";

function NoRecords(props: any) {
  const { message } = props;
  return (
    <Box style={{ textAlign: "center" }}>
      <Zoom in={true} timeout={2000}>
        <img src={Empty} height="200px" width="fit-content" />
      </Zoom>
      <Box mt={3}>
        <Typography variant="h4">"Hey!"</Typography>
      </Box>
      <Box mt={3}>
        <Typography variant="h4">{message}</Typography>
      </Box>
    </Box>
  );
}

export default NoRecords;
