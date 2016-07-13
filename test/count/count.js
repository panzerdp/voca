import v from '../voca';
import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../utilities/string/ascii';

describe('count', function() {

  it('should return the number of substring appearances in a string', function() {
    expect(v.count('Hey man where-where-where\'s your cup holder?', 'where')).to.be.equal(3);
    expect(v.count('And some Skittles', 'Skittles')).to.be.equal(1);
    expect(v.count('And some Skittles', 'chocolate')).to.be.equal(0);
    expect(v.count('******', '*')).to.be.equal(6);
    expect(v.count('*******', '**')).to.be.equal(3);
    expect(v.count('*******', '**-')).to.be.equal(0);
    expect(v.count('*******', '***')).to.be.equal(2);
    expect(v.count('*******', '****')).to.be.equal(1);
    expect(v.count('*******', '********')).to.be.equal(0);
    expect(v.count('*-*-*', '**')).to.be.equal(0);
    expect(v.count('', '')).to.be.equal(0);
    expect(v.count(PRINTABLE_ASCII, '#')).to.be.equal(1);
  });

  it('should return the number of appearances of a number in a number', function() {
    expect(v.count(111222, 1)).to.be.equal(3);
    expect(v.count(0, 0)).to.be.equal(1);
    expect(v.count(15, 16)).to.be.equal(0);
  });

  it('should return the number of substring appearances in a string representation of an object', function() {
    expect(v.count(['where-where-where'], 'where')).to.be.equal(3);
    expect(v.count({
      toString: function() {
        return 'where-where-where';
      }
    }, 'where')).to.be.equal(3);
  });

  it('should return zero for undefined or null', function() {
    expect(v.count()).to.be.equal(0);
    expect(v.count(undefined)).to.be.equal(0);
    expect(v.count(null)).to.be.equal(0);
    expect(v.count(undefined, undefined)).to.be.equal(0);
    expect(v.count(null, null)).to.be.equal(0);
  });

});