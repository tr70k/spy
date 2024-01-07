import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography, Button } from '@mui/material';
import { useGame } from '../../GameContext';
import { getLocationName } from '../../utils';

export const StartScreen = () => {
  const game = useGame();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language ?? 'en';
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0);
  const [isHidden, setIsHidden] = useState<boolean>(true);

  const handleNext = () => {
    if (isHidden) {
      setIsHidden(false);
    } else {
      setIsHidden(true);
      if (currentPlayerIndex >= game.playersCount - 1) {
        game.next();
      } else {
        setCurrentPlayerIndex(currentPlayerIndex + 1);
      }
    }
  };

  return <>
    <div>
      <Typography variant="h5" mb={2}>{t('startScreen.player')} {currentPlayerIndex + 1}</Typography>
      {isHidden ? (
        <Typography variant="h6">{t('startScreen.clickShow')}</Typography>
      )
        : (
          game.spyPlayerIndex === currentPlayerIndex ?
            <Typography variant="h6">{t('startScreen.youAreSpy')}</Typography> :
            <Typography variant="h6">
              {t('startScreen.location')}: {getLocationName(game.locations[game.currentLocationIndex], currentLang)}
            </Typography>
        )}
    </div>
    <Button variant="contained" onClick={handleNext} fullWidth>
      {isHidden ? t('startScreen.show') : t('startScreen.nextPlayer')}
    </Button>
  </>;
};
