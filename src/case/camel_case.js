import toString from '../utils/string/to_string';
import nilDefault from '../utils/undefined/nil_default';
import words from '../split/words';
import capitalize from '../case/capitalize';
import lowerCase from '../case/lower_case';

/**
 * Transforms the `word` into camel case chunk.
 *
 * @param {string} word The word string
 * @param {number} index The index of the word in phrase.
 * @returns {string} The transformed word.
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
 * @memberOf Case
 * @param {string} [subject=''] The string to convert to camel case.
 * @return {string} The camel case string.
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
export default function(subject) {
  var subjectString = toString(nilDefault(subject, ''));
  if (subjectString === '') {
    return '';
  }
  return words(subjectString).map(wordToCamel).join('');
}