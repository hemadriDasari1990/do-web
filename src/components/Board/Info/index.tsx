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
      <Box>
        {boardId && (
          <>
            <Activity />
            <Divider />
          </>
        )}
        {authenticated && boardId && !board?.isAnnonymous && !board?.isInstant && (
          <>
            <InvitedMembers />
            <Divider />
          </>
        )}
        {boardId && (
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

        {boardId && (
          <Box mt={2}>
            <Summary hideNoSummary={true} hideLoader={true} />
          </Box>
        )}
      </Box>
    </Suspense>
  );
});

export default BoardInfo;
