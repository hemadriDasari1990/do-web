import { Theme, makeStyles } from "@material-ui/core/styles";

import AgreeIcon from "@material-ui/icons/ExposurePlus1";
import Box from "@material-ui/core/Box";
import DeserveIcon from "@material-ui/icons/EmojiEvents";
import DisagreeIcon from "@material-ui/icons/ExposureNeg1Outlined";
import HighlightIcon from "@material-ui/icons/Highlight";
import IconButton from "@material-ui/core/IconButton";
import LoveIcon from "@material-ui/icons/Favorite";
import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";
import formateNumber from "../../../util/formateNumber";
import useStyles from "../../styles";

const useLocalStyles = makeStyles((theme: Theme) => ({}));

function ReactionView(props: any) {
  const { note } = props;
  const {
    highlightIconStyle,
    disagreeIconStyle,
    loveIconStyle,
    plusIconStyle,
    deserveIconStyle,
    reactionStyle,
  } = useStyles();
  const {} = useLocalStyles();

  return (
    <React.Fragment>
      <Box display="flex" justifyContent="space-between">
        {note?.totalDisagree ? (
          <Box display="flex">
            <Box mr={0.5}>
              <Zoom in={true} timeout={1500}>
                <Tooltip arrow title="Disagree">
                  <IconButton
                    className={disagreeIconStyle}
                    color="secondary"
                    size="small"
                  >
                    <DisagreeIcon className={reactionStyle} />
                  </IconButton>
                </Tooltip>
              </Zoom>
            </Box>
            <Box mr={1}>
              <Typography variant="h6">
                {formateNumber(note?.totalDisagree)}
              </Typography>
            </Box>
          </Box>
        ) : null}
        {note?.totalLove ? (
          <Box display="flex">
            <Box mr={0.5}>
              <Zoom in={true} timeout={1500}>
                <Tooltip arrow title="Love It">
                  <IconButton
                    className={loveIconStyle}
                    color="secondary"
                    size="small"
                  >
                    <LoveIcon className={reactionStyle} />
                  </IconButton>
                </Tooltip>
              </Zoom>
            </Box>
            <Box mr={1}>
              <Typography variant="h6">
                {formateNumber(note?.totalLove)}
              </Typography>
            </Box>
          </Box>
        ) : null}
        {note?.totalAgree ? (
          <Box display="flex">
            <Box mr={0.5}>
              <Zoom in={true} timeout={1500}>
                <Tooltip arrow title="Agree">
                  <IconButton
                    className={plusIconStyle}
                    color="secondary"
                    size="small"
                  >
                    <AgreeIcon className={reactionStyle} />
                  </IconButton>
                </Tooltip>
              </Zoom>
            </Box>
            <Box mr={1}>
              <Typography variant="h6">
                {formateNumber(note?.totalAgree)}
              </Typography>
            </Box>
          </Box>
        ) : null}
        {note?.totalHighlight ? (
          <Box display="flex">
            <Box mr={0.5}>
              <Zoom in={true} timeout={1500}>
                <Tooltip arrow title="Highlight">
                  <IconButton
                    className={highlightIconStyle}
                    color="secondary"
                    size="small"
                  >
                    <HighlightIcon className={reactionStyle} />
                  </IconButton>
                </Tooltip>
              </Zoom>
            </Box>
            <Box mr={1}>
              <Typography variant="h6">
                {formateNumber(note?.totalHighlight)}
              </Typography>
            </Box>
          </Box>
        ) : null}
        {note?.totalDeserve ? (
          <Box display="flex">
            <Box mr={0.5}>
              <Zoom in={true} timeout={1500}>
                <Tooltip arrow title="Deserve">
                  <IconButton
                    className={deserveIconStyle}
                    color="secondary"
                    size="small"
                  >
                    <DeserveIcon className={reactionStyle} />
                  </IconButton>
                </Tooltip>
              </Zoom>
            </Box>
            <Box mr={1}>
              <Typography variant="h6">
                {formateNumber(note?.totalDeserve)}
              </Typography>
            </Box>
          </Box>
        ) : null}
        {!note?.totalReactions ? (
          <Box mr={2}>
            <Typography variant="h6">Be the first to react</Typography>
          </Box>
        ) : null}
      </Box>
    </React.Fragment>
  );
}

export default ReactionView;
