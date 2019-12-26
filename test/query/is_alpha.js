import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('isAlpha', function() {
  it('should return true for an alpha string', function() {
    expect(v.isAlpha('HelloWorld')).toBe(true);
    expect(v.isAlpha('JavaScript')).toBe(true);
    expect(v.isAlpha('AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz')).toBe(true);
    expect(v.isAlpha('man\u0303ana')).toBe(true);
    expect(v.isAlpha('foo\u0303\u035C\u035D\u035Ebar')).toBe(true);
  });

  it('should return true for a string with diacritics', function() {
    expect(v.isAlpha('áéèêëíîïóôúûýàòüçäöâùÿãõñ')).toBe(true);
  });

  it('should return true for characters with diacritical marks', function() {
    expect(v.isAlpha('man\u0303ana')).toBe(true);
    expect(v.isAlpha('foo\u0303\u035C\u035D\u035Ebar')).toBe(true);
  });

  it('should return true for an array with one alpha string item', function() {
    expect(v.isAlpha(['HelloWorld'])).toBe(true);
  });

  it('should return true for an alpha string representation of an object', function() {
    expect(
      v.isAlpha({
        toString: function() {
          return 'HelloWorld';
        },
      })
    ).toBe(true);
    expect(
      v.isAlpha({
        toString: function() {
          return 'HelloWorld';
        },
      })
    ).toBe(true);
  });

  it('should return true for a boolean', function() {
    expect(v.isAlpha(true)).toBe(true);
    expect(v.isAlpha(false)).toBe(true);
  });

  it('should return true for a NaN or Infinity number', function() {
    expect(v.isAlpha(NaN)).toBe(true);
    expect(v.isAlpha(Infinity)).toBe(true);
  });

  it('should return false for a non-alpha string', function() {
    expect(v.isAlpha('Hello World!')).toBe(false);
    expect(v.isAlpha('\nHello World!\n')).toBe(false);
    expect(v.isAlpha('ECMAScript 5.1 (ECMA-262)')).toBe(false);
    expect(v.isAlpha(' ')).toBe(false);
    expect(v.isAlpha('\n')).toBe(false);
    expect(v.isAlpha('\t')).toBe(false);
    expect(v.isAlpha('0123456789')).toBe(false);
    expect(v.isAlpha('áéèêëíîïóôúûýàòüçäöâùÿãõñ 0123456789')).toBe(false);
    expect(v.isAlpha(PRINTABLE_ASCII)).toBe(false);
  });

  it('should return false for an array with a non-alpha string item', function() {
    expect(v.isAlpha(['Hello World!'])).toBe(false);
  });

  it('should return false for a non-alpha string representation of an object', function() {
    expect(
      v.isAlpha({
        toString: function() {
          return 'Hello World!';
        },
      })
    ).toBe(false);
    expect(
      v.isAlpha({
        toString: function() {
          return 'Welcome!';
        },
      })
    ).toBe(false);
  });

  it('should return false for an undefined', function() {
    expect(v.isAlpha(undefined)).toBe(false);
    expect(v.isAlpha()).toBe(false);
  });

  it('should return false for a null', function() {
    expect(v.isAlpha(null)).toBe(false);
  });

  it('should return false for a number or numeric string', function() {
    expect(v.isAlpha(0)).toBe(false);
    expect(v.isAlpha(10)).toBe(false);
    expect(v.isAlpha(-12.05)).toBe(false);
    expect(v.isAlpha(0xff)).toBe(false);
    expect(v.isAlpha('0')).toBe(false);
    expect(v.isAlpha('10')).toBe(false);
    expect(v.isAlpha('-12.05')).toBe(false);
    expect(v.isAlpha('0xFF')).toBe(false);
  });

  it('should return false for an empty string', function() {
    expect(v.isAlpha('')).toBe(false);
  });
});
