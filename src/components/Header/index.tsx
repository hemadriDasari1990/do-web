import { LOGIN, ORGANIZATION, ROOT } from "../../routes/config";
import React, { useState } from "react";
import { Theme, makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';
import SportsVolleyballIcon from '@material-ui/icons/SportsVolleyball';
// import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import { Typography } from '@material-ui/core';
import Zoom from '@material-ui/core/Zoom';
import { useAuthenticated } from "../../redux/state/common";
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import { useOrganization } from "../../redux/state/organization"

// import { useShowCreateBoardButton } from '../../redux/state/common';

const PersistentDrawerRight = React.lazy(() => import("../Drawer/DrawerRight"));
const UserAccount = React.lazy(() => import("./Account"));

const useStyles = makeStyles((theme: Theme) => ({
    appBarStyle: {
        height: 60,
        width: "100%",
        backgroundColor: "#fff !important",
        // background: "linear-gradient(90deg, #0072ff 0%, #0095ffd9 100%)",
    },
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
    }
}));

const Header = () => {
    const { appBarStyle, iconStyle, avatarTitleStyle, cursor, boxStyle, logoTextStyle, logoIconStyle } = useStyles();
    // const { showCreateBoardButton } = useShowCreateBoardButton();
    const history = useHistory();
    const location = useLocation();
    const pathname: string = location.pathname;
    const authenticated = useAuthenticated();
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
        <AppBar className={appBarStyle}>
            {/* <Toolbar variant="dense"> */}
                <Container>
                    <PersistentDrawerRight open={open} handleDrawerClose={handleDrawerClose}><UserAccount handleDrawerClose={handleDrawerClose}/></PersistentDrawerRight>
                    <Box mt={1} display="flex" justifyContent="space-between">
                        <Hidden only={["xl", "lg", "md", "sm"]}>
                            <Box display="flex">
                                <Box mt={1} mr={0.5}>
                                    <SportsVolleyballIcon className={logoIconStyle} color="secondary" />
                                </Box>
                                <Box mt={1} mr={1}>
                                    <SportsVolleyballIcon className={logoIconStyle} color="secondary" />
                                </Box>
                            </Box>
                        </Hidden>
                        <Hidden only={["xs"]}>
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
                        </Hidden>
                        <Box display="flex" justifyContent="space-between">
                            {!authenticated && pathname !== "/organization" && <Box mr={2}>
                                <Button
                                    onClick={() => handleCreateOrganization()}
                                    size="small"
                                    aria-label="add"
                                    color="primary"
                                    variant="outlined"
                                >
                                    Create Organization
                                </Button>
                            </Box>}
                            {!authenticated && pathname !== "/login" && <Box>
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
                                <Box ml={1} mt={1}>
                                    <Typography color="primary" className={avatarTitleStyle} variant="h5">{title || '...'}</Typography>
                                </Box>
                                <Box ml={1} mt={0.7}>
                                    <ArrowDropDownIcon color="primary" />
                                </Box>
                            </Box>
                        </Box>}
                    </Box>
                </Container>
            {/* </Toolbar> */}
        </AppBar>
    )
}

export default Header;
