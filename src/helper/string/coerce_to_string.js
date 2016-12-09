import isNil from 'helper/object/is_nil';
import isString from 'query/is_string';

/**
 * Get the string representation of the `value`.
 * Converts the `value` to string.
 * If `value` is `null` or `undefined`, return `defaultValue`.
 *
 * @ignore
 * @function toString
 * @param {*} value             The value to convert.
 * @param {*} [defaultValue=''] The default value to return.
 * @return {string|null}        Returns the string representation of `value`. Returns `defaultValue` if `value` is
 *                              `null` or `undefined`.
 */
export default function coerceToString(value, defaultValue = '') {
  if (isNil(value)) {
    return defaultValue;
  }
  if (isString(value)) {
    return value;
  }
  return String(value);
}