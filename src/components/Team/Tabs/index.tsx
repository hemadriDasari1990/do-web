import React, { Suspense, useState } from "react";

import Box from "@material-ui/core/Box";
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
  const [type, setType] = useState("");

  const handleChange = async (index: number, type: string) => {
    setValue(index);
    setType(type);
  };
  console.log(type);

  return (
    <Suspense fallback={<div />}>
      <Box>
        <Tabs
          textColor="primary"
          value={value}
          aria-label="teams"
          indicatorColor="primary"
          // centered
        >
          <Tab
            onClick={() => handleChange(0, "teams")}
            value={0}
            label={`Teams`}
            aria-label="teams"
            className={tabStyle}
            icon={<PeopleOutlinedIcon />}
          />
          <Tab
            onClick={() => handleChange(1, "members")}
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
      </Box>
    </Suspense>
  );
};

export default DoTabs;
