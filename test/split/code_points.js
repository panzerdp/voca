import v from '../voca';

describe('codePoints', function() {
  it('should split a string into code point numbers', function() {
    expect(v.codePoints('stellar bomb')).toEqual([
      0x73,
      0x74,
      0x65,
      0x6c,
      0x6c,
      0x61,
      0x72,
      0x20,
      0x62,
      0x6f,
      0x6d,
      0x62,
    ]);
    expect(v.codePoints('   ')).toEqual([0x20, 0x20, 0x20]);
    expect(v.codePoints('\n\t')).toEqual([0xa, 0x9]);
    expect(v.codePoints('')).toEqual([]);
  });

  it('should split a string with surrogate pairs and diacritical marks characters into code point numbers', function() {
    expect(v.codePoints('man\u0303ana')).toEqual([0x6d, 0x61, 0x6e, 0x303, 0x61, 0x6e, 0x61]);
    expect(v.codePoints('\u00E9\u20DD')).toEqual([0xe9, 0x20dd]);
    expect(v.codePoints('\uD835\uDC00\uD835\uDC01')).toEqual([0x1d400, 0x1d401]);
    expect(v.codePoints('cafe\u0301')).toEqual([0x63, 0x61, 0x66, 0x65, 0x301]);
    expect(v.codePoints('foo\u0303\u035C\u035D\u035Ebar')).toEqual([
      0x66,
      0x6f,
      0x6f,
      0x303,
      0x35c,
      0x35d,
      0x35e,
      0x62,
      0x61,
      0x72,
    ]);
    expect(v.codePoints('foo\uD834\uDF06\u0303\u035C\u035D\u035Ebar')).toEqual([
      0x66,
      0x6f,
      0x6f,
      0x1d306,
      0x303,
      0x35c,
      0x35d,
      0x35e,
      0x62,
      0x61,
      0x72,
    ]);
  });

  it('should split a number into code point numbers', function() {
    expect(v.codePoints(0)).toEqual([0x30]);
    expect(v.codePoints(1560)).toEqual([0x31, 0x35, 0x36, 0x30]);
    expect(v.codePoints(-1.6)).toEqual([0x2d, 0x31, 0x2e, 0x36]);
  });

  it('should split the string representation of an object into code point numbers', function() {
    expect(v.codePoints(['star'])).toEqual([0x73, 0x74, 0x61, 0x72]);
    expect(
      v.codePoints({
        toString: function() {
          return 'Capa';
        },
      })
    ).toEqual([0x43, 0x61, 0x70, 0x61]);
  });

  it('should return an empty array for null and undefined', function() {
    expect(v.codePoints()).toEqual([]);
    expect(v.codePoints(undefined)).toEqual([]);
    expect(v.codePoints(null)).toEqual([]);
  });
});
