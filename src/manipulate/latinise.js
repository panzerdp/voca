import toString from '../utils/string/to_string';
import nilDefault from '../utils/undefined/nil_default';
import diacriticMap from '../utils/string/diacritics_map';
import { REGEXP_NOT_BASIC_LATIN, REGEXP_COMBINING_MARKS } from '../utils/regexp';

/**
 * Removes the diacritics from `character`.
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
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to latinise.
 * @return {string} Returns the latinised string.
 * @example
 * v.latinise('cafe\u0301'); // or 'café'
 * // => 'cafe'
 *
 * v.latinise('août décembre');
 * // => 'aout decembre'
 */
export default function(subject) {
  var subjectString = toString(nilDefault(subject, ''));
  if (subjectString === '') {
    return subjectString;
  }
  return subjectString
    .replace(REGEXP_NOT_BASIC_LATIN, removeDiacritics)
    .replace(REGEXP_COMBINING_MARKS, removeCombiningMarks);
}