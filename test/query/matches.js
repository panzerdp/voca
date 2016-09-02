import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('matches', function() {

  it('should return true for a string that matches a regular expression object', function() {
    expect(v.matches('pacific ocean', /ocean/)).to.be.true;
    expect(v.matches('pacific ocean', /^pacific ocean$/)).to.be.true;
    expect(v.matches(undefined, /.?/)).to.be.true;
    expect(v.matches(null, /.?/)).to.be.true;
  });

  it('should return true for a string that matches a regular expression string', function() {
    expect(v.matches('pacific ocean', 'ocean')).to.be.true;
    expect(v.matches('pacific ocean', '^pacific ocean$')).to.be.true;
    expect(v.matches('pacific ocean', 'PACIFIC', 'i')).to.be.true;
    expect(v.matches('pacific ocean', '\\s')).to.be.true;
    expect(v.matches(undefined, '.?')).to.be.true;
    expect(v.matches(null, '.?')).to.be.true;
    expect(v.matches(PRINTABLE_ASCII, '\s')).to.be.true;
  });

  it('should return true for a string that matches a string representation of an object', function() {
    expect(v.matches(['atlantic ocean'], /atlantic/)).to.be.true;
    expect(v.matches('pacific ocean', ['^pacific ocean$'])).to.be.true;
    expect(v.matches({
      toString: function() {
        return 'pacific ocean';
      }
    }, 'PACIFIC', 'i')).to.be.true;
    expect(v.matches(['pacific ocean'], ['\\s'])).to.be.true;
  });

  it('should return true for a number that matches a regular expression', function() {
    expect(v.matches(1500, /\d/)).to.be.true;
    expect(v.matches(685, 68)).to.be.true;
    expect(v.matches(-1.5, /^\-1\.5$/)).to.be.true;
  });

  it('should return true for a boolean that matches a regular expression', function() {
    expect(v.matches(true, /true/)).to.be.true;
    expect(v.matches(false, 'false')).to.be.true;
  });

  it('should return false for a string that does not match a regular expression object', function() {
    expect(v.matches('pacific ocean', /^ocean/)).to.be.false;
    expect(v.matches('pacific ocean', /^atlantic ocean$/)).to.be.false;
    expect(v.matches(undefined, /a/)).to.be.false;
  });

  it('should return false for a string that does not match a regular expression string', function() {
    expect(v.matches('pacific ocean', 'sea')).to.be.false;
    expect(v.matches('pacific ocean', '^atlantic ocean$')).to.be.false;
    expect(v.matches('pacific ocean', 'PACIFIC')).to.be.false;
    expect(v.matches('pacific ocean', '\\n')).to.be.false;
    expect(v.matches(undefined, '\s')).to.be.false;
  });

  it('should return false for a null or undefined pattern', function() {
    expect(v.matches('pacific ocean', undefined)).to.be.false;
    expect(v.matches('pacific ocean', null)).to.be.false;
  });

});