import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('vprintf', function() {
  it('should return a string according to formatting', function() {
    expect(v.vprintf('%s', ['string'])).toBe('string');
    expect(v.vprintf('Hello %s!', ['World'])).toBe('Hello World!');
    expect(v.vprintf('%d %d %d', [1, 0, -100])).toBe('1 0 -100');
    expect(v.vprintf('%b %b 0b%b', [1, 0, 10])).toBe('1 0 0b1010');
    expect(v.vprintf('%o %o 0%o', [1, 0, 10])).toBe('1 0 012');
    expect(v.vprintf('%x %x 0X%x', [1, 0, 20])).toBe('1 0 0X14');
    expect(v.vprintf('%u %u %u', [1, 0, 20])).toBe('1 0 20');
    expect(v.vprintf('%c %c %c', [65, 0x0020, 48])).toBe('A   0');
    expect(v.vprintf('%+f+%+f', [50.123456789, 0])).toBe('+50.123457++0.000000');
    expect(v.vprintf('%e %e %E', [100, 0, 0.1])).toBe('1.000000e+2 0.000000e+0 1.000000E-1');
    expect(v.vprintf('%+g+%+g', [50.123456789, 0])).toBe('+50.1235++0');
    expect(
      v.vprintf("Full format: %'*10s %+d %i %04b %c %o %u %X %.0f %e %g %%", [
        'string',
        18,
        -5,
        4,
        65,
        8,
        401,
        255,
        8.9,
        50.12,
        10.123456789,
      ])
    ).toBe('Full format: ****string +18 -5 0100 A 10 401 FF 9 5.012000e+1 10.1235 %');
    expect(v.vprintf('%%s %s', ['Persian'])).toBe('%s Persian');
  });

  it('should throw exceptions when the formatter is not valid or not enough arguments', function() {
    expect(v.vprintf.bind(v, '%2$s %1$s', ['Alexander'])).toThrowError('sprintf(): Too few arguments');
    expect(v.vprintf.bind(v, '%a', ['Alexander'])).toThrowError('sprintf(): Unknown type specifier');
    expect(v.vprintf.bind(v, PRINTABLE_ASCII, ['Alexander'])).toThrowError('sprintf(): Unknown type specifier');
    expect(v.vprintf.bind(v, '%0$s', ['Alexander'])).toThrowError(
      'sprintf(): Argument number must be greater than zero'
    );
  });

  it('should return an unmodified string for missing formatting specifiers', function() {
    expect(v.vprintf('Without formatting')).toBe('Without formatting');
    expect(v.vprintf('Without formatting', [])).toBe('Without formatting');
    expect(v.vprintf('Without formatting', [undefined])).toBe('Without formatting');
    expect(v.vprintf('')).toBe('');
    expect(v.vprintf(' ')).toBe(' ');
    expect(v.vprintf()).toBe('');
    expect(v.vprintf(undefined)).toBe('');
    expect(v.vprintf(null)).toBe('');
  });
});
