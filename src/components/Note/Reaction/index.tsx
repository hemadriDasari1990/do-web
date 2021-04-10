import { Theme, makeStyles } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import DeserveIcon from "@material-ui/icons/EmojiEvents";
import IconButton from "@material-ui/core/IconButton";
import LoveIcon from "@material-ui/icons/Favorite";
import MinusOneIcon from "@material-ui/icons/ExposureNeg1Outlined";
import Plus2Icon from "@material-ui/icons/ExposurePlus2";
import PlusOneIcon from "@material-ui/icons/ExposurePlus1";
import Popover from "@material-ui/core/Popover";
import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import useStyles from "../../styles";

const useLocalStyles = makeStyles((theme: Theme) => ({
  popover: {
    // pointerEvents: 'none',
  },
  paper: {
    width: "fit-content",
    borderRadius: 6,
    padding: theme.spacing(0.5),
    // boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
  },
  reactionStyle: {
    fontSize: 14,
  },
}));

function ReactionPopover(props: any) {
  const { anchorEl, note, handlePopoverClose, handleReaction } = props;
  const { popover, paper, reactionStyle } = useLocalStyles();
  const {
    minusOneIconStyle,
    plusTwoIconStyle,
    loveIconStyle,
    plusIconStyle,
    deserveIconStyle,
  } = useStyles();

  return (
    <React.Fragment>
      <ClickAwayListener onClickAway={handlePopoverClose}>
        <Popover
          id="mouse-over-popover"
          className={popover}
          classes={{
            paper: paper,
          }}
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          key={note._id}
        >
          <Box display="flex" justifyContent="space-between">
            <Box mr={1}>
              <Zoom in={true} timeout={1500}>
                <Tooltip arrow title="-1" placement="top">
                  <IconButton
                    className={minusOneIconStyle}
                    color="secondary"
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                      handleReaction(event, "minusOne", note)
                    }
                    size="small"
                  >
                    <MinusOneIcon className={reactionStyle} />
                  </IconButton>
                </Tooltip>
              </Zoom>
            </Box>
            <Box mr={1}>
              <Zoom in={true} timeout={1500}>
                <Tooltip arrow title="I Love it" placement="top">
                  <IconButton
                    className={loveIconStyle}
                    color="secondary"
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                      handleReaction(event, "love", note)
                    }
                    size="small"
                  >
                    <LoveIcon className={reactionStyle} />
                  </IconButton>
                </Tooltip>
              </Zoom>
            </Box>
            <Box mr={1}>
              <Zoom in={true} timeout={1500}>
                <Tooltip arrow title="+1" placement="top">
                  <IconButton
                    className={plusIconStyle}
                    color="secondary"
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                      handleReaction(event, "plusOne", note)
                    }
                    size="small"
                  >
                    <PlusOneIcon className={reactionStyle} />
                  </IconButton>
                </Tooltip>
              </Zoom>
            </Box>
            <Box mr={1}>
              <Zoom in={true} timeout={1500}>
                <Tooltip arrow title="+2" placement="top">
                  <IconButton
                    className={plusTwoIconStyle}
                    color="secondary"
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                      handleReaction(event, "plusTwo", note)
                    }
                    size="small"
                  >
                    <Plus2Icon className={reactionStyle} />
                  </IconButton>
                </Tooltip>
              </Zoom>
            </Box>
            <Box>
              <Zoom in={true} timeout={1500}>
                <Tooltip arrow title="Deserve" placement="top">
                  <IconButton
                    className={deserveIconStyle}
                    color="secondary"
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                      handleReaction(event, "deserve", note)
                    }
                    size="small"
                  >
                    <DeserveIcon className={reactionStyle} />
                  </IconButton>
                </Tooltip>
              </Zoom>
            </Box>
          </Box>
        </Popover>
      </ClickAwayListener>
    </React.Fragment>
  );
}

export default ReactionPopover;
