import toString from '../utilities/string/to_string';
import nilDefault from '../utilities/undefined/nil_default';
import words from '../split/words';
import lowerCase from '../case/lower_case';

/**
 * Converts the `subject` to <a href="https://en.wikipedia.org/wiki/Letter_case#cite_ref-13">kebab case</a>.
 * Also called <i>spinal case</i> or <i>lisp case</i>.
 *
 * @function kebabCase
 * @static
 * @memberOf Case
 * @param {string} [subject=''] The string to convert to kebab case.
 * @return {string} The kebab case string.
 * @example
 * v.kebabCase('goodbye blue sky');
 * // => 'goodbye-blue-sky'
 *
 * v.kebabCase('GoodbyeBlueSky');
 * // => 'goodbye-blue-sky'
 *
 * v.kebabCase('-Goodbye-Blue-Sky-');
 * // => 'goodbye-blue-sky'
 */
export default function(subject) {
  var subjectString = toString(nilDefault(subject, ''));
  if (subjectString === '') {
    return '';
  }
  return words(subjectString).map(lowerCase).join('-');
}