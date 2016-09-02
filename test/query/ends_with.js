import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('endsWith', function() {

  it('should return true for valid ending string', function() {
    expect(v.endsWith('Hello World!', '')).to.be.true;
    expect(v.endsWith('Hello World!', '!')).to.be.true;
    expect(v.endsWith('Hello World!', 'd!')).to.be.true;
    expect(v.endsWith('Hello World!', 'rld!')).to.be.true;
    expect(v.endsWith('Hello World!', 'orld!')).to.be.true;
    expect(v.endsWith('Hello World!', 'World!')).to.be.true;
    expect(v.endsWith('Hello World!', ' World!')).to.be.true;
    expect(v.endsWith('Hello World!', 'o World!')).to.be.true;
    expect(v.endsWith('Hello World!', 'lo World!')).to.be.true;
    expect(v.endsWith('Hello World!', 'llo World!')).to.be.true;
    expect(v.endsWith('Hello World!', 'ello World!')).to.be.true;
    expect(v.endsWith('Hello World!', 'Hello World!')).to.be.true;
    expect(v.endsWith('Привет Мир!', 'Мир!')).to.be.true;
    expect(v.endsWith('', '')).to.be.true;
    expect(v.endsWith(PRINTABLE_ASCII, '~')).to.be.true;
  });

  it('should return true for valid ending string and position', function() {
    expect(v.endsWith('Hello World!', '', 'Hello World'.length)).to.be.true;
    expect(v.endsWith('Hello World!', 'Hello World!', 'Hello World!'.length)).to.be.true;
    expect(v.endsWith('Hello World!', 'Hello World', 'Hello World!'.length - 1)).to.be.true;
    expect(v.endsWith('Hello World!', 'Hello Worl', 'Hello World!'.length - 2)).to.be.true;
    expect(v.endsWith('Hello World!', 'Hello Wor', 'Hello World!'.length - 3)).to.be.true;
    expect(v.endsWith('Hello World!', 'Hello Wo', 'Hello World!'.length - 4)).to.be.true;
    expect(v.endsWith('Hello World!', 'Hello W', 'Hello World!'.length - 5)).to.be.true;
    expect(v.endsWith('Hello World!', 'Hello ', 'Hello World!'.length - 6)).to.be.true;
    expect(v.endsWith('Hello World!', 'Hello', 'Hello World!'.length - 7)).to.be.true;
    expect(v.endsWith('Hello World!', 'Hell', 'Hello World!'.length - 8)).to.be.true;
    expect(v.endsWith('Hello World!', 'Hel', 'Hello World!'.length - 9)).to.be.true;
    expect(v.endsWith('Hello World!', 'He', 'Hello World!'.length - 10)).to.be.true;
    expect(v.endsWith('Hello World!', 'H', 'Hello World!'.length - 11)).to.be.true;
    expect(v.endsWith('', '', 0)).to.be.true;
  });

  it('should return true for a correct downcast of the position', function() {
    expect(v.endsWith('Hello World!', 'ello', '5')).to.be.true;
    expect(v.endsWith('Hello World!', 'ello', 5.1)).to.be.true;
    expect(v.endsWith('Hello World!', 'World!', 30000)).to.be.true;
    expect(v.endsWith('Hello World!', 'World!', Infinity)).to.be.true;
  });

  it('should return true for an empty ending string', function() {
    [0, 1, 100, Infinity, undefined, NaN, null].forEach(function(position) {
      expect(v.endsWith('Hello World!', '', position)).to.be.true;
    });
  });

  it('should return true for valid ending number', function() {
    expect(v.endsWith(1000, 0)).to.be.true;
    expect(v.endsWith(1250, 50)).to.be.true;
    expect(v.endsWith('916', 16)).to.be.true;
  });

  it('should return true for a valid ending in a string representation of an object', function() {
    expect(v.endsWith(['Welcome to Earth'], 'Earth')).to.be.true;
    expect(v.endsWith({
      toString: function() {
        return 'Let us not stand on ceremony, Mr. Wayne.';
      }
    }, ['Mr. Wayne'], 'Let us not stand on ceremony, Mr. Wayne.'.length - 1)).to.be.true;
  });

  it('should return false for an invalid ending string', function() {
    expect(v.endsWith('The shadows betray you, because they belong to me!', 'The shadows')).to.be.false;
    expect(v.endsWith('The shadows betray you, because they belong to me!', 'to me')).to.be.false;
    expect(v.endsWith('They belong to me!', 'They belong to me')).to.be.false;
    expect(v.endsWith('They belong to me!', 'belong')).to.be.false;
    expect(v.endsWith('', 'The shadows')).to.be.false;
  });

  it('should return false for an invalid ending string and position', function() {
    expect(v.endsWith('The shadows betray you, because they belong to me!', 'they belong to me!', 5)).to.be.false;
    expect(v.endsWith('They belong to me!', 'They belong to me!', 'They belong to me!'.length - 1)).to.be.false;
    expect(v.endsWith('They belong to me!', 'They', 'They belong to me!'.length)).to.be.false;
    expect(v.endsWith('They belong to me!', 'belong', 'They belong to me!'.length)).to.be.false;
    expect(v.endsWith('They belong to me!', 'to me!', 0)).to.be.false;
    expect(v.endsWith('They belong to me!', 'belong to me!', -100)).to.be.false;
  });

  it('should return false for an invalid ending number', function() {
    expect(v.endsWith(1000, 10)).to.be.false;
    expect(v.endsWith(1250, 55)).to.be.false;
    expect(v.endsWith('916', 18)).to.be.false;
  });

  it('should return false for a NaN position', function() {
    expect(v.endsWith('Hello World!', 'World!', NaN)).to.be.false;
  });

  it('should return false for undefined and null parameters', function() {
    expect(v.endsWith()).to.be.false;
    expect(v.endsWith(undefined)).to.be.false;
    expect(v.endsWith(undefined, undefined)).to.be.false;
    expect(v.endsWith(undefined, undefined, undefined)).to.be.false;
    expect(v.endsWith(undefined, undefined, 0)).to.be.false;
    expect(v.endsWith(undefined, 'Hello World!')).to.be.false;
    expect(v.endsWith(null)).to.be.false;
    expect(v.endsWith(null, null)).to.be.false;
    expect(v.endsWith(null, null, null)).to.be.false;
    expect(v.endsWith(null, null, 0)).to.be.false;
    expect(v.endsWith(null, 'Hello World!')).to.be.false;
  });

});