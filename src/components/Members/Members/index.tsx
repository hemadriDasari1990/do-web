import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useMember } from "../../../redux/state/member";
import { useTeam, useTeamLoading } from "../../../redux/state/team";

import { Avatar } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import PersonIcon from "@material-ui/icons/Person";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { addOrRemoveMemberFromTeam } from "../../../redux/actions/team";
import getCardSubHeaderText from "../../../util/getCardSubHeaderText";
import { getMembersByUser } from "../../../redux/actions/member";
import getRandomBGColor from "../../../util/getRandomColor";
import { useDispatch } from "react-redux";
import { useLogin } from "../../../redux/state/login";
import useStyles from "../../styles/search";
import { useUser } from "../../../redux/state/user";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import KeyboardBackspaceOutlinedIcon from "@material-ui/icons/KeyboardBackspaceOutlined";
import useMainStyles from "../../styles";
import useTableStyles from "../../styles/table";
import DoPagination from "../../common/Pagination";
import { ADD_MEMBERS_PER_PAGE } from "../../../util/constants";

const Loader = React.lazy(() => import("../../Loader/components"));
const NoRecords = React.lazy(() => import("../../NoRecords"));
const Members = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const { searchRootStyle, searchIconStyle, inputStyle } = useStyles();
  const { authorBoxStyle, authorStyle } = useTableStyles();
  const { iconBackStyle, buttonStyle } = useMainStyles();
  const { userId } = useLogin();
  const dispatch = useDispatch();
  const history = useHistory();
  const { members: membersList } = useMember();
  const { totalMembers: totalMembersCount } = useUser();

  const [members, setMembers] = useState<Array<{ [Key: string]: any }>>([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [totalMembers, setTotalMembers] = useState(totalMembersCount);
  const [queryString, setQueryString] = useState("");
  const [selectedMemberIndex, setSelectedMemberIndex] = useState<any>(0);
  const [apiTriggered, setApiTriggered] = useState(false);
  const { team } = useTeam();
  const { loading } = useTeamLoading();
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    loadMembers(page);
  }, []);

  const loadMembers = (pageNo: number) => {
    dispatch(
      getMembersByUser(userId, queryString, pageNo, ADD_MEMBERS_PER_PAGE)
    );
  };

  useEffect(() => {
    const usersTimer = setTimeout(async () => {
      await loadMembers(page);
    }, 300);

    return () => {
      clearTimeout(usersTimer);
    };
  }, [queryString]);

  useEffect(() => {
    if (membersList) {
      setMembers(membersList);
      setFilteredMembers(membersList);
      setTotalMembers(totalMembersCount);
    }
  }, [membersList]);

  useEffect(() => {
    if (!loading && team?.removed && apiTriggered) {
      const oldMembers = [...members];
      const oldMember: { [Key: string]: any } = oldMembers[selectedMemberIndex];
      const teams = oldMember.teams.filter(
        (m: { [Key: string]: any }) => m.teamId !== teamId
      );
      oldMember.teams = teams;
      oldMembers[selectedMemberIndex] = oldMember;
      setMembers(oldMembers);
      setSelectedMemberIndex(0);
      setApiTriggered(false);
    }
    if (!loading && team?._id && apiTriggered) {
      const oldMembers: Array<{ [Key: string]: any }> = [...members];
      const oldMember: { [Key: string]: any } = oldMembers[selectedMemberIndex];
      if (oldMember) {
        oldMember.teams = [...oldMember.teams, team];
      }
      setMembers(oldMembers);
      setSelectedMemberIndex(0);
      setApiTriggered(false);
    }
  }, [loading, team]);

  const handleAddOrRemoveMember = (
    member: { [Key: string]: any },
    index: number
  ) => {
    setApiTriggered(false);
    dispatch(
      addOrRemoveMemberFromTeam(
        {
          memberId: member._id,
          teamId: teamId,
        },
        teamId
      )
    );
    setSelectedMemberIndex(index);
    setApiTriggered(true);
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setQueryString(event.target.value);
  };

  const renderAddMemberColor = (teams: Array<{ [Key: string]: any }>) => {
    const teamFound: any = checkIfMemberAdded(teams);
    return teamFound ? "primary" : "default";
  };

  const checkIfMemberAdded = (teams: Array<{ [Key: string]: any }>) => {
    if (!teams) {
      return;
    }
    const teamFound: any = teams.find(
      (t: { [Key: string]: any }) => t?.teamId === teamId
    );
    return teamFound;
  };

  const handleBack = () => {
    history.goBack();
  };

  const handlePage = (page: number) => {
    setPage(page);
    loadMembers(page);
  };

  return (
    <Box>
      <Box my={5}>
        <Grid container spacing={2}>
          <Grid item xl={4} lg={4} md={4} xs={12} sm={12}>
            <Typography variant="h2">Members ({totalMembers})</Typography>
          </Grid>
          <Grid item xl={4} lg={4} md={4} xs={12} sm={12}>
            <label className={searchRootStyle}>
              <SearchIcon className={searchIconStyle} />
              <TextField
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInput(e)
                }
                fullWidth
                value={queryString}
                InputProps={{
                  disableUnderline: true,
                  classes: { input: inputStyle },
                }}
                placeholder="Search members by name"
              />
            </label>
          </Grid>
          <Grid item xl={4} lg={4} md={4} xs={12} sm={12}>
            <Box display="flex" justifyContent={"flex-end"}>
              <Hidden only={["xl", "lg", "md"]}>
                <IconButton
                  className={iconBackStyle}
                  onClick={() => handleBack()}
                >
                  <KeyboardBackspaceOutlinedIcon color="primary" />
                </IconButton>
              </Hidden>
              <Hidden only={["xs", "sm"]}>
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
                      Go Back To Previous Page
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
            ? filteredMembers.map(
                (member: { [Key: string]: any }, index: number) => (
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
                        <Avatar style={{ background: getRandomBGColor(index) }}>
                          <Typography variant="h5" color="secondary">
                            {member?.name ? member?.name.substring(0, 1) : ""}
                          </Typography>
                        </Avatar>
                      </ListItemAvatar>
                      <Tooltip
                        arrow
                        title={member.name}
                        placement="bottom-start"
                      >
                        <ListItemText
                          primary={
                            <Box display="flex">
                              <Typography variant="h5" color="primary">
                                {member?.name || "--"}
                              </Typography>
                              {member.isAuthor && (
                                <Box ml={1} className={authorBoxStyle}>
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
                                {getCardSubHeaderText(member?.createdAt)}
                              </Typography>
                            </React.Fragment>
                          }
                        />
                      </Tooltip>
                      <ListItemSecondaryAction className="r-5">
                        <Tooltip
                          arrow
                          title={
                            checkIfMemberAdded(member.teams)
                              ? "Remove Member"
                              : `Add Member`
                          }
                          placement="left"
                        >
                          <IconButton
                            size="small"
                            onClick={() =>
                              handleAddOrRemoveMember(member, index)
                            }
                            color={renderAddMemberColor(member.teams)}
                          >
                            {checkIfMemberAdded(member.teams) ? (
                              <PersonIcon />
                            ) : (
                              <PersonAddOutlinedIcon />
                            )}
                          </IconButton>
                        </Tooltip>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </Grid>
                )
              )
            : null}
        </Grid>
        {!loading && (!filteredMembers || !filteredMembers.length) ? (
          <Box>
            <NoRecords message="No Members found! Please add" />
          </Box>
        ) : null}
      </List>
      <Box display="flex" justifyContent="space-between">
        <Box></Box>
        <DoPagination
          handlePage={handlePage}
          totalCount={totalMembers}
          pageCount={ADD_MEMBERS_PER_PAGE}
        />
      </Box>
      {loading && <Loader />}
    </Box>
  );
};

export default Members;
