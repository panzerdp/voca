
import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('prune', function() {

  it('should prune a string', function() {
    expect(v.prune('Once upon a time there lived in a certain village a little country girl', 7)).toBe('Once...');
    expect(v.prune('I\'ll go this way and go you that', 19, ' (read more)')).toBe('I\'ll go (read more)');
    expect(v.prune('Little Red Riding Hood', 6, '...')).toBe('...');
    expect(v.prune('Little Red Riding Hood', 9, '...')).toBe('Little...');
    expect(v.prune('Little Red Riding Hood', 11, '...')).toBe('Little...');
    expect(v.prune('Little Red Riding Hood', 20, '...')).toBe('Little Red Riding...');
    expect(v.prune('Little Red Riding Hood', 22, '...')).toBe('Little Red Riding Hood');
    expect(v.prune('Little Red Riding Hood', 1, '...')).toBe('...');
    expect(v.prune('Little Red Riding Hood', 5, '...')).toBe('...');
    expect(v.prune('Little Red Riding Hood', 0, '(more)')).toBe('(more)');
    expect(v.prune(PRINTABLE_ASCII, PRINTABLE_ASCII.length)).toBe(PRINTABLE_ASCII);
    expect(v.prune(PRINTABLE_ASCII, 0)).toBe('...');
  });

  it('should prune a string with extra ASCII characters', function() {
    expect(v.prune('Привет, как дела', 10, '...')).toBe('Привет...');
    expect(v.prune('La variété la plus fréquente est la blanche', 12, '..')).toBe('La variété..');
  });

  it('should not prune a string if length parameter is greater or equal than string length', function() {
    expect(v.prune('Once upon', 20)).toBe('Once upon');
    expect(v.prune('Once', 4, ' (read more)')).toBe('Once');
    expect(v.prune('', 0, '....')).toBe('');
  });

  it('should prune a string representation of an object', function() {
    expect(v.prune(['Welcome'], 4)).toBe('...');
    expect(v.prune({
      toString: function() {
        return 'Have a nice day';
      }
    }, 6, '..')).toBe('Have..');
  });

  it('should return an empty string for null or undefined', function() {
    expect(v.prune()).toBe('');
    expect(v.prune(undefined)).toBe('');
    expect(v.prune(null)).toBe('');
  });

});