import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  cardHeaderStyle: {},
  cardStyle: {
    boxShadow: "0 3rem 6rem rgba(0, 0, 0, .1)",
  },
  lineStyle: {
    background: "linear-gradient(180deg,#f67c1b 0,#e15500) ",
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
