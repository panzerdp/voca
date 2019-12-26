
import v from '../voca';

describe('lowerCase', function() {

  it('should return the lower case of a string', function() {
    expect(v.lowerCase('Saturn')).toBe('saturn');
    expect(v.lowerCase('EARTH')).toBe('earth');
    expect(v.lowerCase('456')).toBe('456');
    expect(v.lowerCase('')).toBe('');
  });

  it('should return the lower case of a string representation of an object', function() {
    expect(v.lowerCase(['Venus'])).toBe('venus');
    expect(v.lowerCase({
      toString: function() {
        return 'Venus';
      }
    })).toBe('venus');
  });

  it('should return empty string for null or undefined', function() {
    expect(v.lowerCase()).toBe('');
    expect(v.lowerCase(undefined)).toBe('');
    expect(v.lowerCase(null)).toBe('');
  });

});