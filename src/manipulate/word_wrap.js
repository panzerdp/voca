import coerceToBoolean from 'helper/boolean/coerce_to_boolean';
import coerceToNumber from 'helper/number/coerce_to_number';
import coerceToString from 'helper/string/coerce_to_string';

const OPTION_WIDTH = 'width';
const OPTION_NEW_LINE = 'newLine';
const OPTION_INDENT = 'indent';
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
 * v.wordWrap('Hello world', {
 *   width: 5
 * });
 * // => 'Hello\nworld'
 *
 * v.wordWrap('Hello world', {
 *   width: 5,
 *   newLine: '<br/>',
 *   indent: '__'
 * });
 * // => '__Hello<br/>__world'
 *
 * v.wordWrap('Wonderful world', {
 *   width: 5,
 *   cut: true
 * });
 * // => 'Wonde\nrful\nworld'
 *
 */
export default function wordWrap(subject, options = {}) {
  const subjectString = coerceToString(subject);
  const { width, newLine, indent, cut } = determineOptions(options);
  if (subjectString === '' || width <= 0) {
    return indent;
  }
  const subjectLength = subjectString.length;
  const substring = subjectString.substring.bind(subjectString);
  let offset = 0;
  let wrappedLine = '';
  while ((subjectLength - offset) > width) {
    if (subjectString[offset] === ' ') {
      offset++;
      continue;
    }
    let spaceToWrapAt = subjectString.lastIndexOf(' ', width + offset);
    if (spaceToWrapAt >= offset) {
      wrappedLine += indent + substring(offset, spaceToWrapAt) + newLine;
      offset = spaceToWrapAt + 1;
    } else {
      if (cut) {
        wrappedLine += indent + substring(offset, width + offset) + newLine;
        offset += width;
      } else {
        spaceToWrapAt = subjectString.indexOf(' ', width + offset);
        if (spaceToWrapAt >= 0) {
          wrappedLine += indent + substring(offset, spaceToWrapAt) + newLine;
          offset = spaceToWrapAt + 1;
        } else {
          wrappedLine += indent + substring(offset);
          offset = subjectLength;
        }
      }
    }
  }
  if (offset < subjectLength) {
    wrappedLine += indent + substring(offset);
  }
  return wrappedLine;
}

/**
 * Determine the word wrap options. The missing values are filled with defaults.
 *
 * @param  {Object} options  The options object.
 * @return {Object}          The word wrap options, with default settings if necessary.
 * @ignore
 */
function determineOptions(options) {
  return {
    width: coerceToNumber(options[OPTION_WIDTH], 75),
    newLine: coerceToString(options[OPTION_NEW_LINE], '\n'),
    indent: coerceToString(options[OPTION_INDENT], ''),
    cut: coerceToBoolean(options[OPTION_CUT], false)
  };
}