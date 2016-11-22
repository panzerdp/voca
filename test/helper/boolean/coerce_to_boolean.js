import coerceToBoolean from 'helper/boolean/coerce_to_boolean';
import { expect } from 'chai';

describe('coerceToBoolean', function() {

  it('should coerce the value to boolean', function () {
    expect(coerceToBoolean(true)).to.be.equal(true);
    expect(coerceToBoolean(false)).to.be.equal(false);
    expect(coerceToBoolean(1)).to.be.equal(true);
    expect(coerceToBoolean(null)).to.be.equal(false);
    expect(coerceToBoolean(null, true)).to.be.equal(true);
    expect(coerceToBoolean(undefined)).to.be.equal(false);
    expect(coerceToBoolean(undefined, true)).to.be.equal(true);
    expect(coerceToBoolean(undefined, false)).to.be.equal(false);
  });

});