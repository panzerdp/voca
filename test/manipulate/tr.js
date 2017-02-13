import { expect } from 'chai';
import v from '../voca';

describe('tr', function() {

  it('should translate the string from characters to characters', function() {
    expect(v.tr('abc', 'a', 'b')).to.be.equal('bbc');
    expect(v.tr('hello', 'el', 'ip')).to.be.equal('hippo');
    expect(v.tr('test strtr', 't', 'T')).to.be.equal('TesT sTrTr');
    expect(v.tr('test strtr', 'test', 'TEST')).to.be.equal('TEST STrTr');
    const from0 = "123abc";
    const to0 = "abc123";
    expect(v.tr('123', from0, to0)).to.be.equal('abc');
    expect(v.tr('abc', from0, to0)).to.be.equal('123');
    expect(v.tr('1a2b3c', from0, to0)).to.be.equal('a1b2c3');
    const from1 = "\n\r\t\\";
    const to1 = "TEST";
    expect(v.tr('\tes\t\\stt\r', from1, to1)).to.be.equal('SesSTsttE');
    expect(v.tr('\\test\\\strtr', from1, to1)).to.be.equal('TtestTstrtr');
    expect(v.tr('\ntest\r\nstrtr', from1, to1)).to.be.equal('TtestETstrtr');
    expect(v.tr('\$variable', from1, to1)).to.be.equal('$variable');
    expect(v.tr('\"quotes', from1, to1)).to.be.equal('"quotes');
  });

  it('should ignore the extra characters from keys and values', function() {
    expect(v.tr('test strtr', 'test', 'TESTz')).to.be.equal('TEST STrTr');
    expect(v.tr('test strtr', 'testz', 'TEST')).to.be.equal('TEST STrTr');
  });

  it('should translate the string from a map object', function() {
    const map0 = {
      't': 'T', 
      'e': 'E', 
      'st': 'ST'
    };
    expect(v.tr('test strtr', map0)).to.be.equal('TEST STrTr');
    const map1 = {
      'hello': 'hi', 
      'hi': 'hello', 
      'a': 'A', 
      'world': 'planet'
    };
    expect(v.tr('# hi all, I said hello world! #', map1)).to.be.equal('# hello All, I sAid hi planet! #');
    const map2 = {
      "1": "a", 
      "a": 1, 
      "2b3c": "b2c3", 
      "b2c3": "3c2b"
    };
    expect(v.tr('123', map2)).to.be.equal('a23');
    expect(v.tr('abc', map2)).to.be.equal('1bc');
    expect(v.tr('1a2b3c', map2)).to.be.equal('a1b2c3');
    expect(v.tr(':where is the birthplace of :what', {
      ':where': 'Africa',
      ':what': 'Humanity'
    })).to.be.equal('Africa is the birthplace of Humanity');
    expect(v.tr('where is the birthplace of what', {
      'where': '',
      'what': '',
      'is': ''
    })).to.be.equal('  the birthplace of ');
    expect(v.tr('My name is :name, not :name2.', {
      ':name': 'Dave',
      'Dave': ':name2 or :password', 
      ':name2': 'Steve',
      ':pass': '7hf2348',
    })).to.be.equal('My name is Dave, not Steve.');
  });

  it('should translate the string representation of an object', function() {
    expect(v.tr(['paradise'], 'pa', 'P8')).to.be.equal('P8r8dise');
    expect(v.tr({
      toString: function() {
        return 'paradise';
      }
    }, {'p': 'P', 'a': '8'})).to.be.equal('P8r8dise');
  });

  it('should not modify the string when translate arguments are not provided', function() {
    expect(v.tr('champion')).to.be.equal('champion');
    expect(v.tr('champion', undefined, null)).to.be.equal('champion');
    expect(v.tr('champion', null, null)).to.be.equal('champion');
    expect(v.tr()).to.be.equal('');
  });

});