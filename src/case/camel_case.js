import toString from '../utils/string/to_string';
import nilDefault from '../utils/undefined/nil_default';
import words from '../split/words';
import capitalize from '../case/capitalize';
import lowerCase from '../case/lower_case';

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
  return words(subjectString).map(function(word, index) {
    return index === 0 ? lowerCase(word) : capitalize(word, true);
  }).join('');
}