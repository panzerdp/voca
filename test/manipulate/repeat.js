import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('repeat', function() {
  it('should repeat a string', function() {
    expect(v.repeat('paradise', 2)).toBe('paradiseparadise');
    expect(v.repeat('w', 3)).toBe('www');
    expect(v.repeat('the world is yours', 1)).toBe('the world is yours');
    expect(v.repeat('', 10)).toBe('');
    expect(v.repeat(PRINTABLE_ASCII, 2)).toBe(PRINTABLE_ASCII + PRINTABLE_ASCII);
  });

  it('should return an empty string for 0 repeat times', function() {
    expect(v.repeat('the world is yours', 0)).toBe('');
    expect(v.repeat('', 0)).toBe('');
  });

  it('should return the same string when the number of times is null or undefined', function() {
    expect(v.repeat('the world is yours')).toBe('the world is yours');
    expect(v.repeat('the world is yours', null)).toBe('the world is yours');
    expect(v.repeat('the world is yours', undefined)).toBe('the world is yours');
  });

  it('should repeat a number', function() {
    expect(v.repeat(123, 2)).toBe('123123');
    expect(v.repeat(0, 5)).toBe('00000');
    expect(v.repeat(-1.5, 2)).toBe('-1.5-1.5');
  });

  it('should repeat a string representation of an object', function() {
    expect(v.repeat(['paradise'], 2)).toBe('paradiseparadise');
    expect(
      v.repeat(
        {
          toString: function() {
            return 'Tony';
          },
        },
        2
      )
    ).toBe('TonyTony');
  });

  it('should return an empty string for null or undefined string to be repeated', function() {
    expect(v.repeat()).toBe('');
    expect(v.repeat(null)).toBe('');
    expect(v.repeat(undefined)).toBe('');
    expect(v.repeat(undefined, 10)).toBe('');
  });
});
