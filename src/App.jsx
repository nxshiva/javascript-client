import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { theme } from './theme';
import { CalculatorDemo } from './pages/index';

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Typography>
          <CalculatorDemo />
        </Typography>
      </ThemeProvider>
    </div>
  );
}

export default App;
