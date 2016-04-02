import toString from '../utils/string/to_string'
import undefinedDefault from '../utils/undefined/undefined_default';
import clipNumber from '../utils/number/clip_number';
import toInteger from '../utils/number/to_integer';


/**
 * Checks if `string` starts with `start`.
 * @param {string} [string=''] The string to verify.
 * @param {string} [start] The starting string.
 * @param {int} [position=0] The position to start searching.
 * @return {boolean} Returns `true` if `string` starts with `start`, `false` otherwise.
 */
export default function(string, start, position) {
  if (start == null) {
    return false;
  }
  var valueString = toString(undefinedDefault(string, '')),
    startString = toString(start);
  if (valueString === null || startString === null) {
    return false;
  }
  if (startString === '') {
    return true;
  }
  if (typeof position === 'undefined') {
    position = 0;
  } else {
    position = clipNumber(toInteger(position), 0, valueString.length);
  }
  return valueString.substr(position, startString.length) === startString;
}