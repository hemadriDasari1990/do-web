import { Theme, makeStyles } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
import DeserveIcon from "@material-ui/icons/EmojiEvents";
import DisAgreeIcon from "@material-ui/icons/ThumbDownAlt";
import IconButton from "@material-ui/core/IconButton";
import LoveIcon from "@material-ui/icons/Favorite";
import Plus2Icon from "@material-ui/icons/ExposurePlus2";
import PlusOneIcon from "@material-ui/icons/ExposurePlus1";
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
    plusTwoIconStyle,
    disAgreeIconStyle,
    loveIconStyle,
    plusIconStyle,
    deserveIconStyle,
    reactionStyle,
  } = useStyles();
  const {} = useLocalStyles();

  return (
    <React.Fragment>
      <Box display="flex" justifyContent="space-between">
        {note?.totalDisAgreed ? (
          <Box display="flex">
            <Box mr={0.5}>
              <Zoom in={true} timeout={1500}>
                <Tooltip title="Disagree">
                  <IconButton
                    className={disAgreeIconStyle}
                    color="secondary"
                    size="small"
                  >
                    <DisAgreeIcon className={reactionStyle} />
                  </IconButton>
                </Tooltip>
              </Zoom>
            </Box>
            <Box mr={1}>
              <Typography variant="h6">
                {formateNumber(note?.totalDisAgreed)}
              </Typography>
            </Box>
          </Box>
        ) : null}
        {note?.totalLove ? (
          <Box display="flex">
            <Box mr={0.5}>
              <Zoom in={true} timeout={1500}>
                <Tooltip title="Love It">
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
        {note?.totalPlusOne ? (
          <Box display="flex">
            <Box mr={0.5}>
              <Zoom in={true} timeout={1500}>
                <Tooltip title="+1">
                  <IconButton
                    className={plusIconStyle}
                    color="secondary"
                    size="small"
                  >
                    <PlusOneIcon className={reactionStyle} />
                  </IconButton>
                </Tooltip>
              </Zoom>
            </Box>
            <Box mr={1}>
              <Typography variant="h6">
                {formateNumber(note?.totalPlusOne)}
              </Typography>
            </Box>
          </Box>
        ) : null}
        {note?.totalPlusTwo ? (
          <Box display="flex">
            <Box mr={0.5}>
              <Zoom in={true} timeout={1500}>
                <Tooltip title="+2">
                  <IconButton
                    className={plusTwoIconStyle}
                    color="secondary"
                    size="small"
                  >
                    <Plus2Icon className={reactionStyle} />
                  </IconButton>
                </Tooltip>
              </Zoom>
            </Box>
            <Box mr={1}>
              <Typography variant="h6">
                {formateNumber(note?.totalPlusTwo)}
              </Typography>
            </Box>
          </Box>
        ) : null}
        {note?.totalDeserve ? (
          <Box display="flex">
            <Box mr={0.5}>
              <Zoom in={true} timeout={1500}>
                <Tooltip title="Deserve">
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
            <Typography variant="h6">No reactions yet</Typography>
          </Box>
        ) : null}
      </Box>
    </React.Fragment>
  );
}

export default ReactionView;
