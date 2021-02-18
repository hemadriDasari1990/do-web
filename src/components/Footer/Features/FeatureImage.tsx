import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import React from 'react'
import Slide from '@material-ui/core/Slide'
import Zoom from '@material-ui/core/Zoom'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({

});

function FeaturesImage(props: any) {
    const { direction, image } = props;
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
                <Box textAlign="center">
                    <Zoom in={true} timeout={2000}>
                        <img src={image} height="200px" width="fit-content"/>
                    </Zoom>
                </Box>
            </Grid>
        </Slide>
      </React.Fragment>
    )
}

export default FeaturesImage;
