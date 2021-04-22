import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import useStyles from "./styles";

export default function SectionSkeleton() {
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
      />
      <CardContent></CardContent>
    </Card>
  );
}
