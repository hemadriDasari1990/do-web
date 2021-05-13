import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import {
  Box,
  TextField,
  Typography,
  IconButton,
  Container,
  Button,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import ClearIcon from "@material-ui/icons/Clear";
import { ALPHA_NUMERIC_WITH_SPACE, allow } from "../../util/regex";
import { MAX_CHAR_COUNT } from "../../util/constants";
import { useDispatch } from "react-redux";
import { createRecommendation } from "../../redux/actions/recommendation";
import { useLogin } from "../../redux/state/login";
import {
  useRecommendation,
  useLoading,
} from "../../redux/state/recommendation";
import Loader from "../Loader/components";
import DoSnackbar from "../Snackbar/components";

const useStyles = makeStyles({});

export default function Recommendation(props: any) {
  const { open, handleClose } = props;
  const {} = useStyles();
  const [rating, setRating] = React.useState<number | null>(0);
  const [description, setDescription] = React.useState("");
  const dispatch = useDispatch();
  const { memberId } = useLogin();
  const { recommendation } = useRecommendation();
  const { loading } = useLoading();
  const [apiTriggered, setApiTriggered] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (!loading && apiTriggered && recommendation?.success) {
      setApiTriggered(false);
      setTimeout(() => {
        handleClose();
      }, 2000);
      setOpenSnackbar(true);
    }
    if (!loading && apiTriggered && recommendation?.errorId) {
      setApiTriggered(false);
      setOpenSnackbar(true);
    }

    return () => {};
  }, [loading, apiTriggered, recommendation]);

  const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }
    handleClose();
  };

  const handleDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleSend = () => {
    setApiTriggered(false);
    dispatch(
      createRecommendation({
        description,
        rating,
        memberId,
      })
    );
    setApiTriggered(true);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const renderSnackbar = () => {
    return (
      <DoSnackbar
        open={openSnackbar}
        status={recommendation?.errorId ? "error" : "success"}
        handleClose={handleSnackbarClose}
      >
        <Typography variant="h6" color="secondary">
          {recommendation?.errorId ? recommendation.message : ""}
          {recommendation?.success ? recommendation.message : ""}
        </Typography>
      </DoSnackbar>
    );
  };

  const disableButton = () => {
    if (!description || description?.length <= 10) {
      return true;
    }
    if (!rating) {
      return true;
    }
    return false;
  };

  return (
    <React.Fragment>
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={toggleDrawer}
        onOpen={toggleDrawer}
      >
        {renderSnackbar()}
        <Loader enable={loading} backdrop={true} />
        <Box mb={5}>
          <Box display="flex" justifyContent="flex-end">
            <IconButton onClick={toggleDrawer}>
              <ClearIcon />
            </IconButton>
          </Box>
          <Box textAlign="center">
            {!rating ? (
              <Typography variant="h5">
                Based on your experience so far, how likely are you to recommend
                Let's do retro to a friend or colleague?
              </Typography>
            ) : (
              <Typography variant="h5">
                We love that you love Let's do retro. Let's work together to
                make it even better.
              </Typography>
            )}
          </Box>
          {rating ? (
            <Container>
              <Box display="flex">
                <TextField
                  multiline
                  name="description"
                  id="description"
                  label="Feedback"
                  placeholder="Tell us something that keeps you coming back. or something that might take it up another level."
                  value={description}
                  defaultValue={description}
                  onChange={handleDescription}
                  required
                  fullWidth
                  onKeyPress={(event: React.KeyboardEvent<any>) =>
                    allow(event, ALPHA_NUMERIC_WITH_SPACE, MAX_CHAR_COUNT)
                  }
                />
                <Box mt={2} ml={2}>
                  <Button
                    onClick={() => handleSend()}
                    variant="contained"
                    color="primary"
                    disabled={disableButton()}
                  >
                    <Typography variant="h6" color="secondary">
                      Send
                    </Typography>
                  </Button>
                </Box>
              </Box>
            </Container>
          ) : null}
          <Box display="flex" justifyContent="center" mt={2}>
            <Box mr={3} mt={0.5}>
              <Typography variant="h6">Not at all likely</Typography>
            </Box>
            <Box mr={3}>
              <Rating
                max={10}
                size="large"
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
              />
            </Box>
            <Box mt={0.5}>
              <Typography variant="h6">Extremely likely</Typography>
            </Box>
          </Box>
        </Box>
      </SwipeableDrawer>
    </React.Fragment>
  );
}
