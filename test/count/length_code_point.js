import v from '../voca';
import { expect } from 'chai';

describe('lengthCodePoint', function() {

  it('should return the number of characters in a string', function() {
    expect(v.lengthCodePoint('rain')).to.be.equal(4);
    expect(v.lengthCodePoint('')).to.be.equal(0);
    expect(v.lengthCodePoint('rainbow')).to.be.equal(7);
    expect(v.lengthCodePoint('\u00E9\u20DD')).to.be.equal(1);
    expect(v.lengthCodePoint('\uD835\uDC00\uD835\uDC01')).to.be.equal(2);
    expect(v.lengthCodePoint('man\u0303ana')).to.be.equal(6);
    expect(v.lengthCodePoint('cafe\u0301')).to.be.equal(4);
    expect(v.lengthCodePoint('foo\u0303\u035C\u035D\u035Ebar')).to.be.equal(6);
    expect(v.lengthCodePoint('foo\uD834\uDF06\u0303\u035C\u035D\u035Ebar')).to.be.equal(7);
  });

  it('should return the number of characters in a number', function() {
    expect(v.lengthCodePoint(123)).to.be.equal(3);
    expect(v.lengthCodePoint(0)).to.be.equal(1);
    expect(v.lengthCodePoint(-1.5)).to.be.equal(4);
  });

  it('should return the number of characters in a string representation of an object', function() {
    expect(v.lengthCodePoint(['droplet'])).to.be.equal(7);
    expect(v.lengthCodePoint({
      toString: function() {
        return 'rainfall';
      }
    })).to.be.equal(8);
  });

  it('should return zero for undefined or null', function() {
    expect(v.lengthCodePoint()).to.be.equal(0);
    expect(v.lengthCodePoint(null)).to.be.equal(0);
    expect(v.lengthCodePoint(undefined)).to.be.equal(0);
  });

});