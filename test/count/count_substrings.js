import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('countSubstrings', function() {

  it('should return the number of substring appearances in a string', function() {
    expect(v.countSubstrings('Hey man where-where-where\'s your cup holder?', 'where')).to.be.equal(3);
    expect(v.countSubstrings('And some Skittles', 'Skittles')).to.be.equal(1);
    expect(v.countSubstrings('And some Skittles', 'chocolate')).to.be.equal(0);
    expect(v.countSubstrings('******', '*')).to.be.equal(6);
    expect(v.countSubstrings('*******', '**')).to.be.equal(3);
    expect(v.countSubstrings('*******', '**-')).to.be.equal(0);
    expect(v.countSubstrings('*******', '***')).to.be.equal(2);
    expect(v.countSubstrings('*******', '****')).to.be.equal(1);
    expect(v.countSubstrings('*******', '********')).to.be.equal(0);
    expect(v.countSubstrings('*-*-*', '**')).to.be.equal(0);
    expect(v.countSubstrings('', '')).to.be.equal(0);
    expect(v.countSubstrings(PRINTABLE_ASCII, '#')).to.be.equal(1);
  });

  it('should return the number of appearances of a number in a number', function() {
    expect(v.countSubstrings(111222, 1)).to.be.equal(3);
    expect(v.countSubstrings(0, 0)).to.be.equal(1);
    expect(v.countSubstrings(15, 16)).to.be.equal(0);
  });

  it('should return the number of substring appearances in a string representation of an object', function() {
    expect(v.countSubstrings(['where-where-where'], 'where')).to.be.equal(3);
    expect(v.countSubstrings({
      toString: function() {
        return 'where-where-where';
      }
    }, 'where')).to.be.equal(3);
  });

  it('should return zero for undefined or null', function() {
    expect(v.countSubstrings()).to.be.equal(0);
    expect(v.countSubstrings(undefined)).to.be.equal(0);
    expect(v.countSubstrings(null)).to.be.equal(0);
    expect(v.countSubstrings(undefined, undefined)).to.be.equal(0);
    expect(v.countSubstrings(null, null)).to.be.equal(0);
  });

});