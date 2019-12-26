import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('decapitalize', function() {
  it('should decapitalize the first character in a string', function() {
    expect(v.decapitalize('Light')).toBe('light');
    expect(v.decapitalize('light')).toBe('light');
    expect(v.decapitalize('Sun')).toBe('sun');
    expect(v.decapitalize('f')).toBe('f');
    expect(v.decapitalize('')).toBe('');
    expect(v.decapitalize('*light')).toBe('*light');
    expect(v.decapitalize(PRINTABLE_ASCII)).toBe(PRINTABLE_ASCII);
  });

  it('should decapitalize the first character in a string representation of an object', function() {
    expect(v.decapitalize(['Fruit'])).toBe('fruit');
    expect(
      v.decapitalize(
        {
          toString: function() {
            return 'CaRrOt';
          },
        },
        false
      )
    ).toBe('caRrOt');
  });

  it('should not modify numbers', function() {
    expect(v.decapitalize(100)).toBe('100');
    expect(v.decapitalize(812, false)).toBe('812');
  });

  it('should return an empty string for null or undefined', function() {
    expect(v.decapitalize()).toBe('');
    expect(v.decapitalize(undefined)).toBe('');
    expect(v.decapitalize(null)).toBe('');
  });
});
