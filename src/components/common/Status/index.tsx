import Box from "@material-ui/core/Box";
import React from "react";
import Typography from "@material-ui/core/Typography";
import useStatusStyles from "../../styles/status";
const Status = (props: any) => {
  const { value } = props;
  const {
    pendingStyle,
    pendingTextStyle,
    inProgressStyle,
    inProgressTextStyle,
    completedStyle,
    completedTextStyle,
    draftStyle,
    draftTextStyle,
    statusBoxStyle,
    statusTextStyle,
  } = useStatusStyles();

  const getBoxStyle = () => {
    let style = draftStyle;
    switch (value?.toLowerCase()) {
      case "draft":
        style = draftStyle;
        break;
      case "pending":
        style = pendingStyle;
        break;
      case "inprogress":
        style = inProgressStyle;
        break;
      case "completed":
        style = completedStyle;
        break;
      default:
        break;
    }
    return style;
  };

  const getTextStyle = () => {
    let style = draftTextStyle;
    switch (value?.toLowerCase()) {
      case "draft":
        style = draftTextStyle;
        break;
      case "pending":
        style = pendingTextStyle;
        break;
      case "inprogress":
        style = inProgressTextStyle;
        break;
      case "completed":
        style = completedTextStyle;
        break;
      default:
        break;
    }
    return style;
  };

  const getValue = () => {
    let title = "";
    switch (value?.toLowerCase()) {
      case "draft":
        title = "DRAFT";
        break;
      case "pending":
        title = "TODO";
        break;
      case "inprogress":
        title = "IN PROGRESS";
        break;
      case "completed":
        title = "COMPLETED";
        break;
      default:
        break;
    }
    return title;
  };

  return (
    <Box className={`${statusBoxStyle} ${getBoxStyle()}`}>
      <Typography
        className={`${statusTextStyle} ${getTextStyle()}`}
        variant="subtitle2"
      >
        {getValue()}
      </Typography>
    </Box>
  );
};

export default Status;
