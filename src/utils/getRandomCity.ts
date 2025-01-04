import {CitiesList} from '../const.ts';
import {City} from '../types/city.ts';

export const getRandomCity = (): City => {
  const randomIndex = Math.floor(Math.random() * CitiesList.length);
  return CitiesList[randomIndex];
};
