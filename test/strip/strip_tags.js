/* eslint-disable */
import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('stripTags', function() {

  it('should strip tags from a string', function() {
  });

  it('should strip tags from a string representation of an object', function() {

  });

  it('should return empty string for null or undefined', function() {
    expect(v.stripTags(null)).to.be.equal('');
    expect(v.stripTags(null, null)).to.be.equal('');
    expect(v.stripTags(undefined)).to.be.equal('');
    expect(v.stripTags(undefined, '<a>')).to.be.equal('');
    expect(v.stripTags(undefined, undefined)).to.be.equal('');
  });

});