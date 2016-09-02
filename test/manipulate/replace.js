import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('replace', function() {

  it('should return the replace result with a string pattern', function() {
    expect(v.replace('duck', 'duck', 'swan')).to.be.equal('swan');
    expect(v.replace('duck', 'duck', '')).to.be.equal('');
    expect(v.replace('duck', 'd', '')).to.be.equal('uck');
    expect(v.replace('duck', 'u', function() {
      return 'a';
    })).to.be.equal('dack');
    expect(v.replace('', '', '')).to.be.equal('');
    expect(v.replace(PRINTABLE_ASCII, PRINTABLE_ASCII, PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII);
    expect(v.replace(PRINTABLE_ASCII, PRINTABLE_ASCII, 'duck')).to.be.equal('duck');
  });

  it('should return the replace result with a RegExp pattern', function() {
    expect(v.replace('duck', /duck/, 'swan')).to.be.equal('swan');
    expect(v.replace('duck', /duck/, '')).to.be.equal('');
    expect(v.replace('duck', /d/, '')).to.be.equal('uck');
    expect(v.replace('duck', /u/, function() {
      return 'a';
    })).to.be.equal('dack');
    expect(v.replace('hello world', /(hello)\s(world)/, function(match, hello, world) {
      return world + ', ' + hello;
    })).to.be.equal('world, hello');
  });

  it('should return the replace result from a string representation of an object', function() {
    expect(v.replace(['duck'], 'duck', 'swan')).to.be.equal('swan');
    expect(v.replace({
      toString: function() {
        return 'mandarin duck';
      }
    }, /mandarin\s/, '')).to.be.equal('duck');
  });

  it('should return the replace result from a number', function() {
    expect(v.replace(1500, '0', '1')).to.be.equal('1510');
    expect(v.replace(6475, /\d/g, '*')).to.be.equal('****');
  });

  it('should return the an empty string for an undefined or null', function() {
    expect(v.replace(undefined, /./, '1')).to.be.equal('');
    expect(v.replace(null, /./, '1')).to.be.equal('');
  });

});