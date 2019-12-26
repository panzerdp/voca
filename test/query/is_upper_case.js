import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('isUpperCase', function() {
  it('should return true for an upper case string', function() {
    expect(v.isUpperCase('A')).toBe(true);
    expect(v.isUpperCase('HELLOWORLD')).toBe(true);
    expect(v.isUpperCase('WELCOMETOEARTH')).toBe(true);
    expect(v.isUpperCase('ÁÉÈÊËÍÎÏÓÔÚÛÝÀÒÜÇÄÖÂÙŸÃÕÑ')).toBe(true);
  });

  it('should return true for a lower case string representation of an object', function() {
    expect(v.isUpperCase(['ROBOCOP'])).toBe(true);
    expect(
      v.isUpperCase({
        toString: function() {
          return 'BATMAN';
        }
      })
    ).toBe(true);
  });

  it('should return false for a string containing lower case characters', function() {
    expect(v.isUpperCase('Helloworld')).toBe(false);
    expect(v.isUpperCase('WeLCOMETOEARTH')).toBe(false);
  });

  it('should return false for a boolean', function() {
    expect(v.isUpperCase(true)).toBe(false);
    expect(v.isUpperCase(false)).toBe(false);
  });

  it('should return false for a string containing characters different than upper case', function() {
    expect(v.isUpperCase('hello world!')).toBe(false);
    expect(
      v.isUpperCase('No one cared who I was until I put on the mask.')
    ).toBe(false);
    expect(v.isUpperCase('\n')).toBe(false);
    expect(v.isUpperCase('\t')).toBe(false);
    expect(v.isUpperCase(' ')).toBe(false);
    expect(v.isUpperCase('')).toBe(false);
    expect(v.isUpperCase(PRINTABLE_ASCII)).toBe(false);
  });

  it('should return false for a non upper case string representation of an object', function() {
    expect(v.isUpperCase(['RoboCop'])).toBe(false);
    expect(
      v.isUpperCase({
        toString: function() {
          return 'Batman';
        }
      })
    ).toBe(false);
  });

  it('should return false for a number or numeric string', function() {
    expect(v.isUpperCase(0)).toBe(false);
    expect(v.isUpperCase(-1500)).toBe(false);
    expect(v.isUpperCase(2017)).toBe(false);
    expect(v.isUpperCase('0')).toBe(false);
    expect(v.isUpperCase('1998')).toBe(false);
  });

  it('should return false for a null', function() {
    expect(v.isUpperCase(null)).toBe(false);
  });

  it('should return false for an undefined', function() {
    expect(v.isUpperCase(undefined)).toBe(false);
    expect(v.isUpperCase()).toBe(false);
  });
});
