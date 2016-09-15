import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('replaceAll', function() {

  it('should return the replace result with a string pattern', function() {
    expect(v.replaceAll('duck', 'duck', 'swan')).to.be.equal('swan');
    expect(v.replaceAll('duck duck', 'duck', 'swan')).to.be.equal('swan swan');
    expect(v.replaceAll('duck', 'duck', '')).to.be.equal('');
    expect(v.replaceAll('dduucckk', 'd', 'dd')).to.be.equal('dddduucckk');
    expect(v.replaceAll('duck', 'd', '')).to.be.equal('uck');
    expect(v.replaceAll('duck duck duc', 'duck', function() {
      return 'swan';
    })).to.be.equal('swan swan duc');
    expect(v.replaceAll('duck', 'u', function() {
      return 'a';
    })).to.be.equal('dack');
    expect(v.replaceAll('[a-b] [a-c][a-b]', '[a-b]', '[ab]')).to.be.equal('[ab] [a-c][ab]');
    expect(v.replaceAll('*.*.', '*.', '*')).to.be.equal('**');
    expect(v.replaceAll('\u0061 \u0061 b \u0061', '\u0061', '\u0062')).to.be.equal('b b b b');
    expect(v.replaceAll('', '', '')).to.be.equal('');
    expect(v.replaceAll('duck', '', '')).to.be.equal('duck');
    expect(v.replaceAll(PRINTABLE_ASCII, PRINTABLE_ASCII, PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII);
    expect(v.replaceAll(PRINTABLE_ASCII, PRINTABLE_ASCII, 'duck')).to.be.equal('duck');
  });

  it('should return the replace result with a RegExp pattern', function() {
    expect(v.replaceAll('duck duck', /duck/, 'swan')).to.be.equal('swan swan');
    expect(v.replaceAll('duck DUCK', /duck/, 'swan')).to.be.equal('swan DUCK');
    expect(v.replaceAll('duck DUCK', /DUCK/i, 'swan')).to.be.equal('swan swan');
    expect(v.replaceAll('duck', /duck/, '')).to.be.equal('');
    expect(v.replaceAll('duck', /d/, '')).to.be.equal('uck');
    expect(v.replaceAll('duck duck', /u/, function() {
      return 'a';
    })).to.be.equal('dack dack');
    expect(v.replaceAll('hello world', /(hello)\s(world)/, function(match, hello, world) {
      return world + ', ' + hello;
    })).to.be.equal('world, hello');
  });

  it('should return the replace result from a string representation of an object', function() {
    expect(v.replaceAll(['duck'], 'duck', 'swan')).to.be.equal('swan');
    expect(v.replaceAll({
      toString: function() {
        return 'mandarin duck';
      }
    }, /mandarin\s/, '')).to.be.equal('duck');
  });

  it('should return the replace result from a number', function() {
    expect(v.replaceAll(1500, '0', '1')).to.be.equal('1511');
    expect(v.replaceAll(6475, /\d/g, '*')).to.be.equal('****');
    expect(v.replaceAll(6475, /\d/, '*')).to.be.equal('****');
  });

  it('should return the original string on failed match', function() {
    expect(v.replaceAll('duck', 'dack', 'swan')).to.be.equal('duck');
    expect(v.replaceAll('duck', /dack/, '')).to.be.equal('duck');
  });

  it('should return the an empty string for an undefined or null', function() {
    expect(v.replaceAll(undefined, /./, '1')).to.be.equal('');
    expect(v.replaceAll(null, /./, '1')).to.be.equal('');
  });

});