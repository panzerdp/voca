import { PRINTABLE_ASCII, REVERSED_PRINTABLE_ASCII } from '../const';
import { expect } from 'chai';
import v from '../voca';

describe('reverseGrapheme', function() {

  it('should reverse a string', function() {
    expect(v.reverseGrapheme('green tree')).to.be.equal('eert neerg');
    expect(v.reverseGrapheme('ma\xF1ana')).to.be.equal('ana\xF1am');
    expect(v.reverseGrapheme('man\u0303ana')).to.be.equal('anan\u0303am');
    expect(v.reverseGrapheme('foo\u0303\u035C\u035D\u035Ebar')).to.be.equal('rabo\u0303\u035C\u035D\u035Eof');
    expect(v.reverseGrapheme('foo\uD834\uDF06\u0303\u035C\u035D\u035Ebar')).to.be.equal('rab\uD834\uDF06\u0303\u035C\u035D\u035Eoof');
    expect(v.reverseGrapheme('o')).to.be.equal('o');
    expect(v.reverseGrapheme('\n\t')).to.be.equal('\t\n');
    expect(v.reverseGrapheme('')).to.be.equal('');
    expect(v.reverseGrapheme(PRINTABLE_ASCII)).to.be.equal(REVERSED_PRINTABLE_ASCII);
  });

  it('should reverseCodePoint a number', function() {
    expect(v.reverseGrapheme(123)).to.be.equal('321');
    expect(v.reverseGrapheme(0)).to.be.equal('0');
    expect(v.reverseGrapheme(-1.5)).to.be.equal('5.1-');
  });

  it('should reverseCodePoint a string representation of an object', function() {
    expect(v.reverseGrapheme(['flower'])).to.be.equal('rewolf');
    expect(v.reverseGrapheme({
      toString: function() {
        return 'flower';
      }
    })).to.be.equal('rewolf');
  });

  it('should return an empty string for null or undefined', function() {
    expect(v.reverseGrapheme()).to.be.equal('');
    expect(v.reverseGrapheme(null)).to.be.equal('');
    expect(v.reverseGrapheme(undefined)).to.be.equal('');
  });

});