import v from '../voca';
import { expect } from 'chai';

describe('noConflict', function() {

  it('should return Voca library instance', function() {
    expect(v.noConflict()).to.be.equal(v);
  });

});