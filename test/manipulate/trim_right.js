import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('trimRight', function() {

  it('should return the right trimmed string with default whitespaces', function() {
    expect(v.trimRight('Yes. The fire rises. ')).to.be.equal('Yes. The fire rises.');
    expect(v.trimRight('Yes. The fire rises.   ')).to.be.equal('Yes. The fire rises.');
    expect(v.trimRight('   Yes. The fire rises.    ')).to.be.equal('   Yes. The fire rises.');
    expect(v.trimRight('Yes. The fire rises.')).to.be.equal('Yes. The fire rises.');
    expect(v.trimRight('Yes. The fire rises.\n\f\t ')).to.be.equal('Yes. The fire rises.');
    expect(v.trimRight('Yes. The fire rises.\n\f\t ', null)).to.be.equal('Yes. The fire rises.');
    expect(v.trimRight('Yes. The fire rises.\n\f\t ', undefined)).to.be.equal('Yes. The fire rises.');
    expect(v.trimRight(PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII);
  });

  it('should return the right trimmed string with custom whitespaces', function() {
    expect(v.trimRight('-Do you *feel* in charge?-', '-')).to.be.equal('-Do you *feel* in charge?');
    expect(v.trimRight('---Do-you-*feel*-in-charge?---', '-')).to.be.equal('---Do-you-*feel*-in-charge?');
    expect(v.trimRight('___Do you *feel* in charge?', '_')).to.be.equal('___Do you *feel* in charge?');
    expect(v.trimRight('Do you *feel* in charge?___', '_')).to.be.equal('Do you *feel* in charge?');
    expect(v.trimRight('Do you *feel* in charge?<-', '<-')).to.be.equal('Do you *feel* in charge?');
    expect(v.trimRight('***Do you *feel* in charge?***', '**')).to.be.equal('***Do you *feel* in charge?');
    expect(v.trimRight('Do you *feel* in charge?', 'charge?')).to.be.equal('Do you *feel* in ');
    expect(v.trimRight('Do you *feel* in charge?\n\n', '\n')).to.be.equal('Do you *feel* in charge?');
  });

  it('should not modify the string for an empty string whitespace', function() {
    expect(v.trimRight('I\'m *necessary* evil!', '')).to.be.equal('I\'m *necessary* evil!');
    expect(v.trimRight('', '')).to.be.equal('');
  });

  it('should return the right trimmed string representation of an object', function() {
    expect(v.trimRight(['Yes. The fire rises. '])).to.be.equal('Yes. The fire rises.');
    expect(v.trimRight({
      toString: function() {
        return 'Yes. The fire rises.\n\n';
      }
    })).to.be.equal('Yes. The fire rises.');
    expect(v.trimRight(['You\'re a big guy!****'], ['*'])).to.be.equal('You\'re a big guy!');
  });

  it('should return the right trimmed string for numbers', function() {
    expect(v.trimRight(100, 0)).to.be.equal('1');
    expect(v.trimRight(6780, 6780)).to.be.equal('');
    expect(v.trimRight(-115, 15)).to.be.equal('-');
  });

  it('should return empty string for null or undefined', function() {
    expect(v.trimRight(null)).to.be.equal('');
    expect(v.trimRight(null, '\n')).to.be.equal('');
    expect(v.trimRight(null, null)).to.be.equal('');
    expect(v.trimRight(undefined)).to.be.equal('');
    expect(v.trimRight(undefined, '*')).to.be.equal('');
    expect(v.trimRight(undefined, undefined)).to.be.equal('');
  });

});