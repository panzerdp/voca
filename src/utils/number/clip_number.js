/**
 * Clip the number to interval `downLimit` to `upLimit`
 * @param {number} value The number to clip
 * @param {number} downLimit The down limit
 * @param {number} upLimit The upper limit
 * @return {number} The clip result number
 */

export default function(value, downLimit, upLimit) {
  if (isNaN(value)) {
    return value;
  }
  if (value <= downLimit) {
    return downLimit;
  }
  if (value >= upLimit) {
    return upLimit;
  }
  return value;
}