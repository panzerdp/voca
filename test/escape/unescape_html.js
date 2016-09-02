import { expect } from 'chai';
import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('unescapeHtml', function() {

  it('should return the unescaped', function() {
    expect(v.unescapeHtml('&lt;&gt;&amp;&quot;&#x27;&#x60;')).to.be.equal('<>&"\'`');
    expect(v.unescapeHtml('&lt;p&gt;wonderful world&lt;/p&gt;')).to.be.equal('<p>wonderful world</p>');
    expect(v.unescapeHtml('&#x003C;p&#0062;wonderful world&#x003C;/p&#0062;')).to.be.equal('<p>wonderful world</p>');
    expect(v.unescapeHtml('&lt;p&gt;wonderful world&lt;/p&gt;')).to.be.equal('<p>wonderful world</p>');
    expect(v.unescapeHtml('&lt;p&gt;wonderful world&lt;/p&gt;')).to.be.equal('<p>wonderful world</p>');
    expect(v.unescapeHtml('&lt; &#x03c; &#060; &gt; &#x03e; &#062; &amp; &#x026; &#038; &quot; &#x022; &#034; &#x027; &#039; &#x060; &#096;'))
      .to.be.equal('< < < > > > & & & " " " \' \' ` `');
    expect(v.unescapeHtml(' !&quot;#$%&amp;&#x27;()*+,-./0123456789:;&lt;=&gt;?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_&#x60;abcdefghijklmnopqrstuvwxyz{|}~'))
      .to.be.equal(PRINTABLE_ASCII);
    expect(v.unescapeHtml('<>&"\'`')).to.be.equal('<>&"\'`');
  });

  it('should return the unescaped string representation of an object', function() {
    expect(v.unescapeHtml(['&lt;span&gt;'])).to.be.equal('<span>');
    expect(v.unescapeHtml({
      toString: function() {
        return '&lt;script&gt;';
      }
    })).to.be.equal('<script>');
  });

  it('should return an empty string for null or undefined', function() {
    expect(v.unescapeHtml()).to.be.equal('');
    expect(v.unescapeHtml(undefined)).to.be.equal('');
    expect(v.unescapeHtml(null)).to.be.equal('');
  });

});