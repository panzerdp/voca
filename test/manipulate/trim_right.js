import v from '../voca'
import { expect } from 'chai'

describe('isAlpha', function() {

  it('should return true for an alpha string', function() {
    expect(v.isAlpha('HelloWorld')).to.be.true;
    expect(v.isAlpha('JavaScript')).to.be.true;
    expect(v.isAlpha('AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz')).to.be.true;
  });


});
