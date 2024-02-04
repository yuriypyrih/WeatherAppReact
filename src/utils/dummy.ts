export const dummyFavorites: [number, number][] = [
  [52.5170365, 13.3888599],
  [37.9839412, 23.7283052],
  [40.7127281, -74.0060152],
  [35.6938097, 139.7532163],
];

export const getDummyArray = () => {
  const dummyArray: number[] = [];
  dummyFavorites.forEach((favorite) => dummyArray.push(...favorite));
  return dummyArray;
};
