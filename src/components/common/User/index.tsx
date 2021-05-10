import Box from "@material-ui/core/Box";
import React from "react";
import Typography from "@material-ui/core/Typography";
import useStyles from "../../styles";
import Avatar from "@material-ui/core/Avatar";
import HemadriIcon from "../../../assets/hemadri.jpg";

const AdminUser = () => {
  const { avatarStyle } = useStyles();

  return (
    <Box display="flex">
      <Avatar classes={{ root: avatarStyle }} src={HemadriIcon}></Avatar>
      <Box mx={1}>
        <Typography variant="h5">Hemadri</Typography>
      </Box>
      <Box mt={0.6}>
        <Typography variant="h6">from</Typography>
      </Box>
      <Box mx={1}>
        <Typography variant="h5">letsdoretro.com</Typography>
      </Box>
    </Box>
  );
};

export default AdminUser;
