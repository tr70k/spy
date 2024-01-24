import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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
    min-height: 400px;
    min-width: 360px;
    padding: ${theme.spacing(2)};
    display: flex;
    align-items: center;
    justify-content: center;
  `,
);

const Content = styled(Paper)(
  ({ theme }) => css`
    height: 360px;
    width: 350px;
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
  const { t, i18n } = useTranslation();

  useEffect(() => { document.title = t('gameSpyByTr70k'); }, [i18n.language]);

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
