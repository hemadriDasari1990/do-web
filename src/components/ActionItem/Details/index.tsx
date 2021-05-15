import React, { Suspense } from "react";

import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Loader from "../../Loader/components";
import PersonIcon from "@material-ui/icons/Person";
import SubtitlesIcon from "@material-ui/icons/Subtitles";
import Typography from "@material-ui/core/Typography";
import getPastTime from "../../../util/getPastTime";
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
  listIconStyle: {
    color: "#172B4D",
  },
}));

const ActionItemDetails = (props: any) => {
  const { actionItem } = props;
  const { listIconStyle } = useStyles();

  return (
    <Suspense fallback={<Loader enable={true} backdrop={true} />}>
      <Box>
        <List disablePadding>
          <ListItem alignItems="flex-start" disableGutters>
            <ListItemIcon>
              <SubtitlesIcon className={listIconStyle} />
            </ListItemIcon>
            <ListItemText
              primary={
                <React.Fragment>
                  <Typography variant="h6">
                    {actionItem?.description}
                  </Typography>
                </React.Fragment>
              }
              secondary={
                <React.Fragment>
                  <Typography variant="h5">
                    in action #{actionItem?.action?.name}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          <ListItem alignItems="flex-start" disableGutters>
            <ListItemIcon>
              <PersonIcon className={listIconStyle} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Box display="flex">
                  <Typography variant="h6">Created By &nbsp;</Typography>
                  <Typography variant="subtitle1" style={{ color: "#57f" }}>
                    {actionItem?.assignedBy?.name || "Team Member"}
                  </Typography>
                </Box>
              }
              secondary={
                <React.Fragment>
                  <Typography component="span" variant="subtitle2">
                    {getPastTime(actionItem?.createdAt)}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          <ListItem alignItems="flex-start" disableGutters>
            <ListItemIcon>
              <PersonIcon className={listIconStyle} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Box display="flex">
                  <Typography variant="h6">Last Updated By &nbsp;</Typography>
                  <Typography variant="subtitle1" style={{ color: "#57f" }}>
                    {actionItem?.assignedTo?.name || "Team Member"}
                  </Typography>
                </Box>
              }
              secondary={
                <React.Fragment>
                  <Typography component="span" variant="subtitle2">
                    {getPastTime(actionItem?.updatedAt)}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        </List>
      </Box>
    </Suspense>
  );
};

export default ActionItemDetails;
