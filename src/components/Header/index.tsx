import { LOGIN, USER } from "../../routes/config";
import React, { useEffect, useState } from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";
import { useHistory, useLocation } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { Container } from "@material-ui/core";
import DoLogo from "../common/DoLogo";
import DoLogoIcon from "../common/DoLogo";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
import { useAuthenticated } from "../../redux/state/common";

const PersistentDrawerLeft = React.lazy(() => import("../Drawer/DrawerLeft"));

const useLocalStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
  },
  appBarStyle: (props: any) => ({
    height: !props.authenticated ? 60 : 0,
    width: "100%",
    paddingLeft: 10,
    paddingRight: 0,
    background: "#232f3e",
    [theme.breakpoints.up("md")]: {
      width: "100%",
    },
    [theme.breakpoints.down("xs")]: {
      background: "#fff !important",
    },
  }),
  toolbar: (props: any) => ({
    minHeight: !props.authenticated ? 60 : 0,
  }),
}));

const Header = () => {
  const userAuthenticated = useAuthenticated();
  const history = useHistory();
  const location = useLocation();
  const pathname = location.pathname as string;
  // const { name } = useUser();

  /* Local state */
  const [authenticated, setAuthenticated] = useState(userAuthenticated);
  const showLogo =
    !authenticated &&
    pathname?.toLowerCase() !== "/login" &&
    pathname?.toLowerCase() !== "/signup";
  const { root, appBarStyle, toolbar } = useLocalStyles({ authenticated });

  useEffect(() => {
    setAuthenticated(userAuthenticated);
  }, [userAuthenticated]);

  const handleCreateUser = () => {
    history.push(USER);
  };

  const handleLogin = () => {
    history.push(LOGIN);
  };

  const renderAppbar = () => {
    return (
      <Box mt={1} display="flex" justifyContent="space-between">
        <Hidden only={["xl", "lg", "md", "sm"]}>
          <DoLogoIcon />
        </Hidden>
        {showLogo && (
          <Hidden only={["xs"]}>
            {" "}
            <DoLogo color="secondary" />
          </Hidden>
        )}
        {!authenticated && pathname !== "/login" && pathname !== "/signup" ? (
          <Box display="flex" justifyContent="space-between">
            <Box mt={0.4} mr={2}>
              <Button
                onClick={() => handleLogin()}
                size="small"
                aria-label="add"
                color="secondary"
                variant="outlined"
              >
                Login
              </Button>
            </Box>
            <Box mt={0.4} mr={2}>
              <Button
                onClick={() => handleCreateUser()}
                size="small"
                aria-label="add"
                color="primary"
                variant="contained"
              >
                <Typography variant="h6" color="secondary">
                  Create an Account
                </Typography>
              </Button>
            </Box>
          </Box>
        ) : (
          <Box></Box>
        )}
      </Box>
    );
  };
  return (
    <Box className={`${root}`}>
      {!authenticated && pathname !== "/login" && pathname !== "/signup" ? (
        <AppBar className={appBarStyle}>
          <Container>{renderAppbar()}</Container>
        </AppBar>
      ) : null}
      <Box className={toolbar} />
      {authenticated && (
        <Hidden only={["xs"]}>
          <PersistentDrawerLeft />
        </Hidden>
      )}
    </Box>
  );
};

export default Header;
