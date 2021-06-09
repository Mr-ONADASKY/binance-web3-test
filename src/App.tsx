import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import Home from './pages/home';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Home />
    </ThemeProvider>
  );
}

// Wrap everything in <Web3ReactProvider />
export default () => (
  <Web3ReactProvider getLibrary={(provider) => new Web3Provider(provider)}>
    <App />
  </Web3ReactProvider>
);
