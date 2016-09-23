import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('last', function() {

  it('should return the last part of a string', function() {
    expect(v.last('Good day', -1)).to.be.equal('');
    expect(v.last('Good day', 0)).to.be.equal('');
    expect(v.last('Good day', 4)).to.be.equal(' day');
    expect(v.last('Good day', 1)).to.be.equal('y');
    expect(v.last('Good day', 8)).to.be.equal('Good day');
    expect(v.last('Good day', 1000)).to.be.equal('Good day');
    expect(v.last('Good day')).to.be.equal('y');
    expect(v.last('', 5)).to.be.equal('');
    expect(v.last('', 0)).to.be.equal('');
    expect(v.last('')).to.be.equal('');
    expect(v.last(PRINTABLE_ASCII, PRINTABLE_ASCII.length)).to.be.equal(PRINTABLE_ASCII);
    expect(v.last(PRINTABLE_ASCII, 1)).to.be.equal(PRINTABLE_ASCII[PRINTABLE_ASCII.length - 1]);
  });

  it('should return the last part of a string representation of an object', function() {
    expect(v.last(['Good evening'], 5)).to.be.equal('ening');
    expect(v.last({
      toString: function() {
        return 'Morning';
      }
    }, 2)).to.be.equal('ng');
  });

  it('should return an empty string for null or undefined', function() {
    expect(v.last()).to.be.equal('');
    expect(v.last(undefined)).to.be.equal('');
    expect(v.last(null)).to.be.equal('');
    expect(v.last(null, null)).to.be.equal('');
    expect(v.last(undefined, undefined)).to.be.equal('');
  });

});