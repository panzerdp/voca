import v from '../voca';
import { expect } from 'chai';
//import { PRINTABLE_ASCII } from '../utils/string/ascii';

describe('words', function() {

  it('should return the string into words', function() {
    expect(v.words('')).to.eql([]);
    expect(v.words('123')).to.eql(['123']);
  });
  
});