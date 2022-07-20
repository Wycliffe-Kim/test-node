import { Line } from './Line';
import { Point } from './Point';

const origin: Point = {
  x: 0,
  y: 0,
};

const line1: Line = {
  point1: origin,
  point2: {
    x: 0,
    y: 10,
  },
};

const line2: Line = {
  point1: origin,
  point2: {
    x: 1,
    y: -1,
  },
};

console.log(Line.includedAngle(line1, line2));
