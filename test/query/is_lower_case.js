import v from '../voca';
import { expect } from 'chai';

describe('isEndingWith', function() {

  it('should return true for a lower case string', function() {
    expect(v.isLowerCase('', '')).to.be.true;
    expect(v.isLowerCase('hello world!', '')).to.be.true;
    expect(v.isLowerCase('Hello World!', '')).to.be.true;
  });

});