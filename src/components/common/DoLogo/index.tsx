import { DASHBOARD, ROOT } from "../../../routes/config";

import Box from "@material-ui/core/Box";
import React from "react";
import SportsVolleyballIcon from "@material-ui/icons/SportsVolleyball";
import Typography from "@material-ui/core/Typography";
import { useAuthenticated } from "../../../redux/state/common";
import { useHistory } from "react-router-dom";
import useStyles from "../../styles";

const DoLogo = (props: any) => {
  const { color, ...boxProps } = props;
  const { logoTextStyle, logoIconStyle, cursor } = useStyles();

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
      <Box mr={1}>
        <Typography color={color} className={logoTextStyle}>
          let's
        </Typography>
      </Box>
      <Box>
        <Typography color={color} className={logoTextStyle}>
          d
        </Typography>
      </Box>
      <Box mt={2} mr={1} ml={0.2}>
        <SportsVolleyballIcon
          className={logoIconStyle}
          color="secondary"
          fontSize="small"
        />
      </Box>
      <Box>
        <Typography color={color} className={logoTextStyle}>
          {" "}
          retr
        </Typography>
      </Box>
      <Box mt={2} ml={0.2}>
        <SportsVolleyballIcon className={logoIconStyle} color="secondary" />
      </Box>
    </Box>
  );
};

export default DoLogo;
