import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useTeamLoading } from "../../../redux/state/team";

import { TEAM_MEMBERS_PER_PAGE } from "../../../util/constants";
import { Avatar } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import DoPagination from "../../common/Pagination";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import KeyboardBackspaceOutlinedIcon from "@material-ui/icons/KeyboardBackspaceOutlined";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import formateNumber from "../../../util/formateNumber";
import getCardSubHeaderText from "../../../util/getCardSubHeaderText";
import { getTeamsByMember } from "../../../redux/actions/team";
import getRandomBGColor from "../../../util/getRandomColor";
import { useDispatch } from "react-redux";
import useMainStyles from "../../styles";
import { useTeam } from "../../../redux/state/team";
import useTableStyles from "../../styles/table";
import TeamIcon from "../../../assets/team.svg";

const Loader = React.lazy(() => import("../../Loader/components"));
const NoRecords = React.lazy(() => import("../../NoRecords"));

const MemberDetails = () => {
  const { memberId } = useParams<{ memberId: string }>();
  const { authorStyle } = useTableStyles();
  const { buttonStyle, alignCenterStyle } = useMainStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { teams: teamsList, totalTeams: totalTeamsCount } = useTeam();
  const [teams, setTeams] = useState<Array<{ [Key: string]: any }>>([]);
  const [totalTeams, setTotalTeams] = useState(totalTeamsCount);
  const { loading } = useTeamLoading();
  const [page, setPage] = useState<number>(0);

  const loadMembers = (pageNo: number, searchValue: string) => {
    dispatch(
      getTeamsByMember(memberId, searchValue, pageNo, TEAM_MEMBERS_PER_PAGE)
    );
  };

  useEffect(() => {
    loadMembers(page, "");
  }, []);

  useEffect(() => {
    if (teamsList) {
      setTeams(teamsList);
      setTotalTeams(totalTeamsCount);
    }
  }, [teamsList]);

  const handleBack = () => {
    history.goBack();
  };

  const handlePage = (page: number) => {
    setPage(page);
    loadMembers(page, "");
  };

  return (
    <Box>
      <Box my={5}>
        <Grid container spacing={2}>
          <Grid item xl={8} lg={8} md={8} xs={12} sm={12}>
            <Typography variant="h2">
              Member of ({formateNumber(totalTeams) || 0})
            </Typography>
          </Grid>
          <Grid item xl={4} lg={4} md={4} xs={12} sm={12}>
            <Box>
              <Hidden only={["xs", "sm", "md"]}>
                <Box className={buttonStyle}>
                  <Button
                    variant="outlined"
                    color="default"
                    startIcon={
                      <KeyboardBackspaceOutlinedIcon color="primary" />
                    }
                    onClick={() => handleBack()}
                  >
                    <Typography color="primary" variant="subtitle1">
                      Go Back To Members
                    </Typography>
                  </Button>
                </Box>
              </Hidden>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <List>
        <Grid container spacing={2}>
          {!loading
            ? teams.map((team: { [Key: string]: any }, index: number) => (
                <Grid key={team._id} item xl={3} lg={3} md={4} xs={12} sm={12}>
                  <ListItem
                    key={team._id}
                    alignItems="flex-start"
                    className="b-r-15 mt-10 w-us"
                  >
                    <ListItemAvatar>
                      <Avatar style={{ background: getRandomBGColor(index) }}>
                        <Typography variant="h5" color="secondary">
                          {team?.team?.name
                            ? team?.team?.name.substring(0, 1)
                            : ""}
                        </Typography>
                      </Avatar>
                    </ListItemAvatar>
                    <Tooltip arrow title={team.name} placement="bottom-start">
                      <ListItemText
                        primary={
                          <Box display="flex">
                            <Typography variant="subtitle1" color="primary">
                              {team?.team?.name || "--"}
                            </Typography>
                            {team?.team?.isAuthor && (
                              <Box mt={0.6} ml={1}>
                                <Typography
                                  variant="h6"
                                  className={authorStyle}
                                  color="secondary"
                                >
                                  Author
                                </Typography>
                              </Box>
                            )}
                          </Box>
                        }
                        secondary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="body2"
                              color="textPrimary"
                            >
                              {getCardSubHeaderText(team?.team?.createdAt)}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                    </Tooltip>
                  </ListItem>
                </Grid>
              ))
            : null}
        </Grid>
      </List>
      <Box display="flex" justifyContent="space-between">
        <Box></Box>
        <DoPagination
          handlePage={handlePage}
          totalCount={totalTeams}
          pageCount={TEAM_MEMBERS_PER_PAGE}
        />
      </Box>
      <Loader enable={loading} backdrop={true} />
      {!loading && (!teams || !teams.length) ? (
        <Box className={alignCenterStyle}>
          <NoRecords message="No teams found" icon={TeamIcon} />
        </Box>
      ) : null}
    </Box>
  );
};

export default MemberDetails;
