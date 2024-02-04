import { Location } from './location.ts';
import { Weather } from './weather.ts';

export type City = {
  location?: Location;
  weather?: Weather;
  favorite?: boolean;
};
