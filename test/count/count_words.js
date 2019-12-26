import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('countcountWords', function() {
  it('should the words in a string', function() {
    expect(v.countWords('123')).toBe(1);
    expect(v.countWords('15+20=35')).toBe(3);
    expect(v.countWords('hello')).toBe(1);
    expect(v.countWords('  hello   ')).toBe(1);
    expect(v.countWords('hello world')).toBe(2);
    expect(v.countWords('12+14-18*400')).toBe(4);
    expect(v.countWords('gravity can cross dimensions')).toBe(4);
    expect(v.countWords('-gravity-can-cross-dimensions-')).toBe(4);
    expect(v.countWords('gravity_can_cross_dimensions')).toBe(4);
    expect(v.countWords('*gravity***can****cross&&dimensions++')).toBe(4);
    expect(v.countWords('GravityCanCrossDimensions')).toBe(4);
    expect(v.countWords('GRAVITYCan')).toBe(2);
    expect(v.countWords('GravityCan')).toBe(2);
    expect(v.countWords('GravityCANAttract')).toBe(3);
    expect(v.countWords('gravityCan')).toBe(2);
    expect(v.countWords('Gravity-Can11Cross **Dimensions1Foo')).toBe(7);
    expect(v.countWords('Cooper... Cooper... Come in, Cooper.')).toBe(5);
    expect(v.countWords("Newton's third law")).toBe(4);
    expect(v.countWords("Newton's thIrd lAw")).toBe(6);
    expect(v.countWords(PRINTABLE_ASCII)).toBe(3);
    expect(v.countWords('')).toBe(0);
    expect(v.countWords()).toBe(0);
    expect(v.countWords(' ')).toBe(0);
    expect(v.countWords('     ')).toBe(0);
    expect(v.countWords('\n')).toBe(0);
    expect(v.countWords('***')).toBe(0);
    expect(v.countWords('***---')).toBe(0);
    expect(v.countWords('***---')).toBe(0);
    expect(v.countWords('man\u0303ana')).toBe(1);
    expect(v.countWords('maN\u0303ana')).toBe(2);
    expect(v.countWords('foo\u0303\u035C\u035D\u035E bar')).toBe(2);
    expect(v.countWords('fo-O-O\u0303\u035C\u035D\u035E-bar')).toBe(4);
  });

  it('should count the words in a string with diacritics', function() {
    expect(v.countWords('clasificación biológica.')).toBe(2);
    expect(v.countWords('BunăZiua')).toBe(2);
    expect(v.countWords('Bună1ZiUa!')).toBe(4);
    expect(
      v.countWords(
        'Język /polski wywodzi się z` języka` praindoeuropejskiego za**pośrednictwem+języka-prasłowiańskiego.'
      )
    ).toBe(11);
    expect(v.countWords('Гравитация притягивает все')).toBe(3);
    expect(v.countWords('Гравитация-Притягивает-ВСЕ!!')).toBe(3);
    expect(v.countWords('Στις--αρχές** (του) 21ου, αιώνα!')).toBe(6);
  });

  it('should count the countWords in a string representation of an object', function() {
    expect(v.countWords(['GravityCanCrossDimensions'])).toBe(4);
    expect(
      v.countWords({
        toString: function() {
          return 'Gr4v1ty';
        },
      })
    ).toBe(5);
  });

  it('should count the words in a string into countWords using a pattern', function() {
    expect(v.countWords('1234567890', /\d/g)).toBe(10);
    expect(v.countWords('gravity', /\w{1,2}/g)).toBe(4);
    expect(v.countWords('gravity can cross dimensions', '\\w+(?=\\s?)', 'g')).toBe(4);
    expect(v.countWords('1234567890', /\s/g)).toBe(0);
  });

  it('should count the words in a string with default pattern for null and undefined', function() {
    expect(v.countWords('gravity_can_cross_dimensions', null)).toBe(4);
    expect(v.countWords('gravity_can_cross_dimensions', undefined)).toBe(4);
  });
});
