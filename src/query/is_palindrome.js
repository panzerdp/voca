import toString from '../helper/string/to_string';

/**
 * Checks whether `subject` is palindrome.
 *
 * @function isPalindrome
 * @static
 * @since 1.5.0
 * @memberOf Query
 * @param {string} [subject=''] The string to verify.
 * @return {boolean} Returns `true` if `subject` is palindrome or `false` otherwise.
 * @example
 * v.isPalindrome('Madam');
 * // => true
 *
 * v.isPalindrome('I do, do I?');
 * // => true
 *
 * v.isPalindrome('Rotator!');
 * // => true
 *
 * v.isPalindrome('I am not palindrome, am I?');
 * // => false
 */
export default function isPalindrome(subject) {
  if(subject == null) {
    return false;
  }
  const subjectStandardized = toString(subject).replace(/[^A-Z0-9]/ig, '').toLowerCase();
  return subjectStandardized.split('').reverse().join('') === subjectStandardized;
}
