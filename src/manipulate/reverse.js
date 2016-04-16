import toString from '../utils/string/to_string'
import nilDefault from '../utils/undefined/nil_default';
import isNil from '../utils/object/is_nil';
import trimLeft from './trim_left';
import trimRight from './trim_right';

/**
 * Reverse the `subject`.
 *
 * @function trim
 * @static
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to reverse.
 * @return {string} Returns the reversed string.
 * @example
 * v.reverse('winter');
 * // => 'retniw'
 */
export default function(subject) {
  var subjectString = toString(nilDefault(subject, ''));
  return Array.prototype.call.reduceRight(subjectString, function(reversedString, currentCharacter) {
    return reversedString + currentCharacter;
  }, '');
}