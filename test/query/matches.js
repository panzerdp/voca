import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('matches', function() {
  it('should return true for a string that matches a regular expression object', function() {
    expect(v.matches('pacific ocean', /ocean/)).toBe(true);
    expect(v.matches('pacific ocean', /^pacific ocean$/)).toBe(true);
    expect(v.matches(undefined, /.?/)).toBe(true);
    expect(v.matches(null, /.?/)).toBe(true);
  });

  it('should return true for a string that matches a regular expression string', function() {
    expect(v.matches('pacific ocean', 'ocean')).toBe(true);
    expect(v.matches('pacific ocean', '^pacific ocean$')).toBe(true);
    expect(v.matches('pacific ocean', 'PACIFIC', 'i')).toBe(true);
    expect(v.matches('pacific ocean', '\\s')).toBe(true);
    expect(v.matches(undefined, '.?')).toBe(true);
    expect(v.matches(null, '.?')).toBe(true);
    expect(v.matches(PRINTABLE_ASCII, 's')).toBe(true);
  });

  it('should return true for a string that matches a string representation of an object', function() {
    expect(v.matches(['atlantic ocean'], /atlantic/)).toBe(true);
    expect(v.matches('pacific ocean', ['^pacific ocean$'])).toBe(true);
    expect(
      v.matches(
        {
          toString: function() {
            return 'pacific ocean';
          }
        },
        'PACIFIC',
        'i'
      )
    ).toBe(true);
    expect(v.matches(['pacific ocean'], ['\\s'])).toBe(true);
  });

  it('should return true for a number that matches a regular expression', function() {
    expect(v.matches(1500, /\d/)).toBe(true);
    expect(v.matches(685, 68)).toBe(true);
    expect(v.matches(-1.5, /^\-1\.5$/)).toBe(true);
  });

  it('should return true for a boolean that matches a regular expression', function() {
    expect(v.matches(true, /true/)).toBe(true);
    expect(v.matches(false, 'false')).toBe(true);
  });

  it('should return false for a string that does not match a regular expression object', function() {
    expect(v.matches('pacific ocean', /^ocean/)).toBe(false);
    expect(v.matches('pacific ocean', /^atlantic ocean$/)).toBe(false);
    expect(v.matches(undefined, /a/)).toBe(false);
  });

  it('should return false for a string that does not match a regular expression string', function() {
    expect(v.matches('pacific ocean', 'sea')).toBe(false);
    expect(v.matches('pacific ocean', '^atlantic ocean$')).toBe(false);
    expect(v.matches('pacific ocean', 'PACIFIC')).toBe(false);
    expect(v.matches('pacific ocean', '\\n')).toBe(false);
    expect(v.matches(undefined, 's')).toBe(false);
  });

  it('should return false for a null or undefined pattern', function() {
    expect(v.matches('pacific ocean', undefined)).toBe(false);
    expect(v.matches('pacific ocean', null)).toBe(false);
  });
});
