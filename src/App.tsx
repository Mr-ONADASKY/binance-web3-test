import { Container, CssBaseline, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Paper>
          <Typography variant="h1">Hello world!</Typography>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default App;
