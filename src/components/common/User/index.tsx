import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import HemadriIcon from "../../../assets/hemadri.jpg";
import React from "react";
import Typography from "@material-ui/core/Typography";
import useStyles from "../../styles";

const AdminUser = () => {
  const { avatarStyle } = useStyles();

  return (
    <Box display="flex">
      <Avatar classes={{ root: avatarStyle }} src={HemadriIcon}></Avatar>
      <Box mx={1} mt={0.5}>
        <Typography variant="body2">
          <b>Hemadri</b>
        </Typography>
      </Box>
      <Box mt={0.5}>
        <Typography variant="body2">from</Typography>
      </Box>
      <Box mx={1} mt={0.5}>
        <Typography variant="body2">
          <b>letsdoretro.com</b>
        </Typography>
      </Box>
    </Box>
  );
};

export default AdminUser;
