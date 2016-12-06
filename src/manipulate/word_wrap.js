import coerceToBoolean from 'helper/boolean/coerce_to_boolean';
import coerceToNumber from 'helper/number/coerce_to_number';
import coerceToString from 'helper/string/coerce_to_string';
import nilDefault from 'helper/undefined/nil_default';

const OPTION_WIDTH = 'width';
const OPTION_NEW_LINE = 'new_line';
// const OPTION_INDENT = 'indent';
const OPTION_CUT = 'cut';

/**
 * Wraps `subject` to a given number of characters using a string break character.
 *
 * @function wordWrap
 * @static
 * @since 1.0.0
 * @memberOf Manipulate
 * @param  {string} [subject=''] The string to wrap.
 * @param  {Object} [options={}] The wrap options.
 * @param  {number} [options.width=75] The number of characters at which to wrap.
 * @param  {string} [options.newLine='\n'] The string to add at the end of line.
 * @param  {string} [options.indent='']  The string to intend the line.
 * @param  {boolean} [options.cut=false] When `false` (default) does not split the word even if word length is bigger than `width`. <br/>
 *                                       When `true` breaks the word that has length bigger than `width`.
 *
 * @return {string} Returns wrapped string.
 * @example
 * v.countSubstrings('bad boys, bad boys whatcha gonna do?', 'boys');
 * // => 2
 *
 * v.countSubstrings('every dog has its day', 'cat');
 * // => 0
 */
export default function wordWrap(subject, options) {
  const subjectString = coerceToString(subject);
  if (subjectString === '') {
    return subjectString;
  }
  options = nilDefault(options, {});
  const width = coerceToNumber(options[OPTION_WIDTH], 75);
  const newLine = coerceToString(options[OPTION_NEW_LINE], '\n');
  //const indent = coerceToString(options[OPTION_INDENT], '');
  const cut = coerceToBoolean(options[OPTION_CUT], false);

  const inputLineLength = subjectString.length;
  let offset = 0;
  let wrappedLine = '';

  while ((inputLineLength - offset) > width) {
    if (subjectString[offset] === ' ') {
      offset++;
      continue;
    }
    let spaceToWrapAt = subjectString.lastIndexOf(' ', width + offset);
    if (spaceToWrapAt >= offset) {
      wrappedLine += subjectString.substring(offset, spaceToWrapAt) + newLine;
      offset = spaceToWrapAt + 1;
    } else {
      if (cut) {
        wrappedLine += subjectString.substring(offset, width + offset) + newLine;
        offset += width;
      } else {
        spaceToWrapAt = subjectString.indexOf(' ', width + offset);
        if (spaceToWrapAt >= 0) {
          wrappedLine += subjectString.substring(offset, spaceToWrapAt) + newLine;
          offset = spaceToWrapAt + 1;
        } else {
          wrappedLine += subjectString.substring(offset);
          offset = inputLineLength;
        }
      }
    }
  }
  wrappedLine += subjectString.substring(offset);
  return wrappedLine;
}