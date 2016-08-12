import vocaLibrary from '../voca';
import getGlobalObject from '../../src/utilities/object/get_global';
import { expect } from 'chai';

describe('noConflict', function() {

  it('should return Voca library instance and restore v global variable', function() {
    var globalObject = getGlobalObject();
    globalObject.v = vocaLibrary;
    var voca = vocaLibrary.noConflict();
    expect(voca).to.be.equal(vocaLibrary);
    expect(globalObject.v).to.be.equal(undefined);
  });

  it('should return voca library instance and not modify v global variable', function() {
    var globalObject = getGlobalObject();
    var voca = vocaLibrary.noConflict();
    expect(voca).to.be.equal(vocaLibrary);
    expect(globalObject.v).to.be.equal(undefined);
  });

});