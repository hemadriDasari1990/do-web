import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";

import { Avatar } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import DoPagination from "../../common/Pagination";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import KeyboardBackspaceOutlinedIcon from "@material-ui/icons/KeyboardBackspaceOutlined";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
import { TEAM_MEMBERS_PER_PAGE } from "../../../util/constants";
import TeamIcon from "../../../assets/team.svg";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import formateNumber from "../../../util/formateNumber";
import { getAvatar } from "../../../util/getAvatar";
import getCardSubHeaderText from "../../../util/getCardSubHeaderText";
import { getMembersByTeam } from "../../../redux/actions/member";
import getRandomBGColor from "../../../util/getRandomColor";
import { useDispatch } from "react-redux";
import useMainStyles from "../../styles";
import { useMember } from "../../../redux/state/member";
import { useMemberLoading } from "../../../redux/state/member";
import useTableStyles from "../../styles/table";

const Loader = React.lazy(() => import("../../Loader/components"));
const NoRecords = React.lazy(() => import("../../NoRecords"));

const TeamDetails = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const { authorStyle } = useTableStyles();
  const { buttonStyle, alignCenterStyle } = useMainStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { members: membersList, totalMembers: totalMembersCount } = useMember();
  const [members, setMembers] = useState<Array<{ [Key: string]: any }>>([]);
  const [totalMembers, setTotalMembers] = useState(totalMembersCount);
  const { loading } = useMemberLoading();
  const [page, setPage] = useState<number>(0);

  const loadMembers = (pageNo: number, searchValue: string) => {
    dispatch(
      getMembersByTeam(teamId, searchValue, pageNo, TEAM_MEMBERS_PER_PAGE)
    );
  };

  useEffect(() => {
    loadMembers(page, "");
  }, []);

  useEffect(() => {
    if (membersList) {
      setMembers(membersList);
      setTotalMembers(totalMembersCount);
    }
  }, [membersList]);

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
              Members ({formateNumber(totalMembers) || 0})
            </Typography>
          </Grid>
          <Grid item xl={4} lg={4} md={4} xs={12} sm={12}>
            <Box display="flex" justifyContent="flex-end">
              <Hidden only={["xl", "lg"]}>
                <Tooltip
                  title="Go Back To Previous Page"
                  placement="bottom"
                  arrow
                >
                  <Fab color="primary" onClick={() => handleBack()}>
                    <KeyboardBackspaceOutlinedIcon color="primary" />
                  </Fab>
                </Tooltip>
              </Hidden>
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
                      Go Back To Teams
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
            ? members.map((member: { [Key: string]: any }, index: number) => (
                <Grid
                  key={member._id}
                  item
                  xl={3}
                  lg={3}
                  md={4}
                  xs={12}
                  sm={12}
                >
                  <ListItem
                    key={member._id}
                    alignItems="flex-start"
                    className="b-r-15 mt-10 w-us"
                  >
                    <ListItemAvatar>
                      {member?.member?.avatarId ? (
                        <Avatar
                          key={member._id}
                          src={getAvatar(member?.member?.avatarId)}
                        ></Avatar>
                      ) : (
                        <Avatar style={{ background: getRandomBGColor(index) }}>
                          <Typography variant="h5" color="secondary">
                            {member?.member?.name
                              ? member?.member?.name.substring(0, 1)
                              : ""}
                          </Typography>
                        </Avatar>
                      )}
                    </ListItemAvatar>
                    <Tooltip arrow title={member.name} placement="bottom-start">
                      <ListItemText
                        primary={
                          <Box display="flex">
                            <Typography variant="subtitle1" color="primary">
                              {member?.member?.name || "--"}
                            </Typography>
                            {member?.member?.isAuthor && (
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
                              {getCardSubHeaderText(member?.member?.createdAt)}
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
          totalCount={totalMembers}
          pageCount={TEAM_MEMBERS_PER_PAGE}
        />
      </Box>
      <Loader enable={loading} backdrop={true} />
      {!loading && (!members || !members.length) ? (
        <Box className={alignCenterStyle}>
          <NoRecords message="No records found" icon={TeamIcon} />
        </Box>
      ) : null}
    </Box>
  );
};

export default TeamDetails;
