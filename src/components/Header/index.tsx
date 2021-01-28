import React, { useState } from "react";

import AppBar from '@material-ui/core/AppBar';
import ArrowIcon from '@material-ui/icons/ArrowForward'
import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button';
import { CREATE } from "../../routes/config";
import IconButton from '@material-ui/core/IconButton';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import Slide from '@material-ui/core/Slide';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import { makeStyles } from '@material-ui/core';
import { useHistory } from "react-router";
import { useShowCreateBoardButton } from '../../redux/state/common';

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
    pdfStyle: {
        color: "red"
    }
}));

const Header = () => {
    const { avatarStyle, appBarStyle, pdfStyle } = useStyles();
    const history = useHistory();
    const { showCreateBoardButton } = useShowCreateBoardButton();

    /* Local state */
    const [showCreate, setShowCreate] = useState(false);

    const refreshDashboard = () => {
        
    }
    
    const handleCreate = () => {
        setShowCreate(true);
        history.push(CREATE);
    }
    
    return (
        <AppBar className={appBarStyle}>
            <Toolbar>
                <Box m={5} width="100%" display="flex" justifyContent="space-between">
                    <Box>
                        <Avatar variant="rounded" className={avatarStyle} onClick={() => refreshDashboard()} color="primary">do</Avatar>
                    </Box>
                    {showCreateBoardButton &&  !showCreate && <Box>
                        <Button
                            onClick={() => handleCreate()}
                            size="small"
                            aria-label="add"
                            variant="contained"
                        >
                            Create Board <ArrowIcon color="secondary" />
                        </Button>
                    </Box>}
                    {!showCreateBoardButton && <Box display="flex" justifyContent="space-between">
                        <Box>
                            <Tooltip title="Delete Section">
                                <Slide
                                    direction="down"
                                    in={true}
                                    timeout={1500}
                                    mountOnEnter
                                    unmountOnExit
                                >
                                    <IconButton >
                                        <PictureAsPdfIcon className={pdfStyle}/>
                                    </IconButton>
                                </Slide>
                            </Tooltip>
                        </Box>
                        <Box>
                            <Tooltip title="Delete Section">
                                <Zoom in={true} timeout={1500}>
                                    <IconButton>
                                        <PictureAsPdfIcon />
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
                                    <IconButton>
                                        <PictureAsPdfIcon />
                                    </IconButton>
                                </Slide>
                            </Tooltip>
                        </Box>
                    </Box>}
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header;
