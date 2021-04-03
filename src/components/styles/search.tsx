import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  inputStyle: {
    flex: 1,
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      color: "#050505",
      fontSize: 15,
    },
  },
  searchIconStyle: {
    marginLeft: 5,
    marginRight: 5,
    fontSize: 20,
  },
  searchRootStyle: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#f6f6f7",
    color: "#606770",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
  },
  titleStyle: {
    color: "#aaafbf",
  },
}));

export default useStyles;
