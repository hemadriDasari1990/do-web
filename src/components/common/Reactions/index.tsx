import { Theme, makeStyles } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import DeserveIcon from "@material-ui/icons/EmojiEvents";
import Grid from "@material-ui/core/Grid";
import HighlightIcon from "@material-ui/icons/Highlight";
import LoveIcon from "@material-ui/icons/Favorite";
import MinusOneIcon from "@material-ui/icons/ExposureNeg1Outlined";
import Paper from "@material-ui/core/Paper";
import PlusOneIcon from "@material-ui/icons/ExposurePlus1";
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
    minusOneIconStyle,
    highlightIconStyle,
    deserveIconStyle,
    loveIconStyle,
  } = useStyles();

  return (
    <Box mt={5}>
      <Container>
        <Grid container spacing={10}>
          <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
            <Paper className={`${plusIconStyle} ${paperStyle}`}>
              <PlusOneIcon color="secondary" className={iconStyle} />
            </Paper>
            <Box mt={1}>
              <Typography variant="h2" className={titleStyle}>
                Agree
              </Typography>
            </Box>
          </Grid>

          <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
            <Paper className={`${loveIconStyle} ${paperStyle}`}>
              <LoveIcon color="secondary" className={iconStyle} />
            </Paper>
            <Box mt={1}>
              <Typography variant="h2" className={titleStyle}>
                Love
              </Typography>
            </Box>
          </Grid>
          <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
            <Paper className={`${deserveIconStyle} ${paperStyle}`}>
              <DeserveIcon color="secondary" className={iconStyle} />
            </Paper>
            <Box mt={1}>
              <Typography variant="h2" className={titleStyle}>
                Deserve
              </Typography>
            </Box>
          </Grid>
          <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
            <Paper className={`${highlightIconStyle} ${paperStyle}`}>
              <HighlightIcon color="secondary" className={iconStyle} />
            </Paper>
            <Box mt={1}>
              <Typography variant="h2" className={titleStyle}>
                Highlight
              </Typography>
            </Box>
          </Grid>
          <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
            <Paper className={`${minusOneIconStyle} ${paperStyle}`}>
              <MinusOneIcon color="secondary" className={iconStyle} />
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
