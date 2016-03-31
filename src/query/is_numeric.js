import toString from '../utils/to_string'
import undefinedDefault from '../utils/undefined_default';

/**
 * Checks if `string` is numeric.
 * @param {string} [string=''] The string to verify.
 * @return {boolean} Returns `true` if `string` is numeric, `false` otherwise.
 */
export default function(string) {
  var valueNumeric = string;
  if (typeof string === 'object' && string != null) {
    valueNumeric = Number(string);
  }
  return (typeof valueNumeric === 'number' || typeof valueNumeric === 'string')
    && !isNaN(valueNumeric - parseFloat(valueNumeric));
}