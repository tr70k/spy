import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography, Button } from '@mui/material';
import { useGame } from '../../GameContext';
import { getLocationName } from '../../utils';

export const ResultScreen = () => {
  const game = useGame();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language ?? 'en';

  return <>
    <div>
      <Typography variant="h5" mb={2}>{t('resultScreen.roundResult')}:</Typography>
      <Typography variant="h6" mb={1}>
        {t('resultScreen.location')}: {getLocationName(game.locations[game.currentLocationIndex], currentLang)}
      </Typography>
      <Typography variant="h6">{t('resultScreen.playerIsSpy', { spyIndex: game.spyPlayerIndex + 1 })}</Typography>
    </div>
    <Button variant="contained" onClick={game.next}>{t('resultScreen.nextRound')}</Button>
  </>;
};
