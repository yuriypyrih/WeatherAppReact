import { getRequest } from '../index.ts';

export const getLocations = (search: string, limit: number = 5) => {
  return getRequest(`/geo/1.0/direct?q="${search}"&limit=${limit}`);
};

export const getLocation = (args: { lat: number; lon: number }) => {
  return getRequest(`/geo/1.0/reverse?lat=${args.lat}&lon=${args.lon}&limit=1`);
};
