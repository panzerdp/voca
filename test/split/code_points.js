import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('codePoints', function() {

  it('should split a string into code point numbers', function() {
    expect(v.codePoints('stellar bomb')).to.eql(['s', 't', 'e', 'l', 'l', 'a', 'r', ' ', 'b', 'o', 'm', 'b']);
    expect(v.codePoints('   ')).to.eql([' ', ' ', ' ']);
    expect(v.codePoints('\n\t')).to.eql(['\n', '\t']);
    expect(v.codePoints('')).to.eql([]);
    expect(v.codePoints(PRINTABLE_ASCII)).to.eql(Array.prototype.slice.call(PRINTABLE_ASCII, 0));
  });

  it('should split a string with surrogate pairs and diacritical marks characters into code point numbers', function() {
    expect(v.codePoints('man\u0303ana')).to.eql(['m', 'a', 'n\u0303', 'a', 'n', 'a']);
    expect(v.codePoints('\u00E9\u20DD')).to.eql(['\u00E9\u20DD']);
    expect(v.codePoints('\uD835\uDC00\uD835\uDC01')).to.eql(['\uD835\uDC00', '\uD835\uDC01']);
    expect(v.codePoints('cafe\u0301')).to.eql(['c', 'a', 'f', 'e\u0301']);
    expect(v.codePoints('foo\u0303\u035C\u035D\u035Ebar')).to.eql(['f', 'o', 'o\u0303\u035C\u035D\u035E', 'b', 'a', 'r']);
    expect(v.codePoints('foo\uD834\uDF06\u0303\u035C\u035D\u035Ebar')).to.eql(['f', 'o', 'o', '\uD834\uDF06\u0303\u035C\u035D\u035E', 'b', 'a', 'r']);
  });

  it('should split a number into code point numbers', function() {
    expect(v.codePoints(0)).to.eql(['0']);
    expect(v.codePoints(1560)).to.eql(['1', '5', '6', '0']);
    expect(v.codePoints(-1.6)).to.eql(['-', '1', '.', '6']);
  });

  it('should split the string representation of an object into code point numbers', function() {
    expect(v.codePoints(['star'])).to.eql(['s', 't', 'a', 'r']);
    expect(v.codePoints({
      toString: function() {
        return 'Capa';
      }
    })).to.eql(['C', 'a', 'p', 'a']);
  });

  it('should return an empty array for null and undefined', function() {
    expect(v.codePoints()).to.eql([]);
    expect(v.codePoints(undefined)).to.eql([]);
    expect(v.codePoints(null)).to.eql([]);
  });

});