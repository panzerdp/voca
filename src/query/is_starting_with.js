import toString from '../utils/to_string'
import undefinedDefault from '../utils/undefined_default';


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
  if (typeof position !== 'number'
    || !isFinite(position)
    || Math.floor(position) !== position
    || position < 0) {
    position = 0;
  }
  return valueString.substr(position, startString.length) === startString;
}