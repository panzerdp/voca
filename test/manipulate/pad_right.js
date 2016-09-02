import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('padRight', function() {

  it('should right pad a string', function() {
    expect(v.padRight('FF', 4, '0')).to.be.equal('FF00');
    expect(v.padRight('00FF', 4, '0')).to.be.equal('00FF');
    expect(v.padRight('ab', 10, '012')).to.be.equal('ab01201201');
    expect(v.padRight('0', 5, '0')).to.be.equal('00000');
    expect(v.padRight('', 10, '01')).to.be.equal('0101010101');
    expect(v.padRight('Hello World')).to.be.equal('Hello World');
    expect(v.padRight('Hello World', 20, '')).to.be.equal('Hello World');
    expect(v.padRight('Welcome', 10)).to.be.equal('Welcome   ');
    expect(v.padRight('123', 6, '_-')).to.be.equal('123_-_');
    expect(v.padRight(PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII);
    expect(v.padRight(PRINTABLE_ASCII, PRINTABLE_ASCII.length + 3, '--')).to.be.equal(PRINTABLE_ASCII + '---');
    expect(v.padRight('')).to.be.equal('');
    expect(v.padRight('', 0)).to.be.equal('');
  });

  it('should not modify the string when pad length is less than string length', function() {
    expect(v.padRight('Hello World', 0, ' ')).to.be.equal('Hello World');
    expect(v.padRight('Hello World', 5, ' ')).to.be.equal('Hello World');
    expect(v.padRight('0', 0, ' ')).to.be.equal('0');
    expect(v.padRight('123', -1, ' ')).to.be.equal('123');
  });

  it('should right pad a string representation of an object', function() {
    expect(v.padRight(['Welcome'], 9)).to.be.equal('Welcome  ');
    expect(v.padRight({
      toString: function() {
        return 'great';
      }
    }, 10, '-')).to.be.equal('great-----');
  });

  it('should return an empty string for null or undefined', function() {
    expect(v.padRight()).to.be.equal('');
    expect(v.padRight(undefined)).to.be.equal('');
    expect(v.padRight(null)).to.be.equal('');
  });

});