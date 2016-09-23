import coerceToNumber from '../helper/number/coerce_to_number';
import coerceToString from '../helper/string/coerce_to_string';
import nanDefault from '../helper/number/nan_default';
import { REGEXP_UNICODE_CHARACTER } from '../helper/regular_expression/const';

/**
 * Get a grapheme from `subject` at specific index taking care of
 * <a href="http://unicode.org/glossary/#surrogate_pair">surrogate pairs</a> and
 * <a href="http://unicode.org/glossary/#combining_mark">combining marks</a>.
 *
 * @function graphemeAt
 * @static
 * @since 1.0.0
 * @memberOf Chop
 * @param  {string} [subject=''] The string to extract from.
 * @param  {number} index The index to get the character.
 * @return {string} Returns a grapheme.
 * @example
 * v.graphemeAt('\uD835\uDC00\uD835\uDC01', 0); // or '𝐀𝐁'
 * // => 'A'
 *
 * v.graphemeAt('cafe\u0301', 3); // or 'café'
 * // => 'é'
 */
export default function(subject, index) {
  var subjectString = coerceToString(subject),
    indexNumber = coerceToNumber(index),
    graphemeMatch,
    graphemeMatchIndex = 0;
  indexNumber = nanDefault(indexNumber, 0);
  while ((graphemeMatch = REGEXP_UNICODE_CHARACTER.exec(subjectString)) !== null) {
    if (graphemeMatchIndex === indexNumber) {
      REGEXP_UNICODE_CHARACTER.lastIndex = 0;
      return graphemeMatch[0];
    }
    graphemeMatchIndex++;
  }
  return '';
}