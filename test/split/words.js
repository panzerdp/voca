import v from '../voca';
import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../utils/string/ascii';

describe('words', function() {

  it('should split the string into words', function() {
    expect(v.words('')).to.eql([]);
    expect(v.words(' ')).to.eql([]);
    expect(v.words('     ')).to.eql([]);
    expect(v.words('\n')).to.eql([]);
    expect(v.words('***')).to.eql([]);
    expect(v.words('***---')).to.eql([]);
    expect(v.words('***---')).to.eql([]);
    expect(v.words('123')).to.eql(['123']);
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
  });

  it('should split the string with diacritics and non-latin characters into words', function() {
    expect(v.words('Στις αρχές του 21ου αιώνα')).to.eql(['Στις', 'αρχές', 'του', '21', 'ου', 'αιώνα']);
    expect(v.words('Гравитация притягивает все')).to.eql(['Гравитация', 'притягивает', 'все']);
    expect(v.words('ГравитацияПритягиваетВСЕ')).to.eql(['Гравитация', 'Притягивает', 'ВСЕ']);
    expect(v.words('clasificación biológica.')).to.eql(['clasificación', 'biológica']);
  });

  it('should split the string representation of an object', function() {
    expect(v.words(['GravityCanCrossDimensions'])).to.eql(['Gravity', 'Can', 'Cross', 'Dimensions']);
    expect(v.words({
      toString: function() {
        return 'Gr4v1ty';
      }
    })).to.eql(['Gr', '4', 'v', '1', 'ty']);
  });
  
});