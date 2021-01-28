import Box from '@material-ui/core/Box'
import React from 'react'
import Zoom from '@material-ui/core/Zoom'
import noRecord from '../../assets/no-record.svg'

function NoRecords() {
  return (
    <Box style={{textAlign: "center"}}>
      <Zoom in={true} timeout={2000}>
        <img src={noRecord} height="200px" width="200px"/>
      </Zoom>
    </Box>
  )
}

export default NoRecords;
