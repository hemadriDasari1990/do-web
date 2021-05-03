import Box from "@material-ui/core/Box";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import DoTable from "../Table";
import EditIcon from "@material-ui/icons/Edit";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import React from "react";
import { TEAM_DASHBOARD } from "../../../routes/config";
import Zoom from "@material-ui/core/Zoom";
import { getTeams } from "../../../redux/actions/team";
import { replaceStr } from "../../../util";
import { teamHeaderColumns } from "../../../util/team";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useLogin } from "../../../redux/state/login";
import { useTeamLoading } from "../../../redux/state/team";

const GroupList = (props: any) => {
  const {
    teams,
    handleMenu,
    setSelectedTeam,
    handleAddMember,
    totalTeams,
  } = props;
  const history = useHistory();
  const dispatch = useDispatch();

  /* Redux hooks */
  const { loading } = useTeamLoading();
  const { userId } = useLogin();

  /* Local state */
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);

  const handleTableMenu = (
    event: React.MouseEvent<HTMLButtonElement>,
    team: { [Key: string]: any }
  ) => {
    event.stopPropagation();
    setOpen(!open);
    setAnchorEl(event.currentTarget);
    setSelectedTeam(team);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMenuItem = (
    event: React.MouseEvent<HTMLDivElement | MouseEvent>,
    action: string
  ) => {
    handleMenu(event, action);
    setOpen(false);
  };

  const renderMenu = () => {
    return (
      <Menu
        id="fade-menu"
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        keepMounted
        getContentAnchorEl={null}
        TransitionComponent={Zoom}
      >
        <ListItem
          button={true}
          onClick={(event: React.MouseEvent<HTMLDivElement | MouseEvent>) =>
            handleMenuItem(event, "edit")
          }
        >
          <ListItemAvatar style={{ minWidth: 35 }}>
            <EditIcon />
          </ListItemAvatar>
          <ListItemText
            primary={<b>Edit Team</b>}
            secondary="Update the team"
          />
        </ListItem>
        <ListItem
          button={true}
          onClick={(event: React.MouseEvent<HTMLDivElement | MouseEvent>) =>
            handleMenuItem(event, "add-member")
          }
        >
          <ListItemAvatar style={{ minWidth: 35 }}>
            <PersonAddOutlinedIcon />
          </ListItemAvatar>
          <ListItemText
            primary={<b>Add Member</b>}
            secondary="Add/remove members"
          />
        </ListItem>
        <ListItem
          button={true}
          onClick={(event: React.MouseEvent<HTMLDivElement | MouseEvent>) =>
            handleMenuItem(event, "delete")
          }
        >
          <ListItemAvatar style={{ minWidth: 35 }}>
            <DeleteOutlineIcon />
          </ListItemAvatar>
          <ListItemText
            primary={<b>Delete Team</b>}
            secondary="Once deleted can't be undone"
          />
        </ListItem>
      </Menu>
    );
  };

  const viewTeam = (team: { [Key: string]: any }) => {
    history.push(replaceStr(TEAM_DASHBOARD, "teamId", team?._id));
  };

  const refreshData = (queryString?: string) => {
    dispatch(getTeams(userId, queryString || "", page, rowsPerPage));
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 15));
    setPage(0);
  };

  return (
    <React.Fragment>
      <Box>
        {renderMenu()}
        <DoTable
          data={teams}
          loading={loading}
          headerColumns={teamHeaderColumns}
          refreshData={refreshData}
          viewItem={viewTeam}
          handleMenu={handleTableMenu}
          handleAddMember={handleAddMember}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          page={page}
          rowsPerPage={rowsPerPage}
          totalCount={totalTeams}
        />
      </Box>
    </React.Fragment>
  );
};

export default GroupList;
