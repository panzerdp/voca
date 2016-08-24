import isNil from '../object/is_nil';

/**
 * Converts the `value` to a boolean.
 *
 * @ignore
 * @function toBoolean
 * @param {*} value                      The value to convert.
 * @param {boolean} [defaultValue=false] The default value.
 * @return {boolean}                     Returns `true` if `value` is truthy or `false` otherwise.
 */
export default function(value, defaultValue = false) {
  if (isNil(value)) {
    return defaultValue;
  }
  return Boolean(value);
}