import React, { useEffect, useState } from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";
import {
  createSecurityQuestionAnswer,
  getSecurityQuestions,
  verifySecurityQuestionAnswer,
} from "../../../../redux/actions/securityQuestion";
import {
  useLoading,
  useSecurityQuestion,
} from "../../../../redux/state/securityQuestion";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import DoAutoComplete from "../../../common/DoAutoComplete";
import DoSnackbar from "../../../Snackbar/components";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { storeAction } from "../../../../redux/actions/common";

const useStyles = makeStyles((theme: Theme) => ({
  textFieldStyle: {
    width: "100% !important",
    marginTop: theme.spacing(3),
  },
}));

const SecurityQuestions = (props: any) => {
  const { verify } = props;
  const { textFieldStyle } = useStyles();
  const dispatch = useDispatch();

  const { questions, securityQuestionResponse } = useSecurityQuestion();
  const { loading } = useLoading();

  /* Local state */
  const [formData, setFormData] = useState<{ [Key: string]: any }>({
    value: "",
    password: "",
  });
  const { value, password } = formData;
  const [questionId, setQuestionId] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [apiCalled, setApiCalled] = useState(false);

  useEffect(() => {
    dispatch(getSecurityQuestions());
  }, []);

  useEffect(() => {
    if (
      !loading &&
      (securityQuestionResponse?.errorId ||
        (securityQuestionResponse?.code && apiCalled))
    ) {
      setOpenSnackbar(true);
      setApiCalled(false);
    }
    if (!loading && securityQuestionResponse?.message && apiCalled) {
      setOpenSnackbar(true);
      setTimeout(() => {
        dispatch(storeAction(""));
        setApiCalled(false);
      }, 2000);
    }
  }, [loading, securityQuestionResponse, apiCalled]);

  /* Handler functions */
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSave = () => {
    setApiCalled(false);
    if (verify) {
      dispatch(
        verifySecurityQuestionAnswer({
          questionId,
          ...formData,
        })
      );
      return;
    }
    dispatch(
      createSecurityQuestionAnswer({
        questionId,
        ...formData,
      })
    );
    setApiCalled(true);
  };

  const handleQuestion = (data: { [Key: string]: any }) => {
    setQuestionId(data?._id);
  };

  const disableButton = () => {
    if (!value || !value?.trim()?.length) {
      return true;
    }
    if (!password || !password?.trim()?.length) {
      return true;
    }
    return false;
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const renderSnackbar = () => {
    return (
      <DoSnackbar
        open={openSnackbar}
        status={
          securityQuestionResponse?.errorId || securityQuestionResponse?.code
            ? "error"
            : "success"
        }
        handleClose={handleSnackbarClose}
      >
        <Typography variant="h6" color="secondary">
          {securityQuestionResponse?.errorMessage ||
            securityQuestionResponse?.message ||
            securityQuestionResponse?.codeName}
        </Typography>
      </DoSnackbar>
    );
  };

  return (
    <React.Fragment>
      {renderSnackbar()}
      <Box mt={2}>
        <DoAutoComplete
          textInputLabel="Select your Question"
          textInputPlaceholder="Search for Security Question"
          optionKey="name"
          options={questions}
          onChange={(e: any, data: { [Key: string]: any }) =>
            handleQuestion(data)
          }
        />
        {questionId ? (
          <>
            {!verify && (
              <Box>
                <TextField
                  name="password"
                  label="Current Password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleInput(event)
                  }
                  required
                  className={textFieldStyle}
                />
              </Box>
            )}

            <Box>
              <TextField
                label="Answer"
                name="value"
                type="password"
                placeholder="Enter your answer"
                value={value}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleInput(event)
                }
                required
                className={textFieldStyle}
              />
            </Box>
          </>
        ) : null}
        <Box mt={5} display="flex" justifyContent="flex-end">
          <Button
            variant={disableButton() ? "outlined" : "contained"}
            color={"primary"}
            onClick={() => handleSave()}
            disabled={disableButton()}
          >
            <Typography
              variant="h6"
              color={disableButton() ? "primary" : "secondary"}
            >
              {verify ? "Save Answer" : "Submit Answer"}
            </Typography>
          </Button>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default SecurityQuestions;
