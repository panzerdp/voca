import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('isBlank', function() {
  it('should return false for a non empty string', function() {
    expect(v.isBlank('Hello World!')).toBe(false);
    expect(v.isBlank('a')).toBe(false);
    expect(v.isBlank(PRINTABLE_ASCII)).toBe(false);
  });

  it('should return false for a non empty string representation of an object', function() {
    expect(v.isBlank(['Hello world'])).toBe(false);
    expect(
      v.isBlank({
        toString: function() {
          return 'Welcome to New York';
        },
      })
    ).toBe(false);
  });

  it('should return false for a boolean', function() {
    expect(v.isBlank(true)).toBe(false);
    expect(v.isBlank(false)).toBe(false);
  });

  it('should return false for a number', function() {
    expect(v.isBlank(0)).toBe(false);
    expect(v.isBlank(100)).toBe(false);
    expect(v.isBlank(-1.5)).toBe(false);
  });

  it('should return true for an empty string', function() {
    expect(v.isBlank('')).toBe(true);
  });

  it('should return true for a string with whitespaces', function() {
    expect(v.isBlank(' ')).toBe(true);
    expect(v.isBlank('   ')).toBe(true);
    expect(v.isBlank(' \n  ')).toBe(true);
    expect(v.isBlank('\f\n\r\t\v')).toBe(true);
  });

  it('should return true for an empty string string representation of an object', function() {
    expect(v.isBlank(['\n\n'])).toBe(true);
    expect(
      v.isBlank({
        toString: function() {
          return ' ';
        },
      })
    ).toBe(true);
  });

  it('should return true for an undefined', function() {
    expect(v.isBlank(undefined)).toBe(true);
    expect(v.isBlank()).toBe(true);
  });

  it('should return true for a null', function() {
    expect(v.isBlank(null)).toBe(true);
  });
});
