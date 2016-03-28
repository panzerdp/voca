/**
 * If `value` is undefined return `defaultValue`, otherwise `value`
 * @param {*} value The value to verify
 * @param {*} defaultValue The default value
 * @return {boolean} Returns `defaultValue` if `value` is `undefined`, `defaultValue` otherwise
 */
export default function (value, defaultValue) {
  if (typeof value === 'undefined') {
    return defaultValue;
  }
  return value;
}