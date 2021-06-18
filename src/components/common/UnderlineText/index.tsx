import DoImage from "../Image";
import React from "react";
import Typography from "@material-ui/core/Typography";
import underlineIcon from "../../../assets/underline.svg";
const UnderlineText = React.memo((props: any) => {
  const { title } = props;

  return (
    <>
      <Typography gutterBottom variant="h4" component="p">
        {title?.toUpperCase()}
      </Typography>
      <DoImage
        src={underlineIcon}
        placeholderImg={underlineIcon}
        errorImg={underlineIcon}
      />
    </>
  );
});

export default UnderlineText;
