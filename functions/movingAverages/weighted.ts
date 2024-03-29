import { isNumber, slice } from 'lodash';

export const weighted = (data: number[], size: number): number[] => {
  const length = data.length;

  if (size <= 1) {
    return slice(data);
  }

  if (size > length) {
    return Array(length);
  }

  const ret: number[] = [];
  const denominator = (size * (size + 1)) / 2;
  const prepare = size - 1;
  let sum = 0;
  let numerator = 0;
  let datum = 0;
  let i = 0;
  let real = -1;

  for (; i < prepare; i++) {
    datum = data[i];

    if (isNumber(datum)) {
      sum += datum;
      numerator += (i + 1) * datum;
    }
  }

  for (; i < length; i++, real++) {
    datum = data[i];

    if (isNumber(datum)) {
      sum += datum;
      numerator += size * datum;
    }

    if (real >= 0 && isNumber(data[real])) {
      sum -= data[real];
    }

    ret[i] = numerator / denominator;
    numerator -= sum;
  }

  return ret;
};
