import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('slice', function() {

  it('should slice a string', function() {
    expect(v.slice('infinite loop', 9)).to.be.equal('loop');
    expect(v.slice('infinite loop', 0)).to.be.equal('infinite loop');
    expect(v.slice('infinite loop')).to.be.equal('infinite loop');
    expect(v.slice('infinite loop', 1)).to.be.equal('nfinite loop');
    expect(v.slice(PRINTABLE_ASCII, 0)).to.be.equal(PRINTABLE_ASCII);
  });

  it('should slice a string with an end position', function() {
    expect(v.slice('infinite loop', 9, 12)).to.be.equal('loo');
    expect(v.slice('infinite loop', 9, -1)).to.be.equal('loo');
    expect(v.slice('infinite loop', 0, 'infinite loop'.length)).to.be.equal('infinite loop');
    expect(v.slice('infinite loop', 1, 2)).to.be.equal('n');
    expect(v.slice('infinite loop', -4, -1)).to.be.equal('loo');
  });

  it('should slice a string representation of an object', function() {
    expect(v.slice(['infinite loop'], 10)).to.be.equal('oop');
    expect(v.slice({
      toString: function() {
        return 'loop';
      }
    }, 0, 3)).to.be.equal('loo');
  });

  it('should slice a string from a number', function() {
    expect(v.slice(12345, 3)).to.be.equal('45');
    expect(v.slice(987, 1, 2)).to.be.equal('8');
  });
});