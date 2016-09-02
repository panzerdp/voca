import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('chars', function() {

  it('should split a string into characters', function() {
    expect(v.chars('stellar bomb')).to.eql(['s', 't', 'e', 'l', 'l', 'a', 'r', ' ', 'b', 'o', 'm', 'b']);
    expect(v.chars('   ')).to.eql([' ', ' ', ' ']);
    expect(v.chars('\n\t')).to.eql(['\n', '\t']);
    expect(v.chars('')).to.eql([]);
    expect(v.chars(PRINTABLE_ASCII)).to.eql(Array.prototype.slice.call(PRINTABLE_ASCII, 0));
  });

  it('should split a number into characters', function() {
    expect(v.chars(0)).to.eql(['0']);
    expect(v.chars(1560)).to.eql(['1', '5', '6', '0']);
    expect(v.chars(-1.6)).to.eql(['-', '1', '.', '6']);
  });

  it('should split the string representation of an object', function() {
    expect(v.chars(['star'])).to.eql(['s', 't', 'a', 'r']);
    expect(v.chars({
      toString: function() {
        return 'Capa';
      }
    })).to.eql(['C', 'a', 'p', 'a']);
  });


  it('should return an empty array of characters for null and undefined', function() {
    expect(v.chars()).to.eql([]);
    expect(v.chars(undefined)).to.eql([]);
    expect(v.chars(null)).to.eql([]);
  });

});