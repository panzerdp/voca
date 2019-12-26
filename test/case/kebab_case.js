import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('kebabCase', function() {
  it('should return the kebab case of a string', function() {
    expect(v.kebabCase('bird')).toBe('bird');
    expect(v.kebabCase('BIRD')).toBe('bird');
    expect(v.kebabCase('BirdFlight')).toBe('bird-flight');
    expect(v.kebabCase('bird flight')).toBe('bird-flight');
    expect(v.kebabCase('San Diego Zoo Safari Park')).toBe('san-diego-zoo-safari-park');
    expect(v.kebabCase('-BIRD-FLIGHT-')).toBe('bird-flight');
    expect(v.kebabCase('__BIRD___FLIGHT___')).toBe('bird-flight');
    expect(v.kebabCase('Restless flycatcher')).toBe('restless-flycatcher');
    expect(v.kebabCase('XMLHttpRequest')).toBe('xml-http-request');
    expect(v.kebabCase('weight of up to 12 kg')).toBe('weight-of-up-to-12-kg');
    expect(v.kebabCase('/home/dmitri/projects/voca')).toBe('home-dmitri-projects-voca');
    expect(v.kebabCase(PRINTABLE_ASCII)).toBe('0123456789-abcdefghijklmnopqrstuvwxyz-abcdefghijklmnopqrstuvwxyz');
    expect(v.kebabCase('****')).toBe('');
    expect(v.kebabCase('****')).toBe('');
    expect(v.kebabCase('-----')).toBe('');
    expect(v.kebabCase('     ')).toBe('');
    expect(v.kebabCase('\n\n\n\n   ***\t\t')).toBe('');
    expect(v.kebabCase('')).toBe('');
  });

  it('should return the kebab case of a non-latin string', function() {
    expect(v.kebabCase('zborul păsării')).toBe('zborul-păsării');
    expect(v.kebabCase('полет птицы')).toBe('полет-птицы');
    expect(v.kebabCase('fuerza de sustentación')).toBe('fuerza-de-sustentación');
    expect(v.kebabCase('skrzydło ptaka składa się')).toBe('skrzydło-ptaka-składa-się');
  });

  it('should not modify numbers', function() {
    expect(v.kebabCase(0)).toBe('0');
    expect(v.kebabCase(1200)).toBe('1200');
    expect(v.kebabCase('8965')).toBe('8965');
  });

  it('should return the kebab case of a string representation of an object', function() {
    expect(v.kebabCase(['bird flight'])).toBe('bird-flight');
    expect(
      v.kebabCase({
        toString: function() {
          return 'bird flight';
        },
      })
    ).toBe('bird-flight');
  });

  it('should return empty string for null or undefined', function() {
    expect(v.kebabCase()).toBe('');
    expect(v.kebabCase(undefined)).toBe('');
    expect(v.kebabCase(null)).toBe('');
  });
});
