import { expect } from 'chai';
import v from '../voca';

describe('escapeRegExp', function() {

  it('should return the escaped string', function() {
    expect(v.escapeRegExp('-[]/{}()*+?.\\^$|')).to.be.equal(
      '\\-\\[\\]\\/\\{\\}\\(\\)\\*\\+\\?\\.\\\\\\^\\$\\|'
    );
    expect(v.escapeRegExp('time')).to.be.equal('time');
    expect(v.escapeRegExp('500-200')).to.be.equal('500\\-200');
    expect(v.escapeRegExp('')).to.be.equal('');
    expect(new RegExp(v.escapeRegExp('[a-z0-9]?')).test('[a-z0-9]?')).to.be.true;
    expect(new RegExp(v.escapeRegExp('.*')).test('future')).to.be.false;
  });

  it('should return the escaped string representation of an object', function() {
    expect(v.escapeRegExp(['-[]object'])).to.be.equal('\\-\\[\\]object');
    expect(v.escapeRegExp({
      toString: function() {
        return '1.15';
      }
    })).to.be.equal('1\\.15');
  });

  it('should return an empty string for null or undefined', function() {
    expect(v.escapeRegExp()).to.be.equal('');
    expect(v.escapeRegExp(undefined)).to.be.equal('');
    expect(v.escapeRegExp(null)).to.be.equal('');
  });

});