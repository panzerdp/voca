import toString from '../utils/string/to_string'
import undefinedDefault from '../utils/undefined/undefined_default';
import clipNumber from '../utils/number/clip_number';
import toInteger from '../utils/number/to_integer';
import isNil from '../utils/object/is_nil';

/**
 * Checks if `subject` ends with `end`.
 *
 * @function endsWith
 * @static
 * @memberOf Query
 * @param {string} [subject=''] The string to verify.
 * @param {string} [end] The ending string.
 * @param {int} [position=string.length] Search within `subject` as if this string were only `position` long.
 * @return {boolean} Returns `true` if `subject` ends with `end` or `false` otherwise.
 * @example
 * v.endsWith('red alert', 'alert');
 * // => true
 *
 * v.endsWith('metro south', 'metro');
 * // => false
 *
 * v.endsWith('Murphy', 'ph', 5);
 * // => true
 */
export default function(subject, end, position) {
  if (isNil(end)) {
    return false;
  }
  var subjectString = toString(undefinedDefault(subject, '')),
    endString = toString(end);
  if (subjectString === null || endString === null) {
    return false;
  }
  if (endString === '') {
    return true;
  }
  position = isNil(position) ? subjectString.length : clipNumber(toInteger(position), 0, subjectString.length);
  position -= endString.length;
  var lastIndex = subjectString.indexOf(endString, position);
  return lastIndex !== -1 && lastIndex === position;
}