/**
 * Checks if `string` is numeric.
 *
 * @function isNumeric
 * @static
 * @memberOf Query
 * @param {string} [string=''] The string to verify.
 * @return {boolean} Returns `true` if `string` is numeric or `false` otherwise.
 * @example
 * v.isNumeric('350');
 * // => true
 *
 * v.isNumeric('-20.5');
 * // => true
 *
 * v.isNumeric('NaN');
 * // => false
 */
export default function(string) {
  var valueNumeric = typeof string === 'object' && string != null ? Number(string) : string;
  return (typeof valueNumeric === 'number' || typeof valueNumeric === 'string')
    && !isNaN(valueNumeric - parseFloat(valueNumeric));
}