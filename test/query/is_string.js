import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('isString', function() {
  it('should return true for a string', function() {
    expect(v.isString('Hello World!')).toBe(true);
    expect(v.isString('')).toBe(true);
    expect(v.isString('\n')).toBe(true);
    expect(v.isString(PRINTABLE_ASCII)).toBe(true);
  });

  it('should return false for a null', function() {
    expect(v.isString(null)).toBe(false);
  });

  it('should return false for an undefined', function() {
    expect(v.isString(undefined)).toBe(false);
    expect(v.isString()).toBe(false);
  });

  it('should return false for a boolean', function() {
    expect(v.isString(true)).toBe(false);
    expect(v.isString(false)).toBe(false);
  });

  it('should return false for a number', function() {
    expect(v.isString(100)).toBe(false);
    expect(v.isString(-40)).toBe(false);
  });

  it('should return false for an object', function() {
    expect(v.isString([])).toBe(false);
    expect(v.isString({})).toBe(false);
    expect(v.isString(new Date())).toBe(false);
  });
});
