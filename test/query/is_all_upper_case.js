import v from '../voca';
import { expect } from 'chai';

describe('isAllUpperCase', function() {

  it('should return true for an upper case string', function() {
    expect(v.isAllUpperCase('A')).to.be.true;
    expect(v.isAllUpperCase('HELLOWORLD')).to.be.true;
    expect(v.isAllUpperCase('WELCOMETOEARTH')).to.be.true;
    expect(v.isAllUpperCase('ПРИВЕТЗЕМЛЯНЕ')).to.be.true;
    expect(v.isAllUpperCase('ÁÉÈÊËÍÎÏÓÔÚÛÝÀÒÜÇÄÖÂÙŸÃÕÑ')).to.be.true;
  });

  it('should return true for a lower case string representation of an object', function() {
    expect(v.isAllUpperCase(['ROBOCOP'])).to.be.true;
    expect(v.isAllUpperCase({
      toString: function() {
        return 'BATMAN';
      }
    })).to.be.true;
  });

  it('should return false for a string containing lower case characters', function() {
    expect(v.isAllUpperCase('Helloworld')).to.be.false;
    expect(v.isAllUpperCase('WeLCOMETOEARTH')).to.be.false;
    expect(v.isAllUpperCase('ПриветЗемляне')).to.be.false;
  });

  it('should return false for a boolean', function() {
    expect(v.isAllUpperCase(true)).to.be.false;
    expect(v.isAllUpperCase(false)).to.be.false;
  });

  it('should return false for a string containing characters different than upper case', function() {
    expect(v.isAllUpperCase('hello world!')).to.be.false;
    expect(v.isAllUpperCase('No one cared who I was until I put on the mask.')).to.be.false;
    expect(v.isAllUpperCase('Привет, Земляне!')).to.be.false;
    expect(v.isAllUpperCase('\n')).to.be.false;
    expect(v.isAllUpperCase('\t')).to.be.false;
    expect(v.isAllUpperCase(' ')).to.be.false;
    expect(v.isAllUpperCase('')).to.be.false;
  });

  it('should return false for a non upper case string representation of an object', function() {
    expect(v.isAllUpperCase(['RoboCop'])).to.be.false;
    expect(v.isAllUpperCase({
      toString: function() {
        return 'Batman';
      }
    })).to.be.false;
  });

  it('should return false for a number or numeric string', function() {
    expect(v.isAllUpperCase(0)).to.be.false;
    expect(v.isAllUpperCase(-1500)).to.be.false;
    expect(v.isAllUpperCase(2017)).to.be.false;
    expect(v.isAllUpperCase('0')).to.be.false;
    expect(v.isAllUpperCase('1998')).to.be.false;
  });

  it('should return false for a null', function() {
    expect(v.isAllUpperCase(null)).to.be.false;
  });

  it('should return false for an undefined', function() {
    expect(v.isAllUpperCase(undefined)).to.be.false;
    expect(v.isAllUpperCase()).to.be.false;
  });

});