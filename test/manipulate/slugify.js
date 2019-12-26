import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('slugify', function() {
  it('should slugify the string', function() {
    expect(v.slugify('bird')).toBe('bird');
    expect(v.slugify('BIRD')).toBe('bird');
    expect(v.slugify('BirdFlight')).toBe('bird-flight');
    expect(v.slugify('bird flight')).toBe('bird-flight');
    expect(v.slugify('San Diego Zoo Safari Park')).toBe('san-diego-zoo-safari-park');
    expect(v.slugify('-BIRD-FLIGHT-')).toBe('bird-flight');
    expect(v.slugify('__BIRD___FLIGHT___')).toBe('bird-flight');
    expect(v.slugify('Restless flycatcher')).toBe('restless-flycatcher');
    expect(v.slugify('XMLHttpRequest')).toBe('xml-http-request');
    expect(v.slugify('weight of up to 12 kg')).toBe('weight-of-up-to-12-kg');
    expect(v.slugify('/home/dmitri/projects/voca')).toBe('home-dmitri-projects-voca');
    expect(v.slugify(PRINTABLE_ASCII)).toBe('0123456789-abcdefghijklmnopqrstuvwxyz-abcdefghijklmnopqrstuvwxyz');
    expect(v.slugify('****')).toBe('');
    expect(v.slugify('****')).toBe('');
    expect(v.slugify('-----')).toBe('');
    expect(v.slugify('     ')).toBe('');
    expect(v.slugify('\n\n\n\n   ***\t\t')).toBe('');
    expect(v.slugify('')).toBe('');
  });

  it('should slugify the string of a non-latin string', function() {
    expect(v.slugify('zborul păsării')).toBe('zborul-pasarii');
    expect(v.slugify('fuerza de sustentación')).toBe('fuerza-de-sustentacion');
    expect(v.slugify('skrzydło ptaka składa się')).toBe('skrzydlo-ptaka-sklada-sie');
    expect(v.slugify('Україна розташована в південно-східній частині Європи')).toBe(
      'ukrayina-roztashovana-v-pivdenno-shidnij-chastini-yevropi'
    );
    expect(v.slugify('man\u0303ana')).toBe('manana');
    expect(v.slugify('foo\u0303\u035C\u035D\u035E bar')).toBe('foo-bar');
  });

  it('should not modify numbers', function() {
    expect(v.slugify(0)).toBe('0');
    expect(v.slugify(1200)).toBe('1200');
    expect(v.slugify('8965')).toBe('8965');
  });

  it('should slugify the string representation of an object', function() {
    expect(v.slugify(['bird flight'])).toBe('bird-flight');
    expect(
      v.slugify({
        toString: function() {
          return 'bird flight';
        },
      })
    ).toBe('bird-flight');
  });

  it('should return empty string for null or undefined', function() {
    expect(v.slugify()).toBe('');
    expect(v.slugify(undefined)).toBe('');
    expect(v.slugify(null)).toBe('');
  });
});
