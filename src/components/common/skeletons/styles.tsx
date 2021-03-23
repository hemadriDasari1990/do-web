import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  cardHeaderStyle: {},
  cardStyle: {
    boxShadow: "0 3rem 6rem rgba(0, 0, 0, .1)",
  },
  lineStyle: {
    background:
      "linear-gradient(270deg, rgb(82, 67, 170), rgb(237, 80, 180)) no-repeat",
    marginBottom: 6,
  },
  countTextStyle: {
    textAlign: "center",
  },
  countStyle: {
    backgroundColor: "unset",
    border: "2px solid  #1e1e58",
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
