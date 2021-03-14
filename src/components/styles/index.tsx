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
  plusTwoIconStyle: {
    background: "linear-gradient(50deg, #0072ff 0%, #0095ffba 100%)",
  },
  disAgreeIconStyle: {
    background: "linear-gradient(50deg, #2d7bf1 0%, #27fd00 100%)",
  },
  loveIconStyle: {
    background: "linear-gradient(50deg, #ea087b 0%, #ff5656 100%)",
  },
  plusIconStyle: {
    background: "linear-gradient(50deg, #0072ff 0%, #0095ffba 100%)",
  },
  deserveIconStyle: {
    background: "linear-gradient(50deg, #ffc800 0%, #ff0000ba 100%)",
  },
  reactionStyle: {
    fontSize: 12,
  },
}));

export default useStyles;
