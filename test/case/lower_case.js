import { expect } from 'chai';
import v from '../voca';

describe('lowerCase', function() {

  it('should return the lower case of a string', function() {
    expect(v.lowerCase('Saturn')).to.be.equal('saturn');
    expect(v.lowerCase('EARTH')).to.be.equal('earth');
    expect(v.lowerCase('456')).to.be.equal('456');
    expect(v.lowerCase('')).to.be.equal('');
  });

  it('should return the lower case of a string representation of an object', function() {
    expect(v.lowerCase(['Venus'])).to.be.equal('venus');
    expect(v.lowerCase({
      toString: function() {
        return 'Venus';
      }
    })).to.be.equal('venus');
  });

  it('should return empty string for null or undefined', function() {
    expect(v.lowerCase()).to.be.equal('');
    expect(v.lowerCase(undefined)).to.be.equal('');
    expect(v.lowerCase(null)).to.be.equal('');
  });

});