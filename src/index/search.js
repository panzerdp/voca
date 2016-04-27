import toString from '../utils/string/to_string';
import nilDefault from '../utils/undefined/nil_default';
import clipNumber from '../utils/number/clip_number';
import toInteger from '../utils/number/to_integer';
import isNil from '../utils/object/is_nil';

/**
 * Returns the first match index of `pattern` in `subject`.
 *
 * @function search
 * @static
 * @memberOf Index
 * @param {string} [subject=''] The string where to search.
 * @param {string|RegExp} pattern The pattern to match. A non RegExp value is transformed to `new RegExp(pattern)`.
 * @param {number} [fromIndex=0] The index to start searching.
 * @return {number} Returns the first match index or `-1` if not found.
 * @example
 * v.search('morning', /rn/);
 * // => 2
 *
 * v.search('evening', '/\d/');
 * // => -1
 */
export default function(subject, pattern, fromIndex) {
  var subjectString = toString(nilDefault(subject, '')),
    fromIndexNumber = isNil(fromIndex) ? 0 : clipNumber(toInteger(fromIndex), 0, subjectString.length);
  var matchIndex  = subjectString.substr(fromIndexNumber).search(pattern);
  if (matchIndex !== -1 && !isNaN(fromIndexNumber)) {
    matchIndex += fromIndexNumber;
  }
  return matchIndex;
}