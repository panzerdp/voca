import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('lastIndexOf', function() {

  it('should return the index of a searched string', function() {
    expect(v.lastIndexOf('we have a mission', 'mission')).to.be.equal(10);
    expect(v.lastIndexOf('we have a mission', 'a')).to.be.equal(8);
    expect(v.lastIndexOf('we have a mission', 'we')).to.be.equal(0);
    expect(v.lastIndexOf('we have a mission', '')).to.be.equal(17);
    expect(v.lastIndexOf('', '')).to.be.equal(0);
    expect(v.lastIndexOf(undefined, '')).to.be.equal(0);
    expect(v.lastIndexOf(null, '')).to.be.equal(0);
    expect(v.lastIndexOf(PRINTABLE_ASCII, '!')).to.be.equal(1);
  });

  it('should return the index of a searched string and start index', function() {
    expect(v.lastIndexOf('we have a mission', 'a', 17)).to.be.equal(8);
    expect(v.lastIndexOf('we have a mission', 'a', 6)).to.be.equal(4);
    expect(v.lastIndexOf('we have a mission', 'we', 15)).to.be.equal(0);
    expect(v.lastIndexOf('we have a mission', 'we', 17)).to.be.equal(0);
    expect(v.lastIndexOf('we have a mission', '', 1)).to.be.equal(1);
    expect(v.lastIndexOf(PRINTABLE_ASCII, '#', PRINTABLE_ASCII.length - 3)).to.be.equal(3);
  });

  it('should return the index of a searched string in a string representation of an object', function() {
    expect(v.lastIndexOf(['we have a mission'], 'a')).to.be.equal(8);
    expect(v.lastIndexOf({
      toString: function() {
        return 'we have a mission';
      }
    }, 'we')).to.be.equal(0);
  });

  it('should return -1 for an invalid ending string and position', function() {
    expect(v.lastIndexOf('we have a mission', 'me')).to.be.equal(-1);
    expect(v.lastIndexOf('we have a mission', '12')).to.be.equal(-1);
    expect(v.lastIndexOf('we have a mission', 'mission', -100)).to.be.equal(-1);
    expect(v.lastIndexOf('we have a mission', 'mission', -Infinity)).to.be.equal(-1);
    expect(v.lastIndexOf('', 'me')).to.be.equal(-1);
  });

  it('should return -1 for undefined and null parameters', function() {
    expect(v.lastIndexOf('we have a mission')).to.be.equal(-1);
    expect(v.lastIndexOf('we have a mission', undefined)).to.be.equal(-1);
    expect(v.lastIndexOf('we have a mission', null)).to.be.equal(-1);
  });

});