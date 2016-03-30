import v from '../voca'
import { expect } from 'chai'

describe('isNumeric', function() {

  it('should return true for a number', function() {
    expect(v.isNumeric(0)).to.be.true;
    expect(v.isNumeric(+0)).to.be.true;
    expect(v.isNumeric(1000)).to.be.true;
    expect(v.isNumeric(-1000)).to.be.true;
    expect(v.isNumeric(0xFF)).to.be.true;
    expect(v.isNumeric(-0xA0)).to.be.true;
    expect(v.isNumeric(1.56)).to.be.true;
    expect(v.isNumeric(-10.888)).to.be.true;
    expect(v.isNumeric(125e5)).to.be.true;
    expect(v.isNumeric(125e-3)).to.be.true;
  });

  it('should return true for a numeric string', function() {
    expect(v.isNumeric('0')).to.be.true;
    expect(v.isNumeric('+0')).to.be.true;
    expect(v.isNumeric('1000')).to.be.true;
    expect(v.isNumeric('-1000')).to.be.true;
    expect(v.isNumeric('0xFF')).to.be.true;
    expect(v.isNumeric('-0xA0')).to.be.true;
    expect(v.isNumeric('1.56')).to.be.true;
    expect(v.isNumeric('-10.888')).to.be.true;
    expect(v.isNumeric('125e5')).to.be.true;
    expect(v.isNumeric('125e-3')).to.be.true;
  });

  it('should return false for an undefined', function() {
    expect(v.isNumeric(undefined)).to.be.false;
    expect(v.isNumeric()).to.be.false;
  });

  it('should return false for a null', function() {
    expect(v.isNumeric(null)).to.be.false;
  });

  it('should return false for an empty string', function() {
    expect(v.isNumeric('')).to.be.false;
  });

});