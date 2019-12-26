import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('endsWith', function() {
  it('should return true for valid ending string', function() {
    expect(v.endsWith('Hello World!', '')).toBe(true);
    expect(v.endsWith('Hello World!', '!')).toBe(true);
    expect(v.endsWith('Hello World!', 'd!')).toBe(true);
    expect(v.endsWith('Hello World!', 'rld!')).toBe(true);
    expect(v.endsWith('Hello World!', 'orld!')).toBe(true);
    expect(v.endsWith('Hello World!', 'World!')).toBe(true);
    expect(v.endsWith('Hello World!', ' World!')).toBe(true);
    expect(v.endsWith('Hello World!', 'o World!')).toBe(true);
    expect(v.endsWith('Hello World!', 'lo World!')).toBe(true);
    expect(v.endsWith('Hello World!', 'llo World!')).toBe(true);
    expect(v.endsWith('Hello World!', 'ello World!')).toBe(true);
    expect(v.endsWith('Hello World!', 'Hello World!')).toBe(true);
    expect(v.endsWith('Привет Мир!', 'Мир!')).toBe(true);
    expect(v.endsWith('', '')).toBe(true);
    expect(v.endsWith(PRINTABLE_ASCII, '~')).toBe(true);
  });

  it('should return true for valid ending string and position', function() {
    expect(v.endsWith('Hello World!', '', 'Hello World'.length)).toBe(true);
    expect(
      v.endsWith('Hello World!', 'Hello World!', 'Hello World!'.length)
    ).toBe(true);
    expect(
      v.endsWith('Hello World!', 'Hello World', 'Hello World!'.length - 1)
    ).toBe(true);
    expect(
      v.endsWith('Hello World!', 'Hello Worl', 'Hello World!'.length - 2)
    ).toBe(true);
    expect(
      v.endsWith('Hello World!', 'Hello Wor', 'Hello World!'.length - 3)
    ).toBe(true);
    expect(
      v.endsWith('Hello World!', 'Hello Wo', 'Hello World!'.length - 4)
    ).toBe(true);
    expect(
      v.endsWith('Hello World!', 'Hello W', 'Hello World!'.length - 5)
    ).toBe(true);
    expect(
      v.endsWith('Hello World!', 'Hello ', 'Hello World!'.length - 6)
    ).toBe(true);
    expect(v.endsWith('Hello World!', 'Hello', 'Hello World!'.length - 7)).toBe(
      true
    );
    expect(v.endsWith('Hello World!', 'Hell', 'Hello World!'.length - 8)).toBe(
      true
    );
    expect(v.endsWith('Hello World!', 'Hel', 'Hello World!'.length - 9)).toBe(
      true
    );
    expect(v.endsWith('Hello World!', 'He', 'Hello World!'.length - 10)).toBe(
      true
    );
    expect(v.endsWith('Hello World!', 'H', 'Hello World!'.length - 11)).toBe(
      true
    );
    expect(v.endsWith('', '', 0)).toBe(true);
  });

  it('should return true for a correct downcast of the position', function() {
    expect(v.endsWith('Hello World!', 'ello', '5')).toBe(true);
    expect(v.endsWith('Hello World!', 'ello', 5.1)).toBe(true);
    expect(v.endsWith('Hello World!', 'World!', 30000)).toBe(true);
    expect(v.endsWith('Hello World!', 'World!', Infinity)).toBe(true);
  });

  it('should return true for an empty ending string', function() {
    [0, 1, 100, Infinity, undefined, NaN, null].forEach(function(position) {
      expect(v.endsWith('Hello World!', '', position)).toBe(true);
    });
  });

  it('should return true for valid ending number', function() {
    expect(v.endsWith(1000, 0)).toBe(true);
    expect(v.endsWith(1250, 50)).toBe(true);
    expect(v.endsWith('916', 16)).toBe(true);
  });

  it('should return true for a valid ending in a string representation of an object', function() {
    expect(v.endsWith(['Welcome to Earth'], 'Earth')).toBe(true);
    expect(
      v.endsWith(
        {
          toString: function() {
            return 'Let us not stand on ceremony, Mr. Wayne.';
          }
        },
        ['Mr. Wayne'],
        'Let us not stand on ceremony, Mr. Wayne.'.length - 1
      )
    ).toBe(true);
  });

  it('should return false for an invalid ending string', function() {
    expect(
      v.endsWith(
        'The shadows betray you, because they belong to me!',
        'The shadows'
      )
    ).toBe(false);
    expect(
      v.endsWith('The shadows betray you, because they belong to me!', 'to me')
    ).toBe(false);
    expect(v.endsWith('They belong to me!', 'They belong to me')).toBe(false);
    expect(v.endsWith('They belong to me!', 'belong')).toBe(false);
    expect(v.endsWith('', 'The shadows')).toBe(false);
  });

  it('should return false for an invalid ending string and position', function() {
    expect(
      v.endsWith(
        'The shadows betray you, because they belong to me!',
        'they belong to me!',
        5
      )
    ).toBe(false);
    expect(
      v.endsWith(
        'They belong to me!',
        'They belong to me!',
        'They belong to me!'.length - 1
      )
    ).toBe(false);
    expect(
      v.endsWith('They belong to me!', 'They', 'They belong to me!'.length)
    ).toBe(false);
    expect(
      v.endsWith('They belong to me!', 'belong', 'They belong to me!'.length)
    ).toBe(false);
    expect(v.endsWith('They belong to me!', 'to me!', 0)).toBe(false);
    expect(v.endsWith('They belong to me!', 'belong to me!', -100)).toBe(false);
  });

  it('should return false for an invalid ending number', function() {
    expect(v.endsWith(1000, 10)).toBe(false);
    expect(v.endsWith(1250, 55)).toBe(false);
    expect(v.endsWith('916', 18)).toBe(false);
  });

  it('should return false for a NaN position', function() {
    expect(v.endsWith('Hello World!', 'World!', NaN)).toBe(false);
  });

  it('should return false for undefined and null parameters', function() {
    expect(v.endsWith()).toBe(false);
    expect(v.endsWith(undefined)).toBe(false);
    expect(v.endsWith(undefined, undefined)).toBe(false);
    expect(v.endsWith(undefined, undefined, undefined)).toBe(false);
    expect(v.endsWith(undefined, undefined, 0)).toBe(false);
    expect(v.endsWith(undefined, 'Hello World!')).toBe(false);
    expect(v.endsWith(null)).toBe(false);
    expect(v.endsWith(null, null)).toBe(false);
    expect(v.endsWith(null, null, null)).toBe(false);
    expect(v.endsWith(null, null, 0)).toBe(false);
    expect(v.endsWith(null, 'Hello World!')).toBe(false);
  });
});
