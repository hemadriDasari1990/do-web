import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import React from 'react'
import Slide from '@material-ui/core/Slide'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({

});

function FeaturesContent(props: any) {
    const { direction, title, description } = props;
  const {  } = useStyles();
    return (
      <React.Fragment>
        <Slide
            direction={direction}
            in={true}
            timeout={1500}
            mountOnEnter
            unmountOnExit
        >
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <Box mb={2}>
                    <Typography variant="h1">{title}</Typography>
                </Box>
                <Box mb={5}>
                    <Typography variant="body1">{description}</Typography>
                </Box>
            </Grid>
        </Slide>
      </React.Fragment>
    )
}

export default FeaturesContent;
