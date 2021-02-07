import Box from '@material-ui/core/Box'
import React from 'react'
import Typography from '@material-ui/core/Typography'
import Zoom from '@material-ui/core/Zoom'
import noRecord from '../../assets/no-record.svg'

function NoRecords(props: any) {
  const { message } = props;
  return (
    <Box style={{textAlign: "center"}}>
      <Zoom in={true} timeout={2000}>
        <img src={noRecord} height="200px" width="fit-content"/>
      </Zoom>
      <Box mt={3}>
        <Typography variant="h4">{message}</Typography>
      </Box>
    </Box>
  )
}

export default NoRecords;
