import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('padLeft', function() {

  it('should left pad a string', function() {
    expect(v.padLeft('FF', 4, '0')).to.be.equal('00FF');
    expect(v.padLeft('00FF', 4, '0')).to.be.equal('00FF');
    expect(v.padLeft('ab', 10, '012')).to.be.equal('01201201ab');
    expect(v.padLeft('0', 5, '0')).to.be.equal('00000');
    expect(v.padLeft('', 10, '01')).to.be.equal('0101010101');
    expect(v.padLeft('Hello World')).to.be.equal('Hello World');
    expect(v.padLeft('Hello World', 20, '')).to.be.equal('Hello World');
    expect(v.padLeft('Welcome', 10)).to.be.equal('   Welcome');
    expect(v.padLeft('Alien', 10, '-=')).to.be.equal('-=-=-Alien');
    expect(v.padLeft(PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII);
    expect(v.padLeft(PRINTABLE_ASCII, PRINTABLE_ASCII.length + 3, '--')).to.be.equal('---' + PRINTABLE_ASCII);
    expect(v.padLeft('')).to.be.equal('');
    expect(v.padLeft('', 0)).to.be.equal('');
  });

  it('should not modify the string when pad length is less than string length', function() {
    expect(v.padLeft('Hello World', 0, ' ')).to.be.equal('Hello World');
    expect(v.padLeft('Hello World', 5, ' ')).to.be.equal('Hello World');
    expect(v.padLeft('0', 0, ' ')).to.be.equal('0');
    expect(v.padLeft('123', -1, ' ')).to.be.equal('123');
  });

  it('should left pad a string representation of an object', function() {
    expect(v.padLeft(['Welcome'], 9)).to.be.equal('  Welcome');
    expect(v.padLeft({
      toString: function() {
        return 'great';
      }
    }, 10, '-')).to.be.equal('-----great');
  });

  it('should return an empty string for null or undefined', function() {
    expect(v.padLeft()).to.be.equal('');
    expect(v.padLeft(undefined)).to.be.equal('');
    expect(v.padLeft(null)).to.be.equal('');
  });

});