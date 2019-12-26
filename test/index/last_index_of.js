import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('lastIndexOf', function() {
  it('should return the index of a searched string', function() {
    expect(v.lastIndexOf('we have a mission', 'mission')).toBe(10);
    expect(v.lastIndexOf('we have a mission', 'a')).toBe(8);
    expect(v.lastIndexOf('we have a mission', 'we')).toBe(0);
    expect(v.lastIndexOf('we have a mission', '')).toBe(17);
    expect(v.lastIndexOf('', '')).toBe(0);
    expect(v.lastIndexOf(undefined, '')).toBe(0);
    expect(v.lastIndexOf(null, '')).toBe(0);
    expect(v.lastIndexOf(PRINTABLE_ASCII, '!')).toBe(1);
  });

  it('should return the index of a searched string and start index', function() {
    expect(v.lastIndexOf('we have a mission', 'a', 17)).toBe(8);
    expect(v.lastIndexOf('we have a mission', 'a', 6)).toBe(4);
    expect(v.lastIndexOf('we have a mission', 'we', 15)).toBe(0);
    expect(v.lastIndexOf('we have a mission', 'we', 17)).toBe(0);
    expect(v.lastIndexOf('we have a mission', '', 1)).toBe(1);
    expect(v.lastIndexOf(PRINTABLE_ASCII, '#', PRINTABLE_ASCII.length - 3)).toBe(3);
  });

  it('should return the index of a searched string in a string representation of an object', function() {
    expect(v.lastIndexOf(['we have a mission'], 'a')).toBe(8);
    expect(
      v.lastIndexOf(
        {
          toString: function() {
            return 'we have a mission';
          },
        },
        'we'
      )
    ).toBe(0);
  });

  it('should return -1 for an invalid ending string and position', function() {
    expect(v.lastIndexOf('we have a mission', 'me')).toBe(-1);
    expect(v.lastIndexOf('we have a mission', '12')).toBe(-1);
    expect(v.lastIndexOf('we have a mission', 'mission', -100)).toBe(-1);
    expect(v.lastIndexOf('we have a mission', 'mission', -Infinity)).toBe(-1);
    expect(v.lastIndexOf('', 'me')).toBe(-1);
  });

  it('should return -1 for undefined and null parameters', function() {
    expect(v.lastIndexOf('we have a mission')).toBe(-1);
    expect(v.lastIndexOf('we have a mission', undefined)).toBe(-1);
    expect(v.lastIndexOf('we have a mission', null)).toBe(-1);
  });
});
