
import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('indexOf', function() {

  it('should return the index of a searched string', function() {
    expect(v.indexOf('we have a mission', 'mission')).toBe(10);
    expect(v.indexOf('we have a mission', 'a')).toBe(4);
    expect(v.indexOf('we have a mission', 'we')).toBe(0);
    expect(v.indexOf('we have a mission', '')).toBe(0);
    expect(v.indexOf('', '')).toBe(0);
    expect(v.indexOf(undefined, '')).toBe(0);
    expect(v.indexOf(null, '')).toBe(0);
    expect(v.indexOf(PRINTABLE_ASCII, '!')).toBe(1);
  });

  it('should return the index of a searched string and start index', function() {
    expect(v.indexOf('we have a mission', 'a', 6)).toBe(8);
    expect(v.indexOf('we have a mission', 'we', 0)).toBe(0);
    expect(v.indexOf('we have a mission', 'we', NaN)).toBe(0);
    expect(v.indexOf('we have a mission', '', 0)).toBe(0);
    expect(v.indexOf(PRINTABLE_ASCII, '#', 3)).toBe(3);
  });

  it('should return the index of a searched string in a string representation of an object', function() {
    expect(v.indexOf(['we have a mission'], 'a')).toBe(4);
    expect(v.indexOf({
      toString: function() {
        return 'we have a mission';
      }
    }, 'we')).toBe(0);
  });

  it('should return -1 for an invalid ending string and position', function() {
    expect(v.indexOf('we have a mission', 'me')).toBe(-1);
    expect(v.indexOf('we have a mission', '12')).toBe(-1);
    expect(v.indexOf('we have a mission', 'we', 3)).toBe(-1);
    expect(v.indexOf('we have a mission', 'mission', 100)).toBe(-1);
    expect(v.indexOf('we have a mission', 'mission', Infinity)).toBe(-1);
    expect(v.indexOf('', 'me')).toBe(-1);
  });

  it('should return -1 for undefined and null parameters', function() {
    expect(v.indexOf('we have a mission')).toBe(-1);
    expect(v.indexOf('we have a mission', undefined)).toBe(-1);
    expect(v.indexOf('we have a mission', null)).toBe(-1);
  });

});