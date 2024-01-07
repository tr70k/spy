import { Location } from './constants';

export type Lang = 'en' | 'ua' | 'ru'

export const getLocationName = (location: Location, lang: Lang = 'en'): string => {
  switch (lang) {
  case 'en':
    return location.name.english;
  case 'ua':
    return location.name.ukrainian;
  case 'ru':
    return location.name.russian;
  }

  return `${location.name.english} / ${location.name.ukrainian} / ${location.name.russian}`;
};
