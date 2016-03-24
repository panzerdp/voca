var v = require('../voca'),
  expect = require('chai').expect;

describe('isString', function() {

  it('should return true for alpha ASCII string', function() {
    expect(v.isAlpha('helloworld')).to.be.true;
    expect(v.isAlpha('JavaScript')).to.be.true;
    expect(v.isAlpha('isAlpha')).to.be.true;
  });

  it('should return true for alpha russian string', function() {
    expect(v.isAlpha('приветмир')).to.be.true;
    expect(v.isAlpha('ЯваСкрипт')).to.be.true;
    expect(v.isAlpha('этоАльфа')).to.be.true;
  });

  it('should return false for an undefined', function() {
    expect(v.isAlpha(undefined)).to.be.false;
  });

});