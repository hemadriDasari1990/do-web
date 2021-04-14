import React, { Suspense, useEffect } from "react";

import Box from "@material-ui/core/Box";
import Summary from "./Summary";
import { getReactionsSummaryByNote } from "../../../../redux/actions/reaction";
import { useDispatch } from "react-redux";

const Info = (props: any) => {
  const { note } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    if (note) {
      dispatch(getReactionsSummaryByNote(note?._id));
    }
  }, [note]);

  return (
    <Suspense fallback={<div />}>
      <Box p={2}>
        <Summary note={note} />
      </Box>
    </Suspense>
  );
};

export default Info;
