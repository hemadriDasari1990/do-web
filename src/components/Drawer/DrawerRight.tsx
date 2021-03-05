import {
  Theme,
  createStyles,
  makeStyles,
  useTheme,
} from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import React from "react";

const drawerWidth = 300;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      // width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      padding: 10,
      borderRadius: 6,
      boxShadow: "0 3rem 6rem rgba(0, 0, 0, .1)",
    },
    drawerHeader: {
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    iconStyle: {
      backgroundColor: "#eff6ff",
    },
  })
);

export default function PersistentDrawerRight(props: any) {
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
          justifyContent="space-between"
          className={classes.drawerHeader}
        >
          <Box></Box>
          <Box>
            <IconButton
              size="small"
              className={classes.iconStyle}
              onClick={handleDrawerClose}
            >
              {theme.direction === "rtl" ? (
                <ChevronLeftIcon color="primary" />
              ) : (
                <ChevronRightIcon color="primary" />
              )}
            </IconButton>
          </Box>
        </Box>
        <Box>{children}</Box>
      </Drawer>
    </React.Fragment>
  );
}
