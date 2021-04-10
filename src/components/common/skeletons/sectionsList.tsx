import Grid from "@material-ui/core/Grid";
import React from "react";
import SectionmSkeleton from "./section";
export default function SectionsListSkeleton() {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
          <SectionmSkeleton />
        </Grid>
        <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
          <SectionmSkeleton />
        </Grid>
        <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
          <SectionmSkeleton />
        </Grid>
        <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
          <SectionmSkeleton />
        </Grid>
      </Grid>
    </>
  );
}
