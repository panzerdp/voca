/**
 * Checks if `string` is a string primitive type.
 * @param {string} string The value to verify.
 * @return {boolean} Returns `true` if `string` is string primitive type, `false` otherwise.
 */
export default function (string) {
  return typeof string === 'string';
}