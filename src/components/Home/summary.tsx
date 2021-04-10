import React, { useEffect } from "react";
import { useUserLoading, useUserSummary } from "../../redux/state/user";

import AccountTreeOutlinedIcon from "@material-ui/icons/AccountTreeOutlined";
import ApartmentOutlinedIcon from "@material-ui/icons/ApartmentOutlined";
import Box from "@material-ui/core/Box";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import { getAllSummary } from "../../redux/actions/user";
import { useDispatch } from "react-redux";
import useStyles from "../styles";

const Loader = React.lazy(() => import("../Loader/components"));

const Summary = () => {
  const { titleSecondaryStyle, iconStyle, textSecondaryColor } = useStyles();
  const dispatch = useDispatch();
  const { summary } = useUserSummary();
  const { loading } = useUserLoading();

  useEffect(() => {
    dispatch(getAllSummary());
  }, []);

  return (
    <Box p={5} minHeight={380}>
      <Loader enable={loading} backdrop={true} />
      <Box textAlign="center" pb={5}>
        <Typography variant="h1" className={titleSecondaryStyle}>
          Built for global scale
        </Typography>
      </Box>
      {!loading && (
        <Grid container spacing={2}>
          <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
            <Box textAlign="center">
              <Box>
                <ApartmentOutlinedIcon color="primary" className={iconStyle} />
              </Box>
              <Box>
                <Typography
                  variant="h1"
                  className={`${titleSecondaryStyle} ${textSecondaryColor}`}
                >
                  {summary?.usersCount}
                </Typography>
              </Box>
              <Box>
                <Typography variant="h5">Users powered worldwide</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
            <Box textAlign="center">
              <Box>
                <AccountTreeOutlinedIcon
                  color="primary"
                  className={iconStyle}
                />
              </Box>
              <Box>
                <Typography
                  variant="h1"
                  className={`${titleSecondaryStyle} ${textSecondaryColor}`}
                >
                  {summary?.projectsCount}
                </Typography>
              </Box>
              <Box>
                <Typography variant="h5">Total Projects</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
            <Box textAlign="center">
              <Box>
                <DashboardOutlinedIcon color="primary" className={iconStyle} />
              </Box>
              <Box>
                <Typography
                  variant="h1"
                  className={`${titleSecondaryStyle} ${textSecondaryColor}`}
                >
                  {summary?.boardsCount}
                </Typography>
              </Box>
              <Box>
                <Typography variant="h5">Total Retro Boards</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Summary;
