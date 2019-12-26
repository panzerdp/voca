import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('graphemeAt', function() {
  it('should return the grapheme by index', function() {
    expect(v.graphemeAt('Good day', 0)).toBe('G');
    expect(v.graphemeAt('Good day', 1)).toBe('o');
    expect(v.graphemeAt('Good day', 7)).toBe('y');
    expect(v.graphemeAt(PRINTABLE_ASCII, 0)).toBe(' ');
    expect(v.graphemeAt('man\u0303ana', 2)).toBe('n\u0303');
    expect(v.graphemeAt('\u00E9\u20DD', 0)).toBe('\u00E9\u20DD');
    expect(v.graphemeAt('\uD835\uDC00\uD835\uDC01', 1)).toBe('\uD835\uDC01');
    expect(v.graphemeAt('cafe\u0301', 3)).toBe('e\u0301');
    expect(v.graphemeAt('foo\u0303\u035C\u035D\u035Ebar', 2)).toBe('o\u0303\u035C\u035D\u035E');
    expect(v.graphemeAt('foo\uD834\uDF06\u0303\u035C\u035D\u035Ebar\uD834\uDF06\u0303\u035C\u035D', 3)).toBe(
      '\uD834\uDF06\u0303\u035C\u035D\u035E'
    );
    expect(v.graphemeAt('foo\uD834\uDF06\u0303\u035C\u035D\u035Ebar\uD834\uDF06\u0303\u035C\u035D', 7)).toBe(
      '\uD834\uDF06\u0303\u035C\u035D'
    );
    expect(v.graphemeAt('', 0)).toBe('');
    expect(v.graphemeAt('Good day')).toBe('G');
    expect(v.graphemeAt('Good day', undefined)).toBe('G');
    expect(v.graphemeAt('Good day', null)).toBe('G');
    expect(v.graphemeAt('Good day', NaN)).toBe('G');
  });

  it('should return an empty string for out of bounds index', function() {
    expect(v.graphemeAt('Good day', -1)).toBe('');
    expect(v.graphemeAt('Good day', 100)).toBe('');
    expect(v.graphemeAt('cafe\u0301', 4)).toBe('');
  });

  it('should return the grapheme by index of a string representation of an object', function() {
    expect(v.graphemeAt(['Good evening'], 5)).toBe('e');
    expect(
      v.graphemeAt(
        {
          toString: function() {
            return 'Morning';
          },
        },
        1
      )
    ).toBe('o');
  });

  it('should return an empty string for null or undefined', function() {
    expect(v.graphemeAt()).toBe('');
    expect(v.graphemeAt(undefined)).toBe('');
    expect(v.graphemeAt(null)).toBe('');
    expect(v.graphemeAt(null, null)).toBe('');
    expect(v.graphemeAt(undefined, undefined)).toBe('');
  });
});
