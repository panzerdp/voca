/*eslint-disable */
import toString from '../utils/string/to_string';
import nilDefault from '../utils/undefined/nil_default';

var unescapeCharacters = {
  '<': /(&lt;)|(&#x0*3c)|(&#0*60)/ig,
  '>': '&gt;',
  '&': '&amp;',
  '"': '&quot;',
  "'": '&#x27;',
  '`': '&#x60;'
};

/**
 * Return the escaped version of `character`.
 *
 * @param {string} character The character to be escape.
 * @returns {string} The escaped version of character.
 */
function replaceEscapedSpecialCharacter(character) {
  return unescapeCharacters[character];
}

/**
 * Unescapes HTML special characters from <code>&lt; &gt; &amp; &quot; &#x27; &#x60;<code> to corresponding <code>< > & ' " `</code> in <code>subject</code>.
 *
 * @function unescapeHtml
 * @static
 * @memberOf Escape
 * @param {string} [subject=''] The string to unescape.
 * @return {string} Returns the unescaped string.
 * @example
 * v.unescapeHtml('&lt;p&gt;wonderful world&lt;/p&gt;');
 * // => '<p>wonderful world</p>'
 */
export default function(subject) {
  var subjectString = toString(nilDefault(subject, ''));
  return subjectString.replace(REGEXP_HTML_ESCAPED_SPECIAL_CHARACTERS, replaceEscapedSpecialCharacter);
}