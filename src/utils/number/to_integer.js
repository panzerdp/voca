/**
 * Transforms `value` to an integer
 * @param {number} value The number to transform
 * @returns {number} Returns the transformed integer
 */
export default function(value) {
  if (isNaN(value)) {
    return value;
  }
  if (value === Infinity) {
    return Number.MAX_SAFE_INTEGER;
  }
  if (value === -Infinity) {
    return - Number.MAX_SAFE_INTEGER;
  }
  return ~~value;
}