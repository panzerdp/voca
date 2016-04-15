import toString from '../utils/string/to_string'
import undefinedDefault from '../utils/undefined/undefined_default';
import isNil from '../utils/object/is_nil';
import clipNumber from '../utils/number/clip_number';
import toInteger from '../utils/number/to_integer';

/**
 * Checks if `subject` includes `search` starting from `position`
 *
 * @function includes
 * @static
 * @memberOf Query
 * @param {string} [subject=''] The string where to search.
 * @param {string} search The string to search.
 * @param {int} [position=0] The position to start searching.
 * @return {boolean} Returns `true` if `subject` includes `search` or `false` otherwise.
 * @example
 * v.includes('starship', 'star');
 * // => true
 *
 * v.includes('galaxy', 'g', 1);
 * // => false
 */
export default function(subject, search, position) {
  subject = undefinedDefault(subject, '');
  var subjectString = toString(undefinedDefault(subject, '')),
    searchString = toString(search);
  if (subjectString === null || searchString === null) {
    return false;
  }
  if (searchString === '') {
    return true;
  }
  position = isNil(position) ? 0 : clipNumber(toInteger(position), 0, subjectString.length);
  return subjectString.indexOf(searchString, position) !== -1;
}