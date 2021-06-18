import DoImage from "../Image";
import React from "react";
import Typography from "@material-ui/core/Typography";
const UnderlineText = React.memo((props: any) => {
  const { title } = props;

  return (
    <>
      <Typography gutterBottom variant="h4" component="p">
        {title?.toUpperCase()}
      </Typography>
      <DoImage
        src="underline.svg"
        placeholderImg="underline.svg"
        errorImg="underline.svg"
      />
    </>
  );
});

export default UnderlineText;
