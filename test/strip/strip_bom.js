import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('stripBom', function() {

  it('should strip BOM from the beginning of the string', function() {
    expect(v.stripBom('\uFEFF')).to.be.equal('');
    expect(v.stripBom('\uFEFFHello world!')).to.be.equal('Hello world!');
    expect(v.stripBom('\uFEFF\n\tWelcome')).to.be.equal('\n\tWelcome');
  });

  it('should not affect strings that do not start with BOM', function() {
    expect(v.stripBom('')).to.be.equal('');
    expect(v.stripBom('Hello world!')).to.be.equal('Hello world!');
    expect(v.stripBom('Hello\uFEFFworld!')).to.be.equal('Hello\uFEFFworld!');
    expect(v.stripBom(PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII);
    expect(v.stripBom('\\uFEFF')).to.be.equal('\\uFEFF');
  });

  it('should strip BOM from a string representation of an object', function() {
    expect(v.stripBom('\uFEFFHello world!')).to.equal('Hello world!');
    expect(v.stripBom({
      toString: function() {
        return '\uFEFFHello world!';
      }
    })).to.equal('Hello world!');
  });

  it('should return empty string for null or undefined', function() {
    expect(v.stripBom(null)).to.be.equal('');
    expect(v.stripBom(undefined)).to.be.equal('');
    expect(v.stripBom()).to.be.equal('');
  });
});