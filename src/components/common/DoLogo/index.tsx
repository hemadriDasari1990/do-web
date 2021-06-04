import { DASHBOARD, ROOT } from "../../../routes/config";

import Box from "@material-ui/core/Box";
import React from "react";
import Typography from "@material-ui/core/Typography";
import doLogo from "../../../assets/do-logo.svg";
import { makeStyles } from "@material-ui/core/styles";
import { useAuthenticated } from "../../../redux/state/common";
import { useHistory } from "react-router-dom";
import useStyles from "../../styles";

const useLocalStyles = makeStyles(() => ({
  badgeStyle: {
    "& .MuiBadge-badge": {
      left: 10,
      color: "#ffc800",
    },
  },
}));
const DoLogo = (props: any) => {
  const { color, hideBadge, ...boxProps } = props;
  const { logoTextStyle, cursor } = useStyles();
  const {} = useLocalStyles();

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
      <Box mt={0.5}>
        <img src={doLogo} width={45} height={45} />
      </Box>
      <Box mx={1}>
        <Typography color={color} className={logoTextStyle}>
          lets do retro
        </Typography>
      </Box>
    </Box>
  );
};

export default DoLogo;
