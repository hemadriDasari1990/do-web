import React, { useEffect } from "react";

import AboutBoard from "../About";
import Activity from "../Activity";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import InvitedMembers from "../InvitedMembers";
import JoinedMembers from "../JoinedMembers";
import Summary from "../../Reaction/Summary";
import { Suspense } from "react";
import { getReactionsSummaryByBoard } from "../../../redux/actions/reaction";
import { useAuthenticated } from "../../../redux/state/common";
import { useBoard } from "../../../redux/state/board";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
import CopyToClipboard from "../../common/Copy";

const BoardInfo = React.memo((props: any) => {
  const { openBoardInfo } = props;
  const dispatch = useDispatch();
  const { boardId } = useParams<{ boardId: string }>();
  const authenticated = useAuthenticated();
  const { board } = useBoard();

  useEffect(() => {
    if (boardId && openBoardInfo) {
      dispatch(getReactionsSummaryByBoard(boardId));
    }
  }, [openBoardInfo, boardId]);

  return (
    <Suspense fallback={<div></div>}>
      <Box display="flex" flexDirection="column">
        <Box>
          {boardId && (
            <>
              <Activity />
              <Divider />
            </>
          )}
          {authenticated && boardId && !board?.isAnonymous && (
            <>
              <InvitedMembers />
              <Divider />
            </>
          )}
          {boardId && !board?.isAnonymous && (
            <>
              <JoinedMembers />
              <Divider />
            </>
          )}
          {boardId && (
            <>
              <AboutBoard />
              <Divider />
            </>
          )}

          <Box mt={1}>
            <Box mb={1}>
              <Typography variant="subtitle1">Link to this board</Typography>
            </Box>
            <CopyToClipboard
              url={"/board/" + board?._id}
              hintMessage="Anyone on the internet (including Google) can see this board. Only board members can edit."
            />
          </Box>
          <Divider />

          {boardId && (
            <Box mt={2}>
              <Summary hideNoSummary={true} hideLoader={true} />
            </Box>
          )}
        </Box>
      </Box>
    </Suspense>
  );
});

export default BoardInfo;
