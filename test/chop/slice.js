
import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('slice', function() {

  it('should slice a string', function() {
    expect(v.slice('infinite loop', 9)).toBe('loop');
    expect(v.slice('infinite loop', 0)).toBe('infinite loop');
    expect(v.slice('infinite loop')).toBe('infinite loop');
    expect(v.slice('infinite loop', 1)).toBe('nfinite loop');
    expect(v.slice(PRINTABLE_ASCII, 0)).toBe(PRINTABLE_ASCII);
  });

  it('should slice a string with an end position', function() {
    expect(v.slice('infinite loop', 9, 12)).toBe('loo');
    expect(v.slice('infinite loop', 9, -1)).toBe('loo');
    expect(v.slice('infinite loop', 0, 'infinite loop'.length)).toBe('infinite loop');
    expect(v.slice('infinite loop', 1, 2)).toBe('n');
    expect(v.slice('infinite loop', -4, -1)).toBe('loo');
  });

  it('should slice a string representation of an object', function() {
    expect(v.slice(['infinite loop'], 10)).toBe('oop');
    expect(v.slice({
      toString: function() {
        return 'loop';
      }
    }, 0, 3)).toBe('loo');
  });

  it('should slice a string from a number', function() {
    expect(v.slice(12345, 3)).toBe('45');
    expect(v.slice(987, 1, 2)).toBe('8');
  });
});