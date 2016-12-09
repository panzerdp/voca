import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('countWhere', function() {

  it('should return the number of characters in a string for a predicate', function() {
    expect(v.countWhere('', v.isAlpha)).to.be.equal(0);
    expect(v.countWhere('africa654', v.isAlpha)).to.be.equal(6);
    expect(v.countWhere('790', v.isAlpha)).to.be.equal(0);
    expect(v.countWhere(PRINTABLE_ASCII, v.isDigit)).to.be.equal(10);
    expect(v.countWhere('****--**--**', function(character) {
      return character === '*';
    })).to.be.equal(8);
    expect(v.countWhere('****--**--**', function() {
      return false;
    })).to.be.equal(0);
  });

  it('should invoke the predicate with correct parameters and context', function() {
    let verifyIndex = 0;
    const context = {};
    const verifyString = '0123456789';
    expect(v.countWhere(verifyString, function(character, index, string) {
      expect(index).to.be.equal(verifyIndex);
      expect(this).to.be.equal(context);
      expect(string).to.be.equal(verifyString);
      expect(character).to.be.equal(verifyString[verifyIndex]);
      verifyIndex++;
      return true;
    }, context)).to.be.equal(10);
  });


  it('should return the number of characters in a number for a predicate', function() {
    expect(v.countWhere(123, v.isDigit)).to.be.equal(3);
    expect(v.countWhere(0, v.isDigit)).to.be.equal(1);
    expect(v.countWhere(-1.5, v.isDigit)).to.be.equal(2);
  });

  it('should return the number of characters in a string representation of an object for a predicate', function() {
    expect(v.countWhere(['droplet'], v.isDigit)).to.be.equal(0);
    expect(v.countWhere({
      toString: function() {
        return 'homo sapiens';
      }
    }, v.isAlphaDigit)).to.be.equal(11);
  });

  it('should return zero for a non function predicate', function() {
    expect(v.countWhere('africa')).to.be.equal(0);
    expect(v.countWhere('africa', undefined)).to.be.equal(0);
    expect(v.countWhere('africa', null)).to.be.equal(0);
    expect(v.countWhere('africa', 'africa')).to.be.equal(0);
    expect(v.countWhere('africa', 0)).to.be.equal(0);
    expect(v.countWhere()).to.be.equal(0);
  });

});