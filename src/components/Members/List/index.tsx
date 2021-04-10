import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import Box from "@material-ui/core/Box";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import DoTable from "../Table";
import EditIcon from "@material-ui/icons/Edit";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import React from "react";
import { TEAM_DASHBOARD } from "../../../routes/config";
import Zoom from "@material-ui/core/Zoom";
import { getMembersByUser } from "../../../redux/actions/member";
import { headerColumns } from "../../../util/member";
import { replaceStr } from "../../../util";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useLogin } from "../../../redux/state/login";
import { useMemberLoading } from "../../../redux/state/member";
const GroupList = (props: any) => {
  const { members, handleMenu, setSelectedMember } = props;
  const history = useHistory();
  const dispatch = useDispatch();
  const { userId } = useLogin();

  /* Redux hooks */
  const { loading } = useMemberLoading();

  /* Local state */
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);

  const handleTableMenu = (
    event: React.MouseEvent<HTMLButtonElement>,
    member: { [Key: string]: any }
  ) => {
    event.stopPropagation();
    setOpen(!open);
    setAnchorEl(event.currentTarget);
    setSelectedMember(member);
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
            primary={<b>Edit Member</b>}
            secondary="Update the member"
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
            primary={<b>Delete Member</b>}
            secondary="Once deleted can't be undone"
          />
        </ListItem>
        <ListItem
          button={true}
          onClick={(event: React.MouseEvent<HTMLDivElement | MouseEvent>) =>
            handleMenuItem(event, "archive")
          }
        >
          <ListItemAvatar style={{ minWidth: 35 }}>
            <ArchiveOutlinedIcon />
          </ListItemAvatar>
          <ListItemText
            primary={<b>Archive Member</b>}
            secondary="You've control to make it unarchive any time"
          />
        </ListItem>
      </Menu>
    );
  };

  const viewMember = (member: { [Key: string]: any }) => {
    history.push(replaceStr(TEAM_DASHBOARD, "memberId", member?._id));
  };

  const refreshData = (queryString?: string) => {
    console.log(queryString);
    dispatch(getMembersByUser(userId, "", "", page, rowsPerPage));
  };

  return (
    <React.Fragment>
      <Box>
        {renderMenu()}
        <DoTable
          data={members}
          loading={loading}
          headerColumns={headerColumns}
          refreshData={refreshData}
          viewItem={viewMember}
          handleMenu={handleTableMenu}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          page={page}
          rowsPerPage={rowsPerPage}
        />
      </Box>
    </React.Fragment>
  );
};

export default GroupList;
