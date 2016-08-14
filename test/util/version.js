import v from '../voca';
import { expect } from 'chai';
import { REGEXP_SEMVER } from '../utilities/string/regexp';

describe('version', function() {

  it('should match semantic version number pattern', function() {
    expect(REGEXP_SEMVER.test(v.version)).to.be.true;
  });

});