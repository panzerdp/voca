import isNil from '../object/is_nil';

/**
 * Get the number representation of the `value`.
 * Converts the `value` to a number.
 * If `value` is `null` or `undefined`, return `defaultValue`.
 *
 * @ignore
 * @function toNumber
 * @param  {*} value            The value to convert.
 * @param  {*} [defaultValue=0] The default value.
 * @return {number|null}        Returns the number representation of `value` or `defaultValue` if `value` is `null` or `undefined`.
 */
export default function(value, defaultValue = 0) {
  if (isNil(value)) {
    return defaultValue;
  }
  return Number(value);
}