import v from '../voca';
import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../utils/string/ascii';

describe('sprintf', function() {

  it('should return a string according to formatting string', function() {
    expect(v.sprintf('%s', 'string')).to.be.equal('string');
    expect(v.sprintf('Hello %s!', 'World')).to.be.equal('Hello World!');
    expect(v.sprintf('%s %s!', 'Hello', 'World')).to.be.equal('Hello World!');
  });

  it('should return an unmodified string for missing formatting', function() {
    expect(v.sprintf('Without formatting')).to.be.equal('Without formatting');
    expect(v.sprintf('')).to.be.equal('');
    expect(v.sprintf(PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII);
  });

});