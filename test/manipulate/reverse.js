import { PRINTABLE_ASCII, REVERSED_PRINTABLE_ASCII } from '../const';

import v from '../voca';

describe('reverse', function() {
  it('should reverse a string', function() {
    expect(v.reverse('green tree')).toBe('eert neerg');
    expect(v.reverse('o')).toBe('o');
    expect(v.reverse('\n\t')).toBe('\t\n');
    expect(v.reverse('')).toBe('');
    expect(v.reverse(PRINTABLE_ASCII)).toBe(REVERSED_PRINTABLE_ASCII);
  });

  it('should reverse a number', function() {
    expect(v.reverse(123)).toBe('321');
    expect(v.reverse(0)).toBe('0');
    expect(v.reverse(-1.5)).toBe('5.1-');
  });

  it('should reverse a string representation of an object', function() {
    expect(v.reverse(['flower'])).toBe('rewolf');
    expect(
      v.reverse({
        toString: function() {
          return 'flower';
        },
      })
    ).toBe('rewolf');
  });

  it('should return an empty string for null or undefined', function() {
    expect(v.reverse()).toBe('');
    expect(v.reverse(null)).toBe('');
    expect(v.reverse(undefined)).toBe('');
  });
});
