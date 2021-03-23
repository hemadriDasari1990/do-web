import React from "react";

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import useStyles from "../../styles";

const Caption = (props: any) => {
  const { title } = props;
  const { n30, captionTextStyle } = useStyles();

  return (
    <Box>
      <Typography className={`${captionTextStyle} ${n30}`}>
        {title?.toUpperCase()}
      </Typography>
    </Box>
  );
};

export default Caption;
