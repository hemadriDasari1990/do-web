import Box from "@material-ui/core/Box";
import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import useSkeletonStyle from "./styles";
export default function TitleWithCountSkeleton() {
  const { contentColor } = useSkeletonStyle();

  return (
    <Box display="flex">
      <Box mt={0.2} mx={2}>
        <Skeleton
          animation="wave"
          height={30}
          width={160}
          className={contentColor}
        />
      </Box>
      <Box mr={2} mt={0.4}>
        <Skeleton
          animation="wave"
          variant="rect"
          width={30}
          height={30}
          style={{ borderRadius: 6 }}
          className={contentColor}
        />
      </Box>
    </Box>
  );
}
