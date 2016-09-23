import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('substr', function() {

  it('should substract a string', function() {
    expect(v.substr('infinite loop', 9)).to.be.equal('loop');
    expect(v.substr('infinite loop', 0)).to.be.equal('infinite loop');
    expect(v.substr('infinite loop')).to.be.equal('infinite loop');
    expect(v.substr('infinite loop', 1)).to.be.equal('nfinite loop');
    expect(v.substr('infinite loop', -4)).to.be.equal('loop');
    expect(v.substr(PRINTABLE_ASCII, 0)).to.be.equal(PRINTABLE_ASCII);
  });

  it('should substract a string with a length', function() {
    expect(v.substr('infinite loop', 9, 3)).to.be.equal('loo');
    expect(v.substr('infinite loop', 0, 'infinite loop'.length)).to.be.equal('infinite loop');
    expect(v.substr('infinite loop', 1, 1)).to.be.equal('n');
    expect(v.substr('infinite loop', -4, 1)).to.be.equal('l');
  });

  it('should substract a string representation of an object', function() {
    expect(v.substr(['infinite loop'], 10)).to.be.equal('oop');
    expect(v.substr({
      toString: function() {
        return 'loop';
      }
    }, 0, 3)).to.be.equal('loo');
  });

  it('should substract a string from a number', function() {
    expect(v.substr(12345, 3)).to.be.equal('45');
    expect(v.substr(987, 1, 1)).to.be.equal('8');
  });
});