
import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('truncate', function() {

  it('should truncate a string', function() {
    expect(v.truncate('Once upon a time there lived in a certain village a little country girl', 4)).toBe('O...');
    expect(v.truncate('I\'ll go this way and go you that', 19, ' (read more)')).toBe('I\'ll go (read more)');
    expect(v.truncate('Little Red Riding Hood', 9, '...')).toBe('Little...');
    expect(v.truncate('Little Red Riding Hood', 0, '(more)')).toBe('(more)');
    expect(v.truncate('Little Red Riding Hood', 1, '(more)')).toBe('(more)');
    expect(v.truncate('Little Red Riding Hood', 2, '(more)')).toBe('(more)');
    expect(v.truncate('Little Red Riding Hood', 3, '(more)')).toBe('(more)');
    expect(v.truncate('Little Red Riding Hood', 6, '(more)')).toBe('(more)');
    expect(v.truncate('Little Red Riding Hood', 7, '(more)')).toBe('L(more)');
    expect(v.truncate('Little Red Riding Hood', 7, '')).toBe('Little ');
    expect(v.truncate('Little Red Riding Hood', 0, '')).toBe('');
    expect(v.truncate(PRINTABLE_ASCII, PRINTABLE_ASCII.length)).toBe(PRINTABLE_ASCII);
    expect(v.truncate(PRINTABLE_ASCII, 0)).toBe('...');
  });

  it('should not truncate a string if length parameter is greater or equal than string length', function() {
    expect(v.truncate('Once upon', 20)).toBe('Once upon');
    expect(v.truncate('Once', 4, ' (read more)')).toBe('Once');
    expect(v.truncate('', 0, '....')).toBe('');
  });

  it('should truncate a string representation of an object', function() {
    expect(v.truncate(['Welcome'], 6)).toBe('Wel...');
    expect(v.truncate({
      toString: function() {
        return 'Have a nice day';
      }
    }, 4, '..')).toBe('Ha..');
  });

  it('should return an empty string for null or undefined', function() {
    expect(v.truncate()).toBe('');
    expect(v.truncate(undefined)).toBe('');
    expect(v.truncate(null)).toBe('');
  });

});