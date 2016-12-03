import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('countGraphemes', function() {

  it('should return the number of characters in a string', function() {
    expect(v.countGraphemes('rain')).to.be.equal(4);
    expect(v.countGraphemes('')).to.be.equal(0);
    expect(v.countGraphemes('rainbow')).to.be.equal(7);
    expect(v.countGraphemes('\u00E9\u20DD')).to.be.equal(1);
    expect(v.countGraphemes('\uD835\uDC00\uD835\uDC01')).to.be.equal(2);
    expect(v.countGraphemes('man\u0303ana')).to.be.equal(6);
    expect(v.countGraphemes('cafe\u0301')).to.be.equal(4);
    expect(v.countGraphemes('foo\u0303\u035C\u035D\u035Ebar')).to.be.equal(6);
    expect(v.countGraphemes('foo\uD834\uDF06\u0303\u035C\u035D\u035Ebar')).to.be.equal(7);
    expect(v.countGraphemes(PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII.length);
  });

  it('should return the number of characters in a number', function() {
    expect(v.countGraphemes(123)).to.be.equal(3);
    expect(v.countGraphemes(0)).to.be.equal(1);
    expect(v.countGraphemes(-1.5)).to.be.equal(4);
  });

  it('should return the number of characters in a string representation of an object', function() {
    expect(v.countGraphemes(['droplet'])).to.be.equal(7);
    expect(v.countGraphemes({
      toString: function() {
        return 'rainfall';
      }
    })).to.be.equal(8);
  });

  it('should return zero for undefined or null', function() {
    expect(v.countGraphemes()).to.be.equal(0);
    expect(v.countGraphemes(null)).to.be.equal(0);
    expect(v.countGraphemes(undefined)).to.be.equal(0);
  });

});