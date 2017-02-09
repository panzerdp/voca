/* eslint-disable */
import coerceToString from 'helper/string/coerce_to_string';
import isString from 'query/is_string';
import nilDefault from 'helper/undefined/nil_default';
import splice from 'manipulate/splice';

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
 * v.tr(':where is the birthplace of :what', {
 *   ':where': 'Africa',
 *   ':what': 'Humanity'
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
  if (from.length === 0) {
    return subjectString;
  }
  let result = '';
  for (let index = 0; index < subjectString.length; index++) {
    let isMatch = false;
    let matchValue;
    for (let keyIndex = 0; keyIndex < keys.length; keyIndex++) {
      const key = keys[keyIndex];
      if (subjectString.substr(i, key.length) === key) {
        isMatch = true;
        matchValue = values[keyIndex];
        index = index + key.length - 1;
        break;
      }
    }
    result += isMatch ? matchValue : subjectString[index];
  }
  return result;
}

function extractKeysAndValues(object) {
  const keys = Object.keys(object);
  const values = keys.map(function (key) {
    return object[key];
  });
  return [keys, values];
}