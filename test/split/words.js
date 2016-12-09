import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('words', function() {

  it('should split the string into words', function() {
    expect(v.words('123')).to.eql(['123']);
    expect(v.words('15+20=35')).to.eql(['15', '20', '35']);
    expect(v.words('hello')).to.eql(['hello']);
    expect(v.words('  hello   ')).to.eql(['hello']);
    expect(v.words('hello world')).to.eql(['hello', 'world']);
    expect(v.words('12+14-18*400')).to.eql(['12', '14', '18', '400']);
    expect(v.words('gravity can cross dimensions')).to.eql(['gravity', 'can', 'cross', 'dimensions']);
    expect(v.words('-gravity-can-cross-dimensions-')).to.eql(['gravity', 'can', 'cross', 'dimensions']);
    expect(v.words('gravity_can_cross_dimensions')).to.eql(['gravity', 'can', 'cross', 'dimensions']);
    expect(v.words('*gravity***can****cross&&dimensions++')).to.eql(['gravity', 'can', 'cross', 'dimensions']);
    expect(v.words('GravityCanCrossDimensions')).to.eql(['Gravity', 'Can', 'Cross', 'Dimensions']);
    expect(v.words('GRAVITYCan')).to.eql(['GRAVITY', 'Can']);
    expect(v.words('GravityCan')).to.eql(['Gravity', 'Can']);
    expect(v.words('GravityCANAttract')).to.eql(['Gravity', 'CAN', 'Attract']);
    expect(v.words('gravityCan')).to.eql(['gravity', 'Can']);
    expect(v.words('Gravity-Can11Cross **Dimensions1Foo')).to.eql(['Gravity', 'Can', '11', 'Cross', 'Dimensions', '1', 'Foo']);
    expect(v.words('Cooper... Cooper... Come in, Cooper.')).to.eql(['Cooper', 'Cooper', 'Come', 'in', 'Cooper']);
    expect(v.words('Newton\'s third law')).to.eql(['Newton', 's', 'third', 'law']);
    expect(v.words('Newton\'s thIrd lAw')).to.eql(['Newton', 's', 'th', 'Ird', 'l', 'Aw']);
    expect(v.words(PRINTABLE_ASCII)).to.eql(['0123456789', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz']);
    expect(v.words('')).to.eql([]);
    expect(v.words()).to.eql([]);
    expect(v.words(' ')).to.eql([]);
    expect(v.words('     ')).to.eql([]);
    expect(v.words('\n')).to.eql([]);
    expect(v.words('***')).to.eql([]);
    expect(v.words('***---')).to.eql([]);
    expect(v.words('***---')).to.eql([]);
    expect(v.words('man\u0303ana')).to.eql(['man\u0303ana']);
    expect(v.words('maN\u0303ana')).to.eql(['ma', 'N\u0303ana']);
    expect(v.words('foo\u0303\u035C\u035D\u035E bar')).to.eql(['foo\u0303\u035C\u035D\u035E', 'bar']);
    expect(v.words('fo-O-O\u0303\u035C\u035D\u035E-bar')).to.eql(['fo', 'O', 'O\u0303\u035C\u035D\u035E', 'bar']);
  });

  it('should split the string with diacritics into words', function() {
    expect(v.words('clasificación biológica.')).to.eql(['clasificación', 'biológica']);
    expect(v.words('BunăZiua')).to.eql(['Bună', 'Ziua']);
    expect(v.words('Bună1ZiUa!')).to.eql(['Bună', '1', 'Zi', 'Ua']);
    expect(v.words('Język /polski wywodzi się z` języka` praindoeuropejskiego za**pośrednictwem+języka-prasłowiańskiego.'))
      .to.eql(['Język', 'polski', 'wywodzi', 'się', 'z', 'języka', 'praindoeuropejskiego', 'za', 'pośrednictwem', 'języka', 'prasłowiańskiego']);
    expect(v.words('Гравитация притягивает все')).to.eql(['Гравитация', 'притягивает', 'все']);
    expect(v.words('Гравитация-Притягивает-ВСЕ!!')).to.eql(['Гравитация', 'Притягивает', 'ВСЕ']);
    expect(v.words('Στις--αρχές** (του) 21ου, αιώνα!')).to.eql(['Στις', 'αρχές', 'του', '21', 'ου', 'αιώνα']);
  });

  it('should split the string representation of an object', function() {
    expect(v.words(['GravityCanCrossDimensions'])).to.eql(['Gravity', 'Can', 'Cross', 'Dimensions']);
    expect(v.words({
      toString: function() {
        return 'Gr4v1ty';
      }
    })).to.eql(['Gr', '4', 'v', '1', 'ty']);
  });

  it('should split the string into words using a pattern', function() {
    expect(v.words('1234567890', /\d/g)).to.eql(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']);
    expect(v.words('gravity', /\w{1,2}/g)).to.eql(['gr', 'av', 'it', 'y']);
    expect(v.words('gravity can cross dimensions', '\\w+(?=\\s?)', 'g')).to.eql(['gravity', 'can', 'cross', 'dimensions']);
    expect(v.words('1234567890', /\s/g)).to.eql([]);
  });

  it('should split the string with default pattern for null and undefined', function() {
    expect(v.words('gravity_can_cross_dimensions', null)).to.eql(['gravity', 'can', 'cross', 'dimensions']);
    expect(v.words('gravity_can_cross_dimensions', undefined)).to.eql(['gravity', 'can', 'cross', 'dimensions']);
  });
  
});