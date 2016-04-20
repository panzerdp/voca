import toString from '../utils/string/to_string';
import nilDefault from '../utils/undefined/nil_default';
import getCharWithoutDiacritic from '../utils/string/clear_diacritic';
import { REGEXP_NOT_BASIC_LATIN } from '../utils/regexp';


/**
 * Removes the diacritics from `character`.
 * @param {string} character The character with diacritics.
 * @returns {string} Returns the character without diacritics.
 */
function removeDiacritics(character) {
  var characterWithoutDiacritic = getCharWithoutDiacritic(character);
  return characterWithoutDiacritic ? characterWithoutDiacritic : character;
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
 */
export default function(subject) {
  var subjectString = toString(nilDefault(subject, ''));
  if (subjectString === '') {
    return subjectString;
  }
  return subjectString.replace(REGEXP_NOT_BASIC_LATIN, removeDiacritics);
}