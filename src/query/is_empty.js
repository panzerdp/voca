import toString from '../utils/to_string';
import undefinedDefault from '../utils/undefined_default';

/**
 * Checks if `value` is empty, `null` or `undefined`
 * @param {string} [value=''] The string to verify.
 * @return {boolean} Returns `true` if `value` length is `0`, `null` or `undefined`, `false` otherwise
 */
export default function(value) {
  value = undefinedDefault(value, '');
  var string = toString(value);
  if (string === null) {
    return true;
  }
  return string.length === 0;
}