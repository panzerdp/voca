import isNil from 'helper/object/is_nil';
import isString from 'query/is_string';

/**
 * Get the string representation of the `value`.
 * Converts the `value` to string.
 *
 * @ignore
 * @function toString
 * @param {*} value             The value to convert.
 * @return {string|null}        Returns the string representation of `value`.
 */
export default function toString(value) {
  if (isNil(value)) {
    return null;
  }
  if (isString(value)) {
    return value;
  }
  return String(value);
}