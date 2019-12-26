import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('camelCase', function() {
  it('should return the camel case of a string', function() {
    expect(v.camelCase('bird')).toBe('bird');
    expect(v.camelCase('BIRD')).toBe('bird');
    expect(v.camelCase('BirdFlight')).toBe('birdFlight');
    expect(v.camelCase('bird flight')).toBe('birdFlight');
    expect(v.camelCase('San Diego Zoo Safari Park')).toBe(
      'sanDiegoZooSafariPark'
    );
    expect(v.camelCase('-BIRD-FLIGHT-')).toBe('birdFlight');
    expect(v.camelCase('__BIRD___FLIGHT___')).toBe('birdFlight');
    expect(v.camelCase('Restless flycatcher')).toBe(
      'restlessFlycatcher'
    );
    expect(v.camelCase('XMLHttpRequest')).toBe('xmlHttpRequest');
    expect(v.camelCase('weight of up to 12 kg')).toBe(
      'weightOfUpTo12Kg'
    );
    expect(v.camelCase('/home/dmitri/projects/voca')).toBe(
      'homeDmitriProjectsVoca'
    );
    expect(v.camelCase(PRINTABLE_ASCII)).toBe(
      '0123456789AbcdefghijklmnopqrstuvwxyzAbcdefghijklmnopqrstuvwxyz'
    );
    expect(v.camelCase('****')).toBe('');
    expect(v.camelCase('****')).toBe('');
    expect(v.camelCase('-----')).toBe('');
    expect(v.camelCase('     ')).toBe('');
    expect(v.camelCase('\n\n\n\n   ***\t\t')).toBe('');
    expect(v.camelCase('')).toBe('');
  });

  it('should return the camel case of a non-latin string', function() {
    expect(v.camelCase('zborul păsării')).toBe('zborulPăsării');
    expect(v.camelCase('полет птицы')).toBe('полетПтицы');
    expect(v.camelCase('fuerza de sustentación')).toBe(
      'fuerzaDeSustentación'
    );
    expect(v.camelCase('skrzydło ptaka składa się')).toBe(
      'skrzydłoPtakaSkładaSię'
    );
  });

  it('should not modify numbers', function() {
    expect(v.camelCase(0)).toBe('0');
    expect(v.camelCase(1200)).toBe('1200');
    expect(v.camelCase('8965')).toBe('8965');
  });

  it('should return the camel case of a string representation of an object', function() {
    expect(v.camelCase(['bird flight'])).toBe('birdFlight');
    expect(
      v.camelCase({
        toString: function() {
          return 'bird flight';
        }
      })
    ).toBe('birdFlight');
  });

  it('should return empty string for null or undefined', function() {
    expect(v.camelCase()).toBe('');
    expect(v.camelCase(undefined)).toBe('');
    expect(v.camelCase(null)).toBe('');
  });
});
