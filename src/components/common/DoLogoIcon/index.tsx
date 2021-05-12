import { DASHBOARD, ROOT } from "../../../routes/config";

import Box from "@material-ui/core/Box";
import React from "react";
import { useAuthenticated } from "../../../redux/state/common";
import { useHistory } from "react-router-dom";
import useStyles from "../../styles";
import FlashOnIcon from "@material-ui/icons/FlashOn";

const DoLogoIcon = (props: any) => {
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
      <Box mt={1} mr={1} ml={1}>
        <FlashOnIcon className={logoIconStyle} color="secondary" />
      </Box>
    </Box>
  );
};

export default DoLogoIcon;
