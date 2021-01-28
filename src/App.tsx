import React, { Suspense } from 'react';

import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider } from '@material-ui/core/styles'
import Routes from "./routes";
import Toolbar from '@material-ui/core/Toolbar';
import theme from './theme';

const Header = React.lazy(() => import("./components/Header"));
const ScrollTop = React.lazy(() => import("./components/ScrollTop"));
const Footer = React.lazy(() => import("./components/Footer"));

const App = () => {
  return (
    <Suspense fallback={<div></div>}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
          <Header />
          <Toolbar id="back-to-top-anchor" />
          <Box m={5}>
            <Routes />
          </Box>
        <ScrollTop />
        <Footer />
      </MuiThemeProvider>
    </Suspense>
  );
}

export default App;
