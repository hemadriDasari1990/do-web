import React, { useEffect } from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";
import {
  useOrganizationLoading,
  useOrganizationSummary,
} from "../../redux/state/organization";

import AccountTreeOutlinedIcon from "@material-ui/icons/AccountTreeOutlined";
import ApartmentOutlinedIcon from "@material-ui/icons/ApartmentOutlined";
import Box from "@material-ui/core/Box";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import { getAllSummary } from "../../redux/actions/organization";
import { useDispatch } from "react-redux";

const Loader = React.lazy(() => import("../Loader/components"));

const useStyles = makeStyles((theme: Theme) => ({
  titleStyle: {
    fontSize: "3.5rem",
  },
  iconStyle: {
    fontSize: 80,
  },
}));

const Summary = () => {
  const { titleStyle, iconStyle } = useStyles();
  const dispatch = useDispatch();
  const { summary } = useOrganizationSummary();
  const { loading } = useOrganizationLoading();

  useEffect(() => {
    dispatch(getAllSummary());
  }, []);

  return (
    <Box p={5} minHeight={380}>
      <Loader enable={loading} />
      <Box textAlign="center" pb={5}>
        <Typography variant="h1" className={titleStyle}>
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
                <Typography variant="h1" className={titleStyle}>
                  {summary?.organizationsCount}
                </Typography>
              </Box>
              <Box>
                <Typography variant="h5">
                  Organizations powered worldwide
                </Typography>
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
                <Typography variant="h1" className={titleStyle}>
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
                <Typography variant="h1" className={titleStyle}>
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
