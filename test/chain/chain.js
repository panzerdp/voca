import v from '../voca';
import ChainWrapper from '../../src/chain/wrapper';
import { expect } from 'chai';

describe('chain', function() {

  it('should calculate the result using explicit chaining', function() {
    expect(
      v
        .chain('Hello world')
        .value()
    ).to.equal('Hello world');
    expect(
      v
        .chain('  Hello world  ')
        .trim()
        .value()
    ).to.equal('Hello world');
    expect(
      v
        .chain('world')
        .isAlpha()
        .value()
    ).to.equal(true);
    expect(
      v
        .chain('Hello world')
        .lowerCase()
        .replace('hello', 'hi')
        .upperCase()
        .value()
    ).to.equal('HI WORLD');
  });

  it('should calculate the result using implicit chaining', function() {
    expect(
      v('Hello world')
        .lowerCase()
        .words()
    ).to.eql(['hello', 'world']);
    expect(
      v('  Hello world  ')
        .trimLeft()
        .count()
    ).to.equal(13);
    expect(
      v('7 days')
        .replace(/\sdays/, '')
        .isDigit()
    ).to.equal(true);
    expect(
      v('7 days')
        .replace(/\sdays/, '')
        .value()
    ).to.equal('7');
  });

  it('should transform implicit into explicit chaining', function() {
    expect(
      v('Hello world')
        .chain()
        .lowerCase()
        .words()
        .value()
    ).to.eql(['hello', 'world']);
    expect(
      v('15')
        .chain()
        .isNumeric()
        .value()
    ).to.equal(true);
    expect(
      v('15')
        .chain()
        .isNumeric()
    ).to.be.instanceof(ChainWrapper);
  });

  it('wrapper object should coerce to a primitive', function() {
    expect('nice' + v.chain(' evening ').trimRight()).to.be.equal('nice evening');
   // expect('nice ' + v.chain('hello world').words()).to.be.equal('nice hello,world');
  });

  it('wrapper object should coerce to a string', function() {
   // expect(v.chain(' evening ').trimRight().toString()).to.be.equal('nice evening');
  });

});