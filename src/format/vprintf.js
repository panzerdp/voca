import sprintf from './sprintf';
import nilDefault from '../utils/undefined/nil_default';

/**
 * Produces a string according to `format`. Works exactly like <a href="#sprintf"><code>sprintf()</code></a>,
 * with the only difference that accepts the formatting arguments in an array `values`.<br/>
 * See <a href="#sprintf-format">here</a> `format` string specifications.
 *
 * @function vprintf
 * @static
 * @memberOf Format
 * @param  {string}                [format=''] The format string.
 * @param  {Array.<number|string>} values      The array of values to produce the string.
 * @return {string}                            Returns the produced string.
 * @example
 * vprintf('%s', ['Welcome'])
 * // => 'Welcome'
 *
 * vprintf('%s costs $%.2f', ['Coffee', 1.5]);
 * // => 'Coffee costs $1.50'
 */
export default function(format, values) {
  return sprintf(format, ...nilDefault(values, []));
}