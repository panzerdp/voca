
import getGlobalObject from '../../src/helper/object/get_global';
import vocaLibrary from '../voca';

describe('noConflict', function() {

  it('should return Voca library instance and restore v global variable', function() {
    const globalObject = getGlobalObject();
    globalObject.v = vocaLibrary;
    const voca = vocaLibrary.noConflict();
    expect(voca).toBe(vocaLibrary);
    expect(globalObject.v).toBe(undefined);
  });

  it('should return Voca library instance and not modify v global variable', function() {
    const globalObject = getGlobalObject();
    const voca = vocaLibrary.noConflict();
    expect(voca).toBe(vocaLibrary);
    expect(globalObject.v).toBe(undefined);
  });

});