import isNil from 'helper/object/is_nil';

/**
 * Get the number representation of the `value`.
 * Converts the `value` to a number.
 * If `value` is `null` or `undefined`, return `null`.
 *
 * @ignore
 * @function toNumber
 * @param  {*} value            The value to convert.
 * @return {number|null}        Returns the number representation of `value` or `null` if `value` is `null` or `undefined`.
 */
export default function toNumber(value) {
  if (isNil(value)) {
    return null;
  }
  return Number(value);
}