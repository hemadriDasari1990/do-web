import { colors } from "@material-ui/core";

const white = "#FFFFFF";

const palette = {
  default: {
    contrastText: "#5b6886",
    dark: "#5b6886",
    main: "#5b6886",
    light: "#5b6886",
  },
  primary: {
    contrastText: white,
    dark: "#172b4d",
    main: "#172b4d",
    light: "#172b4d",
  },
  secondary: {
    contrastText: white,
    dark: white,
    main: white,
    light: white,
  },
  success: {
    contrastText: white,
    dark: colors.green[900],
    main: colors.green[600],
    light: colors.green[400],
  },
  info: {
    contrastText: white,
    dark: colors.blue[900],
    main: colors.blue[600],
    light: colors.blue[400],
  },
  warning: {
    contrastText: white,
    dark: colors.orange[900],
    main: colors.orange[600],
    light: colors.orange[400],
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400],
  },
  background: {
    default: "#fff",
    paper: white,
  },
  divider: colors.grey[200],
};

export default palette;
