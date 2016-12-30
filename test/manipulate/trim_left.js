import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('trimLeft', function() {

  it('should return the left trimmed string with default whitespaces', function() {
    expect(v.trimLeft(' Yes. The fire rises.')).to.be.equal('Yes. The fire rises.');
    expect(v.trimLeft('   Yes. The fire rises.')).to.be.equal('Yes. The fire rises.');
    expect(v.trimLeft('   Yes. The fire rises.    ')).to.be.equal('Yes. The fire rises.    ');
    expect(v.trimLeft('Yes. The fire rises.')).to.be.equal('Yes. The fire rises.');
    expect(v.trimLeft('\n\f\t Yes. The fire rises.')).to.be.equal('Yes. The fire rises.');
    expect(v.trimLeft('\n\f\t Yes. The fire rises.', null)).to.be.equal('Yes. The fire rises.');
    expect(v.trimLeft('\n\f\t Yes. The fire rises.', undefined)).to.be.equal('Yes. The fire rises.');
    expect(v.trimLeft(PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII.substr(1));
  });

  it('should return the left trimmed string with custom whitespaces', function() {
    expect(v.trimLeft('-Do you *feel* in charge?-', '-')).to.be.equal('Do you *feel* in charge?-');
    expect(v.trimLeft('---Do-you-*feel*-in-charge?---', '-')).to.be.equal('Do-you-*feel*-in-charge?---');
    expect(v.trimLeft('Do you *feel* in charge?___', '_')).to.be.equal('Do you *feel* in charge?___');
    expect(v.trimLeft('___Do you *feel* in charge?', '_')).to.be.equal('Do you *feel* in charge?');
    expect(v.trimLeft('<-Do you *feel* in charge?', '<-')).to.be.equal('Do you *feel* in charge?');
    expect(v.trimLeft('***Do you *feel* in charge?***', '*')).to.be.equal('Do you *feel* in charge?***');
    expect(v.trimLeft('Do you *feel* in charge?', 'Doy')).to.be.equal(' you *feel* in charge?');
    expect(v.trimLeft('\n\nDo you *feel* in charge?', '\n')).to.be.equal('Do you *feel* in charge?');
  });

  it('should not modify the string for an empty string whitespace', function() {
    expect(v.trimLeft('I\'m *necessary* evil!', '')).to.be.equal('I\'m *necessary* evil!');
    expect(v.trimLeft('', '')).to.be.equal('');
  });

  it('should return the left trimmed string representation of an object', function() {
    expect(v.trimLeft([' Yes. The fire rises.'])).to.be.equal('Yes. The fire rises.');
    expect(v.trimLeft({
      toString: function() {
        return '\n\nYes. The fire rises.';
      }
    })).to.be.equal('Yes. The fire rises.');
    expect(v.trimLeft(['****You\'re a big guy!'], ['*'])).to.be.equal('You\'re a big guy!');
  });

  it('should return the left trimmed string for numbers', function() {
    expect(v.trimLeft(100, 1)).to.be.equal('00');
    expect(v.trimLeft(6780, 6780)).to.be.equal('');
    expect(v.trimLeft(-115, -1)).to.be.equal('5');
  });

  it('should return empty string for null or undefined', function() {
    expect(v.trimLeft(null)).to.be.equal('');
    expect(v.trimLeft(null, '\n')).to.be.equal('');
    expect(v.trimLeft(null, null)).to.be.equal('');
    expect(v.trimLeft(undefined)).to.be.equal('');
    expect(v.trimLeft(undefined, '*')).to.be.equal('');
    expect(v.trimLeft(undefined, undefined)).to.be.equal('');
  });

});