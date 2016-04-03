import v from '../voca'
import { expect } from 'chai'

describe('trimLeft', function() {

  it('should return the left trimmed string with default whitespaces', function() {
    expect(v.trimLeft(' Yes. The fire rises.')).to.be.equal('Yes. The fire rises.');
    expect(v.trimLeft('   Yes. The fire rises.')).to.be.equal('Yes. The fire rises.');
    expect(v.trimLeft('   Yes. The fire rises.    ')).to.be.equal('Yes. The fire rises.    ');
    expect(v.trimLeft('Yes. The fire rises.')).to.be.equal('Yes. The fire rises.');
    expect(v.trimLeft('\n\f\t Yes. The fire rises.')).to.be.equal('Yes. The fire rises.');
  });

  it('should return the trimmed string with custom whitespaces', function() {
    expect(v.trimLeft('-Do you *feel* in charge?-', '-')).to.be.equal('Do you *feel* in charge?-');
    expect(v.trimLeft('---Do-you-*feel*-in-charge?---', '-')).to.be.equal('Do-you-*feel*-in-charge?---');
    expect(v.trimLeft('Do you *feel* in charge?___'), '_').to.be.equal('Do you *feel* in charge?___');
    expect(v.trimLeft('<-Do you *feel* in charge?', '<-')).to.be.equal('Do you *feel* in charge?');
    expect(v.trimLeft('***Do you *feel* in charge?***', '**')).to.be.equal('*Do you *feel* in charge?***');
    expect(v.trimLeft('Do you *feel* in charge?', 'Do you *feel* in charge?')).to.be.equal('');
    expect(v.trimLeft('\n\nDo you *feel* in charge?', '\n')).to.be.equal('Do you *feel* in charge?');
  });

});