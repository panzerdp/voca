/* eslint-disable */
import coerceToString from 'helper/string/coerce_to_string';

/**
 * Translates characters or replace substrings in `subject`.
 *
 * @function tr
 * @static
 * @since 1.0.0
 * @memberOf Manipulate
 * @param  {string} [subject=''] The string to translate.
 * @param  {string|Array} from The characters or array of substring to translate from.
 * @param  {string|Array} to The characters or array of substring to translate to.
 * @return {string} Returns translated string.
 * @example
 * v.wordWrap('Hello world', {
 *   width: 5
 * });
 * // => 'Hello\nworld'
 *
 */
export default function tr(subject, from, to) {
  const subjectString = coerceToString(subject);
  
}