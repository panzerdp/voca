import isNil from 'helper/object/is_nil';

/**
 * Converts the `value` to a boolean. If `value` is `undefined` or `null`, returns `defaultValue`.
 *
 * @ignore
 * @function toBoolean
 * @param {*} value The value to convert.
 * @param {boolean} [defaultValue=false] The default value.
 * @return {boolean} Returns the coercion to boolean.
 */
export default function coerceToBoolean(value, defaultValue = false) {
  if (isNil(value)) {
    return defaultValue;
  }
  return Boolean(value);
}