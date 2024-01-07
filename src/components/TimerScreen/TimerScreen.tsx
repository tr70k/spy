import React, { useCallback, useEffect, useState } from 'react';
import { Typography, Button } from '@mui/material';
import { useGame } from '../../GameContext';

const getTimeString = (secondsLeft: number) => `${Math.floor(secondsLeft / 60)}:${secondsLeft % 60 < 10 ? '0' : ''}${secondsLeft % 60}`;

export const TimerScreen = () => {
  const game = useGame();
  const [secondsLeft, setSecondsLeft] = useState<number>(() => game.timeForRound * 60);

  const tick = useCallback((secondsLeft: number) => {
    if (secondsLeft > 0) {
      setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
        tick(secondsLeft - 1);
      }, 1000);
    }
  }, []);

  useEffect(() => {
    tick(secondsLeft);
  }, []);

  return <>
    <div>
      <Typography variant="h5" mb={2}>Time left: {getTimeString(secondsLeft)}</Typography>
      {!secondsLeft && (
        <Typography variant="h4" color="red">Time is over!</Typography>
      )}
    </div>
    <Button variant="contained" onClick={game.next}>Show result</Button>
  </>;
};
