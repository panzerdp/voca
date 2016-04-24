import v from '../voca';
import { expect } from 'chai';

describe('toLowerCase', function() {

  it('should return the lower case of a string', function() {
    expect(v.toLowerCase('Saturn')).to.be.equal('saturn');
    expect(v.toLowerCase('EARTH')).to.be.equal('earth');
    expect(v.toLowerCase('456')).to.be.equal('456');
    expect(v.toLowerCase('')).to.be.equal('');
  });

  it('should return the lower case of a string representation of an object', function() {
    expect(v.toLowerCase(['Venus'])).to.be.equal('venus');
    expect(v.toLowerCase({
      toString: function() {
        return 'Venus';
      }
    })).to.be.equal('venus');
  });

  it('should return empty string for null or undefined', function() {
    expect(v.toLowerCase()).to.be.equal('');
    expect(v.toLowerCase(undefined)).to.be.equal('');
    expect(v.toLowerCase(null)).to.be.equal('');
  });

});