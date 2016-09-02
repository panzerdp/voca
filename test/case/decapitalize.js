import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('decapitalize', function() {

  it('should decapitalize the first character in a string', function() {
    expect(v.decapitalize('Light')).to.be.equal('light');
    expect(v.decapitalize('light')).to.be.equal('light');
    expect(v.decapitalize('Sun')).to.be.equal('sun');
    expect(v.decapitalize('f')).to.be.equal('f');
    expect(v.decapitalize('')).to.be.equal('');
    expect(v.decapitalize('*light')).to.be.equal('*light');
    expect(v.decapitalize(PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII);
  });

  it('should decapitalize the first character in a string representation of an object', function() {
    expect(v.decapitalize(['Fruit'])).to.be.equal('fruit');
    expect(v.decapitalize({
      toString: function() {
        return 'CaRrOt';
      }
    }, false)).to.be.equal('caRrOt');
  });

  it('should not modify numbers', function() {
    expect(v.decapitalize(100)).to.be.equal('100');
    expect(v.decapitalize(812, false)).to.be.equal('812');
  });

  it('should return an empty string for null or undefined', function() {
    expect(v.decapitalize()).to.be.equal('');
    expect(v.decapitalize(undefined)).to.be.equal('');
    expect(v.decapitalize(null)).to.be.equal('');
  });

});