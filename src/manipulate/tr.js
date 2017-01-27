/* eslint-disable */
import coerceToString from 'helper/string/coerce_to_string';
import isString from 'query/is_string';
import nilDefault from 'helps/undefined/nil_default';

/**
 * Translates characters or replaces substrings in `subject`.
 *
 * @function tr
 * @static
 * @since 1.3.0
 * @memberOf Manipulate
 * @param  {string} [subject=''] The string to translate.
 * @param  {string|Object} from The string of characters to translate from. Or an object, then the object keys are replaced with corresponding values.
 * @param  {string} to The string of characters to translate to. Ignored when `from` is an object.
 * @return {string} Returns the translated string.
 * @example
 * v.tr('hello', 'el', 'ip');
 * // => 'hippo'
 * 
 * v.tr(':where is the birthplace of :who', {
 *   ':where': 'Africa',
 *   ':who': 'Humanity'
 * });
 * // => 'Africa is the birthplace of Humanity'
 */
export default function tr(subject, from, to) {
  const subjectString = coerceToString(subject);
  let keys;
  let values;
  if (isString(from) && isString(to)) {
    keys = from.split('');
    values = to.split('');
  } else {
    [keys, values] = extractKeysAndValues(nilDefault(from, {}));
  }
  
}

function extractKeysAndValues(object) {
  const keys = Object.keys(object);
  const values = keys.map(function(key) {
    return object[key];
  });
  return [keys, values];
}