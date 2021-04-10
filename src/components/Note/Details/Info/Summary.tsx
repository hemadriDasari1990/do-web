import Grid from "@material-ui/core/Grid";
import React from "react";
import SummaryField from "../../../common/SummaryField";
import { Suspense } from "react";
const Summary = (props: any) => {
  const { note } = props;
  return (
    <Suspense fallback={<div />}>
      <Grid container spacing={2}>
        <Grid item xl={4} lg={4} md={5} sm={6} xs={12}>
          <SummaryField title="Total Reactions" value={note.totalReactions} />
        </Grid>
        <Grid item xl={4} lg={4} md={5} sm={6} xs={12}>
          <SummaryField title="Pluse one" value={note?.totalPlusOne} />
        </Grid>
        <Grid item xl={4} lg={4} md={5} sm={6} xs={12}>
          <SummaryField title="Pluse two" value={note?.totalPlusTwo} />
        </Grid>
        <Grid item xl={4} lg={4} md={5} sm={6} xs={12}>
          <SummaryField title="Love" value={note?.totalLove} />
        </Grid>
        <Grid item xl={4} lg={4} md={5} sm={6} xs={12}>
          <SummaryField title="Deserve" value={note?.totalDeserve} />
        </Grid>
        <Grid item xl={4} lg={4} md={5} sm={6} xs={12}>
          <SummaryField title="Minus One" value={note?.totalMinusOne} />
        </Grid>
        <Grid item xl={4} lg={4} md={5} sm={6} xs={12}>
          <SummaryField
            title="Status"
            value={note?.read ? "Read" : "Not read"}
          />
        </Grid>
        <Grid item xl={4} lg={4} md={5} sm={6} xs={12}>
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
        <Grid item xl={4} lg={4} md={5} sm={6} xs={12}>
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
