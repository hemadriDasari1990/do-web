import React, { Suspense } from "react";

import NoRecords from "../../NoRecords";

const CommentsView = () => {
  return (
    <Suspense fallback={<div />}>
      <NoRecords message="No Comments found!" />
    </Suspense>
  );
};

export default CommentsView;
