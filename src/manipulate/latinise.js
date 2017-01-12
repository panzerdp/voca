import { REGEXP_COMBINING_MARKS, REGEXP_NON_LATIN } from 'helper/reg_exp/const';
import coerceToString from 'helper/string/coerce_to_string';
import { getLatinCharacter } from 'helper/string/diacritics_map';

/**
 * Returns the `cleanCharacter` from combining marks regular expression match.
 *
 * @ignore
 * @param {string} character The character with combining marks
 * @param {string} cleanCharacter The character without combining marks.
 * @return {string} The character without combining marks.
 */
function removeCombiningMarks(character, cleanCharacter) {
  return cleanCharacter;
}

/**
 * Latinises the `subject` by removing diacritic characters.
 *
 * @function latinise
 * @static
 * @since 1.0.0
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to latinise.
 * @return {string} Returns the latinised string.
 * @example
 * v.latinise('cafe\u0301'); // or 'café'
 * // => 'cafe'
 *
 * v.latinise('août décembre');
 * // => 'aout decembre'
 *
 * v.latinise('как прекрасен этот мир');
 * // => 'kak prekrasen etot mir'
 */
export default function latinise(subject) {
  const subjectString = coerceToString(subject);
  if (subjectString === '') {
    return '';
  }
  return subjectString
    .replace(REGEXP_NON_LATIN, getLatinCharacter)
    .replace(REGEXP_COMBINING_MARKS, removeCombiningMarks);
}