import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography, Button } from '@mui/material';
import { useGame } from '../../GameContext';

const getTimeString = (secondsLeft: number) => `${Math.floor(secondsLeft / 60)}:${secondsLeft % 60 < 10 ? '0' : ''}${secondsLeft % 60}`;

export const TimerScreen = () => {
  const game = useGame();
  const { t } = useTranslation();
  const [secondsLeft, setSecondsLeft] = useState<number>(() => game.timeForRound * 60);

  const tick = useCallback((secondsLeft: number) => {
    if (secondsLeft > 0) {
      if (secondsLeft === 1) {
        (new Audio('/sound/timeout.mp3')).play();
      }

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
      <Typography variant="h5" mb={2}>{t('timerScreen.timeLeft')}: {getTimeString(secondsLeft)}</Typography>
      {secondsLeft ? (
        <Typography variant="h6">{t('timerScreen.askEachOther')}</Typography>
      ) : (
        <Typography variant="h4" color="red">{t('timerScreen.timeIsOver')}</Typography>
      )}
    </div>
    <Button variant="contained" onClick={game.next}>{t('timerScreen.showResult')}</Button>
  </>;
};
