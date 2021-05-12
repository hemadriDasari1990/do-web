import React from "react";
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

const useStyles = makeStyles({});

export default function Recommendation(props: any) {
  const { open, handleClose } = props;
  const {} = useStyles();
  const [rating, setRating] = React.useState<number | null>(0);
  const [description, setDescription] = React.useState("");
  const dispatch = useDispatch();

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
    dispatch(
      createRecommendation({
        description,
        rating,
      })
    );
  };

  return (
    <React.Fragment>
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={toggleDrawer}
        onOpen={toggleDrawer}
      >
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
