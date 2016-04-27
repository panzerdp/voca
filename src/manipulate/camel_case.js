//import toString from '../utils/string/to_string';
//import toBoolean from '../utils/boolean/to_boolean';
//import nilDefault from '../utils/undefined/nil_default';
//
///**
// * Converts `subject` to camel case.
// *
// * @function camelCase
// * @static
// * @memberOf Manipulate
// * @param {string} [subject=''] The string to camel case.
// * @return {string} Returns the camel case string.
// * @example
// * v.camelCase('APPLE');
// * // => 'Apple'
// *
// * v.camcelCase('mAC', false);
// * // => 'MAC'
// */
//export default function(subject) {
//  var subjectString = toString(nilDefault(subject, '')),
//    restToLowerCaseBoolean = toBoolean(nilDefault(restToLowerCase, false));
//  if (subjectString === '') {
//    return subjectString;
//  }
//  if (restToLowerCaseBoolean) {
//    subjectString = subjectString.toLowerCase();
//  }
//  return subjectString.substr(0, 1).toUpperCase() + subjectString.substr(1);
//}