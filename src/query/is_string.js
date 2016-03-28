/**
 * Checks if `value` is a string primitive type.
 * @param {string} [value=''] The value to verify.
 * @return {boolean} Returns `true` if `value` is a string primitive type, `false` otherwise.
 */
export default function (value) {
  return typeof value === 'string';
}