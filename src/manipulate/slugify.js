import coerceToString from 'helper/string/coerce_to_string';
import kebabCase from 'case/kebab_case';
import latinise from 'manipulate/latinise';
import { REGEXP_NON_LATIN } from 'helper/reg_exp/const';

/**
 * Slugifies the `subject`. Cleans the `subject` by replacing diacritics with corresponding latin characters.
 *
 * @function slugify
 * @static
 * @since 1.0.0
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to slugify.
 * @return {string} Returns the slugified string.
 * @example
 * v.slugify('Italian cappuccino drink');
 * // => 'italian-cappuccino-drink'
 *
 * v.slugify('caffé latté');
 * // => 'caffe-latte'
 *
 * v.slugify('хорошая погода');
 * // => 'horoshaya-pogoda'
 */
export default function slugify(subject) {
  const subjectString = coerceToString(subject);
  if (subjectString === '') {
    return '';
  }
  const cleanSubjectString = latinise(subjectString).replace(REGEXP_NON_LATIN, '-');
  return kebabCase(cleanSubjectString);
}