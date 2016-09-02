import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('kebabCase', function() {

  it('should return the kebab case of a string', function() {
    expect(v.kebabCase('bird')).to.be.equal('bird');
    expect(v.kebabCase('BIRD')).to.be.equal('bird');
    expect(v.kebabCase('BirdFlight')).to.be.equal('bird-flight');
    expect(v.kebabCase('bird flight')).to.be.equal('bird-flight');
    expect(v.kebabCase('San Diego Zoo Safari Park')).to.be.equal('san-diego-zoo-safari-park');
    expect(v.kebabCase('-BIRD-FLIGHT-')).to.be.equal('bird-flight');
    expect(v.kebabCase('__BIRD___FLIGHT___')).to.be.equal('bird-flight');
    expect(v.kebabCase('Restless flycatcher')).to.be.equal('restless-flycatcher');
    expect(v.kebabCase('XMLHttpRequest')).to.be.equal('xml-http-request');
    expect(v.kebabCase('weight of up to 12 kg')).to.be.equal('weight-of-up-to-12-kg');
    expect(v.kebabCase('/home/dmitri/projects/voca')).to.be.equal('home-dmitri-projects-voca');
    expect(v.kebabCase(PRINTABLE_ASCII)).to.be.equal('0123456789-abcdefghijklmnopqrstuvwxyz-abcdefghijklmnopqrstuvwxyz');
    expect(v.kebabCase('****')).to.be.equal('');
    expect(v.kebabCase('****')).to.be.equal('');
    expect(v.kebabCase('-----')).to.be.equal('');
    expect(v.kebabCase('     ')).to.be.equal('');
    expect(v.kebabCase('\n\n\n\n   ***\t\t')).to.be.equal('');
    expect(v.kebabCase('')).to.be.equal('');
  });

  it('should return the kebab case of a non-latin string', function() {
    expect(v.kebabCase('zborul păsării')).to.be.equal('zborul-păsării');
    expect(v.kebabCase('полет птицы')).to.be.equal('полет-птицы');
    expect(v.kebabCase('fuerza de sustentación')).to.be.equal('fuerza-de-sustentación');
    expect(v.kebabCase('skrzydło ptaka składa się')).to.be.equal('skrzydło-ptaka-składa-się');
  });

  it('should not modify numbers', function() {
    expect(v.kebabCase(0)).to.be.equal('0');
    expect(v.kebabCase(1200)).to.be.equal('1200');
    expect(v.kebabCase('8965')).to.be.equal('8965');
  });

  it('should return the kebab case of a string representation of an object', function() {
    expect(v.kebabCase(['bird flight'])).to.be.equal('bird-flight');
    expect(v.kebabCase({
      toString: function() {
        return 'bird flight';
      }
    })).to.be.equal('bird-flight');
  });

  it('should return empty string for null or undefined', function() {
    expect(v.kebabCase()).to.be.equal('');
    expect(v.kebabCase(undefined)).to.be.equal('');
    expect(v.kebabCase(null)).to.be.equal('');
  });

});