
import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('snakeCase', function() {

  it('should return the snake case of a string', function() {
    expect(v.snakeCase('bird')).toBe('bird');
    expect(v.snakeCase('BIRD')).toBe('bird');
    expect(v.snakeCase('BirdFlight')).toBe('bird_flight');
    expect(v.snakeCase('bird flight')).toBe('bird_flight');
    expect(v.snakeCase('San Diego Zoo Safari Park')).toBe('san_diego_zoo_safari_park');
    expect(v.snakeCase('-BIRD-FLIGHT-')).toBe('bird_flight');
    expect(v.snakeCase('__BIRD___FLIGHT___')).toBe('bird_flight');
    expect(v.snakeCase('Restless flycatcher')).toBe('restless_flycatcher');
    expect(v.snakeCase('XMLHttpRequest')).toBe('xml_http_request');
    expect(v.snakeCase('weight of up to 12 kg')).toBe('weight_of_up_to_12_kg');
    expect(v.snakeCase('/home/dmitri/projects/voca')).toBe('home_dmitri_projects_voca');
    expect(v.snakeCase(PRINTABLE_ASCII)).toBe('0123456789_abcdefghijklmnopqrstuvwxyz_abcdefghijklmnopqrstuvwxyz');
    expect(v.snakeCase('****')).toBe('');
    expect(v.snakeCase('-----')).toBe('');
    expect(v.snakeCase('     ')).toBe('');
    expect(v.snakeCase('\n\n\n\n   ***\t\t')).toBe('');
    expect(v.snakeCase('')).toBe('');
  });

  it('should return the snake case of a non-latin string', function() {
    expect(v.snakeCase('zborul păsării')).toBe('zborul_păsării');
    expect(v.snakeCase('полет птицы')).toBe('полет_птицы');
    expect(v.snakeCase('fuerza de sustentación')).toBe('fuerza_de_sustentación');
    expect(v.snakeCase('skrzydło ptaka składa się')).toBe('skrzydło_ptaka_składa_się');
  });

  it('should not modify numbers', function() {
    expect(v.snakeCase(0)).toBe('0');
    expect(v.snakeCase(1200)).toBe('1200');
    expect(v.snakeCase('8965')).toBe('8965');
  });

  it('should return the snake case of a string representation of an object', function() {
    expect(v.snakeCase(['bird flight'])).toBe('bird_flight');
    expect(v.snakeCase({
      toString: function() {
        return 'bird flight';
      }
    })).toBe('bird_flight');
  });

  it('should return empty string for null or undefined', function() {
    expect(v.snakeCase()).toBe('');
    expect(v.snakeCase(undefined)).toBe('');
    expect(v.snakeCase(null)).toBe('');
  });

});