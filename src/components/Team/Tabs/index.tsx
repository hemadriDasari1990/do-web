import React, { Suspense, useState } from "react";

// import Grow from "@material-ui/core/Grow";
import Members from "../../Members";
import PeopleOutlinedIcon from "@material-ui/icons/PeopleOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import PropTypes from "prop-types";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import TeamDashboard from "../Dashboard";
import Typography from "@material-ui/core/Typography";
// import formateNumber from "../../../util/formateNumber";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  defaultTab: {
    color: "#68C222",
    width: "33.3%",
    backgroundColor: "#FFFFFF",
    fontSize: 15,
  },
  activeTab: {
    color: "red",
    width: "33.3%",
    backgroundColor: "#FFFFFF",
    fontSize: 15,
  },
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
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
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

const DoTabs = (props: any) => {
  const {} = props;
  const { tabStyle } = useStyles();

  const [value, setValue] = useState(0);

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };
  console.log("value", value);
  return (
    <Suspense fallback={<div />}>
      <Tabs
        textColor="primary"
        value={value}
        aria-label="teams"
        indicatorColor="primary"
        onChange={(event: React.ChangeEvent<{}>, newValue: number) =>
          handleChange(newValue)
        }
        // centered
      >
        <Tab
          value={0}
          label={`Teams`}
          aria-label="teams"
          className={tabStyle}
          icon={<PeopleOutlinedIcon />}
        />
        <Tab
          value={1}
          label={`Members`}
          aria-label="members"
          className={tabStyle}
          icon={<PersonOutlineOutlinedIcon />}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <TeamDashboard />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Members />
      </TabPanel>
    </Suspense>
  );
};

export default DoTabs;
