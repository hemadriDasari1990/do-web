import { DASHBOARD, ROOT } from "../../../routes/config";

import Box from "@material-ui/core/Box";
import DoImage from "../Image";
import React from "react";
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
      <DoImage
        src="do-logo.svg"
        width={35}
        height={35}
        placeholderImg="do-logo.svg"
        errorImg="do-logo.svg"
      />
    </Box>
  );
});

export default DoLogoIcon;
