import isString from '../query/is_string';

/**
 * Converts the `value` to string.
 * If `value` is `null` or `undefined` return `null`.
 * @param {*} value The value to convert.
 * @return {String|null} Returns the string representation or `null`.
 */
export default function(value) {
  if (typeof value === 'undefined' || value === null) {
    return null;
  }
  if (isString(value)) {
    return value;
  }
  return String(value);
}