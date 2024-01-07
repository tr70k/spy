import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Typography } from '@mui/material';
import { useGame } from '../../GameContext';

export const GameOverScreen = () => {
  const game = useGame();
  const { t } = useTranslation();

  return <>
    <Typography variant="h5">{t('gameOverScreen.listIsOver')}</Typography>
    <Button variant="contained" onClick={game.next}>{t('gameOverScreen.restartGame')}</Button>
  </>;
};
