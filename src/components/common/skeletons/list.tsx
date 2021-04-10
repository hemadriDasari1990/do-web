import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import ListItemSkeleton from "./listItem";
import React from "react";
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
    </Box>
  );
}
