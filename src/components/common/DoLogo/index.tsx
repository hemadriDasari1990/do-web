import { DASHBOARD, ROOT } from "../../../routes/config";

import Badge from "@material-ui/core/Badge";
import Box from "@material-ui/core/Box";
import DoImage from "../Image";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useAuthenticated } from "../../../redux/state/common";
import { useHistory } from "react-router-dom";
import useStyles from "../../styles";

const useLocalStyles = makeStyles(() => ({
  badgeStyle: {
    "& .MuiBadge-badge": {
      top: 5,
      color: "#ffc800",
      fontSize: 15,
    },
  },
}));
const DoLogo = React.memo((props: any) => {
  const { color, hideBadge, ...boxProps } = props;
  const { logoTextStyle, cursor } = useStyles();
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
      <Box mt={0.5}>
        <DoImage
          src="do-logo.svg"
          width={35}
          height={35}
          placeholderImg="do-logo.svg"
          errorImg="do-logo.svg"
        />
      </Box>
      <Box mx={1}>
        <Badge
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          className={badgeStyle}
          badgeContent="Beta"
        >
          <Typography color={color} className={logoTextStyle}>
            Let's Do Retro
          </Typography>
        </Badge>
      </Box>
    </Box>
  );
});

export default DoLogo;
