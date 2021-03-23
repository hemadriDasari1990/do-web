import React, { useEffect, Suspense } from "react";

import Box from "@material-ui/core/Box";
import { getBoardDetails } from "../../redux/actions/board";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import BoardSkeleton from "../common/skeletons/board";

const SectionList = React.lazy(() => import("./list"));

const useStyles = makeStyles(() => ({
  boxStyle: {
    backgroundColor: "#fff",
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
    <Suspense fallback={<BoardSkeleton />}>
      <Box className={boxStyle}>
        <SectionList />
      </Box>
    </Suspense>
  );
}
