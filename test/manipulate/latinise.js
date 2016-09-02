import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('latinise', function() {

  it('should latinise a string', function() {
    expect(v.latinise('')).to.be.equal('');
    expect(v.latinise('moldova')).to.be.equal('moldova');
    expect(v.latinise('cafe\u0301')).to.be.equal('cafe');
    expect(v.latinise('ma\xF1ana')).to.be.equal('manana');
    expect(v.latinise('man\u0303ana')).to.be.equal('manana');
    expect(v.latinise('foo\u0303\u035C\u035D\u035Ebar')).to.be.equal('foobar');
    expect(v.latinise('cafe\u0301')).to.be.equal('cafe');
    expect(v.latinise('colecção cópias críticos é tão')).to.be.equal('coleccao copias criticos e tao');
    expect(v.latinise('književnošću čuvanje')).to.be.equal('knjizevnoscu cuvanje');
    expect(v.latinise('anglikonų šiurkščios užrašinėti')).to.be.equal('anglikonu siurkscios uzrasineti');
    expect(v.latinise('Schuß für Pfarrerstöchter')).to.be.equal('Schus fur Pfarrerstochter');
    expect(v.latinise('publicó éxito nació María')).to.be.equal('publico exito nacio Maria');
    expect(v.latinise('Charlotte Brontë')).to.be.equal('Charlotte Bronte');
    expect(v.latinise('vecākā no māsām Brontē')).to.be.equal('vecaka no masam Bronte');
    expect(v.latinise('Şarlotta Brontenin özü')).to.be.equal('Sarlotta Brontenin ozu');
    expect(v.latinise('Wkrótce po ślubie pisarka zaszła w ciążę')).to.be.equal('Wkrotce po slubie pisarka zaszla w ciaze');
    expect(v.latinise("Dès l'enfance, Charlotte, comme Emily et probablement plus fortement Branwell, est influencée par certaines sources d'inspiration"))
      .to.be.equal("Des l'enfance, Charlotte, comme Emily et probablement plus fortement Branwell, est influencee par certaines sources d'inspiration");
    expect(v.latinise('Există peste 13.800 de localități în România'))
      .to.be.equal('Exista peste 13.800 de localitati in Romania');
    expect(v.latinise('août décembre')).to.be.equal('aout decembre');
    expect(v.latinise('Україна розташована в південно-східній частині Європи'))
      .to.be.equal('Ukrayina roztashovana v pivdenno-shidnij chastini Yevropi');
    expect(v.latinise('\t\n')).to.be.equal('\t\n');
    expect(v.latinise('\u2047')).to.be.equal('\u2047');
    expect(v.latinise(PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII);
  });

  it('should latinise a string representation of an object', function() {
    expect(v.latinise(['María'])).to.be.equal('Maria');
    expect(v.latinise({
      toString: function() {
        return 'sacó';
      }
    })).to.be.equal('saco');
  });

  it('should not modify numbers', function() {
    expect(v.latinise(100)).to.be.equal('100');
    expect(v.latinise(812)).to.be.equal('812');
  });

  it('should return an empty string for null or undefined', function() {
    expect(v.latinise()).to.be.equal('');
    expect(v.latinise(undefined)).to.be.equal('');
    expect(v.latinise(null)).to.be.equal('');
  });

});