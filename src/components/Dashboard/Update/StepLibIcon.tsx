import AccountTreeOutlinedIcon from "@material-ui/icons/AccountTreeOutlined";
import Check from "@material-ui/icons/Check";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import GroupOutlinedIcon from "@material-ui/icons/GroupOutlined";
import React from "react";
import { StepIconProps } from "@material-ui/core/StepIcon";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    zIndex: 1,
    color: "#fff",
    width: 37,
    height: 37,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(rgb(121, 151, 255) 0px, rgb(85, 119, 255) 100%)",
  },
  active: {
    background: "linear-gradient(rgb(255, 219, 88) 0px, rgb(255, 200, 0) 100%)",
  },
});

function ColorlibStepIcon(props: StepIconProps) {
  const { root, active } = useStyles();
  const { completed } = props;
  const icons: { [index: string]: React.ReactElement } = {
    1: <AccountTreeOutlinedIcon fontSize="small" />,
    2: <DashboardOutlinedIcon fontSize="small" />,
    3: <GroupOutlinedIcon fontSize="small" />,
  };

  return (
    <div className={`${root} ${completed ? active : null}`}>
      {completed ? <Check /> : icons[String(props.icon)]}
    </div>
  );
}

export default ColorlibStepIcon;
