import React, { useState } from 'react';
import { Typography, Button } from '@mui/material';
import { useGame } from '../../GameContext';
import { getLocationName } from '../../utils';

export const StartScreen = () => {
  const game = useGame();
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
      <Typography variant="h5" mb={2}>Player {currentPlayerIndex + 1}</Typography>
      {isHidden ? (
        <Typography variant="h6">Click &quot;Show&quot; to see the location!</Typography>
      )
        : (
          game.spyPlayerIndex === currentPlayerIndex ?
            <Typography variant="h6">You are a Spy!</Typography> :
            <Typography variant="h6">Location: {getLocationName(game.locations[game.currentLocationIndex])}</Typography>
        )}
    </div>
    <Button variant="contained" onClick={handleNext} fullWidth>
      {isHidden ? 'Show' : 'Next'}
    </Button>
  </>;
};
