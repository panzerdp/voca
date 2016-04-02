import isString from '../query/is_string';

/**
 * Get the string representation of the `value`
 * Converts the `value` to string.
 * If `value` is `null` or `undefined`, return `null`.
 * @param {*} value The value to convert.
 * @return {string|null} Returns the string representation of `value`. Returns `null` if `value` is `null` or `undefined`.
 */
export default function(value) {
  if (value == null) {
    return null;
  }
  if (isString(value)) {
    return value;
  }
  return String(value);
}