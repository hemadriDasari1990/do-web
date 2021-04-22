import React, { Suspense, useCallback, useEffect, useState } from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";
import { useLoading, useAction } from "../../redux/state/action";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import DeleteIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import SectionsListSkeleton from "../common/skeletons/sectionList";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";
import formateNumber from "../../util/formateNumber";
import { useAuthenticated } from "../../redux/state/common";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { useSocket } from "../../redux/state/socket";
import { getActionByBoard } from "../../redux/actions/action";
import ActionItem from "../ActionItem";

const NoRecords = React.lazy(() => import("../NoRecords"));
const ResponsiveDialog = React.lazy(() => import("../Dialog"));
const UpdateAction = React.lazy(() => import("./Update"));

const useLocalStyles = makeStyles((theme: Theme) => ({
  sectionHeader: {
    padding: "5px 15px 5px 15px",
  },
  titleStyle: {
    width: "fit-content",
  },
  sectionGridStyle: {
    border: "2px solid #172b4d",
    borderRadius: 6,
  },
  sectionStyle: {
    backgroundColor: "#d8d8d833",
    borderRadius: 6,
    width: "100%",
  },
  listItemStyle: {
    cursor: "pointer",
  },
}));

const ActionList = () => {
  const {
    sectionHeader,
    titleStyle,
    sectionStyle,
    listItemStyle,
  } = useLocalStyles();

  const dispatch = useDispatch();

  const { boardId } = useParams<{ boardId: string }>();
  const { socket } = useSocket();

  /* Redux hooks */
  const { action: actionResponse } = useAction();
  const { loading } = useLoading();
  const authenticated = useAuthenticated();

  /* Local state */
  const [apiCalled, setApiCalled] = useState(false);
  const [action, setAction] = useState<any>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteDialog, setOpenDeleteDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  /* React Hooks */
  useEffect(() => {
    setApiCalled(false);
    dispatch(getActionByBoard(boardId));
    setApiCalled(true);
  }, []);

  useEffect(() => {
    socket.on(
      `minus-action-item-count-response`,
      (deletedActionItem: { [Key: string]: any }) => {
        updateTotalActionItems(deletedActionItem?.actionId, "substract");
      }
    );

    socket.on(
      `plus-action-item-count-response`,
      (newActionItem: { [Key: string]: any }) => {
        updateTotalActionItems(newActionItem?.actionId, "add");
      }
    );

    return () => {
      socket.off(`plus-action-item-count-response`);
      socket.off(`minus-action-item-count-response`);
    };
  }, [action]);

  useEffect(() => {
    /* Update action Title */
    socket.on(
      `update-action-response`,
      (updatedAction: { [Key: string]: any }) => {
        if (!updatedAction) {
          return;
        }
        setAction(updatedAction);
      }
    );
    /* Delete action  */
    socket.on(
      `delete-action-response`,
      (deletedAction: { [Key: string]: any }) => {
        if (!deletedAction?.deleted) {
          return;
        }
        setAction(null);
      }
    );
    /* Delete action  */
    socket.on(`create-action-response`, (newAction: { [Key: string]: any }) => {
      if (!newAction?._id) {
        return;
      }
      setAction(newAction);
    });
    return () => {
      socket.off("update-action-response");
      socket.off("create-action-response");
      socket.off("delete-action-response");
    };
  }, [action]);

  useEffect(() => {
    if (!loading && apiCalled && actionResponse) {
      setAction(actionResponse);
      setApiCalled(false);
    }
  }, [apiCalled, actionResponse, loading]);

  /* Handler functions */
  const editAction = () => {
    setOpenDialog(true);
    setAnchorEl(null);
  };

  const handleDeleteAction = () => {
    setOpen(false);
    setOpenDeleteDialog(true);
  };

  const updateTotalActionItems = useCallback(
    (actionId: string, operation: string) => {
      if (!action) {
        return;
      }
      const newAction: { [Key: string]: any } = { ...action };
      newAction.totalActionItems =
        operation === "add"
          ? newAction?.totalActionItems + 1
          : newAction?.totalActionItems > 1
          ? newAction?.totalActionItems - 1
          : 0;
      setAction(newAction);
    },
    [action]
  );

  const handleMenuClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  const renderMenu = () => {
    return (
      <Menu
        id={action?._id}
        open={open}
        onClose={handleMenuClose}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        keepMounted
        getContentAnchorEl={null}
        TransitionComponent={Zoom}
      >
        <ListItem
          button={true}
          className={listItemStyle}
          onClick={() => editAction()}
        >
          <ListItemAvatar style={{ minWidth: 35 }}>
            <EditIcon />
          </ListItemAvatar>
          <ListItemText
            primary={<b>Edit Action</b>}
            secondary="Update Action"
          />
        </ListItem>
        <ListItem
          button={true}
          className={listItemStyle}
          onClick={() => handleDeleteAction()}
        >
          <ListItemAvatar style={{ minWidth: 35 }}>
            <DeleteIcon />
          </ListItemAvatar>
          <ListItemText
            primary={<b>Delete Action</b>}
            secondary="Once deleted can't be undone"
          />
        </ListItem>
      </Menu>
    );
  };

  const handleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(!open);
    setAnchorEl(event.currentTarget);
  };

  const renderMenuAction = () => {
    return (
      <>
        <Tooltip arrow title="Update">
          <IconButton
            id={action?._id}
            size="small"
            aria-label="settings"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
              handleMenu(event)
            }
          >
            <Zoom in={true} timeout={2000}>
              <MoreHorizIcon />
            </Zoom>
          </IconButton>
        </Tooltip>
        {renderMenu()}
      </>
    );
  };

  const handleDelete = () => {
    socket.emit("delete-action", action?._id);
    setOpenDeleteDialog(false);
  };

  const renderUpdateDialog = () => {
    return (
      <UpdateAction
        selectedAction={action}
        openDialog={openDialog}
        handleClose={handleClose}
      />
    );
  };

  const renderDeleteDialog = useCallback(() => {
    return (
      <Box>
        <ResponsiveDialog
          open={deleteDialog}
          title="Delete Action"
          pcta="Delete"
          handleSave={handleDelete}
          handleClose={handleClose}
          maxWidth={440}
        >
          <Typography variant="h5">
            Are you sure you want to delete {action?.title}?
          </Typography>
        </ResponsiveDialog>
      </Box>
    );
  }, [deleteDialog]);

  const handleClose = () => {
    if (openDialog) {
      setOpenDialog(false);
    }

    if (deleteDialog) {
      setOpenDeleteDialog(false);
    }
  };

  return (
    <Suspense fallback={<div />}>
      {/* <Loader enable={loading} /> */}
      {renderDeleteDialog()}
      {renderUpdateDialog()}
      {loading ? <SectionsListSkeleton /> : null}
      {!loading && action && (
        <Grid container spacing={1}>
          <Grid xl={3} lg={3} md={4} sm={6} xs={12}>
            <div className={`${sectionStyle}`}>
              <ListItem disableGutters>
                <ListItemText
                  primary={
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      className={`${titleStyle}`}
                    >
                      <Box>
                        <Typography className={sectionHeader} variant="h3">
                          {action?.title}&nbsp;(
                          {formateNumber(action?.totalActionItems) || 0})
                        </Typography>
                      </Box>
                    </Box>
                  }
                />
                <ListItemSecondaryAction>
                  {authenticated ? renderMenuAction() : null}
                </ListItemSecondaryAction>
              </ListItem>
              {renderMenu()}
              <ActionItem actionId={action?._id} />
            </div>
          </Grid>
        </Grid>
      )}
      {!loading && !action && <NoRecords message="No Actions found" />}
    </Suspense>
  );
};

export default ActionList;
