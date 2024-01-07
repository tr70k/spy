import React from 'react';
import {
  PLAYERS_COUNT_MAX,
  PLAYERS_COUNT_MIN,
  PLAYERS_COUNT_STEP,
  TIME_FOR_ROUND_MAX,
  TIME_FOR_ROUND_MIN,
  TIME_FOR_ROUND_STEP,
  useGame
} from '../../GameContext';
import { Typography, Slider, Button } from '@mui/material';

export const InitialScreen = () => {
  const game = useGame();

  return <>
    <div>
      <Typography variant="h5" mb={2}>Game settings:</Typography>
      <Typography variant="h6">Players count: {game.playersCount}</Typography>
      <Slider
        value={game.playersCount}
        onChange={(e, value) => game.changePlayersCount(Number(value))}
        step={PLAYERS_COUNT_STEP}
        min={PLAYERS_COUNT_MIN}
        max={PLAYERS_COUNT_MAX}
      />
      <Typography variant="h6" mt={1}>Time for round: {game.timeForRound} min</Typography>
      <Slider
        value={game.timeForRound}
        onChange={(e, value) => game.changeTimeForRound(Number(value))}
        step={TIME_FOR_ROUND_STEP}
        min={TIME_FOR_ROUND_MIN}
        max={TIME_FOR_ROUND_MAX}
      />
    </div>
    <div>
      <Button variant="contained" onClick={game.next} fullWidth>Start game</Button>
    </div>
  </>;
};
