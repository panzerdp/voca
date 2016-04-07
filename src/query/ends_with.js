import toString from '../utils/string/to_string'
import undefinedDefault from '../utils/undefined/undefined_default';
import clipNumber from '../utils/number/clip_number';
import toInteger from '../utils/number/to_integer';
import isNil from '../utils/object/is_nil';

/**
 * Checks if `string` ends with `end`.
 *
 * @function endsWith
 * @static
 * @memberOf Query
 * @param {string} [string=''] The string to verify.
 * @param {string} [end] The ending string.
 * @param {int} [position=string.length] Search within `string` as if this string were only `position` long.
 * @return {boolean} Returns `true` if `string` ends with `end`, `false` otherwise.
 */
export default function(string, end, position) {
  if (isNil(end)) {
    return false;
  }
  var valueString = toString(undefinedDefault(string, '')),
    endString = toString(end);
  if (valueString === null || endString === null) {
    return false;
  }
  if (endString === '') {
    return true;
  }
  position = isNil(position) ? valueString.length : clipNumber(toInteger(position), 0, valueString.length);
  position -= endString.length;
  var lastIndex = valueString.indexOf(endString, position);
  return lastIndex !== -1 && lastIndex === position;
}