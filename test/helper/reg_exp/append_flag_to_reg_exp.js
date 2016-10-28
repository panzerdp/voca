import appendFlagToRegularExpression from '~/helper/reg_exp/append_flag_to_reg_exp';
import { expect } from 'chai';

describe('coerceToRegularExpression', function() {

  it('should coerce the pattern to a regular expression', function () {
    var regexp1 = appendFlagToRegularExpression(/.*/g, 'g');
    expect(regexp1).to.be.instanceof(RegExp);
    expect(regexp1.toString()).to.be.equal('/.*/g');
    var regexp2 = appendFlagToRegularExpression(/.*/, 'g');
    expect(regexp2).to.be.instanceof(RegExp);
    expect(regexp2.toString()).to.be.equal('/.*/g');
  });

});