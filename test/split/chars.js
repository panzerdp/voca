import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('chars', function() {
  it('should split a string into characters', function() {
    expect(v.chars('stellar bomb')).toEqual(['s', 't', 'e', 'l', 'l', 'a', 'r', ' ', 'b', 'o', 'm', 'b']);
    expect(v.chars('   ')).toEqual([' ', ' ', ' ']);
    expect(v.chars('\n\t')).toEqual(['\n', '\t']);
    expect(v.chars('')).toEqual([]);
    expect(v.chars(PRINTABLE_ASCII)).toEqual(Array.prototype.slice.call(PRINTABLE_ASCII, 0));
  });

  it('should split a number into characters', function() {
    expect(v.chars(0)).toEqual(['0']);
    expect(v.chars(1560)).toEqual(['1', '5', '6', '0']);
    expect(v.chars(-1.6)).toEqual(['-', '1', '.', '6']);
  });

  it('should split the string representation of an object', function() {
    expect(v.chars(['star'])).toEqual(['s', 't', 'a', 'r']);
    expect(
      v.chars({
        toString: function() {
          return 'Capa';
        },
      })
    ).toEqual(['C', 'a', 'p', 'a']);
  });

  it('should return an empty array of characters for null and undefined', function() {
    expect(v.chars()).toEqual([]);
    expect(v.chars(undefined)).toEqual([]);
    expect(v.chars(null)).toEqual([]);
  });
});
