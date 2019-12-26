
import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('replace', function() {

  it('should return the replace result with a string pattern', function() {
    expect(v.replace('duck', 'duck', 'swan')).toBe('swan');
    expect(v.replace('duck', 'duck', '')).toBe('');
    expect(v.replace('duck', 'd', '')).toBe('uck');
    expect(v.replace('duck', 'u', function() {
      return 'a';
    })).toBe('dack');
    expect(v.replace('', '', '')).toBe('');
    expect(v.replace(PRINTABLE_ASCII, PRINTABLE_ASCII, PRINTABLE_ASCII)).toBe(PRINTABLE_ASCII);
    expect(v.replace(PRINTABLE_ASCII, PRINTABLE_ASCII, 'duck')).toBe('duck');
  });

  it('should return the replace result with a RegExp pattern', function() {
    expect(v.replace('duck', /duck/, 'swan')).toBe('swan');
    expect(v.replace('duck', /duck/, '')).toBe('');
    expect(v.replace('duck', /d/, '')).toBe('uck');
    expect(v.replace('duck', /u/, function() {
      return 'a';
    })).toBe('dack');
    expect(v.replace('hello world', /(hello)\s(world)/, function(match, hello, world) {
      return world + ', ' + hello;
    })).toBe('world, hello');
  });

  it('should return the replace result from a string representation of an object', function() {
    expect(v.replace(['duck'], 'duck', 'swan')).toBe('swan');
    expect(v.replace({
      toString: function() {
        return 'mandarin duck';
      }
    }, /mandarin\s/, '')).toBe('duck');
  });

  it('should return the replace result from a number', function() {
    expect(v.replace(1500, '0', '1')).toBe('1510');
    expect(v.replace(6475, /\d/g, '*')).toBe('****');
  });

  it('should return the an empty string for an undefined or null', function() {
    expect(v.replace(undefined, /./, '1')).toBe('');
    expect(v.replace(null, /./, '1')).toBe('');
  });

});