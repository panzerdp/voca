import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('isAlpha', function() {

  it('should return true for an alpha string', function() {
    expect(v.isAlpha('HelloWorld')).to.be.true;
    expect(v.isAlpha('JavaScript')).to.be.true;
    expect(v.isAlpha('AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz')).to.be.true;
    expect(v.isAlpha('man\u0303ana')).to.be.true;
    expect(v.isAlpha('foo\u0303\u035C\u035D\u035Ebar')).to.be.true;
  });

  it('should return true for a string with diacritics', function() {
    expect(v.isAlpha('áéèêëíîïóôúûýàòüçäöâùÿãõñ')).to.be.true;
  });

  it('should return true for characters with diacritical marks', function() {
    expect(v.isAlpha('man\u0303ana')).to.be.true;
    expect(v.isAlpha('foo\u0303\u035C\u035D\u035Ebar')).to.be.true;
  });

  it('should return true for an array with one alpha string item', function() {
    expect(v.isAlpha(['HelloWorld'])).to.be.true;
  });

  it('should return true for an alpha string representation of an object', function() {
    expect(v.isAlpha({
      toString: function() {
        return 'HelloWorld';
      }
    })).to.be.true;
    expect(v.isAlpha({
      toString: function() {
        return 'HelloWorld';
      }
    })).to.be.true;
  });

  it('should return true for a boolean', function() {
    expect(v.isAlpha(true)).to.be.true;
    expect(v.isAlpha(false)).to.be.true;
  });

  it('should return true for a NaN or Infinity number', function() {
    expect(v.isAlpha(NaN)).to.be.true;
    expect(v.isAlpha(Infinity)).to.be.true;
  });

  it('should return false for a non-alpha string', function() {
    expect(v.isAlpha('Hello World!')).to.be.false;
    expect(v.isAlpha('\nHello World!\n')).to.be.false;
    expect(v.isAlpha('ECMAScript 5.1 (ECMA-262)')).to.be.false;
    expect(v.isAlpha(' ')).to.be.false;
    expect(v.isAlpha('\n')).to.be.false;
    expect(v.isAlpha('\t')).to.be.false;
    expect(v.isAlpha('0123456789')).to.be.false;
    expect(v.isAlpha('áéèêëíîïóôúûýàòüçäöâùÿãõñ 0123456789')).to.be.false;
    expect(v.isAlpha(PRINTABLE_ASCII)).to.be.false;
  });


  it('should return false for an array with a non-alpha string item', function() {
    expect(v.isAlpha(['Hello World!'])).to.be.false;
  });

  it('should return false for a non-alpha string representation of an object', function() {
    expect(v.isAlpha({
      toString: function() {
        return 'Hello World!';
      }
    })).to.be.false;
    expect(v.isAlpha({
      toString: function() {
        return 'Welcome!';
      }
    })).to.be.false;
  });

  it('should return false for an undefined', function() {
    expect(v.isAlpha(undefined)).to.be.false;
    expect(v.isAlpha()).to.be.false;
  });

  it('should return false for a null', function() {
    expect(v.isAlpha(null)).to.be.false;
  });

  it('should return false for a number or numeric string', function() {
    expect(v.isAlpha(0)).to.be.false;
    expect(v.isAlpha(10)).to.be.false;
    expect(v.isAlpha(-12.05)).to.be.false;
    expect(v.isAlpha(0xFF)).to.be.false;
    expect(v.isAlpha('0')).to.be.false;
    expect(v.isAlpha('10')).to.be.false;
    expect(v.isAlpha('-12.05')).to.be.false;
    expect(v.isAlpha('0xFF')).to.be.false;
  });

  it('should return false for an empty string', function() {
    expect(v.isAlpha('')).to.be.false;
  });

});
