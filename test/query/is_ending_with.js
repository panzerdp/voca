import v from '../voca';
import { expect } from 'chai';

describe('isEndingWith', function() {

  it('should return true for valid ending string', function() {
    expect(v.isEndingWith('Hello World!', '')).to.be.true;
    expect(v.isEndingWith('Hello World!', '!')).to.be.true;
    expect(v.isEndingWith('Hello World!', 'd!')).to.be.true;
    expect(v.isEndingWith('Hello World!', 'rld!')).to.be.true;
    expect(v.isEndingWith('Hello World!', 'orld!')).to.be.true;
    expect(v.isEndingWith('Hello World!', 'World!')).to.be.true;
    expect(v.isEndingWith('Hello World!', ' World!')).to.be.true;
    expect(v.isEndingWith('Hello World!', 'o World!')).to.be.true;
    expect(v.isEndingWith('Hello World!', 'lo World!')).to.be.true;
    expect(v.isEndingWith('Hello World!', 'llo World!')).to.be.true;
    expect(v.isEndingWith('Hello World!', 'ello World!')).to.be.true;
    expect(v.isEndingWith('Hello World!', 'Hello World!')).to.be.true;
    expect(v.isEndingWith('Привет Мир!', 'Мир!')).to.be.true;
    expect(v.isEndingWith('', '')).to.be.true;
  });

  it('should return true for valid ending string and position', function() {
    expect(v.isEndingWith('Hello World!', '', 'Hello World'.length)).to.be.true;
    expect(v.isEndingWith('Hello World!', 'Hello World!', 'Hello World!'.length)).to.be.true;
    expect(v.isEndingWith('Hello World!', 'Hello World', 'Hello World!'.length - 1)).to.be.true;
    expect(v.isEndingWith('Hello World!', 'Hello Worl', 'Hello World!'.length - 2)).to.be.true;
    expect(v.isEndingWith('Hello World!', 'Hello Wor', 'Hello World!'.length - 3)).to.be.true;
    expect(v.isEndingWith('Hello World!', 'Hello Wo', 'Hello World!'.length - 4)).to.be.true;
    expect(v.isEndingWith('Hello World!', 'Hello W', 'Hello World!'.length - 5)).to.be.true;
    expect(v.isEndingWith('Hello World!', 'Hello ', 'Hello World!'.length - 6)).to.be.true;
    expect(v.isEndingWith('Hello World!', 'Hello', 'Hello World!'.length - 7)).to.be.true;
    expect(v.isEndingWith('Hello World!', 'Hell', 'Hello World!'.length - 8)).to.be.true;
    expect(v.isEndingWith('Hello World!', 'Hel', 'Hello World!'.length - 9)).to.be.true;
    expect(v.isEndingWith('Hello World!', 'He', 'Hello World!'.length - 10)).to.be.true;
    expect(v.isEndingWith('Hello World!', 'H', 'Hello World!'.length - 11)).to.be.true;
    expect(v.isEndingWith('', '', 0)).to.be.true;
  });

  it('should return true for valid ending number', function() {
    expect(v.isEndingWith(1000, 0)).to.be.true;
    expect(v.isEndingWith(1250, 50)).to.be.true;
    expect(v.isEndingWith('916', 16)).to.be.true;
  });

  it('should return true for a valid ending in a string representation of an object', function() {
    expect(v.isEndingWith(['Welcome to Earth'], 'Earth')).to.be.true;
    expect(v.isEndingWith({
      toString: function() {
        return 'Let us not stand on ceremony, Mr. Wayne.';
      }
    }, ['Mr. Wayne'], 'Let us not stand on ceremony, Mr. Wayne.'.length - 1)).to.be.true;
  });

  it('should return false for an invalid ending string', function() {
    expect(v.isEndingWith('The shadows betray you, because they belong to me!', 'The shadows')).to.be.false;
    expect(v.isEndingWith('The shadows betray you, because they belong to me!', 'to me')).to.be.false;
    expect(v.isEndingWith('They belong to me!', 'They belong to me')).to.be.false;
    expect(v.isEndingWith('They belong to me!', 'belong')).to.be.false;
    expect(v.isEndingWith('', 'The shadows')).to.be.false;
  });

  it('should return false for an invalid ending string and position', function() {
    expect(v.isEndingWith('The shadows betray you, because they belong to me!', 'they belong to me!', 5)).to.be.false;
    expect(v.isEndingWith('They belong to me!', 'They belong to me!', 'They belong to me!'.length - 1)).to.be.false;
    expect(v.isEndingWith('They belong to me!', 'They', 'They belong to me!'.length)).to.be.false;
    expect(v.isEndingWith('They belong to me!', 'belong', 'They belong to me!'.length)).to.be.false;
    expect(v.isEndingWith('They belong to me!', 'to me!', 0)).to.be.false;
    expect(v.isEndingWith('They belong to me!', 'belong to me!', -100)).to.be.false;
  });

  it('should return false for an invalid ending number', function() {
    expect(v.isEndingWith(1000, 10)).to.be.false;
    expect(v.isEndingWith(1250, 55)).to.be.false;
    expect(v.isEndingWith('916', 18)).to.be.false;
  });

  it('should return false for undefined and null parameters', function() {
    expect(v.isEndingWith()).to.be.false;
    expect(v.isEndingWith(undefined)).to.be.false;
    expect(v.isEndingWith(undefined, undefined)).to.be.false;
    expect(v.isEndingWith(undefined, undefined, undefined)).to.be.false;
    expect(v.isEndingWith(undefined, undefined, 0)).to.be.false;
    expect(v.isEndingWith(undefined, 'Hello World!')).to.be.false;
    expect(v.isEndingWith(null)).to.be.false;
    expect(v.isEndingWith(null, null)).to.be.false;
    expect(v.isEndingWith(null, null, null)).to.be.false;
    expect(v.isEndingWith(null, null, 0)).to.be.false;
    expect(v.isEndingWith(null, 'Hello World!')).to.be.false;
  });

});