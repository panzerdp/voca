import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('countGrapheme', function() {

  it('should return the number of characters in a string', function() {
    expect(v.countGrapheme('rain')).to.be.equal(4);
    expect(v.countGrapheme('')).to.be.equal(0);
    expect(v.countGrapheme('rainbow')).to.be.equal(7);
    expect(v.countGrapheme('\u00E9\u20DD')).to.be.equal(1);
    expect(v.countGrapheme('\uD835\uDC00\uD835\uDC01')).to.be.equal(2);
    expect(v.countGrapheme('man\u0303ana')).to.be.equal(6);
    expect(v.countGrapheme('cafe\u0301')).to.be.equal(4);
    expect(v.countGrapheme('foo\u0303\u035C\u035D\u035Ebar')).to.be.equal(6);
    expect(v.countGrapheme('foo\uD834\uDF06\u0303\u035C\u035D\u035Ebar')).to.be.equal(7);
    expect(v.countGrapheme(PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII.length);
  });

  it('should return the number of characters in a number', function() {
    expect(v.countGrapheme(123)).to.be.equal(3);
    expect(v.countGrapheme(0)).to.be.equal(1);
    expect(v.countGrapheme(-1.5)).to.be.equal(4);
  });

  it('should return the number of characters in a string representation of an object', function() {
    expect(v.countGrapheme(['droplet'])).to.be.equal(7);
    expect(v.countGrapheme({
      toString: function() {
        return 'rainfall';
      }
    })).to.be.equal(8);
  });

  it('should return zero for undefined or null', function() {
    expect(v.countGrapheme()).to.be.equal(0);
    expect(v.countGrapheme(null)).to.be.equal(0);
    expect(v.countGrapheme(undefined)).to.be.equal(0);
  });

});