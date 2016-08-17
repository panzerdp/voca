import { MAX_SAFE_INTEGER } from './const';

/**
 * Transforms `value` to an integer.
 *
 * @ignore
 * @function toInteger
 * @param {number} value The number to transform.
 * @returns {number} Returns the transformed integer.
 */
export default function(value) {
  if (value === Infinity) {
    return MAX_SAFE_INTEGER;
  }
  if (value === -Infinity) {
    return - MAX_SAFE_INTEGER;
  }
  return ~~value;
}