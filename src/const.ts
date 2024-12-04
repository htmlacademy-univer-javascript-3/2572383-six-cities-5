import {City} from './types/city.ts';

export const URL_PIN_DEFAULT = 'img/pin.svg';

export const URL_PIN_ACTIVE = 'img/pin-active.svg';

export const AmsterdamCity: City = {
  location: {
    latitude: 52.3909553943508,
    zoom: 20,
    longitude: 4.85309666406198
  },
  name: 'Amsterdam',
} as const;


export const ParisCity: City = {
  location: {
    latitude: 48.864716,
    zoom: 20,
    longitude: 2.349014
  },
  name: 'Paris',
};

export const CologneCity: City = {
  location: {
    latitude: 50.937531,
    zoom: 20,
    longitude: 6.960279
  },
  name: 'Cologne',
} as const;

export const BrusselsCity: City = {
  location: {
    latitude: 50.85045,
    zoom: 20,
    longitude: 4.34878
  },
  name: 'Brussels',
} as const;

export const HamburgCity: City = {
  location: {
    zoom: 20,
    latitude: 53.551086,
    longitude: 9.993682
  },
  name: 'Hamburg',
} as const;

export const DusseldorfCity: City = {
  location: {
    zoom: 20,
    latitude: 51.227741,
    longitude: 6.773456
  },
  name: 'Dusseldorf',
} as const;

export const CitiesList = [ParisCity, CologneCity, BrusselsCity, AmsterdamCity, HamburgCity, DusseldorfCity] as const;
