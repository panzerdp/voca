import { expect } from 'chai';
import v from '../voca';

describe('wordWrap', function() {

  it('should wrap the string with default parameters', function() {
    expect(v.wordWrap('')).to.be.equal('');
    expect(v.wordWrap('Yes. The fire rises. ')).to.be.equal('Yes. The fire rises. ');
    expect(v.wordWrap('Theatricality and deception are powerful agents to the uninitiated... but we are initiated, aren\'t ' +
      'we Bruce? Members of the League of Shadows!'))
      .to.be.equal('Theatricality and deception are powerful agents to the uninitiated... but' + '\n' +
      'we are initiated, aren\'t we Bruce? Members of the League of Shadows!'
    );
    expect(v.wordWrap('Theatricality-and-deception-are-powerful-agents-to-the-uninitiated...-but-we-are-initiated'))
      .to.be.equal('Theatricality-and-deception-are-powerful-agents-to-the-uninitiated...-but-we-are-initiated');
  });

  it('should wrap the string for a specific width', function() {
    expect(v.wordWrap('Yes. The fire rises. ', {
      width: 4
    })).to.be.equal('Yes.\nThe\nfire\nrises.\n');
  });

  it('should return empty string for null or undefined', function() {
    expect(v.wordWrap()).to.be.equal('');
    expect(v.wordWrap(undefined)).to.be.equal('');
    expect(v.wordWrap(null)).to.be.equal('');
  });

});