
import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('substr', function() {

  it('should substract a string', function() {
    expect(v.substr('infinite loop', 9)).toBe('loop');
    expect(v.substr('infinite loop', 0)).toBe('infinite loop');
    expect(v.substr('infinite loop')).toBe('infinite loop');
    expect(v.substr('infinite loop', 1)).toBe('nfinite loop');
    expect(v.substr('infinite loop', -4)).toBe('loop');
    expect(v.substr(PRINTABLE_ASCII, 0)).toBe(PRINTABLE_ASCII);
  });

  it('should substract a string with a length', function() {
    expect(v.substr('infinite loop', 9, 3)).toBe('loo');
    expect(v.substr('infinite loop', 0, 'infinite loop'.length)).toBe('infinite loop');
    expect(v.substr('infinite loop', 1, 1)).toBe('n');
    expect(v.substr('infinite loop', -4, 1)).toBe('l');
  });

  it('should substract a string representation of an object', function() {
    expect(v.substr(['infinite loop'], 10)).toBe('oop');
    expect(v.substr({
      toString: function() {
        return 'loop';
      }
    }, 0, 3)).toBe('loo');
  });

  it('should substract a string from a number', function() {
    expect(v.substr(12345, 3)).toBe('45');
    expect(v.substr(987, 1, 1)).toBe('8');
  });
});