import React, { useEffect } from "react";
import { useUserLoading, useUserSummary } from "../../redux/state/user";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import { getAllSummary } from "../../redux/actions/user";
import { getRandomColor } from "../../util/getRandomColor";
import { useDispatch } from "react-redux";
import useStyles from "../styles";

const Loader = React.lazy(() => import("../Loader/components"));

const Summary = () => {
  const { titleSecondaryStyle } = useStyles();
  const dispatch = useDispatch();
  const { summary } = useUserSummary();
  const { loading } = useUserLoading();

  useEffect(() => {
    dispatch(getAllSummary());
  }, []);

  return (
    <Box minHeight={240}>
      <Loader enable={loading} backdrop={true} />
      <Box textAlign="center" pb={3}>
        <Typography variant="h1" className={titleSecondaryStyle}>
          Built for global scale
        </Typography>
      </Box>
      {!loading && (
        <Grid container spacing={2}>
          <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
            <Box textAlign="center">
              <Box>
                <Typography variant="h1" style={{ color: getRandomColor(0) }}>
                  {summary?.usersCount > 1000
                    ? summary?.usersCount + "+"
                    : summary?.usersCount}
                </Typography>
                <Typography variant="h2">Users</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
            <Box textAlign="center">
              <Box>
                <Typography variant="h1" style={{ color: getRandomColor(5) }}>
                  {summary?.projectsCount > 1000
                    ? summary?.projectsCount + "+"
                    : summary?.projectsCount}
                </Typography>
                <Typography variant="h2">Total projects</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
            <Box textAlign="center">
              <Box>
                <Typography variant="h1" style={{ color: getRandomColor(3) }}>
                  {summary?.boardsCount > 1000
                    ? summary?.boardsCount + "+"
                    : summary?.boardsCount}
                </Typography>
                <Typography variant="h2">Total boards</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Summary;
