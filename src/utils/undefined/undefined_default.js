/**
 * Verifies if `value` is `undefined` and returns `defaultValue`. In other case returns `value`.
 * @param {*} value The value to verify.
 * @param {*} defaultValue The default value.
 * @return {*} Returns `defaultValue` if `value` is `undefined`, otherwise `defaultValue`.
 */
export default function (value, defaultValue) {
  return typeof value === 'undefined' ? defaultValue : value;
}