import v from '../voca';

describe('chain', function() {
  it('should calculate the result using explicit chaining', function() {
    expect(v.chain('Hello world').value()).toBe('Hello world');
    expect(
      v
        .chain('  Hello world  ')
        .trim()
        .value()
    ).toBe('Hello world');
    expect(
      v
        .chain('world')
        .isAlpha()
        .value()
    ).toBe(true);
    expect(
      v
        .chain('Hello world')
        .lowerCase()
        .replace('hello', 'hi')
        .upperCase()
        .value()
    ).toBe('HI WORLD');
  });

  it('should calculate the result using implicit chaining', function() {
    expect(
      v('Hello world')
        .lowerCase()
        .words()
    ).toEqual(['hello', 'world']);
    expect(
      v('  Hello world  ')
        .trimLeft()
        .count()
    ).toBe(13);
    expect(
      v('7 days')
        .replace(/\sdays/, '')
        .isDigit()
    ).toBe(true);
    expect(
      v('7 days')
        .replace(/\sdays/, '')
        .value()
    ).toBe('7');
  });

  it('should transform implicit into explicit chaining', function() {
    expect(
      v('Hello world')
        .chain()
        .lowerCase()
        .words()
        .value()
    ).toEqual(['hello', 'world']);
    expect(
      v('15')
        .chain()
        .isNumeric()
        .value()
    ).toBe(true);
    expect(
      v('15')
        .chain()
        .isNumeric()
        .thru(function(isNumeric) {
          return isNumeric ? 1 : 0;
        })
        .value()
    ).toBe(1);
  });

  it('should allow to pass thru the wrapped value', function() {
    expect(
      v('Hello world')
        .chain()
        .lowerCase()
        .words()
        .thru(function(words) {
          return words[0];
        })
        .value()
    ).toBe('hello');
    expect(
      v
        .chain('15')
        .isNumeric()
        .thru()
        .value()
    ).toBe(true);
  });

  it('wrapper object should coerce to a primitive', function() {
    expect('nice' + v.chain(' evening ').trimRight()).toBe('nice evening');
    expect(v('clouds').upperCase() == 'CLOUDS').toBe(true);
  });

  it('wrapper object should coerce to a string', function() {
    expect('nice ' + v.chain('hello world').words()).toBe('nice hello,world');
    expect(v('green tree').split(' ') == 'green,tree').toBe(true);
  });

  it('wrapper object should provide toJSON method', function() {
    expect(
      JSON.stringify(
        v
          .chain('happy coding')
          .upperCase()
          .split(' ')
      )
    ).toBe('["HAPPY","CODING"]');
  });
});
