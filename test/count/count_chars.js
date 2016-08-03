import v from '../voca';
import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../utilities/string/ascii';

describe('countChars', function() {

  it('should return the number of characters in a string', function() {
    expect(v.countChars('rain')).to.be.equal(4);
    expect(v.countChars('')).to.be.equal(0);
    expect(v.countChars('rainbow')).to.be.equal(7);
    expect(v.countChars(PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII.length);
  });

  it('should return the number of characters in a number', function() {
    expect(v.countChars(123)).to.be.equal(3);
    expect(v.countChars(0)).to.be.equal(1);
    expect(v.countChars(-1.5)).to.be.equal(4);
  });

  it('should return the number of characters in a string representation of an object', function() {
    expect(v.countChars(['droplet'])).to.be.equal(7);
    expect(v.countChars({
      toString: function() {
        return 'rainfall';
      }
    })).to.be.equal(8);
  });

  it('should return zero for undefined or null', function() {
    expect(v.countChars()).to.be.equal(0);
    expect(v.countChars(null)).to.be.equal(0);
    expect(v.countChars(undefined)).to.be.equal(0);
  });

});