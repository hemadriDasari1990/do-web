import React, { Suspense } from "react";

import Box from "@material-ui/core/Box";
import Summary from "./Summary";

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
