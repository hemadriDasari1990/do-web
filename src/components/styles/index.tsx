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
  boxTopGridStyle: {
    height: 100,
    background:
      "linear-gradient(270deg, rgb(82, 67, 170), rgb(237, 80, 180)) no-repeat",
  },
  boxGridStyle: {
    padding: "2rem 1rem",
    position: "relative",
  },
  iconBoxStyle: {
    backgroundColor: "rgb(255, 255, 255)",
    backgroundImage:
      "url(https://images.ctfassets.net/rz1oowkt5gyp/6BxNFw17kxuj7w8JU9vpQC/3d75f49…/Tour-TemplateIcon-Trello-SVG.svg)",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    border: "3px solid rgb(255, 255, 255)",
    borderRadius: "0.5rem",
    height: "3rem",
    left: "1rem",
    position: "absolute",
    top: "-1.5rem",
    width: "3rem",
  },
  boxMainStyle: {
    borderRadius: "0.5rem",
    boxShadow: "rgb(9 30 66 / 15%) 0px 0.5rem 1rem 0px",
    color: "inherit",
    display: "block",
    height: "100%",
    overflow: "hidden",
    textAlign: "left",
    textDecoration: "none",
  },
  boxTitleStyle: {
    fontSize: "1.5rem",
    lineHeight: "1.33333",
  },
  descriptionStyle: {
    fontSize: "1rem",
    margin: "0.5rem 0px 0px",
  },
}));

export default useStyles;
