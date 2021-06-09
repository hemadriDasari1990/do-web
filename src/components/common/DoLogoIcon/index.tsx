import { DASHBOARD, ROOT } from "../../../routes/config";

import Box from "@material-ui/core/Box";
import React from "react";
import doLogo from "../../assets/do-logo.svg";
import { useAuthenticated } from "../../../redux/state/common";
import { useHistory } from "react-router-dom";
import useStyles from "../../styles";

const DoLogoIcon = React.memo((props: any) => {
  const { ...boxProps } = props;
  const { cursor } = useStyles();

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
      <img src={doLogo} width={40} height={40} />
    </Box>
  );
});

export default DoLogoIcon;
