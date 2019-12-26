import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('count', function() {
  it('should return the number of characters in a string', function() {
    expect(v.count('rain')).toBe(4);
    expect(v.count('')).toBe(0);
    expect(v.count('rainbow')).toBe(7);
    expect(v.count(PRINTABLE_ASCII)).toBe(PRINTABLE_ASCII.length);
  });

  it('should return the number of characters in a number', function() {
    expect(v.count(123)).toBe(3);
    expect(v.count(0)).toBe(1);
    expect(v.count(-1.5)).toBe(4);
  });

  it('should return the number of characters in a string representation of an object', function() {
    expect(v.count(['droplet'])).toBe(7);
    expect(
      v.count({
        toString: function() {
          return 'rainfall';
        },
      })
    ).toBe(8);
  });

  it('should return zero for undefined or null', function() {
    expect(v.count()).toBe(0);
    expect(v.count(null)).toBe(0);
    expect(v.count(undefined)).toBe(0);
  });
});
