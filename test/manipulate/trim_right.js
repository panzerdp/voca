
import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('trimRight', function() {

  it('should return the right trimmed string with default whitespaces', function() {
    expect(v.trimRight('Yes. The fire rises. ')).toBe('Yes. The fire rises.');
    expect(v.trimRight('Yes. The fire rises.   ')).toBe('Yes. The fire rises.');
    expect(v.trimRight('   Yes. The fire rises.    ')).toBe('   Yes. The fire rises.');
    expect(v.trimRight('Yes. The fire rises.')).toBe('Yes. The fire rises.');
    expect(v.trimRight('Yes. The fire rises.\n\f\t ')).toBe('Yes. The fire rises.');
    expect(v.trimRight('Yes. The fire rises.\n\f\t ', null)).toBe('Yes. The fire rises.');
    expect(v.trimRight('Yes. The fire rises.\n\f\t ', undefined)).toBe('Yes. The fire rises.');
    expect(v.trimRight(PRINTABLE_ASCII)).toBe(PRINTABLE_ASCII);
  });

  it('should return the right trimmed string with custom whitespaces', function() {
    expect(v.trimRight('-Do you *feel* in charge?-', '-')).toBe('-Do you *feel* in charge?');
    expect(v.trimRight('---Do-you-*feel*-in-charge?---', '-')).toBe('---Do-you-*feel*-in-charge?');
    expect(v.trimRight('___Do you *feel* in charge?', '_')).toBe('___Do you *feel* in charge?');
    expect(v.trimRight('Do you *feel* in charge?___', '_')).toBe('Do you *feel* in charge?');
    expect(v.trimRight('Do you *feel* in charge?<-', '<-')).toBe('Do you *feel* in charge?');
    expect(v.trimRight('***Do you *feel* in charge?***', '**')).toBe('***Do you *feel* in charge?');
    expect(v.trimRight('Do you *feel* in charge?', 'charge?')).toBe('Do you *feel* in ');
    expect(v.trimRight('Do you *feel* in charge?\n\n', '\n')).toBe('Do you *feel* in charge?');
  });

  it('should not modify the string for an empty string whitespace', function() {
    expect(v.trimRight('I\'m *necessary* evil!', '')).toBe('I\'m *necessary* evil!');
    expect(v.trimRight('', '')).toBe('');
  });

  it('should return the right trimmed string representation of an object', function() {
    expect(v.trimRight(['Yes. The fire rises. '])).toBe('Yes. The fire rises.');
    expect(v.trimRight({
      toString: function() {
        return 'Yes. The fire rises.\n\n';
      }
    })).toBe('Yes. The fire rises.');
    expect(v.trimRight(['You\'re a big guy!****'], ['*'])).toBe('You\'re a big guy!');
  });

  it('should return the right trimmed string for numbers', function() {
    expect(v.trimRight(100, 0)).toBe('1');
    expect(v.trimRight(6780, 6780)).toBe('');
    expect(v.trimRight(-115, 15)).toBe('-');
  });

  it('should return empty string for null or undefined', function() {
    expect(v.trimRight(null)).toBe('');
    expect(v.trimRight(null, '\n')).toBe('');
    expect(v.trimRight(null, null)).toBe('');
    expect(v.trimRight(undefined)).toBe('');
    expect(v.trimRight(undefined, '*')).toBe('');
    expect(v.trimRight(undefined, undefined)).toBe('');
  });

});