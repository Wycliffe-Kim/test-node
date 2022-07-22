import _ from 'lodash';
import { Line } from './Line';
import { Point } from './Point';

describe('angle', () => {
  const origin: Point = { x: 0, y: 0 };

  it('45 degree', () => {
    expect(Line.angle({ point1: origin, point2: { x: 1, y: 1 } })).toBe(45);
  });

  it('-45 degree', () => {
    expect(Line.angle({ point1: origin, point2: { x: 1, y: -1 } })).toBe(-45);
  });

  it('90 degree', () => {
    expect(Line.angle({ point1: origin, point2: { x: 0, y: 1 } })).toBe(90);
  });

  it('-90 degree', () => {
    expect(Line.angle({ point1: origin, point2: { x: 0, y: -1 } })).toBe(-90);
  });

  it('135 degree', () => {
    expect(Line.angle({ point1: origin, point2: { x: -1, y: 1 } })).toBe(135);
  });

  it('-135 degree', () => {
    expect(Line.angle({ point1: origin, point2: { x: -1, y: -1 } })).toBe(-135);
  });

  it('180 degree', () => {
    expect(Line.angle({ point1: origin, point2: { x: -1, y: 0 } })).toBe(180);
  });
});

describe('includedAngle', () => {
  const origin: Point = { x: 0, y: 0 };
  const line1: Line = { point1: origin, point2: { x: 1, y: 1 } };

  it('0 degree', () => {
    const line2: Line = { point1: origin, point2: { x: 10, y: 10 } };
    expect(Line.includedAngle(line1, line2)).toBe(0);
  });

  it('45 degree', () => {
    const line2: Line = { point1: origin, point2: { x: 10, y: 0 } };
    expect(Line.includedAngle(line1, line2)).toBe(45);
  });

  it('90 degree', () => {
    const line2: Line = { point1: origin, point2: { x: -2, y: 2 } };
    expect(Line.includedAngle(line1, line2)).toBe(90);
  });

  it('135 degree', () => {
    const line2: Line = { point1: origin, point2: { x: -2, y: 0 } };
    expect(Line.includedAngle(line1, line2)).toBe(135);
  });

  it('180 degree', () => {
    const line2: Line = { point1: origin, point2: { x: -2, y: -2 } };
    expect(Line.includedAngle(line1, line2)).toBe(180);
  });

  it('270 degree', () => {
    const line1: Line = {
      point1: {
        x: 348,
        y: 245,
      },
      point2: {
        x: 143,
        y: 84,
      },
    };
    const line2: Line = {
      point1: {
        x: 326,
        y: 62,
      },
      point2: {
        x: 245.5,
        y: 164.5,
      },
    };
    expect(Line.includedAngle(line1, line2)).toBe(90);
  });
});

describe('rotated', () => {
  it('90 degree, ratio 1', () => {
    const line: Line = {
      point1: {
        x: 2,
        y: 4,
      },
      point2: {
        x: 4,
        y: 2,
      },
    };

    const rotated = Line.rotated(line, 1, 90);
    const equal = _.isEqual(rotated, {
      point1: {
        x: 2,
        y: 2,
      },
      point2: {
        x: 4,
        y: 4,
      },
    });
    expect(equal).toBe(true);
  });

  it('90 degree, ratio 0.5', () => {
    const line: Line = {
      point1: {
        x: 4,
        y: 2,
      },
      point2: {
        x: 2,
        y: 4,
      },
    };

    const rotated = Line.rotated(line, 0.5, 90);
    const equal = _.isEqual(rotated, {
      point1: {
        x: 3.5,
        y: 3.5,
      },
      point2: {
        x: 2.5,
        y: 2.5,
      },
    });
    expect(equal).toBe(true);
  });

  it('90 degree, ratio 1', () => {
    const line: Line = {
      point1: {
        x: -1,
        y: 1,
      },
      point2: {
        x: 1,
        y: -1,
      },
    };

    const rotated = Line.rotated(line, 1, 135);
    const result: Line = {
      point1: {
        x: -1,
        y: -1,
      },
      point2: {
        x: 1,
        y: 1,
      },
    };
    console.log(
      {
        point2: rotated.point1,
        point1: Line.center(rotated),
      },
      {
        point2: Line.center(result),
        point1: result.point2,
      }
    );
    const equal = _.isEqual(rotated, result);
    console.log(
      Line.includedAngle(
        {
          point2: rotated.point1,
          point1: Line.center(rotated),
        },
        {
          point2: result.point1,
          point1: Line.center(result),
        }
      )
    );
    console.log(
      Line.angle({
        point2: rotated.point1,
        point1: Line.center(rotated),
      }),
      Line.angle(result)
    );
    console.log(
      (Math.atan(
        Line.gradient({
          point2: rotated.point1,
          point1: Line.center(rotated),
        })
      ) *
        180) /
        Math.PI
    );
    expect(equal).toBe(true);
  });
});
