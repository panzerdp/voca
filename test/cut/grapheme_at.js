import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('graphemeAt', function() {

  it('should return the grapheme by index', function() {
    expect(v.graphemeAt('Good day', 0)).to.be.equal('G');
    expect(v.graphemeAt('Good day', 1)).to.be.equal('o');
    expect(v.graphemeAt('Good day', 7)).to.be.equal('y');
    expect(v.graphemeAt(PRINTABLE_ASCII, 0)).to.be.equal(' ');
    expect(v.graphemeAt('man\u0303ana', 2)).to.equal('n\u0303');
    expect(v.graphemeAt('\u00E9\u20DD', 0)).to.equal('\u00E9\u20DD');
    expect(v.graphemeAt('\uD835\uDC00\uD835\uDC01', 1)).to.equal('\uD835\uDC01');
    expect(v.graphemeAt('cafe\u0301', 3)).to.equal('e\u0301');
    expect(v.graphemeAt('foo\u0303\u035C\u035D\u035Ebar', 2)).to.equal('o\u0303\u035C\u035D\u035E');
    expect(v.graphemeAt('foo\uD834\uDF06\u0303\u035C\u035D\u035Ebar\uD834\uDF06\u0303\u035C\u035D', 3))
      .to.equal('\uD834\uDF06\u0303\u035C\u035D\u035E');
    expect(v.graphemeAt('foo\uD834\uDF06\u0303\u035C\u035D\u035Ebar\uD834\uDF06\u0303\u035C\u035D', 7))
      .to.equal('\uD834\uDF06\u0303\u035C\u035D');
    expect(v.graphemeAt('', 0)).to.be.equal('');
    expect(v.graphemeAt('Good day')).to.be.equal('G');
    expect(v.graphemeAt('Good day', undefined)).to.be.equal('G');
    expect(v.graphemeAt('Good day', null)).to.be.equal('G');
    expect(v.graphemeAt('Good day', NaN)).to.be.equal('G');
  });

  it('should return an empty string for out of bounds index', function() {
    expect(v.graphemeAt('Good day', -1)).to.be.equal('');
    expect(v.graphemeAt('Good day', 100)).to.be.equal('');
    expect(v.graphemeAt('cafe\u0301', 4)).to.be.equal('');
  });

  it('should return the grapheme by index of a string representation of an object', function() {
    expect(v.graphemeAt(['Good evening'], 5)).to.be.equal('e');
    expect(v.graphemeAt({
      toString: function() {
        return 'Morning';
      }
    }, 1)).to.be.equal('o');
  });

  it('should return an empty string for null or undefined', function() {
    expect(v.graphemeAt()).to.be.equal('');
    expect(v.graphemeAt(undefined)).to.be.equal('');
    expect(v.graphemeAt(null)).to.be.equal('');
    expect(v.graphemeAt(null, null)).to.be.equal('');
    expect(v.graphemeAt(undefined, undefined)).to.be.equal('');
  });

});