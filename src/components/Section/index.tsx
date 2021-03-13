import React, { useEffect } from "react";

import Box from "@material-ui/core/Box";
import { getBoardDetails } from "../../redux/actions/board";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";

const SectionList = React.lazy(() => import("./list"));

const useStyles = makeStyles(() => ({
  boxStyle: {
    backgroundColor: "#fff",
    minHeight: "90vh",
    overflow: "hidden",
  },
}));

export default function Section() {
  const { boxStyle } = useStyles();
  const dispatch = useDispatch();
  const { boardId } = useParams<{ boardId: string }>();

  useEffect(() => {
    dispatch(getBoardDetails(boardId));
  }, []);

  return (
    <Box className={boxStyle}>
      <SectionList />
    </Box>
  );
}
