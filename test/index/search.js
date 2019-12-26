
import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('search', function() {

  it('should return the index of a match', function() {
    expect(v.search('we have a mission', /mission/)).toBe(10);
    expect(v.search('we have a mission', 'a')).toBe(4);
    expect(v.search('we have a mission', /we/)).toBe(0);
    expect(v.search('we have a mission', /\s/)).toBe(2);
    expect(v.search('we have a mission', '')).toBe(0);
    expect(v.search('', '')).toBe(0);
    expect(v.search(undefined, '')).toBe(0);
    expect(v.search(null, '')).toBe(0);
    expect(v.search(PRINTABLE_ASCII, '!')).toBe(1);
  });

  it('should return the index of a match and start index', function() {
    expect(v.search('we have a mission', /a/, 6)).toBe(8);
    expect(v.search('we have a mission', /we/, 0)).toBe(0);
    expect(v.search('we have a mission', 'we', NaN)).toBe(0);
    expect(v.search('we have a mission', '', 0)).toBe(0);
    expect(v.search(PRINTABLE_ASCII, '#', 3)).toBe(3);
  });

  it('should return the index of a searched string in a string representation of an object', function() {
    expect(v.search(['we have a mission'], /a/)).toBe(4);
    expect(v.search({
      toString: function() {
        return 'we have a mission';
      }
    }, /we/)).toBe(0);
  });

  it('should threat a null value as "null" match pattern', function() {
    expect(v.search('we have a null mission', null)).toBe(10);
    expect(v.search('we have a mission', null)).toBe(-1);
  });

  it('should return -1 for an invalid ending string and position', function() {
    expect(v.search('we have a mission', /me/)).toBe(-1);
    expect(v.search('we have a mission', /12/)).toBe(-1);
    expect(v.search('we have a mission', /\s^/)).toBe(-1);
    expect(v.search('we have a mission', 'we', 3)).toBe(-1);
    expect(v.search('we have a mission', /mission/, 100)).toBe(-1);
    expect(v.search('we have a mission', /mission/, Infinity)).toBe(-1);
    expect(v.search('', /me/)).toBe(-1);
  });

  it('should return 0 for an undefined', function() {
    expect(v.search('we have a mission')).toBe(0);
    expect(v.search('we have a mission', undefined)).toBe(0);
  });

});