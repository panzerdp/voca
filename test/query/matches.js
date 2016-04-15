import v from '../voca'
import { expect } from 'chai'

describe('matches', function() {

  it('should return true for a regular expression match', function() {
    expect(v.matches('pacific ocean', /ocean/));

  });

});