import v from '../voca';
import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../utils/string/ascii';

describe('sprintf', function() {

  it('should return a string according to string type formatting', function shouldReturnStringBasedOnFormatting() {
    expect(v.sprintf('%s', 'string')).to.be.equal('string');
    expect(v.sprintf('Hello %s!', 'World')).to.be.equal('Hello World!');
    expect(v.sprintf('%s %s!', 'Hello', 'World')).to.be.equal('Hello World!');
    expect(v.sprintf('%s %s!', '%s', '%s')).to.be.equal('%s %s!');
    expect(v.sprintf('Hello %5s!', 'World')).to.be.equal('Hello World!');
    expect(v.sprintf('Hello %3s!', 'World')).to.be.equal('Hello World!');
    expect(v.sprintf('Hello %8s!', 'World')).to.be.equal('Hello    World!');
    expect(v.sprintf('%s%s%s%s%s', 'Alexander', ' ', 'the', ' ', 'Great')).to.be.equal('Alexander the Great');
    expect(v.sprintf('Alexander the %08s', 'Great')).to.be.equal('Alexander the 000Great');
    expect(v.sprintf('Alexander the % 8s', 'Great')).to.be.equal('Alexander the    Great');
    expect(v.sprintf("%'-10s the %s", 'Alexander', 'Great')).to.be.equal('-Alexander the Great');
    expect(v.sprintf("%'.12s the %09s", 'Alexander', 'Great')).to.be.equal('...Alexander the 0000Great');
    expect(v.sprintf('%-12s', 'Alexander')).to.be.equal('Alexander   ');
    expect(v.sprintf('%+-12s', 'Alexander')).to.be.equal('Alexander   ');
    expect(v.sprintf('%.4s the Great', 'Alexander')).to.be.equal('Alex the Great');
    expect(v.sprintf('%.9s the Great', 'Alexander')).to.be.equal('Alexander the Great');
    expect(v.sprintf('%.0s the Great', 'Alexander')).to.be.equal(' the Great');
    expect(v.sprintf('%10.8s the Great', 'Alexander')).to.be.equal('  Alexande the Great');
    expect(v.sprintf('%\'-10.6s %\'1-12.4s', 'Persian', 'Empire')).to.be.equal('----Persia Empi11111111');
    expect(v.sprintf('%2$s the %1$s', 'Great', 'Alexander')).to.be.equal('Alexander the Great');
    expect(v.sprintf('%2$s', 'Great', 'Alexander')).to.be.equal('Alexander');
    expect(v.sprintf('%2$\'012s the %1$.4s', 'Great', 'Alexander')).to.be.equal('000Alexander the Grea');
    expect(v.sprintf('%%%1$\'q-12.4s%%s', 'Alexander')).to.be.equal('%Alexqqqqqqqq%s');
    expect(v.sprintf('%2$s the %s', 'Great', 'Alexander')).to.be.equal('Alexander the Great');
    expect(v.sprintf('%1$s the %s', 'Great')).to.be.equal('Great the Great');
  });

  it('should return a string according to decimal integer type formatting', function shouldReturnDecimalIntegerBasedOnFormatting() {
    expect(v.sprintf('%d', 1)).to.be.equal('1');
    expect(v.sprintf('%i', 1)).to.be.equal('1');
    expect(v.sprintf('%d %d %d', 1, 0, -100)).to.be.equal('1 0 -100');
    expect(v.sprintf('%+d %+d', 10, -10)).to.be.equal('+10 -10');
    expect(v.sprintf("%+'t4d %4d", 9, 0)).to.be.equal('tt+9    0');
    expect(v.sprintf("%010i", 90)).to.be.equal('0000000090');
    expect(v.sprintf("%+ 8d", 88)).to.be.equal('     +88');
    expect(v.sprintf("%d+%d=%d", 9, 1, 10)).to.be.equal('9+1=10');
    expect(v.sprintf("%3$04d-%2$04d=%1$04d", 9, 1, 10)).to.be.equal('0010-0001=0009');
    expect(v.sprintf("%+'T-5d", 15)).to.be.equal('+15TT');
    expect(v.sprintf("%d", 1.5e+3)).to.be.equal('1500');
    expect(v.sprintf("%d", '15NN')).to.be.equal('15');
    expect(v.sprintf("%d", '1.6')).to.be.equal('1');
    expect(v.sprintf("%d", '1.5e+3')).to.be.equal('1');
    expect(v.sprintf("%d", 'NN15')).to.be.equal('0');
    expect(v.sprintf("%d %d", '', 15)).to.be.equal('0 15');
    expect(v.sprintf("%d", '+')).to.be.equal('0');
  });

  it('should return a string according to binary integer type formatting', function shouldReturnBinaryIntegerBasedOnFormatting() {
    expect(v.sprintf('%b', 1)).to.be.equal('1');
    expect(v.sprintf('%b %b 0b%b', 1, 0, 10)).to.be.equal('1 0 0b1010');
    expect(v.sprintf('%+b %+b', 10, 10)).to.be.equal('1010 1010');
    expect(v.sprintf("%+'t6b %4b", 9, 0)).to.be.equal('tt1001    0');
    expect(v.sprintf("%010b", 90)).to.be.equal('0001011010');
    expect(v.sprintf("%+ 8b", 88)).to.be.equal(' 1011000');
    expect(v.sprintf("%b+%b=%b", 9, 1, 10)).to.be.equal('1001+1=1010');
    expect(v.sprintf("%3$04b-%2$04b=%1$04b", 4, 1, 5)).to.be.equal('0101-0001=0100');
    expect(v.sprintf("%+'T-5b", 15)).to.be.equal('1111T');
    expect(v.sprintf("%b", 1.5e+3)).to.be.equal('10111011100');
    expect(v.sprintf("%b", '15NN')).to.be.equal('1111');
    expect(v.sprintf("%b", '1.6')).to.be.equal('1');
    expect(v.sprintf("%b", '1.5e+3')).to.be.equal('1');
    expect(v.sprintf("%b", 'NN15')).to.be.equal('0');
    expect(v.sprintf("%b %b", '', 15)).to.be.equal('0 1111');
    expect(v.sprintf("%b", '+')).to.be.equal('0');
    expect(v.sprintf("%b %b", -1, -10)).to.be.equal('11111111111111111111111111111111 11111111111111111111111111110110');
  });

  it('should return a string according to octal integer type formatting', function shouldReturnOctalIntegerBasedOnFormatting() {
    expect(v.sprintf('%o', 1)).to.be.equal('1');
    expect(v.sprintf('%o %o 0%o', 1, 0, 10)).to.be.equal('1 0 012');
    expect(v.sprintf('%+o %+o', 10, 10)).to.be.equal('12 12');
    expect(v.sprintf("%+'t6o %4o", 9, 0)).to.be.equal('tttt11    0');
    expect(v.sprintf("%010o", 90)).to.be.equal('0000000132');
    expect(v.sprintf("%+ 8o", 88)).to.be.equal('     130');
    expect(v.sprintf("%o+%o=%o", 9, 1, 10)).to.be.equal('11+1=12');
    expect(v.sprintf("%3$04o-%2$04o=%1$04o", 35, 5, 40)).to.be.equal('0050-0005=0043');
    expect(v.sprintf("%+'T-5o", 15)).to.be.equal('17TTT');
    expect(v.sprintf("%o", 1.5e+3)).to.be.equal('2734');
    expect(v.sprintf("%o", '15NN')).to.be.equal('17');
    expect(v.sprintf("%o", '1.6')).to.be.equal('1');
    expect(v.sprintf("%o", '1.5e+3')).to.be.equal('1');
    expect(v.sprintf("%o", 'NN15')).to.be.equal('0');
    expect(v.sprintf("%o %o", '', 15)).to.be.equal('0 17');
    expect(v.sprintf("%o", '+')).to.be.equal('0');
    expect(v.sprintf("%o %o", -1, -10)).to.be.equal('37777777777 37777777766');
  });

  it('should return a string according to hexadecimal integer type formatting', function shouldReturnHexadecimalIntegerBasedOnFormatting() {
    expect(v.sprintf('%x-%X', 1, 14)).to.be.equal('1-E');
    expect(v.sprintf('%x %x 0X%x', 1, 0, 20)).to.be.equal('1 0 0X14');
    expect(v.sprintf('%+x %+x', 10, 50)).to.be.equal('a 32');
    expect(v.sprintf("%+'t6x %4x", 30, 0)).to.be.equal('tttt1e    0');
    expect(v.sprintf("%010x", 90)).to.be.equal('000000005a');
    expect(v.sprintf("%+ 8x", 88)).to.be.equal('      58');
    expect(v.sprintf("%x+%x=%x", 90, 10, 100)).to.be.equal('5a+a=64');
    expect(v.sprintf("%3$04x-%2$04x=%1$04x", 35, 5, 40)).to.be.equal('0028-0005=0023');
    expect(v.sprintf("%+'T-5x", 15)).to.be.equal('fTTTT');
    expect(v.sprintf("%1$x %1$X", 1.5e+3)).to.be.equal('5dc 5DC');
    expect(v.sprintf("%x", '15NN')).to.be.equal('f');
    expect(v.sprintf("%x", '1.6')).to.be.equal('1');
    expect(v.sprintf("%x", '1.5e+3')).to.be.equal('1');
    expect(v.sprintf("%x", 'NN15')).to.be.equal('0');
    expect(v.sprintf("%x %x", '', 15)).to.be.equal('0 f');
    expect(v.sprintf("%x", '+')).to.be.equal('0');
    expect(v.sprintf("%x %x", -1, -10)).to.be.equal('ffffffff fffffff6');
  });

  it('should return a string according to unisgned decimal integer type formatting', function shouldReturnUnsignedDecimalIntegerBasedOnFormatting() {
    expect(v.sprintf('%u-%u', 1, 14)).to.be.equal('1-14');
    expect(v.sprintf('%u %u %u', 1, 0, 20)).to.be.equal('1 0 20');
    expect(v.sprintf('%+u %+u', 10, 50)).to.be.equal('10 50');
    expect(v.sprintf("%+'t6u %4u", 30, 0)).to.be.equal('tttt30    0');
    expect(v.sprintf("%010u", 90)).to.be.equal('0000000090');
    expect(v.sprintf("%+ 8u", 88)).to.be.equal('      88');
    expect(v.sprintf("%u+%u=%u", 90, 10, 100)).to.be.equal('90+10=100');
    expect(v.sprintf("%3$04u-%2$04u=%1$04u", 35, 5, 40)).to.be.equal('0040-0005=0035');
    expect(v.sprintf("%+'T-5u", 15)).to.be.equal('15TTT');
    expect(v.sprintf("%1$u %1$u", 1.5e+3)).to.be.equal('1500 1500');
    expect(v.sprintf("%u", '15NN')).to.be.equal('15');
    expect(v.sprintf("%u", '1.6')).to.be.equal('1');
    expect(v.sprintf("%u", '1.5e+3')).to.be.equal('1');
    expect(v.sprintf("%u", 'NN15')).to.be.equal('0');
    expect(v.sprintf("%u %u", '', 15)).to.be.equal('0 15');
    expect(v.sprintf("%u", '+')).to.be.equal('0');
    expect(v.sprintf("%u %u", -1, -10)).to.be.equal('4294967295 4294967286');
  });

  it('should ignore specifiers with double percent characters', function shouldIgnoreSpecifiersWithDoublePercent() {
    expect(v.sprintf('%%s')).to.be.equal('%s');
    expect(v.sprintf('%%s %s', 'Persian')).to.be.equal('%s Persian');
    expect(v.sprintf('%% %%')).to.be.equal('% %');
    expect(v.sprintf('%%%% %%%%%s', 'Babylon')).to.be.equal('%% %%Babylon');
  });

  it('should throw exceptions when the formatter is not valid or not enough arguments', function shouldThrowException() {
    expect(v.sprintf.bind(v, '%s')).to.throw(Error, 'sprintf(): Too few arguments');
    expect(v.sprintf.bind(v, '%s %s')).to.throw(Error, 'sprintf(): Too few arguments');
    expect(v.sprintf.bind(v, '%s %s', 'Alexander')).to.throw(Error, 'sprintf(): Too few arguments');
    expect(v.sprintf.bind(v, '%2$s %1$s', 'Alexander')).to.throw(Error, 'sprintf(): Too few arguments');
    expect(v.sprintf.bind(v, '%2$s %1$s', 'Alexander')).to.throw(Error, 'sprintf(): Too few arguments');
    expect(v.sprintf.bind(v, '%a', 'Alexander')).to.throw(Error, 'sprintf(): Unknown type specifier');
    expect(v.sprintf.bind(v, PRINTABLE_ASCII, 'Alexander')).to.throw(Error, 'sprintf(): Unknown type specifier');
    expect(v.sprintf.bind(v, '%s the %y', 'Alexander', 'Great')).to.throw(Error, 'sprintf(): Unknown type specifier');
    expect(v.sprintf.bind(v, '%', 'Alexander')).to.throw(Error, 'sprintf(): Unknown type specifier');
    expect(v.sprintf.bind(v, '%%%%% %%', 'Alexander')).to.throw(Error, 'sprintf(): Unknown type specifier');
    expect(v.sprintf.bind(v, '%0$s', 'Alexander')).to.throw(Error, 'sprintf(): Argument number must be greater than zero');
  });

  it('should return an unmodified string for missing formatting specifiers', function shouldNotModifyString() {
    expect(v.sprintf('Without formatting')).to.be.equal('Without formatting');
    expect(v.sprintf('')).to.be.equal('');
  });

});