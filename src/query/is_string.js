/**
 * Checks if `subject` is a string primitive type.
 *
 * @function isString
 * @static
 * @memberOf Query
 * @param {string} subject The value to verify.
 * @return {boolean} Returns `true` if `subject` is string primitive type or `false` otherwise.
 * @example
 * v.isString('vacation');
 * // => true
 *
 * v.isString(560);
 * // => false
 */
export default function (subject) {
  return typeof subject === 'string';
}