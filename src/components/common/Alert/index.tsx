import Alert from "@material-ui/lab/Alert";
import Container from "@material-ui/core/Container";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  paperStyle: {
    width: "100%",
    height: 100,
    borderRadius: 0,
    backgroundColor: "#f0f8ff",
    boxShadow: "none",
    border: "none",
  },
}));

const DoAlert = React.memo((props: any) => {
  const { message } = props;
  const {} = useStyles();

  return (
    <Container>
      <Alert icon={false} severity="success">
        {message}
      </Alert>
    </Container>
  );
});

export default DoAlert;
