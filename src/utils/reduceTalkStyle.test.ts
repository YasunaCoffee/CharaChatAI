import { reduceTalkStyle } from './reduceTalkStyle';

describe('reduceTalkStyle', () => {
  it('should return "talk" when input is "talk"', () => {
    expect(reduceTalkStyle('talk')).toBe('talk');
  });

  it('should return "happy" when input is "happy"', () => {
    expect(reduceTalkStyle('happy')).toBe('happy');
  });

  it('should return "sad" when input is "sad"', () => {
    expect(reduceTalkStyle('sad')).toBe('sad');
  });

  it('should return "talk" for unknown talk styles', () => {
    expect(reduceTalkStyle('angry')).toBe('talk');
    expect(reduceTalkStyle('relaxed')).toBe('talk');
    expect(reduceTalkStyle('neutral')).toBe('talk');
  });

  it('should return "talk" for empty string', () => {
    expect(reduceTalkStyle('')).toBe('talk');
  });

  it('should return "talk" for random strings', () => {
    expect(reduceTalkStyle('invalid')).toBe('talk');
    expect(reduceTalkStyle('123')).toBe('talk');
    expect(reduceTalkStyle('HAPPY')).toBe('talk'); // Case sensitive
  });
});
