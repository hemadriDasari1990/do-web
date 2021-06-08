import { makeStyles } from "@material-ui/core/styles";

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
    height: "2.5rem",
    padding: "4px 24px 4px 16px",
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
    maxHeight: 830,
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
  smallAvatarStyle: {
    width: 25,
    height: 25,
  },
  avatarGroupStyle: {
    background: "#1f1f581a",
    fontSize: "0.8rem",
    fontWeight: 600,
    color: "#1f1f58",
  },
  authorStyle: {
    padding: "0 6px",
    backgroundColor: "#113561",
    borderRadius: 6,
  },
}));

export default useStyles;
