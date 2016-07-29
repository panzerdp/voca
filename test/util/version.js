import v from '../voca';
import { expect } from 'chai';
import semverRegex from 'semver-regex';

describe('version', function() {

  it('should match semantic version number pattern', function() {
    expect(semverRegex().test(v.version)).to.be.true;
  });

});