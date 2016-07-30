import vocaLibrary from '../voca';
import { expect } from 'chai';

describe('noConflict', function() {

  it('should return Voca library instance', function() {
    var voca = vocaLibrary.noConflict();
    expect(voca).to.be.equal(vocaLibrary);
  });

});