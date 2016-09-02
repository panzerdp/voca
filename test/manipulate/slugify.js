import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('slugify', function() {

  it('should slugify the string', function() {
    expect(v.slugify('bird')).to.be.equal('bird');
    expect(v.slugify('BIRD')).to.be.equal('bird');
    expect(v.slugify('BirdFlight')).to.be.equal('bird-flight');
    expect(v.slugify('bird flight')).to.be.equal('bird-flight');
    expect(v.slugify('San Diego Zoo Safari Park')).to.be.equal('san-diego-zoo-safari-park');
    expect(v.slugify('-BIRD-FLIGHT-')).to.be.equal('bird-flight');
    expect(v.slugify('__BIRD___FLIGHT___')).to.be.equal('bird-flight');
    expect(v.slugify('Restless flycatcher')).to.be.equal('restless-flycatcher');
    expect(v.slugify('XMLHttpRequest')).to.be.equal('xml-http-request');
    expect(v.slugify('weight of up to 12 kg')).to.be.equal('weight-of-up-to-12-kg');
    expect(v.slugify('/home/dmitri/projects/voca')).to.be.equal('home-dmitri-projects-voca');
    expect(v.slugify(PRINTABLE_ASCII)).to.be.equal('0123456789-abcdefghijklmnopqrstuvwxyz-abcdefghijklmnopqrstuvwxyz');
    expect(v.slugify('****')).to.be.equal('');
    expect(v.slugify('****')).to.be.equal('');
    expect(v.slugify('-----')).to.be.equal('');
    expect(v.slugify('     ')).to.be.equal('');
    expect(v.slugify('\n\n\n\n   ***\t\t')).to.be.equal('');
    expect(v.slugify('')).to.be.equal('');
  });

  it('should slugify the string of a non-latin string', function() {
    expect(v.slugify('zborul păsării')).to.be.equal('zborul-pasarii');
    expect(v.slugify('fuerza de sustentación')).to.be.equal('fuerza-de-sustentacion');
    expect(v.slugify('skrzydło ptaka składa się')).to.be.equal('skrzydlo-ptaka-sklada-sie');
    expect(v.slugify('Україна розташована в південно-східній частині Європи'))
      .to.be.equal('ukrayina-roztashovana-v-pivdenno-shidnij-chastini-yevropi');
    expect(v.slugify('man\u0303ana')).to.be.equal('manana');
    expect(v.slugify('foo\u0303\u035C\u035D\u035E bar')).to.be.equal('foo-bar');
  });

  it('should not modify numbers', function() {
    expect(v.slugify(0)).to.be.equal('0');
    expect(v.slugify(1200)).to.be.equal('1200');
    expect(v.slugify('8965')).to.be.equal('8965');
  });

  it('should slugify the string representation of an object', function() {
    expect(v.slugify(['bird flight'])).to.be.equal('bird-flight');
    expect(v.slugify({
      toString: function() {
        return 'bird flight';
      }
    })).to.be.equal('bird-flight');
  });

  it('should return empty string for null or undefined', function() {
    expect(v.slugify()).to.be.equal('');
    expect(v.slugify(undefined)).to.be.equal('');
    expect(v.slugify(null)).to.be.equal('');
  });

});