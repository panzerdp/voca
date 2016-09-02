import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('camelCase', function() {

  it('should return the camel case of a string', function() {
    expect(v.camelCase('bird')).to.be.equal('bird');
    expect(v.camelCase('BIRD')).to.be.equal('bird');
    expect(v.camelCase('BirdFlight')).to.be.equal('birdFlight');
    expect(v.camelCase('bird flight')).to.be.equal('birdFlight');
    expect(v.camelCase('San Diego Zoo Safari Park')).to.be.equal('sanDiegoZooSafariPark');
    expect(v.camelCase('-BIRD-FLIGHT-')).to.be.equal('birdFlight');
    expect(v.camelCase('__BIRD___FLIGHT___')).to.be.equal('birdFlight');
    expect(v.camelCase('Restless flycatcher')).to.be.equal('restlessFlycatcher');
    expect(v.camelCase('XMLHttpRequest')).to.be.equal('xmlHttpRequest');
    expect(v.camelCase('weight of up to 12 kg')).to.be.equal('weightOfUpTo12Kg');
    expect(v.camelCase('/home/dmitri/projects/voca')).to.be.equal('homeDmitriProjectsVoca');
    expect(v.camelCase(PRINTABLE_ASCII)).to.be.equal('0123456789AbcdefghijklmnopqrstuvwxyzAbcdefghijklmnopqrstuvwxyz');
    expect(v.camelCase('****')).to.be.equal('');
    expect(v.camelCase('****')).to.be.equal('');
    expect(v.camelCase('-----')).to.be.equal('');
    expect(v.camelCase('     ')).to.be.equal('');
    expect(v.camelCase('\n\n\n\n   ***\t\t')).to.be.equal('');
    expect(v.camelCase('')).to.be.equal('');
  });

  it('should return the camel case of a non-latin string', function() {
    expect(v.camelCase('zborul păsării')).to.be.equal('zborulPăsării');
    expect(v.camelCase('полет птицы')).to.be.equal('полетПтицы');
    expect(v.camelCase('fuerza de sustentación')).to.be.equal('fuerzaDeSustentación');
    expect(v.camelCase('skrzydło ptaka składa się')).to.be.equal('skrzydłoPtakaSkładaSię');
  });

  it('should not modify numbers', function() {
    expect(v.camelCase(0)).to.be.equal('0');
    expect(v.camelCase(1200)).to.be.equal('1200');
    expect(v.camelCase('8965')).to.be.equal('8965');
  });

  it('should return the camel case of a string representation of an object', function() {
    expect(v.camelCase(['bird flight'])).to.be.equal('birdFlight');
    expect(v.camelCase({
      toString: function() {
        return 'bird flight';
      }
    })).to.be.equal('birdFlight');
  });

  it('should return empty string for null or undefined', function() {
    expect(v.camelCase()).to.be.equal('');
    expect(v.camelCase(undefined)).to.be.equal('');
    expect(v.camelCase(null)).to.be.equal('');
  });

});