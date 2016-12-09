import coerceToString from 'helper/string/coerce_to_string';

/**
 * Returns the first occurrence index of `search` in `subject`.
 *
 * @function indexOf
 * @static
 * @since 1.0.0
 * @memberOf Index
 * @param {string} [subject=''] The string where to search.
 * @param {string} search The string to search.
 * @param {number} [fromIndex=0] The index to start searching.
 * @return {number} Returns the first occurrence index or `-1` if not found.
 * @example
 * v.indexOf('morning', 'n');
 * // => 3
 *
 * v.indexOf('evening', 'o');
 * // => -1
 */
export default function indexOf(subject, search, fromIndex) {
  const subjectString = coerceToString(subject);
  return subjectString.indexOf(search, fromIndex);
}