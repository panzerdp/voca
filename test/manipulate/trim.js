import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('trim', function() {

  it('should return the trimmed string with default whitespaces', function() {
    expect(v.trim(' Yes. The fire rises.')).to.be.equal('Yes. The fire rises.');
    expect(v.trim('   Yes. The fire rises.')).to.be.equal('Yes. The fire rises.');
    expect(v.trim('   Yes. The fire rises.    ')).to.be.equal('Yes. The fire rises.');
    expect(v.trim('Yes. The fire rises.')).to.be.equal('Yes. The fire rises.');
    expect(v.trim('\n\f\t Yes. The fire rises.')).to.be.equal('Yes. The fire rises.');
    expect(v.trim('\n\f\t Yes. The fire rises.', null)).to.be.equal('Yes. The fire rises.');
    expect(v.trim('\n\f\t Yes. The fire rises.', undefined)).to.be.equal('Yes. The fire rises.');
    expect(v.trim(PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII.substr(1));
  });

  it('should return the trimmed string with custom whitespaces', function() {
    expect(v.trim('-Do you *feel* in charge?-', '-')).to.be.equal('Do you *feel* in charge?');
    expect(v.trim('---Do-you-*feel*-in-charge?---', '-')).to.be.equal('Do-you-*feel*-in-charge?');
    expect(v.trim('Do you *feel* in charge?___', '_')).to.be.equal('Do you *feel* in charge?');
    expect(v.trim('<-Do you *feel* in charge?', '<-')).to.be.equal('Do you *feel* in charge?');
    expect(v.trim('***Do you *feel* in charge?***', '*-')).to.be.equal('Do you *feel* in charge?');
    expect(v.trim('Do you *feel* in charge?', 'Doe?')).to.be.equal(' you *feel* in charg');
    expect(v.trim('\n\nDo you *feel* in charge?', '\n')).to.be.equal('Do you *feel* in charge?');
  });

  it('should not modify the string for an empty string whitespace', function() {
    expect(v.trim('I\'m *necessary* evil!', '')).to.be.equal('I\'m *necessary* evil!');
    expect(v.trim('', '')).to.be.equal('');
  });

  it('should return the trimmed string representation of an object', function() {
    expect(v.trim([' Yes. The fire rises.'])).to.be.equal('Yes. The fire rises.');
    expect(v.trim({
      toString: function() {
        return '\n\nYes. The fire rises.';
      }
    })).to.be.equal('Yes. The fire rises.');
    expect(v.trim(['****You\'re a big guy!****'], ['*'])).to.be.equal('You\'re a big guy!');
  });

  it('should return the trimmed string for numbers', function() {
    expect(v.trim(100, 1)).to.be.equal('00');
    expect(v.trim(6780, 6780)).to.be.equal('');
    expect(v.trim(-115, -1)).to.be.equal('5');
    expect(v.trim(1111, 1)).to.be.equal('');
    expect(v.trim(8998, 8)).to.be.equal('99');
  });

  it('should return empty string for null or undefined', function() {
    expect(v.trim(null)).to.be.equal('');
    expect(v.trim(null, '\n')).to.be.equal('');
    expect(v.trim(null, null)).to.be.equal('');
    expect(v.trim(undefined)).to.be.equal('');
    expect(v.trim(undefined, '*')).to.be.equal('');
    expect(v.trim(undefined, undefined)).to.be.equal('');
  });

});