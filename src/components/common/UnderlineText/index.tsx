import React from "react";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  underlineStyle: {
    borderBottom: "4px solid #ea0ba2",
    marginTop: 5,
    width: "20%",
    float: "left",
  },
}));

const UnderlineText = (props: any) => {
  const { title } = props;
  const { underlineStyle } = useStyles();

  return (
    <>
      <Typography gutterBottom variant="h4" component="p">
        {title?.toUpperCase()}
      </Typography>
      <hr className={underlineStyle}></hr>
    </>
  );
};

export default UnderlineText;
