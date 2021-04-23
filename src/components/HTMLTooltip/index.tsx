import { Theme, withStyles } from "@material-ui/core/styles";

import React from "react";
import Tooltip from "@material-ui/core/Tooltip";

const CustomHtmlTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    width: "fit-content",
    borderRadius: 6,
    background: "#1a73e8",
    "& .MuiTooltip-arrow": {
      "&::before": {
        background: "#1a73e8",
      },
    },
  },
}))(Tooltip);

const HtmlTooltip = (props: any) => {
  return <CustomHtmlTooltip {...props} />;
};

export default HtmlTooltip;
