import coerceToString from 'helper/string/coerce_to_string';

/**
 * Converts the uppercase alpha caracters of `subject` to lowercase and lowercase 
 * characters to uppercase.
 *
 * @function swapCase
 * @static
 * @since 1.3.0
 * @memberOf Case
 * @param  {string} [subject=''] The string to swap the case.
 * @return {string}              Returns the converted string.
 * @example
 * v.swapCase('League of Shadows');
 * // => 'lEAGUE OF sHADOWS'
 *
 * v.swapCase('2 Bees');
 * // => '2 bEES'
 */
export default function swapCase(subject) {
  const subjectString = coerceToString(subject);
  return subjectString.split('').reduce(swapAndConcat, '');
}

function swapAndConcat(swapped, character) {
  const lowerCase = character.toLowerCase();
  const upperCase = character.toUpperCase();
  return swapped + (character === lowerCase ? upperCase : lowerCase);
}