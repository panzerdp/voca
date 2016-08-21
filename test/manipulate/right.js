import v from '../voca';
import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../utilities/string/ascii';

describe('right', function() {

  it('should return the rightmost part of a string', function() {
    expect(v.right('Good day', -1)).to.be.equal('');
    expect(v.right('Good day', 0)).to.be.equal('');
    expect(v.right('Good day', 4)).to.be.equal(' day');
    expect(v.right('Good day', 1)).to.be.equal('y');
    expect(v.right('Good day', 8)).to.be.equal('Good day');
    expect(v.right('Good day', 1000)).to.be.equal('Good day');
    expect(v.right('Good day')).to.be.equal('Good day');
    expect(v.right('', 5)).to.be.equal('');
    expect(v.right('', 0)).to.be.equal('');
    expect(v.right('')).to.be.equal('');
    expect(v.right(PRINTABLE_ASCII), PRINTABLE_ASCII.length).to.be.equal(PRINTABLE_ASCII);
    expect(v.right(PRINTABLE_ASCII, 1)).to.be.equal(PRINTABLE_ASCII[PRINTABLE_ASCII.length - 1]);
  });

  it('should return the rightmost part of a string representation of an object', function() {
    expect(v.right(['Good evening'], 5)).to.be.equal('ening');
    expect(v.right({
      toString: function() {
        return 'Morning';
      }
    }, 2)).to.be.equal('ng');
  });

  it('should return an empty string for null or undefined', function() {
    expect(v.right()).to.be.equal('');
    expect(v.right(undefined)).to.be.equal('');
    expect(v.right(null)).to.be.equal('');
    expect(v.right(null, null)).to.be.equal('');
    expect(v.right(undefined, undefined)).to.be.equal('');
  });

});