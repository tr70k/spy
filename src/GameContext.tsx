import React, { createContext, FC, ReactNode, useCallback, useContext, useState } from 'react';
import { LOCATIONS, Location } from './constants';
import shuffle from 'lodash/shuffle';
import random from 'lodash/random';

export const PLAYERS_COUNT_MIN = 3;
export const PLAYERS_COUNT_MAX = 8;
export const PLAYERS_COUNT_STEP = 1;
export const PLAYERS_COUNT_DEFAULT = 4;

export const TIME_FOR_ROUND_MIN = 1;
export const TIME_FOR_ROUND_MAX = 10;
export const TIME_FOR_ROUND_STEP = 1;
export const TIME_FOR_ROUND_DEFAULT = 4;

export type ValueOf<T> = T[keyof T];

export const STATUSES = {
  INITIAL: 'INITIAL',
  START: 'START',
  TIMER: 'TIMER',
  RESULT: 'RESULT',
  GAME_OVER: 'GAME_OVER',
} as const;

export type Status = ValueOf<typeof STATUSES>;

type GameContextType = {
  status: Status
  next: () => void
  timeForRound: number
  changeTimeForRound: (timeForRound: number) => void
  playersCount: number
  changePlayersCount: (playersCount: number) => void
  spyPlayerIndex: number,
  locations: Location[]
  currentLocationIndex: number
}

export const GameContext = createContext<GameContextType>({
  status: STATUSES.INITIAL,
  next: () => void 0,
  timeForRound: 0,
  changeTimeForRound: () => void 0,
  playersCount: 0,
  changePlayersCount: () => void 0,
  spyPlayerIndex: 0,
  locations: [],
  currentLocationIndex: 0,
});

type GameProviderProps = {
  children: ReactNode
}

export const GameProvider: FC<GameProviderProps> = ({ children }) => {
  const [status, setStatus] = useState<Status>(STATUSES.INITIAL);
  const [timeForRound, setTimeForRound] = useState<number>(TIME_FOR_ROUND_DEFAULT);
  const [playersCount, setPlayersCount] = useState<number>(PLAYERS_COUNT_DEFAULT);
  const [spyPlayerIndex, setSpyPlayerIndex] = useState<number>(0);
  const [locations] = useState<Location[]>(() => shuffle(LOCATIONS));
  const [currentLocationIndex, setCurrentLocationIndex] = useState<number>(0);

  const next = useCallback(() => {
    if (status === STATUSES.INITIAL) {
      setSpyPlayerIndex(random(playersCount - 1));
      setStatus(STATUSES.START);
      return;
    }

    if (status === STATUSES.START) {
      setStatus(STATUSES.TIMER);
      return;
    }

    if (status === STATUSES.TIMER) {
      setStatus(STATUSES.RESULT);
      return;
    }

    if (status === STATUSES.RESULT) {
      if (currentLocationIndex >= locations.length - 1) {
        setStatus(STATUSES.GAME_OVER);
        return;
      }

      setSpyPlayerIndex(random(playersCount - 1));
      setCurrentLocationIndex(currentLocationIndex + 1);
      setStatus(STATUSES.START);
      return;
    }
  }, [status, playersCount, locations, currentLocationIndex]);

  const changePlayersCount = useCallback((playersCount: number) => {
    setPlayersCount(Math.max(Math.min(Math.round(playersCount), PLAYERS_COUNT_MAX), PLAYERS_COUNT_MIN));
  }, []);

  const changeTimeForRound = useCallback((timeForRound: number) => {
    setTimeForRound(Math.max(Math.min(Math.round(timeForRound), TIME_FOR_ROUND_MAX), TIME_FOR_ROUND_MIN));
  }, []);

  return (
    <GameContext.Provider
      value={{
        status,
        next,
        timeForRound,
        changeTimeForRound,
        playersCount,
        changePlayersCount,
        spyPlayerIndex,
        locations,
        currentLocationIndex
      }}>
      {children}
    </GameContext.Provider>
  );
};

export function useGame() {
  return useContext(GameContext);
}
