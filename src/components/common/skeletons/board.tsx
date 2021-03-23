import React from "react";
import SectionSkeleton from "./section";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Skeleton from "@material-ui/lab/Skeleton";
import useStyles from "./styles";

export default function BoardSkeleton() {
  const { contentColor } = useStyles();
  return (
    <>
      <Box display="flex" justifyContent="space-between" mt={3}>
        <Box display="flex">
          <Box mt={0.2} mx={2}>
            <Skeleton
              animation="wave"
              height={25}
              width={160}
              className={contentColor}
            />
          </Box>
          <Box mr={2} mt={0.4}>
            <Skeleton
              animation="wave"
              variant="rect"
              width={25}
              height={25}
              style={{ borderRadius: 6 }}
              className={contentColor}
            />
          </Box>
          <Box mr={2} mt={0.4}>
            <Skeleton
              animation="wave"
              variant="circle"
              width={25}
              height={25}
              className={contentColor}
            />
          </Box>
          <Box mr={2} mt={0.4} display="flex">
            <Skeleton
              animation="wave"
              variant="circle"
              width={25}
              height={25}
              className={contentColor}
            />
            <Skeleton
              animation="wave"
              variant="circle"
              width={25}
              height={25}
              className={contentColor}
            />
            <Skeleton
              animation="wave"
              variant="circle"
              width={25}
              height={25}
              className={contentColor}
            />
            <Skeleton
              animation="wave"
              variant="circle"
              width={25}
              height={25}
              className={contentColor}
            />
          </Box>
        </Box>
        <Box display="flex">
          <Box mr={2}>
            <Skeleton
              animation="wave"
              variant="rect"
              width={170}
              height={35}
              style={{ borderRadius: 6 }}
              className={contentColor}
            />
          </Box>
          <Box>
            <Skeleton
              animation="wave"
              variant="rect"
              width={200}
              height={35}
              style={{ borderRadius: 6 }}
              className={contentColor}
            />
          </Box>
        </Box>
      </Box>
      <Grid container spacing={2}>
        <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
          <SectionSkeleton />
        </Grid>
        <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
          <SectionSkeleton />
        </Grid>
        <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
          <SectionSkeleton />
        </Grid>
        <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
          <SectionSkeleton />
        </Grid>
      </Grid>
    </>
  );
}
