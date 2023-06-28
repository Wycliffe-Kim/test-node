type MapCoord = {
  lng: number;
  lat: number;
};

const isValid = (coord: object) => {
  if (!('lng' in coord && 'lat' in coord)) {
    return false;
  }

  const _coord = coord as MapCoord;

  return (
    typeof _coord.lng === 'number' &&
    typeof _coord.lat === 'number' &&
    _coord.lng >= -180 &&
    _coord.lng <= 180 &&
    _coord.lat >= -90 &&
    _coord.lat <= 90
  );
};

const isValidMapCoordString = (mapCoordString: string): boolean => {
  const splittedValues = mapCoordString.replace(/[\s\\(\\)]/g, '').split(',');

  console.log(splittedValues);

  if (splittedValues.length !== 2) {
    return false;
  }

  const [lngString, latString] = splittedValues;

  if (
    isNaN(Number(lngString)) ||
    lngString.length === 0 ||
    isNaN(Number(latString)) ||
    latString.length === 0
  ) {
    return false;
  }

  return isValid({
    lng: Number(lngString),
    lat: Number(latString),
  });
};

export const stringToNumberCase = () => {
  console.log('----- stringToNumberCase -----');

  const mapCoordString = '(35.681236, -99)';

  console.log(isValidMapCoordString(mapCoordString));
};
