import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import NoteSkeleton from "./note";
import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core/styles";
import useStyles from "./styles";

const useLocalStyles = makeStyles(() => ({
  createNoteStyle: {
    height: 40,
    borderRadius: 6,
    background:
      "linear-gradient(90deg, #e7eaec, rgb(230 235 239), transparent)",
  },
}));
export default function SectionSkeleton() {
  const { createNoteStyle } = useLocalStyles();
  const { cardHeaderStyle, cardStyle, lineStyle, contentColor } = useStyles();

  return (
    <Card className={cardStyle}>
      <CardHeader
        className={cardHeaderStyle}
        action={
          <React.Fragment>
            <Skeleton
              animation="wave"
              variant="rect"
              width={40}
              height={40}
              className={contentColor}
            />
          </React.Fragment>
        }
        title={
          <Box>
            <React.Fragment>
              <Skeleton
                animation="wave"
                height={10}
                width="70%"
                className={lineStyle}
              />
              <Skeleton
                animation="wave"
                height={10}
                width="50%"
                className={lineStyle}
              />
            </React.Fragment>
          </Box>
        }
        // subheader={<Skeleton animation="wave" height={10} width="40%" />}
      />
      <CardContent>
        <Box p={1}>
          <Skeleton
            animation="wave"
            variant="rect"
            className={createNoteStyle}
          />
        </Box>
        <NoteSkeleton />
        <NoteSkeleton />
        <NoteSkeleton />
        <NoteSkeleton />
      </CardContent>
    </Card>
  );
}
