import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import NoteSkeleton from "./note";
import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useLocalStyles = makeStyles(() => ({
  cardHeaderStyle: {},
  cardStyle: {
    boxShadow: "0 3rem 6rem rgba(0, 0, 0, .1)",
  },
  lineStyle: {
    background: "linear-gradient(90deg, #0072ff 0%, #0095ffd9 100%)",
    marginBottom: 6,
  },
  countTextStyle: {
    textAlign: "center",
  },
  countStyle: {
    backgroundColor: "unset",
    border: "2px solid  #0072ff",
    borderRadius: 6,
  },
  createNoteStyle: {
    height: 40,
    borderRadius: 6,
    background:
      "linear-gradient(90deg, #e7eaec, rgb(230 235 239), transparent)",
  },
}));
export default function SectionSkeleton() {
  const {
    cardHeaderStyle,
    cardStyle,
    lineStyle,
    countTextStyle,
    countStyle,
    createNoteStyle,
  } = useLocalStyles();

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
              className={countStyle}
            >
              <Typography color="primary" className={countTextStyle}>
                0
              </Typography>
            </Skeleton>
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
