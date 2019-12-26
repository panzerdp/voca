
import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('padRight', function() {

  it('should right pad a string', function() {
    expect(v.padRight('FF', 4, '0')).toBe('FF00');
    expect(v.padRight('00FF', 4, '0')).toBe('00FF');
    expect(v.padRight('ab', 10, '012')).toBe('ab01201201');
    expect(v.padRight('0', 5, '0')).toBe('00000');
    expect(v.padRight('', 10, '01')).toBe('0101010101');
    expect(v.padRight('Hello World')).toBe('Hello World');
    expect(v.padRight('Hello World', 20, '')).toBe('Hello World');
    expect(v.padRight('Welcome', 10)).toBe('Welcome   ');
    expect(v.padRight('123', 6, '_-')).toBe('123_-_');
    expect(v.padRight(PRINTABLE_ASCII)).toBe(PRINTABLE_ASCII);
    expect(v.padRight(PRINTABLE_ASCII, PRINTABLE_ASCII.length + 3, '--')).toBe(PRINTABLE_ASCII + '---');
    expect(v.padRight('')).toBe('');
    expect(v.padRight('', 0)).toBe('');
  });

  it('should not modify the string when pad length is less than string length', function() {
    expect(v.padRight('Hello World', 0, ' ')).toBe('Hello World');
    expect(v.padRight('Hello World', 5, ' ')).toBe('Hello World');
    expect(v.padRight('0', 0, ' ')).toBe('0');
    expect(v.padRight('123', -1, ' ')).toBe('123');
  });

  it('should right pad a string representation of an object', function() {
    expect(v.padRight(['Welcome'], 9)).toBe('Welcome  ');
    expect(v.padRight({
      toString: function() {
        return 'great';
      }
    }, 10, '-')).toBe('great-----');
  });

  it('should return an empty string for null or undefined', function() {
    expect(v.padRight()).toBe('');
    expect(v.padRight(undefined)).toBe('');
    expect(v.padRight(null)).toBe('');
  });

});