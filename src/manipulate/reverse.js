import toString from '../utils/string/to_string'
import nilDefault from '../utils/undefined/nil_default';

var REGEXP_COMBINING_MARKS = /([\0-\u02FF\u0370-\u1AAF\u1B00-\u1DBF\u1E00-\u20CF\u2100-\uD7FF\uE000-\uFE1F\uFE30-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])([\u0300-\u036F\u1AB0-\u1AFF\u1DC0-\u1DFF\u20D0-\u20FF\uFE20-\uFE2F]+)/g,
  REGEXP_SURROGATE_PAIRS = /([\uD800-\uDBFF])([\uDC00-\uDFFF])/g;

/**
 * Reverse the `subject`.
 *
 * @function reverse
 * @static
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to reverse.
 * @return {string} Returns the reversed string.
 * @example
 * v.reverse('winter');
 * // => 'retniw'
 */
export default function reverse(subject) {
  var subjectString = toString(nilDefault(subject, ''));
  // @see https://github.com/mathiasbynens/esrever
  subjectString = subjectString
    .replace(REGEXP_COMBINING_MARKS, function($0, $1, $2) {
      return reverse($2) + $1;
    })
    .replace(REGEXP_SURROGATE_PAIRS, '$2$1');
  var reversedString = '',
    index = subjectString.length;
  while (index--) {
    reversedString += subjectString.charAt(index);
  }
  return reversedString;
}