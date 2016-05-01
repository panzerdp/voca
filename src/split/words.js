import toString from '../utils/string/to_string';
import nilDefault from '../utils/undefined/nil_default';
import isNil from '../utils/object/is_nil';
import { REGEXP_WORD } from '../utils/regexp';

/**
 * Splits `subject` into an array of words.
 *
 * @function words
 * @static
 * @memberOf Split
 * @param {string} [subject=''] The string to split into words.
 * @param {string|RegExp} [pattern] The pattern to watch words. If `pattern` is not RegExp, it is transformed to `new RegExp(pattern, flags)`.
 * @param {string} [flags=''] The regular expression flags. Applies when `pattern` is string type.
 * @return {Array} Returns the array of words.
 * @example
 * v.words('gravity can cross dimensions');
 * // => ['gravity', 'can', 'cross', 'dimensions']
 *
 * v.words('gravity', /\w{1,2}/g);
 * // => ['gr', 'av', 'it', 'y']
 */
export default function(subject, pattern, flags) {
  var subjectString = toString(nilDefault(subject, '')),
    patternRegExp;
  if (isNil(pattern)) {
    patternRegExp = REGEXP_WORD;
  } else if (pattern instanceof RegExp) {
    patternRegExp = pattern;
  } else {
    var flagsString = toString(nilDefault(flags, ''));
    patternRegExp = new RegExp(toString(pattern), flagsString);
  }
  return nilDefault(subjectString.match(patternRegExp), []);
}