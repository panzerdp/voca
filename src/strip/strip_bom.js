import coerceToString from 'helper/string/coerce_to_string';

const BYRE_ORDER_MARK = '\uFEFF';

/**
 * Strips the byte order mark (BOM) from the beginning of `subject`.
 *
 * @function stripBom
 * @static
 * @since 1.2.0
 * @memberOf Strip
 * @param {string} [subject=''] The string to strip from.
 * @return {string} Returns the stripped string.
 * @example
 *
 * v.stripBom('\uFEFFsummertime sadness');
 * // => 'summertime sadness'
 *
 * v.stripBom('summertime happiness');
 * // => 'summertime happiness'
 *
 */
export default function trim(subject) {
  const subjectString = coerceToString(subject);
  if (subjectString === '') {
    return '';
  }
  if (subjectString[0] === BYRE_ORDER_MARK) {
    return subjectString.substring(1);
  }
  return subjectString;
}