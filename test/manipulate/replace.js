import v from '../voca';
import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../utils/string/ascii';

describe('replace', function() {

  it('should return the result with a string pattern', function() {
    expect(v.replace('duck', 'duck', 'swan')).to.be.equal('swan');
  });

});