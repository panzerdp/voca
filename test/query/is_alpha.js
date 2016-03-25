var v = require('../voca'),
  expect = require('chai').expect;

describe('isAlpha', function() {

  it('should return true for an alpha ASCII string', function() {
    expect(v.isAlpha('helloworld')).to.be.true;
    expect(v.isAlpha('JavaScript')).to.be.true;
    expect(v.isAlpha('isAlpha')).to.be.true;
  });

  it('should return true for an alpha russian string', function() {
    expect(v.isAlpha('приветмир')).to.be.true;
    expect(v.isAlpha('ЯваСкрипт')).to.be.true;
    expect(v.isAlpha('этоАльфа')).to.be.true;
  });

  it('should return true for an alpha japanese string', function() {
    expect(v.isAlpha('こんにちは世界')).to.be.true;
    expect(v.isAlpha('ジャバスクリプト')).to.be.true;
  });

  it('should return true for an array with one alpha string item', function() {
    expect(v.isAlpha(['HelloWorld'])).to.be.true;
    expect(v.isAlpha(['ЯваСкрипт'])).to.be.true;
  });

  it('should return true for an array with one alpha string item', function() {
    expect(v.isAlpha(['HelloWorld'])).to.be.true;
    expect(v.isAlpha(['ЯваСкрипт'])).to.be.true;
  });

  it('should return true for a boolean', function() {
    expect(v.isAlpha(true)).to.be.true;
    expect(v.isAlpha(false)).to.be.true;
  });

  it('should return false for alpha and non-alpha ASCII string', function() {
    expect(v.isAlpha('hello world!')).to.be.false;
    expect(v.isAlpha('\nhello world!\n')).to.be.false;
    expect(v.isAlpha('JavaScript2015')).to.be.false;
    expect(v.isAlpha('isAlpha()')).to.be.false;
  });

  it('should return false for alpha and non-alpha russian string', function() {
    expect(v.isAlpha('привет мир!')).to.be.false;
    expect(v.isAlpha('\nпривет мир\n')).to.be.false;
    expect(v.isAlpha('ЯваСкрипт2015')).to.be.false;
    expect(v.isAlpha('этоАльфа()')).to.be.false;
  });

  it('should return false for alpha and non-alpha japanese string', function() {
    expect(v.isAlpha('こんにちは世界!')).to.be.false;
    expect(v.isAlpha('ジャバスクリプト2015')).to.be.false;
  });

  it('should return false for an undefined', function() {
    expect(v.isAlpha(undefined)).to.be.false;
  });

  it('should return false for a null', function() {
    expect(v.isAlpha(null)).to.be.false;
  });

  it('should return false for a number or numeric string', function() {
    expect(v.isAlpha(10)).to.be.false;
    expect(v.isAlpha(-12.05)).to.be.false;
    expect(v.isAlpha(0xFF)).to.be.false;
    expect(v.isAlpha('10')).to.be.false;
    expect(v.isAlpha('-12.05')).to.be.false;
    expect(v.isAlpha('0xFF')).to.be.false;
  });

  it('should return false for an empty string', function() {
    expect(v.isAlpha('')).to.be.false;
  });

});
