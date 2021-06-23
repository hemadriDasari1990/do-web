import { IconButton, Tooltip, Typography } from "@material-ui/core";
import React, { useEffect, useRef } from "react";
import { useUserLoading, useUsers } from "../../redux/state/user";

import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import KeyboardArrowLeftOutlinedIcon from "@material-ui/icons/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@material-ui/icons/KeyboardArrowRightOutlined";
import getRandomBGColor from "../../util/getRandomColor";
import { getUsers } from "../../redux/actions/user";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { useUserSummary } from "../../redux/state/user";

const Loader = React.lazy(() => import("../Loader/components"));

const useLocalStyles = makeStyles(() => ({
  iconStyle: {
    fontSize: 80,
  },
  imageBoxStyle: {
    height: 110,
    width: 140,
    clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    background: "#f5f6f8",
    borderRadius: 6,
  },
  imageBoxGridStyle: {
    height: 90,
    width: 75,
    borderRadius: "20%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center" /* Centering y-axis */,
    alignItems: "center",
    clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)",
  },
  avatarTextStyle: {
    // fontSize: 50,
  },
  avatarStyle: {
    backgroundColor: "unset",
  },
  gridListStyle: {
    flexWrap: "nowrap",
    scrollBehavior: "smooth",
    transform: "translateZ(0)",
  },
  gridListTileStyle: {
    width: "300px !important",
    height: "200px !important",
    overflowY: "scroll",
    scrollBehavior: "smooth",
    marginRight: 10,
    borderRadius: 6,
  },
  iconButtonStyle: {
    background: "linear-gradient(180deg,#7997ff 0,#57f 100%)",
    borderRadius: 6,
  },
  iconButtonSecondaryStyle: {
    background: "linear-gradient(180deg,#ffdb58 0,#ffc800 100%)",
    borderRadius: 6,
  },
  iconButtonGridStyle: {
    marginTop: "auto",
    top: "50%",
  },
  mainBoxStyle: {
    position: "relative",
    height: "100%",
  },
  leftButtonStyle: {
    zIndex: 1,
    position: "absolute",
    top: "50%",
    left: -26,
    transform: "translateY(-50%)",
  },
  rightButtonStyle: {
    zIndex: 1,
    position: "absolute",
    top: "50%",
    right: -26,
    transform: "translateY(-50%)",
  },
}));

const Users = () => {
  const {
    imageBoxGridStyle,
    avatarTextStyle,
    avatarStyle,
    gridListStyle,
    gridListTileStyle,
    iconButtonStyle,
    mainBoxStyle,
    iconButtonSecondaryStyle,
  } = useLocalStyles();
  const dispatch = useDispatch();
  const { users } = useUsers();
  const { loading } = useUserLoading();
  const ref = useRef<HTMLDivElement>(null);
  const { summary } = useUserSummary();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const handleScroll = (scrollOffset: number) => {
    if (ref.current) {
      ref.current.scrollLeft += scrollOffset;
      ref.current.scrollTo({
        behavior: "smooth",
      });
    }
  };

  return (
    <Box>
      <Loader enable={loading} />
      <Box textAlign="center" pb={3}>
        <Typography variant="h2">
          {summary?.usersCount}+ teams trust letsdoretro.com worldwide.
        </Typography>
      </Box>
      <Box minHeight={160} maxHeight={160}>
        <Box className={mainBoxStyle}>
          {!loading && (
            <GridList
              {...({ ref: ref } as any)}
              cols={12}
              className={gridListStyle}
            >
              {users?.length
                ? users.map((user: { [Key: string]: any }, index: number) => (
                    <GridListTile
                      classes={{ root: gridListTileStyle }}
                      key={"Key-" + index}
                    >
                      <Box>
                        <Box m="auto">
                          <Box
                            className={imageBoxGridStyle}
                            style={{
                              background: getRandomBGColor(index),
                            }}
                          >
                            <Avatar
                              color="secondary"
                              classes={{ root: avatarStyle }}
                            >
                              <Typography
                                variant="h1"
                                className={avatarTextStyle}
                                color="secondary"
                              >
                                {user?.name
                                  ? user?.name?.toUpperCase()?.substring(0, 1)
                                  : ""}
                              </Typography>
                            </Avatar>
                          </Box>
                        </Box>
                        <Box textAlign="center">
                          <Box mt={3} mb={2}>
                            <Typography variant="h4">{user?.name}</Typography>
                          </Box>
                          <Box>
                            <Typography
                              variant="h5"
                              style={{ fontWeight: "normal" }}
                            >
                              {user?.description}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </GridListTile>
                  ))
                : null}
            </GridList>
          )}
        </Box>
        <Divider />
        <Box
          display="flex"
          justifyContent="space-between"
          style={{ float: "right" }}
          mt={1.5}
        >
          <Box mr={5}>
            <Tooltip arrow title="Scroll Left" placement="left">
              <IconButton
                size="small"
                className={iconButtonStyle}
                onClick={() => handleScroll(-500)}
              >
                <KeyboardArrowLeftOutlinedIcon color="secondary" />
              </IconButton>
            </Tooltip>
          </Box>
          <Box>
            <Tooltip arrow title="Scroll Right" placement="right">
              <IconButton
                size="small"
                className={iconButtonSecondaryStyle}
                onClick={() => handleScroll(500)}
              >
                <KeyboardArrowRightOutlinedIcon color="secondary" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Users;
