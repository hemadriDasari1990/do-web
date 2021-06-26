import { Theme, makeStyles } from "@material-ui/core/styles";

import AgreeIcon from "@material-ui/icons/ExposurePlus1";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import DeserveIcon from "@material-ui/icons/EmojiEvents";
import DisagreeIcon from "@material-ui/icons/ExposureNeg1Outlined";
import Grid from "@material-ui/core/Grid";
import HighlightIcon from "@material-ui/icons/Highlight";
import LoveIcon from "@material-ui/icons/Favorite";
import Paper from "@material-ui/core/Paper";
import React from "react";
import Typography from "@material-ui/core/Typography";
import useStyles from "../../styles";

const useLocalStyles = makeStyles((theme: Theme) => ({
  paperStyle: {
    width: 60,
    height: 60,
    padding: 10,
    borderRadius: "50%",
  },
  titleStyle: {
    fontWeight: 600,
  },
  iconStyle: {
    fontSize: 40,
  },
}));

export default function ReactionsList(props: any) {
  const {} = props;
  const { titleStyle, paperStyle, iconStyle } = useLocalStyles();
  const {
    plusIconStyle,
    disagreeIconStyle,
    highlightIconStyle,
    deserveIconStyle,
    loveIconStyle,
  } = useStyles();

  return (
    <Box>
      <Container>
        <Grid container spacing={2}>
          <Grid item xl={2} lg={2} md={2} sm={4} xs={4}>
            <Paper className={`${plusIconStyle} ${paperStyle}`}>
              <AgreeIcon color="secondary" className={iconStyle} />
            </Paper>
            <Box mt={1}>
              <Typography variant="h2" className={titleStyle}>
                Agree
              </Typography>
            </Box>
          </Grid>

          <Grid item xl={2} lg={2} md={2} sm={4} xs={4}>
            <Paper className={`${loveIconStyle} ${paperStyle}`}>
              <LoveIcon color="secondary" className={iconStyle} />
            </Paper>
            <Box mt={1}>
              <Typography variant="h2" className={titleStyle}>
                Love
              </Typography>
            </Box>
          </Grid>
          <Grid item xl={2} lg={2} md={2} sm={4} xs={2}>
            <Paper className={`${deserveIconStyle} ${paperStyle}`}>
              <DeserveIcon color="secondary" className={iconStyle} />
            </Paper>
            <Box mt={1}>
              <Typography variant="h2" className={titleStyle}>
                Deserve
              </Typography>
            </Box>
          </Grid>
          <Grid item xl={2} lg={2} md={2} sm={4} xs={4}>
            <Paper className={`${highlightIconStyle} ${paperStyle}`}>
              <HighlightIcon color="secondary" className={iconStyle} />
            </Paper>
            <Box mt={1}>
              <Typography variant="h2" className={titleStyle}>
                Highlight
              </Typography>
            </Box>
          </Grid>
          <Grid item xl={2} lg={2} md={2} sm={4} xs={4}>
            <Paper className={`${disagreeIconStyle} ${paperStyle}`}>
              <DisagreeIcon color="secondary" className={iconStyle} />
            </Paper>
            <Box mt={1}>
              <Typography variant="h2" className={titleStyle}>
                Disagree
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
