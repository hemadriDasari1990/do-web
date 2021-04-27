import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";
import React from "react";
import { Suspense } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";
import { getAvatar } from "../../../util/getAvatar";
import { makeStyles } from "@material-ui/core/styles";
import useStyles from "../../styles";
import { useUser } from "../../../redux/state/user";

const useLocalStyles = makeStyles(() => ({
  iconStyle: {
    width: 45,
    height: 45,
    background: "linear-gradient(180deg,#7997ff 0,#57f 100%) ",
  },
  boxStyle: {
    borderRadius: 6,
  },
}));

const UserAvatar = (props: any) => {
  const { handleAccount } = props;
  const { user } = useUser();
  const { iconStyle, boxStyle } = useLocalStyles();
  const { cursor } = useStyles();

  return (
    <Suspense fallback={<div></div>}>
      <Box className={boxStyle} display="flex" justifyContent="space-between">
        <Box
          className={cursor}
          onClick={() => handleAccount()}
          mt={0.5}
          display="flex"
          justifyContent="space-between"
        >
          <Box>
            <Tooltip arrow title={user?.name}>
              <Zoom in={true} timeout={1500}>
                {user?.avatarId ? (
                  <img src={getAvatar(user?.avatarId)} width={45} height={45} />
                ) : (
                  <Avatar classes={{ root: iconStyle }}>
                    <Typography variant="h2" color="secondary">
                      {user?.name ? user?.name.substring(0, 1) : ""}
                    </Typography>
                  </Avatar>
                )}
              </Zoom>
            </Tooltip>
          </Box>
          <Hidden only={["xs"]}>
            <Box ml={1}>
              <Typography color="primary" variant="h3">
                {user?.name || "..."}
              </Typography>
            </Box>
          </Hidden>
        </Box>
      </Box>
    </Suspense>
  );
};

export default UserAvatar;
