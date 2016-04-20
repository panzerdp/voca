import v from '../voca'
import { expect } from 'chai'

describe('latinise', function() {

  it('should latinise the first character in a string', function() {
    expect(v.latinise('apple')).to.be.equal('apple');

  });

  it('should latinise the first character in a string representation of an object', function() {
    //expect(v.latinise(['grape'])).to.be.equal('Grape');
    //expect(v.latinise({
    //  toString: function() {
    //    return 'oRaNgE';
    //  }
    //}, false)).to.be.equal('ORaNgE');
  });

  it('should not modify numbers', function() {
    expect(v.latinise(100)).to.be.equal('100');
    expect(v.latinise(812)).to.be.equal('812');
  });

  it('should return an empty string for null or undefined', function() {
    expect(v.latinise()).to.be.equal('');
    expect(v.latinise(undefined)).to.be.equal('');
    expect(v.latinise(null)).to.be.equal('');
  });

});