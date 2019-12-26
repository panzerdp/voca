import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('first', function() {
  it('should return the first part of a string', function() {
    expect(v.first('Good day', -1)).toBe('');
    expect(v.first('Good day', 0)).toBe('');
    expect(v.first('Good day', 4)).toBe('Good');
    expect(v.first('Good day', 1)).toBe('G');
    expect(v.first('Good day', 8)).toBe('Good day');
    expect(v.first('Good day', 1000)).toBe('Good day');
    expect(v.first('Good day')).toBe('G');
    expect(v.first('', 5)).toBe('');
    expect(v.first('', 0)).toBe('');
    expect(v.first('')).toBe('');
    expect(v.first(PRINTABLE_ASCII, PRINTABLE_ASCII.length)).toBe(PRINTABLE_ASCII);
    expect(v.first(PRINTABLE_ASCII, 1)).toBe(PRINTABLE_ASCII[0]);
  });

  it('should return the first part of a string representation of an object', function() {
    expect(v.first(['Good evening'], 5)).toBe('Good ');
    expect(
      v.first(
        {
          toString: function() {
            return 'Morning';
          },
        },
        2
      )
    ).toBe('Mo');
  });

  it('should return an empty string for null or undefined', function() {
    expect(v.first()).toBe('');
    expect(v.first(undefined)).toBe('');
    expect(v.first(null)).toBe('');
    expect(v.first(null, null)).toBe('');
    expect(v.first(undefined, undefined)).toBe('');
  });
});
