import React, { Suspense } from 'react'

import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider'
import { LOGIN } from '../../../routes/config'
// import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import LogoutIcon from '@material-ui/icons/PowerSettingsNew'
import Slide from '@material-ui/core/Slide'
import Tooltip from '@material-ui/core/Tooltip'
import { Typography } from '@material-ui/core'
import Zoom from '@material-ui/core/Zoom'
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useOrganization } from "../../../redux/state/organization"

const useStyles = makeStyles(() => ({
  avatar: {
    width: 110,
    height: 110,
    margin: 'auto',
    background: "linear-gradient(90deg, #0072ff 0%, #0095ffd9 100%)",
  },
  logoutAvatar: {
    backgroundColor: "#ffe1e1"
  },
  logoutIcon: {
    fill: "#f50057"
  },
  cursor: {
    cursor: "pointer"
  }
}));

const UserAccount = (props: any) => {
    const { handleDrawerClose } = props;
    const { avatar, logoutAvatar, logoutIcon, cursor } = useStyles();
    const { title } = useOrganization();
    const history = useHistory();
    
    const handleLogout = async () => {
        sessionStorage.removeItem("token");
        handleDrawerClose();
        history.push(LOGIN)
    }
    
    return (
      <Suspense fallback={<div></div>}>
            <Box>
                <Zoom in={true} timeout={2000}>
                    <Avatar
                        alt={title}
                        className={avatar}
                        color="primary"
                    >
                        <Typography variant="caption" color="secondary">{title ? title.substring(0, 1) : ''}</Typography>
                    </Avatar>
                </Zoom>
            </Box>
            <Box my={3} textAlign="center">
                <Typography variant="h3" >{title}</Typography>
            </Box>
            <Divider />
            <List>
                <ListItem
                    alignItems="flex-start"
                    onClick={() => handleLogout()}
                    className={cursor}
                >
                <ListItemAvatar>
                    <Slide
                        direction="right"
                        in={true}
                        timeout={1500}
                        mountOnEnter
                        unmountOnExit
                    >
                    <Avatar className={logoutAvatar} variant="square">
                        <LogoutIcon
                            className={logoutIcon}
                            color="primary"
                        />
                    </Avatar>
                    </Slide>
                </ListItemAvatar>
                <Tooltip title="Log Out" placement="bottom-start">
                    <ListItemText
                        primary="Log Out"
                        secondary="You'll be logged out"
                    />
                </Tooltip>
                </ListItem>
            </List>
      </Suspense>
    )
}

export default UserAccount;
