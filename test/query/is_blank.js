import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('isBlank', function() {

  it('should return false for a non empty string', function() {
    expect(v.isBlank('Hello World!')).to.be.false;
    expect(v.isBlank('a')).to.be.false;
    expect(v.isBlank(PRINTABLE_ASCII)).to.be.false;
  });

  it('should return false for a non empty string representation of an object', function() {
    expect(v.isBlank(['Hello world'])).to.be.false;
    expect(v.isBlank({
      toString: function() {
        return 'Welcome to New York';
      }
    })).to.be.false;
  });

  it('should return false for a boolean', function() {
    expect(v.isBlank(true)).to.be.false;
    expect(v.isBlank(false)).to.be.false;
  });

  it('should return false for a number', function() {
    expect(v.isBlank(0)).to.be.false;
    expect(v.isBlank(100)).to.be.false;
    expect(v.isBlank(-1.5)).to.be.false;
  });

  it('should return true for an empty string', function() {
    expect(v.isBlank('')).to.be.true;
  });

  it('should return true for a string with whitespaces', function() {
    expect(v.isBlank(' ')).to.be.true;
    expect(v.isBlank('   ')).to.be.true;
    expect(v.isBlank(' \n  ')).to.be.true;
    expect(v.isBlank('\f\n\r\t\v')).to.be.true;
  });

  it('should return true for an empty string string representation of an object', function() {
    expect(v.isBlank(['\n\n'])).to.be.true;
    expect(v.isBlank({
      toString: function() {
        return ' ';
      }
    })).to.be.true;
  });

  it('should return true for an undefined', function() {
    expect(v.isBlank(undefined)).to.be.true;
    expect(v.isBlank()).to.be.true;
  });

  it('should return true for a null', function() {
    expect(v.isBlank(null)).to.be.true;
  });

});