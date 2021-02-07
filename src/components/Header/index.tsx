import React, { useState } from "react";
import { Typography, makeStyles } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar'
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import { ROOT } from "../../routes/config";
import Slide from '@material-ui/core/Slide';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import { useShowCreateBoardButton } from '../../redux/state/common';

const PersistentDrawerRight = React.lazy(() => import("../Drawer/DrawerRight"));

const useStyles = makeStyles(() => ({
    avatarStyle: {
        fontFamily: "'Lusitana', serif;",
        fontSize: 30,
        fontWeight: 900,
        backgroundColor: "unset",
        background: "linear-gradient(90deg, #0072ff 0%, #0095ffd9 100%)",
        cursor: "pointer"
    },
    appBarStyle: {
        height: 60,
        width: "100%",
        backgroundColor: "#fff !important",
        // background: "linear-gradient(90deg, #0072ff 0%, #0095ffd9 100%)",
        boxShadow: "0 0 1px 1px rgba(29,17,51,.04), 0 0 3px 2px rgba(9,32,77,.12), 0 0 2px -3px rgba(29,17,51,.12)"
    }
}));

const Header = () => {
    const { avatarStyle, appBarStyle } = useStyles();
    const { showCreateBoardButton } = useShowCreateBoardButton();
    const history = useHistory();
    const { boardId } = useParams<{ boardId: string }>();

    /* Local state */
    const [showCreate, setShowCreate] = useState(false);

    const refreshDashboard = () => {
        history.push(ROOT);
    }
    
    const handleCreate = () => {
        setShowCreate(true);
    }

    const handleDrawerClose = () => {
        setShowCreate(false);
    }

    const handleCopy = () => {
        navigator.clipboard.writeText("http://" + process.env.REACT_APP_SERVER+"/"+boardId);
    }
    
    return (
        <AppBar className={appBarStyle}>
            <Toolbar>
                <Container>
                    {showCreate && <PersistentDrawerRight handleDrawerClose={handleDrawerClose} />}
                    <Box mt={1} display="flex" justifyContent="space-between">
                        <Box>
                            <Avatar variant="rounded"  className={avatarStyle} onClick={() => refreshDashboard()}><Typography color="secondary" variant="h2">do</Typography></Avatar>
                        </Box>
                        {showCreateBoardButton &&  !showCreate && <Box>
                            <Button
                                onClick={() => handleCreate()}
                                size="small"
                                aria-label="add"
                                color="primary"
                                variant="outlined"
                            >
                                Create Board
                            </Button>
                        </Box>}
                        {!showCreateBoardButton && <Box display="flex" justifyContent="space-between">
                            <Box>
                                <Tooltip title="Download PDF">
                                    <Slide
                                        direction="down"
                                        in={true}
                                        timeout={1500}
                                        mountOnEnter
                                        unmountOnExit
                                    >
                                        <IconButton color="primary" >
                                            <PictureAsPdfIcon />
                                        </IconButton>
                                    </Slide>
                                </Tooltip>
                            </Box>
                            <Box>
                                <Tooltip title="Copy Board URL">
                                    <Zoom in={true} timeout={1500}>
                                        <IconButton color="primary" onClick={() => handleCopy()}>
                                            <BookmarksIcon />
                                        </IconButton>
                                    </Zoom>
                                </Tooltip>
                            </Box>
                            <Box>
                                <Tooltip title="Delete Section">
                                    <Slide
                                        direction="down"
                                        in={true}
                                        timeout={1500}
                                        mountOnEnter
                                        unmountOnExit
                                    >
                                        <IconButton color="primary">
                                            <PictureAsPdfIcon />
                                        </IconButton>
                                    </Slide>
                                </Tooltip>
                            </Box>
                        </Box>}
                    </Box>
                </Container>
            </Toolbar>
        </AppBar>
    )
}

export default Header;
