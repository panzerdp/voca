/**
 * Compute the flags string based on regular expression flag properties.
 *
 * @ignore
 * @param {RegExp} regExp The regular expression object.
 * @return {string} Returns the string with flags chars.
 */
export default function getRegularExpressionFlags(regExp) {
  return regExp.toString().match(/[gimuy]*$/)[0];
}