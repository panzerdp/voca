import toString from '../utils/string/to_string'
import nilDefault from '../utils/undefined/nil_default';
import isNil from '../utils/object/is_nil';
import toInteger from '../utils/number/to_integer';
import clipNumber from '../utils/number/clip_number';

/**
 * Repeats the `subject` number of `times`.
 *
 * @function repeat
 * @static
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to repeat.
 * @param {int} [times=1] The number of times to repeat.
 * @return {string} Returns the repeated string.
 * @example
 * v.repeat('w', 3);
 * // => 'www'
 *
 * v.repeat('world', 0);
 * // => ''
 */
export default function(subject, times) {
  var subjectString = toString(nilDefault(subject, '')),
    timesInt = isNil(times) ? 1 : clipNumber(toInteger(times), 0, Number.MAX_SAFE_INTEGER);
  var repeatString = '';
  while (timesInt) {
    if (timesInt & 1) {
      repeatString += subjectString;
    }
    if (timesInt > 1) {
      subjectString += subjectString;
    }
    timesInt >>= 1;
  }
  return repeatString;
}