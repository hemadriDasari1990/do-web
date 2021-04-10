import React, { ReactElement } from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) => ({
  hintStyle: {
    backgroundColor: "#0072ff14",
    width: "100%",
    borderRadius: 5,
    minHeight: 40,
  },
  hintDescriptionStyle: {
    padding: 10,
    color: "#0072ff",
  },
}));

interface Props {
  message: string | ReactElement;
}

const HintMessage = (props: Props) => {
  const { message } = props;
  const { hintStyle, hintDescriptionStyle } = useStyles();

  return (
    <React.Fragment>
      <Box className={hintStyle}>
        <Hidden only={["xs"]}>
          <Typography
            variant="h6"
            color="primary"
            className={hintDescriptionStyle}
          >
            {message}
          </Typography>
        </Hidden>
        <Hidden only={["xl", "lg", "md", "sm"]}>
          <Typography
            variant="h6"
            color="primary"
            className={hintDescriptionStyle}
          >
            {message}
          </Typography>
        </Hidden>
      </Box>
    </React.Fragment>
  );
};

export default HintMessage;
