import React, { useEffect, useState } from "react";
import { makeFriendly, noFormatter } from "../../../util/formateNumber";

// import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import { PieChart } from "react-minimal-pie-chart";
import { Suspense } from "react";
import { Typography } from "@material-ui/core";
import { getReactionsSummaryByBoard } from "../../../redux/actions/reaction";
// import Typography from "@material-ui/core/Typography";
// import Zoom from "@material-ui/core/Zoom";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useReactionSummary } from "../../../redux/state/reaction";
import useStyles from "../../styles";

const Summary = () => {
  // const { name } = useUser();
  //   const history = useHistory();
  const dispatch = useDispatch();
  const {
    minusOneIconStyle,
    plusTwoIconStyle,
    deserveIconStyle,
    loveIconStyle,
  } = useStyles();
  const { boardId } = useParams<{ boardId: string }>();
  const { summary: reactionsSummary } = useReactionSummary();
  const [selected, setSelected] = useState<number | undefined>(0);
  const [hovered, setHovered] = useState<number | undefined>(undefined);
  const [summary, setSummary] = useState<any>(reactionsSummary);

  useEffect(() => {
    console.log("boardId", boardId);
    if (boardId) {
      dispatch(getReactionsSummaryByBoard(boardId));
    }
  }, [boardId]);

  useEffect(() => {
    setSummary(reactionsSummary);
  }, [reactionsSummary]);

  const getReactionSummaryData = () => {
    const data = [];
    if (summary?.plusOne) {
      data.push({
        color: hovered === 0 ? "#3333" : "#0072ff",
        title: "Plus One",
        value: summary?.plusOne,
        shortValue: noFormatter(summary?.plusOne),
        abbrevateLabel: makeFriendly(summary?.plusOne),
      });
    }

    if (summary?.minusOne) {
      data.push({
        color: hovered === 1 ? "#3333" : "#27fd00",
        title: "Minus One",
        value: summary?.minusOne,
        shortValue: noFormatter(summary?.minusOne),
        abbrevateLabel: makeFriendly(summary?.minusOne),
      });
    }
    if (summary?.love) {
      data.push({
        color: hovered === 2 ? "#3333" : "#ea087b",
        title: "Love",
        value: summary?.love,
        shortValue: noFormatter(summary?.love),
        abbrevateLabel: makeFriendly(summary?.love),
      });
    }
    if (summary?.plusTwo) {
      data.push({
        color: hovered === 3 ? "#3333" : "#0072ff",
        title: "Plus Two",
        value: summary?.plusTwo,
        shortValue: noFormatter(summary?.plusTwo),
        abbrevateLabel: makeFriendly(summary?.plusTwo),
      });
    }
    if (summary?.deserve) {
      data.push({
        color: hovered === 4 ? "#3333" : "#ffc800",
        title: "Deserve",
        value: summary?.deserve,
        shortValue: noFormatter(summary?.deserve),
        abbrevateLabel: makeFriendly(summary?.deserve),
      });
    }
    return data;
  };

  return (
    <Suspense fallback={<div></div>}>
      {summary?.totalReactions ? (
        <>
          <Box mt={3} mb={2} textAlign="center">
            <Typography variant="h4">
              Total Reactions ({noFormatter(summary?.totalReactions)})
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Box display="flex">
              <Box height={20} width={20} className={deserveIconStyle}></Box>
              <Box ml={1}>
                <Typography variant="h6">Deserve</Typography>
              </Box>
            </Box>
            <Box display="flex">
              <Box height={20} width={20} className={loveIconStyle}></Box>
              <Box ml={1}>
                <Typography variant="h6">Love</Typography>
              </Box>
            </Box>
          </Box>
          <Box>
            <PieChart
              style={{ height: 200 }}
              data={getReactionSummaryData()}
              radius={50 - 6}
              lineWidth={50}
              segmentsStyle={{ transition: "stroke .3s", cursor: "pointer" }}
              labelPosition={100 - 50 / 2}
              segmentsShift={(index: number) => (index === selected ? 6 : 1)}
              label={({ dataEntry }: { [Key: string]: any }) =>
                dataEntry?.shortValue + dataEntry?.abbrevateLabel
              }
              onClick={(_, index: number) => {
                setSelected(index === selected ? undefined : index);
              }}
              onMouseOver={(_, index: number) => {
                setHovered(index);
              }}
              onMouseOut={() => {
                setHovered(undefined);
              }}
              labelStyle={{
                fill: "#fff",
                opacity: 0.75,
                fontSize: 10,
                fontWeight: 600,
                pointerEvents: "none",
              }}
              animate
            />
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Box display="flex">
              <Box height={20} width={20} className={plusTwoIconStyle}></Box>
              <Box ml={1}>
                <Typography variant="h6">Plus One</Typography>
              </Box>
            </Box>
            <Box display="flex">
              <Box height={20} width={20} className={minusOneIconStyle}></Box>
              <Box ml={1}>
                <Typography variant="h6">Minus One</Typography>
              </Box>
            </Box>
            <Box display="flex">
              <Box height={20} width={20} className={plusTwoIconStyle}></Box>
              <Box ml={1}>
                <Typography variant="h6">Plus Two</Typography>
              </Box>
            </Box>
          </Box>
        </>
      ) : null}
    </Suspense>
  );
};

export default Summary;
