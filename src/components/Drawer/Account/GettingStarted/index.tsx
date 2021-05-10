import { Divider, Typography } from "@material-ui/core";
import {
  Theme,
  createStyles,
  makeStyles,
  useTheme,
} from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
// import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import React from "react";

const drawerWidth = 339;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      flexShrink: 1,
    },
    drawerPaper: {
      width: drawerWidth,
      padding: 10,
      borderRadius: 6,
      boxShadow: "0 3rem 6rem rgba(0, 0, 0, .1)",
      [theme.breakpoints.down("xs")]: {
        width: 376,
      },
    },
    drawerHeader: {
      margin: "10px 10px",
    },
    headerStyle: {
      color: "inherit",
    },
  })
);

export default function GettingStartedDrawer(props: any) {
  const { open, children, handleDrawerClose } = props;
  const classes = useStyles();
  const theme = useTheme();

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
          <Box ml="auto" className={classes.headerStyle}>
            <Typography variant="h5">Learn & Inspire</Typography>
          </Box>
          <Box ml="auto">
            <IconButton
              size="small"
              // className={classes.iconStyle}
              onClick={handleDrawerClose}
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
