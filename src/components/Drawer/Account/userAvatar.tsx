import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";
import React from "react";
import { Suspense } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";
import { makeStyles } from "@material-ui/core/styles";
import useStyles from "../../styles";
import { useUser } from "../../../redux/state/user";
const useLocalStyles = makeStyles(() => ({
  iconStyle: {
    width: 35,
    height: 35,
    background: "linear-gradient(180deg,#7997ff 0,#57f 100%) ",
  },
  avatarTitleStyle: {
    color: "#334357",
  },
  boxStyle: {
    borderRadius: 6,
  },
}));

const UserAvatar = (props: any) => {
  const { handleAccount, hideName } = props;
  const { name } = useUser();
  const { iconStyle, avatarTitleStyle, boxStyle } = useLocalStyles();
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
            <Tooltip arrow title={name}>
              <Zoom in={true} timeout={1500}>
                <Avatar classes={{ root: iconStyle }}>
                  <Typography variant="h4" color="secondary">
                    {name ? name.substring(0, 1) : ""}
                  </Typography>
                </Avatar>
              </Zoom>
            </Tooltip>
          </Box>
          {!hideName ? (
            <Hidden only={["xs"]}>
              <Box ml={1} mt={1}>
                <Typography
                  color="primary"
                  className={avatarTitleStyle}
                  variant="h5"
                >
                  {name || "..."}
                </Typography>
              </Box>
            </Hidden>
          ) : null}
          <Box ml={0.5} mr={0.5} mt={0.7}>
            <ArrowDropDownIcon color="primary" />
          </Box>
        </Box>
      </Box>
    </Suspense>
  );
};

export default UserAvatar;
