import { Divider, Typography } from "@material-ui/core";
import { formatNumberWithCommas, getHumanReadableDate } from "../../../util";

import Box from "@material-ui/core/Box";
import CopyToClipboard from "../../common/Copy";
import React, { useState, useEffect } from "react";
import SummaryField from "../../common/SummaryField";
import { Suspense } from "react";
import { useSocket } from "../../../redux/state/socket";

const AboutBoardInfo = () => {
  const [board, setboard] = useState<any>(null);
  const { socket } = useSocket();

  useEffect(() => {
    /* board details response */
    socket.on(
      `board-details-response`,
      (boardDetails: { [Key: string]: any }) => {
        if (!boardDetails) {
          return;
        }
        if (boardDetails?._id) {
          setboard(boardDetails);
        }
      }
    );

    return () => {
      socket.off("board-details-response");
    };
  }, [board]);

  const dateDiffInDays = () => {
    // Discard the time and time-zone information.
    const completedDateTime: any = new Date(board?.completedAt).getTime();
    const startDateTime: any = new Date(board?.startedAt).getTime();

    let milisec_diff = null;
    if (startDateTime < completedDateTime) {
      milisec_diff = completedDateTime - startDateTime;
    } else {
      milisec_diff = startDateTime - completedDateTime;
    }
    const dd = Math.floor(milisec_diff / 1000 / 60 / 60 / 24);
    milisec_diff -= dd * 1000 * 60 * 60 * 24;
    const hh = Math.floor(milisec_diff / 1000 / 60 / 60);
    milisec_diff -= hh * 1000 * 60 * 60;
    const mm = Math.floor(milisec_diff / 1000 / 60);
    milisec_diff -= mm * 1000 * 60;
    const ss = Math.floor(milisec_diff / 1000);
    milisec_diff -= ss * 1000;

    return (
      <>
        {`${dd ? dd + " days" : ""} ${hh ? hh + " hrs" : ""} ${mm} ${
          mm === 1 ? "min" : "mins"
        } ${ss} secs`}
      </>
    );
  };
  console.log("boardDetails", board);

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
        <Box mb={1}>
          <SummaryField
            title="Is Anonymous"
            value={board?.isAnonymous ? "Yes" : "No"}
          />
        </Box>
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
        {board?.completedAt && (
          <Box mb={1}>
            <SummaryField title="Session time" value={dateDiffInDays()} />
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
            url={"/board/" + board?._id}
            hintMessage="Anyone on the internet (including Google) can see this board. Only board members can edit."
          />
        </Box>
      </Box>
    </Suspense>
  );
};

export default React.memo(AboutBoardInfo);
