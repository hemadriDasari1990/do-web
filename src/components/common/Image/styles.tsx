import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  loader: {
    transform: "opacity 1s ease-out",
    opacity: 1,
  },
  placeholderStyle: {
    opacity: 1,
    filter: "blur(10px)",
    transition: "opacity 1s ease-out",
    position: "absolute",
  },
  placeholderLoader: {
    opacity: 0,
  },
  imageContainer: {
    overflow: "hidden",
  },
  imageStyle: {
    // position: "absolute",
    // width: "100%",
    // height: "100%",
    // opacity: 0,
  },
}));

export default useStyles;
