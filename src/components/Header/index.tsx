import * as routePath from "../../routes/config";

import { LOGIN, ORGANIZATION, ROOT } from "../../routes/config";
import React, { useState } from "react";
import { Theme, makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import PrivateRoute from "../../routes/PrvateRoute";
import SportsVolleyballIcon from '@material-ui/icons/SportsVolleyball';
import { Switch } from "react-router-dom";
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import { useAuthenticated } from "../../redux/state/common";
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import { useOrganization } from "../../redux/state/organization"

const PersistentDrawerRight = React.lazy(() => import("../Drawer/DrawerRight"));
const UserAccount = React.lazy(() => import("./Account"));
const PersistentDrawerLeft = React.lazy(() => import("../Drawer/DrawerLeft"));
const Dashboard = React.lazy(() => import("../Dashboard"));
const ProjectDashboard = React.lazy(() => import("../Project"));
const BoardDashboard = React.lazy(() => import("../Board"));
const DepartmentDashboard = React.lazy(() => import("../Department"));

const drawerWidth = 80;

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: "flex"
    },
    appBarStyle: (props: any) => ({
        height: 60,
        width: !props.authenticated ? '100%': `calc(100% - ${drawerWidth}px)`,
        paddingLeft: !props.authenticated ? 20: 0,
        paddingRight: !props.authenticated ? 20: 0,
        backgroundColor: "inherit !important",
    }),
    iconStyle: {
        width: 35,
        height: 35,
        background: "linear-gradient(90deg, #0072ff 0%, #0095ffd9 100%)",
    },
    avatarTitleStyle: {
        color: "#334357"
    },
    cursor: {
        cursor: "pointer"
    },
    boxStyle: {
        borderRadius: 10,
    },
    logoTextStyle: {
        color: "#07113f"
    },
    logoIconStyle: {
        padding: 3,
        borderRadius: "50%",
        background: "linear-gradient(90deg, #0072ff 0%, #0095ffd9 100%)",
        width: 25,
        height: 25
    },
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: "#f6f6f7",
      padding: theme.spacing(3),
      minHeight: "90vh",
      paddingTop: 90
    },
}));

const protectedRoutes = () => {
    return [
        {
            path: routePath.DASHBOARD,
            component: Dashboard
        },
        {
            path: routePath.ORGANIZATION_DASHBOARD,
            component: DepartmentDashboard
        },
        {
            path: routePath.DEPARTMENT_DASHBOARD,
            component: ProjectDashboard
        },
        {
            path: routePath.PROJECT_DASHBOARD,
            component: BoardDashboard
        }
    ]
}

const Header = () => {
    const authenticated = useAuthenticated();
    const { root, appBarStyle, iconStyle, avatarTitleStyle, cursor, boxStyle, logoTextStyle, logoIconStyle, content, toolbar } = useStyles( { authenticated });
    // const { showCreateBoardButton } = useShowCreateBoardButton();
    const history = useHistory();
    const location = useLocation();
    const pathname: string = location.pathname;
    const { title } = useOrganization();
    
    /* Local state */
    const [open, setOpen] = useState(false);
    
    const refreshDashboard = () => {
        history.push(ROOT);
    }

    const handleCreateOrganization = () => {
        history.push(ORGANIZATION);
    }

    const handleLogin = () => {
        history.push(LOGIN);
    }

    const handleDrawerClose = () => {
        setOpen(false);
    }

    const handleAccount = () => {
        setOpen(!open);
    }
    
    return (
        <Box className={root}>
            <AppBar className={appBarStyle}>
            {/* <Toolbar variant="dense"> */}
                        <Box mt={1} display="flex" justifyContent="space-between">
                            {/* <Hidden only={["xl", "lg", "md", "sm"]}>
                                <Box display="flex" className={cursor} onClick={() => refreshDashboard()}>
                                    <Box mt={1} mr={0.5}>
                                        <SportsVolleyballIcon className={logoIconStyle} color="secondary" />
                                    </Box>
                                    <Box mt={1} mr={1}>
                                        <SportsVolleyballIcon className={logoIconStyle} color="secondary" />
                                    </Box>
                                </Box>
                            </Hidden> */}
                            {!authenticated && <Hidden only={["xs"]}>
                                <Box display="flex" className={cursor} onClick={() => refreshDashboard()}>
                                    <Box mr={1} display="flex">
                                        <Typography variant="h1" className={logoTextStyle}>Let</Typography>
                                        <Typography variant="h1" color="primary">'</Typography>
                                        <Typography variant="h1" className={logoTextStyle}>s</Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="h1" className={logoTextStyle}>d</Typography>
                                    </Box>
                                    <Box mt={1} mr={1}>
                                        <SportsVolleyballIcon className={logoIconStyle} />
                                    </Box>
                                    <Box>
                                        <Typography variant="h1" className={logoTextStyle}> retr</Typography>
                                    </Box>
                                    <Box mt={1}>
                                        <SportsVolleyballIcon className={logoIconStyle} />
                                    </Box>
                                </Box>
                            </Hidden>}
                            <Box display="flex" justifyContent="space-between">
                                {!authenticated && pathname !== "/login" && <Box mt={0.4} mr={2}>
                                    <Button
                                        onClick={() => handleLogin()}
                                        size="small"
                                        aria-label="add"
                                        color="primary"
                                        variant="outlined"
                                    >
                                        Login
                                    </Button>
                                </Box>}
                                {!authenticated && pathname !== "/organization" && <Box mt={0.4} mr={2}>
                                    <Button
                                        onClick={() => handleCreateOrganization()}
                                        size="small"
                                        aria-label="add"
                                        color="primary"
                                        variant="contained"
                                    >
                                        <Typography variant="h6" color="secondary">Register</Typography>
                                    </Button>
                                </Box>}
                            </Box>
                        {authenticated && <Box className={boxStyle} display="flex" justifyContent="space-between">
                            <Box className={cursor} onClick={() => handleAccount()} mt={0.5} display="flex" justifyContent="space-between">
                                <Box>
                                    <Tooltip title={title}>
                                        <Zoom in={true} timeout={1500}>
                                            <Avatar classes={{root: iconStyle}}>
                                                <Typography variant="h4" color="secondary">{title ? title.substring(0, 1) : ''}</Typography>
                                            </Avatar>
                                        </Zoom>
                                    </Tooltip>
                                </Box>
                                <Hidden only={["xs"]}><Box ml={1} mt={1}>
                                    <Typography color="primary" className={avatarTitleStyle} variant="h5">{title || '...'}</Typography>
                                </Box></Hidden>
                                <Box ml={1} mt={0.7}>
                                    <ArrowDropDownIcon color="primary" />
                                </Box>
                            </Box>
                        </Box>
                        }
                    </Box>
            {/* </Toolbar> */}
            </AppBar>
        <Box className={toolbar} />
        {!pathname.includes("/board") && authenticated &&  <Hidden only={["xs"]}><PersistentDrawerLeft /></Hidden>}
        {authenticated && <PersistentDrawerRight open={open} handleDrawerClose={handleDrawerClose}>
                        <UserAccount handleDrawerClose={handleDrawerClose}/>
                    </PersistentDrawerRight>}
        {!pathname.includes("/board") && authenticated && <main className={content}>
            <Switch>
                {protectedRoutes().map((route: {[Key: string]: any}, index: number) => (
                    <PrivateRoute exact key={"private-"+index} component={route.component} path={route.path} />
                ))}
            </Switch>
        </main>}
    </Box>
    )
}

export default Header;
