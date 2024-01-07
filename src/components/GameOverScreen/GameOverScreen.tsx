import React from 'react';
import { Button, Typography } from '@mui/material';
import { useGame } from '../../GameContext';

export const GameOverScreen = () => {
  const game = useGame();

  return <>
    <Typography variant="h5">List of locations is over :(</Typography>
    <Button variant="contained" onClick={game.next}>Restart game</Button>
  </>;
};
