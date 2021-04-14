import React, { Suspense, useEffect, useState } from "react";
// import BoardSkeleton from "../common/skeletons/board";
import { useBoard, useBoardLoading } from "../../redux/state/board";

import Box from "@material-ui/core/Box";
// import Dialog from "@material-ui/core/Dialog";
// import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
// import Slide from "@material-ui/core/Slide";
// import { TransitionProps } from "@material-ui/core/transitions";
// import DialogTitle from "@material-ui/core/DialogTitle";
import Hidden from "@material-ui/core/Hidden";
import Notify from "../../assets/notify.svg";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";
import { getBoardDetails } from "../../redux/actions/board";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { useLogin } from "../../redux/state/login";
import { useHistory, useParams } from "react-router";
import { ROOT } from "../../routes/config";

const SectionList = React.lazy(() => import("./list"));
const ResponsiveDialog = React.lazy(() => import("../Dialog"));

const useStyles = makeStyles(() => ({
  boxStyle: {
    backgroundColor: "#fff",
    overflow: "hidden",
  },
}));

// const Transition = React.forwardRef(function Transition(
//   props: TransitionProps & { children?: React.ReactElement<any, any> },
//   ref: React.Ref<unknown>
// ) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

export default function Section() {
  const { boxStyle } = useStyles();
  const dispatch = useDispatch();
  const { boardId } = useParams<{ boardId: string }>();
  const { board } = useBoard();
  const { loading } = useBoardLoading();
  const { userId } = useLogin();
  const history = useHistory();

  /* React state */
  const [showDialog, setShowDialog] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    dispatch(getBoardDetails(boardId));
  }, []);

  useEffect(() => {
    if (
      !loading &&
      (board?.status === "draft" || (board?.status === "pending" && !userId))
    ) {
      setMessage(
        "The Retro session isn't started yet. Please revisit after sometime."
      );
      setShowDialog(true);
    }
    if (!userId && !loading && board?.isPrivate) {
      setMessage(
        "The board isn't public. Please request organizer to make it public"
      );
      setShowDialog(true);
    }
    if (!loading && board?.status === "completed" && !userId) {
      setMessage(
        "The session has been completed. The board is on readonly mode"
      );
      setShowDialog(true);
    }
  }, [board, loading]);

  const handleClose = () => {
    setShowDialog(false);
    if (board?.status !== "completed") {
      history.push(ROOT);
    }
  };

  const renderDialog = () => {
    return (
      <Box>
        <ResponsiveDialog
          open={showDialog}
          title={board?.status === "completed" && !userId ? "Hey!" : ""}
          handleSave={handleClose}
          pcta="Ok"
          maxWidth={440}
          hideSecondary={true}
          hideButton={
            board?.status === "draft" ||
            (board?.status === "pending" && !userId)
          }
          hideClose={true}
        >
          <Hidden only={["xs"]}>
            <Box my={5} textAlign="center">
              <Zoom in={true} timeout={2000}>
                <img src={Notify} height="200px" width="fit-content" />
              </Zoom>
            </Box>
          </Hidden>
          <Typography variant="h4">{message}</Typography>
        </ResponsiveDialog>

        {/* <Dialog
          open={showDialog}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-message"
        >
          <DialogTitle id="alert-title" onClose={handleClose}></DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-message">{message}</DialogContentText>
          </DialogContent>
        </Dialog> */}
      </Box>
    );
  };

  return (
    <Suspense fallback={<div />}>
      {renderDialog()}
      <Box className={boxStyle}>
        <SectionList />
      </Box>
    </Suspense>
  );
}
