import AppBar from '@material-ui/core/AppBar';
import ArrowIcon from '@material-ui/icons/ArrowForward'
import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button';
import React from "react";
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    avatarStyle: {
        fontFamily: "'Lusitana', serif;",
        fontSize: 30,
        paddingBottom: 5,
        fontWeight: 900,
        background: "linear-gradient(90deg, #0072ff 0%, #0095ffba 100%)",
        paddingTop: 5
    },
    appBarStyle: {
        height: 65,
        width: "100%",
        backgroundColor: "#fff !important"
    },
}));

const Header = () => {
    const { avatarStyle, appBarStyle } = useStyles();

    const refreshDashboard = () => {
        
    }
    const handleCreate = () => {
        
    }
    
    return (
        <AppBar className={appBarStyle}>
            <Toolbar>
                <Box m={5} width="100%" display="flex" justifyContent="space-between">
                    <Box>
                        <Avatar variant="rounded" className={avatarStyle} onClick={() => refreshDashboard()} color="primary">do</Avatar>
                    </Box>
                    <Box>
                        <Button
                            onClick={() => handleCreate()}
                            size="small"
                            aria-label="add"
                            variant="contained"
                        >
                            Create Board <ArrowIcon color="secondary" />
                        </Button>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header;
