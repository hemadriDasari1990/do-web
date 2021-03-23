import Box from "@material-ui/core/Box";
import React from "react";
import Typography from "@material-ui/core/Typography";
import useStyles from "../../styles";
import SportsVolleyballIcon from "@material-ui/icons/SportsVolleyball";
import { DASHBOARD, ROOT } from "../../../routes/config";
import { useAuthenticated } from "../../../redux/state/common";
import { useHistory } from "react-router-dom";

const DoLogo = (props: any) => {
  const { ...boxProps } = props;
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
      <Box mr={1} display="flex">
        <Typography variant="h1" className={logoTextStyle}>
          let
        </Typography>
        <Typography variant="h1" color="primary" className={logoTextStyle}>
          '
        </Typography>
        <Typography variant="h1" className={logoTextStyle}>
          s
        </Typography>
      </Box>
      <Box>
        <Typography variant="h1" className={logoTextStyle}>
          d
        </Typography>
      </Box>
      <Box mt={1} mr={1}>
        <SportsVolleyballIcon className={logoIconStyle} color="secondary" />
      </Box>
      <Box>
        <Typography variant="h1" className={logoTextStyle}>
          {" "}
          retr
        </Typography>
      </Box>
      <Box mt={1}>
        <SportsVolleyballIcon className={logoIconStyle} color="secondary" />
      </Box>
    </Box>
  );
};

export default DoLogo;
