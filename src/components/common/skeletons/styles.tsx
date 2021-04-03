import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  cardHeaderStyle: {},
  cardStyle: {
    boxShadow: "0 3rem 6rem rgba(0, 0, 0, .1)",
  },
  lineStyle: {
    background: "linear-gradient(12deg,#c724b1,#c724b1 40%,#753bbd) ",
    marginBottom: 6,
  },
  countTextStyle: {
    textAlign: "center",
  },
  countStyle: {
    backgroundColor: "unset",
    border: "2px solid  #172b4d",
    borderRadius: 6,
  },
  contentStyle: {
    height: 70,
    borderRadius: 6,
    background:
      "linear-gradient(90deg, #e7eaec, rgb(230 235 239), transparent)",
  },
  contentColor: {
    background:
      "linear-gradient(90deg, #e7eaec, rgb(230 235 239), transparent)",
  },
}));

export default useStyles;
