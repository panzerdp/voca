import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('isDigit', function() {
  it('should return true for a digit string', function() {
    expect(v.isDigit('0')).toBe(true);
    expect(v.isDigit('1000')).toBe(true);
    expect(v.isDigit('1234567890')).toBe(true);
    expect(v.isDigit('00')).toBe(true);
  });

  it('should return true for an array with one digit string item', function() {
    expect(v.isDigit(['00'])).toBe(true);
    expect(v.isDigit(['12'])).toBe(true);
    expect(v.isDigit(['1234567890'])).toBe(true);
  });

  it('should return true for a digit string representation of an object', function() {
    expect(
      v.isDigit({
        toString: function() {
          return '123';
        }
      })
    ).toBe(true);
    expect(
      v.isDigit({
        toString: function() {
          return '567';
        }
      })
    ).toBe(true);
    expect(
      v.isDigit({
        toString: function() {
          return '00';
        }
      })
    ).toBe(true);
  });

  it('should return true for a positive integer number', function() {
    expect(v.isDigit(0)).toBe(true);
    expect(v.isDigit(1000)).toBe(true);
    expect(v.isDigit(0xff)).toBe(true);
    expect(v.isDigit(0x1fffffffffffff)).toBe(true);
  });

  it('should return false for a boolean', function() {
    expect(v.isDigit(true)).toBe(false);
    expect(v.isDigit(false)).toBe(false);
  });

  it('should return false for a non-digit string', function() {
    expect(v.isDigit('hell0w0rld!')).toBe(false);
    expect(v.isDigit('hello world! 12')).toBe(false);
    expect(v.isDigit('\nhell0 w0rld!\n')).toBe(false);
    expect(v.isDigit('JavaScript 2015')).toBe(false);
    expect(v.isDigit('isAlpha(0)')).toBe(false);
    expect(v.isDigit('привет0мир!1200')).toBe(false);
    expect(v.isDigit('12.0')).toBe(false);
    expect(v.isDigit('-1')).toBe(false);
    expect(v.isDigit(PRINTABLE_ASCII)).toBe(false);
  });

  it('should return false for an array with a non-digit string item', function() {
    expect(v.isDigit(['Hello 1000000 visitor'])).toBe(false);
    expect(v.isDigit(['0.0'])).toBe(false);
  });

  it('should return false for a non digit string representation of an object', function() {
    expect(
      v.isDigit({
        toString: function() {
          return 'Hello World! 007';
        }
      })
    ).toBe(false);
    expect(
      v.isDigit({
        toString: function() {
          return 'Ява Скрипт, привет 0!';
        }
      })
    ).toBe(false);
  });

  it('should return false for an undefined', function() {
    expect(v.isDigit(undefined)).toBe(false);
    expect(v.isDigit()).toBe(false);
  });

  it('should return false for a null', function() {
    expect(v.isDigit(null)).toBe(false);
  });

  it('should return false for a negative number or negative numeric string', function() {
    expect(v.isDigit(-12)).toBe(false);
    expect(v.isDigit(-100)).toBe(false);
    expect(v.isDigit(-12.05)).toBe(false);
    expect(v.isDigit('-1')).toBe(false);
    expect(v.isDigit('-12.05')).toBe(false);
  });

  it('should return false for float numbers', function() {
    expect(v.isDigit(0.5)).toBe(false);
    expect(v.isDigit(12.05)).toBe(false);
    expect(v.isDigit(100.001)).toBe(false);
  });

  it('should return false for an Infinity number', function() {
    expect(v.isDigit(Infinity)).toBe(false);
  });

  it('should return false for a NaN number', function() {
    expect(v.isDigit(NaN)).toBe(false);
  });

  it('should return false for an empty string', function() {
    expect(v.isDigit('')).toBe(false);
  });
});
