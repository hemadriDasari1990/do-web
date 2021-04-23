import { DASHBOARD, ROOT } from "../../../routes/config";

import Badge from "@material-ui/core/Badge";
import Box from "@material-ui/core/Box";
import React from "react";
import SportsVolleyballIcon from "@material-ui/icons/SportsVolleyball";
import Typography from "@material-ui/core/Typography";
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
  const { color, ...boxProps } = props;
  const { logoTextStyle, logoIconStyle, cursor } = useStyles();
  const { badgeStyle } = useLocalStyles();

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
        <Badge
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          className={badgeStyle}
          badgeContent="Beta"
        >
          <SportsVolleyballIcon className={logoIconStyle} color="secondary" />
        </Badge>
      </Box>
    </Box>
  );
};

export default DoLogo;
