import React from 'react';
import { Paper, css, styled } from '@mui/material';
import { STATUSES, useGame } from '../../GameContext';
import { InitialScreen } from '../InitialScreen';
import { StartScreen } from '../StartScreen';
import { TimerScreen } from '../TimerScreen';
import { ResultScreen } from '../ResultScreen';
import { GameOverScreen } from '../GameOverScreen';

const Wrapper = styled('div')(
  ({ theme }) => css`
    height: 100dvh;
    width: 100%;
    padding: ${theme.spacing(2)};
    display: flex;
    align-items: center;
    justify-content: center;
  `,
);

const Content = styled(Paper)(
  ({ theme }) => css`
    height: 340px;
    width: 340px;
    max-height: 100%;
    max-width: 100%;
    padding: ${theme.spacing(3)};
    border-radius: ${theme.spacing(2)};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `,
);

export const Game = () => {
  const game = useGame();

  const getContent = () => {
    switch (game.status) {
    case STATUSES.INITIAL:
      return <InitialScreen />;
    case STATUSES.START:
      return <StartScreen />;
    case STATUSES.TIMER:
      return <TimerScreen />;
    case STATUSES.RESULT:
      return <ResultScreen />;
    case STATUSES.GAME_OVER:
      return <GameOverScreen />;
    }
  };

  return <Wrapper>
    <Content>
      {getContent()}
    </Content>
  </Wrapper>;
};
