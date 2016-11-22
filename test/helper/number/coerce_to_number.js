import coerceToNumber from 'helper/number/coerce_to_number';
import { expect } from 'chai';

describe('coerceToNumber', function() {

  it('should coerce the value to number', function () {
    expect(coerceToNumber(10)).to.be.equal(10);
    expect(coerceToNumber(0)).to.be.equal(0);
    expect(coerceToNumber(true)).to.be.equal(1);
    expect(coerceToNumber(null)).to.be.equal(0);
    expect(coerceToNumber(null, 1)).to.be.equal(1);
    expect(coerceToNumber(undefined)).to.be.equal(0);
    expect(coerceToNumber(undefined, 1)).to.be.equal(1);
    expect(coerceToNumber(undefined, 0)).to.be.equal(0);
  });

});