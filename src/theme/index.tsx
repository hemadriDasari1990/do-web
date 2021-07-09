import createMuiTheme, {
  ThemeOptions,
} from "@material-ui/core/styles/createMuiTheme";

import overrides from "./overrides";
import palette from "./palette";

const theme = createMuiTheme({
  palette,
  overrides,
  zIndex: {
    appBar: 1200,
    drawer: 1100,
  },
} as ThemeOptions);

export default theme;
