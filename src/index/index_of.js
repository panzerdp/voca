import toString from '../utils/string/to_string';
import nilDefault from '../utils/undefined/nil_default';

/**
 * Returns the first occurrence index of `searchValue` in `subject`.
 *
 * @function indexOf
 * @static
 * @memberOf Index
 * @param {string} [subject=''] The string where to search.
 * @param {string} search The string to search.
 * @param {int} [fromIndex=0] The index to start searching.
 * @return {int} Returns the first occurrence index or `-1` if not found.
 * @example
 * v.indexOf('morning', 'n');
 * // => 3
 *
 * v.indexOf('evening', 'o');
 * // => -1
 */
export default function(subject, search, fromIndex) {
  var subjectString = toString(nilDefault(subject, ''));
  return subjectString.indexOf(search, fromIndex);
}