import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('isEmpty', function() {
  it('should return true for an empty string', function() {
    expect(v.isEmpty('')).toBe(true);
  });

  it('should return true for an undefined', function() {
    expect(v.isEmpty(undefined)).toBe(true);
    expect(v.isEmpty()).toBe(true);
  });

  it('should return true for a null', function() {
    expect(v.isEmpty(null)).toBe(true);
  });

  it('should return false for a non empty string', function() {
    expect(v.isEmpty('Hello World!')).toBe(false);
    expect(v.isEmpty('a')).toBe(false);
    expect(v.isEmpty(' ')).toBe(false);
    expect(v.isEmpty(PRINTABLE_ASCII)).toBe(false);
  });

  it('should return false for a non empty string representation of an object', function() {
    expect(v.isEmpty(['Hello world'])).toBe(false);
    expect(
      v.isEmpty({
        toString: function() {
          return ' ';
        },
      })
    ).toBe(false);
  });

  it('should return false for a boolean', function() {
    expect(v.isEmpty(true)).toBe(false);
    expect(v.isEmpty(false)).toBe(false);
  });

  it('should return false for a number', function() {
    expect(v.isEmpty(0)).toBe(false);
    expect(v.isEmpty(100)).toBe(false);
    expect(v.isEmpty(-1.5)).toBe(false);
  });
});
