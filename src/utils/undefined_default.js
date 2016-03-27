/**
 * Return the defaultValue if the value is undefined
 * @param value
 * @param defaultValue
 * @returns {*}
 */
export default function (value, defaultValue) {
  if (typeof value === 'undefined') {
    return defaultValue;
  }
  return value;
}