import coerceToString from 'helper/string/coerce_to_string';
import hasSubstringAtIndex from 'helper/string/has_substring_at_index';
import parseTagList from 'helper/strip/parse_tag_list';
import parseTagName from 'helper/strip/parse_tag_name';

const STATE_OUTPUT = 0;
const STATE_HTML = 1;
const STATE_EXCLAMATION = 2;
const STATE_COMMENT = 3;

/**
 * Strips HTML tags from `subject`.
 *
 * @function stripTags
 * @static
 * @since 1.1.0
 * @memberOf Strip
 * @param {string} [subject=''] The string to strip from.
 * @param {string|Array} [allowableTags] The string `'<tag1><tag2>'` or array `['tag1', 'tag2']` of tags that should not be stripped.
 * @param {string} [replacement=''] The string to replace the stripped tag.
 * @return {string} Returns the stripped string.
 * @example
 *
 * v.stripTags('<span><a href="#">Summer</a> is nice</span>');
 * // => 'Summer is nice'
 *
 * v.stripTags('<span><i>Winter</i> is <b>cold</b></span>', ['b', 'i']);
 * // => '<i>Winter</i> is <b>cold</b>'
 *
 * v.stripTags('Sun<br/>set', '', '-');
 * // => 'Sun-set'
 */
export default function trim(subject, allowableTags, replacement) {
  subject = coerceToString(subject);
  if (subject === '') {
    return '';
  }
  if (!Array.isArray(allowableTags)) {
    const allowableTagsString = coerceToString(allowableTags);
    allowableTags = allowableTagsString === '' ? [] : parseTagList(allowableTagsString);
  }
  const replacementString = coerceToString(replacement);
  const length = subject.length;
  const hasAllowableTags = allowableTags.length > 0;
  const hasSubstring = hasSubstringAtIndex.bind(null, subject);
  let state = STATE_OUTPUT;
  let depth = 0;
  let output = '';
  let tagContent = '';
  let quote = null;
  for (let index = 0; index < length; index++) {
    const char = subject[index];
    let advance = false;
    switch (char) {
      case '<':
        if (quote) {
          break;
        }
        if (hasSubstring('< ', index, false)) {
          advance = true;
          break;
        }
        if (state === STATE_OUTPUT) {
          advance = true;
          state = STATE_HTML;
          break;
        }
        if (state === STATE_HTML) {
          depth++;
          break;
        }
        advance = true;
        break;
      case '!':
        if (state === STATE_HTML && hasSubstring('<!', index)) {
          state = STATE_EXCLAMATION;
          break;
        }
        advance = true;
        break;
      case '-':
        if (state === STATE_EXCLAMATION && hasSubstring('!--', index)) {
          state = STATE_COMMENT;
          break;
        }
        advance = true;
        break;
      case '"':
      case "'":
        if (state === STATE_HTML) {
          if (quote === char) {
            quote = null;
          } else if (!quote) {
            quote = char;
          }
        }
        advance = true;
        break;
      case 'E':
      case 'e':
        if (state === STATE_EXCLAMATION && hasSubstring('doctype', index)) {
          state = STATE_HTML;
          break;
        }
        advance = true;
        break;
      case '>':
        if (depth > 0) {
          depth--;
          break;
        }
        if (quote) {
          break;
        }
        if (state === STATE_HTML) {
          quote = null;
          state = STATE_OUTPUT;
          if (hasAllowableTags) {
            tagContent += '>';
            const tagName = parseTagName(tagContent);
            if (allowableTags.indexOf(tagName.toLowerCase()) !== -1) {
              output += tagContent;
            } else {
              output += replacementString;
            }
            tagContent = '';
          } else {
            output += replacementString;
          }
          break;
        }
        if (state === STATE_EXCLAMATION || state === STATE_COMMENT && hasSubstring('-->', index)) {
          quote = null;
          state = STATE_OUTPUT;
          tagContent = '';
          break;
        }
        advance = true;
        break;
      default:
        advance = true;
    }
    if (advance) {
      switch (state) {
        case STATE_OUTPUT:
          output += char;
          break;
        case STATE_HTML:
          if (hasAllowableTags) {
            tagContent += char;
          }
          break;
      }
    }
  }
  return output;
}