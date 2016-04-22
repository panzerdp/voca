import v from '../voca';
import { expect } from 'chai';

describe('isAllLowerCase', function() {

  it('should return true for a lower case string', function() {
    expect(v.isAllLowerCase('a')).to.be.true;
    expect(v.isAllLowerCase('helloworld')).to.be.true;
    expect(v.isAllLowerCase('welcometoearth')).to.be.true;
    expect(v.isAllLowerCase('приветземляне')).to.be.true;
    expect(v.isAllLowerCase('áéèêëíîïóôúûýàòüçäöâùÿãõñ')).to.be.true;
  });

  it('should return true for a lower case string representation of an object', function() {
    expect(v.isAllLowerCase(['robocop'])).to.be.true;
    expect(v.isAllLowerCase({
      toString: function() {
        return 'batman';
      }
    })).to.be.true;
  });

  it('should return true for a boolean', function() {
    expect(v.isAllLowerCase(true)).to.be.true;
    expect(v.isAllLowerCase(false)).to.be.true;
  });

  it('should return false for a string containing upper case characters', function() {
    expect(v.isAllLowerCase('Helloworld')).to.be.false;
    expect(v.isAllLowerCase('WELCOMETOEARTH')).to.be.false;
    expect(v.isAllLowerCase('ПриветЗемляне')).to.be.false;
  });

  it('should return false for a string containing characters different than lower case', function() {
    expect(v.isAllLowerCase('hello world!')).to.be.false;
    expect(v.isAllLowerCase('No one cared who I was until I put on the mask.')).to.be.false;
    expect(v.isAllLowerCase('Привет, Земляне!')).to.be.false;
    expect(v.isAllLowerCase('\n')).to.be.false;
    expect(v.isAllLowerCase('\t')).to.be.false;
    expect(v.isAllLowerCase(' ')).to.be.false;
    expect(v.isAllLowerCase('')).to.be.false;
  });

  it('should return false for a non lower case string representation of an object', function() {
    expect(v.isAllLowerCase(['RoboCop'])).to.be.false;
    expect(v.isAllLowerCase({
      toString: function() {
        return 'Batman';
      }
    })).to.be.false;
  });

  it('should return false for a number or numeric string', function() {
    expect(v.isAllLowerCase(0)).to.be.false;
    expect(v.isAllLowerCase(-1500)).to.be.false;
    expect(v.isAllLowerCase(2017)).to.be.false;
    expect(v.isAllLowerCase('0')).to.be.false;
    expect(v.isAllLowerCase('1998')).to.be.false;
  });

  it('should return false for a null', function() {
    expect(v.isAllLowerCase(null)).to.be.false;
  });

  it('should return false for an undefined', function() {
    expect(v.isAllLowerCase(undefined)).to.be.false;
    expect(v.isAllLowerCase()).to.be.false;
  });

});