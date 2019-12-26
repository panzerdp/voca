import coerceToNumber from 'helper/number/coerce_to_number';

describe('coerceToNumber', function() {
  it('should coerce the value to number', function() {
    expect(coerceToNumber(10)).toBe(10);
    expect(coerceToNumber(0)).toBe(0);
    expect(coerceToNumber(true)).toBe(1);
    expect(coerceToNumber(null)).toBe(0);
    expect(coerceToNumber(null, 1)).toBe(1);
    expect(coerceToNumber(undefined)).toBe(0);
    expect(coerceToNumber(undefined, 1)).toBe(1);
    expect(coerceToNumber(undefined, 0)).toBe(0);
  });
});
