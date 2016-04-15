import toString from '../utils/string/to_string'
import undefinedDefault from '../utils/undefined/undefined_default';
import clipNumber from '../utils/number/clip_number';
import toInteger from '../utils/number/to_integer';
import isNil from '../utils/object/is_nil';

/**
 * Checks if `subject` starts with `start`.
 *
 * @function startsWith
 * @static
 * @memberOf Query
 * @param {string} [subject=''] The string to verify.
 * @param {string} start The starting string.
 * @param {int} [position=0] The position to start searching.
 * @return {boolean} Returns `true` if `subject` starts with `start` or `false` otherwise.
 * @example
 * v.startsWith('say hello to my little friend', 'say hello');
 * // => true
 *
 * v.startsWith('tony', 'on', 1);
 * // => true
 *
 * v.startsWith('the world is yours', 'world');
 * // => false
 */
export default function(subject, start, position) {
  var subjectString = toString(undefinedDefault(subject, '')),
    startString = toString(start);
  if (startString === null) {
    return false;
  }
  if (startString === '') {
    return true;
  }
  position = isNil(position) ? 0 : clipNumber(toInteger(position), 0, subjectString.length);
  return subjectString.substr(position, startString.length) === startString;
}