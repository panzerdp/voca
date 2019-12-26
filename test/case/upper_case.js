
import v from '../voca';

describe('upperCase', function() {

  it('should return the upper case of a string', function() {
    expect(v.upperCase('Saturn')).toBe('SATURN');
    expect(v.upperCase('Earth')).toBe('EARTH');
    expect(v.upperCase('456')).toBe('456');
    expect(v.upperCase('')).toBe('');
  });

  it('should return the upper case of a string representation of an object', function() {
    expect(v.upperCase(['Venus'])).toBe('VENUS');
    expect(v.upperCase({
      toString: function() {
        return 'Venus';
      }
    })).toBe('VENUS');
  });

  it('should return empty string for null or undefined', function() {
    expect(v.upperCase()).toBe('');
    expect(v.upperCase(undefined)).toBe('');
    expect(v.upperCase(null)).toBe('');
  });

});