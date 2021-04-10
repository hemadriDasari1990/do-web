import { makeStyles } from "@material-ui/core/styles";

const useStatusStyles = makeStyles(() => ({
  draftTextStyle: {
    color: "#0153cc",
  },
  pendingTextStyle: {
    color: "#0153cc",
  },
  inProgressTextStyle: {
    color: "#ff5e04",
  },
  completedTextStyle: {
    color: "#1cbf39",
  },
  draftStyle: {
    backgroundColor: "#0052cc14",
  },
  pendingStyle: {
    backgroundColor: "#0052cc14",
  },
  inProgressStyle: {
    backgroundColor: "#e9651138",
  },
  completedStyle: {
    backgroundColor: "#16cc0014",
  },
  statusBoxStyle: {
    borderRadius: 6,
    padding: "0px 6px",
  },
  statusTextStyle: {
    fontWeight: 700,
    width: "fit-content",
  },
}));

export default useStatusStyles;
