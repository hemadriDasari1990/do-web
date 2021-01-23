import { colors } from '@material-ui/core'

const white = '#FFFFFF'

const palette = {
  default: {
    contrastText: "#3e3e52",
    dark: "#3e3e52",
    main: "#3e3e52",
    light: "#3e3e52",
  },
  primary: {
    contrastText: white,
    dark: '#0072ff',
    main: '#0072ff',
    light: '#0072ff',
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
    default: '#fff',
    paper: white,
  },
  divider: colors.grey[200]
}

export default palette;
