import toString from '../utils/string/to_string';
import nilDefault from '../utils/undefined/nil_default';
import { REGEXP_HTML_SPECIAL_CHARACTERS } from '../utils/regexp';

var escapeCharactersMap = {
  '<': '&lt;',
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
function replaceSpecialCharacter(character) {
  return escapeCharactersMap[character];
}

/**
 * Escapes HTML special characters  <code>< > & ' " `</code> in <code>subject</code>.
 *
 * @function escapeHtml
 * @static
 * @memberOf Escape
 * @param {string} [subject=''] The string to escape.
 * @return {string} Returns the escaped string.
 * @example
 * v.escapeHtml('<p>wonderful world</p>');
 * // => '&lt;p&gt;wonderful world&lt;/p&gt;'
 */
export default function(subject) {
  var subjectString = toString(nilDefault(subject, ''));
  return subjectString.replace(REGEXP_HTML_SPECIAL_CHARACTERS, replaceSpecialCharacter);
}