/**
 * Checks if `string` is a string primitive type.
 *
 * @function isString
 * @static
 * @memberOf Query
 * @param {string} string The value to verify.
 * @return {boolean} Returns `true` if `string` is string primitive type or `false` otherwise.
 * @example
 * v.isString('vacation');
 * // => true
 *
 * v.isString(560);
 * // => false
 */
export default function (string) {
  return typeof string === 'string';
}