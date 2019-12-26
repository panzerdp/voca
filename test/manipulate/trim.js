
import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('trim', function() {

  it('should return the trimmed string with default whitespaces', function() {
    expect(v.trim(' Yes. The fire rises.')).toBe('Yes. The fire rises.');
    expect(v.trim('   Yes. The fire rises.')).toBe('Yes. The fire rises.');
    expect(v.trim('   Yes. The fire rises.    ')).toBe('Yes. The fire rises.');
    expect(v.trim('Yes. The fire rises.')).toBe('Yes. The fire rises.');
    expect(v.trim('\n\f\t Yes. The fire rises.')).toBe('Yes. The fire rises.');
    expect(v.trim('\n\f\t Yes. The fire rises.', null)).toBe('Yes. The fire rises.');
    expect(v.trim('\n\f\t Yes. The fire rises.', undefined)).toBe('Yes. The fire rises.');
    expect(v.trim(PRINTABLE_ASCII)).toBe(PRINTABLE_ASCII.substr(1));
  });

  it('should return the trimmed string with custom whitespaces', function() {
    expect(v.trim('-Do you *feel* in charge?-', '-')).toBe('Do you *feel* in charge?');
    expect(v.trim('---Do-you-*feel*-in-charge?---', '-')).toBe('Do-you-*feel*-in-charge?');
    expect(v.trim('Do you *feel* in charge?___', '_')).toBe('Do you *feel* in charge?');
    expect(v.trim('<-Do you *feel* in charge?', '<-')).toBe('Do you *feel* in charge?');
    expect(v.trim('***Do you *feel* in charge?***', '*-')).toBe('Do you *feel* in charge?');
    expect(v.trim('Do you *feel* in charge?', 'Doe?')).toBe(' you *feel* in charg');
    expect(v.trim('\n\nDo you *feel* in charge?', '\n')).toBe('Do you *feel* in charge?');
  });

  it('should not modify the string for an empty string whitespace', function() {
    expect(v.trim('I\'m *necessary* evil!', '')).toBe('I\'m *necessary* evil!');
    expect(v.trim('', '')).toBe('');
  });

  it('should return the trimmed string representation of an object', function() {
    expect(v.trim([' Yes. The fire rises.'])).toBe('Yes. The fire rises.');
    expect(v.trim({
      toString: function() {
        return '\n\nYes. The fire rises.';
      }
    })).toBe('Yes. The fire rises.');
    expect(v.trim(['****You\'re a big guy!****'], ['*'])).toBe('You\'re a big guy!');
  });

  it('should return the trimmed string for numbers', function() {
    expect(v.trim(100, 1)).toBe('00');
    expect(v.trim(6780, 6780)).toBe('');
    expect(v.trim(-115, -1)).toBe('5');
    expect(v.trim(1111, 1)).toBe('');
    expect(v.trim(8998, 8)).toBe('99');
  });

  it('should return empty string for null or undefined', function() {
    expect(v.trim(null)).toBe('');
    expect(v.trim(null, '\n')).toBe('');
    expect(v.trim(null, null)).toBe('');
    expect(v.trim(undefined)).toBe('');
    expect(v.trim(undefined, '*')).toBe('');
    expect(v.trim(undefined, undefined)).toBe('');
  });

});