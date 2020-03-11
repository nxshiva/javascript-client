import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme';
import { CalculatorDemo } from './pages/index';

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CalculatorDemo />
      </ThemeProvider>
    </div>
  );
}

export default App;
