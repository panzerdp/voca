import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('charAt', function() {
  it('should return the character by index', function() {
    expect(v.charAt('Good day', 0)).toBe('G');
    expect(v.charAt('Good day', 1)).toBe('o');
    expect(v.charAt('Good day', 7)).toBe('y');
    expect(v.charAt(PRINTABLE_ASCII, 0)).toBe(' ');
    expect(v.charAt('', 0)).toBe('');
    expect(v.charAt('Good day')).toBe('G');
    expect(v.charAt('Good day', undefined)).toBe('G');
    expect(v.charAt('Good day', null)).toBe('G');
    expect(v.charAt('Good day', NaN)).toBe('G');
  });

  it('should return an empty string for out of bounds index', function() {
    expect(v.charAt('Good day', -1)).toBe('');
    expect(v.charAt('Good day', 100)).toBe('');
  });

  it('should return the character by index of a string representation of an object', function() {
    expect(v.charAt(['Good evening'], 5)).toBe('e');
    expect(
      v.charAt(
        {
          toString: function() {
            return 'Morning';
          },
        },
        1
      )
    ).toBe('o');
  });

  it('should return an empty string for null or undefined', function() {
    expect(v.charAt()).toBe('');
    expect(v.charAt(undefined)).toBe('');
    expect(v.charAt(null)).toBe('');
    expect(v.charAt(null, null)).toBe('');
    expect(v.charAt(undefined, undefined)).toBe('');
  });
});
