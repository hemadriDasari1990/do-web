import { makeStyles } from "@material-ui/core/styles";

const useStatusStyles = makeStyles(() => ({
  draftTextStyle: {
    color: "#1f1f58",
  },
  pendingTextStyle: {
    color: "#0153cc",
  },
  inProgressTextStyle: {
    color: "#ff8e00",
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
    backgroundColor: "#f7971c1a",
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
