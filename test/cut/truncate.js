import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('truncate', function() {

  it('should truncate a string', function() {
    expect(v.truncate('Once upon a time there lived in a certain village a little country girl', 4)).to.be.equal('O...');
    expect(v.truncate('I\'ll go this way and go you that', 19, ' (read more)')).to.be.equal('I\'ll go (read more)');
    expect(v.truncate('Little Red Riding Hood', 9, '...')).to.be.equal('Little...');
    expect(v.truncate('Little Red Riding Hood', 0, '(more)')).to.be.equal('(more)');
    expect(v.truncate('Little Red Riding Hood', 1, '(more)')).to.be.equal('(more)');
    expect(v.truncate('Little Red Riding Hood', 2, '(more)')).to.be.equal('(more)');
    expect(v.truncate('Little Red Riding Hood', 3, '(more)')).to.be.equal('(more)');
    expect(v.truncate('Little Red Riding Hood', 6, '(more)')).to.be.equal('(more)');
    expect(v.truncate('Little Red Riding Hood', 7, '(more)')).to.be.equal('L(more)');
    expect(v.truncate('Little Red Riding Hood', 7, '')).to.be.equal('Little ');
    expect(v.truncate('Little Red Riding Hood', 0, '')).to.be.equal('');
    expect(v.truncate(PRINTABLE_ASCII, PRINTABLE_ASCII.length)).to.be.equal(PRINTABLE_ASCII);
    expect(v.truncate(PRINTABLE_ASCII, 0)).to.be.equal('...');
  });

  it('should not truncate a string if length parameter is greater or equal than string length', function() {
    expect(v.truncate('Once upon', 20)).to.be.equal('Once upon');
    expect(v.truncate('Once', 4, ' (read more)')).to.be.equal('Once');
    expect(v.truncate('', 0, '....')).to.be.equal('');
  });

  it('should truncate a string representation of an object', function() {
    expect(v.truncate(['Welcome'], 6)).to.be.equal('Wel...');
    expect(v.truncate({
      toString: function() {
        return 'Have a nice day';
      }
    }, 4, '..')).to.be.equal('Ha..');
  });

  it('should return an empty string for null or undefined', function() {
    expect(v.truncate()).to.be.equal('');
    expect(v.truncate(undefined)).to.be.equal('');
    expect(v.truncate(null)).to.be.equal('');
  });

});