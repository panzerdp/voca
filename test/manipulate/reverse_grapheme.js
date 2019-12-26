import { PRINTABLE_ASCII, REVERSED_PRINTABLE_ASCII } from '../const';

import v from '../voca';

describe('reverseGrapheme', function() {
  it('should reverse a string', function() {
    expect(v.reverseGrapheme('green tree')).toBe('eert neerg');
    expect(v.reverseGrapheme('ma\xF1ana')).toBe('ana\xF1am');
    expect(v.reverseGrapheme('man\u0303ana')).toBe('anan\u0303am');
    expect(v.reverseGrapheme('foo\u0303\u035C\u035D\u035Ebar')).toBe('rabo\u0303\u035C\u035D\u035Eof');
    expect(v.reverseGrapheme('foo\uD834\uDF06\u0303\u035C\u035D\u035Ebar')).toBe(
      'rab\uD834\uDF06\u0303\u035C\u035D\u035Eoof'
    );
    expect(v.reverseGrapheme('o')).toBe('o');
    expect(v.reverseGrapheme('\n\t')).toBe('\t\n');
    expect(v.reverseGrapheme('')).toBe('');
    expect(v.reverseGrapheme(PRINTABLE_ASCII)).toBe(REVERSED_PRINTABLE_ASCII);
  });

  it('should reverseCodePoint a number', function() {
    expect(v.reverseGrapheme(123)).toBe('321');
    expect(v.reverseGrapheme(0)).toBe('0');
    expect(v.reverseGrapheme(-1.5)).toBe('5.1-');
  });

  it('should reverseCodePoint a string representation of an object', function() {
    expect(v.reverseGrapheme(['flower'])).toBe('rewolf');
    expect(
      v.reverseGrapheme({
        toString: function() {
          return 'flower';
        },
      })
    ).toBe('rewolf');
  });

  it('should return an empty string for null or undefined', function() {
    expect(v.reverseGrapheme()).toBe('');
    expect(v.reverseGrapheme(null)).toBe('');
    expect(v.reverseGrapheme(undefined)).toBe('');
  });
});
