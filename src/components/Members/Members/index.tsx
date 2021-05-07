import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useTeam, useTeamLoading } from "../../../redux/state/team";

import { ADD_MEMBERS_PER_PAGE } from "../../../util/constants";
import { Avatar } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import DoPagination from "../../common/Pagination";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import KeyboardBackspaceOutlinedIcon from "@material-ui/icons/KeyboardBackspaceOutlined";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import PersonIcon from "@material-ui/icons/Person";
import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { addOrRemoveMemberFromTeam } from "../../../redux/actions/team";
import formateNumber from "../../../util/formateNumber";
import { getAvatar } from "../../../util/getAvatar";
import getCardSubHeaderText from "../../../util/getCardSubHeaderText";
import { getMembersByUser } from "../../../redux/actions/member";
import getRandomBGColor from "../../../util/getRandomColor";
import useDebounce from "../../common/useDebounce";
import { useDispatch } from "react-redux";
import { useLogin } from "../../../redux/state/login";
import useMainStyles from "../../styles";
import { useMember } from "../../../redux/state/member";
import useStyles from "../../styles/search";
import useTableStyles from "../../styles/table";
import TeamIcon from "../../../assets/team.svg";

const Loader = React.lazy(() => import("../../Loader/components"));
const NoRecords = React.lazy(() => import("../../NoRecords"));

const Members = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const { searchRootStyle, searchIconStyle, inputStyle } = useStyles();
  const { authorStyle } = useTableStyles();
  const { buttonStyle, alignCenterStyle } = useMainStyles();
  const { userId } = useLogin();
  const dispatch = useDispatch();
  const history = useHistory();
  const { members: membersList, totalMembers: totalMembersCount } = useMember();
  const [members, setMembers] = useState<Array<{ [Key: string]: any }>>([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [totalMembers, setTotalMembers] = useState(totalMembersCount);
  const [queryString, setQueryString] = useState("");
  const [selectedMemberIndex, setSelectedMemberIndex] = useState<any>(0);
  const [apiTriggered, setApiTriggered] = useState(false);
  const { team } = useTeam();
  const { loading } = useTeamLoading();
  const [page, setPage] = useState<number>(0);
  const debouncedValue = useDebounce(queryString, 500);

  const loadMembers = (pageNo: number, searchValue: string) => {
    dispatch(
      getMembersByUser(
        userId,
        "active",
        searchValue,
        pageNo,
        ADD_MEMBERS_PER_PAGE
      )
    );
  };

  useEffect(() => {
    loadMembers(page, debouncedValue);
  }, [debouncedValue]);

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
    loadMembers(page, "");
  };

  return (
    <Box>
      <Box my={5}>
        <Grid container spacing={2}>
          <Grid item xl={4} lg={4} md={4} xs={12} sm={12}>
            <Typography variant="h2">
              Members ({formateNumber(totalMembers) || 0})
            </Typography>
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
                        {member.avatarId ? (
                          <Avatar
                            key={member._id}
                            src={getAvatar(member?.avatarId)}
                          ></Avatar>
                        ) : (
                          <Avatar
                            style={{ background: getRandomBGColor(index) }}
                          >
                            <Typography variant="h5" color="secondary">
                              {member?.name ? member?.name.substring(0, 1) : ""}
                            </Typography>
                          </Avatar>
                        )}
                      </ListItemAvatar>
                      <Tooltip
                        arrow
                        title={member.name}
                        placement="bottom-start"
                      >
                        <ListItemText
                          primary={
                            <Box display="flex">
                              <Typography variant="subtitle1" color="primary">
                                {member?.name || "--"}
                              </Typography>
                              {member.isAuthor && (
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
          <Box className={alignCenterStyle}>
            <NoRecords icon={TeamIcon} message="No Members found! Please add" />
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
