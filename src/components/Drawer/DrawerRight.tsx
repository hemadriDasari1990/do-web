import { Divider, Typography } from "@material-ui/core";
import {
  Theme,
  createStyles,
  makeStyles,
  useTheme,
} from "@material-ui/core/styles";
import { useActivities, useMenuItem } from "../../redux/state/board";

import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined";
import Box from "@material-ui/core/Box";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import React from "react";
import formateNumber from "../../util/formateNumber";
import { storeMenuItem } from "../../redux/actions";
import { useDispatch } from "react-redux";

const drawerWidth = 339;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      // width: drawerWidth,
      flexShrink: 1,
    },
    drawerPaper: {
      // marginTop: 60,
      overflowX: "hidden",
      overflowY: "scroll",
      width: drawerWidth,
      padding: 10,
      borderRadius: 6,
      boxShadow: "0 3rem 6rem rgba(0, 0, 0, .1)",
      [theme.breakpoints.down("xs")]: {
        width: 376,
      },
    },
    drawerHeader: {
      // padding: theme.spacing(0, 1),
      margin: "10px 10px",
      // necessary for content to be below app bar
      // ...theme.mixins.toolbar,
    },
    headerStyle: {
      color: "inherit",
    },
  })
);

export default function PersistentDrawerRight(props: any) {
  const { open, children, handleDrawerClose } = props;
  const classes = useStyles();
  const theme = useTheme();
  const { itemName } = useMenuItem();
  const dispatch = useDispatch();
  const { totalActivities } = useActivities();

  const getTitle = () => {
    let title = "Menu";
    switch (itemName) {
      case "activity":
        title = `Activity (${formateNumber(totalActivities)})`;
        break;
      case "teams":
        title = "Teams";
        break;
      case "members":
        title = "Invited Members";
        break;
      case "account":
        title = "Account";
        break;
      case "about-board":
        title = "About this board";
        break;
      default:
        break;
    }
    return title;
  };

  const handleBack = () => {
    dispatch(storeMenuItem(""));
  };

  const handleClose = () => {
    dispatch(storeMenuItem(""));
    handleDrawerClose();
  };

  return (
    <React.Fragment>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Box
          display="flex"
          // justifyContent="space-between"
          className={classes.drawerHeader}
        >
          {itemName && itemName !== "account" ? (
            <Box>
              <IconButton size="small" onClick={handleBack}>
                <ArrowBackOutlinedIcon />
              </IconButton>
            </Box>
          ) : null}
          <Box ml="auto" className={classes.headerStyle}>
            <Typography variant="h5">{getTitle()}</Typography>
          </Box>

          <Box ml="auto">
            <IconButton
              size="small"
              // className={classes.iconStyle}
              onClick={handleClose}
            >
              {theme.direction === "rtl" ? (
                <ChevronLeftIcon color="primary" />
              ) : (
                <CloseOutlinedIcon color="primary" fontSize="small" />
              )}
            </IconButton>
          </Box>
        </Box>
        <Divider />
        <Box>{children}</Box>
      </Drawer>
    </React.Fragment>
  );
}
