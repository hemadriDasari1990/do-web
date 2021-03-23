import { makeStyles } from "@material-ui/core/styles";

import getRandomBGColor from "../../util/getRandomColor";

const useStyles = makeStyles(() => ({
  iconStyle: {
    fill: "#738794",
  },
  searchStyle: {
    height: 48,
    "& .MuiFilledInput-Root": {
      height: 48,
    },
  },
  tableCellStyle: {
    height: 55,
  },
  incompleteStyle: {
    color: "#b00020",
  },
  submittedStyle: {
    color: "#0da931",
  },
  pendingStyle: {
    color: "#f7971c",
  },
  inProgressStyle: {
    color: "#f7971c",
  },
  iconButtonStyle: {
    height: 36,
    width: 36,
  },
  svgIconStyle: {
    height: 11,
    width: 10.67,
    color: "#1a4198",
  },
  tableContainerStyle: {
    maxHeight: 770,
  },
  tableBodyStyle: {
    background: "#fff",
  },
  tableStyle: {
    // borderSpacing: "0px 4px",
  },
  rowStyle: {
    hover: {
      background: "#333",
    },
  },
  avatarStyle: {
    width: 30,
    height: 30,
  },
  avatarGroupStyle: {
    background: getRandomBGColor(1),
    fontSize: "0.8rem",
    fontWeight: 600,
  },
  authorBoxStyle: {
    backgroundColor: "#1e1e58",
    borderRadius: 6,
  },
  authorStyle: {
    padding: "0 6px",
  },
}));

export default useStyles;
