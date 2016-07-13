import v from '../voca';
import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../utilities/string/ascii';

describe('length', function() {

  it('should return the number of characters in a string', function() {
    expect(v.length('rain')).to.be.equal(4);
    expect(v.length('')).to.be.equal(0);
    expect(v.length('rainbow')).to.be.equal(7);
    expect(v.length(PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII.length);
  });

  it('should return the number of characters in a number', function() {
    expect(v.length(123)).to.be.equal(3);
    expect(v.length(0)).to.be.equal(1);
    expect(v.length(-1.5)).to.be.equal(4);
  });

  it('should return the number of characters in a string representation of an object', function() {
    expect(v.length(['droplet'])).to.be.equal(7);
    expect(v.length({
      toString: function() {
        return 'rainfall';
      }
    })).to.be.equal(8);
  });

  it('should return zero for undefined or null', function() {
    expect(v.length()).to.be.equal(0);
    expect(v.length(null)).to.be.equal(0);
    expect(v.length(undefined)).to.be.equal(0);
  });

});