import Box from "@material-ui/core/Box";
import React from "react";
import ListItemSkeleton from "./listItem";
import Grid from "@material-ui/core/Grid";

export default function ListSkeleton() {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
          <ListItemSkeleton />
        </Grid>
        <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
          <ListItemSkeleton />
        </Grid>
        <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
          <ListItemSkeleton />
        </Grid>
        <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
          <ListItemSkeleton />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
          <ListItemSkeleton />
        </Grid>
        <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
          <ListItemSkeleton />
        </Grid>
        <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
          <ListItemSkeleton />
        </Grid>
        <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
          <ListItemSkeleton />
        </Grid>
      </Grid>
    </Box>
  );
}
