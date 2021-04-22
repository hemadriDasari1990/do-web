import { Theme, makeStyles } from "@material-ui/core/styles";

import ArrowForwardOutlinedIcon from "@material-ui/icons/ArrowForwardOutlined";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
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
  const { title, hideArrow, subTitle } = props;
  const handleCreateUser = () => {
    history.push(SIGNUP);
  };

  return (
    <React.Fragment>
      <Tooltip arrow title="Create Your User Account">
        <Button
          className={buttonStyle}
          variant="contained"
          color="primary"
          size="small"
          onClick={() => handleCreateUser()}
          endIcon={
            !hideArrow ? <ArrowForwardOutlinedIcon color="secondary" /> : null
          }
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
