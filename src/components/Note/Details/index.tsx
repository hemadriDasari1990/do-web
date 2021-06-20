import React, { Suspense, useEffect, useState } from "react";

import BackIcon from "@material-ui/icons/ArrowBack";
import Box from "@material-ui/core/Box";
import DoTabs from "./Tabs";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
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
    color: "#113561",
  },
}));

const NoteDetails = React.memo((props: any) => {
  const { note } = props;
  const { listIconStyle } = useStyles();
  const [page, setPage] = useState(1);

  const [noteDetails, setNoteDetails] = useState<any>(null);

  const goBack = () => {
    setPage(1);
  };

  useEffect(() => {
    setNoteDetails(note);
  }, [note]);

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
                  <Typography variant="subtitle1">
                    {note?.description}
                  </Typography>
                </React.Fragment>
              }
              secondary={
                <Box display="flex">
                  <Typography variant="h6">in section &nbsp;</Typography>
                  <Typography variant="subtitle1">
                    #{note?.section?.name}
                  </Typography>
                </Box>
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
                  <Typography variant="subtitle1">Created By &nbsp;</Typography>
                  <Typography variant="subtitle1" style={{ color: "#57f" }}>
                    {noteDetails?.createdBy?.name || "Team Member"}
                  </Typography>
                </Box>
              }
              secondary={
                <React.Fragment>
                  <Typography variant="subtitle2">
                    {getPastTime(noteDetails?.createdAt)}
                  </Typography>
                </React.Fragment>
              }
            />
            <ListItemIcon>
              <PersonIcon className={listIconStyle} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Box display="flex">
                  <Typography variant="subtitle1">Updated By &nbsp;</Typography>
                  <Typography variant="subtitle1" style={{ color: "#57f" }}>
                    {noteDetails?.updatedBy?.name
                      ? noteDetails?.updatedBy?.name
                      : noteDetails?.isAnonymous
                      ? "Team Member"
                      : "--"}
                  </Typography>
                </Box>
              }
              secondary={
                <React.Fragment>
                  <Typography component="span" variant="subtitle2">
                    {getPastTime(noteDetails?.updatedAt)}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        </List>
      </Box>
      {page === 2 && (
        <Box>
          <Grid container spacing={1}>
            <Grid item lg={2} xs={12}>
              <IconButton onClick={() => goBack()} color="primary">
                <BackIcon />
              </IconButton>
            </Grid>
            <Grid item lg={10} xs={12}>
              <ListSubheader component="div" id="nested-list-subheader">
                Notify with reason
              </ListSubheader>
            </Grid>
          </Grid>
        </Box>
      )}
      {page === 1 && <DoTabs note={note} />}
      {page === 3 && <Box></Box>}
    </Suspense>
  );
});

export default NoteDetails;
