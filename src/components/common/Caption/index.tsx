import Box from "@material-ui/core/Box";
import React from "react";
import Typography from "@material-ui/core/Typography";
import useStyles from "../../styles";

const Caption = React.memo((props: any) => {
  const { title } = props;
  const { n40, captionTextStyle } = useStyles();

  return (
    <Box>
      <Typography className={`${captionTextStyle} ${n40}`}>
        {title?.toUpperCase()}
      </Typography>
    </Box>
  );
});

export default Caption;
