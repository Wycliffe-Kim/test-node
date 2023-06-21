import { isNumber, reduce, slice } from 'lodash';

const sizeUndefinedCase = (data: number[]) => [
  reduce(data, (a, b) => a + b) / data.length,
];

const sizeLessThanOneCase = (data: number[]) => slice(data);

const sizeMoreThanLengthCase = (data: number[]): number[] => Array(data.length);

const sizeElseCase = (data: number[], size: number) => {
  const length = data.length;
  const prepare = size - 1;
  const ret: number[] = [];
  let sum = 0;
  let i = 0;
  let counter = 0;
  let datum = 0;

  for (; i < length && counter < prepare; i++) {
    datum = data[i];

    if (isNumber(datum)) {
      sum += datum;
      counter++;
    }
  }

  for (; i < length; i++) {
    datum = data[i];

    if (isNumber(datum)) {
      sum += datum;
    }

    if (isNumber(data[i - size])) {
      sum -= data[i - size];
    }

    ret[i] = sum / size;
  }

  return ret;
};

export const simple = (data: number[], size?: number) =>
  size
    ? size > 1
      ? size > data.length
        ? sizeMoreThanLengthCase(data)
        : sizeElseCase(data, size)
      : sizeLessThanOneCase(data)
    : sizeUndefinedCase(data);
