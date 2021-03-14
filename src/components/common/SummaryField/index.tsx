import React, { Suspense } from "react";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  titleStyle: {
    color: "#777e8c",
    fontWeight: "normal",
  },
  valueStyle: {
    color: "#192a4d",
  },
}));

const SummaryField = (props: any) => {
  const { title, value } = props;
  const { titleStyle, valueStyle } = useStyles();
  return (
    <Suspense fallback={<div />}>
      <Box>
        <Typography className={titleStyle} variant="body2">
          {title}
        </Typography>
      </Box>
      <Box>
        <Typography className={valueStyle} variant="h5">
          {value}
        </Typography>
      </Box>
    </Suspense>
  );
};

export default SummaryField;
