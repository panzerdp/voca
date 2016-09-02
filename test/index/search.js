import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('search', function() {

  it('should return the index of a match', function() {
    expect(v.search('we have a mission', /mission/)).to.be.equal(10);
    expect(v.search('we have a mission', 'a')).to.be.equal(4);
    expect(v.search('we have a mission', /we/)).to.be.equal(0);
    expect(v.search('we have a mission', /\s/)).to.be.equal(2);
    expect(v.search('we have a mission', '')).to.be.equal(0);
    expect(v.search('', '')).to.be.equal(0);
    expect(v.search(undefined, '')).to.be.equal(0);
    expect(v.search(null, '')).to.be.equal(0);
    expect(v.search(PRINTABLE_ASCII, '!')).to.be.equal(1);
  });

  it('should return the index of a match and start index', function() {
    expect(v.search('we have a mission', /a/, 6)).to.be.equal(8);
    expect(v.search('we have a mission', /we/, 0)).to.be.equal(0);
    expect(v.search('we have a mission', 'we', NaN)).to.be.equal(0);
    expect(v.search('we have a mission', '', 0)).to.be.equal(0);
    expect(v.search(PRINTABLE_ASCII, '#', 3)).to.be.equal(3);
  });

  it('should return the index of a searched string in a string representation of an object', function() {
    expect(v.search(['we have a mission'], /a/)).to.be.equal(4);
    expect(v.search({
      toString: function() {
        return 'we have a mission';
      }
    }, /we/)).to.be.equal(0);
  });

  it('should threat a null value as "null" match pattern', function() {
    expect(v.search('we have a null mission', null)).to.be.equal(10);
    expect(v.search('we have a mission', null)).to.be.equal(-1);
  });

  it('should return -1 for an invalid ending string and position', function() {
    expect(v.search('we have a mission', /me/)).to.be.equal(-1);
    expect(v.search('we have a mission', /12/)).to.be.equal(-1);
    expect(v.search('we have a mission', /\s^/)).to.be.equal(-1);
    expect(v.search('we have a mission', 'we', 3)).to.be.equal(-1);
    expect(v.search('we have a mission', /mission/, 100)).to.be.equal(-1);
    expect(v.search('we have a mission', /mission/, Infinity)).to.be.equal(-1);
    expect(v.search('', /me/)).to.be.equal(-1);
  });

  it('should return 0 for an undefined', function() {
    expect(v.search('we have a mission')).to.be.equal(0);
    expect(v.search('we have a mission', undefined)).to.be.equal(0);
  });

});