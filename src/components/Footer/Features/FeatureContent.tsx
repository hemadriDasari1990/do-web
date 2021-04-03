import Box from "@material-ui/core/Box";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  descriptionStyle: {
    boxSizing: "border-box",
    fontWeight: 500,
    // color: rgb(23, 30, 48);
    textAlign: "center",
    fontSize: 16,
  },
  titleStyle: {
    boxSizing: "border-box",
    fontWeight: 600,
    color: "rgb(23, 30, 48)",
    textAlign: "center",
    fontSize: 24,
  },
});

function FeaturesContent(props: any) {
  const { title, description } = props;
  const { titleStyle, descriptionStyle } = useStyles();
  return (
    <React.Fragment>
      <Box mt={5}>
        <Typography className={titleStyle}>{title}</Typography>
      </Box>
      <Box mt={1} mb={5}>
        <Typography className={descriptionStyle}>{description}</Typography>
      </Box>
    </React.Fragment>
  );
}

export default FeaturesContent;
