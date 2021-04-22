import Grid from "@material-ui/core/Grid";
import React from "react";
import ReactionSummary from "../../../Reaction/Summary";
import SummaryField from "../../../common/SummaryField";
import { Suspense } from "react";
import { getHumanReadableData } from "../../../../util";

const Summary = (props: any) => {
  const { note } = props;

  return (
    <Suspense fallback={<div />}>
      <Grid container spacing={2}>
        <Grid item xl={5} lg={5} md={6} sm={6} xs={12}>
          <SummaryField
            title="Status"
            value={note?.read ? "Read" : "Not read"}
          />
          <SummaryField
            title="Created At"
            value={getHumanReadableData(note?.createdAt)}
          />
          <SummaryField
            title="Updated At"
            value={getHumanReadableData(note?.updatedAt)}
          />
        </Grid>
        <Grid item xl={7} lg={7} md={6} sm={6} xs={12}>
          <ReactionSummary />
        </Grid>
      </Grid>
    </Suspense>
  );
};

export default Summary;
