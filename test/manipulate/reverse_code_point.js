import v from '../voca'
import { expect } from 'chai'

describe('reverse', function() {

  it('should reverse a string', function() {
    expect(v.reverse('green tree')).to.be.equal('eert neerg');
    expect(v.reverse('ma\xF1ana')).to.be.equal('ana\xF1am');
    expect(v.reverse('man\u0303ana')).to.be.equal('anan\u0303am');
    expect(v.reverse('foo\u0303\u035C\u035D\u035Ebar')).to.be.equal('rabo\u0303\u035C\u035D\u035Eof');
    expect(v.reverse('o')).to.be.equal('o');
    expect(v.reverse('\n\t')).to.be.equal('\t\n');
    expect(v.reverse('')).to.be.equal('');
  });

  it('should reverse a number', function() {
    expect(v.reverse(123)).to.be.equal('321');
    expect(v.reverse(0)).to.be.equal('0');
    expect(v.reverse(-1.5)).to.be.equal('5.1-');
  });

  it('should reverse a string representation of an object', function() {
    expect(v.reverse(['flower'])).to.be.equal('rewolf');
    expect(v.reverse({
      toString: function() {
        return 'flower';
      }
    })).to.be.equal('rewolf');
  });

  it('should return an empty string for null or undefined', function() {
    expect(v.reverse()).to.be.equal('');
    expect(v.reverse(null)).to.be.equal('');
    expect(v.reverse(undefined)).to.be.equal('');
  });

});