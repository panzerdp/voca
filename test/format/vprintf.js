import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('vprintf', function() {

  it('should return a string according to formatting', function () {
    expect(v.vprintf('%s', ['string'])).to.be.equal('string');
    expect(v.vprintf('Hello %s!', ['World'])).to.be.equal('Hello World!');
    expect(v.vprintf('%d %d %d', [1, 0, -100])).to.be.equal('1 0 -100');
    expect(v.vprintf('%b %b 0b%b', [1, 0, 10])).to.be.equal('1 0 0b1010');
    expect(v.vprintf('%o %o 0%o', [1, 0, 10])).to.be.equal('1 0 012');
    expect(v.vprintf('%x %x 0X%x', [1, 0, 20])).to.be.equal('1 0 0X14');
    expect(v.vprintf('%u %u %u', [1, 0, 20])).to.be.equal('1 0 20');
    expect(v.vprintf('%c %c %c', [65, 0x0020, 48])).to.be.equal('A   0');
    expect(v.vprintf('%+f+%+f', [50.123456789, 0])).to.be.equal('+50.123457++0.000000');
    expect(v.vprintf('%e %e %E', [100, 0, .1])).to.be.equal('1.000000e+2 0.000000e+0 1.000000E-1');
    expect(v.vprintf('%+g+%+g', [50.123456789, 0])).to.be.equal('+50.1235++0');
    expect(v.vprintf("Full format: %'*10s %+d %i %04b %c %o %u %X %.0f %e %g %%",
      ['string', 18, -5, 4, 65, 8, 401, 255, 8.9, 50.12, 10.123456789]
    )).to.be.equal('Full format: ****string +18 -5 0100 A 10 401 FF 9 5.012000e+1 10.1235 %');
    expect(v.vprintf('%%s %s', ['Persian'])).to.be.equal('%s Persian');
  });

  it('should throw exceptions when the formatter is not valid or not enough arguments', function () {
    expect(v.vprintf.bind(v, '%2$s %1$s', ['Alexander'])).to.throw(Error, 'sprintf(): Too few arguments');
    expect(v.vprintf.bind(v, '%a', ['Alexander'])).to.throw(Error, 'sprintf(): Unknown type specifier');
    expect(v.vprintf.bind(v, PRINTABLE_ASCII, ['Alexander'])).to.throw(Error, 'sprintf(): Unknown type specifier');
    expect(v.vprintf.bind(v, '%0$s', ['Alexander'])).to.throw(Error, 'sprintf(): Argument number must be greater than zero');
  });

  it('should return an unmodified string for missing formatting specifiers', function () {
    expect(v.vprintf('Without formatting')).to.be.equal('Without formatting');
    expect(v.vprintf('Without formatting', [])).to.be.equal('Without formatting');
    expect(v.vprintf('Without formatting', [undefined])).to.be.equal('Without formatting');
    expect(v.vprintf('')).to.be.equal('');
    expect(v.vprintf(' ')).to.be.equal(' ');
    expect(v.vprintf()).to.be.equal('');
    expect(v.vprintf(undefined)).to.be.equal('');
    expect(v.vprintf(null)).to.be.equal('');
  });

});