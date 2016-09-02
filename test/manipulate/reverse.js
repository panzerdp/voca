import { PRINTABLE_ASCII, REVERSED_PRINTABLE_ASCII } from '../const';
import { expect } from 'chai';
import v from '../voca';

describe('reverse', function() {

  it('should reverse a string', function() {
    expect(v.reverse('green tree')).to.be.equal('eert neerg');
    expect(v.reverse('o')).to.be.equal('o');
    expect(v.reverse('\n\t')).to.be.equal('\t\n');
    expect(v.reverse('')).to.be.equal('');
    expect(v.reverse(PRINTABLE_ASCII)).to.be.equal(REVERSED_PRINTABLE_ASCII);
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