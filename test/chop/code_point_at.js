import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('codePointAt', function() {
  it('should return the code pount number by position', function() {
    expect(v.codePointAt('Good day', 0)).toBe(0x0047);
    expect(v.codePointAt('Good day', 1)).toBe(0x006f);
    expect(v.codePointAt('Good day', 7)).toBe(0x0079);
    expect(v.codePointAt(PRINTABLE_ASCII, 0)).toBe(0x0020);
    expect(v.codePointAt('man\u0303ana', 2)).toBe(0x006e);
    expect(v.codePointAt('\u00E9\u20DD', 0)).toBe(0x00e9);
    expect(v.codePointAt('\uD835\uDC00\uD835\uDC01', 0)).toBe(0x1d400);
    expect(v.codePointAt('\uD835\uDC00\uD835\uDC01', 1)).toBe(0xdc00);
    expect(v.codePointAt('\uD835\uDC00\uD835\uDC01', 2)).toBe(0x1d401);
    expect(v.codePointAt('\uD835\uDC00\uD835\uDC01', 3)).toBe(0xdc01);
    expect(v.codePointAt('cafe\u0301', 3)).toBe(0x0065);
    expect(v.codePointAt('cafe\u0301', 4)).toBe(0x0301);
    expect(v.codePointAt('foo\u0303\u035C\u035D\u035Ebar', 2)).toBe(0x006f);
    expect(
      v.codePointAt(
        'foo\uD834\uDF06\u0303\u035C\u035D\u035Ebar\uD834\uDF06\u0303\u035C\u035D',
        3
      )
    ).toBe(0x1d306);
    expect(
      v.codePointAt(
        'foo\uD834\uDF06\u0303\u035C\u035D\u035Ebar\uD834\uDF06\u0303\u035C\u035D',
        12
      )
    ).toBe(0x1d306);
    expect(
      v.codePointAt(
        'foo\uD834\uDF06\u0303\u035C\u035D\u035Ebar\uD834\uDF06\u0303\u035C\u035D',
        13
      )
    ).toBe(0xdf06);
    expect(v.codePointAt('Good day')).toBe(0x0047);
    expect(v.codePointAt('Good day', undefined)).toBe(0x0047);
    expect(v.codePointAt('Good day', null)).toBe(0x0047);
    expect(v.codePointAt('Good day', NaN)).toBe(0x0047);
    expect(v.codePointAt(String.fromCharCode(0xd835) + '0', 0)).toBe(0xd835);
  });

  it('should return undefined for out of bounds position', function() {
    expect(v.codePointAt('Good day', -1)).toBe(undefined);
    expect(v.codePointAt('Good day', 100)).toBe(undefined);
    expect(v.codePointAt('cafe\u0301', 5)).toBe(undefined);
    expect(v.codePointAt('\uD835\uDC00\uD835\uDC01', 4)).toBe(undefined);
    expect(v.codePointAt('', 0)).toBe(undefined);
  });

  it('should return the code point number by position in a string representation of an object', function() {
    expect(v.codePointAt(['Good evening'], 5)).toBe(0x0065);
    expect(
      v.codePointAt(
        {
          toString: function() {
            return 'Morning';
          }
        },
        1
      )
    ).toBe(0x006f);
  });

  it('should return undefined for null or undefined', function() {
    expect(v.codePointAt()).toBe(undefined);
    expect(v.codePointAt(undefined)).toBe(undefined);
    expect(v.codePointAt(null)).toBe(undefined);
    expect(v.codePointAt(null, null)).toBe(undefined);
    expect(v.codePointAt(undefined, undefined)).toBe(undefined);
  });
});
