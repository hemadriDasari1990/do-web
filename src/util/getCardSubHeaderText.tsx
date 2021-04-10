import Box from "@material-ui/core/Box";
import React from "react";
import Typography from "@material-ui/core/Typography";
import getPastTime from "./getPastTime";
export default function getCardSubHeaderText(timestamp: string) {
  return (
    <Box display="flex">
      <Box>
        <Typography variant="body2">{getPastTime(timestamp)}</Typography>
      </Box>
    </Box>
  );
}
