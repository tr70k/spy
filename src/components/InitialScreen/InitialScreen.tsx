import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  PLAYERS_COUNT_MAX,
  PLAYERS_COUNT_MIN,
  PLAYERS_COUNT_STEP,
  TIME_FOR_ROUND_MAX,
  TIME_FOR_ROUND_MIN,
  TIME_FOR_ROUND_STEP,
  useGame
} from '../../GameContext';
import { Typography, Slider, Button, styled, css } from '@mui/material';

const LangWrapper = styled('div')(
  ({ theme }) => css`
    display: flex;
    gap: ${theme.spacing(1)};
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: ${theme.spacing(1.5)};
  `,
);

const LangButtonsWrapper = styled('div')(
  ({ theme }) => css`
    display: flex;
    gap: ${theme.spacing(1)};
  `,
);

const LangButtonStyled = styled(Button)(
  ({ theme }) => css`
    &.MuiButtonBase-root {
      width: ${theme.spacing(5)};
      min-width: ${theme.spacing(5)};
      font-size: 20px;
      padding: 0;
    }
  `,
);

type LangButtonProps = {
  lang: string
  flag: string
}

// const langs = ['en', 'uk', 'ru']

const LangButton = ({ lang, flag }: LangButtonProps) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language ?? 'en';

  return <LangButtonStyled
    variant={currentLang === lang ? 'contained' : undefined}
    onClick={() => i18n.changeLanguage(lang)}
    size="small"
  >
    {flag}
  </LangButtonStyled>;
};

export const InitialScreen = () => {
  const game = useGame();
  const { t } = useTranslation();

  return <>
    <div>
      <Typography variant="h5" mb={2}>{t('initialScreen.gameSettings')}:</Typography>
      <LangWrapper>
        <Typography variant="h6">{t('initialScreen.language')}:</Typography>
        <LangButtonsWrapper>
          <LangButton lang="en" flag="🇺🇸" />
          <LangButton lang="uk" flag="🇺🇦" />
          <LangButton lang="ru" flag="🇷🇺" />
        </LangButtonsWrapper>
      </LangWrapper>
      <Typography variant="h6">{t('initialScreen.playersCount')}: {game.playersCount}</Typography>
      <Slider
        value={game.playersCount}
        onChange={(e, value) => game.changePlayersCount(Number(value))}
        step={PLAYERS_COUNT_STEP}
        min={PLAYERS_COUNT_MIN}
        max={PLAYERS_COUNT_MAX}
      />
      <Typography variant="h6" mt={1}>
        {t('initialScreen.timeForRound')}: {game.timeForRound} {t('initialScreen.min')}
      </Typography>
      <Slider
        value={game.timeForRound}
        onChange={(e, value) => game.changeTimeForRound(Number(value))}
        step={TIME_FOR_ROUND_STEP}
        min={TIME_FOR_ROUND_MIN}
        max={TIME_FOR_ROUND_MAX}
      />
    </div>
    <div>
      <Button variant="contained" onClick={game.next} fullWidth>
        {t('initialScreen.startGame')}
      </Button>
    </div>
  </>;
};
