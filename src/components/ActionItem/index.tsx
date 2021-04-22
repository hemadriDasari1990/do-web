import React, { useCallback, useEffect, useState } from "react";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grid from "@material-ui/core/Grid";
import Loader from "../Loader/components";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import UpdateActionItem from "./Update";
import Zoom from "@material-ui/core/Zoom";
import { getActionItemsByActionId } from "../../redux/actions/actionItem";
import { makeStyles } from "@material-ui/core/styles";
import { useAuthenticated } from "../../redux/state/common";
import { useDispatch } from "react-redux";
import { useLoading } from "../../redux/state/actionItem";
import { useSocket } from "../../redux/state/socket";

const ActionItemsList = React.lazy(() => import("./list"));

const useStyles = makeStyles(() => ({
  buttonStyle: {
    background: "#fff",
    height: 45,
    boxShadow:
      "0 5px 10px rgba(154,160,185,.05), 0 15px 40px rgba(166,173,201,.2)",
    justifyContent: "center !important",
    "&:hover": {
      boxShadow: "none",
      justifyContent: "center",
    },
  },
}));

function ActionItem(props: any) {
  const { actionId, actionIndex } = props;
  const { buttonStyle } = useStyles();
  const authenticated = useAuthenticated();
  const { socket } = useSocket();
  const dispatch = useDispatch();
  const { loading } = useLoading();

  const enableActions = () => {
    if (authenticated) {
      return true;
    }
    return false;
  };

  /* Local states */
  const [actionItem, setActionItem] = useState<any>(null);
  const [showActionItem, setShowActionItem] = useState(false);
  const [selectedActionId, setSelectedActionId] = useState<any>(null);

  /* React Hooks */
  useEffect(() => {
    if (actionId) {
      dispatch(getActionItemsByActionId(actionId));
    }
  }, [actionId]);

  useEffect(() => {
    /* Update action item */
    socket.on(
      `update-action-item-response-${actionId}`,
      (newActionItem: { [Key: string]: any }) => {
        setActionItem(null);
        setShowActionItem(false);
      }
    );

    /* Add new action item */
    socket.on(
      `create-action-item-response-${actionId}`,
      (newActionItem: { [Key: string]: any }) => {
        if (actionId === newActionItem?.actionId) {
          setShowActionItem(false);
          setSelectedActionId(null);
        }
      }
    );

    return () => {};
  }, [showActionItem]);

  useEffect(() => {
    /* Delete actionItem */
    socket.on(
      `delete-action-item-response-${actionId}`,
      (deleteActionItem: { [Key: string]: any }) => {
        if (actionId === deleteActionItem?.actionId) {
          setActionItem(null);
        }
      }
    );

    return () => {};
  }, [actionItem]);

  const editActionItem = (actionItem: { [Key: string]: any }) => {
    if (!actionItem) {
      return;
    }
    setShowActionItem(true);
    setSelectedActionId(actionItem.actionId);
    setActionItem(actionItem);
  };

  const deleteActionItem = (actionItem: { [Key: string]: any }) => {
    if (!actionItem) {
      return;
    }
    setSelectedActionId(actionItem.actionId);
    setActionItem(actionItem);
  };

  const createActionItem = (currentActionId: string) => {
    setShowActionItem(true);
    setSelectedActionId(currentActionId);
  };

  const handleClickAway = () => {
    setShowActionItem(false);
  };

  const handleCancel = () => {
    setShowActionItem(false);
  };

  const renderUpdateActionItem = useCallback(() => {
    return (
      <Box p={1}>
        <ClickAwayListener onClickAway={() => handleClickAway()}>
          <UpdateActionItem
            selectedActionItem={actionItem}
            actionId={actionId}
            handleCancel={handleCancel}
          />
        </ClickAwayListener>
      </Box>
    );
  }, [selectedActionId, actionId, showActionItem]);

  const renderCreateActionItemButton = useCallback(() => {
    return (
      <Grid container>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Box p={1}>
            <Tooltip arrow title="Create ActionItem">
              <Zoom in={true} timeout={1500}>
                <Button
                  variant="contained"
                  size="small"
                  fullWidth
                  classes={{ root: buttonStyle }}
                  onClick={() => createActionItem(actionId)}
                >
                  <Typography variant="h5">+ Create Action Item</Typography>
                </Button>
              </Zoom>
            </Tooltip>
          </Box>
        </Grid>
      </Grid>
    );
  }, [showActionItem, enableActions()]);

  return (
    <React.Fragment>
      {showActionItem ? <>{renderUpdateActionItem()}</> : null}
      {!showActionItem && enableActions() && (
        <>{renderCreateActionItemButton()}</>
      )}
      <Loader enable={loading} />
      <ActionItemsList
        editActionItem={editActionItem}
        showActionItem={showActionItem}
        deleteActionItem={deleteActionItem}
        actionIndex={actionIndex}
        actionId={actionId}
      />
    </React.Fragment>
  );
}

export default ActionItem;
