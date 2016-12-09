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
    expect(v.wordWrap('Hello', {
      width: 4
    })).to.be.equal('Hello');
    expect(v.wordWrap('  Hello  ', {
      width: 4
    })).to.be.equal('Hello\n ');
    expect(v.wordWrap('Hello World', {
      width: 4
    })).to.be.equal('Hello\nWorld');
    expect(v.wordWrap('Yes. The fire rises.', {
      width: 4
    })).to.be.equal('Yes.\nThe\nfire\nrises.');
    expect(v.wordWrap('And I think to myself what a wonderful world.', {
      width: 10
    })).to.be.equal('And I\nthink to\nmyself\nwhat a\nwonderful\nworld.');
    expect(v.wordWrap('Hello World', {
      width: 0
    })).to.be.equal('');
    expect(v.wordWrap('Hello World', {
      width: -5
    })).to.be.equal('');
  });

  it('should wrap the string with indent', function() {
    expect(v.wordWrap('Hello', {
      width: 4,
      indent: '***'
    })).to.be.equal('***Hello');
    expect(v.wordWrap('Hello World', {
      width: 4,
      indent: '  '
    })).to.be.equal('  Hello\n  World');
    expect(v.wordWrap('Yes. The fire rises.', {
      width: 4,
      indent: '**'
    })).to.be.equal('**Yes.\n**The\n**fire\n**rises.');
    expect(v.wordWrap('', {
      width: 5,
      indent: '000'
    })).to.be.equal('000');
    expect(v.wordWrap('Wonderful world', {
      width: 0,
      indent: '000'
    })).to.be.equal('000');
  });

  it('should wrap the string with a custom newline character', function() {
    expect(v.wordWrap('What A Wonderful World', {
      width: 10,
      indent: '  ',
      newLine: '+'
    })).to.be.equal('  What A+  Wonderful+  World');
    expect(v.wordWrap('I hear babies crying, I watch them grow', {
      width: 5,
      indent: '-',
      newLine: '<br/>'
    })).to.be.equal('-I<br/>-hear<br/>-babies<br/>-crying,<br/>-I<br/>-watch<br/>-them<br/>-grow');
  });

  it('should wrap the string with breaking long words', function() {
    expect(v.wordWrap('Hello', {
      width: 4,
      cut: true
    })).to.be.equal('Hell\no');
    expect(v.wordWrap('I hear babies crying, I watch them grow', {
      width: 5,
      cut: true
    })).to.be.equal('I\nhear\nbabie\ns\ncryin\ng, I\nwatch\nthem\ngrow');
  });

  it('should return empty string for null or undefined', function() {
    expect(v.wordWrap()).to.be.equal('');
    expect(v.wordWrap(undefined)).to.be.equal('');
    expect(v.wordWrap(null)).to.be.equal('');
  });

});