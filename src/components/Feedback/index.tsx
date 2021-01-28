import React, { useEffect, useState } from 'react'
import { createFeedback, getFeedbacks } from "../../redux/actions/feedback";
import { useFeedback, useLoading } from "../../redux/state/feedback"

import Box from '@material-ui/core/Box'
import Checkbox from '@material-ui/core/Checkbox'
import Container from '@material-ui/core/Container'
import Fab from '@material-ui/core/Fab'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Grid from '@material-ui/core/Grid'
import Slide from '@material-ui/core/Slide'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { useDispatch } from "react-redux";

const Loader = React.lazy(() => import("../Loader/components"));
const FeedbackList = React.lazy(() => import("./list"));

function Feedback() {
    const dispatch = useDispatch();
    /* Redux hooks */
    const { feedback } = useFeedback();
    const { loading } = useLoading();
    
    /* Local state */
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [yes, setYes] = useState(false);
    const [no, setNo] = useState(false);
    const [feedbacks, setFeedbacks] = useState<Array<{[Key:string]: any}>>(feedback);
    const [apiTriggered, setApiTriggered] = useState(false);
    const [apiTriggered1, setApiTriggered1] = useState(false);

    /* React Hooks */
    useEffect(() => {
        if(!loading && apiTriggered && feedback?._id){
          setFeedbacks((currentFeedbacks: Array<{[Key:string]: any}>) => [...currentFeedbacks, feedback]);
          setApiTriggered(false);
          handleReset();
        }
        if(!loading && apiTriggered && !feedback?._id){
          setApiTriggered(false);
        }
    }, [loading, apiTriggered, feedback])

    useEffect(() => {
      if(!loading && apiTriggered1 && Array.isArray(feedback)){
        setFeedbacks(feedback);
        setApiTriggered1(false);
      }
      if(!loading && apiTriggered1 && !Array.isArray(feedback)){
        setApiTriggered1(false);
      }
  }, [loading, apiTriggered1, feedback])

    useEffect(() => {
      setApiTriggered1(false);
      dispatch(getFeedbacks());
      setApiTriggered1(true);
    }, []);

  const handleComment = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  }

  const handleAbout = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  }

  const handleInterest = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.name) {
        case 'yes':
            setYes(true);
            setNo(false);
          break;
        case 'no':
          setYes(false);
          setNo(true);
          break;
        default:
          break;
      }
    }

  const handleSubmit = async () => {
    setApiTriggered(false);
    dispatch(createFeedback({
      title,
      description,
      like: yes ? yes: false
    }));
    setApiTriggered(true);
  }

  const handleReset = () => {
    setDescription("");
    setTitle("");
    setYes(false);
    setNo(false);
  }

    return (
      <React.Fragment>
        <Container>
          <Box mt={3}>
            <Typography component="h1" variant="h1">Feedback</Typography>
          </Box>
          <Box mt={3}>
            <Typography component="p" variant="subtitle2">
              This page is designed for end users to help us improve the system by
              sharing their user experience. In order to submit any form user has to
              first login to the page using one of the social logins provided.{' '}
            </Typography>
            <Typography component="p" variant="subtitle2">
              Users feedback is valuable for Us and we're always thankfull to them :)
            </Typography>
          </Box>
          <Box mt={3}>
            <Typography component="h4" variant="h4">Submit your feedback below</Typography>
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
                  rowsMax="4"
                  value={description}
                  onChange={handleComment}
                  required
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xl={6} lg={6} md={6} sm={8} xs={12}>
                <Box mt={3} display="flex">
                  <Typography component="h2" variant="h2">Do you like this Letsdoretro board?</Typography>
                  <Box ml={4} mt={-1.2}>
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
          <Box my={3}>
            <Fab
                variant="extended"
                color="primary"
                size="small"
                onClick={() => handleSubmit()}
                className="mr-10"
            >
                Submit
            </Fab>
            <Fab
                variant="extended"
                color="primary"
                size="small"
                onClick={() => handleReset()}
            >
                Reset
            </Fab>
          </Box>
            <Box>
              <Slide
                direction="right"
                in={true}
                timeout={1500}
                mountOnEnter
                unmountOnExit
              >
                <Typography component="h2" variant="h2">What people say</Typography>
              </Slide>
            </Box>
          <Loader showLoader={loading} />
          {!loading && <FeedbackList feedbacks={feedbacks} />}
        </Container>
      </React.Fragment>
    )
}

export default Feedback;
