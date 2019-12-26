import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('capitalize', function() {
  it('should capitalize the first character in a string', function() {
    expect(v.capitalize('APPLE')).toBe('APPLE');
    expect(v.capitalize('apple')).toBe('Apple');
    expect(v.capitalize('macBook')).toBe('MacBook');
    expect(v.capitalize('f')).toBe('F');
    expect(v.capitalize('')).toBe('');
    expect(v.capitalize('*apple')).toBe('*apple');
    expect(v.capitalize(PRINTABLE_ASCII)).toBe(PRINTABLE_ASCII);
  });

  it('should capitalize the first character in a string and keep the rest unmodified', function() {
    expect(v.capitalize('apple', true)).toBe('Apple');
    expect(v.capitalize('APPLE', true)).toBe('Apple');
    expect(v.capitalize('яблоко', true)).toBe('Яблоко');
    expect(v.capitalize('f', true)).toBe('F');
    expect(v.capitalize('', true)).toBe('');
    expect(v.capitalize('100', true)).toBe('100');
    expect(v.capitalize('  ', true)).toBe('  ');
  });

  it('should capitalize the first character in a string representation of an object', function() {
    expect(v.capitalize(['grape'])).toBe('Grape');
    expect(
      v.capitalize(
        {
          toString: function() {
            return 'oRaNgE';
          },
        },
        false
      )
    ).toBe('ORaNgE');
  });

  it('should not modify numbers', function() {
    expect(v.capitalize(100)).toBe('100');
    expect(v.capitalize(812, false)).toBe('812');
  });

  it('should return an empty string for null or undefined', function() {
    expect(v.capitalize()).toBe('');
    expect(v.capitalize(undefined)).toBe('');
    expect(v.capitalize(null)).toBe('');
    expect(v.capitalize(undefined, true)).toBe('');
    expect(v.capitalize(undefined, false)).toBe('');
  });
});
