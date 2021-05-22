import { Theme, makeStyles } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import FlashOnIcon from "@material-ui/icons/FlashOn";
import React from "react";
import { SIGNUP } from "../../routes/config";
import Tooltip from "@material-ui/core/Tooltip";
import { Typography } from "@material-ui/core";
import { useHistory } from "react-router";

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

const CreateAccount = (props: any) => {
  const { buttonStyle } = useStyles();
  const history = useHistory();
  const { title, subTitle, handleButton } = props;

  const handleCreateUser = () => {
    if (typeof handleButton === "function") {
      handleButton();
    } else {
      history.push(SIGNUP);
    }
  };

  return (
    <React.Fragment>
      <Tooltip arrow title={title}>
        <Button
          className={buttonStyle}
          variant="contained"
          color="primary"
          size="small"
          onClick={() => handleCreateUser()}
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

export default CreateAccount;
