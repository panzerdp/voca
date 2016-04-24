import v from '../voca';
import { expect } from 'chai';

describe('toUpperCase', function() {

  it('should return the upper case of a string', function() {
    expect(v.toUpperCase('Saturn')).to.be.equal('SATURN');
    expect(v.toUpperCase('Earth')).to.be.equal('EARTH');
    expect(v.toUpperCase('456')).to.be.equal('456');
    expect(v.toUpperCase('')).to.be.equal('');
  });

  it('should return the upper case of a string representation of an object', function() {
    expect(v.toUpperCase(['Venus'])).to.be.equal('VENUS');
    expect(v.toUpperCase({
      toString: function() {
        return 'Venus';
      }
    })).to.be.equal('VENUS');
  });

  it('should return empty string for null or undefined', function() {
    expect(v.toUpperCase()).to.be.equal('');
    expect(v.toUpperCase(undefined)).to.be.equal('');
    expect(v.toUpperCase(null)).to.be.equal('');
  });

});