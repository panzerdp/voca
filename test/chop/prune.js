import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('prune', function() {

  it('should prune a string', function() {
    expect(v.prune('Once upon a time there lived in a certain village a little country girl', 7)).to.be.equal('Once...');
    expect(v.prune('I\'ll go this way and go you that', 19, ' (read more)')).to.be.equal('I\'ll go (read more)');
    expect(v.prune('Little Red Riding Hood', 6, '...')).to.be.equal('...');
    expect(v.prune('Little Red Riding Hood', 9, '...')).to.be.equal('Little...');
    expect(v.prune('Little Red Riding Hood', 11, '...')).to.be.equal('Little...');
    expect(v.prune('Little Red Riding Hood', 20, '...')).to.be.equal('Little Red Riding...');
    expect(v.prune('Little Red Riding Hood', 22, '...')).to.be.equal('Little Red Riding Hood');
    expect(v.prune('Little Red Riding Hood', 1, '...')).to.be.equal('...');
    expect(v.prune('Little Red Riding Hood', 5, '...')).to.be.equal('...');
    expect(v.prune('Little Red Riding Hood', 0, '(more)')).to.be.equal('(more)');
    expect(v.prune(PRINTABLE_ASCII, PRINTABLE_ASCII.length)).to.be.equal(PRINTABLE_ASCII);
    expect(v.prune(PRINTABLE_ASCII, 0)).to.be.equal('...');
  });

  it('should prune a string with extra ASCII characters', function() {
    expect(v.prune('Привет, как дела', 10, '...')).to.be.equal('Привет...');
    expect(v.prune('La variété la plus fréquente est la blanche', 12, '..')).to.be.equal('La variété..');
  });

  it('should not prune a string if length parameter is greater or equal than string length', function() {
    expect(v.prune('Once upon', 20)).to.be.equal('Once upon');
    expect(v.prune('Once', 4, ' (read more)')).to.be.equal('Once');
    expect(v.prune('', 0, '....')).to.be.equal('');
  });

  it('should prune a string representation of an object', function() {
    expect(v.prune(['Welcome'], 4)).to.be.equal('...');
    expect(v.prune({
      toString: function() {
        return 'Have a nice day';
      }
    }, 6, '..')).to.be.equal('Have..');
  });

  it('should return an empty string for null or undefined', function() {
    expect(v.prune()).to.be.equal('');
    expect(v.prune(undefined)).to.be.equal('');
    expect(v.prune(null)).to.be.equal('');
  });

});