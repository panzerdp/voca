/**
 * Checks if `string` is numeric.
 *
 * @function isNumeric
 * @static
 * @memberOf v
 * @category Query
 * @param {string} [string=''] The string to verify.
 * @return {boolean} Returns `true` if `string` is numeric, `false` otherwise.
 */
export default function(string) {
  var valueNumeric = typeof string === 'object' && string != null ? Number(string) : string;
  return (typeof valueNumeric === 'number' || typeof valueNumeric === 'string')
    && !isNaN(valueNumeric - parseFloat(valueNumeric));
}