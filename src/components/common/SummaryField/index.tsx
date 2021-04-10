import Box from "@material-ui/core/Box";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(() => ({
  titleStyle: {
    color: "#777e8c",
    fontWeight: "normal",
  },
  valueStyle: {
    // color: "#ff6584",
  },
}));

const SummaryField = (props: any) => {
  const { title, value } = props;
  const { titleStyle, valueStyle } = useStyles();
  return (
    <Box flexDirection="column">
      <Box>
        <Typography className={titleStyle} variant="body2">
          {title}
        </Typography>
      </Box>
      <Box>
        {typeof value === "object" ? (
          value
        ) : (
          <Typography className={valueStyle} variant="subtitle1">
            {value}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default SummaryField;
