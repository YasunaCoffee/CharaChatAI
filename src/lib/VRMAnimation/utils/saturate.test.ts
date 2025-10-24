import { saturate } from './saturate';

describe('saturate', () => {
  it('should clamp values between 0.0 and 1.0', () => {
    expect(saturate(0.5)).toBe(0.5);
    expect(saturate(0.0)).toBe(0.0);
    expect(saturate(1.0)).toBe(1.0);
  });

  it('should clamp negative values to 0.0', () => {
    expect(saturate(-0.1)).toBe(0.0);
    expect(saturate(-1.0)).toBe(0.0);
    expect(saturate(-100)).toBe(0.0);
  });

  it('should clamp values greater than 1.0 to 1.0', () => {
    expect(saturate(1.1)).toBe(1.0);
    expect(saturate(2.0)).toBe(1.0);
    expect(saturate(100)).toBe(1.0);
  });

  it('should handle edge cases', () => {
    expect(saturate(Number.POSITIVE_INFINITY)).toBe(1.0);
    expect(saturate(Number.NEGATIVE_INFINITY)).toBe(0.0);
  });

  it('should handle very small positive numbers', () => {
    expect(saturate(0.0001)).toBe(0.0001);
    expect(saturate(Number.EPSILON)).toBe(Number.EPSILON);
  });

  it('should handle numbers very close to boundaries', () => {
    expect(saturate(0.9999)).toBe(0.9999);
    expect(saturate(1.0001)).toBe(1.0);
    expect(saturate(-0.0001)).toBe(0.0);
  });
});
