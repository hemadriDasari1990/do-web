import React, { Suspense, useState } from "react";

import Container from "@material-ui/core/Container";
import PersonIcon from "@material-ui/icons/Person";
import PropTypes from "prop-types";
import StepProcess from "../process";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import UnregisteredProcess from "../unregisteredProcess";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  tabStyle: {
    textTransform: "capitalize",
    fontWeight: 600,
  },
}));

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="subtitle1"
      role="tabpanel"
      hidden={value !== index}
      id={`users-tabpanel-${index}`}
      aria-labelledby={`users-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const GettingStartedTabs = React.memo((props: any) => {
  const {} = props;
  const { tabStyle } = useStyles();

  const [value, setValue] = useState(0);

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };

  const a11yProps = (index: any) => {
    return {
      id: `users-tab-${index}`,
      "aria-controls": `users-tabpanel-${index}`,
    };
  };

  return (
    <Suspense fallback={<div />}>
      <Container>
        <Tabs
          textColor="primary"
          value={value}
          aria-label="teams"
          indicatorColor="primary"
          onChange={(event: React.ChangeEvent<{}>, newValue: number) =>
            handleChange(newValue)
          }
          selectionFollowsFocus={true}
          // centered
        >
          <Tab
            value={0}
            label="Registered Users"
            aria-label="registered-users"
            className={tabStyle}
            icon={<PersonIcon />}
            {...a11yProps(0)}
          />
          <Tab
            value={1}
            label="Unregistered Users"
            aria-label="un-registered-users"
            className={tabStyle}
            icon={<PersonIcon />}
            {...a11yProps(1)}
          />
        </Tabs>
        <TabPanel value={value} index={0}>
          <StepProcess />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <UnregisteredProcess />
        </TabPanel>
      </Container>
    </Suspense>
  );
});

export default GettingStartedTabs;
