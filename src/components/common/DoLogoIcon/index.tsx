import { COMMERCIAL, INDIVIDUAL } from "../../../util/constants";
import {
  COMMERCIAL_DASHBOARD,
  INDIVIDUAL_DASHBOARD,
  ROOT,
} from "../../../routes/config";

import Box from "@material-ui/core/Box";
import React from "react";
import SportsVolleyballIcon from "@material-ui/icons/SportsVolleyball";
import { useAuthenticated } from "../../../redux/state/common";
import { useHistory } from "react-router-dom";
import { useLogin } from "../../../redux/state/login";
import useStyles from "../../styles";

const DoLogoIcon = (props: any) => {
  const { ...boxProps } = props;
  const { logoIconStyle, cursor } = useStyles();

  /* Redux hooks */
  const authenticated = useAuthenticated();
  const history = useHistory();
  const { accountType } = useLogin();

  const refreshDashboard = () => {
    if (authenticated && accountType === INDIVIDUAL) {
      history.push(INDIVIDUAL_DASHBOARD);
      return;
    }
    if (authenticated && accountType === COMMERCIAL) {
      history.push(COMMERCIAL_DASHBOARD);
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
        <SportsVolleyballIcon className={logoIconStyle} color="secondary" />
      </Box>
    </Box>
  );
};

export default DoLogoIcon;
