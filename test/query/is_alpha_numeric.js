import v from '../voca'
import { expect } from 'chai'

describe('isAlphaNumeric', function() {

  it('should return true for an alphanumeric ASCII string', function() {
    expect(v.isAlphaNumeric('helloworld')).to.be.true;
    expect(v.isAlphaNumeric('hell0w0rld')).to.be.true;
    expect(v.isAlphaNumeric('helloworld45')).to.be.true;
    expect(v.isAlphaNumeric('Java34Script')).to.be.true;
    expect(v.isAlphaNumeric('12isAlpha')).to.be.true;
  });

  it('should return true for an alphanumeric russian string', function() {
    expect(v.isAlphaNumeric('приветмир')).to.be.true;
    expect(v.isAlphaNumeric('приветмир45')).to.be.true;
    expect(v.isAlphaNumeric('Ява34Скрипт')).to.be.true;
    expect(v.isAlphaNumeric('12этоАльфа')).to.be.true;
  });

  it('should return true for an alphanumeric japanese string', function() {
    expect(v.isAlphaNumeric('こんにちは世界')).to.be.true;
    expect(v.isAlphaNumeric('こんにちは世界45')).to.be.true;
    expect(v.isAlphaNumeric('12ジャバスクリプト')).to.be.true;
  });

  it('should return true for an array with one alphanumeric string item', function() {
    expect(v.isAlphaNumeric(['HelloWorld'])).to.be.true;
    expect(v.isAlphaNumeric(['HelloWorld45'])).to.be.true;
    expect(v.isAlphaNumeric(['Ява34Скрипт'])).to.be.true;
  });

  it('should return true for an object which string representation is an alphanumeric string', function() {
    expect(v.isAlphaNumeric({
      toString: function() {
        return 'HelloWorld';
      }
    })).to.be.true;
    expect(v.isAlphaNumeric({
      toString: function() {
        return 'ЯваСкрипт';
      }
    })).to.be.true;
    expect(v.isAlphaNumeric({
      toString: function() {
        return 'Hell0W0rld';
      }
    })).to.be.true;
    expect(v.isAlphaNumeric({
      toString: function() {
        return '0Ява0Скрипт0';
      }
    })).to.be.true;
  });

  it('should return true for a boolean', function() {
    expect(v.isAlphaNumeric(true)).to.be.true;
    expect(v.isAlphaNumeric(false)).to.be.true;
  });

  it('should return true for a positive number or numeric string', function() {
    expect(v.isAlphaNumeric(10)).to.be.true;
    expect(v.isAlphaNumeric(0xFF)).to.be.true;
    expect(v.isAlphaNumeric('10')).to.be.true;
    expect(v.isAlphaNumeric('0xFF')).to.be.true;
  });

  it('should return false for a non-alphanumeric ASCII string', function() {
    expect(v.isAlphaNumeric('hell0w0rld!')).to.be.false;
    expect(v.isAlphaNumeric('hello world! 12')).to.be.false;
    expect(v.isAlphaNumeric('\nhell0 w0rld!\n')).to.be.false;
    expect(v.isAlphaNumeric('JavaScript 2015')).to.be.false;
    expect(v.isAlphaNumeric('isAlpha(0)')).to.be.false;
  });

  it('should return false for a non-alphanumeric russian string', function() {
    expect(v.isAlphaNumeric('привет мир!')).to.be.false;
    expect(v.isAlphaNumeric('привет мир 1000')).to.be.false;
    expect(v.isAlphaNumeric('\nпривет-мир-9\n')).to.be.false;
    expect(v.isAlphaNumeric('ЯваСкрипт 2015')).to.be.false;
    expect(v.isAlphaNumeric('этоАльфа(0)')).to.be.false;
  });

  it('should return false for a non-alphanumeric japanese string', function() {
    expect(v.isAlphaNumeric('こんにちは世界00!')).to.be.false;
    expect(v.isAlphaNumeric('ジャバスクリプト 2015(2016)')).to.be.false;
  });

  it('should return false for an array with a non-alphanumeric string item', function() {
    expect(v.isAlphaNumeric(['Hell0 W0rld!'])).to.be.false;
    expect(v.isAlphaNumeric(['Ява Скрипт, привет 0!'])).to.be.false;
  });

  it('should return false for an object which string representation is an non-alphanumeric string', function() {
    expect(v.isAlphaNumeric({
      toString: function() {
        return 'Hello World! 007';
      }
    })).to.be.false;
    expect(v.isAlphaNumeric({
      toString: function() {
        return 'Ява Скрипт, привет 0!';
      }
    })).to.be.false;
  });

  it('should return false for an undefined', function() {
    expect(v.isAlphaNumeric(undefined)).to.be.false;
  });

  it('should return false for a null', function() {
    expect(v.isAlphaNumeric(null)).to.be.false;
  });

  it('should return false for a negative number or numeric string', function() {
    expect(v.isAlphaNumeric(-12.05)).to.be.false;
    expect(v.isAlphaNumeric('-12.05')).to.be.false;
  });

  it('should return false for an empty string', function() {
    expect(v.isAlphaNumeric('')).to.be.false;
  });

});
