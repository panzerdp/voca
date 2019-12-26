import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('isAlphaDigit', function() {
  it('should return true for an alpha and digit string', function() {
    expect(v.isAlphaDigit('HelloWorld')).toBe(true);
    expect(v.isAlphaDigit('HelloWorld007')).toBe(true);
    expect(v.isAlphaDigit('JavaScript6')).toBe(true);
    expect(v.isAlphaDigit('AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz')).toBe(true);
    expect(v.isAlphaDigit('AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789')).toBe(true);
    expect(v.isAlphaDigit('man\u0303ana')).toBe(true);
    expect(v.isAlphaDigit('foo\u0303\u035C\u035D\u035Ebar')).toBe(true);
  });

  it('should return true for a string with diacritics', function() {
    expect(v.isAlphaDigit('áéèêëíîïóôúûýàòüçäöâùÿãõñ')).toBe(true);
    expect(v.isAlphaDigit('áéèêëíîïóôúûýàòüçäöâùÿãõñ0123456789')).toBe(true);
  });

  it('should return true for an array with one alpha and digit string item', function() {
    expect(v.isAlphaDigit(['HelloWorld'])).toBe(true);
    expect(v.isAlphaDigit(['HelloWorld007'])).toBe(true);
  });

  it('should return true for an alpha and digit string representation of an object', function() {
    expect(
      v.isAlphaDigit({
        toString: function() {
          return 'HelloWorld';
        },
      })
    ).toBe(true);
    expect(
      v.isAlphaDigit({
        toString: function() {
          return 'Welcome';
        },
      })
    ).toBe(true);
    expect(
      v.isAlphaDigit({
        toString: function() {
          return 'JavaScript2016';
        },
      })
    ).toBe(true);
    expect(
      v.isAlphaDigit({
        toString: function() {
          return 'Welcome';
        },
      })
    ).toBe(true);
  });

  it('should return true for a boolean', function() {
    expect(v.isAlphaDigit(true)).toBe(true);
    expect(v.isAlphaDigit(false)).toBe(true);
  });

  it('should return true for a positive number or numeric string', function() {
    expect(v.isAlphaDigit(0)).toBe(true);
    expect(v.isAlphaDigit(10)).toBe(true);
    expect(v.isAlphaDigit(0xff)).toBe(true);
    expect(v.isAlphaDigit('0')).toBe(true);
    expect(v.isAlphaDigit('10')).toBe(true);
    expect(v.isAlphaDigit('0xFF')).toBe(true);
    expect(v.isAlphaDigit(NaN)).toBe(true);
    expect(v.isAlphaDigit(Infinity)).toBe(true);
  });

  it('should return false for a non alpha and non digit string', function() {
    expect(v.isAlphaDigit('Hello World!')).toBe(false);
    expect(v.isAlphaDigit('Hello World! It is 2016.')).toBe(false);
    expect(v.isAlphaDigit('\nHello World!\n')).toBe(false);
    expect(v.isAlphaDigit('JavaScript 2015')).toBe(false);
    expect(v.isAlphaDigit(' ')).toBe(false);
    expect(v.isAlphaDigit('\n')).toBe(false);
    expect(v.isAlphaDigit('\t')).toBe(false);
    expect(v.isAlphaDigit(PRINTABLE_ASCII)).toBe(false);
  });

  it('should return false for a non alpha and non digit string representation of an object', function() {
    expect(
      v.isAlphaDigit({
        toString: function() {
          return 'Hello World! How are you?';
        },
      })
    ).toBe(false);
    expect(
      v.isAlphaDigit({
        toString: function() {
          return 'Hello World! How are you?';
        },
      })
    ).toBe(false);
  });

  it('should return false for an undefined', function() {
    expect(v.isAlphaDigit(undefined)).toBe(false);
    expect(v.isAlphaDigit()).toBe(false);
  });

  it('should return false for a null', function() {
    expect(v.isAlphaDigit(null)).toBe(false);
  });

  it('should return false for a negative number or numeric string', function() {
    expect(v.isAlphaDigit(-1)).toBe(false);
    expect(v.isAlphaDigit(-12.05)).toBe(false);
    expect(v.isAlphaDigit('-12.05')).toBe(false);
  });

  it('should return false for an empty string', function() {
    expect(v.isAlphaDigit('')).toBe(false);
  });
});
