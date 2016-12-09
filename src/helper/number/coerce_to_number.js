import isNil from 'helper/object/is_nil';

/**
 * Get the number representation of the `value`.
 * Converts the `value` to number.
 * If `value` is `null` or `undefined`, return `defaultValue`.
 *
 * @ignore
 * @function toString
 * @param {*} value             The value to convert.
 * @param {*} [defaultValue=''] The default value to return.
 * @return {number|null}        Returns the number representation of `value`. Returns `defaultValue` if `value` is
 *                              `null` or `undefined`.
 */
export default function coerceToNumber(value, defaultValue = 0) {
  if (isNil(value)) {
    return defaultValue;
  }
  if (typeof value === 'number') {
    return value;
  }
  return Number(value);
}