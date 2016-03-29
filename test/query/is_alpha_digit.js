import v from '../voca'
import { expect } from 'chai'

describe('isAlphaDigit', function() {

  it('should return true for an alphanumeric ASCII string', function() {
    expect(v.isAlphaDigit('helloworld')).to.be.true;
    expect(v.isAlphaDigit('hell0w0rld')).to.be.true;
    expect(v.isAlphaDigit('helloworld45')).to.be.true;
    expect(v.isAlphaDigit('Java34Script')).to.be.true;
    expect(v.isAlphaDigit('12isAlpha')).to.be.true;
  });

  it('should return true for an alphanumeric russian string', function() {
    expect(v.isAlphaDigit('приветмир')).to.be.true;
    expect(v.isAlphaDigit('приветмир45')).to.be.true;
    expect(v.isAlphaDigit('Ява34Скрипт')).to.be.true;
    expect(v.isAlphaDigit('12этоАльфа')).to.be.true;
  });

  it('should return true for an alphanumeric japanese string', function() {
    expect(v.isAlphaDigit('こんにちは世界')).to.be.true;
    expect(v.isAlphaDigit('こんにちは世界45')).to.be.true;
    expect(v.isAlphaDigit('12ジャバスクリプト')).to.be.true;
  });

  it('should return true for an array with one alphanumeric string item', function() {
    expect(v.isAlphaDigit(['HelloWorld'])).to.be.true;
    expect(v.isAlphaDigit(['HelloWorld45'])).to.be.true;
    expect(v.isAlphaDigit(['Ява34Скрипт'])).to.be.true;
  });

  it('should return true for an object which string representation is an alphanumeric string', function() {
    expect(v.isAlphaDigit({
      toString: function() {
        return 'HelloWorld';
      }
    })).to.be.true;
    expect(v.isAlphaDigit({
      toString: function() {
        return 'ЯваСкрипт';
      }
    })).to.be.true;
    expect(v.isAlphaDigit({
      toString: function() {
        return 'Hell0W0rld';
      }
    })).to.be.true;
    expect(v.isAlphaDigit({
      toString: function() {
        return '0Ява0Скрипт0';
      }
    })).to.be.true;
  });

  it('should return true for a boolean', function() {
    expect(v.isAlphaDigit(true)).to.be.true;
    expect(v.isAlphaDigit(false)).to.be.true;
  });

  it('should return true for a positive number or numeric string', function() {
    expect(v.isAlphaDigit(10)).to.be.true;
    expect(v.isAlphaDigit(0xFF)).to.be.true;
    expect(v.isAlphaDigit('10')).to.be.true;
    expect(v.isAlphaDigit('0xFF')).to.be.true;
  });

  it('should return false for a non-alphanumeric ASCII string', function() {
    expect(v.isAlphaDigit('hell0w0rld!')).to.be.false;
    expect(v.isAlphaDigit('hello world! 12')).to.be.false;
    expect(v.isAlphaDigit('\nhell0 w0rld!\n')).to.be.false;
    expect(v.isAlphaDigit('JavaScript 2015')).to.be.false;
    expect(v.isAlphaDigit('isAlpha(0)')).to.be.false;
  });

  it('should return false for a non-alphanumeric russian string', function() {
    expect(v.isAlphaDigit('привет мир!')).to.be.false;
    expect(v.isAlphaDigit('привет мир 1000')).to.be.false;
    expect(v.isAlphaDigit('\nпривет-мир-9\n')).to.be.false;
    expect(v.isAlphaDigit('ЯваСкрипт 2015')).to.be.false;
    expect(v.isAlphaDigit('этоАльфа(0)')).to.be.false;
  });

  it('should return false for a non-alphanumeric japanese string', function() {
    expect(v.isAlphaDigit('こんにちは世界00!')).to.be.false;
    expect(v.isAlphaDigit('ジャバスクリプト 2015(2016)')).to.be.false;
  });

  it('should return false for an array with a non-alphanumeric string item', function() {
    expect(v.isAlphaDigit(['Hell0 W0rld!'])).to.be.false;
    expect(v.isAlphaDigit(['Ява Скрипт, привет 0!'])).to.be.false;
  });

  it('should return false for an object which string representation is an non-alphanumeric string', function() {
    expect(v.isAlphaDigit({
      toString: function() {
        return 'Hello World! 007';
      }
    })).to.be.false;
    expect(v.isAlphaDigit({
      toString: function() {
        return 'Ява Скрипт, привет 0!';
      }
    })).to.be.false;
  });

  it('should return false for an undefined', function() {
    expect(v.isAlphaDigit(undefined)).to.be.false;
  });

  it('should return false for a null', function() {
    expect(v.isAlphaDigit(null)).to.be.false;
  });

  it('should return false for a negative number or numeric string', function() {
    expect(v.isAlphaDigit(-12.05)).to.be.false;
    expect(v.isAlphaDigit('-12.05')).to.be.false;
  });

  it('should return false for an empty string', function() {
    expect(v.isAlphaDigit('')).to.be.false;
  });

});
