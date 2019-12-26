import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('graphemes', function() {
  it('should split a string into characters', function() {
    expect(v.graphemes('stellar bomb')).toEqual([
      's',
      't',
      'e',
      'l',
      'l',
      'a',
      'r',
      ' ',
      'b',
      'o',
      'm',
      'b'
    ]);
    expect(v.graphemes('   ')).toEqual([' ', ' ', ' ']);
    expect(v.graphemes('\n\t')).toEqual(['\n', '\t']);
    expect(v.graphemes('')).toEqual([]);
    expect(v.graphemes(PRINTABLE_ASCII)).toEqual(
      Array.prototype.slice.call(PRINTABLE_ASCII, 0)
    );
  });

  it('should split a string into surrogate pairs and diacritical marks characters', function() {
    expect(v.graphemes('man\u0303ana')).toEqual([
      'm',
      'a',
      'n\u0303',
      'a',
      'n',
      'a'
    ]);
    expect(v.graphemes('\u00E9\u20DD')).toEqual(['\u00E9\u20DD']);
    expect(v.graphemes('\uD835\uDC00\uD835\uDC01')).toEqual([
      '\uD835\uDC00',
      '\uD835\uDC01'
    ]);
    expect(v.graphemes('cafe\u0301')).toEqual(['c', 'a', 'f', 'e\u0301']);
    expect(v.graphemes('foo\u0303\u035C\u035D\u035Ebar')).toEqual([
      'f',
      'o',
      'o\u0303\u035C\u035D\u035E',
      'b',
      'a',
      'r'
    ]);
    expect(v.graphemes('foo\uD834\uDF06\u0303\u035C\u035D\u035Ebar')).toEqual([
      'f',
      'o',
      'o',
      '\uD834\uDF06\u0303\u035C\u035D\u035E',
      'b',
      'a',
      'r'
    ]);
  });

  it('should split a number into characters', function() {
    expect(v.graphemes(0)).toEqual(['0']);
    expect(v.graphemes(1560)).toEqual(['1', '5', '6', '0']);
    expect(v.graphemes(-1.6)).toEqual(['-', '1', '.', '6']);
  });

  it('should split the string representation of an object', function() {
    expect(v.graphemes(['star'])).toEqual(['s', 't', 'a', 'r']);
    expect(
      v.graphemes({
        toString: function() {
          return 'Capa';
        }
      })
    ).toEqual(['C', 'a', 'p', 'a']);
  });

  it('should return an empty array of characters for null and undefined', function() {
    expect(v.graphemes()).toEqual([]);
    expect(v.graphemes(undefined)).toEqual([]);
    expect(v.graphemes(null)).toEqual([]);
  });
});
