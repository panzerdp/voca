import { expect } from 'chai';
import getGlobalObject from '../../src/helper/object/get_global';
import vocaLibrary from '../voca';

describe('noConflict', function() {

  it('should return Voca library instance and restore v global variable', function() {
    var globalObject = getGlobalObject();
    globalObject.v = vocaLibrary;
    var voca = vocaLibrary.noConflict();
    expect(voca).to.be.equal(vocaLibrary);
    expect(globalObject.v).to.be.equal(undefined);
  });

  it('should return Voca library instance and not modify v global variable', function() {
    var globalObject = getGlobalObject();
    var voca = vocaLibrary.noConflict();
    expect(voca).to.be.equal(vocaLibrary);
    expect(globalObject.v).to.be.equal(undefined);
  });

});