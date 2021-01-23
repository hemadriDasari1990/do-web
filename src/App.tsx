import { MuiThemeProvider, withStyles } from '@material-ui/core/styles'
import React, { Component, Suspense, lazy } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline'
import logo from './logo.svg';

function App() {
  return (
    <Suspense fallback={<div></div>}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
      </MuiThemeProvider>
    </Suspense>
  );
}

export default App;
