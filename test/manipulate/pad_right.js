//import v from '../voca';
//import { expect } from 'chai';
//import { PRINTABLE_ASCII } from '../utils/string/ascii';
//
//describe('pad', function() {
//
//  it('should pad a string', function() {
//    expect(v.pad('')).to.be.equal('');
//  });
//
//  it('should pad a string representation of an object', function() {
//    expect(v.pad(['María'])).to.be.equal('Maria');
//    expect(v.pad({
//      toString: function() {
//        return 'sacó';
//      }
//    })).to.be.equal('saco');
//  });
//
//  it('should return an empty string for null or undefined', function() {
//    expect(v.pad()).to.be.equal('');
//    expect(v.pad(undefined)).to.be.equal('');
//    expect(v.pad(null)).to.be.equal('');
//  });
//
//});