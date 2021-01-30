import { Theme, createStyles, makeStyles, useTheme } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import { Typography } from '@material-ui/core';

const drawerWidth = 400;

const Create = React.lazy(() => import("../Board/Create"));

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      
    },
    drawerPaper: {
      width: drawerWidth,
      padding: 20,
      marginTop: 80,
      borderRadius: 6,
      marginRight: 10, 
      boxShadow: '0 3rem 6rem rgba(0, 0, 0, .1)'
    },
    drawerHeader: {
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
  }),
);

export default function PersistentDrawerRight(props: any) {
  const { handleDrawerClose } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  // const handleDrawerOpen = () => {
  //   setOpen(true);
  // };

  const handleButton = () => {
    setOpen(false);
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
        <Box display="flex" justifyContent="space-between" className={classes.drawerHeader}>
          <Box mt={1}>
            <Typography variant="h3" color="primary">Create new retro board</Typography>
          </Box>
          <Box>
            <IconButton onClick={handleButton}>
              {theme.direction === 'rtl' ? <ChevronLeftIcon color="primary" /> : <ChevronRightIcon color="primary"/>}
            </IconButton>
          </Box>
        </Box>
        <Create handleDrawerClose={handleDrawerClose} />
      </Drawer>
    </React.Fragment>
  );
}