import { isArray, isNumber, slice } from 'lodash';

export const dynamicWeighted = (
  data: number[],
  alpha: number | number[],
  noHead: boolean,
): number[] => {
  const length = data.length;

  const noArrayWeight = !isArray(alpha);

  if (noArrayWeight && alpha > 1) {
    return Array(length);
  }

  if (noArrayWeight && alpha === 1) {
    return slice(data);
  }
  const ret: number[] = [];

  let datum = 0;

  // period `i`
  let i = 0;

  // `s` is the value of the DWMA at any time period `i`
  let s = 0;

  // Handles head
  for (; i < length; i++) {
    datum = data[i];

    if (isNumber(datum) && (noArrayWeight || isNumber(datum))) {
      ret[i] = noHead ? 0 : datum;

      s = datum;
      i++;

      break;
    }
  }

  // Dynamic weights: an array of weights
  // Ref:
  // https://en.wikipedia.org/wiki/Moving_average#Exponential_moving_average
  // with a dynamic alpha
  if (!noArrayWeight) {
    for (; i < length; i++) {
      datum = data[i];

      isNumber(datum) && isNumber(alpha[i])
        ? (s = ret[i] = alpha[i] * datum + (1 - alpha[i]) * s)
        : (ret[i] = ret[i - 1]);
    }

    return ret;
  }

  const o = 1 - alpha;

  // Fixed alpha
  for (; i < length; i++) {
    datum = data[i];

    isNumber(datum)
      ? (s = ret[i] = alpha * datum + o * s)
      : (ret[i] = ret[i - 1]);
  }

  return ret;
};
