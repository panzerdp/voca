import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('pad', function() {

  it('should pad a string', function() {
    expect(v.pad('FF', 4, '0')).to.be.equal('0FF0');
    expect(v.pad('00FF', 4, '0')).to.be.equal('00FF');
    expect(v.pad('ab', 10, '012')).to.be.equal('0120ab0120');
    expect(v.pad('0', 5, '0')).to.be.equal('00000');
    expect(v.pad('', 10, '01')).to.be.equal('0101001010');
    expect(v.pad('Hello World')).to.be.equal('Hello World');
    expect(v.pad('Hello World', 20, '')).to.be.equal('Hello World');
    expect(v.pad('Welcome', 10)).to.be.equal(' Welcome  ');
    expect(v.pad('Alien', 10, '-=')).to.be.equal('-=Alien-=-');
    expect(v.pad(PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII);
    expect(v.pad(PRINTABLE_ASCII, PRINTABLE_ASCII.length + 3, '--')).to.be.equal('-' + PRINTABLE_ASCII + '--');
    expect(v.pad('')).to.be.equal('');
    expect(v.pad('', 0)).to.be.equal('');
  });

  it('should not modify the string when pad length is less than string length', function() {
    expect(v.pad('Hello World', 0, ' ')).to.be.equal('Hello World');
    expect(v.pad('Hello World', 5, ' ')).to.be.equal('Hello World');
    expect(v.pad('0', 0, ' ')).to.be.equal('0');
    expect(v.pad('123', -1, ' ')).to.be.equal('123');
  });

  it('should pad a string representation of an object', function() {
    expect(v.pad(['Welcome'], 9)).to.be.equal(' Welcome ');
    expect(v.pad({
      toString: function() {
        return 'great';
      }
    }, 10, '-')).to.be.equal('--great---');
  });

  it('should return an empty string for null or undefined', function() {
    expect(v.pad()).to.be.equal('');
    expect(v.pad(undefined)).to.be.equal('');
    expect(v.pad(null)).to.be.equal('');
  });

});