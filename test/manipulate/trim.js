import v from '../voca'
import { expect } from 'chai'

describe('trim', function() {

  it('should return the trimmed string with default whitespaces', function() {
    expect(v.trim(' HelloWorld ')).to.be.equal('HelloWorld');
    expect(v.trim('   HelloWorld    ')).to.be.equal('HelloWorld');
    expect(v.trim('HelloWorld    ')).to.be.equal('HelloWorld');
    expect(v.trim('   HelloWorld')).to.be.equal('HelloWorld');
  });

  it('should return the trimmed string with custom whitespaces', function() {
    expect(v.trim('-HelloWorld-', '-')).to.be.equal('HelloWorld');
    expect(v.trim('---HelloWorld---', '-')).to.be.equal('HelloWorld');
    expect(v.trim('HelloWorld___'), '__').to.be.equal('HelloWorld_');
    expect(v.trim('<-HelloWorld', '<-')).to.be.equal('HelloWorld');
    expect(v.trim('111Hello111World111', '11')).to.be.equal('1Hello111World1');
  });

});