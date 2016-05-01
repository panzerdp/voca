//import toString from '../utils/string/to_string';
//import nilDefault from '../utils/undefined/nil_default';
//import { REGEXP_COMBINING_MARKS, REGEXP_SURROGATE_PAIRS } from '../utils/regexp';
//
///**
// * Splits `subject` into an array of characters taking care of
// * <a href="http://www.unicode.org/faq/utf_bom.html#utf16-2">surrogate pairs</a> and
// * <a href="http://unicode.org/faq/char_combmark.html">combining marks</a>.
// *
// * @function charsCodePoint
// * @static
// * @memberOf Split
// * @param {string} [subject=''] The string to split into characters.
// * @return {Array} Returns the array of characters.
// * @example
// * v.chars('cloud');
// * // => ['c', 'l', 'o', 'u', 'd']
// */
//export default function(subject) {
//  var subjectString = toString(nilDefault(subject, ''));
//  return subjectString.split('');
//}