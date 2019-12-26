import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('includes', function() {
  it('should return true for an included string', function() {
    expect(v.includes('mobile infantry', 'mobile')).toBe(true);
    expect(v.includes('mobile infantry', 'infantry')).toBe(true);
    expect(v.includes('mobile infantry', 'mobile infantry')).toBe(true);
    expect(v.includes('mobile infantry', ' ')).toBe(true);
    expect(v.includes('mobile infantry', '')).toBe(true);
    expect(v.includes('', '')).toBe(true);
    expect(v.includes(undefined, '')).toBe(true);
    expect(v.includes('\nwelcome', '\n')).toBe(true);
    expect(v.includes(PRINTABLE_ASCII, '+')).toBe(true);
  });

  it('should return true for an included string and position', function() {
    expect(v.includes('mobile infantry', 'mobile', 0)).toBe(true);
    expect(v.includes('mobile infantry', 'infantry', 7)).toBe(true);
    expect(v.includes('mobile infantry', 'mobile infantry', 0)).toBe(true);
    expect(v.includes('mobile infantry', ' ', 6)).toBe(true);
    expect(v.includes('mobile infantry', '', 0)).toBe(true);
    expect(v.includes('mobile infantry', '', 6)).toBe(true);
    expect(v.includes('', '', 0)).toBe(true);
    expect(v.includes('', '', 6)).toBe(true);
  });

  it('should return true for an included string representation of an object', function() {
    expect(v.includes(['mobile infantry'], 'mobile')).toBe(true);
    expect(
      v.includes(
        {
          toString: function() {
            return 'mobile infantry';
          }
        },
        'infantry'
      )
    ).toBe(true);
    expect(v.includes(['mobile infantry'], ['mobile infantry'])).toBe(true);
  });

  it('should return true for an included number', function() {
    expect(v.includes(155, 55));
    expect(v.includes('1078', 78));
    expect(v.includes(0, 0));
    expect(v.includes(80, ''));
  });

  it('should return false for a not included string', function() {
    expect(v.includes('mobile infantry', 'be mobile')).toBe(false);
    expect(v.includes('mobile infantry', 'infantry ')).toBe(false);
    expect(v.includes('mobile infantry', ' mobile infantry ')).toBe(false);
    expect(v.includes('mobile infantry', '!')).toBe(false);
    expect(v.includes('', 'mobile')).toBe(false);
    expect(v.includes('\nwelcome', '\t')).toBe(false);
  });

  it('should return false for a not included string and position', function() {
    expect(v.includes('mobile infantry', 'mobile', 1)).toBe(false);
    expect(v.includes('mobile infantry', 'infantry', 8)).toBe(false);
    expect(v.includes('mobile infantry', 'mobile infantry', 2)).toBe(false);
    expect(v.includes('mobile infantry', ' ', 7)).toBe(false);
  });

  it('should return false for a not included string representation of an object', function() {
    expect(v.includes(['mobile infantry'], 'mobile number')).toBe(false);
    expect(
      v.includes(
        {
          toString: function() {
            return 'mobile infantry';
          }
        },
        'motorized infantry'
      )
    ).toBe(false);
    expect(v.includes(['mobile infantry'], ['mobile infantry'], 1)).toBe(false);
  });

  it('should return false for a undefined or null search string', function() {
    expect(v.includes('mobile infantry', undefined)).toBe(false);
    expect(v.includes('mobile infantry', null)).toBe(false);
  });
});
