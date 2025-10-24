import { linearstep } from './linearstep';

describe('linearstep', () => {
  it('should return 0 when t is at the start (a)', () => {
    expect(linearstep(0, 10, 0)).toBe(0);
    expect(linearstep(5, 15, 5)).toBe(0);
  });

  it('should return 1 when t is at the end (b)', () => {
    expect(linearstep(0, 10, 10)).toBe(1);
    expect(linearstep(5, 15, 15)).toBe(1);
  });

  it('should return 0.5 when t is in the middle', () => {
    expect(linearstep(0, 10, 5)).toBe(0.5);
    expect(linearstep(10, 20, 15)).toBe(0.5);
  });

  it('should interpolate linearly between a and b', () => {
    expect(linearstep(0, 100, 25)).toBe(0.25);
    expect(linearstep(0, 100, 75)).toBe(0.75);
    expect(linearstep(10, 20, 12)).toBe(0.2);
    expect(linearstep(10, 20, 18)).toBe(0.8);
  });

  it('should clamp to 0 when t is before a', () => {
    expect(linearstep(10, 20, 5)).toBe(0);
    expect(linearstep(0, 10, -5)).toBe(0);
  });

  it('should clamp to 1 when t is after b', () => {
    expect(linearstep(10, 20, 25)).toBe(1);
    expect(linearstep(0, 10, 15)).toBe(1);
  });

  it('should handle negative ranges', () => {
    expect(linearstep(-10, 0, -5)).toBe(0.5);
    expect(linearstep(-20, -10, -15)).toBe(0.5);
  });

  it('should handle reversed ranges (when a > b)', () => {
    // When a > b, the division will be negative
    // saturate will clamp the result
    const result = linearstep(10, 0, 5);
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(1);
  });

  it('should return NaN when a equals b', () => {
    // When a === b, we get division by zero (0/0 = NaN)
    const result = linearstep(5, 5, 5);
    expect(result).toBeNaN();
  });

  it('should handle decimal values', () => {
    expect(linearstep(0.0, 1.0, 0.25)).toBe(0.25);
    expect(linearstep(0.0, 1.0, 0.75)).toBe(0.75);
    expect(linearstep(1.5, 2.5, 2.0)).toBe(0.5);
  });
});
