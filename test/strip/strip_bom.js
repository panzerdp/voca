import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('stripBom', function() {
  it('should strip BOM from the beginning of the string', function() {
    expect(v.stripBom('\uFEFF')).toBe('');
    expect(v.stripBom('\uFEFFHello world!')).toBe('Hello world!');
    expect(v.stripBom('\uFEFF\n\tWelcome')).toBe('\n\tWelcome');
  });

  it('should not affect strings that do not start with BOM', function() {
    expect(v.stripBom('')).toBe('');
    expect(v.stripBom('Hello world!')).toBe('Hello world!');
    expect(v.stripBom('Hello\uFEFFworld!')).toBe('Hello\uFEFFworld!');
    expect(v.stripBom(PRINTABLE_ASCII)).toBe(PRINTABLE_ASCII);
    expect(v.stripBom('\\uFEFF')).toBe('\\uFEFF');
  });

  it('should strip BOM from a string representation of an object', function() {
    expect(v.stripBom('\uFEFFHello world!')).toBe('Hello world!');
    expect(
      v.stripBom({
        toString: function() {
          return '\uFEFFHello world!';
        }
      })
    ).toBe('Hello world!');
  });

  it('should return empty string for null or undefined', function() {
    expect(v.stripBom(null)).toBe('');
    expect(v.stripBom(undefined)).toBe('');
    expect(v.stripBom()).toBe('');
  });
});
