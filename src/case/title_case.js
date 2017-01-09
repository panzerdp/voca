import { REGEXP_EXTENDED_ASCII, REGEXP_LATIN_WORD, REGEXP_WORD } from 'helper/reg_exp/const_extended';
import capitalize from 'case/capitalize';
import coerceToString from 'helper/string/coerce_to_string';

/**
 * Converts the subject to title case.
 *
 * @function titleCase
 * @static
 * @since 1.1.0
 * @memberOf Case
 * @param  {string} [subject=''] The string to convert to title case.
 * @param  {Array} [ignoreWords] The words that should not be capitalized.
 * @return {string}              Returns the title case string.
 * @example
 * v.titleCase('learning to fly');
 * // => 'Learning To Fly'
 *
 * v.titleCase('another brick in the wall', ['in', 'the']);
 * // => 'Another Brick in the Wall'
 */
export default function titleCase(subject, ignoreWords) {
  const subjectString = coerceToString(subject);
  const ignoreWordsArray = Array.isArray(ignoreWords) ? ignoreWords : [];
  const wordsRegExp = REGEXP_EXTENDED_ASCII.test(subjectString) ? REGEXP_LATIN_WORD : REGEXP_WORD;
  return subjectString.replace(wordsRegExp, function(word) {
    const lowerCaseWord = word.toLowerCase();
    return ignoreWordsArray.indexOf(lowerCaseWord) !== -1 ? lowerCaseWord : capitalize(lowerCaseWord, true);
  });
}