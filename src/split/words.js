import toString from '../utils/string/to_string';
import nilDefault from '../utils/undefined/nil_default';
import { REGEXP_WORD } from '../utils/regexp';

/**
 * Splits `subject` into an array of words.
 *
 * @function words
 * @static
 * @memberOf Split
 * @param {string} [subject=''] The string to split into words.
 * @return {[{string}]} Returns the array of words.
 * @example
 * v.words('gravity can cross dimensions');
 * // => ['gravity', 'can', 'cross', 'dimensions']
 */
export default function(subject) {
  var subjectString = toString(nilDefault(subject, '')),
    words = subjectString.match(REGEXP_WORD);
  return nilDefault(words, []);
}