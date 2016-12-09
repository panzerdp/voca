import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('countcountWords', function() {

  it('should the words in a string', function() {
    expect(v.countWords('123')).to.equal(1);
    expect(v.countWords('15+20=35')).to.equal(3);
    expect(v.countWords('hello')).to.equal(1);
    expect(v.countWords('  hello   ')).to.equal(1);
    expect(v.countWords('hello world')).to.equal(2);
    expect(v.countWords('12+14-18*400')).to.equal(4);
    expect(v.countWords('gravity can cross dimensions')).to.equal(4);
    expect(v.countWords('-gravity-can-cross-dimensions-')).to.equal(4);
    expect(v.countWords('gravity_can_cross_dimensions')).to.equal(4);
    expect(v.countWords('*gravity***can****cross&&dimensions++')).to.equal(4);
    expect(v.countWords('GravityCanCrossDimensions')).to.equal(4);
    expect(v.countWords('GRAVITYCan')).to.equal(2);
    expect(v.countWords('GravityCan')).to.equal(2);
    expect(v.countWords('GravityCANAttract')).to.equal(3);
    expect(v.countWords('gravityCan')).to.equal(2);
    expect(v.countWords('Gravity-Can11Cross **Dimensions1Foo')).to.equal(7);
    expect(v.countWords('Cooper... Cooper... Come in, Cooper.')).to.equal(5);
    expect(v.countWords('Newton\'s third law')).to.equal(4);
    expect(v.countWords('Newton\'s thIrd lAw')).to.equal(6);
    expect(v.countWords(PRINTABLE_ASCII)).to.equal(3);
    expect(v.countWords('')).to.equal(0);
    expect(v.countWords()).to.equal(0);
    expect(v.countWords(' ')).to.equal(0);
    expect(v.countWords('     ')).to.equal(0);
    expect(v.countWords('\n')).to.equal(0);
    expect(v.countWords('***')).to.equal(0);
    expect(v.countWords('***---')).to.equal(0);
    expect(v.countWords('***---')).to.equal(0);
    expect(v.countWords('man\u0303ana')).to.equal(1);
    expect(v.countWords('maN\u0303ana')).to.equal(2);
    expect(v.countWords('foo\u0303\u035C\u035D\u035E bar')).to.equal(2);
    expect(v.countWords('fo-O-O\u0303\u035C\u035D\u035E-bar')).to.equal(4);
  });

  it('should count the words in a string with diacritics', function() {
    expect(v.countWords('clasificación biológica.')).to.equal(2);
    expect(v.countWords('BunăZiua')).to.equal(2);
    expect(v.countWords('Bună1ZiUa!')).to.equal(4);
    expect(v.countWords('Język /polski wywodzi się z` języka` praindoeuropejskiego za**pośrednictwem+języka-prasłowiańskiego.'))
      .to.equal(11);
    expect(v.countWords('Гравитация притягивает все')).to.equal(3);
    expect(v.countWords('Гравитация-Притягивает-ВСЕ!!')).to.equal(3);
    expect(v.countWords('Στις--αρχές** (του) 21ου, αιώνα!')).to.equal(6);
  });

  it('should count the countWords in a string representation of an object', function() {
    expect(v.countWords(['GravityCanCrossDimensions'])).to.equal(4);
    expect(v.countWords({
      toString: function() {
        return 'Gr4v1ty';
      }
    })).to.equal(5);
  });

  it('should count the words in a string into countWords using a pattern', function() {
    expect(v.countWords('1234567890', /\d/g)).to.equal(10);
    expect(v.countWords('gravity', /\w{1,2}/g)).to.equal(4);
    expect(v.countWords('gravity can cross dimensions', '\\w+(?=\\s?)', 'g')).to.equal(4);
    expect(v.countWords('1234567890', /\s/g)).to.equal(0);
  });

  it('should count the words in a string with default pattern for null and undefined', function() {
    expect(v.countWords('gravity_can_cross_dimensions', null)).to.equal(4);
    expect(v.countWords('gravity_can_cross_dimensions', undefined)).to.equal(4);
  });
  
});