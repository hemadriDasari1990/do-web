import React, { useCallback, useEffect, useState } from "react";

import Box from "@material-ui/core/Box";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import ColoredLine from "../common/ColoredLine";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import DoneAllOutlinedIcon from "@material-ui/icons/DoneAllOutlined";
import EditIcon from "@material-ui/icons/Edit";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Paper from "@material-ui/core/Paper";
import ScheduleIcon from "@material-ui/icons/Schedule";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";
import getPastTime from "../../util/getPastTime";
import { makeStyles } from "@material-ui/core/styles";
import { useActionItem } from "../../redux/state/actionItem";
import { useAuthenticated } from "../../redux/state/common";
import { useBoard } from "../../redux/state/board";
import { useLogin } from "../../redux/state/login";
import { useSocket } from "../../redux/state/socket";
import useStyles from "../styles";

const NoRecords = React.lazy(() => import("../NoRecords"));
const ActionItemDetails = React.lazy(() => import("./Details"));
const ResponsiveDialog = React.lazy(() => import("../Dialog"));

const useLocalStyles = makeStyles(() => ({
  adornmentStyle: {
    marginTop: "0px !important",
    marginRight: 0,
    top: 12,
    right: 10,
  },
  startAdornmentStyle: {
    top: 1,
    position: "absolute",
    borderRadius: 30,
    backgroundColor: "#dfedff",
    height: 20,
    marginTop: "8px !important",
  },
  textfieldStyle: {
    "& .MuiFilledInput-root": {
      background: "#fff",
      borderRadius: 6,
    },
  },
  iconStyle: {
    marginTop: 5,
  },
  pastTimeStyle: {
    verticalAlign: "middle",
    lineHeight: 1,
  },
  timeIconStyle: {
    fontSize: 20,
    color: "#6f7588",
  },
  svgIconStyle: {
    fontSize: "1.2rem",
  },
}));

const ActionItemList = (props: any) => {
  const {
    actionId,
    editActionItem,
    dropProvided,
    showActionItem,
    deleteActionItem,
    actionIndex,
  } = props;
  const { pastTimeStyle, timeIconStyle, svgIconStyle } = useLocalStyles();
  const { cursor } = useStyles();
  const authenticated = useAuthenticated();
  const { board } = useBoard();
  const { userId } = useLogin();
  const enableActions = !board?.isLocked || authenticated;
  const { socket } = useSocket();
  const { actionItemList } = useActionItem();

  /* Redux hooks */

  /* Local state */
  const [selectedActionItem, setSelectedActionItem] = useState<any>(null);
  const [deleteDialog, setOpenDeleteDialog] = useState(false);
  const [
    clickAwayAnchorEl,
    setClickAwayAnchorEl,
  ] = React.useState<HTMLElement | null>(null);
  const [open, setOpen] = React.useState(false);
  const [showDialog, setShowDialog] = React.useState(false);
  const [actionItems, setActionItems] = useState(actionItemList || []);

  /* React Hooks */
  useEffect(() => {
    setActionItems(actionItemList);
  }, [actionItemList]);

  useEffect(() => {
    /* Delete actionItem */
    socket.on(
      `delete-action-item-response-${actionId}`,
      (deleteActionItem: { [Key: string]: any }) => {
        if (actionId === deleteActionItem?.actionId) {
          removeDeletedActionItem(deleteActionItem);
        }
      }
    );

    /* Update actionItem */
    socket.on(
      `update-action-item-response-${actionId}`,
      (newActionItem: { [Key: string]: any }) => {
        if (actionId === newActionItem?.actionId) {
          updateActionItem(newActionItem);
        }
      }
    );

    /* Add new actionItem */
    socket.on(
      `create-action-item-response-${actionId}`,
      (newActionItem: { [Key: string]: any }) => {
        if (actionId === newActionItem?.actionId) {
          addActionItems(newActionItem);
        }
      }
    );

    socket.on(
      `mark-action-item-read-response-${actionId}`,
      (updatedActionItem: { [Key: string]: any }) => {
        updateActionItem(updatedActionItem);
      }
    );

    return () => {
      socket.off(`create-action-item-response-${actionId}`);
      socket.off(`update-action-item-response-${actionId}`);
      socket.off(`delete-action-item-response-${actionId}`);
      socket.off(`mark-action-item-read-response--${actionId}`);
    };
  }, [actionItems]);

  const updateActionItem = (updatedActionItem: { [Key: string]: any }) => {
    if (!updatedActionItem || actionId !== updatedActionItem?.actionId) {
      return;
    }

    const newActionItems: Array<{ [Key: string]: any }> = actionItems?.length
      ? [...actionItems]
      : [];
    const noteIndex: number = newActionItems.findIndex(
      (newActionItem: { [Key: string]: any }) =>
        newActionItem._id === updatedActionItem._id
    );
    const noteData: { [Key: string]: any } = newActionItems[noteIndex];
    if (!noteData) {
      return;
    }
    noteData.read = updatedActionItem.read;
    noteData.description = updatedActionItem.description;
    newActionItems[noteIndex] = noteData;
    setActionItems(newActionItems);
  };

  const addActionItems = (newActionItem: { [Key: string]: any }) => {
    if (!newActionItem || actionId !== newActionItem?.actionId) {
      return;
    }

    if (actionItems?.length) {
      const newActionItems = [...actionItems];
      setActionItems([...newActionItems, newActionItem]);
      return;
    }
    setActionItems([newActionItem]);
  };

  const removeDeletedActionItem = (actionItem: { [Key: string]: any }) => {
    if (
      !actionItem ||
      actionId !== actionItem?.actionId ||
      !actionItems?.length
    ) {
      return;
    }
    let newActionItems = [...actionItems];
    const filteredActionItems: Array<{
      [Key: string]: any;
    }> = newActionItems.filter(
      (item: { [Key: string]: any }) => item._id !== actionItem?._id
    );
    setActionItems(filteredActionItems);
  };

  /* Handler functions */
  // const deleteActionItemById = (actionItem: {[Key:string]: any}) => {
  //     setSelectedActionItem(actionItem);
  //     setOpenDeleteDialog(true);
  // }

  const handleDelete = () => {
    socket.emit(`delete-action-item`, {
      id: selectedActionItem._id,
      userId: userId,
      actionId: selectedActionItem?.actionId,
    });
    setOpenDeleteDialog(false);
  };

  const handleClose = () => {
    setOpenDeleteDialog(false);
  };

  const renderDeleteDialog = useCallback(() => {
    return (
      <Box>
        <ResponsiveDialog
          open={deleteDialog}
          title="Delete Action Item"
          pcta="Delete"
          handleSave={handleDelete}
          handleClose={handleClose}
          maxWidth={440}
        >
          <Typography variant="h5">
            Are you sure you want to delete {selectedActionItem?.description}?
          </Typography>
        </ResponsiveDialog>
      </Box>
    );
  }, [deleteDialog]);

  const renderActionItemViewDialog = useCallback(() => {
    return (
      <Box>
        <ResponsiveDialog
          open={showDialog}
          title="Action Item Details"
          hideButton={true}
          handleClose={handleViewClose}
        >
          <ActionItemDetails actionItem={selectedActionItem} />
        </ResponsiveDialog>
      </Box>
    );
  }, [showDialog]);

  const handleViewClose = () => {
    setShowDialog(false);
  };

  const handleButton = (
    event: React.MouseEvent<HTMLButtonElement>,
    actionItem: { [Key: string]: any }
  ) => {
    event.stopPropagation();
    setOpen(!open);
    setClickAwayAnchorEl(event.currentTarget);
    setSelectedActionItem(actionItem);
  };

  const handleMarkRead = (
    event: React.MouseEvent<HTMLButtonElement>,
    actionItem: { [Key: string]: any }
  ) => {
    event.stopPropagation();
    // setSelectedActionItem(actionItem);
    socket.emit("mark-action-item-read", {
      id: actionItem._id,
      read: !actionItem.read,
    });
  };

  const handleMarkReadOnly = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
  };

  const handleClickAwayClose = () => {
    setClickAwayAnchorEl(null);
    setOpen(false);
  };

  const renderMenu = useCallback(() => {
    return (
      <ClickAwayListener onClickAway={handleClickAwayClose}>
        <Menu
          id="actionItem-menu"
          open={open}
          onClose={handleClickAwayClose}
          anchorEl={clickAwayAnchorEl}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          keepMounted
          getContentAnchorEl={null}
          TransitionComponent={Zoom}
        >
          <ListItem button={true} onClick={() => handleMenuItem("edit")}>
            <ListItemAvatar style={{ minWidth: 35 }}>
              <EditIcon />
            </ListItemAvatar>
            <ListItemText
              primary={<b>Edit ActionItem</b>}
              secondary="Update the actionItem"
            />
          </ListItem>
          {authenticated && (
            <ListItem button={true} onClick={() => handleMenuItem("delete")}>
              <ListItemAvatar style={{ minWidth: 35 }}>
                <DeleteOutlineIcon />
              </ListItemAvatar>
              <ListItemText
                primary={<b>Delete ActionItem</b>}
                secondary="Once deleted can't be done"
              />
            </ListItem>
          )}
        </Menu>
      </ClickAwayListener>
    );
  }, [open]);

  const handleMenuItem = async (action: string) => {
    switch (action) {
      case "edit":
        editActionItem(selectedActionItem);
        break;
      case "delete":
        deleteActionItem(selectedActionItem);
        setOpenDeleteDialog(true);
        break;
      default:
        break;
    }
    setOpen(false);
  };

  const handleActionItem = (
    event: React.MouseEvent<HTMLDivElement>,
    actionItem: { [Key: string]: any }
  ) => {
    event.stopPropagation();
    setShowDialog(true);
    setSelectedActionItem(actionItem);
  };

  const renderPastTime = (actionItem: { [Key: string]: any }) => {
    return (
      <Box mt={0.4} mr={0.5} display="flex" className={pastTimeStyle}>
        <Box mr={0.4}>
          <ScheduleIcon className={timeIconStyle} />
        </Box>
        <Box>
          <Typography variant="body2">
            {getPastTime(actionItem?.createdAt)}
          </Typography>
        </Box>
      </Box>
    );
  };

  const renderMarkRead = useCallback(
    (actionItem: { [Key: string]: any }) => {
      return (
        <Tooltip
          arrow
          title={actionItem.read ? "Mark as unread" : "Mark as read"}
        >
          <IconButton
            size="small"
            aria-label="actionItem-menu"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
              handleMarkRead(event, actionItem)
            }
          >
            <Zoom in={true} timeout={2000}>
              <DoneAllOutlinedIcon
                style={{
                  color: actionItem.read ? "#57f" : "inherit",
                }}
                className={svgIconStyle}
              />
            </Zoom>
          </IconButton>
        </Tooltip>
      );
    },
    [authenticated]
  );

  const renderRead = useCallback(
    (actionItem: { [Key: string]: any }) => {
      return (
        <Tooltip
          arrow
          title={actionItem.read ? "Discussed" : "Not discussed yet"}
        >
          <IconButton
            size="small"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
              handleMarkReadOnly(event)
            }
          >
            <DoneAllOutlinedIcon
              style={{
                color: actionItem.read ? "#57f" : "inherit",
              }}
              className={svgIconStyle}
            />
          </IconButton>
        </Tooltip>
      );
    },
    [authenticated]
  );

  const renderMenuIcon = useCallback(
    (actionItem: { [Key: string]: any }) => {
      return (
        <Tooltip arrow title="Action">
          <IconButton
            size="small"
            aria-label="actionItem-menu"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
              handleButton(event, actionItem)
            }
          >
            <Zoom in={true} timeout={2000}>
              <MoreHorizIcon className={svgIconStyle} />
            </Zoom>
          </IconButton>
        </Tooltip>
      );
    },
    [enableActions]
  );

  const renderName = (actionItem: { [Key: string]: any }) => {
    return (
      <Box>
        <Typography variant="subtitle1" style={{ color: "#57f" }}>
          by {actionItem?.createdBy?.name || "Team member"}
        </Typography>
      </Box>
    );
  };

  return (
    <React.Fragment>
      {renderDeleteDialog()}
      {renderActionItemViewDialog()}
      {renderMenu()}
      <div ref={dropProvided?.innerRef}>
        <Grid container spacing={0}>
          {Array.isArray(actionItems) && actionItems?.length
            ? actionItems.map(
                (actionItem: { [Key: string]: any }, index: number) => (
                  <Grid
                    item
                    key={actionItem._id}
                    xl={12}
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                  >
                    <Box
                      p={1}
                      onClick={(event: React.MouseEvent<HTMLDivElement>) =>
                        handleActionItem(event, actionItem)
                      }
                      className={cursor}
                    >
                      <Paper>
                        <Box display="flex" justifyContent="space-between">
                          <ColoredLine index={actionIndex} />
                          {renderName(actionItem)}
                        </Box>
                        <Box style={{ minHeight: 40 }}>
                          <Typography variant="h6" style={{ color: "#172B4D" }}>
                            {actionItem.description}
                          </Typography>
                        </Box>
                        <Box
                          pt={2}
                          display="flex"
                          justifyContent="space-between"
                        >
                          <Box display="flex">
                            {renderPastTime(actionItem)}
                            {authenticated && <>{renderMarkRead(actionItem)}</>}
                            {!authenticated && <>{renderRead(actionItem)}</>}
                            {enableActions && <>{renderMenuIcon(actionItem)}</>}
                          </Box>
                        </Box>
                      </Paper>
                    </Box>
                  </Grid>
                )
              )
            : null}
        </Grid>
        {!actionItems?.length && !showActionItem && dropProvided?.placeholder && (
          <Box py={2}>
            <NoRecords message="ActionItems are empty" hideImage={true} />
          </Box>
        )}
        {dropProvided?.placeholder}
      </div>
    </React.Fragment>
  );
};

export default ActionItemList;
