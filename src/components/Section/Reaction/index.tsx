import React, { useEffect, useState } from "react";

import ReactionSummary from "../../Reaction/Summary";
import { getReactionsSummaryBySection } from "../../../redux/actions/reaction";
import { noFormatter } from "../../../util/formateNumber";
import { useDispatch } from "react-redux";
import { useReactionSummary } from "../../../redux/state/reaction";

const ResponsiveDialog = React.lazy(() => import("../../Dialog"));

function ReactionSummaryDialog(props: any) {
  const { section, handleDialogClose, openDialog } = props;
  const dispatch = useDispatch();
  const { summary: reactionsSummary } = useReactionSummary();
  const [summary, setSummary] = useState<any>(reactionsSummary);

  useEffect(() => {
    setSummary(reactionsSummary);
  }, [reactionsSummary]);

  useEffect(() => {
    if (section) {
      dispatch(getReactionsSummaryBySection(section?._id));
    }
  }, [section]);

  return (
    <ResponsiveDialog
      open={openDialog}
      title={`Total Reactions (${noFormatter(summary?.totalReactions || 0)})`}
      hideButton={true}
      handleClose={handleDialogClose}
      maxWidth={440}
    >
      <ReactionSummary hideTitle={true} />
    </ResponsiveDialog>
  );
}

export default ReactionSummaryDialog;
