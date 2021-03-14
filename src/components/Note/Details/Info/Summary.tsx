import React, { Suspense } from "react";

import Grid from "@material-ui/core/Grid";
import SummaryField from "../../../common/SummaryField";

const Summary = (props: any) => {
  const { note } = props;
  return (
    <Suspense fallback={<div />}>
      <Grid container spacing={6}>
        <Grid item xl={2} lg={2} md={2} sm={6} xs={12}>
          <SummaryField
            title="Status"
            value={note?.read ? "Read" : "Not read"}
          />
        </Grid>
        <Grid item xl={5} lg={5} md={5} sm={6} xs={12}>
          <SummaryField
            title="Craeted At"
            value={
              new Date(note?.createdAt).toDateString() +
                " at " +
                new Date(note?.createdAt).toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                }) || "--"
            }
          />
        </Grid>
        <Grid item xl={5} lg={5} md={5} sm={6} xs={12}>
          <SummaryField
            title="Updated At"
            value={
              new Date(note?.updatedAt).toDateString() +
                " at " +
                new Date(note?.updatedAt).toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                }) || "--"
            }
          />
        </Grid>
      </Grid>
    </Suspense>
  );
};

export default Summary;
