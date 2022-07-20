import _ from 'lodash';
import { curry } from 'ramda';

export interface Point {
  x: number;
  y: number;
}

export namespace Point {
  export const nullValue = (): Point => ({ x: -1, y: -1 });

  export const isValid = (point: Point) => !_.isEqual(point, nullValue());

  export const isPoint = (point: any): point is Point =>
    'x' in point && 'y' in point;

  export const distance = (point1: Point, point2: Point) =>
    Math.sqrt(
      Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2)
    );

  export const plus = curry(
    (point1: Point, point2: Point): Point => ({
      x: point1.x + point2.x,
      y: point1.y + point2.y,
    })
  );

  export const minus = curry(
    (point1: Point, point2: Point): Point => ({
      x: point1.x - point2.x,
      y: point1.y - point2.y,
    })
  );

  export const toString = (point: Point) =>
    `${point.x.toFixed(0)}, ${point.y.toFixed(0)}`;

  export const fromString = (point: string): Point => {
    const pointData = point.replace(' ', '').split(',');
    return {
      x: parseInt(pointData[0]),
      y: parseInt(pointData[1]),
    };
  };
}
