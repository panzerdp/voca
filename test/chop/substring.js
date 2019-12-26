
import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('substring', function() {

  it('should substring a string', function() {
    expect(v.substring('infinite loop', 9)).toBe('loop');
    expect(v.substring('infinite loop', 0)).toBe('infinite loop');
    expect(v.substring('infinite loop')).toBe('infinite loop');
    expect(v.substring('infinite loop', 1)).toBe('nfinite loop');
    expect(v.substring(PRINTABLE_ASCII, 0)).toBe(PRINTABLE_ASCII);
  });

  it('should substring a string with an end position', function() {
    expect(v.substring('infinite loop', 9, 12)).toBe('loo');
    expect(v.substring('infinite loop', 0, 'infinite loop'.length)).toBe('infinite loop');
    expect(v.substring('infinite loop', 1, 2)).toBe('n');
  });

  it('should substring a string representation of an object', function() {
    expect(v.substring(['infinite loop'], 10)).toBe('oop');
    expect(v.substring({
      toString: function() {
        return 'loop';
      }
    }, 0, 3)).toBe('loo');
  });

  it('should substring a string from a number', function() {
    expect(v.substring(12345, 3)).toBe('45');
    expect(v.substring(987, 1, 2)).toBe('8');
  });
});