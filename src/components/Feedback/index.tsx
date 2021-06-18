import {
  ALPHABET_NUMBERIC_WITH_SPACE_AND_HYPHEN,
  ALPHA_NUMERIC_AND_SPECIAL_CHARACTERS_WITHOUT_PERCENTAGE,
  allow,
} from "../../util/regex";
import {
  MAX_CHAR_COUNT,
  TITLE_MAX_CHAR_COUNT,
  feedbackLabels,
} from "../../util/constants";
import React, { useEffect, useState } from "react";
import {
  Theme,
  createStyles,
  makeStyles,
  withStyles,
} from "@material-ui/core/styles";
import { useFeedback, useLoading } from "../../redux/state/feedback";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import Divider from "@material-ui/core/Divider";
import DoSnackbar from "../Snackbar/components";
import Drawer from "@material-ui/core/Drawer";
import FeedbackIcon from "../../assets/feedback.svg";
import IconButton from "@material-ui/core/IconButton";
import Rating from "@material-ui/lab/Rating";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { createFeedback } from "../../redux/actions/feedback";
import { useDispatch } from "react-redux";

const drawerWidth = 339;

const Loader = React.lazy(() => import("../Loader/components"));
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      flexShrink: 1,
    },
    drawerPaper: {
      width: drawerWidth,
      padding: 10,
      borderRadius: 6,
      boxShadow: "0 3rem 6rem rgba(0, 0, 0, .1)",
      [theme.breakpoints.down("xs")]: {
        width: 376,
      },
      overflow: "hidden",
    },
    drawerHeader: {
      margin: "10px 10px",
    },
    headerStyle: {
      color: "inherit",
    },
    breakText: {
      whiteSpace: "initial",
    },
  })
);

const StyledRating = withStyles({
  iconFilled: {
    color: "#ffc800",
  },
  iconHover: {
    color: "#ffc800",
  },
})(Rating);

function Feedback(props: any) {
  const { open, handleDrawerClose } = props;
  const dispatch = useDispatch();
  /* Redux hooks */
  const { feedback } = useFeedback();
  const { loading } = useLoading();
  const classes = useStyles();
  /* Local state */
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState<number | null>(0);
  const [apiTriggered, setApiTriggered] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [count, setCount] = useState(0);
  const [hover, setHover] = useState(-1);

  /* React Hooks */
  useEffect(() => {
    if (!loading && apiTriggered && feedback?.success) {
      setApiTriggered(false);
      setTimeout(() => {
        handleDrawerClose();
      }, 2000);
      setOpenSnackbar(true);
      handleReset();
    }
    if (!loading && apiTriggered && feedback?.errorId) {
      setApiTriggered(false);
      setOpenSnackbar(true);
    }

    return () => {};
  }, [loading, apiTriggered, feedback]);

  const handleComment = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
    const charCount = event.target.value.length;
    setCount(charCount);
  };

  const handleAbout = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSubmit = async () => {
    setApiTriggered(false);
    dispatch(
      createFeedback({
        title,
        description,
        rating: rating,
      })
    );
    setApiTriggered(true);
  };

  const handleReset = () => {
    setDescription("");
    setTitle("");
    setRating(null);
  };

  const disableButton = () => {
    if (!title || title?.length <= 4) {
      return true;
    }
    if (!description || description?.length <= 10) {
      return true;
    }
    if (!rating) {
      return true;
    }
    return false;
  };

  const handleRating = (value: number | null) => {
    setRating(value);
  };

  const handleChangeActive = (newHover: number) => {
    setHover(newHover);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const renderSnackbar = () => {
    return (
      <DoSnackbar
        open={openSnackbar}
        status={feedback?.errorId ? "error" : "success"}
        handleClose={handleSnackbarClose}
      >
        <Typography variant="h6" color="secondary">
          {feedback?.errorId ? feedback.message : ""}
          {feedback?.success ? feedback.message : ""}
        </Typography>
      </DoSnackbar>
    );
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="right"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      {renderSnackbar()}
      <Loader enable={loading} backdrop={true} />
      <Box
        display="flex"
        // justifyContent="space-between"
        className={classes.drawerHeader}
      >
        <Box ml="auto" className={classes.headerStyle}>
          <Typography variant="h5">Feedback</Typography>
        </Box>
        <Box ml="auto">
          <IconButton
            size="small"
            // className={classes.iconStyle}
            onClick={handleDrawerClose}
          >
            <CloseOutlinedIcon color="primary" fontSize="small" />
          </IconButton>
        </Box>
      </Box>
      <Divider />
      <Box p={3} width={drawerWidth}>
        <Box>
          <img src={FeedbackIcon} height={200} width={350} />
        </Box>
        <Box mt={2}>
          <Typography variant="h5" className={classes.breakText}>
            We'd love your feedback on your experience with our Retro tool
          </Typography>
        </Box>
        <Box>
          <TextField
            fullWidth
            name="title"
            id="title"
            label="Summary"
            value={title}
            onChange={handleAbout}
            required
            onKeyPress={(event: React.KeyboardEvent<any>) =>
              allow(
                event,
                ALPHABET_NUMBERIC_WITH_SPACE_AND_HYPHEN,
                TITLE_MAX_CHAR_COUNT
              )
            }
          />
        </Box>
        <Box mt={1}>
          <TextField
            fullWidth
            id="description"
            name="description"
            label="Description"
            multiline
            rowsMax={8}
            value={description}
            onChange={handleComment}
            required
            onKeyPress={(event: React.KeyboardEvent<any>) =>
              allow(
                event,
                ALPHA_NUMERIC_AND_SPECIAL_CHARACTERS_WITHOUT_PERCENTAGE,
                MAX_CHAR_COUNT
              )
            }
          />
          <Typography variant="subtitle2">
            {count}/{MAX_CHAR_COUNT} chars
          </Typography>
        </Box>
        <Box mt={1}>
          <Box>
            <Typography variant="h5" className={classes.breakText}>
              How would you rate your experience with our product?
            </Typography>
          </Box>
          <Box display="flex">
            <StyledRating
              value={rating}
              precision={1}
              onChange={(event, newValue: number | null) =>
                handleRating(newValue)
              }
              onChangeActive={(event, newHover) => handleChangeActive(newHover)}
              size="large"
            />
            {rating !== null && (
              <Box ml={2} mt={0.8}>
                {feedbackLabels[hover !== -1 ? hover : rating]}
              </Box>
            )}
          </Box>
        </Box>
        <Box my={3} display="flex">
          <Box mr={1}>
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
      </Box>
    </Drawer>
  );
}

export default Feedback;
