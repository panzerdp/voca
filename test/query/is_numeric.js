import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('isNumeric', function() {
  it('should return true for a number', function() {
    expect(v.isNumeric(0)).toBe(true);
    expect(v.isNumeric(+0)).toBe(true);
    expect(v.isNumeric(1000)).toBe(true);
    expect(v.isNumeric(-1000)).toBe(true);
    expect(v.isNumeric(0xff)).toBe(true);
    expect(v.isNumeric(1.56)).toBe(true);
    expect(v.isNumeric(-10.888)).toBe(true);
    expect(v.isNumeric(125e5)).toBe(true);
    expect(v.isNumeric(125e-3)).toBe(true);
  });

  it('should return true for a numeric string', function() {
    expect(v.isNumeric('0')).toBe(true);
    expect(v.isNumeric('+0')).toBe(true);
    expect(v.isNumeric('0.0')).toBe(true);
    expect(v.isNumeric('1000')).toBe(true);
    expect(v.isNumeric('-1000')).toBe(true);
    expect(v.isNumeric('0xFF')).toBe(true);
    expect(v.isNumeric('1.56')).toBe(true);
    expect(v.isNumeric('-10.888')).toBe(true);
    expect(v.isNumeric('125e5')).toBe(true);
    expect(v.isNumeric('125e-3')).toBe(true);
  });

  it('should return true for a numeric string representation of an object', function() {
    expect(v.isNumeric([0])).toBe(true);
    expect(v.isNumeric(['0'])).toBe(true);
    expect(v.isNumeric(['0.0'])).toBe(true);
    expect(
      v.isNumeric({
        toString: function() {
          return '100';
        },
      })
    ).toBe(true);
  });

  it('should return false for a non numeric string', function() {
    expect(v.isNumeric('FF')).toBe(false);
    expect(v.isNumeric('0FF')).toBe(false);
    expect(v.isNumeric('Hello World!')).toBe(false);
    expect(v.isNumeric('!0')).toBe(false);
    expect(v.isNumeric('1.0 0')).toBe(false);
    expect(v.isNumeric('Infinity')).toBe(false);
    expect(v.isNumeric('NaN')).toBe(false);
    expect(v.isNumeric(' ')).toBe(false);
    expect(v.isNumeric(PRINTABLE_ASCII)).toBe(false);
  });

  it('should return false for a non numeric string representation of an object', function() {
    expect(v.isNumeric(['Hello World!'])).toBe(false);
    expect(
      v.isNumeric({
        toString: function() {
          return 'NaN';
        },
      })
    ).toBe(false);
  });

  it('should return false for a boolean', function() {
    expect(v.isNumeric(true)).toBe(false);
    expect(v.isNumeric(false)).toBe(false);
  });

  it('should return false for an undefined', function() {
    expect(v.isNumeric(undefined)).toBe(false);
    expect(v.isNumeric()).toBe(false);
  });

  it('should return false for a null', function() {
    expect(v.isNumeric(null)).toBe(false);
  });

  it('should return false for an Inifinty', function() {
    expect(v.isNumeric(null)).toBe(false);
  });

  it('should return false for a NaN', function() {
    expect(v.isNumeric(null)).toBe(false);
  });

  it('should return false for an empty string', function() {
    expect(v.isNumeric('')).toBe(false);
  });
});
