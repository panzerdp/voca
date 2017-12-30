import appendFlag from 'helper/reg_exp/append_flag';
import { expect } from 'chai';

describe('coerceToRegularExpression', function() {

  it('should coerce the pattern to a regular expression', function () {
    const regexp1 = appendFlag(/.*/g, 'g');
    expect(regexp1).to.be.instanceof(RegExp);
    expect(regexp1.toString()).to.be.equal('/.*/g');
    const regexp2 = appendFlag(/.*/, 'g');
    expect(regexp2).to.be.instanceof(RegExp);
    expect(regexp2.toString()).to.be.equal('/.*/g');
  });

});