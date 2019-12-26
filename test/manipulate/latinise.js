import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('latinise', function() {
  it('should latinise a string', function() {
    expect(v.latinise('')).toBe('');
    expect(v.latinise('moldova')).toBe('moldova');
    expect(v.latinise('cafe\u0301')).toBe('cafe');
    expect(v.latinise('ma\xF1ana')).toBe('manana');
    expect(v.latinise('man\u0303ana')).toBe('manana');
    expect(v.latinise('foo\u0303\u035C\u035D\u035Ebar')).toBe('foobar');
    expect(v.latinise('cafe\u0301')).toBe('cafe');
    expect(v.latinise('colecção cópias críticos é tão')).toBe('coleccao copias criticos e tao');
    expect(v.latinise('književnošću čuvanje')).toBe('knjizevnoscu cuvanje');
    expect(v.latinise('anglikonų šiurkščios užrašinėti')).toBe('anglikonu siurkscios uzrasineti');
    expect(v.latinise('Schuß für Pfarrerstöchter')).toBe('Schus fur Pfarrerstochter');
    expect(v.latinise('publicó éxito nació María')).toBe('publico exito nacio Maria');
    expect(v.latinise('Charlotte Brontë')).toBe('Charlotte Bronte');
    expect(v.latinise('vecākā no māsām Brontē')).toBe('vecaka no masam Bronte');
    expect(v.latinise('Şarlotta Brontenin özü')).toBe('Sarlotta Brontenin ozu');
    expect(v.latinise('Wkrótce po ślubie pisarka zaszła w ciążę')).toBe('Wkrotce po slubie pisarka zaszla w ciaze');
    expect(
      v.latinise(
        "Dès l'enfance, Charlotte, comme Emily et probablement plus fortement Branwell, est influencée par certaines sources d'inspiration"
      )
    ).toBe(
      "Des l'enfance, Charlotte, comme Emily et probablement plus fortement Branwell, est influencee par certaines sources d'inspiration"
    );
    expect(v.latinise('Există peste 13.800 de localități în România')).toBe(
      'Exista peste 13.800 de localitati in Romania'
    );
    expect(v.latinise('août décembre')).toBe('aout decembre');
    expect(v.latinise('Україна розташована в південно-східній частині Європи')).toBe(
      'Ukrayina roztashovana v pivdenno-shidnij chastini Yevropi'
    );
    expect(v.latinise('\t\n')).toBe('\t\n');
    expect(v.latinise('\u2047')).toBe('\u2047');
    expect(v.latinise(PRINTABLE_ASCII)).toBe(PRINTABLE_ASCII);
  });

  it('should latinise a string representation of an object', function() {
    expect(v.latinise(['María'])).toBe('Maria');
    expect(
      v.latinise({
        toString: function() {
          return 'sacó';
        },
      })
    ).toBe('saco');
  });

  it('should not modify numbers', function() {
    expect(v.latinise(100)).toBe('100');
    expect(v.latinise(812)).toBe('812');
  });

  it('should return an empty string for null or undefined', function() {
    expect(v.latinise()).toBe('');
    expect(v.latinise(undefined)).toBe('');
    expect(v.latinise(null)).toBe('');
  });
});
