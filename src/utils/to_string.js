import isString from '../query/is_string';

/**
 * Try to convert the value to a string
 *
 * @param value {*}
 * @returns {string?} - Return the string or null if unable to convert
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