import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('isLowerCase', function() {

  it('should return true for a lower case string', function() {
    expect(v.isLowerCase('a')).to.be.true;
    expect(v.isLowerCase('helloworld')).to.be.true;
    expect(v.isLowerCase('welcometoearth')).to.be.true;
    expect(v.isLowerCase('áéèêëíîïóôúûýàòüçäöâùÿãõñ')).to.be.true;
  });

  it('should return true for a lower case string representation of an object', function() {
    expect(v.isLowerCase(['robocop'])).to.be.true;
    expect(v.isLowerCase({
      toString: function() {
        return 'batman';
      }
    })).to.be.true;
  });

  it('should return true for a boolean', function() {
    expect(v.isLowerCase(true)).to.be.true;
    expect(v.isLowerCase(false)).to.be.true;
  });

  it('should return false for a string containing upper case characters', function() {
    expect(v.isLowerCase('Helloworld')).to.be.false;
    expect(v.isLowerCase('WELCOMETOEARTH')).to.be.false;
  });

  it('should return false for a string containing characters different than lower case', function() {
    expect(v.isLowerCase('hello world!')).to.be.false;
    expect(v.isLowerCase('No one cared who I was until I put on the mask.')).to.be.false;
    expect(v.isLowerCase('\n')).to.be.false;
    expect(v.isLowerCase('\t')).to.be.false;
    expect(v.isLowerCase(' ')).to.be.false;
    expect(v.isLowerCase('')).to.be.false;
    expect(v.isLowerCase(PRINTABLE_ASCII)).to.be.false;
  });

  it('should return false for a non lower case string representation of an object', function() {
    expect(v.isLowerCase(['RoboCop'])).to.be.false;
    expect(v.isLowerCase({
      toString: function() {
        return 'Batman';
      }
    })).to.be.false;
  });

  it('should return false for a number or numeric string', function() {
    expect(v.isLowerCase(0)).to.be.false;
    expect(v.isLowerCase(-1500)).to.be.false;
    expect(v.isLowerCase(2017)).to.be.false;
    expect(v.isLowerCase('0')).to.be.false;
    expect(v.isLowerCase('1998')).to.be.false;
  });

  it('should return false for a null', function() {
    expect(v.isLowerCase(null)).to.be.false;
  });

  it('should return false for an undefined', function() {
    expect(v.isLowerCase(undefined)).to.be.false;
    expect(v.isLowerCase()).to.be.false;
  });

});