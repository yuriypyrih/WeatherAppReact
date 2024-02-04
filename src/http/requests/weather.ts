import { getRequest } from '../index.ts';
import { Units } from '../../types/units.ts';

export const getWeatherRequest = (lat: number, lon: number, units: Units) => {
  return getRequest(`/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts}&units=${units}`);
};
