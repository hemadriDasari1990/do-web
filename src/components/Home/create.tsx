import { Theme, makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import { ORGANIZATION } from "../../routes/config";
import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme: Theme) => ({
  buttonStyle: {
    height: 45,
    "& .MuiButton-label": {
      justifyContent: "center",
    },
    [theme.breakpoints.down("xs")]: {
      width: "95%",
    },
  },
}));

const CreateAccount = () => {
  const { buttonStyle } = useStyles();
  const history = useHistory();

  const handleCreateOrganization = () => {
    history.push(ORGANIZATION);
  };

  return (
    <React.Fragment>
      <Tooltip title="Create Your Organization Account">
        <Button
          className={buttonStyle}
          variant="contained"
          color="primary"
          size="small"
          onClick={() => handleCreateOrganization()}
        >
          Create Organization Account
        </Button>
      </Tooltip>
    </React.Fragment>
  );
};

export default CreateAccount;
