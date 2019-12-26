import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('last', function() {
  it('should return the last part of a string', function() {
    expect(v.last('Good day', -1)).toBe('');
    expect(v.last('Good day', 0)).toBe('');
    expect(v.last('Good day', 4)).toBe(' day');
    expect(v.last('Good day', 1)).toBe('y');
    expect(v.last('Good day', 8)).toBe('Good day');
    expect(v.last('Good day', 1000)).toBe('Good day');
    expect(v.last('Good day')).toBe('y');
    expect(v.last('', 5)).toBe('');
    expect(v.last('', 0)).toBe('');
    expect(v.last('')).toBe('');
    expect(v.last(PRINTABLE_ASCII, PRINTABLE_ASCII.length)).toBe(PRINTABLE_ASCII);
    expect(v.last(PRINTABLE_ASCII, 1)).toBe(PRINTABLE_ASCII[PRINTABLE_ASCII.length - 1]);
  });

  it('should return the last part of a string representation of an object', function() {
    expect(v.last(['Good evening'], 5)).toBe('ening');
    expect(
      v.last(
        {
          toString: function() {
            return 'Morning';
          },
        },
        2
      )
    ).toBe('ng');
  });

  it('should return an empty string for null or undefined', function() {
    expect(v.last()).toBe('');
    expect(v.last(undefined)).toBe('');
    expect(v.last(null)).toBe('');
    expect(v.last(null, null)).toBe('');
    expect(v.last(undefined, undefined)).toBe('');
  });
});
