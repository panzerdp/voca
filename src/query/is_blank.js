import toString from '../utils/to_string';
import undefinedDefault from '../utils/undefined_default';
import isEmpty from './is_empty';

/**
 * Checks if `value` is empty or contains only whitespaces
 * @param {string} [value=''] The string to verify.
 * @return {boolean} Returns `true` if `value` is empty or contains only whitespaces, `false` otherwise
 */
export default function(value) {
  value = undefinedDefault(value, '');
  var string = toString(value);
  if (string === null) {
    return true;
  }
  return string.trim().length === 0;
}