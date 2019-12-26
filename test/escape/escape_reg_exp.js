import v from '../voca';

describe('escapeRegExp', function() {
  it('should return the escaped string', function() {
    expect(v.escapeRegExp('-[]/{}()*+?.\\^$|')).toBe('\\-\\[\\]\\/\\{\\}\\(\\)\\*\\+\\?\\.\\\\\\^\\$\\|');
    expect(v.escapeRegExp('time')).toBe('time');
    expect(v.escapeRegExp('500-200')).toBe('500\\-200');
    expect(v.escapeRegExp('')).toBe('');
    expect(new RegExp(v.escapeRegExp('[a-z0-9]?')).test('[a-z0-9]?')).toBe(true);
    expect(new RegExp(v.escapeRegExp('.*')).test('future')).toBe(false);
  });

  it('should return the escaped string representation of an object', function() {
    expect(v.escapeRegExp(['-[]object'])).toBe('\\-\\[\\]object');
    expect(
      v.escapeRegExp({
        toString: function() {
          return '1.15';
        },
      })
    ).toBe('1\\.15');
  });

  it('should return an empty string for null or undefined', function() {
    expect(v.escapeRegExp()).toBe('');
    expect(v.escapeRegExp(undefined)).toBe('');
    expect(v.escapeRegExp(null)).toBe('');
  });
});
