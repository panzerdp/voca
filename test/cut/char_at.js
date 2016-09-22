import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('charAt', function() {

  it('should return the character by index', function() {
    expect(v.charAt('Good day', 0)).to.be.equal('G');
    expect(v.charAt('Good day', 1)).to.be.equal('o');
    expect(v.charAt('Good day', 7)).to.be.equal('y');
    expect(v.charAt(PRINTABLE_ASCII, 0)).to.be.equal(' ');
    expect(v.charAt('', 0)).to.be.equal('');
    expect(v.charAt('Good day')).to.be.equal('G');
    expect(v.charAt('Good day', undefined)).to.be.equal('G');
    expect(v.charAt('Good day', null)).to.be.equal('G');
    expect(v.charAt('Good day', NaN)).to.be.equal('G');
  });

  it('should return an empty string for out of bounds index', function() {
    expect(v.charAt('Good day', -1)).to.be.equal('');
    expect(v.charAt('Good day', 100)).to.be.equal('');
  });

  it('should return the character by index of a string representation of an object', function() {
    expect(v.charAt(['Good evening'], 5)).to.be.equal('e');
    expect(v.charAt({
      toString: function() {
        return 'Morning';
      }
    }, 1)).to.be.equal('o');
  });

  it('should return an empty string for null or undefined', function() {
    expect(v.charAt()).to.be.equal('');
    expect(v.charAt(undefined)).to.be.equal('');
    expect(v.charAt(null)).to.be.equal('');
    expect(v.charAt(null, null)).to.be.equal('');
    expect(v.charAt(undefined, undefined)).to.be.equal('');
  });

});