import { expect } from 'chai';
import coerceToString from '../../../src/helper/boolean/coerce_to_boolean';

describe('coerceToString', function() {

  it('should coerce the value to boolean', function () {
    expect(coerceToString(true)).to.be.equal(true);
    expect(coerceToString(false)).to.be.equal(false);
    expect(coerceToString(1)).to.be.equal(true);
    expect(coerceToString(null)).to.be.equal(false);
    expect(coerceToString(null, true)).to.be.equal(true);
    expect(coerceToString(undefined)).to.be.equal(false);
    expect(coerceToString(undefined, true)).to.be.equal(true);
    expect(coerceToString(undefined, false)).to.be.equal(false);
  });

});