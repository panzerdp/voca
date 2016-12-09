import capitalize from 'case/capitalize';
import coerceToString from 'helper/string/coerce_to_string';
import lowerCase from 'case/lower_case';
import words from 'split/words';

/**
 * Transforms the `word` into camel case chunk.
 *
 * @param  {string} word  The word string
 * @param  {number} index The index of the word in phrase.
 * @return {string}       The transformed word.
 * @ignore
 */
function wordToCamel(word, index) {
  return index === 0 ? lowerCase(word) : capitalize(word, true);
}

/**
 * Converts the `subject` to <a href="https://en.wikipedia.org/wiki/CamelCase">camel case</a>.
 *
 * @function camelCase
 * @static
 * @since 1.0.0
 * @memberOf Case
 * @param  {string} [subject=''] The string to convert to camel case.
 * @return {string}              The camel case string.
 * @example
 * v.camelCase('bird flight');
 * // => 'birdFlight'
 *
 * v.camelCase('BirdFlight');
 * // => 'birdFlight'
 *
 * v.camelCase('-BIRD-FLIGHT-');
 * // => 'birdFlight'
 */
export default function camelCase(subject) {
  const subjectString = coerceToString(subject);
  if (subjectString === '') {
    return '';
  }
  return words(subjectString).map(wordToCamel).join('');
}