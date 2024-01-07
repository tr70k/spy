import { Location } from './constants';

export const getLocationName = (location: Location, lang: string): string => {
  switch (lang) {
  case 'en':
    return location.name.english;
  case 'uk':
    return location.name.ukrainian;
  case 'ru':
    return location.name.russian;
  }

  return location.name.english;
};
