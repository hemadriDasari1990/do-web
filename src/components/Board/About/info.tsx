import { Divider, Typography } from "@material-ui/core";
import { formatNumberWithCommas, getHumanReadableDate } from "../../../util";

import Box from "@material-ui/core/Box";
import CopyToClipboard from "../../common/Copy";
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
        <Box my={1}>
          <SummaryField
            title="Description"
            value={board?.description || "--"}
          />
        </Box>
        {!board?.isInstant && (
          <Box mb={1}>
            <SummaryField
              title="Project"
              value={board?.project?.name || "--"}
            />
          </Box>
        )}
        <Box mb={1}>
          <SummaryField title="Status" value={board?.status?.toUpperCase()} />
        </Box>
        <Box mb={1}>
          <SummaryField
            title="Visibility"
            value={board?.isPrivate ? "Private" : "Public"}
          />
        </Box>
        {!board?.isInstant && (
          <Box mb={1}>
            <SummaryField
              title="Is Annonymous"
              value={board?.isAnnonymous ? "Yes" : "No"}
            />
          </Box>
        )}
        <Box mb={1}>
          <SummaryField
            title="Total sections"
            value={formatNumberWithCommas(board?.totalSections)}
          />
        </Box>
        <Box mb={1}>
          <SummaryField
            title="Total notes"
            value={formatNumberWithCommas(board?.totalNotes)}
          />
        </Box>
        <Box mb={1}>
          <SummaryField
            title="Views"
            value={formatNumberWithCommas(board?.views)}
          />
        </Box>
        {board?.startedAt && (
          <Box mb={1}>
            <SummaryField
              title="Session started on"
              value={getHumanReadableDate(board?.startedAt)}
            />
          </Box>
        )}
        {board?.completedAt && (
          <Box mb={1}>
            <SummaryField
              title="Session completed on"
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
        <Divider />
        <Box mt={1}>
          <Box mb={1}>
            <Typography variant="subtitle1">Link to this board</Typography>
          </Box>
          <CopyToClipboard
            url={process.env.REACT_APP_PORT + "/board/" + board?._id}
            hintMessage="Anyone on the internet (including Google) can see this board. Only board members can edit."
          />
        </Box>
      </Box>
    </Suspense>
  );
};

export default AboutBoardInfo;
