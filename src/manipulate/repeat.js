import clipNumber from 'helper/number/clip_number';
import coerceToString from 'helper/string/coerce_to_string';
import isNil from 'helper/object/is_nil';
import { MAX_SAFE_INTEGER } from 'helper/number/const';
import toInteger from 'helper/number/to_integer';

/**
 * Repeats the `subject` number of `times`.
 *
 * @function repeat
 * @static
 * @since 1.0.0
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to repeat.
 * @param {number} [times=1] The number of times to repeat.
 * @return {string} Returns the repeated string.
 * @example
 * v.repeat('w', 3);
 * // => 'www'
 *
 * v.repeat('world', 0);
 * // => ''
 */
export default function repeat(subject, times) {
  const subjectString = coerceToString(subject);
  const timesInt = isNil(times) ? 1 : clipNumber(toInteger(times), 0, MAX_SAFE_INTEGER);
  return subjectString.repeat(timesInt);
}