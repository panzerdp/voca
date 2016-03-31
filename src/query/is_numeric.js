import toString from '../utils/to_string'
import undefinedDefault from '../utils/undefined_default';

/**
 * Checks if `string` is numeric.
 * @param {string} [string=''] The string to verify.
 * @return {boolean} Returns `true` if `string` is numeric, `false` otherwise.
 */
export default function(string) {
  var numericValue = string;
  if (typeof string === 'object' && string != null) {
    numericValue = Number(string);
  }
  return (typeof numericValue === 'number' || typeof numericValue === 'string')
    && !isNaN(numericValue - parseFloat(numericValue));
}