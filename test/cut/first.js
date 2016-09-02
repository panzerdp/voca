import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('first', function() {

  it('should return the first part of a string', function() {
    expect(v.first('Good day', -1)).to.be.equal('');
    expect(v.first('Good day', 0)).to.be.equal('');
    expect(v.first('Good day', 4)).to.be.equal('Good');
    expect(v.first('Good day', 1)).to.be.equal('G');
    expect(v.first('Good day', 8)).to.be.equal('Good day');
    expect(v.first('Good day', 1000)).to.be.equal('Good day');
    expect(v.first('Good day')).to.be.equal('G');
    expect(v.first('', 5)).to.be.equal('');
    expect(v.first('', 0)).to.be.equal('');
    expect(v.first('')).to.be.equal('');
    expect(v.first(PRINTABLE_ASCII, PRINTABLE_ASCII.length)).to.be.equal(PRINTABLE_ASCII);
    expect(v.first(PRINTABLE_ASCII, 1)).to.be.equal(PRINTABLE_ASCII[0]);
  });

  it('should return the first part of a string representation of an object', function() {
    expect(v.first(['Good evening'], 5)).to.be.equal('Good ');
    expect(v.first({
      toString: function() {
        return 'Morning';
      }
    }, 2)).to.be.equal('Mo');
  });

  it('should return an empty string for null or undefined', function() {
    expect(v.first()).to.be.equal('');
    expect(v.first(undefined)).to.be.equal('');
    expect(v.first(null)).to.be.equal('');
    expect(v.first(null, null)).to.be.equal('');
    expect(v.first(undefined, undefined)).to.be.equal('');
  });

});