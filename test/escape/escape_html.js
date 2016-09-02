import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('escapeHtml', function() {

  it('should return the escaped string', function() {
    expect(v.escapeHtml('<>&"\'`')).to.be.equal('&lt;&gt;&amp;&quot;&#x27;&#x60;');
    expect(v.escapeHtml('<p>wonderful world</p>')).to.be.equal('&lt;p&gt;wonderful world&lt;/p&gt;');
    expect(v.escapeHtml(PRINTABLE_ASCII)).to.be.equal(
      ' !&quot;#$%&amp;&#x27;()*+,-./0123456789:;&lt;=&gt;?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_&#x60;abcdefghijklmnopqrstuvwxyz{|}~');
  });

  it('should return the escaped string representation of an object', function() {
    expect(v.escapeHtml(['<span>'])).to.be.equal('&lt;span&gt;');
    expect(v.escapeHtml({
      toString: function() {
        return '<script>';
      }
    })).to.be.equal('&lt;script&gt;');
  });

  it('should return an empty string for null or undefined', function() {
    expect(v.escapeHtml()).to.be.equal('');
    expect(v.escapeHtml(undefined)).to.be.equal('');
    expect(v.escapeHtml(null)).to.be.equal('');
  });

});