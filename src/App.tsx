import "./socket";

import { MuiThemeProvider, makeStyles } from '@material-ui/core/styles'
import React, { Suspense } from 'react';

import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline'
import Routes from "./routes";
import theme from './theme';
import { useAuthenticated } from "./redux/state/common";

const Header = React.lazy(() => import("./components/Header"));
const ScrollTop = React.lazy(() => import("./components/ScrollTop"));
const Footer = React.lazy(() => import("./components/Footer"));

const useStyles = makeStyles(() => ({
  boxStyle: {
    // minHeight: "90vh"
  }
}));

const App = () => {
  const { boxStyle } = useStyles();
  const authenticated: boolean = useAuthenticated();
  
  return (
    <Suspense fallback={<div></div>}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
          <Header />
          <Box className={boxStyle}>
            <Box>
              <Routes />
              <ScrollTop />
            </Box>
          </Box>
        {!authenticated && <Footer />}
      </MuiThemeProvider>
    </Suspense>
  );
}

export default App;
