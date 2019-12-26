
import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('pad', function() {

  it('should pad a string', function() {
    expect(v.pad('FF', 4, '0')).toBe('0FF0');
    expect(v.pad('00FF', 4, '0')).toBe('00FF');
    expect(v.pad('ab', 10, '012')).toBe('0120ab0120');
    expect(v.pad('0', 5, '0')).toBe('00000');
    expect(v.pad('', 10, '01')).toBe('0101001010');
    expect(v.pad('Hello World')).toBe('Hello World');
    expect(v.pad('Hello World', 20, '')).toBe('Hello World');
    expect(v.pad('Welcome', 10)).toBe(' Welcome  ');
    expect(v.pad('Alien', 10, '-=')).toBe('-=Alien-=-');
    expect(v.pad(PRINTABLE_ASCII)).toBe(PRINTABLE_ASCII);
    expect(v.pad(PRINTABLE_ASCII, PRINTABLE_ASCII.length + 3, '--')).toBe('-' + PRINTABLE_ASCII + '--');
    expect(v.pad('')).toBe('');
    expect(v.pad('', 0)).toBe('');
  });

  it('should not modify the string when pad length is less than string length', function() {
    expect(v.pad('Hello World', 0, ' ')).toBe('Hello World');
    expect(v.pad('Hello World', 5, ' ')).toBe('Hello World');
    expect(v.pad('0', 0, ' ')).toBe('0');
    expect(v.pad('123', -1, ' ')).toBe('123');
  });

  it('should pad a string representation of an object', function() {
    expect(v.pad(['Welcome'], 9)).toBe(' Welcome ');
    expect(v.pad({
      toString: function() {
        return 'great';
      }
    }, 10, '-')).toBe('--great---');
  });

  it('should return an empty string for null or undefined', function() {
    expect(v.pad()).toBe('');
    expect(v.pad(undefined)).toBe('');
    expect(v.pad(null)).toBe('');
  });

});