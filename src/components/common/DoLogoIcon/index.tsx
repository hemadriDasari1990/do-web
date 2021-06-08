import { DASHBOARD, ROOT } from "../../../routes/config";

import Box from "@material-ui/core/Box";
import FlashOnIcon from "@material-ui/icons/FlashOn";
import React from "react";
import { useAuthenticated } from "../../../redux/state/common";
import { useHistory } from "react-router-dom";
import useStyles from "../../styles";

const DoLogoIcon = React.memo((props: any) => {
  const { ...boxProps } = props;
  const { logoIconStyle, cursor } = useStyles();

  /* Redux hooks */
  const authenticated = useAuthenticated();
  const history = useHistory();

  const refreshDashboard = () => {
    if (authenticated) {
      history.push(DASHBOARD);
      return;
    }
    history.push(ROOT);
  };

  return (
    <Box
      display="flex"
      className={cursor}
      onClick={() => refreshDashboard()}
      {...boxProps}
    >
      <FlashOnIcon className={logoIconStyle} color="secondary" />
    </Box>
  );
});

export default DoLogoIcon;
