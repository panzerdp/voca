import v from '../voca';
import { expect } from 'chai';
import { PRINTABLE_ASCII, REVERSED_PRINTABLE_ASCII } from '../utilities/string/ascii';

describe('reverseCodePoint', function() {

  it('should reverse a string', function() {
    expect(v.reverseCodePoint('green tree')).to.be.equal('eert neerg');
    expect(v.reverseCodePoint('ma\xF1ana')).to.be.equal('ana\xF1am');
    expect(v.reverseCodePoint('man\u0303ana')).to.be.equal('anan\u0303am');
    expect(v.reverseCodePoint('foo\u0303\u035C\u035D\u035Ebar')).to.be.equal('rabo\u0303\u035C\u035D\u035Eof');
    expect(v.reverseCodePoint('foo\uD834\uDF06\u0303\u035C\u035D\u035Ebar')).to.be.equal('rab\uD834\uDF06\u0303\u035C\u035D\u035Eoof');
    expect(v.reverseCodePoint('o')).to.be.equal('o');
    expect(v.reverseCodePoint('\n\t')).to.be.equal('\t\n');
    expect(v.reverseCodePoint('')).to.be.equal('');
    expect(v.reverseCodePoint(PRINTABLE_ASCII)).to.be.equal(REVERSED_PRINTABLE_ASCII);
  });

  it('should reverseCodePoint a number', function() {
    expect(v.reverseCodePoint(123)).to.be.equal('321');
    expect(v.reverseCodePoint(0)).to.be.equal('0');
    expect(v.reverseCodePoint(-1.5)).to.be.equal('5.1-');
  });

  it('should reverseCodePoint a string representation of an object', function() {
    expect(v.reverseCodePoint(['flower'])).to.be.equal('rewolf');
    expect(v.reverseCodePoint({
      toString: function() {
        return 'flower';
      }
    })).to.be.equal('rewolf');
  });

  it('should return an empty string for null or undefined', function() {
    expect(v.reverseCodePoint()).to.be.equal('');
    expect(v.reverseCodePoint(null)).to.be.equal('');
    expect(v.reverseCodePoint(undefined)).to.be.equal('');
  });

});