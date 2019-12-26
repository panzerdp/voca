import { PRINTABLE_ASCII } from '../const';
import v from '../voca';

describe('escapeHtml', function() {
  it('should return the escaped string', function() {
    expect(v.escapeHtml('<>&"\'`')).toBe('&lt;&gt;&amp;&quot;&#x27;&#x60;');
    expect(v.escapeHtml('<p>wonderful world</p>')).toBe('&lt;p&gt;wonderful world&lt;/p&gt;');
    expect(v.escapeHtml(PRINTABLE_ASCII)).toBe(
      ' !&quot;#$%&amp;&#x27;()*+,-./0123456789:;&lt;=&gt;?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_&#x60;abcdefghijklmnopqrstuvwxyz{|}~'
    );
  });

  it('should return the escaped string representation of an object', function() {
    expect(v.escapeHtml(['<span>'])).toBe('&lt;span&gt;');
    expect(
      v.escapeHtml({
        toString: function() {
          return '<script>';
        },
      })
    ).toBe('&lt;script&gt;');
  });

  it('should return an empty string for null or undefined', function() {
    expect(v.escapeHtml()).toBe('');
    expect(v.escapeHtml(undefined)).toBe('');
    expect(v.escapeHtml(null)).toBe('');
  });
});
