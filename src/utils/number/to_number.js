import isString from '../../query/is_string';
import isNil from '../object/is_nil';

/**
 * Get the number representation of the `value`
 * Converts the `value` to a number.
 * If `value` is `null` or `undefined`, return `null`.
 * @param {*} value The value to convert.
 * @return {number|null} Returns the number representation of `value`. Returns `null` if `value` is `null` or `undefined`.
 */
export default function(value) {
  if (isNil(value)) {
    return null;
  }
  if (typeof value === 'number') {
    return value;
  }
  return Number(value);
}