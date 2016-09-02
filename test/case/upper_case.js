import { expect } from 'chai';
import v from '../voca';

describe('upperCase', function() {

  it('should return the upper case of a string', function() {
    expect(v.upperCase('Saturn')).to.be.equal('SATURN');
    expect(v.upperCase('Earth')).to.be.equal('EARTH');
    expect(v.upperCase('456')).to.be.equal('456');
    expect(v.upperCase('')).to.be.equal('');
  });

  it('should return the upper case of a string representation of an object', function() {
    expect(v.upperCase(['Venus'])).to.be.equal('VENUS');
    expect(v.upperCase({
      toString: function() {
        return 'Venus';
      }
    })).to.be.equal('VENUS');
  });

  it('should return empty string for null or undefined', function() {
    expect(v.upperCase()).to.be.equal('');
    expect(v.upperCase(undefined)).to.be.equal('');
    expect(v.upperCase(null)).to.be.equal('');
  });

});