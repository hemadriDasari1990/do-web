import BoardHeaderSkeleton from "./boardHeader";
import Grid from "@material-ui/core/Grid";
import React from "react";
import SectionSkeleton from "./section";
export default function BoardSkeleton() {
  return (
    <>
      <BoardHeaderSkeleton />
      <Grid container spacing={2}>
        <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
          <SectionSkeleton />
        </Grid>
        <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
          <SectionSkeleton />
        </Grid>
        <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
          <SectionSkeleton />
        </Grid>
        <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
          <SectionSkeleton />
        </Grid>
      </Grid>
    </>
  );
}
