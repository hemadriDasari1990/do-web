import { Theme, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minHeight: "100%",
  },
  buttonStyle: {
    textAlign: "end",
  },
  gettingStartedBanner: {
    minHeight: 300,
    borderRadius: 6,
    padding: "20px 10px",
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
  disagreeIconStyle: {
    background: "linear-gradient(90deg, #4e0eea 0%, #b400ff 100%)",
  },
  highlightIconStyle: {
    background: "linear-gradient(50deg, #00ff37 0%, #0072ffeb 100%)",
  },
  loveIconStyle: {
    background: "linear-gradient(50deg, #ea087b 0%, #ff5656 100%)",
  },
  plusIconStyle: {
    background: "linear-gradient(50deg, #57f 0%, #0089ffeb 100%)",
  },
  deserveIconStyle: {
    background: "linear-gradient(50deg, #ffc800 0%, #ff0000ba 100%)",
  },
  reactionStyle: {
    fontSize: 12,
  },
  boxTopGridStyle: {
    height: 100,
    background: "linear-gradient(180deg,#7997ff 0,#57f 100%)",
  },
  boxGridStyle: {
    background: "linear-gradient(180deg,#7997ff 0,#57f 100%)",
    marginBottom: 10,
    borderRadius: 16,
  },
  containerStyle: {
    backgroundColor: "#f0f8ff",
    borderRadius: 16,
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
    background: "linear-gradient(180deg,#7997ff 0,#57f 100%)",
    width: 23,
    height: 23,
  },
  n30: {
    backgroundColor: "#22303e14",
  },
  n40: {
    backgroundColor: "#0072ff14",
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
    color: "#57f",
  },
  sideNoteStyle: {
    padding: 30,
  },
  sideNoteTitleStyle: {
    fontWeight: 600,
  },
  logoTextStyle: {
    fontSize: 28,
    fontWeight: 600,
  },
  primaryAvatarStyle: {
    background: "linear-gradient(50deg, #57f 0%, #0089ffeb 100%)",
  },
  titleStyle: {
    lineHeight: 1.143,
  },
  iconStyle: {
    fontSize: 50,
  },
  bannerStyle: {
    backgroundColor: "#232F3E",
    backgroundSize: "cover",
    backgroundImage: `url(${process.env.PUBLIC_URL}/home-page-banner.png)`,
  },
  textSecondaryColor: {
    color: "#57f",
  },
  bottomStyle: {
    position: "fixed",
    bottom: 0,
  },
  titleBoxStyle: {
    borderRadius: 6,
    padding: "0px 15px",
    height: 35,
    alignItems: "center",
    display: "flex",
    backgroundColor: "#EBECF0",
  },
  breakText: {
    whiteSpace: "initial",
    display: "block",
    margin: 0,
    wordWrap: "break-word",
  },
  avatarStyle: {
    width: "30px !important",
    height: "30px !important",
    backgroundColor: "#0072ff14",
  },
  smallAvatarStyle: {
    width: "30px !important",
    height: "30px !important",
  },
  avatar2Style: {
    width: 30,
    height: 30,
    backgroundColor: "#57f",
  },
  userdelineStyle: {
    textDecoration: "underline",
    fontWeight: 500,
  },
  nameStyle: {
    fontWeight: 700,
  },
  actionStyle: {
    fontWeight: 400,
    fontSize: 14,
  },
  customBadge: {
    top: "90% !important",
    background: "unset",
    border: "unset",
  },
  dotBannerStyle: {
    background:
      "url(https://clickup.com/landing/images/v2/dots.svg) repeat top center/auto",
    maxWidth: 1600,
    margin: "auto",
    position: "relative",
  },
  tourStyle: {
    maxWidth: "500px !important",
  },
  alignCenterStyle: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  },
  createAccountStyle: {
    padding: "5rem 0px 5rem 5rem !important",
    [theme.breakpoints.down("xs")]: {
      padding: "3rem 3rem 3rem 3rem !important",
    },
  },
}));

export default useStyles;
