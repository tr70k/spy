import React from 'react';
import { Typography, Button } from '@mui/material';
import { useGame } from '../../GameContext';
import { getLocationName } from '../../utils';

export const ResultScreen = () => {
  const game = useGame();

  return <>
    <div>
      <Typography variant="h5" mb={2}>Round result:</Typography>
      <Typography variant="h6" mb={1}>Location: {getLocationName(game.locations[game.currentLocationIndex])}</Typography>
      <Typography variant="h6">Player {game.spyPlayerIndex + 1} is a Spy!</Typography>
    </div>
    <Button variant="contained" onClick={game.next}>Next round</Button>
  </>;
};
