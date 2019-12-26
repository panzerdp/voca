import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('countSubstrings', function() {
  it('should return the number of substring appearances in a string', function() {
    expect(v.countSubstrings("Hey man where-where-where's your cup holder?", 'where')).toBe(3);
    expect(v.countSubstrings('And some Skittles', 'Skittles')).toBe(1);
    expect(v.countSubstrings('And some Skittles', 'chocolate')).toBe(0);
    expect(v.countSubstrings('******', '*')).toBe(6);
    expect(v.countSubstrings('*******', '**')).toBe(3);
    expect(v.countSubstrings('*******', '**-')).toBe(0);
    expect(v.countSubstrings('*******', '***')).toBe(2);
    expect(v.countSubstrings('*******', '****')).toBe(1);
    expect(v.countSubstrings('*******', '********')).toBe(0);
    expect(v.countSubstrings('*-*-*', '**')).toBe(0);
    expect(v.countSubstrings('', '')).toBe(0);
    expect(v.countSubstrings(PRINTABLE_ASCII, '#')).toBe(1);
  });

  it('should return the number of appearances of a number in a number', function() {
    expect(v.countSubstrings(111222, 1)).toBe(3);
    expect(v.countSubstrings(0, 0)).toBe(1);
    expect(v.countSubstrings(15, 16)).toBe(0);
  });

  it('should return the number of substring appearances in a string representation of an object', function() {
    expect(v.countSubstrings(['where-where-where'], 'where')).toBe(3);
    expect(
      v.countSubstrings(
        {
          toString: function() {
            return 'where-where-where';
          },
        },
        'where'
      )
    ).toBe(3);
  });

  it('should return zero for undefined or null', function() {
    expect(v.countSubstrings()).toBe(0);
    expect(v.countSubstrings(undefined)).toBe(0);
    expect(v.countSubstrings(null)).toBe(0);
    expect(v.countSubstrings(undefined, undefined)).toBe(0);
    expect(v.countSubstrings(null, null)).toBe(0);
  });
});
