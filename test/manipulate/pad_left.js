import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('padLeft', function() {
  it('should left pad a string', function() {
    expect(v.padLeft('FF', 4, '0')).toBe('00FF');
    expect(v.padLeft('00FF', 4, '0')).toBe('00FF');
    expect(v.padLeft('ab', 10, '012')).toBe('01201201ab');
    expect(v.padLeft('0', 5, '0')).toBe('00000');
    expect(v.padLeft('', 10, '01')).toBe('0101010101');
    expect(v.padLeft('Hello World')).toBe('Hello World');
    expect(v.padLeft('Hello World', 20, '')).toBe('Hello World');
    expect(v.padLeft('Welcome', 10)).toBe('   Welcome');
    expect(v.padLeft('Alien', 10, '-=')).toBe('-=-=-Alien');
    expect(v.padLeft(PRINTABLE_ASCII)).toBe(PRINTABLE_ASCII);
    expect(v.padLeft(PRINTABLE_ASCII, PRINTABLE_ASCII.length + 3, '--')).toBe('---' + PRINTABLE_ASCII);
    expect(v.padLeft('')).toBe('');
    expect(v.padLeft('', 0)).toBe('');
  });

  it('should not modify the string when pad length is less than string length', function() {
    expect(v.padLeft('Hello World', 0, ' ')).toBe('Hello World');
    expect(v.padLeft('Hello World', 5, ' ')).toBe('Hello World');
    expect(v.padLeft('0', 0, ' ')).toBe('0');
    expect(v.padLeft('123', -1, ' ')).toBe('123');
  });

  it('should left pad a string representation of an object', function() {
    expect(v.padLeft(['Welcome'], 9)).toBe('  Welcome');
    expect(
      v.padLeft(
        {
          toString: function() {
            return 'great';
          },
        },
        10,
        '-'
      )
    ).toBe('-----great');
  });

  it('should return an empty string for null or undefined', function() {
    expect(v.padLeft()).toBe('');
    expect(v.padLeft(undefined)).toBe('');
    expect(v.padLeft(null)).toBe('');
  });
});
