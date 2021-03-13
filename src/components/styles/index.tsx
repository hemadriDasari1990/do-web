import { Theme, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minHeight: "90vh",
  },
  buttonStyle: {
    textAlign: "end",
  },
  countStyle: {
    borderRadius: 5,
    border: "1px solid #0072ff",
    minWidth: 30,
    height: 30,
    [theme.breakpoints.down("xl")]: {
      marginTop: 6,
    },
    [theme.breakpoints.down("lg")]: {
      marginTop: 6,
    },
    [theme.breakpoints.down("md")]: {
      marginTop: 6,
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: 6,
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: 6,
    },
  },
  countTextStyle: {
    top: "50%",
    textAlign: "center",
    fontWeight: 600,
  },
  iconBackStyle: {
    backgroundColor: "#dfebfb",
  },
  cursor: {
    cursor: "pointer",
  },
  cardStyle: {
    backgroundColor: "#fff",
  },
  avatarBoxStyle: {
    borderRadius: 5,
    fontSize: 30,
    padding: 2,
  },
  boxTextStyle: {
    padding: "3px 10px 3px 10px",
  },
  boxStyle: {
    backgroundColor: "#f7fafd",
    borderRadius: 6,
  },
}));

export default useStyles;
