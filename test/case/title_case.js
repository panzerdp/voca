import { expect } from 'chai';
import v from '../voca';

describe('titleCase', function() {

  it('should return the title case of a string', function() {
    expect(v.titleCase('hello world')).to.be.equal('Hello World');
    expect(v.titleCase('Hello world')).to.be.equal('Hello World');
    expect(v.titleCase('hello World')).to.be.equal('Hello World');
    expect(v.titleCase('Hello World')).to.be.equal('Hello World');
    expect(v.titleCase('HELLO WORLD')).to.be.equal('Hello World');
    expect(v.titleCase('bird')).to.be.equal('Bird');
    expect(v.titleCase('BIRD')).to.be.equal('Bird');
    expect(v.titleCase('bird-flight')).to.be.equal('Bird-Flight');
    expect(v.titleCase('bird flight')).to.be.equal('Bird Flight');
    expect(v.titleCase('san diego zoo safari park')).to.be.equal('San Diego Zoo Safari Park');
    expect(v.titleCase('Who wants to try next?')).to.be.equal('Who Wants To Try Next?');
    expect(v.titleCase('WHO WANTS TO TRY NEXT?')).to.be.equal('Who Wants To Try Next?');
    expect(v.titleCase('-BIRD-FLIGHT-')).to.be.equal('-Bird-Flight-');
    expect(v.titleCase('__BIRD___FLIGHT___')).to.be.equal('__Bird___Flight___');
    expect(v.titleCase('Restless flycatcher')).to.be.equal('Restless Flycatcher');
    expect(v.titleCase('XMLHttpRequest')).to.be.equal('XmlHttpRequest');
    expect(v.titleCase('weight of up to 12 kg')).to.be.equal('Weight Of Up To 12 Kg');
    expect(v.titleCase('/home/dmitri/projects/voca')).to.be.equal('/Home/Dmitri/Projects/Voca');
    expect(v.titleCase('****')).to.be.equal('****');
    expect(v.titleCase('-----')).to.be.equal('-----');
    expect(v.titleCase('     ')).to.be.equal('     ');
    expect(v.titleCase('\n\n\n\n   ***\t\t')).to.be.equal('\n\n\n\n   ***\t\t');
    expect(v.titleCase('')).to.be.equal('');
  });

  it('should return the title case of a non-latin string', function() {
    expect(v.titleCase('zborul păsării')).to.be.equal('Zborul Păsării');
    expect(v.titleCase('полет птицы')).to.be.equal('Полет Птицы');
    expect(v.titleCase('fuerza de sustentación')).to.be.equal('Fuerza De Sustentación');
    expect(v.titleCase('skrzydło ptaka składa się')).to.be.equal('Skrzydło Ptaka Składa Się');
  });

  it('should return the title case and not capitalize at specific characters', function() {
    expect(v.titleCase('jean-luc is good-looking', ['-'])).to.be.equal('Jean-luc Is Good-looking');
    expect(v.titleCase('Un·e déput·é·e', ['·'])).to.be.equal('Un·e Déput·é·e');
    expect(v.titleCase('Who*wants to-try*next?', ['-', '*'])).to.be.equal('Who*wants To-try*next?');
    expect(v.titleCase('WHO*WANTS*TO*TRY*NEXT?', ['*'])).to.be.equal('Who*wants*to*try*next?');
    expect(v.titleCase('Well, congratulations! You got yourself caught! Now what\'s the next step in your master plan?', ["'"]))
      .to.be.equal('Well, Congratulations! You Got Yourself Caught! Now What\'s The Next Step In Your Master Plan?');
  });

  it('should not modify numbers', function() {
    expect(v.titleCase(0)).to.be.equal('0');
    expect(v.titleCase(1200)).to.be.equal('1200');
    expect(v.titleCase('8965')).to.be.equal('8965');
  });

  it('should return the title case of a string representation of an object', function() {
    expect(v.titleCase(['bird flight'])).to.be.equal('Bird Flight');
    expect(v.titleCase({
      toString: function() {
        return 'bird flight';
      }
    })).to.be.equal('Bird Flight');
  });

  it('should return empty string for null or undefined', function() {
    expect(v.titleCase()).to.be.equal('');
    expect(v.titleCase(undefined)).to.be.equal('');
    expect(v.titleCase(null)).to.be.equal('');
  });

});