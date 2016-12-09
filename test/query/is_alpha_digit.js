import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('isAlphaDigit', function() {

  it('should return true for an alpha and digit string', function() {
    expect(v.isAlphaDigit('HelloWorld')).to.be.true;
    expect(v.isAlphaDigit('HelloWorld007')).to.be.true;
    expect(v.isAlphaDigit('JavaScript6')).to.be.true;
    expect(v.isAlphaDigit('AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz')).to.be.true;
    expect(v.isAlphaDigit('AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789')).to.be.true;
    expect(v.isAlphaDigit('man\u0303ana')).to.be.true;
    expect(v.isAlphaDigit('foo\u0303\u035C\u035D\u035Ebar')).to.be.true;
  });


  it('should return true for a string with diacritics', function() {
    expect(v.isAlphaDigit('áéèêëíîïóôúûýàòüçäöâùÿãõñ')).to.be.true;
    expect(v.isAlphaDigit('áéèêëíîïóôúûýàòüçäöâùÿãõñ0123456789')).to.be.true;
  });

  it('should return true for an array with one alpha and digit string item', function() {
    expect(v.isAlphaDigit(['HelloWorld'])).to.be.true;
    expect(v.isAlphaDigit(['HelloWorld007'])).to.be.true;
  });

  it('should return true for an alpha and digit string representation of an object', function() {
    expect(v.isAlphaDigit({
      toString: function() {
        return 'HelloWorld';
      }
    })).to.be.true;
    expect(v.isAlphaDigit({
      toString: function() {
        return 'Welcome';
      }
    })).to.be.true;
    expect(v.isAlphaDigit({
      toString: function() {
        return 'JavaScript2016';
      }
    })).to.be.true;
    expect(v.isAlphaDigit({
      toString: function() {
        return 'Welcome';
      }
    })).to.be.true;
  });

  it('should return true for a boolean', function() {
    expect(v.isAlphaDigit(true)).to.be.true;
    expect(v.isAlphaDigit(false)).to.be.true;
  });

  it('should return true for a positive number or numeric string', function() {
    expect(v.isAlphaDigit(0)).to.be.true;
    expect(v.isAlphaDigit(10)).to.be.true;
    expect(v.isAlphaDigit(0xFF)).to.be.true;
    expect(v.isAlphaDigit('0')).to.be.true;
    expect(v.isAlphaDigit('10')).to.be.true;
    expect(v.isAlphaDigit('0xFF')).to.be.true;
    expect(v.isAlphaDigit(NaN)).to.be.true;
    expect(v.isAlphaDigit(Infinity)).to.be.true;
  });

  it('should return false for a non alpha and non digit string', function() {
    expect(v.isAlphaDigit('Hello World!')).to.be.false;
    expect(v.isAlphaDigit('Hello World! It is 2016.')).to.be.false;
    expect(v.isAlphaDigit('\nHello World!\n')).to.be.false;
    expect(v.isAlphaDigit('JavaScript 2015')).to.be.false;
    expect(v.isAlphaDigit(' ')).to.be.false;
    expect(v.isAlphaDigit('\n')).to.be.false;
    expect(v.isAlphaDigit('\t')).to.be.false;
    expect(v.isAlphaDigit(PRINTABLE_ASCII)).to.be.false;
  });

  it('should return false for a non alpha and non digit string representation of an object', function() {
    expect(v.isAlphaDigit({
      toString: function() {
        return 'Hello World! How are you?';
      }
    })).to.be.false;
    expect(v.isAlphaDigit({
      toString: function() {
        return 'Hello World! How are you?';
      }
    })).to.be.false;
  });

  it('should return false for an undefined', function() {
    expect(v.isAlphaDigit(undefined)).to.be.false;
    expect(v.isAlphaDigit()).to.be.false;
  });

  it('should return false for a null', function() {
    expect(v.isAlphaDigit(null)).to.be.false;
  });

  it('should return false for a negative number or numeric string', function() {
    expect(v.isAlphaDigit(-1)).to.be.false;
    expect(v.isAlphaDigit(-12.05)).to.be.false;
    expect(v.isAlphaDigit('-12.05')).to.be.false;
  });

  it('should return false for an empty string', function() {
    expect(v.isAlphaDigit('')).to.be.false;
  });

});
