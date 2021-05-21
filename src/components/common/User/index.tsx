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
        <Typography variant="body1">Hemadri</Typography>
      </Box>
      <Box>
        <Typography variant="body1">from</Typography>
      </Box>
      <Box mx={1}>
        <Typography variant="body1">letsdoretro.com</Typography>
      </Box>
    </Box>
  );
};

export default AdminUser;
