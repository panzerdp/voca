import v from '../voca';
import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../utils/string/ascii';

describe('sprintf', function() {

  it('should return a string according to string type formatting', function shouldReturnStringBasedOnFormatting() {
    expect(v.sprintf('%s', 'string')).to.be.equal('string');
    expect(v.sprintf('Hello %s!', 'World')).to.be.equal('Hello World!');
    expect(v.sprintf('%s %s!', 'Hello', 'World')).to.be.equal('Hello World!');
    expect(v.sprintf('%s %s!', '%s', '%s')).to.be.equal('%s %s!');
    expect(v.sprintf('Hello %5s!', 'World')).to.be.equal('Hello World!');
    expect(v.sprintf('Hello %3s!', 'World')).to.be.equal('Hello World!');
    expect(v.sprintf('Hello %8s!', 'World')).to.be.equal('Hello    World!');
    expect(v.sprintf('%s%s%s%s%s', 'Alexander', ' ', 'the', ' ', 'Great')).to.be.equal('Alexander the Great');
    expect(v.sprintf('Alexander the %08s', 'Great')).to.be.equal('Alexander the 000Great');
    expect(v.sprintf('Alexander the % 8s', 'Great')).to.be.equal('Alexander the    Great');
    expect(v.sprintf("%'-10s the %s", 'Alexander', 'Great')).to.be.equal('-Alexander the Great');
    expect(v.sprintf("%'.12s the %09s", 'Alexander', 'Great')).to.be.equal('...Alexander the 0000Great');
    expect(v.sprintf('%-12s', 'Alexander')).to.be.equal('Alexander   ');
    expect(v.sprintf('%+-12s', 'Alexander')).to.be.equal('Alexander   ');
    expect(v.sprintf('%.4s the Great', 'Alexander')).to.be.equal('Alex the Great');
    expect(v.sprintf('%.9s the Great', 'Alexander')).to.be.equal('Alexander the Great');
    expect(v.sprintf('%.0s the Great', 'Alexander')).to.be.equal(' the Great');
    expect(v.sprintf('%10.8s the Great', 'Alexander')).to.be.equal('  Alexande the Great');
    expect(v.sprintf('%\'-10.6s %\'1-12.4s', 'Persian', 'Empire')).to.be.equal('----Persia Empi11111111');
  });

  it('should throw exceptions when the formatter is not valid or not enough arguments', function shouldThrowException() {
    expect(v.sprintf.bind(v, '%s')).to.throw(Error, 'sprintf(): Too few arguments');
    expect(v.sprintf.bind(v, '%s %s')).to.throw(Error, 'sprintf(): Too few arguments');
    expect(v.sprintf.bind(v, '%s %s', 'Alexander')).to.throw(Error, 'sprintf(): Too few arguments');
    expect(v.sprintf.bind(v, '%2$s %1$s', 'Alexander')).to.throw(Error, 'sprintf(): Too few arguments');
    expect(v.sprintf.bind(v, '%2$s %1$s', 'Alexander')).to.throw(Error, 'sprintf(): Too few arguments');
  });

  it('should ignore specifiers with double percent characters', function shouldIgnoreSpecifiersWithDoublePercent() {
    expect(v.sprintf('%%s')).to.be.equal('%s');
    expect(v.sprintf('%%s %s', 'Persian')).to.be.equal('%s Persian');
  });

  it('should return an unmodified string for missing formatting specifiers', function shouldNotModifyString() {
    expect(v.sprintf('Without formatting')).to.be.equal('Without formatting');
    expect(v.sprintf('')).to.be.equal('');
  });

});