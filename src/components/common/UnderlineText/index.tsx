import React from "react";
import Typography from "@material-ui/core/Typography";
import underlineIcon from "../../../assets/underline.svg";
const UnderlineText = (props: any) => {
  const { title } = props;

  return (
    <>
      <Typography gutterBottom variant="h4" component="p">
        {title?.toUpperCase()}
      </Typography>
      <img src={underlineIcon} />
    </>
  );
};

export default UnderlineText;
