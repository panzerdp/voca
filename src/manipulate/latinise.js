import toString from '../utilities/string/coerce_to_string';
import nilDefault from '../utilities/undefined/nil_default';
import diacriticMap from '../utilities/string/diacritics_map';
import { REGEXP_NON_BASIC_LATIN, REGEXP_COMBINING_MARKS } from '../utilities/string/regexp';

/**
 * Removes the diacritics from `character`.
 *
 * @ignore
 * @param {string} character The character with diacritics.
 * @returns {string} Returns the character without diacritics.
 */
function removeDiacritics(character) {
  var characterWithoutDiacritic = diacriticMap[character];
  return characterWithoutDiacritic ? characterWithoutDiacritic : character;
}

/**
 * Returns the `cleanCharacter` from combining marks regular expression match.
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
export default function(subject) {
  var subjectString = toString(nilDefault(subject, ''));
  if (subjectString === '') {
    return subjectString;
  }
  return subjectString
    .replace(REGEXP_NON_BASIC_LATIN, removeDiacritics)
    .replace(REGEXP_COMBINING_MARKS, removeCombiningMarks);
}