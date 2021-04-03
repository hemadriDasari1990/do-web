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
    border: "1px solid #172b4d",
    minWidth: 30,
    height: 30,
    [theme.breakpoints.down("xl")]: {
      marginTop: 14,
    },
    [theme.breakpoints.down("lg")]: {
      marginTop: 14,
    },
    [theme.breakpoints.down("md")]: {
      marginTop: 14,
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: 14,
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: 14,
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
    background: "linear-gradient(12deg,#c724b1,#c724b1 40%,#753bbd) ",
  },
  boxTextStyle: {
    padding: "3px 10px 3px 10px",
  },
  boxStyle: {
    backgroundColor: "#f7fafd",
    borderRadius: 6,
  },
  minusOneIconStyle: {
    background: "linear-gradient(50deg, #2d7bf1 0%, #27fd00 100%)",
  },
  plusTwoIconStyle: {
    background: "linear-gradient(50deg, #0072ff 0%, #0089ffeb 100%)",
  },
  loveIconStyle: {
    background: "linear-gradient(50deg, #ea087b 0%, #ff5656 100%)",
  },
  plusIconStyle: {
    background: "linear-gradient(50deg, #0072ff 0%, #0089ffeb 100%)",
  },
  deserveIconStyle: {
    background: "linear-gradient(50deg, #ffc800 0%, #ff0000ba 100%)",
  },
  reactionStyle: {
    fontSize: 12,
  },
  boxTopGridStyle: {
    height: 100,
    background: "linear-gradient(12deg,#c724b1,#c724b1 40%,#753bbd) ",
  },
  boxGridStyle: {
    padding: "2rem 1rem",
    position: "relative",
  },
  iconBoxStyle: {
    backgroundColor: "rgb(255, 255, 255)",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    border: "3px solid rgb(255, 255, 255)",
    borderRadius: "0.5rem",
    left: "1rem",
    position: "absolute",
    top: "-1.5rem",
    width: "3rem",
  },
  boxMainStyle: {
    borderRadius: 6,
    boxShadow: "rgb(9 30 66 / 15%) 0px 0.5rem 1rem 0px",
    color: "inherit",
    display: "block",
    height: "100%",
    overflow: "hidden",
    textAlign: "left",
    textDecoration: "none",
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
  },
  boxTitleStyle: {
    fontSize: "1.5rem",
    lineHeight: "1.33333",
  },
  descriptionStyle: {
    fontSize: "1rem",
    margin: "0.5rem 0px 0px",
  },
  logoIconStyle: {
    padding: 3,
    borderRadius: "50%",
    background: "linear-gradient(12deg,#c724b1,#c724b1 40%,#753bbd) ",
    width: 25,
    height: 25,
  },
  n30: {
    backgroundColor: "#EBECF0",
  },
  n40: {
    backgroundColor: "#fdf3fa",
  },
  captionTextStyle: {
    borderRadius: 6,
    fontSize: ".8rem",
    fontWeight: 600,
    textTransform: "uppercase",
    padding: "5px 5px",
    lineHeight: 1,
    whiteSpace: "nowrap",
    verticalAlign: "middle",
    color: "#f307b5",
  },
  sideNoteStyle: {
    padding: 30,
  },
  sideNoteTitleStyle: {
    fontWeight: 600,
  },
  logoTextStyle: {
    fontSize: 32,
  },
  primaryAvatarStyle: {
    background: "linear-gradient(50deg, #0072ff 0%, #0089ffeb 100%)",
  },
  titleStyle: {
    fontSize: "3.5rem",
    lineHeight: 1.143,
    [theme.breakpoints.down("xs")]: {
      fontSize: 30,
    },
  },
  titleSecondaryStyle: {
    fontSize: "2.5rem",
    lineHeight: 1.843,
    [theme.breakpoints.down("xs")]: {
      fontSize: 30,
    },
  },
  iconStyle: {
    fontSize: 50,
  },
}));

export default useStyles;
