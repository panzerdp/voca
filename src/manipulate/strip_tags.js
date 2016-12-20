/* eslint-disable */
import coerceToString from 'helper/string/coerce_to_string';
import isNil from 'helper/object/is_nil';
import toString from 'helper/string/to_string';
import trimLeft from 'manipulate/trim_left';
import trimRight from 'manipulate/trim_right';

const STATE_OUTPUT = 0;
const STATE_INSIDE_TAG = 1;

/**
 * Strips HTML tags from `subject`.
 *
 * @function stripTags
 * @static
 * @since 1.1.0
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to strip.
 * @param {string|string[]} [allowableTags] The array or string of tags that should not be stripped.
 * @return {string} Returns the stripped string.
 * @example
 * v.trim(' Mother nature ');
 * // => 'Mother nature'
 *
 * v.trim('--Earth--', '-');
 * // => 'Earth'
 */
export default function trim(subject, allowableTags) {
  return '';
}