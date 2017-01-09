import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('snakeCase', function() {

  it('should return the snake case of a string', function() {
    expect(v.snakeCase('bird')).to.be.equal('bird');
    expect(v.snakeCase('BIRD')).to.be.equal('bird');
    expect(v.snakeCase('BirdFlight')).to.be.equal('bird_flight');
    expect(v.snakeCase('bird flight')).to.be.equal('bird_flight');
    expect(v.snakeCase('San Diego Zoo Safari Park')).to.be.equal('san_diego_zoo_safari_park');
    expect(v.snakeCase('-BIRD-FLIGHT-')).to.be.equal('bird_flight');
    expect(v.snakeCase('__BIRD___FLIGHT___')).to.be.equal('bird_flight');
    expect(v.snakeCase('Restless flycatcher')).to.be.equal('restless_flycatcher');
    expect(v.snakeCase('XMLHttpRequest')).to.be.equal('xml_http_request');
    expect(v.snakeCase('weight of up to 12 kg')).to.be.equal('weight_of_up_to_12_kg');
    expect(v.snakeCase('/home/dmitri/projects/voca')).to.be.equal('home_dmitri_projects_voca');
    expect(v.snakeCase(PRINTABLE_ASCII)).to.be.equal('0123456789_abcdefghijklmnopqrstuvwxyz_abcdefghijklmnopqrstuvwxyz');
    expect(v.snakeCase('****')).to.be.equal('');
    expect(v.snakeCase('-----')).to.be.equal('');
    expect(v.snakeCase('     ')).to.be.equal('');
    expect(v.snakeCase('\n\n\n\n   ***\t\t')).to.be.equal('');
    expect(v.snakeCase('')).to.be.equal('');
  });

  it('should return the snake case of a non-latin string', function() {
    expect(v.snakeCase('zborul păsării')).to.be.equal('zborul_păsării');
    expect(v.snakeCase('полет птицы')).to.be.equal('полет_птицы');
    expect(v.snakeCase('fuerza de sustentación')).to.be.equal('fuerza_de_sustentación');
    expect(v.snakeCase('skrzydło ptaka składa się')).to.be.equal('skrzydło_ptaka_składa_się');
  });

  it('should not modify numbers', function() {
    expect(v.snakeCase(0)).to.be.equal('0');
    expect(v.snakeCase(1200)).to.be.equal('1200');
    expect(v.snakeCase('8965')).to.be.equal('8965');
  });

  it('should return the snake case of a string representation of an object', function() {
    expect(v.snakeCase(['bird flight'])).to.be.equal('bird_flight');
    expect(v.snakeCase({
      toString: function() {
        return 'bird flight';
      }
    })).to.be.equal('bird_flight');
  });

  it('should return empty string for null or undefined', function() {
    expect(v.snakeCase()).to.be.equal('');
    expect(v.snakeCase(undefined)).to.be.equal('');
    expect(v.snakeCase(null)).to.be.equal('');
  });

});