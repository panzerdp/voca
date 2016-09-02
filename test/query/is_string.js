import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('isString', function() {

  it('should return true for a string', function() {
    expect(v.isString('Hello World!')).to.be.true;
    expect(v.isString('')).to.be.true;
    expect(v.isString('\n')).to.be.true;
    expect(v.isString(PRINTABLE_ASCII)).to.be.true;
  });

  it('should return false for a null', function() {
    expect(v.isString(null)).to.be.false;
  });

  it('should return false for an undefined', function() {
    expect(v.isString(undefined)).to.be.false;
    expect(v.isString()).to.be.false;
  });

  it('should return false for a boolean', function() {
    expect(v.isString(true)).to.be.false;
    expect(v.isString(false)).to.be.false;
  });

  it('should return false for a number', function() {
    expect(v.isString(100)).to.be.false;
    expect(v.isString(-40)).to.be.false;
  });

  it('should return false for an object', function() {
    expect(v.isString([])).to.be.false;
    expect(v.isString({})).to.be.false;
    expect(v.isString(new Date)).to.be.false;
  });

});