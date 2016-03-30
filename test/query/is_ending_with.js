import v from '../voca';
import { expect } from 'chai';

describe('isEndingWith', function() {

  it('should return false for a non-empty string', function() {
    expect(v.isEmpty('Hello World!')).to.be.false;
    expect(v.isEmpty('a')).to.be.false;
    expect(v.isEmpty(' ')).to.be.false;
  });

});