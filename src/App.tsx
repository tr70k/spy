import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { GameProvider } from './GameContext';
import { Game } from './components/Game';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <GameProvider>
        <Game />
      </GameProvider>
    </ThemeProvider>
  );
}

export default App;
