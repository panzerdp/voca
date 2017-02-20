import coerceToString from 'helper/string/coerce_to_string';
import isString from 'query/is_string';
import nilDefault from 'helper/undefined/nil_default';

/**
 * Translates characters or replaces substrings in `subject`.
 *
 * @function tr
 * @static
 * @since 1.3.0
 * @memberOf Manipulate
 * @param  {string} [subject=''] The string to translate.
 * @param  {string|Object} from The string of characters to translate from. Or an object, then the object keys are replaced with corresponding values (longest keys are tried first).
 * @param  {string} to The string of characters to translate to. Ignored when `from` is an object.
 * @return {string} Returns the translated string.
 * @example
 * v.tr('hello', 'el', 'ip');
 * // => 'hippo'
 * 
 * v.tr('légèreté', 'éè', 'ee');
 * // => 'legerete'
 * 
 * v.tr('Yes. The fire rises.', {
 *   'Yes': 'Awesome',
 *   'fire': 'flame'
 * })
 * // => 'Awesome. The flame rises.'
 * 
 * v.tr(':where is the birthplace of :what', {
 *   ':where': 'Africa',
 *   ':what': 'Humanity'
 * });
 * // => 'Africa is the birthplace of Humanity'
 * 
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
  const keysLength = keys.length;
  if (keysLength === 0) {
    return subjectString;
  }
  let result = '';
  const valuesLength = values.length;
  for (let index = 0; index < subjectString.length; index++) {
    let isMatch = false;
    let matchValue;
    for (let keyIndex = 0; keyIndex < keysLength && keyIndex < valuesLength; keyIndex++) {
      const key = keys[keyIndex];
      if (subjectString.substr(index, key.length) === key) {
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
  const values = keys.sort(sortStringByLength).map(function (key) {
    return object[key];
  });
  return [keys, values];
}

function sortStringByLength(str1, str2) {
  if (str1.length === str2.length) {
    return 0;
  }
  return str1.length < str2.length ? 1 : -1;
}