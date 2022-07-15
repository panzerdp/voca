import { REGEXP_EXTENDED_ASCII, REGEXP_LATIN_WORD, REGEXP_WORD } from 'helper/reg_exp/const_extended';
import capitalize from 'case/capitalize';
import coerceToString from 'helper/string/coerce_to_string';
import coerceToBoolean from 'helper/boolean/coerce_to_boolean';

/**
 * Converts the subject to title case.
 *
 * @function titleCase
 * @static
 * @since 1.4.0
 * @memberOf Case
 * @param  {string} [subject=''] The string to convert to title case.
 * @param  {Array}  [noSplit]    Do not split words at the specified characters.
 * @param  {boolean} [preserveUpperCase=false] preserve uppercases.
 * @return {string}              Returns the title case string.
 * @example
 * v.titleCase('learning to fly');
 * // => 'Learning To Fly'
 *
 * v.titleCase('XMLHttpRequest', true);
 * // => 'XMLHttpRequest'
 *
 * v.titleCase('jean-luc is good-looking', ['-']);
 * // => 'Jean-luc Is Good-looking'
 */
export default function titleCase(subject, noSplit, preserveUpperCase) {
  const subjectString = coerceToString(subject);
  const noSplitArray = Array.isArray(noSplit) ? noSplit : [];
  const preserveUpperCaseBoolean = coerceToBoolean(preserveUpperCase);
  const wordsRegExp = REGEXP_EXTENDED_ASCII.test(subjectString) ? REGEXP_LATIN_WORD : REGEXP_WORD;
  return subjectString.replace(wordsRegExp, function(word, index) {
    const isNoSplit = index > 0 && noSplitArray.indexOf(subjectString[index - 1]) >= 0;
    return isNoSplit ? word.toLowerCase() : capitalize(word, !preserveUpperCaseBoolean);
  });
}
