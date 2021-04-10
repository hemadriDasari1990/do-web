import { Suspense, useState } from "react";

import Box from "@material-ui/core/Box";
import CommentsView from "./CommentsView";
import Info from "./Info";
import PropTypes from "prop-types";
import React from "react";
import ReactionsView from "./ReactionsView";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import formateNumber from "../../../util/formateNumber";
// import formateNumber from "../../../util/formateNumber";
import { makeStyles } from "@material-ui/core/styles";
import { useReactions } from "../../../redux/state/reaction";

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
  const { note } = props;
  const { tabStyle } = useStyles();
  const [value, setValue] = useState(0);
  const { totalReactions } = useReactions();

  const handleChange = async (index: number, type: string) => {
    setValue(index);
  };

  return (
    <Suspense fallback={<div />}>
      <Box>
        <Tabs
          textColor="primary"
          value={value}
          aria-label="scrollable prevent tabs example"
          indicatorColor="primary"
          centered
        >
          <Tab
            onClick={() => handleChange(0, "reactions")}
            value={0}
            label={`Reactions (${formateNumber(totalReactions) || 0})`}
            aria-label="reactions"
            className={tabStyle}
          />
          <Tab
            onClick={() => handleChange(1, "comments")}
            value={1}
            label="Comments"
            aria-label="comments"
            className={tabStyle}
          />
          <Tab
            onClick={() => handleChange(2, "info")}
            value={2}
            label="Info"
            aria-label="info"
            className={tabStyle}
          />
        </Tabs>
        <TabPanel value={value} index={0}>
          <ReactionsView note={note} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <CommentsView />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Info note={note} />
        </TabPanel>
      </Box>
    </Suspense>
  );
};

export default DoTabs;
