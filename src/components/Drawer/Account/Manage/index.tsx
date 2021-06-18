import { Divider, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
import ChangeEmail from "./ChangeEmail";
import ChangeName from "./ChangeName";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import DoImage from "../../../common/Image";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import ManageAccountIcon from "../../../../assets/manage-account.svg";
import ManageActions from "./ManageActions";
import SecurityQuestions from "./SecurityQuestions";
import UpdatePassword from "./UpdatePassword";
import { storeAction } from "../../../../redux/actions/common";
import { useAction } from "../../../../redux/state/common";
import { useDispatch } from "react-redux";

const drawerWidth = 339;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      flexShrink: 1,
    },
    drawerPaper: {
      width: drawerWidth,
      padding: 10,
      borderRadius: 6,
      boxShadow: "0 3rem 6rem rgba(0, 0, 0, .1)",
      [theme.breakpoints.down("xs")]: {
        width: 376,
      },
    },
    drawerHeader: {
      margin: "10px 10px",
    },
    headerStyle: {
      color: "inherit",
    },
  })
);

export default function ManageAccount(props: any) {
  const { open, handleDrawerClose } = props;
  const classes = useStyles();
  const { action } = useAction();
  const dispatch = useDispatch();

  const [title, setTitle] = useState("Manage Account");

  const updateTitle = () => {};

  useEffect(() => {
    updateTitle();
  }, []);

  useEffect(() => {
    switch (action?.toLowerCase()) {
      case "update-password":
        setTitle("Update password");
        break;
      case "change-email":
        setTitle("Change email address");
        break;
      case "change-name":
        setTitle("Change Name");
        break;
      case "security-questions":
        setTitle("Update security questions");
        break;
      default:
        setTitle("Manage Account");
        break;
    }
  }, [action]);

  const handleBack = () => {
    dispatch(storeAction(""));
  };

  return (
    <React.Fragment>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Box
          display="flex"
          // justifyContent="space-between"
          className={classes.drawerHeader}
        >
          {action !== "" && (
            <Box mt={-0.5}>
              <IconButton size="small" onClick={handleBack}>
                <ChevronLeftIcon color="primary" />
              </IconButton>
            </Box>
          )}
          <Box ml="auto" className={classes.headerStyle}>
            <Typography variant="h5">{title}</Typography>
          </Box>
          <Box ml="auto">
            <IconButton
              size="small"
              // className={classes.iconStyle}
              onClick={handleDrawerClose}
            >
              <CloseOutlinedIcon color="primary" fontSize="small" />
            </IconButton>
          </Box>
        </Box>
        <Divider />
        <Box mt={5}>
          <DoImage
            src={ManageAccountIcon}
            height={200}
            width={350}
            placeholderImg={ManageAccountIcon}
            errorImg={ManageAccountIcon}
          />
        </Box>
        {action === "update-password" && <UpdatePassword />}
        {action === "change-email" && <ChangeEmail />}
        {action === "change-name" && <ChangeName />}
        {action === "security-questions" && <SecurityQuestions />}
        {action === "" && <ManageActions />}
      </Drawer>
    </React.Fragment>
  );
}
