import "./socket";

import { MuiThemeProvider, makeStyles } from '@material-ui/core/styles'
import React, { Suspense } from 'react';

import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline'
import Routes from "./routes";
import Toolbar from '@material-ui/core/Toolbar';
import theme from './theme';

const Header = React.lazy(() => import("./components/Header"));
const ScrollTop = React.lazy(() => import("./components/ScrollTop"));
const Footer = React.lazy(() => import("./components/Footer"));

const useStyles = makeStyles(() => ({
  boxStyle: {
    backgroundColor: "inherit"
  }
}));

const App = () => {
  const { boxStyle } = useStyles();
  return (
    <Suspense fallback={<div></div>}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
          <Header />
          <Toolbar id="back-to-top-anchor" />
          <Box className={boxStyle}>
            <Routes />
          </Box>
        <ScrollTop />
        <Footer />
      </MuiThemeProvider>
    </Suspense>
  );
}

export default App;
