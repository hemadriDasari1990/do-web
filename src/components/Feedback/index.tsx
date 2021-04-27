import {
  ALPHABET_NUMBERIC_WITH_SPACE_AND_HYPHEN,
  ALPHA_NUMERIC_WITH_SPACE,
  allow,
} from "../../util/regex";
import { MAX_CHAR_COUNT, TITLE_MAX_CHAR_COUNT } from "../../util/constants";
import React, { useEffect, useState } from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { useFeedback, useLoading } from "../../redux/state/feedback";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import Divider from "@material-ui/core/Divider";
import DoSnackbar from "../Snackbar/components";
import Drawer from "@material-ui/core/Drawer";
import FeedbackIcon from "../../assets/feedback.svg";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { createFeedback } from "../../redux/actions/feedback";
import { getRemainingCharLength } from "../../util";
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
  const [like, setLike] = useState("");
  const [apiTriggered, setApiTriggered] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [count, setCount] = useState(0);

  /* React Hooks */
  useEffect(() => {
    if (!loading && apiTriggered && feedback?._id) {
      setApiTriggered(false);
      setTimeout(() => {
        handleDrawerClose();
      }, 2000);
      setOpenSnackbar(true);
      handleReset();
    }
    if (!loading && apiTriggered && !feedback?._id) {
      setApiTriggered(false);
    }

    return () => {};
  }, [loading, apiTriggered, feedback]);

  const handleComment = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
    const charCount = event.target.value.length;
    const charLeft = getRemainingCharLength(MAX_CHAR_COUNT, charCount);
    setCount(charLeft);
  };

  const handleAbout = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleInterest = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLike(event.target.name);
  };

  const handleSubmit = async () => {
    setApiTriggered(false);
    dispatch(
      createFeedback({
        title,
        description,
        like: like === "yes" ? true : false,
      })
    );
    setApiTriggered(true);
  };

  const handleReset = () => {
    setDescription("");
    setTitle("");
    setLike("");
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

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handlePrevent = (event: React.ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const renderSnackbar = () => {
    return (
      <DoSnackbar
        open={openSnackbar}
        status="success"
        handleClose={handleSnackbarClose}
      >
        <Typography variant="h6" color="secondary">
          Feedback Saved Successfully
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
        <Box>
          <Typography variant="body1" className={classes.breakText}>
            We'd love your feedback on your experience with our Retro tool
          </Typography>
          <Box mt={3}>
            <Typography variant="h4">Submit your feedback below</Typography>
          </Box>
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
            onCut={handlePrevent}
            onCopy={handlePrevent}
            onPaste={handlePrevent}
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
              allow(event, ALPHA_NUMERIC_WITH_SPACE, MAX_CHAR_COUNT)
            }
            onCut={handlePrevent}
            onCopy={handlePrevent}
            onPaste={handlePrevent}
          />
          <Typography variant="subtitle2">{count} chars</Typography>
        </Box>
        <Box mt={3}>
          <Box>
            <Typography variant="h5">Do you like the tool?</Typography>
          </Box>
          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={like === "yes"}
                  onChange={handleInterest}
                  value={true}
                  color="primary"
                  name="yes"
                />
              }
              label={<Typography variant="subtitle1">Yes</Typography>}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={like === "no"}
                  onChange={handleInterest}
                  value={false}
                  color="primary"
                  name="no"
                />
              }
              label={<Typography variant="subtitle1">No</Typography>}
            />
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
