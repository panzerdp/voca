import { expect } from 'chai';
import v from '../voca';

describe('insert', function() {

  it('should insert into a string at specified position', function() {
    expect(v.insert('autumn', 'nice ', 0)).to.be.equal('nice autumn');
    expect(v.insert('autumn', 'nice ')).to.be.equal('nice autumn');
    expect(v.insert('autumn', 'nice', 1)).to.be.equal('aniceutumn');
    expect(v.insert('autumn', 'nice', 5)).to.be.equal('autumnicen');
    expect(v.insert('autumn', ' is nice', 6)).to.be.equal('autumn is nice');
    expect(v.insert('', 'nice', 0)).to.be.equal('nice');
    expect(v.insert('autumn', '', 1)).to.be.equal('autumn');
    expect(v.insert('autumn', '', 6)).to.be.equal('autumn');
  });

  it('should not insert into a string when position is out of bounds', function() {
    expect(v.insert('autumn', 'nice ', 100)).to.be.equal('autumn');
    expect(v.insert('autumn', 'nice', -100)).to.be.equal('autumn');
    expect(v.insert('autumn', 'nice', 7)).to.be.equal('autumn');
    expect(v.insert('autumn', 'nice', -1)).to.be.equal('autumn');
    expect(v.insert('', 'nice', 1)).to.be.equal('');
  });

  it('should insert into a string representation of an object at specified position', function() {
    expect(v.insert(['paradise'], '**', 2)).to.be.equal('pa**radise');
    expect(v.insert({
      toString: function() {
        return 'Tony';
      }
    }, ' Montana', 4)).to.be.equal('Tony Montana');
  });

  it('should not insert into a string on null or undefined arguments', function() {
    expect(v.insert()).to.be.equal('');
    expect(v.insert(null)).to.be.equal('');
    expect(v.insert(undefined)).to.be.equal('');
    expect(v.insert(undefined, undefined)).to.be.equal('');
  });

});