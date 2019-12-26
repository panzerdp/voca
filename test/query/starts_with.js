import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('startsWith', function() {
  it('should return true for a valid starting string', function() {
    expect(v.startsWith('Hello World!', '')).toBe(true);
    expect(v.startsWith('Hello World!', 'H')).toBe(true);
    expect(v.startsWith('Hello World!', 'He')).toBe(true);
    expect(v.startsWith('Hello World!', 'Hel')).toBe(true);
    expect(v.startsWith('Hello World!', 'Hell')).toBe(true);
    expect(v.startsWith('Hello World!', 'Hello')).toBe(true);
    expect(v.startsWith('Hello World!', 'Hello ')).toBe(true);
    expect(v.startsWith('Hello World!', 'Hello W')).toBe(true);
    expect(v.startsWith('Hello World!', 'Hello Wo')).toBe(true);
    expect(v.startsWith('Hello World!', 'Hello Wor')).toBe(true);
    expect(v.startsWith('Hello World!', 'Hello Worl')).toBe(true);
    expect(v.startsWith('Hello World!', 'Hello World')).toBe(true);
    expect(v.startsWith('Hello World!', 'Hello World!')).toBe(true);
    expect(v.startsWith('Привет Мир!', 'Привет')).toBe(true);
    expect(v.startsWith('', '')).toBe(true);
    expect(v.startsWith(PRINTABLE_ASCII, ' ')).toBe(true);
  });

  it('should return true for a valid starting string and position', function() {
    expect(v.startsWith('Hello World!', '', 0)).toBe(true);
    expect(v.startsWith('Hello World!', '!', 'Hello World!'.length - 1)).toBe(true);
    expect(v.startsWith('Hello World!', 'd!', 'Hello World!'.length - 2)).toBe(true);
    expect(v.startsWith('Hello World!', 'ld!', 'Hello World!'.length - 3)).toBe(true);
    expect(v.startsWith('Hello World!', 'rld!', 'Hello World!'.length - 4)).toBe(true);
    expect(v.startsWith('Hello World!', 'orld!', 'Hello World!'.length - 5)).toBe(true);
    expect(v.startsWith('Hello World!', 'World!', 'Hello World!'.length - 6)).toBe(true);
    expect(v.startsWith('Hello World!', ' World!', 'Hello World!'.length - 7)).toBe(true);
    expect(v.startsWith('Hello World!', 'o World!', 'Hello World!'.length - 8)).toBe(true);
    expect(v.startsWith('Hello World!', 'lo World!', 'Hello World!'.length - 9)).toBe(true);
    expect(v.startsWith('Hello World!', 'llo World!', 'Hello World!'.length - 10)).toBe(true);
    expect(v.startsWith('Hello World!', 'ello World!', 'Hello World!'.length - 11)).toBe(true);
    expect(v.startsWith('Hello World!', 'Hello World!', 0)).toBe(true);
    expect(v.startsWith('', '', 0)).toBe(true);
    expect(v.startsWith('Hello World!', 'Hello', NaN)).toBe(true);
  });

  it('should return true for a correct downcast of the position', function() {
    expect(v.startsWith('Hello World!', 'ello', '1')).toBe(true);
    expect(v.startsWith('Hello World!', 'ello', 1.1)).toBe(true);
    expect(v.startsWith('Hello World!', 'Hello', -1)).toBe(true);
    expect(v.startsWith('Hello World!', 'Hello', -Infinity)).toBe(true);
  });

  it('should return true for an empty starting string', function() {
    [0, 1, 100, Infinity, undefined, NaN, null].forEach(function(position) {
      expect(v.startsWith('Hello World!', '', position)).toBe(true);
    });
  });

  it('should return true for a valid starting as a number', function() {
    expect(v.startsWith(1000, 100)).toBe(true);
    expect(v.startsWith(1250, 12)).toBe(true);
    expect(v.startsWith('916', 91)).toBe(true);
  });

  it('should return true for a valid ending in a string representation of an object', function() {
    expect(v.startsWith(['Welcome to Earth'], 'Welcome')).toBe(true);
    expect(
      v.startsWith(
        {
          toString: function() {
            return 'Let us not stand on ceremony, Mr. Wayne.';
          },
        },
        ['Let us not stand on ceremony']
      )
    ).toBe(true);
  });

  it('should return false for an invalid starting string', function() {
    expect(v.startsWith('The shadows betray you, because they belong to me!', 'belong to me!')).toBe(false);
    expect(v.startsWith('The shadows betray you, because they belong to me!', 'he shadows')).toBe(false);
    expect(v.startsWith('They belong to me!', 'hey belong to me!')).toBe(false);
    expect(v.startsWith('They belong to me!', 'belong')).toBe(false);
    expect(v.startsWith('', 'The shadows')).toBe(false);
  });

  it('should return false for an invalid starting string and position', function() {
    expect(v.startsWith('The shadows betray you, because they belong to me!', 'The shadows betray you', 1)).toBe(false);
    expect(v.startsWith('They belong to me!', 'They belong to me!', 1)).toBe(false);
    expect(v.startsWith('They belong to me!', 'They', 1)).toBe(false);
    expect(v.startsWith('They belong to me!', 'belong', 2)).toBe(false);
    expect(v.startsWith('They belong to me!', 'to me!', 3)).toBe(false);
    expect(v.startsWith('They belong to me!', 'They belong', 100)).toBe(false);
  });

  it('should return false for an invalid starting number', function() {
    expect(v.startsWith(1000, 11)).toBe(false);
    expect(v.startsWith(1250, 10)).toBe(false);
    expect(v.startsWith('916', 90)).toBe(false);
  });

  it('should return false for undefined and null parameters', function() {
    expect(v.startsWith()).toBe(false);
    expect(v.startsWith(undefined)).toBe(false);
    expect(v.startsWith(undefined, undefined)).toBe(false);
    expect(v.startsWith(undefined, undefined, undefined)).toBe(false);
    expect(v.startsWith(undefined, undefined, 0)).toBe(false);
    expect(v.startsWith(undefined, 'Hello World!')).toBe(false);
    expect(v.startsWith(null)).toBe(false);
    expect(v.startsWith(null, null)).toBe(false);
    expect(v.startsWith(null, null, null)).toBe(false);
    expect(v.startsWith(null, null, 0)).toBe(false);
    expect(v.startsWith(null, 'Hello World!')).toBe(false);
  });
});
