import v from '../voca';
import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';

describe('countCodePoint', function() {

  it('should return the number of characters in a string', function() {
    expect(v.countCodePoint('rain')).to.be.equal(4);
    expect(v.countCodePoint('')).to.be.equal(0);
    expect(v.countCodePoint('rainbow')).to.be.equal(7);
    expect(v.countCodePoint('\u00E9\u20DD')).to.be.equal(1);
    expect(v.countCodePoint('\uD835\uDC00\uD835\uDC01')).to.be.equal(2);
    expect(v.countCodePoint('man\u0303ana')).to.be.equal(6);
    expect(v.countCodePoint('cafe\u0301')).to.be.equal(4);
    expect(v.countCodePoint('foo\u0303\u035C\u035D\u035Ebar')).to.be.equal(6);
    expect(v.countCodePoint('foo\uD834\uDF06\u0303\u035C\u035D\u035Ebar')).to.be.equal(7);
    expect(v.countCodePoint(PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII.length);
  });

  it('should return the number of characters in a number', function() {
    expect(v.countCodePoint(123)).to.be.equal(3);
    expect(v.countCodePoint(0)).to.be.equal(1);
    expect(v.countCodePoint(-1.5)).to.be.equal(4);
  });

  it('should return the number of characters in a string representation of an object', function() {
    expect(v.countCodePoint(['droplet'])).to.be.equal(7);
    expect(v.countCodePoint({
      toString: function() {
        return 'rainfall';
      }
    })).to.be.equal(8);
  });

  it('should return zero for undefined or null', function() {
    expect(v.countCodePoint()).to.be.equal(0);
    expect(v.countCodePoint(null)).to.be.equal(0);
    expect(v.countCodePoint(undefined)).to.be.equal(0);
  });

});