/* eslint-disable */
import v from '../voca';
import { expect } from 'chai';

describe('chain', function() {

  it('should calculate the result using explicit chaining', function() {
    expect(v
      .chain('Hello world')
      .value()
    ).to.equal('Hello world');
  });

});