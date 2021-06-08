import React, { useEffect, useState } from "react";
import { makeFriendly, noFormatter } from "../../../util/formateNumber";
import { useLoading, useReactionSummary } from "../../../redux/state/reaction";

import Box from "@material-ui/core/Box";
import DeserveIcon from "@material-ui/icons/EmojiEvents";
import HighlightIcon from "@material-ui/icons/Highlight";
import IconButton from "@material-ui/core/IconButton";
import Loader from "../../Loader/components";
import LoveIcon from "@material-ui/icons/Favorite";
import MinusOneIcon from "@material-ui/icons/ExposureNeg1Outlined";
import { PieChart } from "react-minimal-pie-chart";
import PlusOneIcon from "@material-ui/icons/ExposurePlus1";
import { Suspense } from "react";
import { Typography } from "@material-ui/core";
import { getRandomColor } from "../../../util/getRandomColor";
import useStyles from "../../styles";

const Summary = React.memo((props: any) => {
  const { hideTitle, hideNoSummary, hideLoader } = props;
  const {
    plusIconStyle,
    minusOneIconStyle,
    highlightIconStyle,
    deserveIconStyle,
    loveIconStyle,
  } = useStyles();

  const { summary: reactionsSummary } = useReactionSummary();
  const { loading } = useLoading();
  const [selected, setSelected] = useState<number | undefined>(0);
  const [hovered, setHovered] = useState<number | undefined>(undefined);
  const [summary, setSummary] = useState<any>(reactionsSummary);

  useEffect(() => {
    setSummary(reactionsSummary);
  }, [reactionsSummary]);

  const getReactionSummaryData = () => {
    const data = [];
    if (summary?.plusOne) {
      data.push({
        color: hovered === 0 ? "#3333" : "#57f",
        title: "Agree",
        value: summary?.plusOne,
        shortValue: noFormatter(summary?.plusOne),
        abbrevateLabel: makeFriendly(summary?.plusOne),
      });
    }

    if (summary?.minusOne) {
      data.push({
        color: hovered === 1 ? "#3333" : getRandomColor(6),
        title: "Disagree",
        value: summary?.minusOne,
        shortValue: noFormatter(summary?.minusOne),
        abbrevateLabel: makeFriendly(summary?.minusOne),
      });
    }
    if (summary?.love) {
      data.push({
        color: hovered === 2 ? "#3333" : getRandomColor(1),
        title: "Love",
        value: summary?.love,
        shortValue: noFormatter(summary?.love),
        abbrevateLabel: makeFriendly(summary?.love),
      });
    }
    if (summary?.highlight) {
      data.push({
        color: hovered === 3 ? "#3333" : getRandomColor(4),
        title: "Plus Two",
        value: summary?.highlight,
        shortValue: noFormatter(summary?.highlight),
        abbrevateLabel: makeFriendly(summary?.highlight),
      });
    }
    if (summary?.deserve) {
      data.push({
        color: hovered === 4 ? "#3333" : getRandomColor(3),
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
      {!hideLoader && <Loader enable={loading} />}
      <Box p={2}>
        {!loading && summary?.totalReactions ? (
          <>
            {!hideTitle && (
              <Box mb={2}>
                <Typography variant="h4">
                  Total Reactions (
                  {!loading ? noFormatter(summary?.totalReactions) : 0})
                </Typography>
              </Box>
            )}

            <Box display="flex" justifyContent="space-around">
              <Box display="flex">
                <IconButton
                  className={deserveIconStyle}
                  color="secondary"
                  size="small"
                >
                  <DeserveIcon color="secondary" fontSize="small" />
                </IconButton>
                <Box ml={1}>
                  <Typography variant="h6">Deserve</Typography>
                </Box>
              </Box>
              <Box display="flex">
                <IconButton
                  className={plusIconStyle}
                  color="secondary"
                  size="small"
                >
                  <PlusOneIcon color="secondary" fontSize="small" />
                </IconButton>

                <Box ml={1}>
                  <Typography variant="h6">Agree</Typography>
                </Box>
              </Box>

              <Box display="flex">
                <IconButton
                  className={loveIconStyle}
                  color="secondary"
                  size="small"
                >
                  <LoveIcon color="secondary" fontSize="small" />
                </IconButton>
                <Box ml={1}>
                  <Typography variant="h6">Love</Typography>
                </Box>
              </Box>
            </Box>
            <Box display="flex" mt={2} justifyContent="space-around">
              <Box display="flex">
                <IconButton
                  className={highlightIconStyle}
                  color="secondary"
                  size="small"
                >
                  <HighlightIcon color="secondary" fontSize="small" />
                </IconButton>
                <Box ml={1}>
                  <Typography variant="h6">Highlight</Typography>
                </Box>
              </Box>
              <Box display="flex">
                <IconButton
                  className={minusOneIconStyle}
                  color="secondary"
                  size="small"
                >
                  <MinusOneIcon color="secondary" fontSize="small" />
                </IconButton>
                <Box ml={1}>
                  <Typography variant="h6">Disagree</Typography>
                </Box>
              </Box>
            </Box>

            <Box mt={2}>
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
          </>
        ) : null}
        {!loading && !summary?.totalReactions && !hideNoSummary && (
          <Box textAlign="center">
            <Typography variant="h5">No reactions to display</Typography>
          </Box>
        )}
      </Box>
    </Suspense>
  );
});

export default Summary;
