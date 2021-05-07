import Box from "@material-ui/core/Box";
import React from "react";
import Typography from "@material-ui/core/Typography";
import useStyles from "../../styles";
import Avatar from "@material-ui/core/Avatar";

const AdminUser = () => {
  const { avatarStyle } = useStyles();

  return (
    <Box display="flex">
      <Avatar classes={{ root: avatarStyle }}>
        <Typography variant="h5">HD</Typography>
      </Avatar>
      <Box mx={1}>
        <Typography variant="subtitle1">Hemadri</Typography>
      </Box>
      <Typography variant="h6">from</Typography>
      <Box mx={1}>
        <Typography variant="subtitle1">letsdoretro.com</Typography>
      </Box>
    </Box>
  );
};

export default AdminUser;
