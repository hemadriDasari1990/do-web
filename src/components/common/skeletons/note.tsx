import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import useSkeletonStyle from "./styles";
import useStyles from "../../styles";
export default function NoteSkeleton() {
  const {
    plusTwoIconStyle,
    minusOneIconStyle,
    loveIconStyle,
    deserveIconStyle,
  } = useStyles();
  const { contentStyle } = useSkeletonStyle();

  return (
    <Card>
      <CardContent>
        <Skeleton animation="wave" variant="rect" className={contentStyle} />
      </CardContent>
      <CardActions style={{ display: "flex", justifyContent: "space-between" }}>
        <Box display="flex" justifyContent="space-between">
          <Box mr={1}>
            <Skeleton
              animation="wave"
              variant="circle"
              width={20}
              height={20}
              style={{ borderRadius: "50%" }}
              className={minusOneIconStyle}
            />
          </Box>
          <Box mr={1}>
            <Skeleton
              animation="wave"
              variant="circle"
              width={20}
              height={20}
              style={{ borderRadius: "50%" }}
              className={loveIconStyle}
            />
          </Box>
          <Box mr={1}>
            <Skeleton
              animation="wave"
              variant="circle"
              width={20}
              height={20}
              style={{ borderRadius: "50%" }}
              className={plusTwoIconStyle}
            />
          </Box>
          <Box mr={1}>
            <Skeleton
              animation="wave"
              variant="circle"
              width={20}
              height={20}
              style={{ borderRadius: "50%" }}
              className={deserveIconStyle}
            />
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Box mt={0.7} mr={1}>
            <Skeleton animation="wave" height={10} width={30} />
          </Box>
          <Skeleton
            animation="wave"
            variant="circle"
            width={20}
            height={20}
            style={{ borderRadius: "50%" }}
          />
          <Box mt={1} ml={1} display="flex">
            <Skeleton
              animation="wave"
              variant="circle"
              width={5}
              height={5}
              style={{ borderRadius: "50%" }}
            />
            <Skeleton
              animation="wave"
              variant="circle"
              width={5}
              height={5}
              style={{ borderRadius: "50%" }}
            />
            <Skeleton
              animation="wave"
              variant="circle"
              width={5}
              height={5}
              style={{ borderRadius: "50%" }}
            />
          </Box>
        </Box>
      </CardActions>
    </Card>
  );
}
