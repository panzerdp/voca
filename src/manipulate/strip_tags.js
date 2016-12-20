/* eslint-disable */
import coerceToString from 'helper/string/coerce_to_string';
import isNil from 'helper/object/is_nil';
import toString from 'helper/string/to_string';
import trimLeft from 'manipulate/trim_left';
import trimRight from 'manipulate/trim_right';

/**
 * Strips HTML tags from `subject`.
 *
 * @function stripTags
 * @static
 * @since 1.1.0
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to strip.
 * @param {string|string[]} [allowableTags] The string or array of tags that should not be stripped.
 * @param {string} [replacement=''] The string to replace the stripped tag.
 * @return {string} Returns the stripped string.
 * @example
 * v.trim(' Mother nature ');
 * // => 'Mother nature'
 *
 * v.trim('--Earth--', '-');
 * // => 'Earth'
 */
export default function trim(subject, allowableTags, replacement) {
  let subjectString = coerceToString(subject);
  let allowableTagsList;
  //if ()
  let replacementString = coerceToString(replacement);
  return '';
}