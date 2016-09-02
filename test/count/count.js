import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('count', function() {

  it('should return the number of characters in a string', function() {
    expect(v.count('rain')).to.be.equal(4);
    expect(v.count('')).to.be.equal(0);
    expect(v.count('rainbow')).to.be.equal(7);
    expect(v.count(PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII.length);
  });

  it('should return the number of characters in a number', function() {
    expect(v.count(123)).to.be.equal(3);
    expect(v.count(0)).to.be.equal(1);
    expect(v.count(-1.5)).to.be.equal(4);
  });

  it('should return the number of characters in a string representation of an object', function() {
    expect(v.count(['droplet'])).to.be.equal(7);
    expect(v.count({
      toString: function() {
        return 'rainfall';
      }
    })).to.be.equal(8);
  });

  it('should return zero for undefined or null', function() {
    expect(v.count()).to.be.equal(0);
    expect(v.count(null)).to.be.equal(0);
    expect(v.count(undefined)).to.be.equal(0);
  });

});