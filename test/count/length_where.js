import v from '../voca';
import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../utilities/string/ascii';

describe('lengthWhere', function() {

  it('should return the number of characters in a string for a predicate', function() {
    expect(v.lengthWhere('', v.isAlpha)).to.be.equal(0);
    expect(v.lengthWhere('africa654', v.isAlpha)).to.be.equal(6);
    expect(v.lengthWhere('790', v.isAlpha)).to.be.equal(0);
    expect(v.lengthWhere(PRINTABLE_ASCII, v.isDigit)).to.be.equal(10);
    expect(v.lengthWhere('****--**--**', function(character) {
      return character === '*';
    })).to.be.equal(8);
    expect(v.lengthWhere('****--**--**', function() {
      return false;
    })).to.be.equal(0);
  });

  it('should invoke the predicate with correct parameters and context', function() {
    var verifyIndex = 0,
      context = {},
      verifyString = '0123456789';
    expect(v.lengthWhere(verifyString, function(character, index, string) {
      expect(index).to.be.equal(verifyIndex);
      expect(this).to.be.equal(context);
      expect(string).to.be.equal(verifyString);
      expect(character).to.be.equal(verifyString[verifyIndex]);
      verifyIndex++;
      return true;
    }, context)).to.be.equal(10);
  });


  it('should return the number of characters in a number for a predicate', function() {
    expect(v.lengthWhere(123, v.isDigit)).to.be.equal(3);
    expect(v.lengthWhere(0, v.isDigit)).to.be.equal(1);
    expect(v.lengthWhere(-1.5, v.isDigit)).to.be.equal(2);
  });

  it('should return the number of characters in a string representation of an object for a predicate', function() {
    expect(v.lengthWhere(['droplet'], v.isDigit)).to.be.equal(0);
    expect(v.lengthWhere({
      toString: function() {
        return 'homo sapiens';
      }
    }, v.isAlphaDigit)).to.be.equal(11);
  });

  it('should return zero for a non function predicate', function() {
    expect(v.lengthWhere('africa')).to.be.equal(0);
    expect(v.lengthWhere('africa', undefined)).to.be.equal(0);
    expect(v.lengthWhere('africa', null)).to.be.equal(0);
    expect(v.lengthWhere('africa', 'africa')).to.be.equal(0);
    expect(v.lengthWhere('africa', 0)).to.be.equal(0);
    expect(v.lengthWhere()).to.be.equal(0);
  });

});