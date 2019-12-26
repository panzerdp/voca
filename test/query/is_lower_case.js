import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('isLowerCase', function() {
  it('should return true for a lower case string', function() {
    expect(v.isLowerCase('a')).toBe(true);
    expect(v.isLowerCase('helloworld')).toBe(true);
    expect(v.isLowerCase('welcometoearth')).toBe(true);
    expect(v.isLowerCase('áéèêëíîïóôúûýàòüçäöâùÿãõñ')).toBe(true);
  });

  it('should return true for a lower case string representation of an object', function() {
    expect(v.isLowerCase(['robocop'])).toBe(true);
    expect(
      v.isLowerCase({
        toString: function() {
          return 'batman';
        },
      })
    ).toBe(true);
  });

  it('should return true for a boolean', function() {
    expect(v.isLowerCase(true)).toBe(true);
    expect(v.isLowerCase(false)).toBe(true);
  });

  it('should return false for a string containing upper case characters', function() {
    expect(v.isLowerCase('Helloworld')).toBe(false);
    expect(v.isLowerCase('WELCOMETOEARTH')).toBe(false);
  });

  it('should return false for a string containing characters different than lower case', function() {
    expect(v.isLowerCase('hello world!')).toBe(false);
    expect(v.isLowerCase('No one cared who I was until I put on the mask.')).toBe(false);
    expect(v.isLowerCase('\n')).toBe(false);
    expect(v.isLowerCase('\t')).toBe(false);
    expect(v.isLowerCase(' ')).toBe(false);
    expect(v.isLowerCase('')).toBe(false);
    expect(v.isLowerCase(PRINTABLE_ASCII)).toBe(false);
  });

  it('should return false for a non lower case string representation of an object', function() {
    expect(v.isLowerCase(['RoboCop'])).toBe(false);
    expect(
      v.isLowerCase({
        toString: function() {
          return 'Batman';
        },
      })
    ).toBe(false);
  });

  it('should return false for a number or numeric string', function() {
    expect(v.isLowerCase(0)).toBe(false);
    expect(v.isLowerCase(-1500)).toBe(false);
    expect(v.isLowerCase(2017)).toBe(false);
    expect(v.isLowerCase('0')).toBe(false);
    expect(v.isLowerCase('1998')).toBe(false);
  });

  it('should return false for a null', function() {
    expect(v.isLowerCase(null)).toBe(false);
  });

  it('should return false for an undefined', function() {
    expect(v.isLowerCase(undefined)).toBe(false);
    expect(v.isLowerCase()).toBe(false);
  });
});
