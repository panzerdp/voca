import v from '../voca';
import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../utilities/string/ascii';

describe('countSubstring', function() {

  it('should return the number of substring appearances in a string', function() {
    expect(v.countSubstring('Hey man where-where-where\'s your cup holder?', 'where')).to.be.equal(3);
    expect(v.countSubstring('And some Skittles', 'Skittles')).to.be.equal(1);
    expect(v.countSubstring('And some Skittles', 'chocolate')).to.be.equal(0);
    expect(v.countSubstring('******', '*')).to.be.equal(6);
    expect(v.countSubstring('*******', '**')).to.be.equal(3);
    expect(v.countSubstring('*******', '**-')).to.be.equal(0);
    expect(v.countSubstring('*******', '***')).to.be.equal(2);
    expect(v.countSubstring('*******', '****')).to.be.equal(1);
    expect(v.countSubstring('*******', '********')).to.be.equal(0);
    expect(v.countSubstring('*-*-*', '**')).to.be.equal(0);
    expect(v.countSubstring('', '')).to.be.equal(0);
    expect(v.countSubstring(PRINTABLE_ASCII, '#')).to.be.equal(1);
  });

  it('should return the number of appearances of a number in a number', function() {
    expect(v.countSubstring(111222, 1)).to.be.equal(3);
    expect(v.countSubstring(0, 0)).to.be.equal(1);
    expect(v.countSubstring(15, 16)).to.be.equal(0);
  });

  it('should return the number of substring appearances in a string representation of an object', function() {
    expect(v.countSubstring(['where-where-where'], 'where')).to.be.equal(3);
    expect(v.countSubstring({
      toString: function() {
        return 'where-where-where';
      }
    }, 'where')).to.be.equal(3);
  });

  it('should return zero for undefined or null', function() {
    expect(v.countSubstring()).to.be.equal(0);
    expect(v.countSubstring(undefined)).to.be.equal(0);
    expect(v.countSubstring(null)).to.be.equal(0);
    expect(v.countSubstring(undefined, undefined)).to.be.equal(0);
    expect(v.countSubstring(null, null)).to.be.equal(0);
  });

});