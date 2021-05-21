import { Theme, makeStyles } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import React, { useState } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import { Typography } from "@material-ui/core";
import FlashOnIcon from "@material-ui/icons/FlashOn";
import InstantRetro from "./instantRetro";

const useStyles = makeStyles((theme: Theme) => ({
  buttonStyle: {
    height: 40,
    width: "fit-content",
    "& .MuiButton-label": {
      justifyContent: "center",
    },
    [theme.breakpoints.down("xs")]: {
      width: "95%",
    },
  },
}));

const InstantRetroGrid = (props: any) => {
  const { buttonStyle } = useStyles();
  const { title, subTitle } = props;
  const [openRetroDialog, setOpenRetroDialog] = useState(false);

  const handleStartInstantRetro = () => {
    setOpenRetroDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenRetroDialog(false);
  };

  return (
    <React.Fragment>
      <InstantRetro
        openDialog={openRetroDialog}
        handleCloseDialog={handleCloseDialog}
      />
      <Tooltip arrow title={title}>
        <Button
          className={buttonStyle}
          variant="contained"
          color="primary"
          size="small"
          onClick={() => handleStartInstantRetro()}
          startIcon={<FlashOnIcon color="secondary" />}
        >
          {title}
        </Button>
      </Tooltip>
      <Box mt={1}>
        <Typography variant="h6">{subTitle}</Typography>
      </Box>
    </React.Fragment>
  );
};

export default InstantRetroGrid;
