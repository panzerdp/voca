import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('repeat', function() {

  it('should repeat a string', function() {
    expect(v.repeat('paradise', 2)).to.be.equal('paradiseparadise');
    expect(v.repeat('w', 3)).to.be.equal('www');
    expect(v.repeat('the world is yours', 1)).to.be.equal('the world is yours');
    expect(v.repeat('', 10)).to.be.equal('');
    expect(v.repeat(PRINTABLE_ASCII, 2)).to.be.equal(PRINTABLE_ASCII + PRINTABLE_ASCII);
  });

  it('should return an empty string for 0 repeat times', function() {
    expect(v.repeat('the world is yours', 0)).to.be.equal('');
    expect(v.repeat('', 0)).to.be.equal('');
  });

  it('should return the same string when the number of times is null or undefined', function() {
    expect(v.repeat('the world is yours')).to.be.equal('the world is yours');
    expect(v.repeat('the world is yours', null)).to.be.equal('the world is yours');
    expect(v.repeat('the world is yours', undefined)).to.be.equal('the world is yours');
  });

  it('should repeat a number', function() {
    expect(v.repeat(123, 2)).to.be.equal('123123');
    expect(v.repeat(0, 5)).to.be.equal('00000');
    expect(v.repeat(-1.5, 2)).to.be.equal('-1.5-1.5');
  });

  it('should repeat a string representation of an object', function() {
    expect(v.repeat(['paradise'], 2)).to.be.equal('paradiseparadise');
    expect(v.repeat({
      toString: function() {
        return 'Tony';
      }
    }, 2)).to.be.equal('TonyTony');
  });

  it('should return an empty string for null or undefined string to be repeated', function() {
    expect(v.repeat()).to.be.equal('');
    expect(v.repeat(null)).to.be.equal('');
    expect(v.repeat(undefined)).to.be.equal('');
    expect(v.repeat(undefined, 10)).to.be.equal('');
  });

});