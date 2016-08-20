import v from '../voca';
import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../utilities/string/ascii';

describe('left', function() {

  it('should return the leftmost part of a string', function() {
    expect(v.left('Good day', -1)).to.be.equal('');
    expect(v.left('Good day', 0)).to.be.equal('');
    expect(v.left('Good day', 4)).to.be.equal('Good');
    expect(v.left('Good day', 1)).to.be.equal('G');
    expect(v.left('Good day', 8)).to.be.equal('Good day');
    expect(v.left('Good day', 1000)).to.be.equal('Good day');
    expect(v.left('Good day')).to.be.equal('Good day');
    expect(v.left('', 5)).to.be.equal('');
    expect(v.left('', 0)).to.be.equal('');
    expect(v.left('')).to.be.equal('');
    expect(v.left(PRINTABLE_ASCII), PRINTABLE_ASCII.length).to.be.equal(PRINTABLE_ASCII);
    expect(v.left(PRINTABLE_ASCII, 1)).to.be.equal(PRINTABLE_ASCII[0]);
  });

  it('should return the leftmost part of a string representation of an object', function() {
    expect(v.left(['Good evening'], 5)).to.be.equal('Good ');
    expect(v.left({
      toString: function() {
        return 'Morning';
      }
    }, 2)).to.be.equal('Mo');
  });

  it('should return an empty string for null or undefined', function() {
    expect(v.left()).to.be.equal('');
    expect(v.left(undefined)).to.be.equal('');
    expect(v.left(null)).to.be.equal('');
    expect(v.left(null, null)).to.be.equal('');
    expect(v.left(undefined, undefined)).to.be.equal('');
  });

});