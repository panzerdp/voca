import v from '../voca';
import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../utilities/string/ascii';

describe('charsCodePoint', function() {

  it('should split a string into characters', function() {
    expect(v.charsCodePoint('stellar bomb')).to.eql(['s', 't', 'e', 'l', 'l', 'a', 'r', ' ', 'b', 'o', 'm', 'b']);
    expect(v.charsCodePoint('   ')).to.eql([' ', ' ', ' ']);
    expect(v.charsCodePoint('\n\t')).to.eql(['\n', '\t']);
    expect(v.charsCodePoint('')).to.eql([]);
    expect(v.charsCodePoint(PRINTABLE_ASCII)).to.eql(Array.prototype.slice.call(PRINTABLE_ASCII, 0));
  });

  it('should split a string into surrogate pairs and diacritical marks characters', function() {
    expect(v.charsCodePoint('man\u0303ana')).to.eql(['m', 'a', 'n\u0303', 'a', 'n', 'a']);
    expect(v.charsCodePoint('\u00E9\u20DD')).to.eql(['\u00E9\u20DD']);
    expect(v.charsCodePoint('\uD835\uDC00\uD835\uDC01')).to.eql(['\uD835\uDC00', '\uD835\uDC01']);
    expect(v.charsCodePoint('cafe\u0301')).to.eql(['c', 'a', 'f', 'e\u0301']);
    expect(v.charsCodePoint('foo\u0303\u035C\u035D\u035Ebar')).to.eql(['f', 'o', 'o\u0303\u035C\u035D\u035E', 'b', 'a', 'r']);
    expect(v.charsCodePoint('foo\uD834\uDF06\u0303\u035C\u035D\u035Ebar')).to.eql(['f', 'o', 'o', '\uD834\uDF06\u0303\u035C\u035D\u035E', 'b', 'a', 'r']);
  });

  it('should split a number into characters', function() {
    expect(v.charsCodePoint(0)).to.eql(['0']);
    expect(v.charsCodePoint(1560)).to.eql(['1', '5', '6', '0']);
    expect(v.charsCodePoint(-1.6)).to.eql(['-', '1', '.', '6']);
  });

  it('should split the string representation of an object', function() {
    expect(v.charsCodePoint(['star'])).to.eql(['s', 't', 'a', 'r']);
    expect(v.charsCodePoint({
      toString: function() {
        return 'Capa';
      }
    })).to.eql(['C', 'a', 'p', 'a']);
  });


  it('should return an empty array of characters for null and undefined', function() {
    expect(v.charsCodePoint()).to.eql([]);
    expect(v.charsCodePoint(undefined)).to.eql([]);
    expect(v.charsCodePoint(null)).to.eql([]);
  });

});