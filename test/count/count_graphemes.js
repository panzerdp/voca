
import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('countGraphemes', function() {

  it('should return the number of characters in a string', function() {
    expect(v.countGraphemes('rain')).toBe(4);
    expect(v.countGraphemes('')).toBe(0);
    expect(v.countGraphemes('rainbow')).toBe(7);
    expect(v.countGraphemes('\u00E9\u20DD')).toBe(1);
    expect(v.countGraphemes('\uD835\uDC00\uD835\uDC01')).toBe(2);
    expect(v.countGraphemes('man\u0303ana')).toBe(6);
    expect(v.countGraphemes('cafe\u0301')).toBe(4);
    expect(v.countGraphemes('foo\u0303\u035C\u035D\u035Ebar')).toBe(6);
    expect(v.countGraphemes('foo\uD834\uDF06\u0303\u035C\u035D\u035Ebar')).toBe(7);
    expect(v.countGraphemes(PRINTABLE_ASCII)).toBe(PRINTABLE_ASCII.length);
  });

  it('should return the number of characters in a number', function() {
    expect(v.countGraphemes(123)).toBe(3);
    expect(v.countGraphemes(0)).toBe(1);
    expect(v.countGraphemes(-1.5)).toBe(4);
  });

  it('should return the number of characters in a string representation of an object', function() {
    expect(v.countGraphemes(['droplet'])).toBe(7);
    expect(v.countGraphemes({
      toString: function() {
        return 'rainfall';
      }
    })).toBe(8);
  });

  it('should return zero for undefined or null', function() {
    expect(v.countGraphemes()).toBe(0);
    expect(v.countGraphemes(null)).toBe(0);
    expect(v.countGraphemes(undefined)).toBe(0);
  });

});