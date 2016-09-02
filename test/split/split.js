import { expect } from 'chai';
import v from '../voca';

describe('split', function() {

  it('should split a string into chunks', function() {
    expect(v.split('stellar bomb', ' ')).to.eql(['stellar', 'bomb']);
    expect(v.split('   ', ' ')).to.eql(['', '', '', '']);
    expect(v.split('dying star', /\s/)).to.eql(['dying', 'star']);
    expect(v.split('*dying*star*', /\*/)).to.eql(['', 'dying', 'star', '']);
    expect(v.split('', '')).to.eql([]);
    expect(v.split('star', '')).to.eql(['s', 't', 'a', 'r']);
  });

  it('should split a number into chunks', function() {
    expect(v.split(0)).to.eql(['0']);
    expect(v.split(1560, '6')).to.eql(['15', '0']);
    expect(v.split(-1.6, /\./)).to.eql(['-1', '6']);
  });

  it('should split the string representation of an object', function() {
    expect(v.split('rising star', ' ')).to.eql(['rising', 'star']);
    expect(v.split({
      toString: function() {
        return 'rising-star';
      }
    }, /\-/)).to.eql(['rising', 'star']);
  });


  it('should return the string as an item of an array for an empty separator', function() {
    expect(v.split('star')).to.eql(['star']);
    expect(v.split('star', null)).to.eql(['star']);
    expect(v.split('star', undefined)).to.eql(['star']);
  });

});