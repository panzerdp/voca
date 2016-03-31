import toString from '../utils/to_string'
import undefinedDefault from '../utils/undefined_default';


/**
 * Checks if `string` ends with `end`.
 * @param {string} [string=''] The string to verify.
 * @param {string} [end] The ending string.
 * @param {int} [position=string.length] Search within `string` as if this string were only `position` long.
 * @return {boolean} Returns `true` if `string` ends with `end`, `false` otherwise.
 */
export default function(string, end, position) {
  if (end == null) {
    return false;
  }
  var stringValue = toString(undefinedDefault(string, '')),
    stringEnd = toString(end);
  if (stringValue === null || stringEnd === null) {
    return false;
  }
  if (typeof position !== 'number'
    || !isFinite(position)
    || Math.floor(position) !== position
    || position > stringValue.length) {
    position = stringValue.length;
  }
  position -= stringEnd.length;
  var lastIndex = stringValue.indexOf(stringEnd, position);
  return lastIndex !== -1 && lastIndex === position;
}