import coerceToBoolean from 'helper/boolean/coerce_to_boolean';

describe('coerceToBoolean', function() {
  it('should coerce the value to boolean', function() {
    expect(coerceToBoolean(true)).toBe(true);
    expect(coerceToBoolean(false)).toBe(false);
    expect(coerceToBoolean(1)).toBe(true);
    expect(coerceToBoolean(null)).toBe(false);
    expect(coerceToBoolean(null, true)).toBe(true);
    expect(coerceToBoolean(undefined)).toBe(false);
    expect(coerceToBoolean(undefined, true)).toBe(true);
    expect(coerceToBoolean(undefined, false)).toBe(false);
  });
});
