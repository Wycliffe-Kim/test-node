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
    console.log(Line.angle(line1), Line.angle(line2));
    expect(Line.includedAngle(line1, line2)).toBe(90);
  });
});
