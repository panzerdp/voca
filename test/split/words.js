import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('words', function() {
  it('should split the string into words', function() {
    expect(v.words('123')).toEqual(['123']);
    expect(v.words('15+20=35')).toEqual(['15', '20', '35']);
    expect(v.words('hello')).toEqual(['hello']);
    expect(v.words('  hello   ')).toEqual(['hello']);
    expect(v.words('hello world')).toEqual(['hello', 'world']);
    expect(v.words('12+14-18*400')).toEqual(['12', '14', '18', '400']);
    expect(v.words('gravity can cross dimensions')).toEqual(['gravity', 'can', 'cross', 'dimensions']);
    expect(v.words('-gravity-can-cross-dimensions-')).toEqual(['gravity', 'can', 'cross', 'dimensions']);
    expect(v.words('gravity_can_cross_dimensions')).toEqual(['gravity', 'can', 'cross', 'dimensions']);
    expect(v.words('*gravity***can****cross&&dimensions++')).toEqual(['gravity', 'can', 'cross', 'dimensions']);
    expect(v.words('GravityCanCrossDimensions')).toEqual(['Gravity', 'Can', 'Cross', 'Dimensions']);
    expect(v.words('GRAVITYCan')).toEqual(['GRAVITY', 'Can']);
    expect(v.words('GravityCan')).toEqual(['Gravity', 'Can']);
    expect(v.words('GravityCANAttract')).toEqual(['Gravity', 'CAN', 'Attract']);
    expect(v.words('gravityCan')).toEqual(['gravity', 'Can']);
    expect(v.words('Gravity-Can11Cross **Dimensions1Foo')).toEqual([
      'Gravity',
      'Can',
      '11',
      'Cross',
      'Dimensions',
      '1',
      'Foo',
    ]);
    expect(v.words('Cooper... Cooper... Come in, Cooper.')).toEqual(['Cooper', 'Cooper', 'Come', 'in', 'Cooper']);
    expect(v.words("Newton's third law")).toEqual(['Newton', 's', 'third', 'law']);
    expect(v.words("Newton's thIrd lAw")).toEqual(['Newton', 's', 'th', 'Ird', 'l', 'Aw']);
    expect(v.words(PRINTABLE_ASCII)).toEqual([
      '0123456789',
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      'abcdefghijklmnopqrstuvwxyz',
    ]);
    expect(v.words('')).toEqual([]);
    expect(v.words()).toEqual([]);
    expect(v.words(' ')).toEqual([]);
    expect(v.words('     ')).toEqual([]);
    expect(v.words('\n')).toEqual([]);
    expect(v.words('***')).toEqual([]);
    expect(v.words('***---')).toEqual([]);
    expect(v.words('***---')).toEqual([]);
    expect(v.words('man\u0303ana')).toEqual(['man\u0303ana']);
    expect(v.words('maN\u0303ana')).toEqual(['ma', 'N\u0303ana']);
    expect(v.words('foo\u0303\u035C\u035D\u035E bar')).toEqual(['foo\u0303\u035C\u035D\u035E', 'bar']);
    expect(v.words('fo-O-O\u0303\u035C\u035D\u035E-bar')).toEqual(['fo', 'O', 'O\u0303\u035C\u035D\u035E', 'bar']);
  });

  it('should split the string with diacritics into words', function() {
    expect(v.words('clasificación biológica.')).toEqual(['clasificación', 'biológica']);
    expect(v.words('BunăZiua')).toEqual(['Bună', 'Ziua']);
    expect(v.words('Bună1ZiUa!')).toEqual(['Bună', '1', 'Zi', 'Ua']);
    expect(
      v.words('Język /polski wywodzi się z` języka` praindoeuropejskiego za**pośrednictwem+języka-prasłowiańskiego.')
    ).toEqual([
      'Język',
      'polski',
      'wywodzi',
      'się',
      'z',
      'języka',
      'praindoeuropejskiego',
      'za',
      'pośrednictwem',
      'języka',
      'prasłowiańskiego',
    ]);
    expect(v.words('Гравитация притягивает все')).toEqual(['Гравитация', 'притягивает', 'все']);
    expect(v.words('Гравитация-Притягивает-ВСЕ!!')).toEqual(['Гравитация', 'Притягивает', 'ВСЕ']);
    expect(v.words('Στις--αρχές** (του) 21ου, αιώνα!')).toEqual(['Στις', 'αρχές', 'του', '21', 'ου', 'αιώνα']);
  });

  it('should split the string representation of an object', function() {
    expect(v.words(['GravityCanCrossDimensions'])).toEqual(['Gravity', 'Can', 'Cross', 'Dimensions']);
    expect(
      v.words({
        toString: function() {
          return 'Gr4v1ty';
        },
      })
    ).toEqual(['Gr', '4', 'v', '1', 'ty']);
  });

  it('should split the string into words using a pattern', function() {
    expect(v.words('1234567890', /\d/g)).toEqual(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']);
    expect(v.words('gravity', /\w{1,2}/g)).toEqual(['gr', 'av', 'it', 'y']);
    expect(v.words('gravity can cross dimensions', '\\w+(?=\\s?)', 'g')).toEqual([
      'gravity',
      'can',
      'cross',
      'dimensions',
    ]);
    expect(v.words('1234567890', /\s/g)).toEqual([]);
  });

  it('should split the string with default pattern for null and undefined', function() {
    expect(v.words('gravity_can_cross_dimensions', null)).toEqual(['gravity', 'can', 'cross', 'dimensions']);
    expect(v.words('gravity_can_cross_dimensions', undefined)).toEqual(['gravity', 'can', 'cross', 'dimensions']);
  });
});
