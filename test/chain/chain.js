/* eslint-disable */
import v from '../voca';
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
        .words()
    ).to.eql(['Hello', 'world']);
  });

});