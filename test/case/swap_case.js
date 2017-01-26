import { expect } from 'chai';
import v from '../voca';

describe('swapCase', function() {

  it('should return the swapped case of a string', function() {
    expect(v.swapCase('hello world')).to.be.equal('HELLO WORLD');
    expect(v.swapCase('Hello world')).to.be.equal('hELLO WORLD');
    expect(v.swapCase('hello World')).to.be.equal('HELLO wORLD');
    expect(v.swapCase('Hello World')).to.be.equal('hELLO wORLD');
    expect(v.swapCase('HELLO WORLD')).to.be.equal('hello world');
    expect(v.swapCase('bird')).to.be.equal('BIRD');
    expect(v.swapCase('BIRD')).to.be.equal('bird');
    expect(v.swapCase('bird-flight')).to.be.equal('BIRD-FLIGHT');
    expect(v.swapCase('bird flight')).to.be.equal('BIRD FLIGHT');
    expect(v.swapCase('san diego zoo safari park')).to.be.equal('SAN DIEGO ZOO SAFARI PARK');
    expect(v.swapCase('Who wants to try next?')).to.be.equal('wHO WANTS TO TRY NEXT?');
    expect(v.swapCase('WHO WANTS TO TRY NEXT?')).to.be.equal('who wants to try next?');
    expect(v.swapCase('-BIRD-FLIGHT-')).to.be.equal('-bird-flight-');
    expect(v.swapCase('__BIRD___FLIGHT___')).to.be.equal('__bird___flight___');
    expect(v.swapCase('Restless flycatcher')).to.be.equal('rESTLESS FLYCATCHER');
    expect(v.swapCase('XMLHttpRequest')).to.be.equal('xmlhTTPrEQUEST');
    expect(v.swapCase('weight of up to 12 kg')).to.be.equal('WEIGHT OF UP TO 12 KG');
    expect(v.swapCase('/home/dmitri/projects/voca')).to.be.equal('/HOME/DMITRI/PROJECTS/VOCA');
    expect(v.swapCase('****')).to.be.equal('****');
    expect(v.swapCase('-----')).to.be.equal('-----');
    expect(v.swapCase('     ')).to.be.equal('     ');
    expect(v.swapCase('\n\n\n\n   ***\t\t')).to.be.equal('\n\n\n\n   ***\t\t');
    expect(v.swapCase('')).to.be.equal('');
  });

  it('should return the swapped case of a non-latin string', function() {
    expect(v.swapCase('zborul păsării')).to.be.equal('ZBORUL PĂSĂRII');
    expect(v.swapCase('полет птицы')).to.be.equal('ПОЛЕТ ПТИЦЫ');
    expect(v.swapCase('fuerza de sustentación')).to.be.equal('FUERZA DE SUSTENTACIÓN');
    expect(v.swapCase('Skrzydło Ptaka Składa Się')).to.be.equal('sKRZYDŁO pTAKA sKŁADA sIĘ');
  });

  it('should not modify numbers', function() {
    expect(v.swapCase(0)).to.be.equal('0');
    expect(v.swapCase(1200)).to.be.equal('1200');
    expect(v.swapCase('8965')).to.be.equal('8965');
  });

  it('should return the swapped case of a string representation of an object', function() {
    expect(v.swapCase(['bird flight'])).to.be.equal('BIRD FLIGHT');
    expect(v.swapCase({
      toString: function() {
        return 'bird flight';
      }
    })).to.be.equal('BIRD FLIGHT');
  });

  it('should return empty string for null or undefined', function() {
    expect(v.swapCase()).to.be.equal('');
    expect(v.swapCase(undefined)).to.be.equal('');
    expect(v.swapCase(null)).to.be.equal('');
  });

});