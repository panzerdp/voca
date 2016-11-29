import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('isUpperCase', function() {

  it('should return true for an upper case string', function() {
    expect(v.isUpperCase('A')).to.be.true;
    expect(v.isUpperCase('HELLOWORLD')).to.be.true;
    expect(v.isUpperCase('WELCOMETOEARTH')).to.be.true;
    expect(v.isUpperCase('ÁÉÈÊËÍÎÏÓÔÚÛÝÀÒÜÇÄÖÂÙŸÃÕÑ')).to.be.true;
  });

  it('should return true for a lower case string representation of an object', function() {
    expect(v.isUpperCase(['ROBOCOP'])).to.be.true;
    expect(v.isUpperCase({
      toString: function() {
        return 'BATMAN';
      }
    })).to.be.true;
  });

  it('should return false for a string containing lower case characters', function() {
    expect(v.isUpperCase('Helloworld')).to.be.false;
    expect(v.isUpperCase('WeLCOMETOEARTH')).to.be.false;
  });

  it('should return false for a boolean', function() {
    expect(v.isUpperCase(true)).to.be.false;
    expect(v.isUpperCase(false)).to.be.false;
  });

  it('should return false for a string containing characters different than upper case', function() {
    expect(v.isUpperCase('hello world!')).to.be.false;
    expect(v.isUpperCase('No one cared who I was until I put on the mask.')).to.be.false;
    expect(v.isUpperCase('\n')).to.be.false;
    expect(v.isUpperCase('\t')).to.be.false;
    expect(v.isUpperCase(' ')).to.be.false;
    expect(v.isUpperCase('')).to.be.false;
    expect(v.isUpperCase(PRINTABLE_ASCII)).to.be.false;
  });

  it('should return false for a non upper case string representation of an object', function() {
    expect(v.isUpperCase(['RoboCop'])).to.be.false;
    expect(v.isUpperCase({
      toString: function() {
        return 'Batman';
      }
    })).to.be.false;
  });

  it('should return false for a number or numeric string', function() {
    expect(v.isUpperCase(0)).to.be.false;
    expect(v.isUpperCase(-1500)).to.be.false;
    expect(v.isUpperCase(2017)).to.be.false;
    expect(v.isUpperCase('0')).to.be.false;
    expect(v.isUpperCase('1998')).to.be.false;
  });

  it('should return false for a null', function() {
    expect(v.isUpperCase(null)).to.be.false;
  });

  it('should return false for an undefined', function() {
    expect(v.isUpperCase(undefined)).to.be.false;
    expect(v.isUpperCase()).to.be.false;
  });

});