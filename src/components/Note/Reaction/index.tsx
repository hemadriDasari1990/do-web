import { Theme, makeStyles } from '@material-ui/core/styles'

import Box from '@material-ui/core/Box';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import DeserveIcon from '@material-ui/icons/EmojiEvents';
import DisAgreeIcon from '@material-ui/icons/ThumbDownAlt';
import IconButton from '@material-ui/core/IconButton';
import LoveIcon from '@material-ui/icons/Favorite';
import Plus2Icon from '@material-ui/icons/ExposurePlus2';
import PlusOneIcon from '@material-ui/icons/ExposurePlus1';
import Popover from '@material-ui/core/Popover';
import React from 'react'
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

const useStyles = makeStyles((theme: Theme) => ({
    popover: {
        // pointerEvents: 'none',
    },
    paper: {
        width: "fit-content",
        borderRadius: 6,
        padding: theme.spacing(0.5),
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
    },
    disAgreeIconStyle: {
        background: "linear-gradient(50deg, #08AEEA 0%, #2AF598 100%)",
    },
    plusTwoIconStyle: {
        background: "linear-gradient(50deg, #0072ff 0%, #0095ffba 100%)"
    },
    loveIconStyle: {
        background: "linear-gradient(50deg, #ea087b 0%, #ff5656 100%)",
    },
    plusIconStyle: {
        background: "linear-gradient(50deg, #0072ff 0%, #0095ffba 100%)"
    },
    deserveIconStyle: {
        background: "linear-gradient(50deg, #ff8d00 0%, #ffc200ba 100%)"
    },
    reactionStyle: {
        fontSize: 14
    }
}));

function ReactionPopover(props: any) {
    const { anchorEl, note, handlePopoverClose, handleReaction } = props;
    const { popover, paper, reactionStyle, disAgreeIconStyle, plusTwoIconStyle, loveIconStyle, plusIconStyle, deserveIconStyle } = useStyles();
    
    return (
        <React.Fragment>
                <Popover
                    id="mouse-over-popover"
                    className={popover}
                    classes={{
                        paper: paper,
                    }}
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    key={note._id}
                >
                    <ClickAwayListener onClickAway={handlePopoverClose}>
                        <Box display="flex" justifyContent="space-between">
                            <Box mr={1}>
                                <Zoom in={true} timeout={1500}>
                                    <Tooltip title="I Disagree" placement="top">
                                        <IconButton className={disAgreeIconStyle} color="secondary" onClick={() => handleReaction("disagree", note)} size="small">
                                            <DisAgreeIcon className={reactionStyle} />
                                        </IconButton>
                                    </Tooltip>
                                </Zoom>
                            </Box>
                            <Box mr={1}>
                                <Zoom in={true} timeout={1500}>
                                    <Tooltip title="I Love it" placement="top">
                                        <IconButton className={loveIconStyle} color="secondary" onClick={() => handleReaction("love", note)} size="small">
                                            <LoveIcon className={reactionStyle} />
                                        </IconButton>
                                    </Tooltip>
                                </Zoom>
                            </Box>
                            <Box mr={1}>
                                <Zoom in={true} timeout={1500}>
                                    <Tooltip title="+1" placement="top">
                                        <IconButton className={plusIconStyle} color="secondary" onClick={() => handleReaction("plusOne", note)} size="small">
                                            <PlusOneIcon className={reactionStyle} />
                                        </IconButton>
                                    </Tooltip>
                                </Zoom>
                            </Box>
                            <Box mr={1}>
                                <Zoom in={true} timeout={1500}>
                                    <Tooltip title="+2" placement="top">
                                        <IconButton className={plusTwoIconStyle} color="secondary" onClick={() => handleReaction("plusTwo", note)} size="small">
                                            <Plus2Icon className={reactionStyle} />
                                        </IconButton>
                                    </Tooltip>
                                </Zoom>
                            </Box>
                            <Box>
                                <Zoom in={true} timeout={1500}>
                                    <Tooltip title="Deserve this" placement="top">
                                        <IconButton className={deserveIconStyle} color="secondary" onClick={() => handleReaction("deserve", note)} size="small">
                                            <DeserveIcon className={reactionStyle} />
                                        </IconButton>
                                    </Tooltip>
                                </Zoom>
                            </Box>
                        </Box>
                    </ClickAwayListener>
                </Popover>
        </React.Fragment>
    )
}

export default ReactionPopover;
