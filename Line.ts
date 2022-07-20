import _ from 'lodash';
import { curry } from 'ramda';
import { Point } from './Point';

export interface Line {
  point1: Point;
  point2: Point;
}

export namespace Line {
  export const nullValue = (): Line => ({
    point1: Point.nullValue(),
    point2: Point.nullValue(),
  });

  export const isValid = (line: Line) => !_.isEqual(line, nullValue());

  export const isLine = (line: any): line is Line =>
    'point1' in line && 'point2' in line;

  export const center = (line: Line): Point => ({
    x: centerX(line),
    y: centerY(line),
  });

  export const distance = (line: Line) =>
    Point.distance(line.point1, line.point2);

  export const gradient = (line: Line) =>
    (line.point2.y - line.point1.y) / (line.point2.x - line.point1.x);

  export const angle = (line: Line) => {
    const extractPoints = (line: Line) => ({
      x1: line.point1.x,
      y1: line.point1.y,
      x2: line.point2.x,
      y2: line.point2.y,
    });

    const caseWithBiggerX2 = (line: Line) =>
      (Math.atan(Line.gradient(line)) * 180) / Math.PI;

    const caseWithBiggerX1 = (line: Line) => {
      const { y1, y2 } = extractPoints(line);
      return y1 === y2
        ? 180
        : y2 > y1
        ? 90 - caseWithBiggerX2(line)
        : -90 - caseWithBiggerX2(line);
    };

    return line.point2.x >= line.point1.x
      ? caseWithBiggerX2(line)
      : caseWithBiggerX1(line);
  };

  export const centerX = (line: Line) =>
    line.point1.x + (line.point2.x - line.point1.x) / 2;

  export const centerY = (line: Line) =>
    line.point1.y + (line.point2.y - line.point1.y) / 2;

  export const plus = (line: Line, point: Point): Line => ({
    point1: Point.plus(line.point1, point),
    point2: Point.plus(line.point2, point),
  });

  export const minus = (line: Line, point: Point): Line => ({
    point1: Point.minus(line.point1, point),
    point2: Point.minus(line.point2, point),
  });

  /**
   * 주어진 선에 특정 각도 및 길이를 갖는 선을 반환하는 함수.
   * rotation matrix를 적용.
   * https://reminder-by-kwan.tistory.com/133 참고
   */
  export const rotated = (line: Line, radius: number, angle: number): Line => {
    const radian = (angle * Math.PI) / 180;

    const makePoint = curry(
      (
        radian: number,
        radius: number,
        centerPoint: Point,
        point: Point
      ): Point => ({
        x:
          radius * (point.x * Math.cos(radian) - point.y * Math.sin(radian)) +
          centerPoint.x,
        y:
          radius * (point.x * Math.sin(radian) + point.y * Math.cos(radian)) +
          centerPoint.y,
      })
    );

    const centerPoint = center(line);
    const { point1, point2 } = line;

    const _makePoint = makePoint(radian, radius, centerPoint);

    return {
      point1: _makePoint(point1),
      point2: _makePoint(point2),
    };
  };

  /**
   * 주어진 선에 직교하는 선을 반환하는 함수.
   * 대신 점이 함께 주어지면 그 점을 중심으로 직교하는 선을 만든다.
   * 길이는 `radius`이다.
   */
  export const normal = (line: Line, point: Point, radius: number): Line => {
    const m = gradient(line);
    const angle = Math.atan(m);

    const x1 = line.point1.x;
    const x2 = line.point2.x;

    const dx = radius * Math.sin(angle);
    const dy = radius * Math.cos(angle);

    return x2 > x1
      ? {
          point1: { x: point.x - dx, y: point.y + dy },
          point2: { x: point.x + dx, y: point.y - dy },
        }
      : {
          point1: { x: point.x + dx, y: point.y - dy },
          point2: { x: point.x - dx, y: point.y + dy },
        };
  };

  /**
   * 법선을 만들되, 중심점을 기준으로 선과 같은 길이로 만드는 함수
   */
  export const defaultNormal = (line: Line) =>
    normal(line, center(line), distance(line) / 2);

  export const arrow = (line: Line, sideLength: number = 10): Line => {
    const xc = centerX(line);
    const yc = centerY(line);
    const d = distance(line);
    const m = gradient(line);
    const angle = Math.atan(m);

    const x1 = line.point1.x;
    const x2 = line.point2.x;

    const dxt = ((d - Math.sqrt(3) * sideLength) * Math.cos(angle)) / 2;
    const dyt = ((d - Math.sqrt(3) * sideLength) * Math.sin(angle)) / 2;

    const xt = x2 >= x1 ? xc + dxt : xc - dxt;
    const yt = x2 >= x1 ? yc + dyt : yc - dyt;

    const dx = (sideLength * Math.sin(angle)) / 2;
    const dy = (sideLength * Math.cos(angle)) / 2;

    return {
      point1: { x: xt + dx, y: yt - dy },
      point2: { x: xt - dx, y: yt + dy },
    };
  };

  /**
   * 두 직선 사이의 끼인각을 반환하는 함수.
   * https://m.blog.naver.com/junhyuk7272/221222598677 참고.
   */
  export const includedAngle = (line1: Line, line2: Line) => {
    // const m1 = gradient(line1);
    // const m2 = gradient(line2);
    const angle1 = angle(line1);
    const angle2 = angle(line2);

    const _angle = Math.abs(angle1 - angle2);

    return _angle > 180 ? _angle - 180 : _angle;

    // console.log('includedAngle', angle1, angle2);

    // const isAcuteAngle = angle1 - angle2 >= 0 && angle1 - angle2 <= 90; // angle1 - angle2가 예각인가? (둔각의 경우 obtuse angle)
    // const absoluteAngle =
    //   (Math.atan((m1 - m2) / (1 + m1 * m2)) * 180) / Math.PI;

    // return angle1 === angle2
    //   ? 0
    //   : isAcuteAngle
    //   ? absoluteAngle
    //   : -1 * absoluteAngle;
  };
}
