import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('trimLeft', function() {
  it('should return the left trimmed string with default whitespaces', function() {
    expect(v.trimLeft(' Yes. The fire rises.')).toBe('Yes. The fire rises.');
    expect(v.trimLeft('   Yes. The fire rises.')).toBe('Yes. The fire rises.');
    expect(v.trimLeft('   Yes. The fire rises.    ')).toBe('Yes. The fire rises.    ');
    expect(v.trimLeft('Yes. The fire rises.')).toBe('Yes. The fire rises.');
    expect(v.trimLeft('\n\f\t Yes. The fire rises.')).toBe('Yes. The fire rises.');
    expect(v.trimLeft('\n\f\t Yes. The fire rises.', null)).toBe('Yes. The fire rises.');
    expect(v.trimLeft('\n\f\t Yes. The fire rises.', undefined)).toBe('Yes. The fire rises.');
    expect(v.trimLeft(PRINTABLE_ASCII)).toBe(PRINTABLE_ASCII.substr(1));
  });

  it('should return the left trimmed string with custom whitespaces', function() {
    expect(v.trimLeft('-Do you *feel* in charge?-', '-')).toBe('Do you *feel* in charge?-');
    expect(v.trimLeft('---Do-you-*feel*-in-charge?---', '-')).toBe('Do-you-*feel*-in-charge?---');
    expect(v.trimLeft('Do you *feel* in charge?___', '_')).toBe('Do you *feel* in charge?___');
    expect(v.trimLeft('___Do you *feel* in charge?', '_')).toBe('Do you *feel* in charge?');
    expect(v.trimLeft('<-Do you *feel* in charge?', '<-')).toBe('Do you *feel* in charge?');
    expect(v.trimLeft('***Do you *feel* in charge?***', '*')).toBe('Do you *feel* in charge?***');
    expect(v.trimLeft('Do you *feel* in charge?', 'Doy')).toBe(' you *feel* in charge?');
    expect(v.trimLeft('\n\nDo you *feel* in charge?', '\n')).toBe('Do you *feel* in charge?');
  });

  it('should not modify the string for an empty string whitespace', function() {
    expect(v.trimLeft("I'm *necessary* evil!", '')).toBe("I'm *necessary* evil!");
    expect(v.trimLeft('', '')).toBe('');
  });

  it('should return the left trimmed string representation of an object', function() {
    expect(v.trimLeft([' Yes. The fire rises.'])).toBe('Yes. The fire rises.');
    expect(
      v.trimLeft({
        toString: function() {
          return '\n\nYes. The fire rises.';
        },
      })
    ).toBe('Yes. The fire rises.');
    expect(v.trimLeft(["****You're a big guy!"], ['*'])).toBe("You're a big guy!");
  });

  it('should return the left trimmed string for numbers', function() {
    expect(v.trimLeft(100, 1)).toBe('00');
    expect(v.trimLeft(6780, 6780)).toBe('');
    expect(v.trimLeft(-115, -1)).toBe('5');
  });

  it('should return empty string for null or undefined', function() {
    expect(v.trimLeft(null)).toBe('');
    expect(v.trimLeft(null, '\n')).toBe('');
    expect(v.trimLeft(null, null)).toBe('');
    expect(v.trimLeft(undefined)).toBe('');
    expect(v.trimLeft(undefined, '*')).toBe('');
    expect(v.trimLeft(undefined, undefined)).toBe('');
  });
});
