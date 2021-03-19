import { Theme, makeStyles } from "@material-ui/core/styles";

import ArrowForwardOutlinedIcon from "@material-ui/icons/ArrowForwardOutlined";
import Button from "@material-ui/core/Button";
import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import { USER } from "../../routes/config";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme: Theme) => ({
  buttonStyle: {
    height: 40,
    width: 190,
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
  const { title } = props;
  const handleCreateUser = () => {
    history.push(USER);
  };

  return (
    <React.Fragment>
      <Tooltip title="Create Your User Account">
        <Button
          className={buttonStyle}
          variant="contained"
          color="primary"
          size="small"
          onClick={() => handleCreateUser()}
          endIcon={<ArrowForwardOutlinedIcon color="secondary" />}
        >
          {title}
        </Button>
      </Tooltip>
    </React.Fragment>
  );
};

export default CreateAccount;
