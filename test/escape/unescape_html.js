import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('unescapeHtml', function() {
  it('should return the unescaped', function() {
    expect(v.unescapeHtml('&lt;&gt;&amp;&quot;&#x27;&#x60;')).toBe('<>&"\'`');
    expect(v.unescapeHtml('&lt;p&gt;wonderful world&lt;/p&gt;')).toBe('<p>wonderful world</p>');
    expect(v.unescapeHtml('&#x003C;p&#0062;wonderful world&#x003C;/p&#0062;')).toBe('<p>wonderful world</p>');
    expect(v.unescapeHtml('&lt;p&gt;wonderful world&lt;/p&gt;')).toBe('<p>wonderful world</p>');
    expect(v.unescapeHtml('&lt;p&gt;wonderful world&lt;/p&gt;')).toBe('<p>wonderful world</p>');
    expect(
      v.unescapeHtml(
        '&lt; &#x03c; &#060; &gt; &#x03e; &#062; &amp; &#x026; &#038; &quot; &#x022; &#034; &#x027; &#039; &#x060; &#096;'
      )
    ).toBe('< < < > > > & & & " " " \' \' ` `');
    expect(
      v.unescapeHtml(
        ' !&quot;#$%&amp;&#x27;()*+,-./0123456789:;&lt;=&gt;?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_&#x60;abcdefghijklmnopqrstuvwxyz{|}~'
      )
    ).toBe(PRINTABLE_ASCII);
    expect(v.unescapeHtml('<>&"\'`')).toBe('<>&"\'`');
  });

  it('should return the unescaped string representation of an object', function() {
    expect(v.unescapeHtml(['&lt;span&gt;'])).toBe('<span>');
    expect(
      v.unescapeHtml({
        toString: function() {
          return '&lt;script&gt;';
        },
      })
    ).toBe('<script>');
  });

  it('should return an empty string for null or undefined', function() {
    expect(v.unescapeHtml()).toBe('');
    expect(v.unescapeHtml(undefined)).toBe('');
    expect(v.unescapeHtml(null)).toBe('');
  });
});
