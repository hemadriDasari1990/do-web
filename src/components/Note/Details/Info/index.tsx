import Box from "@material-ui/core/Box";
import React from "react";
import Summary from "./Summary";
import { Suspense } from "react";
const Info = (props: any) => {
  const { note } = props;
  return (
    <Suspense fallback={<div />}>
      <Box p={2}>
        <Summary note={note} />
      </Box>
    </Suspense>
  );
};

export default Info;
