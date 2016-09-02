import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('isNumeric', function() {

  it('should return true for a number', function() {
    expect(v.isNumeric(0)).to.be.true;
    expect(v.isNumeric(+0)).to.be.true;
    expect(v.isNumeric(1000)).to.be.true;
    expect(v.isNumeric(-1000)).to.be.true;
    expect(v.isNumeric(0xFF)).to.be.true;
    expect(v.isNumeric(1.56)).to.be.true;
    expect(v.isNumeric(-10.888)).to.be.true;
    expect(v.isNumeric(125e5)).to.be.true;
    expect(v.isNumeric(125e-3)).to.be.true;
  });

  it('should return true for a numeric string', function() {
    expect(v.isNumeric('0')).to.be.true;
    expect(v.isNumeric('+0')).to.be.true;
    expect(v.isNumeric('0.0')).to.be.true;
    expect(v.isNumeric('1000')).to.be.true;
    expect(v.isNumeric('-1000')).to.be.true;
    expect(v.isNumeric('0xFF')).to.be.true;
    expect(v.isNumeric('1.56')).to.be.true;
    expect(v.isNumeric('-10.888')).to.be.true;
    expect(v.isNumeric('125e5')).to.be.true;
    expect(v.isNumeric('125e-3')).to.be.true;
  });

  it('should return true for a numeric string representation of an object', function() {
    expect(v.isNumeric([0])).to.be.true;
    expect(v.isNumeric(['0'])).to.be.true;
    expect(v.isNumeric(['0.0'])).to.be.true;
    expect(v.isNumeric({
      toString: function() {
        return '100';
      }
    })).to.be.true;
  });

  it('should return false for a non numeric string', function() {
    expect(v.isNumeric('FF')).to.be.false;
    expect(v.isNumeric('0FF')).to.be.false;
    expect(v.isNumeric('Hello World!')).to.be.false;
    expect(v.isNumeric('!0')).to.be.false;
    expect(v.isNumeric('1.0 0')).to.be.false;
    expect(v.isNumeric('Infinity')).to.be.false;
    expect(v.isNumeric('NaN')).to.be.false;
    expect(v.isNumeric(' ')).to.be.false;
    expect(v.isNumeric(PRINTABLE_ASCII)).to.be.false;
  });

  it('should return false for a non numeric string representation of an object', function() {
    expect(v.isNumeric(['Hello World!'])).to.be.false;
    expect(v.isNumeric({
      toString: function() {
        return 'NaN';
      }
    })).to.be.false;
  });

  it('should return false for a boolean', function() {
    expect(v.isNumeric(true)).to.be.false;
    expect(v.isNumeric(false)).to.be.false;
  });

  it('should return false for an undefined', function() {
    expect(v.isNumeric(undefined)).to.be.false;
    expect(v.isNumeric()).to.be.false;
  });

  it('should return false for a null', function() {
    expect(v.isNumeric(null)).to.be.false;
  });

  it('should return false for an Inifinty', function() {
    expect(v.isNumeric(null)).to.be.false;
  });

  it('should return false for a NaN', function() {
    expect(v.isNumeric(null)).to.be.false;
  });

  it('should return false for an empty string', function() {
    expect(v.isNumeric('')).to.be.false;
  });

});