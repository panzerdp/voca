import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('isEmpty', function() {

  it('should return true for an empty string', function() {
    expect(v.isEmpty('')).to.be.true;
  });

  it('should return true for an undefined', function() {
    expect(v.isEmpty(undefined)).to.be.true;
    expect(v.isEmpty()).to.be.true;
  });

  it('should return true for a null', function() {
    expect(v.isEmpty(null)).to.be.true;
  });

  it('should return false for a non empty string', function() {
    expect(v.isEmpty('Hello World!')).to.be.false;
    expect(v.isEmpty('a')).to.be.false;
    expect(v.isEmpty(' ')).to.be.false;
    expect(v.isEmpty(PRINTABLE_ASCII)).to.be.false;
  });

  it('should return false for a non empty string representation of an object', function() {
    expect(v.isEmpty(['Hello world'])).to.be.false;
    expect(v.isEmpty({
      toString: function() {
        return ' ';
      }
    })).to.be.false;
  });

  it('should return false for a boolean', function() {
    expect(v.isEmpty(true)).to.be.false;
    expect(v.isEmpty(false)).to.be.false;
  });

  it('should return false for a number', function() {
    expect(v.isEmpty(0)).to.be.false;
    expect(v.isEmpty(100)).to.be.false;
    expect(v.isEmpty(-1.5)).to.be.false;
  });

});