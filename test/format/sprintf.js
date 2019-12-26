import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('sprintf', function() {
  it('should return a string according to string type formatting', function() {
    expect(v.sprintf('%s', 'string')).toBe('string');
    expect(v.sprintf('Hello %s!', 'World')).toBe('Hello World!');
    expect(v.sprintf('%s %s!', 'Hello', 'World')).toBe('Hello World!');
    expect(v.sprintf('%s %s!', '%s', '%s')).toBe('%s %s!');
    expect(v.sprintf('Hello %5s!', 'World')).toBe('Hello World!');
    expect(v.sprintf('Hello %3s!', 'World')).toBe('Hello World!');
    expect(v.sprintf('Hello %8s!', 'World')).toBe('Hello    World!');
    expect(v.sprintf('%s%s%s%s%s', 'Alexander', ' ', 'the', ' ', 'Great')).toBe('Alexander the Great');
    expect(v.sprintf('Alexander the %08s', 'Great')).toBe('Alexander the 000Great');
    expect(v.sprintf('Alexander the % 8s', 'Great')).toBe('Alexander the    Great');
    expect(v.sprintf("%'-10s the %s", 'Alexander', 'Great')).toBe('-Alexander the Great');
    expect(v.sprintf("%'.12s the %09s", 'Alexander', 'Great')).toBe('...Alexander the 0000Great');
    expect(v.sprintf('%-12s', 'Alexander')).toBe('Alexander   ');
    expect(v.sprintf('%+-12s', 'Alexander')).toBe('Alexander   ');
    expect(v.sprintf('%.4s the Great', 'Alexander')).toBe('Alex the Great');
    expect(v.sprintf('%.9s the Great', 'Alexander')).toBe('Alexander the Great');
    expect(v.sprintf('%.0s the Great', 'Alexander')).toBe(' the Great');
    expect(v.sprintf('%10.8s the Great', 'Alexander')).toBe('  Alexande the Great');
    expect(v.sprintf("%'-10.6s %'1-12.4s", 'Persian', 'Empire')).toBe('----Persia Empi11111111');
    expect(v.sprintf('%2$s the %1$s', 'Great', 'Alexander')).toBe('Alexander the Great');
    expect(v.sprintf('%2$s', 'Great', 'Alexander')).toBe('Alexander');
    expect(v.sprintf("%2$'012s the %1$.4s", 'Great', 'Alexander')).toBe('000Alexander the Grea');
    expect(v.sprintf("%%%1$'q-12.4s%%s", 'Alexander')).toBe('%Alexqqqqqqqq%s');
    expect(v.sprintf('%2$s the %s', 'Great', 'Alexander')).toBe('Alexander the Great');
    expect(v.sprintf('%1$s the %s', 'Great')).toBe('Great the Great');
  });

  it('should return a string according to decimal integer type formatting', function() {
    expect(v.sprintf('%d', 1)).toBe('1');
    expect(v.sprintf('%i', 1)).toBe('1');
    expect(v.sprintf('%d %d %d', 1, 0, -100)).toBe('1 0 -100');
    expect(v.sprintf('%+d %+d', 10, -10)).toBe('+10 -10');
    expect(v.sprintf("%+'t4d %4d", 9, 0)).toBe('tt+9    0');
    expect(v.sprintf('%010i', 90)).toBe('0000000090');
    expect(v.sprintf('%+ 8d', 88)).toBe('     +88');
    expect(v.sprintf('%d+%d=%d', 9, 1, 10)).toBe('9+1=10');
    expect(v.sprintf('%3$04d-%2$04d=%1$04d', 9, 1, 10)).toBe('0010-0001=0009');
    expect(v.sprintf("%+'T-5d", 15)).toBe('+15TT');
    expect(v.sprintf('%d', 1.5e3)).toBe('1500');
    expect(v.sprintf('%d', '15NN')).toBe('15');
    expect(v.sprintf('%d', '1.6')).toBe('1');
    expect(v.sprintf('%d', '1.5e+3')).toBe('1');
    expect(v.sprintf('%d', 'NN15')).toBe('0');
    expect(v.sprintf('%d %d', '', 15)).toBe('0 15');
    expect(v.sprintf('%d', '+')).toBe('0');
  });

  it('should return a string according to binary integer type formatting', function() {
    expect(v.sprintf('%b', 1)).toBe('1');
    expect(v.sprintf('%b %b 0b%b', 1, 0, 10)).toBe('1 0 0b1010');
    expect(v.sprintf('%+b %+b', 10, 10)).toBe('1010 1010');
    expect(v.sprintf("%+'t6b %4b", 9, 0)).toBe('tt1001    0');
    expect(v.sprintf('%010b', 90)).toBe('0001011010');
    expect(v.sprintf('%+ 8b', 88)).toBe(' 1011000');
    expect(v.sprintf('%b+%b=%b', 9, 1, 10)).toBe('1001+1=1010');
    expect(v.sprintf('%3$04b-%2$04b=%1$04b', 4, 1, 5)).toBe('0101-0001=0100');
    expect(v.sprintf("%+'T-5b", 15)).toBe('1111T');
    expect(v.sprintf('%b', 1.5e3)).toBe('10111011100');
    expect(v.sprintf('%b', '15NN')).toBe('1111');
    expect(v.sprintf('%b', '1.6')).toBe('1');
    expect(v.sprintf('%b', '1.5e+3')).toBe('1');
    expect(v.sprintf('%b', 'NN15')).toBe('0');
    expect(v.sprintf('%b %b', '', 15)).toBe('0 1111');
    expect(v.sprintf('%b', '+')).toBe('0');
    expect(v.sprintf('%b %b', -1, -10)).toBe('11111111111111111111111111111111 11111111111111111111111111110110');
  });

  it('should return a string according to octal integer type formatting', function() {
    expect(v.sprintf('%o', 1)).toBe('1');
    expect(v.sprintf('%o %o 0%o', 1, 0, 10)).toBe('1 0 012');
    expect(v.sprintf('%+o %+o', 10, 10)).toBe('12 12');
    expect(v.sprintf("%+'t6o %4o", 9, 0)).toBe('tttt11    0');
    expect(v.sprintf('%010o', 90)).toBe('0000000132');
    expect(v.sprintf('%+ 8o', 88)).toBe('     130');
    expect(v.sprintf('%o+%o=%o', 9, 1, 10)).toBe('11+1=12');
    expect(v.sprintf('%3$04o-%2$04o=%1$04o', 35, 5, 40)).toBe('0050-0005=0043');
    expect(v.sprintf("%+'T-5o", 15)).toBe('17TTT');
    expect(v.sprintf('%o', 1.5e3)).toBe('2734');
    expect(v.sprintf('%o', '15NN')).toBe('17');
    expect(v.sprintf('%o', '1.6')).toBe('1');
    expect(v.sprintf('%o', '1.5e+3')).toBe('1');
    expect(v.sprintf('%o', 'NN15')).toBe('0');
    expect(v.sprintf('%o %o', '', 15)).toBe('0 17');
    expect(v.sprintf('%o', '+')).toBe('0');
    expect(v.sprintf('%o %o', -1, -10)).toBe('37777777777 37777777766');
  });

  it('should return a string according to hexadecimal integer type formatting', function() {
    expect(v.sprintf('%x-%X', 1, 14)).toBe('1-E');
    expect(v.sprintf('%x %x 0X%x', 1, 0, 20)).toBe('1 0 0X14');
    expect(v.sprintf('%+x %+x', 10, 50)).toBe('a 32');
    expect(v.sprintf("%+'t6x %4x", 30, 0)).toBe('tttt1e    0');
    expect(v.sprintf('%010x', 90)).toBe('000000005a');
    expect(v.sprintf('%+ 8x', 88)).toBe('      58');
    expect(v.sprintf('%x+%x=%x', 90, 10, 100)).toBe('5a+a=64');
    expect(v.sprintf('%3$04x-%2$04x=%1$04x', 35, 5, 40)).toBe('0028-0005=0023');
    expect(v.sprintf("%+'T-5x", 15)).toBe('fTTTT');
    expect(v.sprintf('%1$x %1$X', 1.5e3)).toBe('5dc 5DC');
    expect(v.sprintf('%x', '15NN')).toBe('f');
    expect(v.sprintf('%x', '1.6')).toBe('1');
    expect(v.sprintf('%x', '1.5e+3')).toBe('1');
    expect(v.sprintf('%x', 'NN15')).toBe('0');
    expect(v.sprintf('%x %x', '', 15)).toBe('0 f');
    expect(v.sprintf('%x', '+')).toBe('0');
    expect(v.sprintf('%x %x', -1, -10)).toBe('ffffffff fffffff6');
  });

  it('should return a string according to unsigned decimal integer type formatting', function() {
    expect(v.sprintf('%u-%u', 1, 14)).toBe('1-14');
    expect(v.sprintf('%u %u %u', 1, 0, 20)).toBe('1 0 20');
    expect(v.sprintf('%+u %+u', 10, 50)).toBe('10 50');
    expect(v.sprintf("%+'t6u %4u", 30, 0)).toBe('tttt30    0');
    expect(v.sprintf('%010u', 90)).toBe('0000000090');
    expect(v.sprintf('%+ 8u', 88)).toBe('      88');
    expect(v.sprintf('%u+%u=%u', 90, 10, 100)).toBe('90+10=100');
    expect(v.sprintf('%3$04u-%2$04u=%1$04u', 35, 5, 40)).toBe('0040-0005=0035');
    expect(v.sprintf("%+'T-5u", 15)).toBe('15TTT');
    expect(v.sprintf('%1$u %1$u', 1.5e3)).toBe('1500 1500');
    expect(v.sprintf('%u', '15NN')).toBe('15');
    expect(v.sprintf('%u', '1.6')).toBe('1');
    expect(v.sprintf('%u', '1.5e+3')).toBe('1');
    expect(v.sprintf('%u', 'NN15')).toBe('0');
    expect(v.sprintf('%u %u', '', 15)).toBe('0 15');
    expect(v.sprintf('%u', '+')).toBe('0');
    expect(v.sprintf('%u %u', -1, -10)).toBe('4294967295 4294967286');
  });

  it('should return a string according to ascii integer type formatting', function() {
    expect(v.sprintf('%c %c %c', 65, 0x0020, 48)).toBe('A   0');
    expect(v.sprintf('%5c', 65)).toBe('    A');
    expect(v.sprintf('%02c', 65)).toBe('0A');
    expect(v.sprintf('%-5c', 65)).toBe('A    ');
    expect(v.sprintf("%+'t-4c", '110')).toBe('nttt');
  });

  it('should return a string according to float type formatting', function() {
    expect(v.sprintf('%f %f', 1, 0)).toBe('1.000000 0.000000');
    expect(v.sprintf('%+f+%+f', 50.123456789, 0)).toBe('+50.123457++0.000000');
    expect(v.sprintf('%1$.0f %1$.1f %1$.2f', 1.57)).toBe('2 1.6 1.57');
    expect(v.sprintf('%.2f %0.2f', 0, 0)).toBe('0.00 0.00');
    expect(v.sprintf('%4f %05.2f', -15.789, 1.27)).toBe('-15.789000 01.27');
    expect(v.sprintf("%'f10f", 1.5)).toBe('ff1.500000');
    expect(v.sprintf('%+-12f', 101.101)).toBe('+101.101000 ');
    expect(v.sprintf("%+'s-15.10f", 9.7654321)).toBe('+9.7654321000ss');
    expect(v.sprintf('%06.2f', 8)).toBe('008.00');
    expect(v.sprintf('%f %.1f', '34.111', '-15.67')).toBe('34.111000 -15.7');
    expect(v.sprintf('%.3f %.2f', '1.123456e+0', '1.3E+2')).toBe('1.123 130.00');
    expect(v.sprintf('%.3f', '-567.123456e+6')).toBe('-567123456.000');
    expect(v.sprintf('%f %f %f', '1FF', '-15.67TUU', '.1')).toBe('1.000000 -15.670000 0.100000');
    expect(v.sprintf('%f %f %f', 'FF', '', '+')).toBe('0.000000 0.000000 0.000000');
  });

  it('should return a string according to scientific float type formatting', function() {
    expect(v.sprintf('%e %e %E', 100, 0, 0.1)).toBe('1.000000e+2 0.000000e+0 1.000000E-1');
    expect(v.sprintf('%+e+%+e', 50.123456789, 0)).toBe('+5.012346e+1++0.000000e+0');
    expect(v.sprintf('%1$.0e %1$.1e %1$.2e', 1.57)).toBe('2e+0 1.6e+0 1.57e+0');
    expect(v.sprintf('%.2e %0.2e', 0, 0)).toBe('0.00e+0 0.00e+0');
    expect(v.sprintf('%.0e %.0e', 0, 15.7)).toBe('0e+0 2e+1');
    expect(v.sprintf('%4e %08.2e', -15.789, 1.27)).toBe('-1.578900e+1 01.27e+0');
    expect(v.sprintf("%'f15e", 0.105)).toBe('ffff1.050000e-1');
    expect(v.sprintf('%+-14e', 101.101)).toBe('+1.011010e+2  ');
    expect(v.sprintf("%+'s-20.10e", 0.097654321)).toBe('+9.7654321000e-2ssss');
    expect(v.sprintf('%08.2e', 8)).toBe('08.00e+0');
    expect(v.sprintf('%e %.1e', '34.111', '-15.67')).toBe('3.411100e+1 -1.6e+1');
    expect(v.sprintf('%.3E %.2E', '1.123456e+0', '1.3E+2')).toBe('1.123E+0 1.30E+2');
    expect(v.sprintf('%.4e', '-567.123456e+6')).toBe('-5.6712e+8');
    expect(v.sprintf('%e %e %e', '1FF', '-15.67TUU', '.1')).toBe('1.000000e+0 -1.567000e+1 1.000000e-1');
    expect(v.sprintf('%e %e %e', 'FF', '', '+')).toBe('0.000000e+0 0.000000e+0 0.000000e+0');
  });

  it('should return a string according to short float type formatting', function() {
    expect(v.sprintf('%g %g %g', 100, 0, 0.1)).toBe('100 0 0.1');
    expect(v.sprintf('%+g+%+g', 50.123456789, 0)).toBe('+50.1235++0');
    expect(v.sprintf('%1$.0g %1$.1g %1$.2g', 1.57)).toBe('2 2 1.6');
    expect(v.sprintf('%.2g %0.2g', 0, 0)).toBe('0 0');
    expect(v.sprintf('%.0g', 0)).toBe('0');
    expect(v.sprintf('%.0g %.0g', 0, 15.7)).toBe('0 2e+1');
    expect(v.sprintf('%4g %08.2g', -15.789, 1.27)).toBe('-15.789 000001.3');
    expect(v.sprintf("%'f15g", 0.105)).toBe('ffffffffff0.105');
    expect(v.sprintf('%+-14g', 101.101)).toBe('+101.101      ');
    expect(v.sprintf("%+'s-20.10g", 0.0976543216)).toBe('+0.0976543216sssssss');
    expect(v.sprintf("%+'s-20.8g", 0.0976543216)).toBe('+0.097654322ssssssss');
    expect(v.sprintf('%08.2g', 8)).toBe('00000008');
    expect(v.sprintf('%g %.1G', '34.111', '-15.67')).toBe('34.111 -2E+1');
    expect(v.sprintf('_%.3G_%.2G_!1234567890*', '1.123456e+0', '1.3E+2')).toBe('_1.12_1.3E+2_!1234567890*');
    expect(v.sprintf('%.4g', '-567.123456e+6')).toBe('-5.671e+8');
    expect(v.sprintf('%g %G %g', '1FF', '-15.67TUU', '.1')).toBe('1 -15.67 0.1');
    expect(v.sprintf('%g %G %g', 'FF', '', '+')).toBe('0 0 0');
  });

  it('should return a string according to format', function() {
    expect(v.sprintf('%s costs $%.2f', 'Coffee', 2)).toBe('Coffee costs $2.00');
    expect(v.sprintf('%%s like %s', 'Coffee')).toBe('%s like Coffee');
    expect(
      v.sprintf(
        "Full format: %'*10s %+d %i %04b %c %o %u %X %.0f %e %g %%",
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
        10.123456789
      )
    ).toBe('Full format: ****string +18 -5 0100 A 10 401 FF 9 5.012000e+1 10.1235 %');
    expect(v.sprintf('%s%d%%%s', 'word', 10, 'word')).toBe('word10%word');
  });

  it('should ignore specifiers with double percent characters', function() {
    expect(v.sprintf('%%s')).toBe('%s');
    expect(v.sprintf('%%s %s', 'Persian')).toBe('%s Persian');
    expect(v.sprintf('%% %%')).toBe('% %');
    expect(v.sprintf('%%%% %%%%%s', 'Babylon')).toBe('%% %%Babylon');
  });

  it('should throw exceptions when the formatter is not valid or not enough arguments', function() {
    expect(v.sprintf.bind(v, '%s')).toThrowError('sprintf(): Too few arguments');
    expect(v.sprintf.bind(v, '%s %s')).toThrowError('sprintf(): Too few arguments');
    expect(v.sprintf.bind(v, '%s %s', 'Alexander')).toThrowError('sprintf(): Too few arguments');
    expect(v.sprintf.bind(v, '%2$s %1$s', 'Alexander')).toThrowError('sprintf(): Too few arguments');
    expect(v.sprintf.bind(v, '%2$s %1$s', 'Alexander')).toThrowError('sprintf(): Too few arguments');
    expect(v.sprintf.bind(v, '%a', 'Alexander')).toThrowError('sprintf(): Unknown type specifier');
    expect(v.sprintf.bind(v, PRINTABLE_ASCII, 'Alexander')).toThrowError('sprintf(): Unknown type specifier');
    expect(v.sprintf.bind(v, '%s the %y', 'Alexander', 'Great')).toThrowError('sprintf(): Unknown type specifier');
    expect(v.sprintf.bind(v, '%', 'Alexander')).toThrowError('sprintf(): Unknown type specifier');
    expect(v.sprintf.bind(v, '%%%%% %%', 'Alexander')).toThrowError('sprintf(): Unknown type specifier');
    expect(v.sprintf.bind(v, '%0$s', 'Alexander')).toThrowError('sprintf(): Argument number must be greater than zero');
  });

  it('should return an unmodified string for missing formatting specifiers', function() {
    expect(v.sprintf('Without formatting')).toBe('Without formatting');
    expect(v.sprintf('')).toBe('');
    expect(v.sprintf()).toBe('');
    expect(v.sprintf(undefined)).toBe('');
    expect(v.sprintf(null)).toBe('');
  });
});
