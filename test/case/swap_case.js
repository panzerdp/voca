
import v from '../voca';

describe('swapCase', function() {

  it('should return the swapped case of a string', function() {
    expect(v.swapCase('hello world')).toBe('HELLO WORLD');
    expect(v.swapCase('Hello world')).toBe('hELLO WORLD');
    expect(v.swapCase('hello World')).toBe('HELLO wORLD');
    expect(v.swapCase('Hello World')).toBe('hELLO wORLD');
    expect(v.swapCase('HELLO WORLD')).toBe('hello world');
    expect(v.swapCase('bird')).toBe('BIRD');
    expect(v.swapCase('BIRD')).toBe('bird');
    expect(v.swapCase('bird-flight')).toBe('BIRD-FLIGHT');
    expect(v.swapCase('bird flight')).toBe('BIRD FLIGHT');
    expect(v.swapCase('san diego zoo safari park')).toBe('SAN DIEGO ZOO SAFARI PARK');
    expect(v.swapCase('Who wants to try next?')).toBe('wHO WANTS TO TRY NEXT?');
    expect(v.swapCase('WHO WANTS TO TRY NEXT?')).toBe('who wants to try next?');
    expect(v.swapCase('-BIRD-FLIGHT-')).toBe('-bird-flight-');
    expect(v.swapCase('__BIRD___FLIGHT___')).toBe('__bird___flight___');
    expect(v.swapCase('Restless flycatcher')).toBe('rESTLESS FLYCATCHER');
    expect(v.swapCase('XMLHttpRequest')).toBe('xmlhTTPrEQUEST');
    expect(v.swapCase('weight of up to 12 kg')).toBe('WEIGHT OF UP TO 12 KG');
    expect(v.swapCase('/home/dmitri/projects/voca')).toBe('/HOME/DMITRI/PROJECTS/VOCA');
    expect(v.swapCase('****')).toBe('****');
    expect(v.swapCase('-----')).toBe('-----');
    expect(v.swapCase('     ')).toBe('     ');
    expect(v.swapCase('\n\n\n\n   ***\t\t')).toBe('\n\n\n\n   ***\t\t');
    expect(v.swapCase('')).toBe('');
  });

  it('should return the swapped case of a non-latin string', function() {
    expect(v.swapCase('zborul păsării')).toBe('ZBORUL PĂSĂRII');
    expect(v.swapCase('полет птицы')).toBe('ПОЛЕТ ПТИЦЫ');
    expect(v.swapCase('fuerza de sustentación')).toBe('FUERZA DE SUSTENTACIÓN');
    expect(v.swapCase('Skrzydło Ptaka Składa Się')).toBe('sKRZYDŁO pTAKA sKŁADA sIĘ');
  });

  it('should not modify numbers', function() {
    expect(v.swapCase(0)).toBe('0');
    expect(v.swapCase(1200)).toBe('1200');
    expect(v.swapCase('8965')).toBe('8965');
  });

  it('should return the swapped case of a string representation of an object', function() {
    expect(v.swapCase(['bird flight'])).toBe('BIRD FLIGHT');
    expect(v.swapCase({
      toString: function() {
        return 'bird flight';
      }
    })).toBe('BIRD FLIGHT');
  });

  it('should return empty string for null or undefined', function() {
    expect(v.swapCase()).toBe('');
    expect(v.swapCase(undefined)).toBe('');
    expect(v.swapCase(null)).toBe('');
  });

});