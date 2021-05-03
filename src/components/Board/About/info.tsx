import { formatNumberWithCommas, getHumanReadableDate } from "../../../util";

import Box from "@material-ui/core/Box";
import React from "react";
import SummaryField from "../../common/SummaryField";
import { Suspense } from "react";
// import { getBoardDetails } from "../../../redux/actions";
import { useBoard } from "../../../redux/state/board";

// import { useDispatch } from "react-redux";

const AboutBoardInfo = () => {
  const { board } = useBoard();
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getBoardDetails(board?._id));
  // }, []);

  return (
    <Suspense fallback={<div></div>}>
      <Box p={2}>
        <Box mb={1}>
          <SummaryField
            title="Description"
            value={board?.description || "--"}
          />
        </Box>
        <Box mb={1}>
          <SummaryField title="Project" value={board?.project?.name || "--"} />
        </Box>
        <Box mb={1}>
          <SummaryField
            title="Visibility"
            value={board?.isPrivate ? "Private" : "Public"}
          />
        </Box>
        <Box mb={1}>
          <SummaryField
            title="No of sections"
            value={formatNumberWithCommas(board?.totalSections || 0)}
          />
        </Box>
        <Box mb={1}>
          <SummaryField
            title="Views"
            value={formatNumberWithCommas(board?.views || 0)}
          />
        </Box>
        {board?.startedAt && (
          <Box mb={1}>
            <SummaryField
              title="Session started at "
              value={getHumanReadableDate(board?.startedAt)}
            />
          </Box>
        )}
        {board?.completedAt && (
          <Box mb={1}>
            <SummaryField
              title="Session ended at "
              value={getHumanReadableDate(board?.completedAt)}
            />
          </Box>
        )}
        <Box mb={1}>
          <SummaryField
            title="Created At"
            value={getHumanReadableDate(board?.createdAt)}
          />
        </Box>

        <Box mb={1}>
          <SummaryField
            title="Updated At"
            value={getHumanReadableDate(board?.updatedAt)}
          />
        </Box>
      </Box>
    </Suspense>
  );
};

export default AboutBoardInfo;
