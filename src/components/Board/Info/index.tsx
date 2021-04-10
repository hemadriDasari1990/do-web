import Activity from "../Activity";
// import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
// import ListItemAvatar from "@material-ui/core/ListItemAvatar";
// import ListItemText from "@material-ui/core/ListItemText";
import Members from "../Members";
import React from "react";
import Summary from "../../Reaction/Summary";
import { Suspense } from "react";
// import { ROOT } from "../../../routes/config";
// import SettingsIcon from "@material-ui/icons/Settings";
// import Slide from "@material-ui/core/Slide";
import Teams from "../Teams";
// import Typography from "@material-ui/core/Typography";
// import Zoom from "@material-ui/core/Zoom";
// import { logout } from "../../../redux/actions/login";
// import { makeStyles } from "@material-ui/core/styles";
// import socket from "../../../socket";
// import { useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";

// import { useUser } from "../../../redux/state/user";

// const useStyles = makeStyles(() => ({
//   logoutAvatar: {
//     backgroundColor: "#ffe1e1",
//   },
//   logoutIcon: {
//     fill: "#f50057",
//   },
//   cursor: {
//     cursor: "pointer",
//   },
//   settingsAvatar: {
//     backgroundColor: "#eff8fe",
//   },
// }));

const BoardInfo = (props: any) => {
  // const { handleDrawerClose } = props;
  // // const { cursor } = useStyles();
  // // const { name } = useUser();
  // const history = useHistory();
  // const dispatch = useDispatch();

  // const handleLogout = async () => {
  //   dispatch(logout());
  //   sessionStorage.removeItem("token");
  //   sessionStorage.removeItem("refreshToken");
  //   socket.off("login-success");
  //   handleDrawerClose();
  //   history.push(ROOT);
  // };

  return (
    <Suspense fallback={<div></div>}>
      <Box>
        <Activity />
        <Divider />
        <Members />
        <Divider />
        <Teams />
        <Divider />
        <Summary />
      </Box>
    </Suspense>
  );
};

export default BoardInfo;
