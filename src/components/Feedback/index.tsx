import React, { useEffect, useState } from "react";
import { createFeedback, getFeedbacks } from "../../redux/actions/feedback";
import { useFeedback, useLoading } from "../../redux/state/feedback";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { useDispatch } from "react-redux";

const Loader = React.lazy(() => import("../Loader/components"));
const FeedbackList = React.lazy(() => import("./list"));

function Feedback(props: any) {
  const { showFeedbacks } = props;
  const dispatch = useDispatch();
  /* Redux hooks */
  const { feedback } = useFeedback();
  const { loading } = useLoading();

  /* Local state */
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [yes, setYes] = useState(false);
  const [no, setNo] = useState(false);
  const [feedbacks, setFeedbacks] = useState<Array<{ [Key: string]: any }>>(
    feedback
  );
  const [apiTriggered, setApiTriggered] = useState(false);
  const [apiTriggered1, setApiTriggered1] = useState(false);

  /* React Hooks */
  useEffect(() => {
    if (!loading && apiTriggered && feedback?._id) {
      setFeedbacks((currentFeedbacks: Array<{ [Key: string]: any }>) => [
        ...currentFeedbacks,
        feedback,
      ]);
      setApiTriggered(false);
      handleReset();
    }
    if (!loading && apiTriggered && !feedback?._id) {
      setApiTriggered(false);
    }
  }, [loading, apiTriggered, feedback]);

  useEffect(() => {
    if (!loading && apiTriggered1 && Array.isArray(feedback)) {
      setFeedbacks(feedback);
      setApiTriggered1(false);
    }
    if (!loading && apiTriggered1 && !Array.isArray(feedback)) {
      setApiTriggered1(false);
    }
  }, [loading, apiTriggered1, feedback]);

  useEffect(() => {
    setApiTriggered1(false);
    dispatch(getFeedbacks());
    setApiTriggered1(true);
  }, []);

  const handleComment = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleAbout = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleInterest = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.name) {
      case "yes":
        setYes(true);
        setNo(false);
        break;
      case "no":
        setYes(false);
        setNo(true);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async () => {
    setApiTriggered(false);
    dispatch(
      createFeedback({
        title,
        description,
        like: yes ? yes : false,
      })
    );
    setApiTriggered(true);
  };

  const handleReset = () => {
    setDescription("");
    setTitle("");
    setYes(false);
    setNo(false);
  };

  const disableButton = () => {
    if (!title || title?.length <= 4) {
      return true;
    }
    if (!description || description?.length <= 10) {
      return true;
    }
    return false;
  };

  return (
    <React.Fragment>
      <Container>
        <Box pt={5}>
          <Typography variant="h1">Feedback</Typography>
        </Box>
        <Box mt={3}>
          <Typography variant="body1">
            This page is designed for end users to help us improve the system by
            sharing their user experience.
          </Typography>
          <Box mt={2}>
            <Typography variant="body2">
              Users feedback is valuable for Us and we're always thankfull:)
            </Typography>
          </Box>
        </Box>
        <Box mt={3}>
          <Typography variant="h4">Submit your feedback below</Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
            <TextField
              fullWidth
              name="title"
              id="title"
              label="Feedback About"
              value={title}
              onChange={handleAbout}
              required
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
            <TextField
              fullWidth
              id="description"
              name="description"
              label="Your Comments"
              multiline
              rowsMax={4}
              value={description}
              onChange={handleComment}
              required
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xl={6} lg={6} md={6} sm={8} xs={12}>
            <Box mt={3} display="flex" justifyContent="space-between">
              <Box>
                <Typography variant="h4">
                  Do you like this Letsdoretro board?
                </Typography>
              </Box>
              <Box mt={-1.2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={yes}
                      onChange={handleInterest}
                      value={true}
                      color="primary"
                      name="yes"
                    />
                  }
                  label="Yes"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={no}
                      onChange={handleInterest}
                      value={false}
                      color="primary"
                      name="no"
                    />
                  }
                  label="No"
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Box my={3} display="flex">
          <Box mr={5}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => handleSubmit()}
              className="mr-10"
              disabled={disableButton()}
            >
              Submit
            </Button>
          </Box>
          <Box>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              onClick={() => handleReset()}
            >
              Reset
            </Button>
          </Box>
        </Box>
        {feedbacks?.length ? (
          <Box>
            <Slide
              direction="right"
              in={true}
              timeout={1500}
              mountOnEnter
              unmountOnExit
            >
              <Typography component="h2" variant="h2">
                What people say
              </Typography>
            </Slide>
          </Box>
        ) : null}
        <Loader enable={loading} />
        {!loading && feedbacks?.length ? (
          <FeedbackList feedbacks={feedbacks} showFeedbacks={showFeedbacks} />
        ) : null}
      </Container>
    </React.Fragment>
  );
}

export default Feedback;
