import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('startsWith', function() {

  it('should return true for a valid starting string', function() {
    expect(v.startsWith('Hello World!', '')).to.be.true;
    expect(v.startsWith('Hello World!', 'H')).to.be.true;
    expect(v.startsWith('Hello World!', 'He')).to.be.true;
    expect(v.startsWith('Hello World!', 'Hel')).to.be.true;
    expect(v.startsWith('Hello World!', 'Hell')).to.be.true;
    expect(v.startsWith('Hello World!', 'Hello')).to.be.true;
    expect(v.startsWith('Hello World!', 'Hello ')).to.be.true;
    expect(v.startsWith('Hello World!', 'Hello W')).to.be.true;
    expect(v.startsWith('Hello World!', 'Hello Wo')).to.be.true;
    expect(v.startsWith('Hello World!', 'Hello Wor')).to.be.true;
    expect(v.startsWith('Hello World!', 'Hello Worl')).to.be.true;
    expect(v.startsWith('Hello World!', 'Hello World')).to.be.true;
    expect(v.startsWith('Hello World!', 'Hello World!')).to.be.true;
    expect(v.startsWith('Привет Мир!', 'Привет')).to.be.true;
    expect(v.startsWith('', '')).to.be.true;
    expect(v.startsWith(PRINTABLE_ASCII, ' ')).to.be.true;
  });

  it('should return true for a valid starting string and position', function() {
    expect(v.startsWith('Hello World!', '', 0)).to.be.true;
    expect(v.startsWith('Hello World!', '!', 'Hello World!'.length - 1)).to.be.true;
    expect(v.startsWith('Hello World!', 'd!', 'Hello World!'.length - 2)).to.be.true;
    expect(v.startsWith('Hello World!', 'ld!', 'Hello World!'.length - 3)).to.be.true;
    expect(v.startsWith('Hello World!', 'rld!', 'Hello World!'.length - 4)).to.be.true;
    expect(v.startsWith('Hello World!', 'orld!', 'Hello World!'.length - 5)).to.be.true;
    expect(v.startsWith('Hello World!', 'World!', 'Hello World!'.length - 6)).to.be.true;
    expect(v.startsWith('Hello World!', ' World!', 'Hello World!'.length - 7)).to.be.true;
    expect(v.startsWith('Hello World!', 'o World!', 'Hello World!'.length - 8)).to.be.true;
    expect(v.startsWith('Hello World!', 'lo World!', 'Hello World!'.length - 9)).to.be.true;
    expect(v.startsWith('Hello World!', 'llo World!', 'Hello World!'.length - 10)).to.be.true;
    expect(v.startsWith('Hello World!', 'ello World!', 'Hello World!'.length - 11)).to.be.true;
    expect(v.startsWith('Hello World!', 'Hello World!', 0)).to.be.true;
    expect(v.startsWith('', '', 0)).to.be.true;
    expect(v.startsWith('Hello World!', 'Hello', NaN)).to.be.true;
  });

  it('should return true for a correct downcast of the position', function() {
    expect(v.startsWith('Hello World!', 'ello', '1')).to.be.true;
    expect(v.startsWith('Hello World!', 'ello', 1.1)).to.be.true;
    expect(v.startsWith('Hello World!', 'Hello', -1)).to.be.true;
    expect(v.startsWith('Hello World!', 'Hello', -Infinity)).to.be.true;
  });

  it('should return true for an empty starting string', function() {
    [0, 1, 100, Infinity, undefined, NaN, null].forEach(function(position) {
      expect(v.startsWith('Hello World!', '', position)).to.be.true;
    });
  });

  it('should return true for a valid starting as a number', function() {
    expect(v.startsWith(1000, 100)).to.be.true;
    expect(v.startsWith(1250, 12)).to.be.true;
    expect(v.startsWith('916', 91)).to.be.true;
  });

  it('should return true for a valid ending in a string representation of an object', function() {
    expect(v.startsWith(['Welcome to Earth'], 'Welcome')).to.be.true;
    expect(v.startsWith({
      toString: function() {
        return 'Let us not stand on ceremony, Mr. Wayne.';
      }
    }, ['Let us not stand on ceremony'])).to.be.true;
  });

  it('should return false for an invalid starting string', function() {
    expect(v.startsWith('The shadows betray you, because they belong to me!', 'belong to me!')).to.be.false;
    expect(v.startsWith('The shadows betray you, because they belong to me!', 'he shadows')).to.be.false;
    expect(v.startsWith('They belong to me!', 'hey belong to me!')).to.be.false;
    expect(v.startsWith('They belong to me!', 'belong')).to.be.false;
    expect(v.startsWith('', 'The shadows')).to.be.false;
  });

  it('should return false for an invalid starting string and position', function() {
    expect(v.startsWith('The shadows betray you, because they belong to me!', 'The shadows betray you', 1)).to.be.false;
    expect(v.startsWith('They belong to me!', 'They belong to me!', 1)).to.be.false;
    expect(v.startsWith('They belong to me!', 'They', 1)).to.be.false;
    expect(v.startsWith('They belong to me!', 'belong', 2)).to.be.false;
    expect(v.startsWith('They belong to me!', 'to me!', 3)).to.be.false;
    expect(v.startsWith('They belong to me!', 'They belong', 100)).to.be.false;
  });

  it('should return false for an invalid starting number', function() {
    expect(v.startsWith(1000, 11)).to.be.false;
    expect(v.startsWith(1250, 10)).to.be.false;
    expect(v.startsWith('916', 90)).to.be.false;
  });

  it('should return false for undefined and null parameters', function() {
    expect(v.startsWith()).to.be.false;
    expect(v.startsWith(undefined)).to.be.false;
    expect(v.startsWith(undefined, undefined)).to.be.false;
    expect(v.startsWith(undefined, undefined, undefined)).to.be.false;
    expect(v.startsWith(undefined, undefined, 0)).to.be.false;
    expect(v.startsWith(undefined, 'Hello World!')).to.be.false;
    expect(v.startsWith(null)).to.be.false;
    expect(v.startsWith(null, null)).to.be.false;
    expect(v.startsWith(null, null, null)).to.be.false;
    expect(v.startsWith(null, null, 0)).to.be.false;
    expect(v.startsWith(null, 'Hello World!')).to.be.false;
  });

});