import NoRecords from "../../NoRecords";
import React from "react";
import { Suspense } from "react";
const CommentsView = () => {
  return (
    <Suspense fallback={<div />}>
      <NoRecords message="Comments will be enabled soon" hideImage={true} />
    </Suspense>
  );
};

export default CommentsView;
