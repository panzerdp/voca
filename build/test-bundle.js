'use strict';

var chai = require('chai');

require("source-map-support").install();

var babelHelpers = {};
babelHelpers.typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
};
babelHelpers;

/**
 * Checks if `subject` is a string primitive type.
 *
 * @function isString
 * @static
 * @memberOf Query
 * @param {string} subject The value to verify.
 * @return {boolean} Returns `true` if `subject` is string primitive type or `false` otherwise.
 * @example
 * v.isString('vacation');
 * // => true
 *
 * v.isString(560);
 * // => false
 */
function isString (subject) {
  return typeof subject === 'string';
}

/**
 * Checks if `value` is `null` or `undefined`
 *
 * @ignore
 * @function isNil
 * @param {*} value The object to check
 * @return {boolean} Returns `true` is `value` is `undefined` or `null`, `false` otherwise
 */
function isNil(value) {
  return value === undefined || value === null;
}

/**
 * Get the string representation of the `value`
 * Converts the `value` to string.
 * If `value` is `null` or `undefined`, return `null`.
 *
 * @ignore
 * @function toString
 * @param {*} value The value to convert.
 * @return {string|null} Returns the string representation of `value`. Returns `null` if `value` is `null` or `undefined`.
 */
function toString (value) {
  if (isNil(value)) {
    return null;
  }
  if (isString(value)) {
    return value;
  }
  return String(value);
}

/**
 * Verifies if `value` is `undefined` or `null` and returns `defaultValue`. In other case returns `value`.
 *
 * @ignore
 * @function nilDefault
 * @param {*} value The value to verify.
 * @param {*} defaultValue The default value.
 * @return {*} Returns `defaultValue` if `value` is `undefined` or `null`, otherwise `defaultValue`.
 */
function nilDefault (value, defaultValue) {
  return value == null ? defaultValue : value;
}

/**
 * A regular expression string that matches upper letter (upper case + title case)
 *
 * @type {string}
 * @ignore
 */
var upLetter = '\\u0041-\\u005a\\u00c0-\\u00d6\\u00d8-\\u00de\\u0100\\u0102\\u0104\\u0106\\u0108\\u010a\\u010c\\u010e\\u0110\\u0112\\u0114\\u0116\\u0118\\u011a\\u011c\\u011e\\u0120\\u0122\\u0124\\u0126\\u0128\\u012a\\u012c\\u012e\\u0130\\u0132\\u0134\\u0136\\u0139\\u013b\\u013d\\u013f\\u0141\\u0143\\u0145\\u0147\\u014a\\u014c\\u014e\\u0150\\u0152\\u0154\\u0156\\u0158\\u015a\\u015c\\u015e\\u0160\\u0162\\u0164\\u0166\\u0168\\u016a\\u016c\\u016e\\u0170\\u0172\\u0174\\u0176\\u0178\\u0179\\u017b\\u017d\\u0181\\u0182\\u0184\\u0186\\u0187\\u0189-\\u018b\\u018e-\\u0191\\u0193\\u0194\\u0196-\\u0198\\u019c\\u019d\\u019f\\u01a0\\u01a2\\u01a4\\u01a6\\u01a7\\u01a9\\u01ac\\u01ae\\u01af\\u01b1-\\u01b3\\u01b5\\u01b7\\u01b8\\u01bc\\u01c4\\u01c5\\u01c7\\u01c8\\u01ca\\u01cb\\u01cd\\u01cf\\u01d1\\u01d3\\u01d5\\u01d7\\u01d9\\u01db\\u01de\\u01e0\\u01e2\\u01e4\\u01e6\\u01e8\\u01ea\\u01ec\\u01ee\\u01f1\\u01f2\\u01f4\\u01f6-\\u01f8\\u01fa\\u01fc\\u01fe\\u0200\\u0202\\u0204\\u0206\\u0208\\u020a\\u020c\\u020e\\u0210\\u0212\\u0214\\u0216\\u0218\\u021a\\u021c\\u021e\\u0220\\u0222\\u0224\\u0226\\u0228\\u022a\\u022c\\u022e\\u0230\\u0232\\u023a\\u023b\\u023d\\u023e\\u0241\\u0243-\\u0246\\u0248\\u024a\\u024c\\u024e\\u0370\\u0372\\u0376\\u037f\\u0386\\u0388-\\u038a\\u038c\\u038e\\u038f\\u0391-\\u03a1\\u03a3-\\u03ab\\u03cf\\u03d2-\\u03d4\\u03d8\\u03da\\u03dc\\u03de\\u03e0\\u03e2\\u03e4\\u03e6\\u03e8\\u03ea\\u03ec\\u03ee\\u03f4\\u03f7\\u03f9\\u03fa\\u03fd-\\u042f\\u0460\\u0462\\u0464\\u0466\\u0468\\u046a\\u046c\\u046e\\u0470\\u0472\\u0474\\u0476\\u0478\\u047a\\u047c\\u047e\\u0480\\u048a\\u048c\\u048e\\u0490\\u0492\\u0494\\u0496\\u0498\\u049a\\u049c\\u049e\\u04a0\\u04a2\\u04a4\\u04a6\\u04a8\\u04aa\\u04ac\\u04ae\\u04b0\\u04b2\\u04b4\\u04b6\\u04b8\\u04ba\\u04bc\\u04be\\u04c0\\u04c1\\u04c3\\u04c5\\u04c7\\u04c9\\u04cb\\u04cd\\u04d0\\u04d2\\u04d4\\u04d6\\u04d8\\u04da\\u04dc\\u04de\\u04e0\\u04e2\\u04e4\\u04e6\\u04e8\\u04ea\\u04ec\\u04ee\\u04f0\\u04f2\\u04f4\\u04f6\\u04f8\\u04fa\\u04fc\\u04fe\\u0500\\u0502\\u0504\\u0506\\u0508\\u050a\\u050c\\u050e\\u0510\\u0512\\u0514\\u0516\\u0518\\u051a\\u051c\\u051e\\u0520\\u0522\\u0524\\u0526\\u0528\\u052a\\u052c\\u052e\\u0531-\\u0556\\u10a0-\\u10c5\\u10c7\\u10cd\\u13a0-\\u13f5\\u1e00\\u1e02\\u1e04\\u1e06\\u1e08\\u1e0a\\u1e0c\\u1e0e\\u1e10\\u1e12\\u1e14\\u1e16\\u1e18\\u1e1a\\u1e1c\\u1e1e\\u1e20\\u1e22\\u1e24\\u1e26\\u1e28\\u1e2a\\u1e2c\\u1e2e\\u1e30\\u1e32\\u1e34\\u1e36\\u1e38\\u1e3a\\u1e3c\\u1e3e\\u1e40\\u1e42\\u1e44\\u1e46\\u1e48\\u1e4a\\u1e4c\\u1e4e\\u1e50\\u1e52\\u1e54\\u1e56\\u1e58\\u1e5a\\u1e5c\\u1e5e\\u1e60\\u1e62\\u1e64\\u1e66\\u1e68\\u1e6a\\u1e6c\\u1e6e\\u1e70\\u1e72\\u1e74\\u1e76\\u1e78\\u1e7a\\u1e7c\\u1e7e\\u1e80\\u1e82\\u1e84\\u1e86\\u1e88\\u1e8a\\u1e8c\\u1e8e\\u1e90\\u1e92\\u1e94\\u1e9e\\u1ea0\\u1ea2\\u1ea4\\u1ea6\\u1ea8\\u1eaa\\u1eac\\u1eae\\u1eb0\\u1eb2\\u1eb4\\u1eb6\\u1eb8\\u1eba\\u1ebc\\u1ebe\\u1ec0\\u1ec2\\u1ec4\\u1ec6\\u1ec8\\u1eca\\u1ecc\\u1ece\\u1ed0\\u1ed2\\u1ed4\\u1ed6\\u1ed8\\u1eda\\u1edc\\u1ede\\u1ee0\\u1ee2\\u1ee4\\u1ee6\\u1ee8\\u1eea\\u1eec\\u1eee\\u1ef0\\u1ef2\\u1ef4\\u1ef6\\u1ef8\\u1efa\\u1efc\\u1efe\\u1f08-\\u1f0f\\u1f18-\\u1f1d\\u1f28-\\u1f2f\\u1f38-\\u1f3f\\u1f48-\\u1f4d\\u1f59\\u1f5b\\u1f5d\\u1f5f\\u1f68-\\u1f6f\\u1f88-\\u1f8f\\u1f98-\\u1f9f\\u1fa8-\\u1faf\\u1fb8-\\u1fbc\\u1fc8-\\u1fcc\\u1fd8-\\u1fdb\\u1fe8-\\u1fec\\u1ff8-\\u1ffc\\u2102\\u2107\\u210b-\\u210d\\u2110-\\u2112\\u2115\\u2119-\\u211d\\u2124\\u2126\\u2128\\u212a-\\u212d\\u2130-\\u2133\\u213e\\u213f\\u2145\\u2183\\u2c00-\\u2c2e\\u2c60\\u2c62-\\u2c64\\u2c67\\u2c69\\u2c6b\\u2c6d-\\u2c70\\u2c72\\u2c75\\u2c7e-\\u2c80\\u2c82\\u2c84\\u2c86\\u2c88\\u2c8a\\u2c8c\\u2c8e\\u2c90\\u2c92\\u2c94\\u2c96\\u2c98\\u2c9a\\u2c9c\\u2c9e\\u2ca0\\u2ca2\\u2ca4\\u2ca6\\u2ca8\\u2caa\\u2cac\\u2cae\\u2cb0\\u2cb2\\u2cb4\\u2cb6\\u2cb8\\u2cba\\u2cbc\\u2cbe\\u2cc0\\u2cc2\\u2cc4\\u2cc6\\u2cc8\\u2cca\\u2ccc\\u2cce\\u2cd0\\u2cd2\\u2cd4\\u2cd6\\u2cd8\\u2cda\\u2cdc\\u2cde\\u2ce0\\u2ce2\\u2ceb\\u2ced\\u2cf2\\ua640\\ua642\\ua644\\ua646\\ua648\\ua64a\\ua64c\\ua64e\\ua650\\ua652\\ua654\\ua656\\ua658\\ua65a\\ua65c\\ua65e\\ua660\\ua662\\ua664\\ua666\\ua668\\ua66a\\ua66c\\ua680\\ua682\\ua684\\ua686\\ua688\\ua68a\\ua68c\\ua68e\\ua690\\ua692\\ua694\\ua696\\ua698\\ua69a\\ua722\\ua724\\ua726\\ua728\\ua72a\\ua72c\\ua72e\\ua732\\ua734\\ua736\\ua738\\ua73a\\ua73c\\ua73e\\ua740\\ua742\\ua744\\ua746\\ua748\\ua74a\\ua74c\\ua74e\\ua750\\ua752\\ua754\\ua756\\ua758\\ua75a\\ua75c\\ua75e\\ua760\\ua762\\ua764\\ua766\\ua768\\ua76a\\ua76c\\ua76e\\ua779\\ua77b\\ua77d\\ua77e\\ua780\\ua782\\ua784\\ua786\\ua78b\\ua78d\\ua790\\ua792\\ua796\\ua798\\ua79a\\ua79c\\ua79e\\ua7a0\\ua7a2\\ua7a4\\ua7a6\\ua7a8\\ua7aa-\\ua7ad\\ua7b0-\\ua7b4\\ua7b6\\uff21-\\uff3a';

/**
 * A regular expression string that matches non letter chars. A negative list is used because it includes less characters than letters list itself.
 *
 * @type {string}
 * @ignore
 */
var nonLetter = '\\u0000-\\u0040\\u005b-\\u0060\\u007b-\\u00a9\\u00ab-\\u00b4\\u00b6-\\u00b9\\u00bb-\\u00bf\\u00d7\\u00f7\\u02c2-\\u02c5\\u02d2-\\u02df\\u02e5-\\u02eb\\u02ed\\u02ef-\\u036f\\u0375\\u0378\\u0379\\u037e\\u0380-\\u0385\\u0387\\u038b\\u038d\\u03a2\\u03f6\\u0482-\\u0489\\u0530\\u0557\\u0558\\u055a-\\u0560\\u0588-\\u05cf\\u05eb-\\u05ef\\u05f3-\\u061f\\u064b-\\u066d\\u0670\\u06d4\\u06d6-\\u06e4\\u06e7-\\u06ed\\u06f0-\\u06f9\\u06fd\\u06fe\\u0700-\\u070f\\u0711\\u0730-\\u074c\\u07a6-\\u07b0\\u07b2-\\u07c9\\u07eb-\\u07f3\\u07f6-\\u07f9\\u07fb-\\u07ff\\u0816-\\u0819\\u081b-\\u0823\\u0825-\\u0827\\u0829-\\u083f\\u0859-\\u089f\\u08b5-\\u0903\\u093a-\\u093c\\u093e-\\u094f\\u0951-\\u0957\\u0962-\\u0970\\u0981-\\u0984\\u098d\\u098e\\u0991\\u0992\\u09a9\\u09b1\\u09b3-\\u09b5\\u09ba-\\u09bc\\u09be-\\u09cd\\u09cf-\\u09db\\u09de\\u09e2-\\u09ef\\u09f2-\\u0a04\\u0a0b-\\u0a0e\\u0a11\\u0a12\\u0a29\\u0a31\\u0a34\\u0a37\\u0a3a-\\u0a58\\u0a5d\\u0a5f-\\u0a71\\u0a75-\\u0a84\\u0a8e\\u0a92\\u0aa9\\u0ab1\\u0ab4\\u0aba-\\u0abc\\u0abe-\\u0acf\\u0ad1-\\u0adf\\u0ae2-\\u0af8\\u0afa-\\u0b04\\u0b0d\\u0b0e\\u0b11\\u0b12\\u0b29\\u0b31\\u0b34\\u0b3a-\\u0b3c\\u0b3e-\\u0b5b\\u0b5e\\u0b62-\\u0b70\\u0b72-\\u0b82\\u0b84\\u0b8b-\\u0b8d\\u0b91\\u0b96-\\u0b98\\u0b9b\\u0b9d\\u0ba0-\\u0ba2\\u0ba5-\\u0ba7\\u0bab-\\u0bad\\u0bba-\\u0bcf\\u0bd1-\\u0c04\\u0c0d\\u0c11\\u0c29\\u0c3a-\\u0c3c\\u0c3e-\\u0c57\\u0c5b-\\u0c5f\\u0c62-\\u0c84\\u0c8d\\u0c91\\u0ca9\\u0cb4\\u0cba-\\u0cbc\\u0cbe-\\u0cdd\\u0cdf\\u0ce2-\\u0cf0\\u0cf3-\\u0d04\\u0d0d\\u0d11\\u0d3b\\u0d3c\\u0d3e-\\u0d4d\\u0d4f-\\u0d5e\\u0d62-\\u0d79\\u0d80-\\u0d84\\u0d97-\\u0d99\\u0db2\\u0dbc\\u0dbe\\u0dbf\\u0dc7-\\u0e00\\u0e31\\u0e34-\\u0e3f\\u0e47-\\u0e80\\u0e83\\u0e85\\u0e86\\u0e89\\u0e8b\\u0e8c\\u0e8e-\\u0e93\\u0e98\\u0ea0\\u0ea4\\u0ea6\\u0ea8\\u0ea9\\u0eac\\u0eb1\\u0eb4-\\u0ebc\\u0ebe\\u0ebf\\u0ec5\\u0ec7-\\u0edb\\u0ee0-\\u0eff\\u0f01-\\u0f3f\\u0f48\\u0f6d-\\u0f87\\u0f8d-\\u0fff\\u102b-\\u103e\\u1040-\\u104f\\u1056-\\u1059\\u105e-\\u1060\\u1062-\\u1064\\u1067-\\u106d\\u1071-\\u1074\\u1082-\\u108d\\u108f-\\u109f\\u10c6\\u10c8-\\u10cc\\u10ce\\u10cf\\u10fb\\u1249\\u124e\\u124f\\u1257\\u1259\\u125e\\u125f\\u1289\\u128e\\u128f\\u12b1\\u12b6\\u12b7\\u12bf\\u12c1\\u12c6\\u12c7\\u12d7\\u1311\\u1316\\u1317\\u135b-\\u137f\\u1390-\\u139f\\u13f6\\u13f7\\u13fe-\\u1400\\u166d\\u166e\\u1680\\u169b-\\u169f\\u16eb-\\u16f0\\u16f9-\\u16ff\\u170d\\u1712-\\u171f\\u1732-\\u173f\\u1752-\\u175f\\u176d\\u1771-\\u177f\\u17b4-\\u17d6\\u17d8-\\u17db\\u17dd-\\u181f\\u1878-\\u187f\\u18a9\\u18ab-\\u18af\\u18f6-\\u18ff\\u191f-\\u194f\\u196e\\u196f\\u1975-\\u197f\\u19ac-\\u19af\\u19ca-\\u19ff\\u1a17-\\u1a1f\\u1a55-\\u1aa6\\u1aa8-\\u1b04\\u1b34-\\u1b44\\u1b4c-\\u1b82\\u1ba1-\\u1bad\\u1bb0-\\u1bb9\\u1be6-\\u1bff\\u1c24-\\u1c4c\\u1c50-\\u1c59\\u1c7e-\\u1ce8\\u1ced\\u1cf2-\\u1cf4\\u1cf7-\\u1cff\\u1dc0-\\u1dff\\u1f16\\u1f17\\u1f1e\\u1f1f\\u1f46\\u1f47\\u1f4e\\u1f4f\\u1f58\\u1f5a\\u1f5c\\u1f5e\\u1f7e\\u1f7f\\u1fb5\\u1fbd\\u1fbf-\\u1fc1\\u1fc5\\u1fcd-\\u1fcf\\u1fd4\\u1fd5\\u1fdc-\\u1fdf\\u1fed-\\u1ff1\\u1ff5\\u1ffd-\\u2070\\u2072-\\u207e\\u2080-\\u208f\\u209d-\\u2101\\u2103-\\u2106\\u2108\\u2109\\u2114\\u2116-\\u2118\\u211e-\\u2123\\u2125\\u2127\\u2129\\u212e\\u213a\\u213b\\u2140-\\u2144\\u214a-\\u214d\\u214f-\\u2182\\u2185-\\u2bff\\u2c2f\\u2c5f\\u2ce5-\\u2cea\\u2cef-\\u2cf1\\u2cf4-\\u2cff\\u2d26\\u2d28-\\u2d2c\\u2d2e\\u2d2f\\u2d68-\\u2d6e\\u2d70-\\u2d7f\\u2d97-\\u2d9f\\u2da7\\u2daf\\u2db7\\u2dbf\\u2dc7\\u2dcf\\u2dd7\\u2ddf-\\u2e2e\\u2e30-\\u3004\\u3007-\\u3030\\u3036-\\u303a\\u303d-\\u3040\\u3097-\\u309c\\u30a0\\u30fb\\u3100-\\u3104\\u312e-\\u3130\\u318f-\\u319f\\u31bb-\\u31ef\\u3200-\\u33ff\\u4db6-\\u4dff\\u9fd6-\\u9fff\\ua48d-\\ua4cf\\ua4fe\\ua4ff\\ua60d-\\ua60f\\ua620-\\ua629\\ua62c-\\ua63f\\ua66f-\\ua67e\\ua69e\\ua69f\\ua6e6-\\ua716\\ua720\\ua721\\ua789\\ua78a\\ua7ae\\ua7af\\ua7b8-\\ua7f6\\ua802\\ua806\\ua80b\\ua823-\\ua83f\\ua874-\\ua881\\ua8b4-\\ua8f1\\ua8f8-\\ua8fa\\ua8fc\\ua8fe-\\ua909\\ua926-\\ua92f\\ua947-\\ua95f\\ua97d-\\ua983\\ua9b3-\\ua9ce\\ua9d0-\\ua9df\\ua9e5\\ua9f0-\\ua9f9\\ua9ff\\uaa29-\\uaa3f\\uaa43\\uaa4c-\\uaa5f\\uaa77-\\uaa79\\uaa7b-\\uaa7d\\uaab0\\uaab2-\\uaab4\\uaab7\\uaab8\\uaabe\\uaabf\\uaac1\\uaac3-\\uaada\\uaade\\uaadf\\uaaeb-\\uaaf1\\uaaf5-\\uab00\\uab07\\uab08\\uab0f\\uab10\\uab17-\\uab1f\\uab27\\uab2f\\uab5b\\uab66-\\uab6f\\uabe3-\\uabff\\ud7a4-\\ud7af\\ud7c7-\\ud7ca\\ud7fc-\\uf8ff\\ufa6e\\ufa6f\\ufada-\\ufaff\\ufb07-\\ufb12\\ufb18-\\ufb1c\\ufb1e\\ufb29\\ufb37\\ufb3d\\ufb3f\\ufb42\\ufb45\\ufbb2-\\ufbd2\\ufd3e-\\ufd4f\\ufd90\\ufd91\\ufdc8-\\ufdef\\ufdfc-\\ufe6f\\ufe75\\ufefd-\\uff20\\uff3b-\\uff40\\uff5b-\\uff65\\uffbf-\\uffc1\\uffc8\\uffc9\\uffd0\\uffd1\\uffd8\\uffd9\\uffdd-\\uffff';

/**
 * A regular expression string matching digits
 *
 * @type {string}
 * @ignore
 */
var digit = '\\d';

/**
 * A regular expression string matching whitespace
 *
 * @type {string}
 * @ignore
 */
var whitespace = '\\s\\uFEFF\\xA0';

/**
 * A regular expression string matching high surrogate
 *
 * @type {string}
 * @ignore
 */
var highSurrogate = '\\uD800-\\uDBFF';

/**
 * A regular expression string matching low surrogate
 *
 * @type {string}
 * @ignore
 */
var lowSurrogate = '\\uDC00-\\uDFFF';

/**
 * A regular expression string matching diacritical mark
 *
 * @type {string}
 * @ignore
 */
var diacriticalMark = '\\u0300-\\u036F\\u1AB0-\\u1AFF\\u1DC0-\\u1DFF\\u20D0-\\u20FF\\uFE20-\\uFE2F';

/**
 * Regular expression to match combining marks
 *
 * @see http://unicode.org/faq/char_combmark.html
 * @type {RegExp}
 * @ignore
 */
var REGEXP_COMBINING_MARKS = new RegExp('([\\0-\\u02FF\\u0370-\\u1AAF\\u1B00-\\u1DBF\\u1E00-\\u20CF\\u2100-\\uD7FF\\uE000-\\uFE1F\\uFE30-\\uFFFF]|[' + highSurrogate + '][' + lowSurrogate + ']|[' + highSurrogate + '](?![' + lowSurrogate + '])|(?:[^' + highSurrogate + ']|^)[' + lowSurrogate + '])([' + diacriticalMark + ']+)', 'g');

/**
 * Regular expression to match surrogate pairs
 *
 * @see http://www.unicode.org/faq/utf_bom.html#utf16-2
 * @type {RegExp}
 * @ignore
 */
var REGEXP_SURROGATE_PAIRS = new RegExp('([' + highSurrogate + '])([' + lowSurrogate + '])', 'g');

/**
 * Regular expression to match an unicode character
 *
 * @type {RegExp}
 * @ignore
 */
var REGEXP_UNICODE_CHARACTER = new RegExp('((?:[\\0-\\u02FF\\u0370-\\u1AAF\\u1B00-\\u1DBF\\u1E00-\\u20CF\\u2100-\\uD7FF\\uE000-\\uFE1F\\uFE30-\\uFFFF]|[' + highSurrogate + '][' + lowSurrogate + ']|[' + highSurrogate + '](?![' + lowSurrogate + '])|(?:[^' + highSurrogate + ']|^)[' + lowSurrogate + '])(?:[' + diacriticalMark + ']+))|\
([' + highSurrogate + '][' + lowSurrogate + '])|([\\n\\r\\u2028\\u2029])|(.)', 'g');

/**
 * Regular expression to match whitespaces from the left side
 *
 * @type {RegExp}
 * @ignore
 */
var REGEX_TRIM_LEFT = new RegExp('^[' + whitespace + ']+');

/**
 * Regular expression to match whitespaces from the right side
 *
 * @type {RegExp}
 * @ignore
 */
var REGEX_TRIM_RIGHT = new RegExp('[' + whitespace + ']+$');

/**
 * Regular expression to match alpha characters
 *
 * @see http://stackoverflow.com/a/22075070/1894471
 * @type {RegExp}
 * @ignore
 */
var REGEXP_ALPHA = new RegExp('^(?:[^' + nonLetter + '][' + diacriticalMark + ']*)+$');

/**
 * Regular expression to match alpha and digit characters
 *
 * @see http://stackoverflow.com/a/22075070/1894471
 * @type {RegExp}
 * @ignore
 */
var REGEXP_ALPHA_DIGIT = new RegExp('^((?:[^' + nonLetter + '][' + diacriticalMark + ']*)|[' + digit + '])+$');

/**
 * Regular expression to match digit characters
 *
 * @type {RegExp}
 * @ignore
 */
var REGEXP_DIGIT = new RegExp('^' + digit + '+$');

/**
 * Regular expression to match non basic latin characters
 *
 * @type {RegExp}
 * @ignore
 */
var REGEXP_NON_BASIC_LATIN = /[^\u0000-\u007E]/g;

/**
 * Regular expression to match regular expression special characters
 *
 * @type {RegExp}
 * @ignore
 */
var REGEXP_SPECIAL_CHARACTERS = /[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g;

/**
 * A regular expression string that matches a class of lower case letters.
 *
 * @type {string}
 * @ignore
 */
var lowerCaseLetterClass = '(?![' + upLetter + '])[^' + nonLetter + ']';

/**
 * Regular expression to match words
 *
 * @type {RegExp}
 * @ignore
 */
var REGEXP_WORD = new RegExp('(?:(?:[' + upLetter + '][' + diacriticalMark + ']*)?(?:' + lowerCaseLetterClass + '[' + diacriticalMark + ']*)+)|\
(?:(?:[' + upLetter + '][' + diacriticalMark + ']*)+(?!' + lowerCaseLetterClass + '))|\
(?:[' + digit + ']+)', 'g');

/**
 * Regular expression to match not latin characters
 *
 * @type {RegExp}
 * @ignore
 */
var REGEXP_NON_LATIN = /[\W]/g;

/**
 * Regular expression to match HTML special characters.
 *
 * @type {RegExp}
 * @ignore
 */
var REGEXP_HTML_SPECIAL_CHARACTERS = /[<>&"'`]/g;

/**
 * Splits `subject` into an array of words.
 *
 * @function words
 * @static
 * @memberOf Split
 * @param {string} [subject=''] The string to split into words.
 * @param {string|RegExp} [pattern] The pattern to watch words. If `pattern` is not RegExp, it is transformed to `new RegExp(pattern, flags)`.
 * @param {string} [flags=''] The regular expression flags. Applies when `pattern` is string type.
 * @return {Array} Returns the array of words.
 * @example
 * v.words('gravity can cross dimensions');
 * // => ['gravity', 'can', 'cross', 'dimensions']
 *
 * v.words('gravity', /\w{1,2}/g);
 * // => ['gr', 'av', 'it', 'y']
 */
function words (subject, pattern, flags) {
  var subjectString = toString(nilDefault(subject, '')),
      patternRegExp;
  if (isNil(pattern)) {
    patternRegExp = REGEXP_WORD;
  } else if (pattern instanceof RegExp) {
    patternRegExp = pattern;
  } else {
    var flagsString = toString(nilDefault(flags, ''));
    patternRegExp = new RegExp(toString(pattern), flagsString);
  }
  return nilDefault(subjectString.match(patternRegExp), []);
}

/**
 * Converts the `value` to a boolean.
 *
 * @ignore
 * @function toBoolean
 * @param {*} value The value to convert.
 * @return {boolean} Returns `true` if `value` is truthy or `false` otherwise.
 */
function toBoolean (value) {
  return !!value;
}

/**
 * Converts the first character of `subject` to upper case and the rest to lower case.
 *
 * @function capitalize
 * @static
 * @memberOf Case
 * @param {string} [subject=''] The string to capitalize.
 * @param {boolean} [restToLowerCase=false] Convert the rest of `subject` to lower case.
 * @return {string} Returns the capitalized string.
 * @example
 * v.capitalize('apple');
 * // => 'Apple'
 *
 * v.capitalize('mAC', false);
 * // => 'MAC'
 */
function capitalize (subject, restToLowerCase) {
  var subjectString = toString(nilDefault(subject, '')),
      restToLowerCaseBoolean = toBoolean(nilDefault(restToLowerCase, false));
  if (subjectString === '') {
    return '';
  }
  if (restToLowerCaseBoolean) {
    subjectString = subjectString.toLowerCase();
  }
  return subjectString.substr(0, 1).toUpperCase() + subjectString.substr(1);
}

/**
 * Converts the `subject` to lower case.
 *
 * @function lowerCase
 * @static
 * @memberOf Case
 * @param {string} [subject=''] The string to convert to lower case.
 * @return {string} The lower case string.
 * @example
 * v.lowerCase('Green');
 * // => 'green'
 */
function lowerCase (subject) {
  var subjectString = toString(nilDefault(subject, ''));
  return subjectString.toLowerCase();
}

/**
 * Transforms the `word` into camel case chunk.
 *
 * @param {string} word The word string
 * @param {number} index The index of the word in phrase.
 * @returns {string} The transformed word.
 * @ignore
 */
function wordToCamel(word, index) {
  return index === 0 ? lowerCase(word) : capitalize(word, true);
}

/**
 * Converts the `subject` to <a href="https://en.wikipedia.org/wiki/CamelCase">camel case</a>.
 *
 * @function camelCase
 * @static
 * @memberOf Case
 * @param {string} [subject=''] The string to convert to camel case.
 * @return {string} The camel case string.
 * @example
 * v.camelCase('bird flight');
 * // => 'birdFlight'
 *
 * v.camelCase('BirdFlight');
 * // => 'birdFlight'
 *
 * v.camelCase('-BIRD-FLIGHT-');
 * // => 'birdFlight'
 */
function camelCase (subject) {
  var subjectString = toString(nilDefault(subject, ''));
  if (subjectString === '') {
    return '';
  }
  return words(subjectString).map(wordToCamel).join('');
}

/**
 * Converts the first character of `subject` to lower case.
 *
 * @function decapitalize
 * @static
 * @memberOf Case
 * @param {string} [subject=''] The string to decapitalize.
 * @return {string} Returns the decapitalized string.
 * @example
 * v.decapitalize('Sun');
 * // => 'sun'
 */
function decapitalize (subject) {
  var subjectString = toString(nilDefault(subject, ''));
  if (subjectString === '') {
    return subjectString;
  }
  return subjectString.substr(0, 1).toLowerCase() + subjectString.substr(1);
}

/**
 * Converts the `subject` to <a href="https://en.wikipedia.org/wiki/Letter_case#cite_ref-13">kebab case</a>.
 * Also called <i>spinal case</i> or <i>lisp case</i>.
 *
 * @function kebabCase
 * @static
 * @memberOf Case
 * @param {string} [subject=''] The string to convert to kebab case.
 * @return {string} The kebab case string.
 * @example
 * v.kebabCase('goodbye blue sky');
 * // => 'goodbye-blue-sky'
 *
 * v.kebabCase('GoodbyeBlueSky');
 * // => 'goodbye-blue-sky'
 *
 * v.kebabCase('-Goodbye-Blue-Sky-');
 * // => 'goodbye-blue-sky'
 */
function kebabCase (subject) {
  var subjectString = toString(nilDefault(subject, ''));
  if (subjectString === '') {
    return '';
  }
  return words(subjectString).map(lowerCase).join('-');
}

/**
 * Converts the `subject` to <a href="https://en.wikipedia.org/wiki/Snake_case">snake case</a>.
 *
 * @function snakeCase
 * @static
 * @memberOf Case
 * @param {string} [subject=''] The string to convert to snake case.
 * @return {string} The snake case string.
 * @example
 * v.snakeCase('learning to fly');
 * // => 'learning_to_fly'
 *
 * v.snakeCase('LearningToFly');
 * // => 'learning_to_fly'
 *
 * v.snakeCase('-Learning-To-Fly-');
 * // => 'learning_to_fly'
 */
function snakeCase (subject) {
  var subjectString = toString(nilDefault(subject, ''));
  if (subjectString === '') {
    return '';
  }
  return words(subjectString).map(lowerCase).join('_');
}

/**
 * Converts the `subject` to upper case.
 *
 * @function upperCase
 * @static
 * @memberOf Case
 * @param {string} [subject=''] The string to convert to upper case.
 * @return {string} The upper case string.
 * @example
 * v.upperCase('school');
 * // => 'SCHOOL'
 */
function upperCase (subject) {
  var subjectString = toString(nilDefault(subject, ''));
  return subjectString.toUpperCase();
}

/**
 * Counts the number of `substring` appearances in `subject`.
 *
 * @function count
 * @static
 * @memberOf Count
 * @param {string} [subject=''] The subject string.
 * @param {string} substring The substring to be counted.
 * @return {number} Returns the number of `substring` appearances.
 * @example
 * v.count('bad boys, bad boys whatcha gonna do?', 'boys');
 * // => 2
 */
function count (subject, substring) {
  var subjectString = toString(nilDefault(subject, '')),
      substringString = toString(nilDefault(substring, '')),
      count = 0,
      matchIndex = 0,
      substringLength = substringString.length;
  if (subjectString === '' || substringString === '') {
    return count;
  }
  do {
    matchIndex = subjectString.indexOf(substringString, matchIndex);
    if (matchIndex !== -1) {
      count++;
      matchIndex += substringLength;
    }
  } while (matchIndex !== -1);
  return count;
}

/**
 * Counts the characters in `subject`. Equivalent to `subject.length`.
 *
 * @function length
 * @static
 * @memberOf Count
 * @param {string} [subject=''] The string to count characters.
 * @return {number} Returns the number of characters in `subject`.
 * @example
 * v.length('rain');
 * // => 4
 */
function length (subject) {
  return toString(nilDefault(subject, '')).length;
}

/**
 * Counts the characters in `subject` taking care of
 * <a href="http://unicode.org/glossary/#surrogate_pair">surrogate pairs</a> and
 * <a href="http://unicode.org/glossary/#combining_mark">combining marks</a>.
 *
 * @function lengthCodePoint
 * @static
 * @memberOf Count
 * @param {string} [subject=''] The string to count characters.
 * @return {number} Returns the number of characters in `subject`.
 * @example
 * v.lengthCodePoint('rain');
 * // => 4
 *
 * v.lengthCodePoint('\uD835\uDC00\uD835\uDC01'); // or '𝐀𝐁'
 * // => 2
 *
 * v.lengthCodePoint('cafe\u0301'); // or 'café'
 * // => 4
 */
function lengthCodePoint (subject) {
  return toString(nilDefault(subject, '')).replace(REGEXP_COMBINING_MARKS, '*').replace(REGEXP_SURROGATE_PAIRS, '*').length;
}

/**
 * Counts the characters in `subject` where `predicate` returns truthy.
 *
 * @function lengthWhere
 * @static
 * @memberOf Count
 * @param {string} [subject=''] The string to count characters.
 * @param {Function} predicate The predicate function invoked on each character with parameters `(character, index, string)`.
 * @param {Object} [context] The context to invoke the `predicate`.
 * @return {number} Returns the number of characters.
 * @example
 * v.lengthWhere('hola!', v.isAlpha);
 * // => 4
 *
 * v.lengthWhere('2022', function(character, index, str) {
 *   return character === '2';
 * });
 * // => 3
 */
function lengthWhere (subject, predicate, context) {
  var subjectString = toString(nilDefault(subject, ''));
  if (subjectString === '' || typeof predicate !== 'function') {
    return 0;
  }
  return Array.prototype.reduce.call(subjectString, function (count, character, index) {
    if (predicate.call(context, character, index, subjectString)) {
      count++;
    }
    return count;
  }, 0);
}

//const INTEGER_BINARY = 'b',
//  INTEGER_ASCII_CHARACTER = 'c',
//  INTEGER_DECIMAL = 'd',
//  FLOAT_SCIENTIFIC = 'e',
//  FLOAT_SCIENTIFIC_UPPERCASE = 'E';

/**
 * Formats `subject`.
 *
 * @function sprintf
 * @static
 * @memberOf Format
 * @param {string} [subject=''] The format string that contains zero or more directives.
 * @param {...*} args The arguments for formatting.
 * @return {string} Returns the formatted string.
 * @example
 * v.sprintf('%d', 1);
 * // => '1'
 */
function sprintf (subject) {
  var subjectString = toString(nilDefault(subject, ''));
  if (subjectString === '' || arguments.length - 1 === 0) {
    return subjectString;
  }
  return subjectString;
}

var escapeCharactersMap = {
  '<': '&lt;',
  '>': '&gt;',
  '&': '&amp;',
  '"': '&quot;',
  "'": '&#x27;',
  '`': '&#x60;'
};

/**
 * Return the escaped version of `character`.
 *
 * @ignore
 * @param {string} character The character to be escape.
 * @return {string} The escaped version of character.
 */
function replaceSpecialCharacter(character) {
  return escapeCharactersMap[character];
}

/**
 * Escapes HTML special characters  <code>< > & ' " `</code> in <code>subject</code>.
 *
 * @function escapeHtml
 * @static
 * @memberOf Escape
 * @param {string} [subject=''] The string to escape.
 * @return {string} Returns the escaped string.
 * @example
 * v.escapeHtml('<p>wonderful world</p>');
 * // => '&lt;p&gt;wonderful world&lt;/p&gt;'
 */
function escapeHtml (subject) {
  var subjectString = toString(nilDefault(subject, ''));
  return subjectString.replace(REGEXP_HTML_SPECIAL_CHARACTERS, replaceSpecialCharacter);
}

/**
 * Escapes the regular expression special characters `- [ ] / { } ( ) * + ? . \ ^ $ |` in `subject`.
 *
 * @function escapeRegExp
 * @static
 * @memberOf Escape
 * @param {string} [subject=''] The string to escape.
 * @return {string} Returns the escaped string.
 * @example
 * v.escapeRegExp('(hours)[minutes]{seconds}');
 * // => '\(hours\)\[minutes\]\{seconds\}'
 */
function escapeRegExp (subject) {
  var subjectString = toString(nilDefault(subject, ''));
  return subjectString.replace(REGEXP_SPECIAL_CHARACTERS, '\\$&');
}

var unescapeCharactersMap = {
  '<': /(&lt;)|(&#x0*3c;)|(&#0*60;)/gi,
  '>': /(&gt;)|(&#x0*3e;)|(&#0*62;)/gi,
  '&': /(&amp;)|(&#x0*26;)|(&#0*38;)/gi,
  '"': /(&quot;)|(&#x0*22;)|(&#0*34;)/gi,
  "'": /(&#x0*27;)|(&#0*39;)/gi,
  '`': /(&#x0*60;)|(&#0*96;)/gi
};
var characters = Object.keys(unescapeCharactersMap);
/**
 * Replaces the HTML entities with corresponding characters.
 *
 * @ignore
 * @param {string} string The accumulator string.
 * @param {string} key The character.
 * @return {string} The string with replaced HTML entity
 */
function reduceUnescapedString(string, key) {
  return string.replace(unescapeCharactersMap[key], key);
}

/**
 * Unescapes HTML special characters from <code>&amp;lt; &amp;gt; &amp;amp; &amp;quot; &amp;#x27; &amp;#x60;</code> to corresponding <code>< > & ' " `</code> in <code>subject</code>.
 *
 * @function unescapeHtml
 * @static
 * @memberOf Escape
 * @param {string} [subject=''] The string to unescape.
 * @return {string} Returns the unescaped string.
 * @example
 * v.unescapeHtml('&lt;p&gt;wonderful world&lt;/p&gt;');
 * // => '<p>wonderful world</p>'
 */
function unescapeHtml (subject) {
  var subjectString = toString(nilDefault(subject, ''));
  return characters.reduce(reduceUnescapedString, subjectString);
}

/**
 * Returns the first occurrence index of `search` in `subject`.
 *
 * @function indexOf
 * @static
 * @memberOf Index
 * @param {string} [subject=''] The string where to search.
 * @param {string} search The string to search.
 * @param {number} [fromIndex=0] The index to start searching.
 * @return {number} Returns the first occurrence index or `-1` if not found.
 * @example
 * v.indexOf('morning', 'n');
 * // => 3
 *
 * v.indexOf('evening', 'o');
 * // => -1
 */
function indexOf (subject, search, fromIndex) {
  var subjectString = toString(nilDefault(subject, ''));
  return subjectString.indexOf(search, fromIndex);
}

/**
 * Returns the last occurrence index of `search` in `subject`.
 *
 * @function lastIndexOf
 * @static
 * @memberOf Index
 * @param {string} [subject=''] The string where to search.
 * @param {string} search The string to search.
 * @param {number} [fromIndex=subject.length - 1] The index to start searching backward in the string.
 * @return {number} Returns the last occurrence index or `-1` if not found.
 * @example
 * v.lastIndexOf('morning', 'n');
 * // => 5
 *
 * v.lastIndexOf('evening', 'o');
 * // => -1
 */
function lastIndexOf (subject, search, fromIndex) {
  var subjectString = toString(nilDefault(subject, ''));
  return subjectString.lastIndexOf(search, fromIndex);
}

/**
 * Clip the number to interval `downLimit` to `upLimit`.
 *
 * @ignore
 * @function clipNumber
 * @param {number} value The number to clip
 * @param {number} downLimit The down limit
 * @param {number} upLimit The upper limit
 * @return {number} The clipped number
 */
function clipNumber (value, downLimit, upLimit) {
  if (value <= downLimit) {
    return downLimit;
  }
  if (value >= upLimit) {
    return upLimit;
  }
  return value;
}

/**
 * Transforms `value` to an integer.
 *
 * @ignore
 * @function toInteger
 * @param {number} value The number to transform.
 * @returns {number} Returns the transformed integer.
 */
function toInteger (value) {
  if (value === Infinity) {
    return Number.MAX_SAFE_INTEGER;
  }
  if (value === -Infinity) {
    return -Number.MAX_SAFE_INTEGER;
  }
  return ~ ~value;
}

/**
 * Returns the first index of a `pattern` match in `subject`.
 *
 * @function search
 * @static
 * @memberOf Index
 * @param {string} [subject=''] The string where to search.
 * @param {string|RegExp} pattern The pattern to match. If `pattern` is not RegExp, it is transformed to `new RegExp(pattern)`.
 * @param {number} [fromIndex=0] The index to start searching.
 * @return {number} Returns the first match index or `-1` if not found.
 * @example
 * v.search('morning', /rn/);
 * // => 2
 *
 * v.search('evening', '/\d/');
 * // => -1
 */
function search (subject, pattern, fromIndex) {
  var subjectString = toString(nilDefault(subject, '')),
      fromIndexNumber = isNil(fromIndex) ? 0 : clipNumber(toInteger(fromIndex), 0, subjectString.length);
  var matchIndex = subjectString.substr(fromIndexNumber).search(pattern);
  if (matchIndex !== -1 && !isNaN(fromIndexNumber)) {
    matchIndex += fromIndexNumber;
  }
  return matchIndex;
}

/**
 * Generated diacritics map. See bellow the base code.
 * @ignore
 * @see http://stackoverflow.com/a/18391901/1894471
 * @type Object
 */

var diacriticMap = {
  "A": "A",
  "B": "B",
  "C": "C",
  "D": "D",
  "E": "E",
  "F": "F",
  "G": "G",
  "H": "H",
  "I": "I",
  "J": "J",
  "K": "K",
  "L": "L",
  "M": "M",
  "N": "N",
  "O": "O",
  "P": "P",
  "Q": "Q",
  "R": "R",
  "S": "S",
  "T": "T",
  "U": "U",
  "V": "V",
  "W": "W",
  "X": "X",
  "Y": "Y",
  "Z": "Z",
  "a": "a",
  "b": "b",
  "c": "c",
  "d": "d",
  "e": "e",
  "f": "f",
  "g": "g",
  "h": "h",
  "i": "i",
  "j": "j",
  "k": "k",
  "l": "l",
  "m": "m",
  "n": "n",
  "o": "o",
  "p": "p",
  "q": "q",
  "r": "r",
  "s": "s",
  "t": "t",
  "u": "u",
  "v": "v",
  "w": "w",
  "x": "x",
  "y": "y",
  "z": "z",
  "": "OE",
  "": "oe",
  "À": "A",
  "Á": "A",
  "Â": "A",
  "Ã": "A",
  "Ä": "A",
  "Å": "A",
  "Æ": "AE",
  "Ç": "C",
  "È": "E",
  "É": "E",
  "Ê": "E",
  "Ë": "E",
  "Ì": "I",
  "Í": "I",
  "Î": "I",
  "Ï": "I",
  "Ñ": "N",
  "Ò": "O",
  "Ó": "O",
  "Ô": "O",
  "Õ": "O",
  "Ö": "O",
  "Ø": "O",
  "Ù": "U",
  "Ú": "U",
  "Û": "U",
  "Ü": "U",
  "Ý": "Y",
  "ß": "s",
  "à": "a",
  "á": "a",
  "â": "a",
  "ã": "a",
  "ä": "a",
  "å": "a",
  "æ": "ae",
  "ç": "c",
  "è": "e",
  "é": "e",
  "ê": "e",
  "ë": "e",
  "ì": "i",
  "í": "i",
  "î": "i",
  "ï": "i",
  "ñ": "n",
  "ò": "o",
  "ó": "o",
  "ô": "o",
  "õ": "o",
  "ö": "o",
  "ø": "o",
  "ù": "u",
  "ú": "u",
  "û": "u",
  "ü": "u",
  "ý": "y",
  "ÿ": "y",
  "Ā": "A",
  "ā": "a",
  "Ă": "A",
  "ă": "a",
  "Ą": "A",
  "ą": "a",
  "Ć": "C",
  "ć": "c",
  "Ĉ": "C",
  "ĉ": "c",
  "Ċ": "C",
  "ċ": "c",
  "Č": "C",
  "č": "c",
  "Ď": "D",
  "ď": "d",
  "Đ": "D",
  "đ": "d",
  "Ē": "E",
  "ē": "e",
  "Ĕ": "E",
  "ĕ": "e",
  "Ė": "E",
  "ė": "e",
  "Ę": "E",
  "ę": "e",
  "Ě": "E",
  "ě": "e",
  "Ĝ": "G",
  "ĝ": "g",
  "Ğ": "G",
  "ğ": "g",
  "Ġ": "G",
  "ġ": "g",
  "Ģ": "G",
  "ģ": "g",
  "Ĥ": "H",
  "ĥ": "h",
  "Ħ": "H",
  "ħ": "h",
  "Ĩ": "I",
  "ĩ": "i",
  "Ī": "I",
  "ī": "i",
  "Ĭ": "I",
  "ĭ": "i",
  "Į": "I",
  "į": "i",
  "İ": "I",
  "ı": "i",
  "Ĵ": "J",
  "ĵ": "j",
  "Ķ": "K",
  "ķ": "k",
  "Ĺ": "L",
  "ĺ": "l",
  "Ļ": "L",
  "ļ": "l",
  "Ľ": "L",
  "ľ": "l",
  "Ŀ": "L",
  "ŀ": "l",
  "Ł": "L",
  "ł": "l",
  "Ń": "N",
  "ń": "n",
  "Ņ": "N",
  "ņ": "n",
  "Ň": "N",
  "ň": "n",
  "ŉ": "n",
  "Ō": "O",
  "ō": "o",
  "Ŏ": "O",
  "ŏ": "o",
  "Ő": "O",
  "ő": "o",
  "Œ": "OE",
  "œ": "oe",
  "Ŕ": "R",
  "ŕ": "r",
  "Ŗ": "R",
  "ŗ": "r",
  "Ř": "R",
  "ř": "r",
  "Ś": "S",
  "ś": "s",
  "Ŝ": "S",
  "ŝ": "s",
  "Ş": "S",
  "ş": "s",
  "Š": "S",
  "š": "s",
  "Ţ": "T",
  "ţ": "t",
  "Ť": "T",
  "ť": "t",
  "Ŧ": "T",
  "ŧ": "t",
  "Ũ": "U",
  "ũ": "u",
  "Ū": "U",
  "ū": "u",
  "Ŭ": "U",
  "ŭ": "u",
  "Ů": "U",
  "ů": "u",
  "Ű": "U",
  "ű": "u",
  "Ų": "U",
  "ų": "u",
  "Ŵ": "W",
  "ŵ": "w",
  "Ŷ": "Y",
  "ŷ": "y",
  "Ÿ": "Y",
  "Ź": "Z",
  "ź": "z",
  "Ż": "Z",
  "ż": "z",
  "Ž": "Z",
  "ž": "z",
  "ſ": "l",
  "ƀ": "b",
  "Ɓ": "B",
  "Ƃ": "B",
  "ƃ": "b",
  "Ɔ": "O",
  "Ƈ": "C",
  "ƈ": "c",
  "Ɖ": "D",
  "Ɗ": "D",
  "Ƌ": "D",
  "ƌ": "d",
  "Ǝ": "E",
  "Ɛ": "E",
  "Ƒ": "F",
  "ƒ": "f",
  "Ɠ": "G",
  "ƕ": "hv",
  "Ɨ": "I",
  "Ƙ": "K",
  "ƙ": "k",
  "ƚ": "l",
  "Ɯ": "M",
  "Ɲ": "N",
  "ƞ": "n",
  "Ɵ": "O",
  "Ơ": "O",
  "ơ": "o",
  "Ƣ": "OI",
  "ƣ": "oi",
  "Ƥ": "P",
  "ƥ": "p",
  "Ƭ": "T",
  "ƭ": "t",
  "Ʈ": "T",
  "Ư": "U",
  "ư": "u",
  "Ʋ": "V",
  "Ƴ": "Y",
  "ƴ": "y",
  "Ƶ": "Z",
  "ƶ": "z",
  "Ǆ": "DZ",
  "ǅ": "Dz",
  "ǆ": "dz",
  "Ǉ": "LJ",
  "ǈ": "Lj",
  "ǉ": "lj",
  "Ǌ": "NJ",
  "ǋ": "Nj",
  "ǌ": "nj",
  "Ǎ": "A",
  "ǎ": "a",
  "Ǐ": "I",
  "ǐ": "i",
  "Ǒ": "O",
  "ǒ": "o",
  "Ǔ": "U",
  "ǔ": "u",
  "Ǖ": "U",
  "ǖ": "u",
  "Ǘ": "U",
  "ǘ": "u",
  "Ǚ": "U",
  "ǚ": "u",
  "Ǜ": "U",
  "ǜ": "u",
  "ǝ": "e",
  "Ǟ": "A",
  "ǟ": "a",
  "Ǡ": "A",
  "ǡ": "a",
  "Ǣ": "AE",
  "ǣ": "ae",
  "Ǥ": "G",
  "ǥ": "g",
  "Ǧ": "G",
  "ǧ": "g",
  "Ǩ": "K",
  "ǩ": "k",
  "Ǫ": "O",
  "ǫ": "o",
  "Ǭ": "O",
  "ǭ": "o",
  "ǰ": "j",
  "Ǳ": "DZ",
  "ǲ": "Dz",
  "ǳ": "dz",
  "Ǵ": "G",
  "ǵ": "g",
  "Ǹ": "N",
  "ǹ": "n",
  "Ǻ": "A",
  "ǻ": "a",
  "Ǽ": "AE",
  "ǽ": "ae",
  "Ǿ": "O",
  "ǿ": "o",
  "Ȁ": "A",
  "ȁ": "a",
  "Ȃ": "A",
  "ȃ": "a",
  "Ȅ": "E",
  "ȅ": "e",
  "Ȇ": "E",
  "ȇ": "e",
  "Ȉ": "I",
  "ȉ": "i",
  "Ȋ": "I",
  "ȋ": "i",
  "Ȍ": "O",
  "ȍ": "o",
  "Ȏ": "O",
  "ȏ": "o",
  "Ȑ": "R",
  "ȑ": "r",
  "Ȓ": "R",
  "ȓ": "r",
  "Ȕ": "U",
  "ȕ": "u",
  "Ȗ": "U",
  "ȗ": "u",
  "Ș": "S",
  "ș": "s",
  "Ț": "T",
  "ț": "t",
  "Ȟ": "H",
  "ȟ": "h",
  "Ƞ": "N",
  "Ȣ": "OU",
  "ȣ": "ou",
  "Ȥ": "Z",
  "ȥ": "z",
  "Ȧ": "A",
  "ȧ": "a",
  "Ȩ": "E",
  "ȩ": "e",
  "Ȫ": "O",
  "ȫ": "o",
  "Ȭ": "O",
  "ȭ": "o",
  "Ȯ": "O",
  "ȯ": "o",
  "Ȱ": "O",
  "ȱ": "o",
  "Ȳ": "Y",
  "ȳ": "y",
  "Ⱥ": "A",
  "Ȼ": "C",
  "ȼ": "c",
  "Ƚ": "L",
  "Ⱦ": "T",
  "ȿ": "s",
  "ɀ": "z",
  "Ƀ": "B",
  "Ʉ": "U",
  "Ʌ": "V",
  "ɇ": "e",
  "Ɉ": "J",
  "ɉ": "j",
  "Ɋ": "Q",
  "ɋ": "q",
  "Ɍ": "R",
  "ɍ": "r",
  "Ɏ": "Y",
  "ɏ": "y",
  "ɐ": "a",
  "ɓ": "b",
  "ɔ": "o",
  "ɖ": "d",
  "ɗ": "d",
  "ɛ": "e",
  "ɠ": "g",
  "ɥ": "h",
  "ɨ": "i",
  "ɫ": "l",
  "ɯ": "m",
  "ɱ": "m",
  "ɲ": "n",
  "ɵ": "o",
  "ɽ": "r",
  "ʈ": "t",
  "ʉ": "u",
  "ʋ": "v",
  "ʌ": "v",
  "ᵹ": "g",
  "ᵽ": "p",
  "Ḁ": "A",
  "ḁ": "a",
  "Ḃ": "B",
  "ḃ": "b",
  "Ḅ": "B",
  "ḅ": "b",
  "Ḇ": "B",
  "ḇ": "b",
  "Ḉ": "C",
  "ḉ": "c",
  "Ḋ": "D",
  "ḋ": "d",
  "Ḍ": "D",
  "ḍ": "d",
  "Ḏ": "D",
  "ḏ": "d",
  "Ḑ": "D",
  "ḑ": "d",
  "Ḓ": "D",
  "ḓ": "d",
  "Ḕ": "E",
  "ḕ": "e",
  "Ḗ": "E",
  "ḗ": "e",
  "Ḙ": "E",
  "ḙ": "e",
  "Ḛ": "E",
  "ḛ": "e",
  "Ḝ": "E",
  "ḝ": "e",
  "Ḟ": "F",
  "ḟ": "f",
  "Ḡ": "G",
  "ḡ": "g",
  "Ḣ": "H",
  "ḣ": "h",
  "Ḥ": "H",
  "ḥ": "h",
  "Ḧ": "H",
  "ḧ": "h",
  "Ḩ": "H",
  "ḩ": "h",
  "Ḫ": "H",
  "ḫ": "h",
  "Ḭ": "I",
  "ḭ": "i",
  "Ḯ": "I",
  "ḯ": "i",
  "Ḱ": "K",
  "ḱ": "k",
  "Ḳ": "K",
  "ḳ": "k",
  "Ḵ": "K",
  "ḵ": "k",
  "Ḷ": "L",
  "ḷ": "l",
  "Ḹ": "L",
  "ḹ": "l",
  "Ḻ": "L",
  "ḻ": "l",
  "Ḽ": "L",
  "ḽ": "l",
  "Ḿ": "M",
  "ḿ": "m",
  "Ṁ": "M",
  "ṁ": "m",
  "Ṃ": "M",
  "ṃ": "m",
  "Ṅ": "N",
  "ṅ": "n",
  "Ṇ": "N",
  "ṇ": "n",
  "Ṉ": "N",
  "ṉ": "n",
  "Ṋ": "N",
  "ṋ": "n",
  "Ṍ": "O",
  "ṍ": "o",
  "Ṏ": "O",
  "ṏ": "o",
  "Ṑ": "O",
  "ṑ": "o",
  "Ṓ": "O",
  "ṓ": "o",
  "Ṕ": "P",
  "ṕ": "p",
  "Ṗ": "P",
  "ṗ": "p",
  "Ṙ": "R",
  "ṙ": "r",
  "Ṛ": "R",
  "ṛ": "r",
  "Ṝ": "R",
  "ṝ": "r",
  "Ṟ": "R",
  "ṟ": "r",
  "Ṡ": "S",
  "ṡ": "s",
  "Ṣ": "S",
  "ṣ": "s",
  "Ṥ": "S",
  "ṥ": "s",
  "Ṧ": "S",
  "ṧ": "s",
  "Ṩ": "S",
  "ṩ": "s",
  "Ṫ": "T",
  "ṫ": "t",
  "Ṭ": "T",
  "ṭ": "t",
  "Ṯ": "T",
  "ṯ": "t",
  "Ṱ": "T",
  "ṱ": "t",
  "Ṳ": "U",
  "ṳ": "u",
  "Ṵ": "U",
  "ṵ": "u",
  "Ṷ": "U",
  "ṷ": "u",
  "Ṹ": "U",
  "ṹ": "u",
  "Ṻ": "U",
  "ṻ": "u",
  "Ṽ": "V",
  "ṽ": "v",
  "Ṿ": "V",
  "ṿ": "v",
  "Ẁ": "W",
  "ẁ": "w",
  "Ẃ": "W",
  "ẃ": "w",
  "Ẅ": "W",
  "ẅ": "w",
  "Ẇ": "W",
  "ẇ": "w",
  "Ẉ": "W",
  "ẉ": "w",
  "Ẋ": "X",
  "ẋ": "x",
  "Ẍ": "X",
  "ẍ": "x",
  "Ẏ": "Y",
  "ẏ": "y",
  "Ẑ": "Z",
  "ẑ": "z",
  "Ẓ": "Z",
  "ẓ": "z",
  "Ẕ": "Z",
  "ẕ": "z",
  "ẖ": "h",
  "ẗ": "t",
  "ẘ": "w",
  "ẙ": "y",
  "ẚ": "a",
  "ẛ": "s",
  "ẞ": "S",
  "Ạ": "A",
  "ạ": "a",
  "Ả": "A",
  "ả": "a",
  "Ấ": "A",
  "ấ": "a",
  "Ầ": "A",
  "ầ": "a",
  "Ẩ": "A",
  "ẩ": "a",
  "Ẫ": "A",
  "ẫ": "a",
  "Ậ": "A",
  "ậ": "a",
  "Ắ": "A",
  "ắ": "a",
  "Ằ": "A",
  "ằ": "a",
  "Ẳ": "A",
  "ẳ": "a",
  "Ẵ": "A",
  "ẵ": "a",
  "Ặ": "A",
  "ặ": "a",
  "Ẹ": "E",
  "ẹ": "e",
  "Ẻ": "E",
  "ẻ": "e",
  "Ẽ": "E",
  "ẽ": "e",
  "Ế": "E",
  "ế": "e",
  "Ề": "E",
  "ề": "e",
  "Ể": "E",
  "ể": "e",
  "Ễ": "E",
  "ễ": "e",
  "Ệ": "E",
  "ệ": "e",
  "Ỉ": "I",
  "ỉ": "i",
  "Ị": "I",
  "ị": "i",
  "Ọ": "O",
  "ọ": "o",
  "Ỏ": "O",
  "ỏ": "o",
  "Ố": "O",
  "ố": "o",
  "Ồ": "O",
  "ồ": "o",
  "Ổ": "O",
  "ổ": "o",
  "Ỗ": "O",
  "ỗ": "o",
  "Ộ": "O",
  "ộ": "o",
  "Ớ": "O",
  "ớ": "o",
  "Ờ": "O",
  "ờ": "o",
  "Ở": "O",
  "ở": "o",
  "Ỡ": "O",
  "ỡ": "o",
  "Ợ": "O",
  "ợ": "o",
  "Ụ": "U",
  "ụ": "u",
  "Ủ": "U",
  "ủ": "u",
  "Ứ": "U",
  "ứ": "u",
  "Ừ": "U",
  "ừ": "u",
  "Ử": "U",
  "ử": "u",
  "Ữ": "U",
  "ữ": "u",
  "Ự": "U",
  "ự": "u",
  "Ỳ": "Y",
  "ỳ": "y",
  "Ỵ": "Y",
  "ỵ": "y",
  "Ỷ": "Y",
  "ỷ": "y",
  "Ỹ": "Y",
  "ỹ": "y",
  "Ỿ": "Y",
  "ỿ": "y",
  "ↄ": "c",
  "Ⓐ": "A",
  "Ⓑ": "B",
  "Ⓒ": "C",
  "Ⓓ": "D",
  "Ⓔ": "E",
  "Ⓕ": "F",
  "Ⓖ": "G",
  "Ⓗ": "H",
  "Ⓘ": "I",
  "Ⓙ": "J",
  "Ⓚ": "K",
  "Ⓛ": "L",
  "Ⓜ": "M",
  "Ⓝ": "N",
  "Ⓞ": "O",
  "Ⓟ": "P",
  "Ⓠ": "Q",
  "Ⓡ": "R",
  "Ⓢ": "S",
  "Ⓣ": "T",
  "Ⓤ": "U",
  "Ⓥ": "V",
  "Ⓦ": "W",
  "Ⓧ": "X",
  "Ⓨ": "Y",
  "Ⓩ": "Z",
  "ⓐ": "a",
  "ⓑ": "b",
  "ⓒ": "c",
  "ⓓ": "d",
  "ⓔ": "e",
  "ⓕ": "f",
  "ⓖ": "g",
  "ⓗ": "h",
  "ⓘ": "i",
  "ⓙ": "j",
  "ⓚ": "k",
  "ⓛ": "l",
  "ⓜ": "m",
  "ⓝ": "n",
  "ⓞ": "o",
  "ⓟ": "p",
  "ⓠ": "q",
  "ⓡ": "r",
  "ⓢ": "s",
  "ⓣ": "t",
  "ⓤ": "u",
  "ⓥ": "v",
  "ⓦ": "w",
  "ⓧ": "x",
  "ⓨ": "y",
  "ⓩ": "z",
  "Ⱡ": "L",
  "ⱡ": "l",
  "Ɫ": "L",
  "Ᵽ": "P",
  "Ɽ": "R",
  "ⱥ": "a",
  "ⱦ": "t",
  "Ⱨ": "H",
  "ⱨ": "h",
  "Ⱪ": "K",
  "ⱪ": "k",
  "Ⱬ": "Z",
  "ⱬ": "z",
  "Ɱ": "M",
  "Ɐ": "A",
  "Ⱳ": "W",
  "ⱳ": "w",
  "Ⱶ": "H",
  "ⱶ": "h",
  "Ȿ": "S",
  "Ɀ": "Z",
  "Ꜩ": "TZ",
  "ꜩ": "tz",
  "Ꜳ": "AA",
  "ꜳ": "aa",
  "Ꜵ": "AO",
  "ꜵ": "ao",
  "Ꜷ": "AU",
  "ꜷ": "au",
  "Ꜹ": "AV",
  "ꜹ": "av",
  "Ꜻ": "AV",
  "ꜻ": "av",
  "Ꜽ": "AY",
  "ꜽ": "ay",
  "Ꜿ": "C",
  "ꜿ": "c",
  "Ꝁ": "K",
  "ꝁ": "k",
  "Ꝃ": "K",
  "ꝃ": "k",
  "Ꝅ": "K",
  "ꝅ": "k",
  "Ꝇ": "L",
  "ꝇ": "l",
  "Ꝉ": "L",
  "ꝉ": "l",
  "Ꝋ": "O",
  "ꝋ": "o",
  "Ꝍ": "O",
  "ꝍ": "o",
  "Ꝏ": "OO",
  "ꝏ": "oo",
  "Ꝑ": "P",
  "ꝑ": "p",
  "Ꝓ": "P",
  "ꝓ": "p",
  "Ꝕ": "P",
  "ꝕ": "p",
  "Ꝗ": "Q",
  "ꝗ": "q",
  "Ꝙ": "Q",
  "ꝙ": "q",
  "Ꝛ": "R",
  "ꝛ": "r",
  "Ꝟ": "V",
  "ꝟ": "v",
  "Ꝡ": "VY",
  "ꝡ": "vy",
  "Ꝣ": "Z",
  "ꝣ": "z",
  "Ꝺ": "D",
  "ꝺ": "d",
  "Ꝼ": "F",
  "ꝼ": "f",
  "Ᵹ": "G",
  "Ꝿ": "G",
  "ꝿ": "g",
  "Ꞁ": "L",
  "ꞁ": "l",
  "Ꞃ": "R",
  "ꞃ": "r",
  "Ꞅ": "S",
  "ꞅ": "s",
  "Ꞇ": "T",
  "ꞇ": "t",
  "Ɥ": "H",
  "Ꞑ": "N",
  "ꞑ": "n",
  "Ꞡ": "G",
  "ꞡ": "g",
  "Ꞣ": "K",
  "ꞣ": "k",
  "Ꞥ": "N",
  "ꞥ": "n",
  "Ꞧ": "R",
  "ꞧ": "r",
  "Ꞩ": "S",
  "ꞩ": "s",
  "Ａ": "A",
  "Ｂ": "B",
  "Ｃ": "C",
  "Ｄ": "D",
  "Ｅ": "E",
  "Ｆ": "F",
  "Ｇ": "G",
  "Ｈ": "H",
  "Ｉ": "I",
  "Ｊ": "J",
  "Ｋ": "K",
  "Ｌ": "L",
  "Ｍ": "M",
  "Ｎ": "N",
  "Ｏ": "O",
  "Ｐ": "P",
  "Ｑ": "Q",
  "Ｒ": "R",
  "Ｓ": "S",
  "Ｔ": "T",
  "Ｕ": "U",
  "Ｖ": "V",
  "Ｗ": "W",
  "Ｘ": "X",
  "Ｙ": "Y",
  "Ｚ": "Z",
  "ａ": "a",
  "ｂ": "b",
  "ｃ": "c",
  "ｄ": "d",
  "ｅ": "e",
  "ｆ": "f",
  "ｇ": "g",
  "ｈ": "h",
  "ｉ": "i",
  "ｊ": "j",
  "ｋ": "k",
  "ｌ": "l",
  "ｍ": "m",
  "ｎ": "n",
  "ｏ": "o",
  "ｐ": "p",
  "ｑ": "q",
  "ｒ": "r",
  "ｓ": "s",
  "ｔ": "t",
  "ｕ": "u",
  "ｖ": "v",
  "ｗ": "w",
  "ｘ": "x",
  "ｙ": "y",
  "ｚ": "z"
};

/**
 * Removes the diacritics from `character`.
 *
 * @ignore
 * @param {string} character The character with diacritics.
 * @returns {string} Returns the character without diacritics.
 */
function removeDiacritics(character) {
  var characterWithoutDiacritic = diacriticMap[character];
  return characterWithoutDiacritic ? characterWithoutDiacritic : character;
}

/**
 * Returns the `cleanCharacter` from combining marks regular expression match.
 * @ignore
 * @param {string} character The character with combining marks
 * @param {string} cleanCharacter The character without combining marks.
 * @return {string} The character without combining marks.
 */
function removeCombiningMarks(character, cleanCharacter) {
  return cleanCharacter;
}

/**
 * Latinises the `subject` by removing diacritic characters.
 *
 * @function latinise
 * @static
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to latinise.
 * @return {string} Returns the latinised string.
 * @example
 * v.latinise('cafe\u0301'); // or 'café'
 * // => 'cafe'
 *
 * v.latinise('août décembre');
 * // => 'aout decembre'
 */
function latinise (subject) {
  var subjectString = toString(nilDefault(subject, ''));
  if (subjectString === '') {
    return subjectString;
  }
  return subjectString.replace(REGEXP_NON_BASIC_LATIN, removeDiacritics).replace(REGEXP_COMBINING_MARKS, removeCombiningMarks);
}

/**
 * Repeats the `subject` number of `times`.
 *
 * @function repeat
 * @static
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to repeat.
 * @param {number} [times=1] The number of times to repeat.
 * @return {string} Returns the repeated string.
 * @example
 * v.repeat('w', 3);
 * // => 'www'
 *
 * v.repeat('world', 0);
 * // => ''
 */
function repeat (subject, times) {
  var subjectString = toString(nilDefault(subject, '')),
      timesInt = isNil(times) ? 1 : clipNumber(toInteger(times), 0, Number.MAX_SAFE_INTEGER);
  var repeatString = '';
  while (timesInt) {
    if (timesInt & 1) {
      repeatString += subjectString;
    }
    if (timesInt > 1) {
      subjectString += subjectString;
    }
    timesInt >>= 1;
  }
  return repeatString;
}

/**
 * Creates the padding string.
 *
 * @ignore
 * @param {string} padCharacters The characters to create padding string.
 * @param {number} length The padding string length.
 * @return {string} The padding string.
 */
function buildPadding (padCharacters, length) {
  var padStringRepeat = toInteger(length / padCharacters.length),
      padStringRest = length % padCharacters.length;
  return repeat(padCharacters, padStringRepeat + padStringRest).substr(0, length);
}

/**
 * Pads `subject` to a new `length`.
 *
 * @function pad
 * @static
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to pad.
 * @param {int} [length=0] The length to pad the string. No changes are made if `length` is less than `subject.length`.
 * @param {string} [pad=' '] The string to be used for padding.
 * @return {string} Returns the padded string.
 * @example
 * v.pad('word', 6, '-');
 * // => '-word-'
 *
 * v.pad('hi', 5, '-=');
 * // => '-hi-='
 */
function pad (subject, length, pad) {
  var subjectString = toString(nilDefault(subject, '')),
      lengthInt = isNil(length) ? 0 : clipNumber(toInteger(length), 0, Number.MAX_SAFE_INTEGER),
      padString = toString(nilDefault(pad, ' '));
  if (lengthInt <= subjectString.length) {
    return subjectString;
  }
  var paddingLength = lengthInt - subjectString.length,
      paddingSideLength = toInteger(paddingLength / 2),
      paddingSideRemainingLength = paddingLength % 2;
  return buildPadding(padString, paddingSideLength) + subjectString + buildPadding(padString, paddingSideLength + paddingSideRemainingLength);
}

/**
 * Pads `subject` from left to a new `length`.
 *
 * @function padLeft
 * @static
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to pad.
 * @param {int} [length=0] The length to left pad the string. No changes are made if `length` is less than `subject.length`.
 * @param {string} [pad=' '] The string to be used for padding.
 * @return {string} Returns the left padded string.
 * @example
 * v.padLeft('word', 6, '-');
 * // => '--word'
 *
 * v.padLeft('hi', 5, '-=');
 * // => '-=-hi'
 */
function padLeft (subject, length, pad) {
  var subjectString = toString(nilDefault(subject, '')),
      lengthInt = isNil(length) ? 0 : clipNumber(toInteger(length), 0, Number.MAX_SAFE_INTEGER),
      padString = toString(nilDefault(pad, ' '));
  if (lengthInt <= subjectString.length) {
    return subjectString;
  }
  return buildPadding(padString, lengthInt - subjectString.length) + subjectString;
}

/**
 * Pads `subject` from right to a new `length`.
 *
 * @function padRight
 * @static
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to pad.
 * @param {int} [length=0] The length to right pad the string. No changes are made if `length` is less than `subject.length`.
 * @param {string} [pad=' '] The string to be used for padding.
 * @return {string} Returns the right padded string.
 * @example
 * v.padRight('word', 6, '-');
 * // => 'word--'
 *
 * v.padRight('hi', 5, '-=');
 * // => 'hi-=-'
 */
function padRight (subject, length, pad) {
  var subjectString = toString(nilDefault(subject, '')),
      lengthInt = isNil(length) ? 0 : clipNumber(toInteger(length), 0, Number.MAX_SAFE_INTEGER),
      padString = toString(nilDefault(pad, ' '));
  if (lengthInt <= subjectString.length) {
    return subjectString;
  }
  return subjectString + buildPadding(padString, lengthInt - subjectString.length);
}

/**
 * Truncates `subject` to a new `length` and does not break the words. Guarantees that truncated string will be no longer than `length`.
 *
 * @function prune
 * @static
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to prune.
 * @param {int} length The length to prune the string.
 * @param {string} [end='...'] The string to be added at the end.
 * @return {string} Returns the pruned string.
 * @example
 * v.prune('Once upon a time', 6);
 * // => 'Once...'
 *
 * v.prune('Good day, Little Red Riding Hood', 8, ' (read more)');
 * // => 'Good day (read more)'
 *
 * v.prune('Once upon', 10);
 * // => 'Once upon'
 */
function prune (subject, length, end) {
  var subjectString = toString(nilDefault(subject, '')),
      lengthInt = isNil(length) ? subjectString.length : clipNumber(toInteger(length), 0, Number.MAX_SAFE_INTEGER),
      endString = toString(nilDefault(end, '...'));
  if (lengthInt >= subjectString.length) {
    return subjectString;
  }
  var truncatedString = '';
  subjectString.replace(REGEXP_WORD, function (word, offset) {
    var wordInsertLength = offset + word.length;
    if (wordInsertLength <= length) {
      truncatedString = subjectString.substr(0, wordInsertLength);
    }
  });
  return truncatedString + endString;
}

/**
 * Returns a new string where the matches of `pattern` are replaced with `replacement`.
 *
 * @function replace
 * @static
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to verify.
 * @param {string|RegExp} pattern The pattern which match is replaced with `replacement`. If `pattern` is string, a simple string match is evaluated.
 * @param {string|Function} replacement The string or a function which invocation result replaces `pattern` match.
 * @return {string} Returns the replacement result.
 * @example
 * v.replace('swan', 'wa', 'u');
 * // => 'sun'
 *
 * v.replace('domestic duck', /domestic\s/, '');
 * // => 'duck'
 *
 * v.replace('nice duck', /(nice)(duck)/, function(match, nice, duck) {
 *   return 'the ' + duck + ' is ' + nice;
 * });
 * // => 'the duck is nice'
 */
function replace (subject, pattern, replacement) {
  var subjectString = toString(nilDefault(subject, ''));
  return subjectString.replace(pattern, replacement);
}

/**
 * Reverses the `subject`.
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
function reverse (subject) {
  var subjectString = toString(nilDefault(subject, ''));
  return subjectString.split('').reverse().join('');
}

/**
 * Reverses the `subject` taking care of
 * <a href="http://unicode.org/glossary/#surrogate_pair">surrogate pairs</a> and
 * <a href="http://unicode.org/glossary/#combining_mark">combining marks</a>.
 *
 * @function reverseCodePoint
 * @static
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to reverse.
 * @return {string} Returns the reversed string.
 * @example
 * v.reverseCodePoint('summer');
 * // => 'remmus'
 *
 * v.reverseCodePoint('𝌆 bar mañana mañana');
 * // => 'anañam anañam rab 𝌆'
 */
function reverseCodePoint(subject) {
  var subjectString = toString(nilDefault(subject, ''));
  /**
   * @see https://github.com/mathiasbynens/esrever
   */
  subjectString = subjectString.replace(REGEXP_COMBINING_MARKS, function ($0, $1, $2) {
    return reverseCodePoint($2) + $1;
  }).replace(REGEXP_SURROGATE_PAIRS, '$2$1');
  var reversedString = '',
      index = subjectString.length;
  while (index--) {
    reversedString += subjectString.charAt(index);
  }
  return reversedString;
}

/**
 * Extracts from `subject` a string from `start` position to `end` position.
 *
 * @function slice
 * @static
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to extract from.
 * @param {number} start The position to start extraction. If negative use `subject.length + start`.
 * @param {number} [end=subject.length] The position to end extraction. If negative use `subject.length + end`.
 * @return {string} Returns the extracted string.
 * @note Uses native `String.prototype.slice()`
 * @example
 * v.slice('miami', 1);
 * // => 'iami'
 *
 * v.slice('florida', -4);
 * // => 'rida'
 */
function slice (subject, start, end) {
  var subjectString = toString(nilDefault(subject, ''));
  return subjectString.slice(start, end);
}

/**
 * Slugify the `subject`. Cleans the `subject` by replacing diacritics with corresponding latin characters.
 *
 * @function slugify
 * @static
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to slugify.
 * @return {string} The slugified string.
 * @example
 * v.slugify('Italian cappuccino drink');
 * // => 'italian-cappuccino-drink'
 *
 * v.slugify('café latté');
 * // => 'caffe-latte'
 */
function slugify (subject) {
  var subjectString = toString(nilDefault(subject, ''));
  if (subjectString === '') {
    return '';
  }
  var cleanSubjectString = latinise(subjectString).replace(REGEXP_NON_LATIN, '-');
  return kebabCase(cleanSubjectString);
}

/**
 * Extracts from `subject` a string from `start` position a number of `length` characters.
 *
 * @function substr
 * @static
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to extract from.
 * @param {number} start The position to start extraction.
 * @param {number} [length=subject.endOfString] The number of characters to extract. If omitted, extract to the end of `subject`.
 * @return {string} Returns the extracted string.
 * @note Uses native `String.prototype.substr()`
 * @example
 * v.substr('infinite loop', 9);
 * // => 'loop'
 *
 * v.substr('dreams', 2, 2);
 * // => 'ea'
 */
function substr (subject, start, length) {
  var subjectString = toString(nilDefault(subject, ''));
  return subjectString.substr(start, length);
}

/**
 * Extracts from `subject` a string from `start` position to `end` position.
 *
 * @function substring
 * @static
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to extract from.
 * @param {number} start The position to start extraction.
 * @param {number} [end=subject.length] The position to end extraction.
 * @return {string} Returns the extracted string.
 * @note Uses native `String.prototype.substring()`
 * @example
 * v.substring('beach', 1);
 * // => 'each'
 *
 * v.substring('ocean', 1, 3);
 * // => 'ea'
 */
function substring (subject, start, end) {
  var subjectString = toString(nilDefault(subject, ''));
  return subjectString.substring(start, end);
}

/**
 * Removes the whitespaces from the left part of the `subject`.
 *
 * @function trimLeft
 * @static
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to trim.
 * @param {string} [whitespace=whitespace] The whitespace characters to trim.
 * @return {string} Returns the trimmed string.
 * @example
 * v.trimLeft('  Starship Troopers');
 * // => 'Starship Troopers'
 *
 * v.trimLeft('***Mobile Infantry', '*');
 * // => 'Mobile Infantry'
 */
function trimLeft (subject, whitespace) {
  var subjectString = toString(nilDefault(subject, ''));
  if (whitespace === '' || subjectString === '') {
    return subjectString;
  }
  var whitespaceString = toString(whitespace);
  if (isNil(whitespaceString)) {
    return subjectString.replace(REGEX_TRIM_LEFT, '');
  }
  var matchWhitespace = true,
      totalWhitespaceLength = 0,
      whitespaceStringLength = whitespaceString.length;
  while (matchWhitespace) {
    if (subjectString.indexOf(whitespaceString, totalWhitespaceLength) === totalWhitespaceLength) {
      totalWhitespaceLength += whitespaceStringLength;
    } else {
      matchWhitespace = false;
    }
  }
  return subjectString.substring(totalWhitespaceLength);
}

/**
 * Removes the whitespaces from the right part of the `subject`.
 *
 * @function trimRight
 * @static
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to trim.
 * @param {string} [whitespace=whitespace] The whitespace characters to trim.
 * @return {string} Returns the trimmed string.
 * @example
 * v.trimRight('the fire rises   ');
 * // => 'the fire rises'
 *
 * v.trimRight('do you feel in charge?---', '-');
 * // => 'do you feel in charge?'
 */
function trimRight (subject, whitespace) {
  var subjectString = toString(nilDefault(subject, ''));
  if (whitespace === '' || subjectString === '') {
    return subjectString;
  }
  var whitespaceString = toString(whitespace);
  if (isNil(whitespaceString)) {
    return subjectString.replace(REGEX_TRIM_RIGHT, '');
  }
  var matchWhitespace = true,
      totalWhitespaceLength = 0,
      whitespaceStringLength = whitespaceString.length,
      valueStringLength = subjectString.length,
      position;
  while (matchWhitespace) {
    position = valueStringLength - totalWhitespaceLength - whitespaceStringLength;
    if (subjectString.indexOf(whitespaceString, position) === position) {
      totalWhitespaceLength += whitespaceStringLength;
    } else {
      matchWhitespace = false;
    }
  }
  return subjectString.substring(0, valueStringLength - totalWhitespaceLength);
}

/**
 * Removes the whitespaces from left and right parts of the `subject`.
 *
 * @function trim
 * @static
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to trim.
 * @param {string} [whitespace=whitespace] The whitespace characters to trim.
 * @return {string} Returns the trimmed string.
 * @example
 * v.trim(' Mother nature ');
 * // => 'Mother nature'
 *
 * v.trim('--Earth--', '-');
 * // => 'Earth'
 */
function trim (subject, whitespace) {
  var subjectString = toString(nilDefault(subject, ''));
  if (whitespace === '' || subjectString === '') {
    return subjectString;
  }
  var whitespaceString = toString(whitespace);
  if (isNil(whitespaceString)) {
    return subjectString.trim();
  }
  return trimRight(trimLeft(subjectString, whitespaceString), whitespaceString);
}

/**
 * Truncates `subject` to a new `length`.
 *
 * @function truncate
 * @static
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to truncate.
 * @param {int} length The length to truncate the string.
 * @param {string} [end='...'] The string to be added at the end.
 * @return {string} Returns the truncated string.
 * @example
 * v.truncate('Once upon a time', 9);
 * // => 'Once upon...'
 *
 * v.truncate('Good day, Little Red Riding Hood', 8, ' (read more)');
 * // => 'Good day (read more)'
 *
 * v.truncate('Once upon', 10);
 * // => 'Once upon'
 */
function truncate (subject, length, end) {
  var subjectString = toString(nilDefault(subject, '')),
      lengthInt = isNil(length) ? subjectString.length : clipNumber(toInteger(length), 0, Number.MAX_SAFE_INTEGER),
      endString = toString(nilDefault(end, '...'));
  if (lengthInt >= subjectString.length) {
    return subjectString;
  }
  return subjectString.substr(0, length) + endString;
}

/**
 * Checks if `subject` ends with `end`.
 *
 * @function endsWith
 * @static
 * @memberOf Query
 * @param {string} [subject=''] The string to verify.
 * @param {string} end The ending string.
 * @param {number} [position=subject.length] Search within `subject` as if this string were only `position` long.
 * @return {boolean} Returns `true` if `subject` ends with `end` or `false` otherwise.
 * @example
 * v.endsWith('red alert', 'alert');
 * // => true
 *
 * v.endsWith('metro south', 'metro');
 * // => false
 *
 * v.endsWith('Murphy', 'ph', 5);
 * // => true
 */
function endsWith (subject, end, position) {
  if (isNil(end)) {
    return false;
  }
  var subjectString = toString(nilDefault(subject, '')),
      endString = toString(end);
  if (endString === '') {
    return true;
  }
  position = isNil(position) ? subjectString.length : clipNumber(toInteger(position), 0, subjectString.length);
  position -= endString.length;
  var lastIndex = subjectString.indexOf(endString, position);
  return lastIndex !== -1 && lastIndex === position;
}

/**
 * Checks if `subject` includes `search` starting from `position`
 *
 * @function includes
 * @static
 * @memberOf Query
 * @param {string} [subject=''] The string where to search.
 * @param {string} search The string to search.
 * @param {number} [position=0] The position to start searching.
 * @return {boolean} Returns `true` if `subject` includes `search` or `false` otherwise.
 * @example
 * v.includes('starship', 'star');
 * // => true
 *
 * v.includes('galaxy', 'g', 1);
 * // => false
 */
function includes (subject, search, position) {
  subject = nilDefault(subject, '');
  var subjectString = toString(nilDefault(subject, '')),
      searchString = toString(search);
  if (searchString === null) {
    return false;
  }
  if (searchString === '') {
    return true;
  }
  position = isNil(position) ? 0 : clipNumber(toInteger(position), 0, subjectString.length);
  return subjectString.indexOf(searchString, position) !== -1;
}

/**
 * Checks if `subject` contains only alpha characters.
 *
 * @function isAlpha
 * @static
 * @memberOf Query
 * @param {string} [subject=''] The string to verify.
 * @return {boolean} Returns `true` if `subject` contains only alpha characters or `false` otherwise.
 * @example
 * v.isAlpha('bart');
 * // => true
 *
 * v.isAlpha('lisa!');
 * // => false
 *
 * v.isAlpha('lisa and bart');
 * // => false
 */
function isAlpha (subject) {
  var subjectString = toString(nilDefault(subject, ''));
  return REGEXP_ALPHA.test(subjectString);
}

/**
 * Checks if `subject` contains only alpha and digit characters.
 *
 * @function isAlphaDigit
 * @static
 * @memberOf Query
 * @param {string} [subject=''] The string to verify.
 * @return {boolean} Returns `true` if `subject` contains only alpha and digit characters or `false` otherwise.
 * @example
 * v.isAlphaDigit('year2020');
 * // => true
 *
 * v.isAlphaDigit('1448');
 * // => true
 *
 * v.isAlphaDigit('40-20');
 * // => false
 */
function isAlphaDigit (subject) {
  var subjectString = toString(nilDefault(subject, ''));
  return REGEXP_ALPHA_DIGIT.test(subjectString);
}

/**
 * Checks if `subject` is empty or contains only whitespaces.
 *
 * @function isBlank
 * @static
 * @memberOf Query
 * @param {string} [subject=''] The string to verify.
 * @return {boolean} Returns `true` if `subject` is empty or contains only whitespaces or `false` otherwise.
 * @example
 * v.isBlank('');
 * // => true
 *
 * v.isBlank('  ');
 * // => true
 *
 * v.isBlank('World');
 * // => false
 */
function isBlank (subject) {
  var subjectString = toString(nilDefault(subject, ''));
  return subjectString.trim().length === 0;
}

/**
 * Checks if `subject` contains only digit characters.
 *
 * @function isDigit
 * @static
 * @memberOf Query
 * @param {string} [subject=''] The string to verify.
 * @return {boolean} Returns `true` if `subject` contains only digit characters or `false` otherwise.
 * @example
 * v.isDigit('35');
 * // => true
 *
 * v.isDigit('1.5');
 * // => false
 *
 * v.isDigit('ten');
 * // => false
 */
function isDigit (subject) {
  var subjectString = toString(nilDefault(subject, ''));
  return REGEXP_DIGIT.test(subjectString);
}

/**
 * Checks if `subject` is empty.
 *
 * @function isEmpty
 * @static
 * @memberOf Query
 * @param {string} [subject=''] The string to verify.
 * @return {boolean} Returns `true` if `subject` is empty or `false` otherwise
 * @example
 * v.isEmpty('');
 * // => true
 *
 * v.isEmpty('  ');
 * // => false
 */
function isEmpty (subject) {
  var subjectString = toString(nilDefault(subject, ''));
  return subjectString.length === 0;
}

/**
 * Checks if `subject` has only lower case characters.
 *
 * @function isLowerCase
 * @static
 * @memberOf Query
 * @param {string} [subject=''] The string to verify.
 * @return {boolean} Returns `true` if `subject` is lower case or `false` otherwise.
 * @example
 * v.isLowerCase('motorcycle');
 * // => true
 *
 * v.isLowerCase('John');
 * // => false
 *
 * v.isLowerCase('T1000');
 * // => false
 */
function isLowerCase (subject) {
  var valueString = toString(nilDefault(subject, ''));
  return isAlpha(valueString) && valueString.toLowerCase() === valueString;
}

/**
 * Checks if `subject` is numeric.
 *
 * @function isNumeric
 * @static
 * @memberOf Query
 * @param {string} [subject=''] The string to verify.
 * @return {boolean} Returns `true` if `subject` is numeric or `false` otherwise.
 * @example
 * v.isNumeric('350');
 * // => true
 *
 * v.isNumeric('-20.5');
 * // => true
 *
 * v.isNumeric('NaN');
 * // => false
 */
function isNumeric (subject) {
  var valueNumeric = (typeof subject === 'undefined' ? 'undefined' : babelHelpers.typeof(subject)) === 'object' && subject != null ? Number(subject) : subject;
  return (typeof valueNumeric === 'number' || typeof valueNumeric === 'string') && !isNaN(valueNumeric - parseFloat(valueNumeric));
}

/**
 * Checks if `subject` has only upper case characters.
 *
 * @function isUpperCase
 * @static
 * @memberOf Query
 * @param {string} [subject=''] The string to verify.
 * @return {boolean} Returns `true` if `subject` is upper case or `false` otherwise.
 * @example
 * v.isUpperCase('ACDC');
 * // => true
 *
 * v.isUpperCase('Morning');
 * // => false
 */
function isUpperCase (subject) {
  var subjectString = toString(nilDefault(subject, ''));
  return isAlpha(subjectString) && subjectString.toUpperCase() === subjectString;
}

/**
 * Checks if `subject` matches the regular expression `pattern`.
 *
 * @function matches
 * @static
 * @memberOf Query
 * @param {string} [subject=''] The string to verify.
 * @param {RegExp|string} pattern The pattern to match. If `pattern` is not RegExp, it is transformed to `new RegExp(pattern, flags)`.
 * @param {string} [flags=''] The regular expression flags. Applies when `pattern` is string type.
 * @return {boolean} Returns `true` if `subject` matches `pattern` or `false` otherwise.
 * @example
 * v.matches('pluto', /plu.{2}/);
 * // => true
 *
 * v.matches('sun', 'S', 'i');
 * // => true
 *
 * v.matches('apollo 11', '\\d{3}');
 * // => false
 */
function matches (subject, pattern, flags) {
  var subjectString = toString(nilDefault(subject, '')),
      flagsString = toString(nilDefault(flags, '')),
      patternString;
  if (!(pattern instanceof RegExp)) {
    patternString = toString(pattern);
    if (patternString === null) {
      return false;
    }
    pattern = new RegExp(patternString, flagsString);
  }
  return pattern.test(subjectString);
}

/**
 * Checks if `subject` starts with `start`.
 *
 * @function startsWith
 * @static
 * @memberOf Query
 * @param {string} [subject=''] The string to verify.
 * @param {string} start The starting string.
 * @param {number} [position=0] The position to start searching.
 * @return {boolean} Returns `true` if `subject` starts with `start` or `false` otherwise.
 * @example
 * v.startsWith('say hello to my little friend', 'say hello');
 * // => true
 *
 * v.startsWith('tony', 'on', 1);
 * // => true
 *
 * v.startsWith('the world is yours', 'world');
 * // => false
 */
function startsWith (subject, start, position) {
  var subjectString = toString(nilDefault(subject, '')),
      startString = toString(start);
  if (startString === null) {
    return false;
  }
  if (startString === '') {
    return true;
  }
  position = isNil(position) ? 0 : clipNumber(toInteger(position), 0, subjectString.length);
  return subjectString.substr(position, startString.length) === startString;
}

/**
 * Splits `subject` into an array of characters.
 *
 * @function chars
 * @static
 * @memberOf Split
 * @param {string} [subject=''] The string to split into characters.
 * @return {Array} Returns the array of characters.
 * @example
 * v.chars('cloud');
 * // => ['c', 'l', 'o', 'u', 'd']
 */
function chars (subject) {
  var subjectString = toString(nilDefault(subject, ''));
  return subjectString.split('');
}

/**
 * Splits `subject` into an array of characters taking care of
 * <a href="http://unicode.org/glossary/#surrogate_pair">surrogate pairs</a> and
 * <a href="http://unicode.org/glossary/#combining_mark">combining marks</a>.
 *
 * @function charsCodePoint
 * @static
 * @memberOf Split
 * @param {string} [subject=''] The string to split into characters.
 * @return {Array} Returns the array of characters.
 * @example
 * v.charsCodePoint('\uD835\uDC00\uD835\uDC01'); // or '𝐀𝐁'
 * // => ['\uD835\uDC00', '\uD835\uDC01']
 *
 * v.charsCodePoint('cafe\u0301'); // or 'café'
 * // => ['c', 'a', 'f', 'e\u0301']
 */
function charsCodePoint (subject) {
  var subjectString = toString(nilDefault(subject, ''));
  return nilDefault(subjectString.match(REGEXP_UNICODE_CHARACTER), []);
}

/**
 * Splits `subject` into an array of chunks by `separator`.
 *
 * @function split
 * @static
 * @memberOf Split
 * @param {string} [subject=''] The string to split into characters.
 * @param {string|RegExp} [separator] The pattern to match the separator.
 * @param {number} [limit] Limit the number of chunks to be found.
 * @return {Array} Returns the array of chunks.
 * @example
 * v.split('rage against the dying of the light', ' ');
 * // => ['rage', 'against', 'the', 'dying', 'of', 'the', 'light']
 *
 * v.split('the dying of the light', /\s/, 3);
 * // => ['the', 'dying', 'of']
 */
function split (subject, separator, limit) {
  var subjectString = toString(nilDefault(subject, ''));
  return subjectString.split(separator, limit);
}

var v = {
  camelCase: camelCase,
  capitalize: capitalize,
  decapitalize: decapitalize,
  kebabCase: kebabCase,
  lowerCase: lowerCase,
  snakeCase: snakeCase,
  upperCase: upperCase,

  count: count,
  length: length,
  lengthCodePoint: lengthCodePoint,
  lengthWhere: lengthWhere,

  escapeHtml: escapeHtml,
  escapeRegExp: escapeRegExp,
  unescapeHtml: unescapeHtml,

  sprintf: sprintf,

  indexOf: indexOf,
  lastIndexOf: lastIndexOf,
  search: search,

  latinise: latinise,
  pad: pad,
  padLeft: padLeft,
  padRight: padRight,
  prune: prune,
  repeat: repeat,
  replace: replace,
  reverseCodePoint: reverseCodePoint,
  reverse: reverse,
  slice: slice,
  slugify: slugify,
  substr: substr,
  substring: substring,
  trim: trim,
  trimLeft: trimLeft,
  trimRight: trimRight,
  truncate: truncate,

  endsWith: endsWith,
  includes: includes,
  isAlpha: isAlpha,
  isAlphaDigit: isAlphaDigit,
  isBlank: isBlank,
  isDigit: isDigit,
  isEmpty: isEmpty,
  isLowerCase: isLowerCase,
  isNumeric: isNumeric,
  isString: isString,
  isUpperCase: isUpperCase,
  matches: matches,
  startsWith: startsWith,

  chars: chars,
  charsCodePoint: charsCodePoint,
  split: split,
  words: words
};

/**
 * The string containing all printable ASCII characters.
 * @ignore
 * @type {string}
 */
var PRINTABLE_ASCII = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';

/**
 * The string containing all printable ASCII characters in reverse order.
 * @ignore
 * @type {string}
 */
var REVERSED_PRINTABLE_ASCII = '~}|{zyxwvutsrqponmlkjihgfedcba`_^]\\[ZYXWVUTSRQPONMLKJIHGFEDCBA@?>=<;:9876543210/.-,+*)(\'&%$#"! ';

describe('camelCase', function () {

  it('should return the camel case of a string', function () {
    chai.expect(v.camelCase('bird')).to.be.equal('bird');
    chai.expect(v.camelCase('BIRD')).to.be.equal('bird');
    chai.expect(v.camelCase('BirdFlight')).to.be.equal('birdFlight');
    chai.expect(v.camelCase('bird flight')).to.be.equal('birdFlight');
    chai.expect(v.camelCase('San Diego Zoo Safari Park')).to.be.equal('sanDiegoZooSafariPark');
    chai.expect(v.camelCase('-BIRD-FLIGHT-')).to.be.equal('birdFlight');
    chai.expect(v.camelCase('__BIRD___FLIGHT___')).to.be.equal('birdFlight');
    chai.expect(v.camelCase('Restless flycatcher')).to.be.equal('restlessFlycatcher');
    chai.expect(v.camelCase('XMLHttpRequest')).to.be.equal('xmlHttpRequest');
    chai.expect(v.camelCase('weight of up to 12 kg')).to.be.equal('weightOfUpTo12Kg');
    chai.expect(v.camelCase('/home/dmitri/projects/voca')).to.be.equal('homeDmitriProjectsVoca');
    chai.expect(v.camelCase(PRINTABLE_ASCII)).to.be.equal('0123456789AbcdefghijklmnopqrstuvwxyzAbcdefghijklmnopqrstuvwxyz');
    chai.expect(v.camelCase('****')).to.be.equal('');
    chai.expect(v.camelCase('****')).to.be.equal('');
    chai.expect(v.camelCase('-----')).to.be.equal('');
    chai.expect(v.camelCase('     ')).to.be.equal('');
    chai.expect(v.camelCase('\n\n\n\n   ***\t\t')).to.be.equal('');
    chai.expect(v.camelCase('')).to.be.equal('');
  });

  it('should return the camel case of a non-latin string', function () {
    chai.expect(v.camelCase('zborul păsării')).to.be.equal('zborulPăsării');
    chai.expect(v.camelCase('полет птицы')).to.be.equal('полетПтицы');
    chai.expect(v.camelCase('fuerza de sustentación')).to.be.equal('fuerzaDeSustentación');
    chai.expect(v.camelCase('skrzydło ptaka składa się')).to.be.equal('skrzydłoPtakaSkładaSię');
  });

  it('should not modify numbers', function () {
    chai.expect(v.camelCase(0)).to.be.equal('0');
    chai.expect(v.camelCase(1200)).to.be.equal('1200');
    chai.expect(v.camelCase('8965')).to.be.equal('8965');
  });

  it('should return the camel case of a string representation of an object', function () {
    chai.expect(v.camelCase(['bird flight'])).to.be.equal('birdFlight');
    chai.expect(v.camelCase({
      toString: function toString() {
        return 'bird flight';
      }
    })).to.be.equal('birdFlight');
  });

  it('should return empty string for null or undefined', function () {
    chai.expect(v.camelCase()).to.be.equal('');
    chai.expect(v.camelCase(undefined)).to.be.equal('');
    chai.expect(v.camelCase(null)).to.be.equal('');
  });
});

describe('capitalize', function () {

  it('should capitalize the first character in a string', function () {
    chai.expect(v.capitalize('APPLE')).to.be.equal('APPLE');
    chai.expect(v.capitalize('apple')).to.be.equal('Apple');
    chai.expect(v.capitalize('macBook')).to.be.equal('MacBook');
    chai.expect(v.capitalize('f')).to.be.equal('F');
    chai.expect(v.capitalize('')).to.be.equal('');
    chai.expect(v.capitalize('*apple')).to.be.equal('*apple');
    chai.expect(v.capitalize(PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII);
  });

  it('should capitalize the first character in a string and keep the rest unmodified', function () {
    chai.expect(v.capitalize('apple', true)).to.be.equal('Apple');
    chai.expect(v.capitalize('APPLE', true)).to.be.equal('Apple');
    chai.expect(v.capitalize('яблоко', true)).to.be.equal('Яблоко');
    chai.expect(v.capitalize('f', true)).to.be.equal('F');
    chai.expect(v.capitalize('', true)).to.be.equal('');
    chai.expect(v.capitalize('100', true)).to.be.equal('100');
    chai.expect(v.capitalize('  ', true)).to.be.equal('  ');
  });

  it('should capitalize the first character in a string representation of an object', function () {
    chai.expect(v.capitalize(['grape'])).to.be.equal('Grape');
    chai.expect(v.capitalize({
      toString: function toString() {
        return 'oRaNgE';
      }
    }, false)).to.be.equal('ORaNgE');
  });

  it('should not modify numbers', function () {
    chai.expect(v.capitalize(100)).to.be.equal('100');
    chai.expect(v.capitalize(812, false)).to.be.equal('812');
  });

  it('should return an empty string for null or undefined', function () {
    chai.expect(v.capitalize()).to.be.equal('');
    chai.expect(v.capitalize(undefined)).to.be.equal('');
    chai.expect(v.capitalize(null)).to.be.equal('');
    chai.expect(v.capitalize(undefined, true)).to.be.equal('');
    chai.expect(v.capitalize(undefined, false)).to.be.equal('');
  });
});

describe('decapitalize', function () {

  it('should decapitalize the first character in a string', function () {
    chai.expect(v.decapitalize('Light')).to.be.equal('light');
    chai.expect(v.decapitalize('light')).to.be.equal('light');
    chai.expect(v.decapitalize('Sun')).to.be.equal('sun');
    chai.expect(v.decapitalize('f')).to.be.equal('f');
    chai.expect(v.decapitalize('')).to.be.equal('');
    chai.expect(v.decapitalize('*light')).to.be.equal('*light');
    chai.expect(v.decapitalize(PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII);
  });

  it('should decapitalize the first character in a string representation of an object', function () {
    chai.expect(v.decapitalize(['Fruit'])).to.be.equal('fruit');
    chai.expect(v.decapitalize({
      toString: function toString() {
        return 'CaRrOt';
      }
    }, false)).to.be.equal('caRrOt');
  });

  it('should not modify numbers', function () {
    chai.expect(v.decapitalize(100)).to.be.equal('100');
    chai.expect(v.decapitalize(812, false)).to.be.equal('812');
  });

  it('should return an empty string for null or undefined', function () {
    chai.expect(v.decapitalize()).to.be.equal('');
    chai.expect(v.decapitalize(undefined)).to.be.equal('');
    chai.expect(v.decapitalize(null)).to.be.equal('');
  });
});

describe('kebabCase', function () {

  it('should return the kebab case of a string', function () {
    chai.expect(v.kebabCase('bird')).to.be.equal('bird');
    chai.expect(v.kebabCase('BIRD')).to.be.equal('bird');
    chai.expect(v.kebabCase('BirdFlight')).to.be.equal('bird-flight');
    chai.expect(v.kebabCase('bird flight')).to.be.equal('bird-flight');
    chai.expect(v.kebabCase('San Diego Zoo Safari Park')).to.be.equal('san-diego-zoo-safari-park');
    chai.expect(v.kebabCase('-BIRD-FLIGHT-')).to.be.equal('bird-flight');
    chai.expect(v.kebabCase('__BIRD___FLIGHT___')).to.be.equal('bird-flight');
    chai.expect(v.kebabCase('Restless flycatcher')).to.be.equal('restless-flycatcher');
    chai.expect(v.kebabCase('XMLHttpRequest')).to.be.equal('xml-http-request');
    chai.expect(v.kebabCase('weight of up to 12 kg')).to.be.equal('weight-of-up-to-12-kg');
    chai.expect(v.kebabCase('/home/dmitri/projects/voca')).to.be.equal('home-dmitri-projects-voca');
    chai.expect(v.kebabCase(PRINTABLE_ASCII)).to.be.equal('0123456789-abcdefghijklmnopqrstuvwxyz-abcdefghijklmnopqrstuvwxyz');
    chai.expect(v.kebabCase('****')).to.be.equal('');
    chai.expect(v.kebabCase('****')).to.be.equal('');
    chai.expect(v.kebabCase('-----')).to.be.equal('');
    chai.expect(v.kebabCase('     ')).to.be.equal('');
    chai.expect(v.kebabCase('\n\n\n\n   ***\t\t')).to.be.equal('');
    chai.expect(v.kebabCase('')).to.be.equal('');
  });

  it('should return the kebab case of a non-latin string', function () {
    chai.expect(v.kebabCase('zborul păsării')).to.be.equal('zborul-păsării');
    chai.expect(v.kebabCase('полет птицы')).to.be.equal('полет-птицы');
    chai.expect(v.kebabCase('fuerza de sustentación')).to.be.equal('fuerza-de-sustentación');
    chai.expect(v.kebabCase('skrzydło ptaka składa się')).to.be.equal('skrzydło-ptaka-składa-się');
  });

  it('should not modify numbers', function () {
    chai.expect(v.kebabCase(0)).to.be.equal('0');
    chai.expect(v.kebabCase(1200)).to.be.equal('1200');
    chai.expect(v.kebabCase('8965')).to.be.equal('8965');
  });

  it('should return the kebab case of a string representation of an object', function () {
    chai.expect(v.kebabCase(['bird flight'])).to.be.equal('bird-flight');
    chai.expect(v.kebabCase({
      toString: function toString() {
        return 'bird flight';
      }
    })).to.be.equal('bird-flight');
  });

  it('should return empty string for null or undefined', function () {
    chai.expect(v.kebabCase()).to.be.equal('');
    chai.expect(v.kebabCase(undefined)).to.be.equal('');
    chai.expect(v.kebabCase(null)).to.be.equal('');
  });
});

describe('lowerCase', function () {

  it('should return the lower case of a string', function () {
    chai.expect(v.lowerCase('Saturn')).to.be.equal('saturn');
    chai.expect(v.lowerCase('EARTH')).to.be.equal('earth');
    chai.expect(v.lowerCase('456')).to.be.equal('456');
    chai.expect(v.lowerCase('')).to.be.equal('');
  });

  it('should return the lower case of a string representation of an object', function () {
    chai.expect(v.lowerCase(['Venus'])).to.be.equal('venus');
    chai.expect(v.lowerCase({
      toString: function toString() {
        return 'Venus';
      }
    })).to.be.equal('venus');
  });

  it('should return empty string for null or undefined', function () {
    chai.expect(v.lowerCase()).to.be.equal('');
    chai.expect(v.lowerCase(undefined)).to.be.equal('');
    chai.expect(v.lowerCase(null)).to.be.equal('');
  });
});

describe('snakeCase', function () {

  it('should return the snake case of a string', function () {
    chai.expect(v.snakeCase('bird')).to.be.equal('bird');
    chai.expect(v.snakeCase('BIRD')).to.be.equal('bird');
    chai.expect(v.snakeCase('BirdFlight')).to.be.equal('bird_flight');
    chai.expect(v.snakeCase('bird flight')).to.be.equal('bird_flight');
    chai.expect(v.snakeCase('San Diego Zoo Safari Park')).to.be.equal('san_diego_zoo_safari_park');
    chai.expect(v.snakeCase('-BIRD-FLIGHT-')).to.be.equal('bird_flight');
    chai.expect(v.snakeCase('__BIRD___FLIGHT___')).to.be.equal('bird_flight');
    chai.expect(v.snakeCase('Restless flycatcher')).to.be.equal('restless_flycatcher');
    chai.expect(v.snakeCase('XMLHttpRequest')).to.be.equal('xml_http_request');
    chai.expect(v.snakeCase('weight of up to 12 kg')).to.be.equal('weight_of_up_to_12_kg');
    chai.expect(v.snakeCase('/home/dmitri/projects/voca')).to.be.equal('home_dmitri_projects_voca');
    chai.expect(v.snakeCase(PRINTABLE_ASCII)).to.be.equal('0123456789_abcdefghijklmnopqrstuvwxyz_abcdefghijklmnopqrstuvwxyz');
    chai.expect(v.snakeCase('****')).to.be.equal('');
    chai.expect(v.snakeCase('****')).to.be.equal('');
    chai.expect(v.snakeCase('-----')).to.be.equal('');
    chai.expect(v.snakeCase('     ')).to.be.equal('');
    chai.expect(v.snakeCase('\n\n\n\n   ***\t\t')).to.be.equal('');
    chai.expect(v.snakeCase('')).to.be.equal('');
  });

  it('should return the snake case of a non-latin string', function () {
    chai.expect(v.snakeCase('zborul păsării')).to.be.equal('zborul_păsării');
    chai.expect(v.snakeCase('полет птицы')).to.be.equal('полет_птицы');
    chai.expect(v.snakeCase('fuerza de sustentación')).to.be.equal('fuerza_de_sustentación');
    chai.expect(v.snakeCase('skrzydło ptaka składa się')).to.be.equal('skrzydło_ptaka_składa_się');
  });

  it('should not modify numbers', function () {
    chai.expect(v.snakeCase(0)).to.be.equal('0');
    chai.expect(v.snakeCase(1200)).to.be.equal('1200');
    chai.expect(v.snakeCase('8965')).to.be.equal('8965');
  });

  it('should return the snake case of a string representation of an object', function () {
    chai.expect(v.snakeCase(['bird flight'])).to.be.equal('bird_flight');
    chai.expect(v.snakeCase({
      toString: function toString() {
        return 'bird flight';
      }
    })).to.be.equal('bird_flight');
  });

  it('should return empty string for null or undefined', function () {
    chai.expect(v.snakeCase()).to.be.equal('');
    chai.expect(v.snakeCase(undefined)).to.be.equal('');
    chai.expect(v.snakeCase(null)).to.be.equal('');
  });
});

describe('upperCase', function () {

  it('should return the upper case of a string', function () {
    chai.expect(v.upperCase('Saturn')).to.be.equal('SATURN');
    chai.expect(v.upperCase('Earth')).to.be.equal('EARTH');
    chai.expect(v.upperCase('456')).to.be.equal('456');
    chai.expect(v.upperCase('')).to.be.equal('');
  });

  it('should return the upper case of a string representation of an object', function () {
    chai.expect(v.upperCase(['Venus'])).to.be.equal('VENUS');
    chai.expect(v.upperCase({
      toString: function toString() {
        return 'Venus';
      }
    })).to.be.equal('VENUS');
  });

  it('should return empty string for null or undefined', function () {
    chai.expect(v.upperCase()).to.be.equal('');
    chai.expect(v.upperCase(undefined)).to.be.equal('');
    chai.expect(v.upperCase(null)).to.be.equal('');
  });
});

describe('count', function () {

  it('should return the number of substring appearances in a string', function () {
    chai.expect(v.count('Hey man where-where-where\'s your cup holder?', 'where')).to.be.equal(3);
    chai.expect(v.count('And some Skittles', 'Skittles')).to.be.equal(1);
    chai.expect(v.count('And some Skittles', 'chocolate')).to.be.equal(0);
    chai.expect(v.count('******', '*')).to.be.equal(6);
    chai.expect(v.count('*******', '**')).to.be.equal(3);
    chai.expect(v.count('*******', '**-')).to.be.equal(0);
    chai.expect(v.count('*******', '***')).to.be.equal(2);
    chai.expect(v.count('*******', '****')).to.be.equal(1);
    chai.expect(v.count('*******', '********')).to.be.equal(0);
    chai.expect(v.count('*-*-*', '**')).to.be.equal(0);
    chai.expect(v.count('', '')).to.be.equal(0);
    chai.expect(v.count(PRINTABLE_ASCII, '#')).to.be.equal(1);
  });

  it('should return the number of appearances of a number in a number', function () {
    chai.expect(v.count(111222, 1)).to.be.equal(3);
    chai.expect(v.count(0, 0)).to.be.equal(1);
    chai.expect(v.count(15, 16)).to.be.equal(0);
  });

  it('should return the number of substring appearances in a string representation of an object', function () {
    chai.expect(v.count(['where-where-where'], 'where')).to.be.equal(3);
    chai.expect(v.count({
      toString: function toString() {
        return 'where-where-where';
      }
    }, 'where')).to.be.equal(3);
  });

  it('should return zero for undefined or null', function () {
    chai.expect(v.count()).to.be.equal(0);
    chai.expect(v.count(undefined)).to.be.equal(0);
    chai.expect(v.count(null)).to.be.equal(0);
    chai.expect(v.count(undefined, undefined)).to.be.equal(0);
    chai.expect(v.count(null, null)).to.be.equal(0);
  });
});

describe('length', function () {

  it('should return the number of characters in a string', function () {
    chai.expect(v.length('rain')).to.be.equal(4);
    chai.expect(v.length('')).to.be.equal(0);
    chai.expect(v.length('rainbow')).to.be.equal(7);
    chai.expect(v.length(PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII.length);
  });

  it('should return the number of characters in a number', function () {
    chai.expect(v.length(123)).to.be.equal(3);
    chai.expect(v.length(0)).to.be.equal(1);
    chai.expect(v.length(-1.5)).to.be.equal(4);
  });

  it('should return the number of characters in a string representation of an object', function () {
    chai.expect(v.length(['droplet'])).to.be.equal(7);
    chai.expect(v.length({
      toString: function toString() {
        return 'rainfall';
      }
    })).to.be.equal(8);
  });

  it('should return zero for undefined or null', function () {
    chai.expect(v.length()).to.be.equal(0);
    chai.expect(v.length(null)).to.be.equal(0);
    chai.expect(v.length(undefined)).to.be.equal(0);
  });
});

describe('lengthCodePoint', function () {

  it('should return the number of characters in a string', function () {
    chai.expect(v.lengthCodePoint('rain')).to.be.equal(4);
    chai.expect(v.lengthCodePoint('')).to.be.equal(0);
    chai.expect(v.lengthCodePoint('rainbow')).to.be.equal(7);
    chai.expect(v.lengthCodePoint('é⃝')).to.be.equal(1);
    chai.expect(v.lengthCodePoint('𝐀𝐁')).to.be.equal(2);
    chai.expect(v.lengthCodePoint('mañana')).to.be.equal(6);
    chai.expect(v.lengthCodePoint('café')).to.be.equal(4);
    chai.expect(v.lengthCodePoint('foõ͜͝͞bar')).to.be.equal(6);
    chai.expect(v.lengthCodePoint('foo𝌆̃͜͝͞bar')).to.be.equal(7);
    chai.expect(v.lengthCodePoint(PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII.length);
  });

  it('should return the number of characters in a number', function () {
    chai.expect(v.lengthCodePoint(123)).to.be.equal(3);
    chai.expect(v.lengthCodePoint(0)).to.be.equal(1);
    chai.expect(v.lengthCodePoint(-1.5)).to.be.equal(4);
  });

  it('should return the number of characters in a string representation of an object', function () {
    chai.expect(v.lengthCodePoint(['droplet'])).to.be.equal(7);
    chai.expect(v.lengthCodePoint({
      toString: function toString() {
        return 'rainfall';
      }
    })).to.be.equal(8);
  });

  it('should return zero for undefined or null', function () {
    chai.expect(v.lengthCodePoint()).to.be.equal(0);
    chai.expect(v.lengthCodePoint(null)).to.be.equal(0);
    chai.expect(v.lengthCodePoint(undefined)).to.be.equal(0);
  });
});

describe('lengthWhere', function () {

  it('should return the number of characters in a string for a predicate', function () {
    chai.expect(v.lengthWhere('', v.isAlpha)).to.be.equal(0);
    chai.expect(v.lengthWhere('africa654', v.isAlpha)).to.be.equal(6);
    chai.expect(v.lengthWhere('790', v.isAlpha)).to.be.equal(0);
    chai.expect(v.lengthWhere(PRINTABLE_ASCII, v.isDigit)).to.be.equal(10);
    chai.expect(v.lengthWhere('****--**--**', function (character) {
      return character === '*';
    })).to.be.equal(8);
    chai.expect(v.lengthWhere('****--**--**', function () {
      return false;
    })).to.be.equal(0);
  });

  it('should invoke the predicate with correct parameters and context', function () {
    var verifyIndex = 0,
        context = {},
        verifyString = '0123456789';
    chai.expect(v.lengthWhere(verifyString, function (character, index, string) {
      chai.expect(index).to.be.equal(verifyIndex);
      chai.expect(this).to.be.equal(context);
      chai.expect(string).to.be.equal(verifyString);
      chai.expect(character).to.be.equal(verifyString[verifyIndex]);
      verifyIndex++;
      return true;
    }, context)).to.be.equal(10);
  });

  it('should return the number of characters in a number for a predicate', function () {
    chai.expect(v.lengthWhere(123, v.isDigit)).to.be.equal(3);
    chai.expect(v.lengthWhere(0, v.isDigit)).to.be.equal(1);
    chai.expect(v.lengthWhere(-1.5, v.isDigit)).to.be.equal(2);
  });

  it('should return the number of characters in a string representation of an object for a predicate', function () {
    chai.expect(v.lengthWhere(['droplet'], v.isDigit)).to.be.equal(0);
    chai.expect(v.lengthWhere({
      toString: function toString() {
        return 'homo sapiens';
      }
    }, v.isAlphaDigit)).to.be.equal(11);
  });

  it('should return zero for a non function predicate', function () {
    chai.expect(v.lengthWhere('africa')).to.be.equal(0);
    chai.expect(v.lengthWhere('africa', undefined)).to.be.equal(0);
    chai.expect(v.lengthWhere('africa', null)).to.be.equal(0);
    chai.expect(v.lengthWhere('africa', 'africa')).to.be.equal(0);
    chai.expect(v.lengthWhere('africa', 0)).to.be.equal(0);
    chai.expect(v.lengthWhere()).to.be.equal(0);
  });
});

describe('escapeHtml', function () {

  it('should return the escaped string', function () {
    chai.expect(v.escapeHtml('<>&"\'`')).to.be.equal('&lt;&gt;&amp;&quot;&#x27;&#x60;');
    chai.expect(v.escapeHtml('<p>wonderful world</p>')).to.be.equal('&lt;p&gt;wonderful world&lt;/p&gt;');
    chai.expect(v.escapeHtml(PRINTABLE_ASCII)).to.be.equal(' !&quot;#$%&amp;&#x27;()*+,-./0123456789:;&lt;=&gt;?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_&#x60;abcdefghijklmnopqrstuvwxyz{|}~');
  });

  it('should return the escaped string representation of an object', function () {
    chai.expect(v.escapeHtml(['<span>'])).to.be.equal('&lt;span&gt;');
    chai.expect(v.escapeHtml({
      toString: function toString() {
        return '<script>';
      }
    })).to.be.equal('&lt;script&gt;');
  });

  it('should return an empty string for null or undefined', function () {
    chai.expect(v.escapeHtml()).to.be.equal('');
    chai.expect(v.escapeHtml(undefined)).to.be.equal('');
    chai.expect(v.escapeHtml(null)).to.be.equal('');
  });
});

describe('escapeRegExp', function () {

  it('should return the escaped string', function () {
    chai.expect(v.escapeRegExp('-[]/{}()*+?.\\^$|')).to.be.equal('\\-\\[\\]\\/\\{\\}\\(\\)\\*\\+\\?\\.\\\\\\^\\$\\|');
    chai.expect(v.escapeRegExp('time')).to.be.equal('time');
    chai.expect(v.escapeRegExp('500-200')).to.be.equal('500\\-200');
    chai.expect(v.escapeRegExp('')).to.be.equal('');
    chai.expect(new RegExp(v.escapeRegExp('[a-z0-9]?')).test('[a-z0-9]?')).to.be.true;
    chai.expect(new RegExp(v.escapeRegExp('.*')).test('future')).to.be.false;
  });

  it('should return the escaped string representation of an object', function () {
    chai.expect(v.escapeRegExp(['-[]object'])).to.be.equal('\\-\\[\\]object');
    chai.expect(v.escapeRegExp({
      toString: function toString() {
        return '1.15';
      }
    })).to.be.equal('1\\.15');
  });

  it('should return an empty string for null or undefined', function () {
    chai.expect(v.escapeRegExp()).to.be.equal('');
    chai.expect(v.escapeRegExp(undefined)).to.be.equal('');
    chai.expect(v.escapeRegExp(null)).to.be.equal('');
  });
});

describe('unescapeHtml', function () {

  it('should return the unescaped', function () {
    chai.expect(v.unescapeHtml('&lt;&gt;&amp;&quot;&#x27;&#x60;')).to.be.equal('<>&"\'`');
    chai.expect(v.unescapeHtml('&lt;p&gt;wonderful world&lt;/p&gt;')).to.be.equal('<p>wonderful world</p>');
    chai.expect(v.unescapeHtml('&#x003C;p&#0062;wonderful world&#x003C;/p&#0062;')).to.be.equal('<p>wonderful world</p>');
    chai.expect(v.unescapeHtml('&lt;p&gt;wonderful world&lt;/p&gt;')).to.be.equal('<p>wonderful world</p>');
    chai.expect(v.unescapeHtml('&lt;p&gt;wonderful world&lt;/p&gt;')).to.be.equal('<p>wonderful world</p>');
    chai.expect(v.unescapeHtml('&lt; &#x03c; &#060; &gt; &#x03e; &#062; &amp; &#x026; &#038; &quot; &#x022; &#034; &#x027; &#039; &#x060; &#096;')).to.be.equal('< < < > > > & & & " " " \' \' ` `');
    chai.expect(v.unescapeHtml(' !&quot;#$%&amp;&#x27;()*+,-./0123456789:;&lt;=&gt;?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_&#x60;abcdefghijklmnopqrstuvwxyz{|}~')).to.be.equal(PRINTABLE_ASCII);
    chai.expect(v.unescapeHtml('<>&"\'`')).to.be.equal('<>&"\'`');
  });

  it('should return the unescaped string representation of an object', function () {
    chai.expect(v.unescapeHtml(['&lt;span&gt;'])).to.be.equal('<span>');
    chai.expect(v.unescapeHtml({
      toString: function toString() {
        return '&lt;script&gt;';
      }
    })).to.be.equal('<script>');
  });

  it('should return an empty string for null or undefined', function () {
    chai.expect(v.unescapeHtml()).to.be.equal('');
    chai.expect(v.unescapeHtml(undefined)).to.be.equal('');
    chai.expect(v.unescapeHtml(null)).to.be.equal('');
  });
});

describe('indexOf', function () {

  it('should return the index of a searched string', function () {
    chai.expect(v.indexOf('we have a mission', 'mission')).to.be.equal(10);
    chai.expect(v.indexOf('we have a mission', 'a')).to.be.equal(4);
    chai.expect(v.indexOf('we have a mission', 'we')).to.be.equal(0);
    chai.expect(v.indexOf('we have a mission', '')).to.be.equal(0);
    chai.expect(v.indexOf('', '')).to.be.equal(0);
    chai.expect(v.indexOf(undefined, '')).to.be.equal(0);
    chai.expect(v.indexOf(null, '')).to.be.equal(0);
    chai.expect(v.indexOf(PRINTABLE_ASCII, '!')).to.be.equal(1);
  });

  it('should return the index of a searched string and start index', function () {
    chai.expect(v.indexOf('we have a mission', 'a', 6)).to.be.equal(8);
    chai.expect(v.indexOf('we have a mission', 'we', 0)).to.be.equal(0);
    chai.expect(v.indexOf('we have a mission', 'we', NaN)).to.be.equal(0);
    chai.expect(v.indexOf('we have a mission', '', 0)).to.be.equal(0);
    chai.expect(v.indexOf(PRINTABLE_ASCII, '#', 3)).to.be.equal(3);
  });

  it('should return the index of a searched string in a string representation of an object', function () {
    chai.expect(v.indexOf(['we have a mission'], 'a')).to.be.equal(4);
    chai.expect(v.indexOf({
      toString: function toString() {
        return 'we have a mission';
      }
    }, 'we')).to.be.equal(0);
  });

  it('should return -1 for an invalid ending string and position', function () {
    chai.expect(v.indexOf('we have a mission', 'me')).to.be.equal(-1);
    chai.expect(v.indexOf('we have a mission', '12')).to.be.equal(-1);
    chai.expect(v.indexOf('we have a mission', 'we', 3)).to.be.equal(-1);
    chai.expect(v.indexOf('we have a mission', 'mission', 100)).to.be.equal(-1);
    chai.expect(v.indexOf('we have a mission', 'mission', Infinity)).to.be.equal(-1);
    chai.expect(v.indexOf('', 'me')).to.be.equal(-1);
  });

  it('should return -1 for undefined and null parameters', function () {
    chai.expect(v.indexOf('we have a mission')).to.be.equal(-1);
    chai.expect(v.indexOf('we have a mission', undefined)).to.be.equal(-1);
    chai.expect(v.indexOf('we have a mission', null)).to.be.equal(-1);
  });
});

describe('lastIndexOf', function () {

  it('should return the index of a searched string', function () {
    chai.expect(v.lastIndexOf('we have a mission', 'mission')).to.be.equal(10);
    chai.expect(v.lastIndexOf('we have a mission', 'a')).to.be.equal(8);
    chai.expect(v.lastIndexOf('we have a mission', 'we')).to.be.equal(0);
    chai.expect(v.lastIndexOf('we have a mission', '')).to.be.equal(17);
    chai.expect(v.lastIndexOf('', '')).to.be.equal(0);
    chai.expect(v.lastIndexOf(undefined, '')).to.be.equal(0);
    chai.expect(v.lastIndexOf(null, '')).to.be.equal(0);
    chai.expect(v.lastIndexOf(PRINTABLE_ASCII, '!')).to.be.equal(1);
  });

  it('should return the index of a searched string and start index', function () {
    chai.expect(v.lastIndexOf('we have a mission', 'a', 17)).to.be.equal(8);
    chai.expect(v.lastIndexOf('we have a mission', 'a', 6)).to.be.equal(4);
    chai.expect(v.lastIndexOf('we have a mission', 'we', 15)).to.be.equal(0);
    chai.expect(v.lastIndexOf('we have a mission', 'we', 17)).to.be.equal(0);
    chai.expect(v.lastIndexOf('we have a mission', '', 1)).to.be.equal(1);
    chai.expect(v.lastIndexOf(PRINTABLE_ASCII, '#', PRINTABLE_ASCII.length - 3)).to.be.equal(3);
  });

  it('should return the index of a searched string in a string representation of an object', function () {
    chai.expect(v.lastIndexOf(['we have a mission'], 'a')).to.be.equal(8);
    chai.expect(v.lastIndexOf({
      toString: function toString() {
        return 'we have a mission';
      }
    }, 'we')).to.be.equal(0);
  });

  it('should return -1 for an invalid ending string and position', function () {
    chai.expect(v.lastIndexOf('we have a mission', 'me')).to.be.equal(-1);
    chai.expect(v.lastIndexOf('we have a mission', '12')).to.be.equal(-1);
    chai.expect(v.lastIndexOf('we have a mission', 'mission', -100)).to.be.equal(-1);
    chai.expect(v.lastIndexOf('we have a mission', 'mission', -Infinity)).to.be.equal(-1);
    chai.expect(v.lastIndexOf('', 'me')).to.be.equal(-1);
  });

  it('should return -1 for undefined and null parameters', function () {
    chai.expect(v.lastIndexOf('we have a mission')).to.be.equal(-1);
    chai.expect(v.lastIndexOf('we have a mission', undefined)).to.be.equal(-1);
    chai.expect(v.lastIndexOf('we have a mission', null)).to.be.equal(-1);
  });
});

describe('search', function () {

  it('should return the index of a match', function () {
    chai.expect(v.search('we have a mission', /mission/)).to.be.equal(10);
    chai.expect(v.search('we have a mission', 'a')).to.be.equal(4);
    chai.expect(v.search('we have a mission', /we/)).to.be.equal(0);
    chai.expect(v.search('we have a mission', /\s/)).to.be.equal(2);
    chai.expect(v.search('we have a mission', '')).to.be.equal(0);
    chai.expect(v.search('', '')).to.be.equal(0);
    chai.expect(v.search(undefined, '')).to.be.equal(0);
    chai.expect(v.search(null, '')).to.be.equal(0);
    chai.expect(v.search(PRINTABLE_ASCII, '!')).to.be.equal(1);
  });

  it('should return the index of a match and start index', function () {
    chai.expect(v.search('we have a mission', /a/, 6)).to.be.equal(8);
    chai.expect(v.search('we have a mission', /we/, 0)).to.be.equal(0);
    chai.expect(v.search('we have a mission', 'we', NaN)).to.be.equal(0);
    chai.expect(v.search('we have a mission', '', 0)).to.be.equal(0);
    chai.expect(v.search(PRINTABLE_ASCII, '#', 3)).to.be.equal(3);
  });

  it('should return the index of a searched string in a string representation of an object', function () {
    chai.expect(v.search(['we have a mission'], /a/)).to.be.equal(4);
    chai.expect(v.search({
      toString: function toString() {
        return 'we have a mission';
      }
    }, /we/)).to.be.equal(0);
  });

  it('should threat a null value as "null" match pattern', function () {
    chai.expect(v.search('we have a null mission', null)).to.be.equal(10);
    chai.expect(v.search('we have a mission', null)).to.be.equal(-1);
  });

  it('should return -1 for an invalid ending string and position', function () {
    chai.expect(v.search('we have a mission', /me/)).to.be.equal(-1);
    chai.expect(v.search('we have a mission', /12/)).to.be.equal(-1);
    chai.expect(v.search('we have a mission', /\s^/)).to.be.equal(-1);
    chai.expect(v.search('we have a mission', 'we', 3)).to.be.equal(-1);
    chai.expect(v.search('we have a mission', /mission/, 100)).to.be.equal(-1);
    chai.expect(v.search('we have a mission', /mission/, Infinity)).to.be.equal(-1);
    chai.expect(v.search('', /me/)).to.be.equal(-1);
  });

  it('should return 0 for an undefined', function () {
    chai.expect(v.search('we have a mission')).to.be.equal(0);
    chai.expect(v.search('we have a mission', undefined)).to.be.equal(0);
  });
});

describe('latinise', function () {

  it('should latinise a string', function () {
    chai.expect(v.latinise('')).to.be.equal('');
    chai.expect(v.latinise('moldova')).to.be.equal('moldova');
    chai.expect(v.latinise('café')).to.be.equal('cafe');
    chai.expect(v.latinise('ma\xF1ana')).to.be.equal('manana');
    chai.expect(v.latinise('mañana')).to.be.equal('manana');
    chai.expect(v.latinise('foõ͜͝͞bar')).to.be.equal('foobar');
    chai.expect(v.latinise('café')).to.be.equal('cafe');
    chai.expect(v.latinise('colecção cópias críticos é tão')).to.be.equal('coleccao copias criticos e tao');
    chai.expect(v.latinise('književnošću čuvanje')).to.be.equal('knjizevnoscu cuvanje');
    chai.expect(v.latinise('anglikonų šiurkščios užrašinėti')).to.be.equal('anglikonu siurkscios uzrasineti');
    chai.expect(v.latinise('Schuß für Pfarrerstöchter')).to.be.equal('Schus fur Pfarrerstochter');
    chai.expect(v.latinise('publicó éxito nació María')).to.be.equal('publico exito nacio Maria');
    chai.expect(v.latinise('Charlotte Brontë')).to.be.equal('Charlotte Bronte');
    chai.expect(v.latinise('vecākā no māsām Brontē')).to.be.equal('vecaka no masam Bronte');
    chai.expect(v.latinise('Şarlotta Brontenin özü')).to.be.equal('Sarlotta Brontenin ozu');
    chai.expect(v.latinise('Wkrótce po ślubie pisarka zaszła w ciążę')).to.be.equal('Wkrotce po slubie pisarka zaszla w ciaze');
    chai.expect(v.latinise("Dès l'enfance, Charlotte, comme Emily et probablement plus fortement Branwell, est influencée par certaines sources d'inspiration")).to.be.equal("Des l'enfance, Charlotte, comme Emily et probablement plus fortement Branwell, est influencee par certaines sources d'inspiration");
    chai.expect(v.latinise('Există peste 13.800 de localități în România')).to.be.equal('Exista peste 13.800 de localitati in Romania');
    chai.expect(v.latinise('août décembre')).to.be.equal('aout decembre');
    chai.expect(v.latinise('\t\n')).to.be.equal('\t\n');
    chai.expect(v.latinise('⁇')).to.be.equal('⁇');
    chai.expect(v.latinise(PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII);
  });

  it('should latinise a string representation of an object', function () {
    chai.expect(v.latinise(['María'])).to.be.equal('Maria');
    chai.expect(v.latinise({
      toString: function toString() {
        return 'sacó';
      }
    })).to.be.equal('saco');
  });

  it('should not modify numbers', function () {
    chai.expect(v.latinise(100)).to.be.equal('100');
    chai.expect(v.latinise(812)).to.be.equal('812');
  });

  it('should return an empty string for null or undefined', function () {
    chai.expect(v.latinise()).to.be.equal('');
    chai.expect(v.latinise(undefined)).to.be.equal('');
    chai.expect(v.latinise(null)).to.be.equal('');
  });
});

describe('repeat', function () {

  it('should repeat a string', function () {
    chai.expect(v.repeat('paradise', 2)).to.be.equal('paradiseparadise');
    chai.expect(v.repeat('w', 3)).to.be.equal('www');
    chai.expect(v.repeat('the world is yours', 1)).to.be.equal('the world is yours');
    chai.expect(v.repeat('', 10)).to.be.equal('');
    chai.expect(v.repeat(PRINTABLE_ASCII, 2)).to.be.equal(PRINTABLE_ASCII + PRINTABLE_ASCII);
  });

  it('should return an empty string for 0 repeat times', function () {
    chai.expect(v.repeat('the world is yours', 0)).to.be.equal('');
    chai.expect(v.repeat('', 0)).to.be.equal('');
  });

  it('should return the same string when the number of times is null or undefined', function () {
    chai.expect(v.repeat('the world is yours')).to.be.equal('the world is yours');
    chai.expect(v.repeat('the world is yours', null)).to.be.equal('the world is yours');
    chai.expect(v.repeat('the world is yours', undefined)).to.be.equal('the world is yours');
  });

  it('should repeat a number', function () {
    chai.expect(v.repeat(123, 2)).to.be.equal('123123');
    chai.expect(v.repeat(0, 5)).to.be.equal('00000');
    chai.expect(v.repeat(-1.5, 2)).to.be.equal('-1.5-1.5');
  });

  it('should repeat a string representation of an object', function () {
    chai.expect(v.repeat(['paradise'], 2)).to.be.equal('paradiseparadise');
    chai.expect(v.repeat({
      toString: function toString() {
        return 'Tony';
      }
    }, 2)).to.be.equal('TonyTony');
  });

  it('should return an empty string for null or undefined string to be repeated', function () {
    chai.expect(v.repeat()).to.be.equal('');
    chai.expect(v.repeat(null)).to.be.equal('');
    chai.expect(v.repeat(undefined)).to.be.equal('');
    chai.expect(v.repeat(undefined, 10)).to.be.equal('');
  });
});

describe('pad', function () {

  it('should pad a string', function () {
    chai.expect(v.pad('FF', 4, '0')).to.be.equal('0FF0');
    chai.expect(v.pad('00FF', 4, '0')).to.be.equal('00FF');
    chai.expect(v.pad('ab', 10, '012')).to.be.equal('0120ab0120');
    chai.expect(v.pad('0', 5, '0')).to.be.equal('00000');
    chai.expect(v.pad('', 10, '01')).to.be.equal('0101001010');
    chai.expect(v.pad('Hello World')).to.be.equal('Hello World');
    chai.expect(v.pad('Hello World', 20, '')).to.be.equal('Hello World');
    chai.expect(v.pad('Welcome', 10)).to.be.equal(' Welcome  ');
    chai.expect(v.pad('Alien', 10, '-=')).to.be.equal('-=Alien-=-');
    chai.expect(v.pad(PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII);
    chai.expect(v.pad(PRINTABLE_ASCII, PRINTABLE_ASCII.length + 3, '--')).to.be.equal('-' + PRINTABLE_ASCII + '--');
    chai.expect(v.pad('')).to.be.equal('');
    chai.expect(v.pad('', 0)).to.be.equal('');
  });

  it('should not modify the string when pad length is less than string length', function () {
    chai.expect(v.pad('Hello World', 0, ' ')).to.be.equal('Hello World');
    chai.expect(v.pad('Hello World', 5, ' ')).to.be.equal('Hello World');
    chai.expect(v.pad('0', 0, ' ')).to.be.equal('0');
    chai.expect(v.pad('123', -1, ' ')).to.be.equal('123');
  });

  it('should pad a string representation of an object', function () {
    chai.expect(v.pad(['Welcome'], 9)).to.be.equal(' Welcome ');
    chai.expect(v.pad({
      toString: function toString() {
        return 'great';
      }
    }, 10, '-')).to.be.equal('--great---');
  });

  it('should return an empty string for null or undefined', function () {
    chai.expect(v.pad()).to.be.equal('');
    chai.expect(v.pad(undefined)).to.be.equal('');
    chai.expect(v.pad(null)).to.be.equal('');
  });
});

describe('padLeft', function () {

  it('should left pad a string', function () {
    chai.expect(v.padLeft('FF', 4, '0')).to.be.equal('00FF');
    chai.expect(v.padLeft('00FF', 4, '0')).to.be.equal('00FF');
    chai.expect(v.padLeft('ab', 10, '012')).to.be.equal('01201201ab');
    chai.expect(v.padLeft('0', 5, '0')).to.be.equal('00000');
    chai.expect(v.padLeft('', 10, '01')).to.be.equal('0101010101');
    chai.expect(v.padLeft('Hello World')).to.be.equal('Hello World');
    chai.expect(v.padLeft('Hello World', 20, '')).to.be.equal('Hello World');
    chai.expect(v.padLeft('Welcome', 10)).to.be.equal('   Welcome');
    chai.expect(v.padLeft('Alien', 10, '-=')).to.be.equal('-=-=-Alien');
    chai.expect(v.padLeft(PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII);
    chai.expect(v.padLeft(PRINTABLE_ASCII, PRINTABLE_ASCII.length + 3, '--')).to.be.equal('---' + PRINTABLE_ASCII);
    chai.expect(v.padLeft('')).to.be.equal('');
    chai.expect(v.padLeft('', 0)).to.be.equal('');
  });

  it('should not modify the string when pad length is less than string length', function () {
    chai.expect(v.padLeft('Hello World', 0, ' ')).to.be.equal('Hello World');
    chai.expect(v.padLeft('Hello World', 5, ' ')).to.be.equal('Hello World');
    chai.expect(v.padLeft('0', 0, ' ')).to.be.equal('0');
    chai.expect(v.padLeft('123', -1, ' ')).to.be.equal('123');
  });

  it('should left pad a string representation of an object', function () {
    chai.expect(v.padLeft(['Welcome'], 9)).to.be.equal('  Welcome');
    chai.expect(v.padLeft({
      toString: function toString() {
        return 'great';
      }
    }, 10, '-')).to.be.equal('-----great');
  });

  it('should return an empty string for null or undefined', function () {
    chai.expect(v.padLeft()).to.be.equal('');
    chai.expect(v.padLeft(undefined)).to.be.equal('');
    chai.expect(v.padLeft(null)).to.be.equal('');
  });
});

describe('padRight', function () {

  it('should right pad a string', function () {
    chai.expect(v.padRight('FF', 4, '0')).to.be.equal('FF00');
    chai.expect(v.padRight('00FF', 4, '0')).to.be.equal('00FF');
    chai.expect(v.padRight('ab', 10, '012')).to.be.equal('ab01201201');
    chai.expect(v.padRight('0', 5, '0')).to.be.equal('00000');
    chai.expect(v.padRight('', 10, '01')).to.be.equal('0101010101');
    chai.expect(v.padRight('Hello World')).to.be.equal('Hello World');
    chai.expect(v.padRight('Hello World', 20, '')).to.be.equal('Hello World');
    chai.expect(v.padRight('Welcome', 10)).to.be.equal('Welcome   ');
    chai.expect(v.padRight('123', 6, '_-')).to.be.equal('123_-_');
    chai.expect(v.padRight(PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII);
    chai.expect(v.padRight(PRINTABLE_ASCII, PRINTABLE_ASCII.length + 3, '--')).to.be.equal(PRINTABLE_ASCII + '---');
    chai.expect(v.padRight('')).to.be.equal('');
    chai.expect(v.padRight('', 0)).to.be.equal('');
  });

  it('should not modify the string when pad length is less than string length', function () {
    chai.expect(v.padRight('Hello World', 0, ' ')).to.be.equal('Hello World');
    chai.expect(v.padRight('Hello World', 5, ' ')).to.be.equal('Hello World');
    chai.expect(v.padRight('0', 0, ' ')).to.be.equal('0');
    chai.expect(v.padRight('123', -1, ' ')).to.be.equal('123');
  });

  it('should right pad a string representation of an object', function () {
    chai.expect(v.padRight(['Welcome'], 9)).to.be.equal('Welcome  ');
    chai.expect(v.padRight({
      toString: function toString() {
        return 'great';
      }
    }, 10, '-')).to.be.equal('great-----');
  });

  it('should return an empty string for null or undefined', function () {
    chai.expect(v.padRight()).to.be.equal('');
    chai.expect(v.padRight(undefined)).to.be.equal('');
    chai.expect(v.padRight(null)).to.be.equal('');
  });
});

describe('prune', function () {

  it('should prune a string', function () {
    chai.expect(v.prune('Once upon a time there lived in a certain village a little country girl', 6)).to.be.equal('Once...');
    chai.expect(v.prune('I\'ll go this way and go you that', 9, ' (read more)')).to.be.equal('I\'ll go (read more)');
    chai.expect(v.prune('Little Red Riding Hood', 6, '...')).to.be.equal('Little...');
    chai.expect(v.prune('Little Red Riding Hood', 9, '...')).to.be.equal('Little...');
    chai.expect(v.prune('Little Red Riding Hood', 11, '...')).to.be.equal('Little Red...');
    chai.expect(v.prune('Little Red Riding Hood', 20, '...')).to.be.equal('Little Red Riding...');
    chai.expect(v.prune('Little Red Riding Hood', 22, '...')).to.be.equal('Little Red Riding Hood');
    chai.expect(v.prune('Little Red Riding Hood', 1, '...')).to.be.equal('...');
    chai.expect(v.prune('Little Red Riding Hood', 5, '...')).to.be.equal('...');
    chai.expect(v.prune('Little Red Riding Hood', 0, '(more)')).to.be.equal('(more)');
    chai.expect(v.prune(PRINTABLE_ASCII, PRINTABLE_ASCII.length)).to.be.equal(PRINTABLE_ASCII);
    chai.expect(v.prune(PRINTABLE_ASCII, 0)).to.be.equal('...');
  });

  it('should not prune a string if length parameter is greater or equal than string length', function () {
    chai.expect(v.prune('Once upon', 20)).to.be.equal('Once upon');
    chai.expect(v.prune('Once', 4, ' (read more)')).to.be.equal('Once');
    chai.expect(v.prune('', 0, '....')).to.be.equal('');
  });

  it('should prune a string representation of an object', function () {
    chai.expect(v.prune(['Welcome'], 4)).to.be.equal('...');
    chai.expect(v.prune({
      toString: function toString() {
        return 'Have a nice day';
      }
    }, 4, '..')).to.be.equal('Have..');
  });

  it('should return an empty string for null or undefined', function () {
    chai.expect(v.prune()).to.be.equal('');
    chai.expect(v.prune(undefined)).to.be.equal('');
    chai.expect(v.prune(null)).to.be.equal('');
  });
});

describe('replace', function () {

  it('should return the replace result with a string pattern', function () {
    chai.expect(v.replace('duck', 'duck', 'swan')).to.be.equal('swan');
    chai.expect(v.replace('duck', 'duck', '')).to.be.equal('');
    chai.expect(v.replace('duck', 'd', '')).to.be.equal('uck');
    chai.expect(v.replace('duck', 'u', function () {
      return 'a';
    })).to.be.equal('dack');
    chai.expect(v.replace('', '', '')).to.be.equal('');
    chai.expect(v.replace(PRINTABLE_ASCII, PRINTABLE_ASCII, PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII);
    chai.expect(v.replace(PRINTABLE_ASCII, PRINTABLE_ASCII, 'duck')).to.be.equal('duck');
  });

  it('should return the replace result with a RegExp pattern', function () {
    chai.expect(v.replace('duck', /duck/, 'swan')).to.be.equal('swan');
    chai.expect(v.replace('duck', /duck/, '')).to.be.equal('');
    chai.expect(v.replace('duck', /d/, '')).to.be.equal('uck');
    chai.expect(v.replace('duck', /u/, function () {
      return 'a';
    })).to.be.equal('dack');
    chai.expect(v.replace('hello world', /(hello)\s(world)/, function (match, hello, world) {
      return world + ', ' + hello;
    })).to.be.equal('world, hello');
  });

  it('should return the replace result from a string representation of an object', function () {
    chai.expect(v.replace(['duck'], 'duck', 'swan')).to.be.equal('swan');
    chai.expect(v.replace({
      toString: function toString() {
        return 'mandarin duck';
      }
    }, /mandarin\s/, '')).to.be.equal('duck');
  });

  it('should return the replace result from a number', function () {
    chai.expect(v.replace(1500, '0', '1')).to.be.equal('1510');
    chai.expect(v.replace(6475, /\d/g, '*')).to.be.equal('****');
  });

  it('should return the an empty string for an undefined or null', function () {
    chai.expect(v.replace(undefined, /./, '1')).to.be.equal('');
    chai.expect(v.replace(null, /./, '1')).to.be.equal('');
  });
});

describe('reverse', function () {

  it('should reverse a string', function () {
    chai.expect(v.reverse('green tree')).to.be.equal('eert neerg');
    chai.expect(v.reverse('o')).to.be.equal('o');
    chai.expect(v.reverse('\n\t')).to.be.equal('\t\n');
    chai.expect(v.reverse('')).to.be.equal('');
    chai.expect(v.reverse(PRINTABLE_ASCII)).to.be.equal(REVERSED_PRINTABLE_ASCII);
  });

  it('should reverse a number', function () {
    chai.expect(v.reverse(123)).to.be.equal('321');
    chai.expect(v.reverse(0)).to.be.equal('0');
    chai.expect(v.reverse(-1.5)).to.be.equal('5.1-');
  });

  it('should reverse a string representation of an object', function () {
    chai.expect(v.reverse(['flower'])).to.be.equal('rewolf');
    chai.expect(v.reverse({
      toString: function toString() {
        return 'flower';
      }
    })).to.be.equal('rewolf');
  });

  it('should return an empty string for null or undefined', function () {
    chai.expect(v.reverse()).to.be.equal('');
    chai.expect(v.reverse(null)).to.be.equal('');
    chai.expect(v.reverse(undefined)).to.be.equal('');
  });
});

describe('reverseCodePoint', function () {

  it('should reverse a string', function () {
    chai.expect(v.reverseCodePoint('green tree')).to.be.equal('eert neerg');
    chai.expect(v.reverseCodePoint('ma\xF1ana')).to.be.equal('ana\xF1am');
    chai.expect(v.reverseCodePoint('mañana')).to.be.equal('anañam');
    chai.expect(v.reverseCodePoint('foõ͜͝͞bar')).to.be.equal('rabõ͜͝͞of');
    chai.expect(v.reverseCodePoint('foo𝌆̃͜͝͞bar')).to.be.equal('rab𝌆̃͜͝͞oof');
    chai.expect(v.reverseCodePoint('o')).to.be.equal('o');
    chai.expect(v.reverseCodePoint('\n\t')).to.be.equal('\t\n');
    chai.expect(v.reverseCodePoint('')).to.be.equal('');
    chai.expect(v.reverseCodePoint(PRINTABLE_ASCII)).to.be.equal(REVERSED_PRINTABLE_ASCII);
  });

  it('should reverseCodePoint a number', function () {
    chai.expect(v.reverseCodePoint(123)).to.be.equal('321');
    chai.expect(v.reverseCodePoint(0)).to.be.equal('0');
    chai.expect(v.reverseCodePoint(-1.5)).to.be.equal('5.1-');
  });

  it('should reverseCodePoint a string representation of an object', function () {
    chai.expect(v.reverseCodePoint(['flower'])).to.be.equal('rewolf');
    chai.expect(v.reverseCodePoint({
      toString: function toString() {
        return 'flower';
      }
    })).to.be.equal('rewolf');
  });

  it('should return an empty string for null or undefined', function () {
    chai.expect(v.reverseCodePoint()).to.be.equal('');
    chai.expect(v.reverseCodePoint(null)).to.be.equal('');
    chai.expect(v.reverseCodePoint(undefined)).to.be.equal('');
  });
});

describe('slice', function () {

  it('should slice a string', function () {
    chai.expect(v.slice('infinite loop', 9)).to.be.equal('loop');
    chai.expect(v.slice('infinite loop', 0)).to.be.equal('infinite loop');
    chai.expect(v.slice('infinite loop')).to.be.equal('infinite loop');
    chai.expect(v.slice('infinite loop', 1)).to.be.equal('nfinite loop');
    chai.expect(v.slice(PRINTABLE_ASCII, 0)).to.be.equal(PRINTABLE_ASCII);
  });

  it('should slice a string with an end position', function () {
    chai.expect(v.slice('infinite loop', 9, 12)).to.be.equal('loo');
    chai.expect(v.slice('infinite loop', 9, -1)).to.be.equal('loo');
    chai.expect(v.slice('infinite loop', 0, 'infinite loop'.length)).to.be.equal('infinite loop');
    chai.expect(v.slice('infinite loop', 1, 2)).to.be.equal('n');
    chai.expect(v.slice('infinite loop', -4, -1)).to.be.equal('loo');
  });

  it('should slice a string representation of an object', function () {
    chai.expect(v.slice(['infinite loop'], 10)).to.be.equal('oop');
    chai.expect(v.slice({
      toString: function toString() {
        return 'loop';
      }
    }, 0, 3)).to.be.equal('loo');
  });

  it('should slice a string from a number', function () {
    chai.expect(v.slice(12345, 3)).to.be.equal('45');
    chai.expect(v.slice(987, 1, 2)).to.be.equal('8');
  });
});

describe('slugify', function () {

  it('should slugify the string', function () {
    chai.expect(v.slugify('bird')).to.be.equal('bird');
    chai.expect(v.slugify('BIRD')).to.be.equal('bird');
    chai.expect(v.slugify('BirdFlight')).to.be.equal('bird-flight');
    chai.expect(v.slugify('bird flight')).to.be.equal('bird-flight');
    chai.expect(v.slugify('San Diego Zoo Safari Park')).to.be.equal('san-diego-zoo-safari-park');
    chai.expect(v.slugify('-BIRD-FLIGHT-')).to.be.equal('bird-flight');
    chai.expect(v.slugify('__BIRD___FLIGHT___')).to.be.equal('bird-flight');
    chai.expect(v.slugify('Restless flycatcher')).to.be.equal('restless-flycatcher');
    chai.expect(v.slugify('XMLHttpRequest')).to.be.equal('xml-http-request');
    chai.expect(v.slugify('weight of up to 12 kg')).to.be.equal('weight-of-up-to-12-kg');
    chai.expect(v.slugify('/home/dmitri/projects/voca')).to.be.equal('home-dmitri-projects-voca');
    chai.expect(v.slugify(PRINTABLE_ASCII)).to.be.equal('0123456789-abcdefghijklmnopqrstuvwxyz-abcdefghijklmnopqrstuvwxyz');
    chai.expect(v.slugify('****')).to.be.equal('');
    chai.expect(v.slugify('****')).to.be.equal('');
    chai.expect(v.slugify('-----')).to.be.equal('');
    chai.expect(v.slugify('     ')).to.be.equal('');
    chai.expect(v.slugify('\n\n\n\n   ***\t\t')).to.be.equal('');
    chai.expect(v.slugify('')).to.be.equal('');
  });

  it('should slugify the string of a non-latin string', function () {
    chai.expect(v.slugify('zborul păsării')).to.be.equal('zborul-pasarii');
    chai.expect(v.slugify('fuerza de sustentación')).to.be.equal('fuerza-de-sustentacion');
    chai.expect(v.slugify('skrzydło ptaka składa się')).to.be.equal('skrzydlo-ptaka-sklada-sie');
    chai.expect(v.slugify('mañana')).to.be.equal('manana');
    chai.expect(v.slugify('foõ͜͝͞ bar')).to.be.equal('foo-bar');
  });

  it('should not modify numbers', function () {
    chai.expect(v.slugify(0)).to.be.equal('0');
    chai.expect(v.slugify(1200)).to.be.equal('1200');
    chai.expect(v.slugify('8965')).to.be.equal('8965');
  });

  it('should slugify the string representation of an object', function () {
    chai.expect(v.slugify(['bird flight'])).to.be.equal('bird-flight');
    chai.expect(v.slugify({
      toString: function toString() {
        return 'bird flight';
      }
    })).to.be.equal('bird-flight');
  });

  it('should return empty string for null or undefined', function () {
    chai.expect(v.slugify()).to.be.equal('');
    chai.expect(v.slugify(undefined)).to.be.equal('');
    chai.expect(v.slugify(null)).to.be.equal('');
  });
});

describe('substr', function () {

  it('should substract a string', function () {
    chai.expect(v.substr('infinite loop', 9)).to.be.equal('loop');
    chai.expect(v.substr('infinite loop', 0)).to.be.equal('infinite loop');
    chai.expect(v.substr('infinite loop')).to.be.equal('infinite loop');
    chai.expect(v.substr('infinite loop', 1)).to.be.equal('nfinite loop');
    chai.expect(v.substr('infinite loop', -4)).to.be.equal('loop');
    chai.expect(v.substr(PRINTABLE_ASCII, 0)).to.be.equal(PRINTABLE_ASCII);
  });

  it('should substract a string with a length', function () {
    chai.expect(v.substr('infinite loop', 9, 3)).to.be.equal('loo');
    chai.expect(v.substr('infinite loop', 0, 'infinite loop'.length)).to.be.equal('infinite loop');
    chai.expect(v.substr('infinite loop', 1, 1)).to.be.equal('n');
    chai.expect(v.substr('infinite loop', -4, 1)).to.be.equal('l');
  });

  it('should substract a string representation of an object', function () {
    chai.expect(v.substr(['infinite loop'], 10)).to.be.equal('oop');
    chai.expect(v.substr({
      toString: function toString() {
        return 'loop';
      }
    }, 0, 3)).to.be.equal('loo');
  });

  it('should substract a string from a number', function () {
    chai.expect(v.substr(12345, 3)).to.be.equal('45');
    chai.expect(v.substr(987, 1, 1)).to.be.equal('8');
  });
});

describe('substring', function () {

  it('should substring a string', function () {
    chai.expect(v.substring('infinite loop', 9)).to.be.equal('loop');
    chai.expect(v.substring('infinite loop', 0)).to.be.equal('infinite loop');
    chai.expect(v.substring('infinite loop')).to.be.equal('infinite loop');
    chai.expect(v.substring('infinite loop', 1)).to.be.equal('nfinite loop');
    chai.expect(v.substring(PRINTABLE_ASCII, 0)).to.be.equal(PRINTABLE_ASCII);
  });

  it('should substring a string with an end position', function () {
    chai.expect(v.substring('infinite loop', 9, 12)).to.be.equal('loo');
    chai.expect(v.substring('infinite loop', 0, 'infinite loop'.length)).to.be.equal('infinite loop');
    chai.expect(v.substring('infinite loop', 1, 2)).to.be.equal('n');
  });

  it('should substring a string representation of an object', function () {
    chai.expect(v.substring(['infinite loop'], 10)).to.be.equal('oop');
    chai.expect(v.substring({
      toString: function toString() {
        return 'loop';
      }
    }, 0, 3)).to.be.equal('loo');
  });

  it('should substring a string from a number', function () {
    chai.expect(v.substring(12345, 3)).to.be.equal('45');
    chai.expect(v.substring(987, 1, 2)).to.be.equal('8');
  });
});

describe('trim', function () {

  it('should return the trimmed string with default whitespaces', function () {
    chai.expect(v.trim(' Yes. The fire rises.')).to.be.equal('Yes. The fire rises.');
    chai.expect(v.trim('   Yes. The fire rises.')).to.be.equal('Yes. The fire rises.');
    chai.expect(v.trim('   Yes. The fire rises.    ')).to.be.equal('Yes. The fire rises.');
    chai.expect(v.trim('Yes. The fire rises.')).to.be.equal('Yes. The fire rises.');
    chai.expect(v.trim('\n\f\t Yes. The fire rises.')).to.be.equal('Yes. The fire rises.');
    chai.expect(v.trim('\n\f\t Yes. The fire rises.', null)).to.be.equal('Yes. The fire rises.');
    chai.expect(v.trim('\n\f\t Yes. The fire rises.', undefined)).to.be.equal('Yes. The fire rises.');
    chai.expect(v.trim(PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII.substr(1));
  });

  it('should return the trimmed string with custom whitespaces', function () {
    chai.expect(v.trim('-Do you *feel* in charge?-', '-')).to.be.equal('Do you *feel* in charge?');
    chai.expect(v.trim('---Do-you-*feel*-in-charge?---', '-')).to.be.equal('Do-you-*feel*-in-charge?');
    chai.expect(v.trim('Do you *feel* in charge?___', '_')).to.be.equal('Do you *feel* in charge?');
    chai.expect(v.trim('<-Do you *feel* in charge?', '<-')).to.be.equal('Do you *feel* in charge?');
    chai.expect(v.trim('***Do you *feel* in charge?***', '**')).to.be.equal('*Do you *feel* in charge?*');
    chai.expect(v.trim('Do you *feel* in charge?', 'Do you *feel* in charge?')).to.be.equal('');
    chai.expect(v.trim('\n\nDo you *feel* in charge?', '\n')).to.be.equal('Do you *feel* in charge?');
  });

  it('should not modify the string for an empty string whitespace', function () {
    chai.expect(v.trim('I\'m *necessary* evil!', '')).to.be.equal('I\'m *necessary* evil!');
    chai.expect(v.trim('', '')).to.be.equal('');
  });

  it('should return the trimmed string representation of an object', function () {
    chai.expect(v.trim([' Yes. The fire rises.'])).to.be.equal('Yes. The fire rises.');
    chai.expect(v.trim({
      toString: function toString() {
        return '\n\nYes. The fire rises.';
      }
    })).to.be.equal('Yes. The fire rises.');
    chai.expect(v.trim(['****You\'re a big guy!****'], ['*'])).to.be.equal('You\'re a big guy!');
  });

  it('should return the trimmed string for numbers', function () {
    chai.expect(v.trim(100, 1)).to.be.equal('00');
    chai.expect(v.trim(6780, 6780)).to.be.equal('');
    chai.expect(v.trim(-115, -1)).to.be.equal('15');
    chai.expect(v.trim(1111, 1)).to.be.equal('');
    chai.expect(v.trim(8998, 8)).to.be.equal('99');
  });

  it('should return empty string for null or undefined', function () {
    chai.expect(v.trim(null)).to.be.equal('');
    chai.expect(v.trim(null, '\n')).to.be.equal('');
    chai.expect(v.trim(null, null)).to.be.equal('');
    chai.expect(v.trim(undefined)).to.be.equal('');
    chai.expect(v.trim(undefined, '*')).to.be.equal('');
    chai.expect(v.trim(undefined, undefined)).to.be.equal('');
  });
});

describe('trimLeft', function () {

  it('should return the left trimmed string with default whitespaces', function () {
    chai.expect(v.trimLeft(' Yes. The fire rises.')).to.be.equal('Yes. The fire rises.');
    chai.expect(v.trimLeft('   Yes. The fire rises.')).to.be.equal('Yes. The fire rises.');
    chai.expect(v.trimLeft('   Yes. The fire rises.    ')).to.be.equal('Yes. The fire rises.    ');
    chai.expect(v.trimLeft('Yes. The fire rises.')).to.be.equal('Yes. The fire rises.');
    chai.expect(v.trimLeft('\n\f\t Yes. The fire rises.')).to.be.equal('Yes. The fire rises.');
    chai.expect(v.trimLeft('\n\f\t Yes. The fire rises.', null)).to.be.equal('Yes. The fire rises.');
    chai.expect(v.trimLeft('\n\f\t Yes. The fire rises.', undefined)).to.be.equal('Yes. The fire rises.');
    chai.expect(v.trimLeft(PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII.substr(1));
  });

  it('should return the left trimmed string with custom whitespaces', function () {
    chai.expect(v.trimLeft('-Do you *feel* in charge?-', '-')).to.be.equal('Do you *feel* in charge?-');
    chai.expect(v.trimLeft('---Do-you-*feel*-in-charge?---', '-')).to.be.equal('Do-you-*feel*-in-charge?---');
    chai.expect(v.trimLeft('Do you *feel* in charge?___', '_')).to.be.equal('Do you *feel* in charge?___');
    chai.expect(v.trimLeft('___Do you *feel* in charge?', '_')).to.be.equal('Do you *feel* in charge?');
    chai.expect(v.trimLeft('<-Do you *feel* in charge?', '<-')).to.be.equal('Do you *feel* in charge?');
    chai.expect(v.trimLeft('***Do you *feel* in charge?***', '**')).to.be.equal('*Do you *feel* in charge?***');
    chai.expect(v.trimLeft('Do you *feel* in charge?', 'Do you *feel* in charge?')).to.be.equal('');
    chai.expect(v.trimLeft('\n\nDo you *feel* in charge?', '\n')).to.be.equal('Do you *feel* in charge?');
  });

  it('should not modify the string for an empty string whitespace', function () {
    chai.expect(v.trimLeft('I\'m *necessary* evil!', '')).to.be.equal('I\'m *necessary* evil!');
    chai.expect(v.trimLeft('', '')).to.be.equal('');
  });

  it('should return the left trimmed string representation of an object', function () {
    chai.expect(v.trimLeft([' Yes. The fire rises.'])).to.be.equal('Yes. The fire rises.');
    chai.expect(v.trimLeft({
      toString: function toString() {
        return '\n\nYes. The fire rises.';
      }
    })).to.be.equal('Yes. The fire rises.');
    chai.expect(v.trimLeft(['****You\'re a big guy!'], ['*'])).to.be.equal('You\'re a big guy!');
  });

  it('should return the left trimmed string for numbers', function () {
    chai.expect(v.trimLeft(100, 1)).to.be.equal('00');
    chai.expect(v.trimLeft(6780, 6780)).to.be.equal('');
    chai.expect(v.trimLeft(-115, -1)).to.be.equal('15');
  });

  it('should return empty string for null or undefined', function () {
    chai.expect(v.trimLeft(null)).to.be.equal('');
    chai.expect(v.trimLeft(null, '\n')).to.be.equal('');
    chai.expect(v.trimLeft(null, null)).to.be.equal('');
    chai.expect(v.trimLeft(undefined)).to.be.equal('');
    chai.expect(v.trimLeft(undefined, '*')).to.be.equal('');
    chai.expect(v.trimLeft(undefined, undefined)).to.be.equal('');
  });
});

describe('trimRight', function () {

  it('should return the right trimmed string with default whitespaces', function () {
    chai.expect(v.trimRight('Yes. The fire rises. ')).to.be.equal('Yes. The fire rises.');
    chai.expect(v.trimRight('Yes. The fire rises.   ')).to.be.equal('Yes. The fire rises.');
    chai.expect(v.trimRight('   Yes. The fire rises.    ')).to.be.equal('   Yes. The fire rises.');
    chai.expect(v.trimRight('Yes. The fire rises.')).to.be.equal('Yes. The fire rises.');
    chai.expect(v.trimRight('Yes. The fire rises.\n\f\t ')).to.be.equal('Yes. The fire rises.');
    chai.expect(v.trimRight('Yes. The fire rises.\n\f\t ', null)).to.be.equal('Yes. The fire rises.');
    chai.expect(v.trimRight('Yes. The fire rises.\n\f\t ', undefined)).to.be.equal('Yes. The fire rises.');
    chai.expect(v.trimRight(PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII);
  });

  it('should return the right trimmed string with custom whitespaces', function () {
    chai.expect(v.trimRight('-Do you *feel* in charge?-', '-')).to.be.equal('-Do you *feel* in charge?');
    chai.expect(v.trimRight('---Do-you-*feel*-in-charge?---', '-')).to.be.equal('---Do-you-*feel*-in-charge?');
    chai.expect(v.trimRight('___Do you *feel* in charge?', '_')).to.be.equal('___Do you *feel* in charge?');
    chai.expect(v.trimRight('Do you *feel* in charge?___', '_')).to.be.equal('Do you *feel* in charge?');
    chai.expect(v.trimRight('Do you *feel* in charge?<-', '<-')).to.be.equal('Do you *feel* in charge?');
    chai.expect(v.trimRight('***Do you *feel* in charge?***', '**')).to.be.equal('***Do you *feel* in charge?*');
    chai.expect(v.trimRight('Do you *feel* in charge?', 'Do you *feel* in charge?')).to.be.equal('');
    chai.expect(v.trimRight('Do you *feel* in charge?\n\n', '\n')).to.be.equal('Do you *feel* in charge?');
  });

  it('should not modify the string for an empty string whitespace', function () {
    chai.expect(v.trimRight('I\'m *necessary* evil!', '')).to.be.equal('I\'m *necessary* evil!');
    chai.expect(v.trimRight('', '')).to.be.equal('');
  });

  it('should return the right trimmed string representation of an object', function () {
    chai.expect(v.trimRight(['Yes. The fire rises. '])).to.be.equal('Yes. The fire rises.');
    chai.expect(v.trimRight({
      toString: function toString() {
        return 'Yes. The fire rises.\n\n';
      }
    })).to.be.equal('Yes. The fire rises.');
    chai.expect(v.trimRight(['You\'re a big guy!****'], ['*'])).to.be.equal('You\'re a big guy!');
  });

  it('should return the right trimmed string for numbers', function () {
    chai.expect(v.trimRight(100, 0)).to.be.equal('1');
    chai.expect(v.trimRight(6780, 6780)).to.be.equal('');
    chai.expect(v.trimRight(-115, 15)).to.be.equal('-1');
  });

  it('should return empty string for null or undefined', function () {
    chai.expect(v.trimRight(null)).to.be.equal('');
    chai.expect(v.trimRight(null, '\n')).to.be.equal('');
    chai.expect(v.trimRight(null, null)).to.be.equal('');
    chai.expect(v.trimRight(undefined)).to.be.equal('');
    chai.expect(v.trimRight(undefined, '*')).to.be.equal('');
    chai.expect(v.trimRight(undefined, undefined)).to.be.equal('');
  });
});

describe('truncate', function () {

  it('should truncate a string', function () {
    chai.expect(v.truncate('Once upon a time there lived in a certain village a little country girl', 4)).to.be.equal('Once...');
    chai.expect(v.truncate('I\'ll go this way and go you that', 7, ' (read more)')).to.be.equal('I\'ll go (read more)');
    chai.expect(v.truncate('Little Red Riding Hood', 6, '...')).to.be.equal('Little...');
    chai.expect(v.truncate('Little Red Riding Hood', 0, '(more)')).to.be.equal('(more)');
    chai.expect(v.truncate(PRINTABLE_ASCII, PRINTABLE_ASCII.length)).to.be.equal(PRINTABLE_ASCII);
    chai.expect(v.truncate(PRINTABLE_ASCII, 0)).to.be.equal('...');
  });

  it('should not truncate a string if length parameter is greater or equal than string length', function () {
    chai.expect(v.truncate('Once upon', 20)).to.be.equal('Once upon');
    chai.expect(v.truncate('Once', 4, ' (read more)')).to.be.equal('Once');
    chai.expect(v.truncate('', 0, '....')).to.be.equal('');
  });

  it('should truncate a string representation of an object', function () {
    chai.expect(v.truncate(['Welcome'], 4)).to.be.equal('Welc...');
    chai.expect(v.truncate({
      toString: function toString() {
        return 'Have a nice day';
      }
    }, 4, '..')).to.be.equal('Have..');
  });

  it('should return an empty string for null or undefined', function () {
    chai.expect(v.truncate()).to.be.equal('');
    chai.expect(v.truncate(undefined)).to.be.equal('');
    chai.expect(v.truncate(null)).to.be.equal('');
  });
});

describe('endsWith', function () {

  it('should return true for valid ending string', function () {
    chai.expect(v.endsWith('Hello World!', '')).to.be.true;
    chai.expect(v.endsWith('Hello World!', '!')).to.be.true;
    chai.expect(v.endsWith('Hello World!', 'd!')).to.be.true;
    chai.expect(v.endsWith('Hello World!', 'rld!')).to.be.true;
    chai.expect(v.endsWith('Hello World!', 'orld!')).to.be.true;
    chai.expect(v.endsWith('Hello World!', 'World!')).to.be.true;
    chai.expect(v.endsWith('Hello World!', ' World!')).to.be.true;
    chai.expect(v.endsWith('Hello World!', 'o World!')).to.be.true;
    chai.expect(v.endsWith('Hello World!', 'lo World!')).to.be.true;
    chai.expect(v.endsWith('Hello World!', 'llo World!')).to.be.true;
    chai.expect(v.endsWith('Hello World!', 'ello World!')).to.be.true;
    chai.expect(v.endsWith('Hello World!', 'Hello World!')).to.be.true;
    chai.expect(v.endsWith('Привет Мир!', 'Мир!')).to.be.true;
    chai.expect(v.endsWith('', '')).to.be.true;
    chai.expect(v.endsWith(PRINTABLE_ASCII, '~')).to.be.true;
  });

  it('should return true for valid ending string and position', function () {
    chai.expect(v.endsWith('Hello World!', '', 'Hello World'.length)).to.be.true;
    chai.expect(v.endsWith('Hello World!', 'Hello World!', 'Hello World!'.length)).to.be.true;
    chai.expect(v.endsWith('Hello World!', 'Hello World', 'Hello World!'.length - 1)).to.be.true;
    chai.expect(v.endsWith('Hello World!', 'Hello Worl', 'Hello World!'.length - 2)).to.be.true;
    chai.expect(v.endsWith('Hello World!', 'Hello Wor', 'Hello World!'.length - 3)).to.be.true;
    chai.expect(v.endsWith('Hello World!', 'Hello Wo', 'Hello World!'.length - 4)).to.be.true;
    chai.expect(v.endsWith('Hello World!', 'Hello W', 'Hello World!'.length - 5)).to.be.true;
    chai.expect(v.endsWith('Hello World!', 'Hello ', 'Hello World!'.length - 6)).to.be.true;
    chai.expect(v.endsWith('Hello World!', 'Hello', 'Hello World!'.length - 7)).to.be.true;
    chai.expect(v.endsWith('Hello World!', 'Hell', 'Hello World!'.length - 8)).to.be.true;
    chai.expect(v.endsWith('Hello World!', 'Hel', 'Hello World!'.length - 9)).to.be.true;
    chai.expect(v.endsWith('Hello World!', 'He', 'Hello World!'.length - 10)).to.be.true;
    chai.expect(v.endsWith('Hello World!', 'H', 'Hello World!'.length - 11)).to.be.true;
    chai.expect(v.endsWith('', '', 0)).to.be.true;
  });

  it('should return true for a correct downcast of the position', function () {
    chai.expect(v.endsWith('Hello World!', 'ello', '5')).to.be.true;
    chai.expect(v.endsWith('Hello World!', 'ello', 5.1)).to.be.true;
    chai.expect(v.endsWith('Hello World!', 'World!', 30000)).to.be.true;
    chai.expect(v.endsWith('Hello World!', 'World!', Infinity)).to.be.true;
  });

  it('should return true for an empty ending string', function () {
    [0, 1, 100, Infinity, undefined, NaN, null].forEach(function (position) {
      chai.expect(v.endsWith('Hello World!', '', position)).to.be.true;
    });
  });

  it('should return true for valid ending number', function () {
    chai.expect(v.endsWith(1000, 0)).to.be.true;
    chai.expect(v.endsWith(1250, 50)).to.be.true;
    chai.expect(v.endsWith('916', 16)).to.be.true;
  });

  it('should return true for a valid ending in a string representation of an object', function () {
    chai.expect(v.endsWith(['Welcome to Earth'], 'Earth')).to.be.true;
    chai.expect(v.endsWith({
      toString: function toString() {
        return 'Let us not stand on ceremony, Mr. Wayne.';
      }
    }, ['Mr. Wayne'], 'Let us not stand on ceremony, Mr. Wayne.'.length - 1)).to.be.true;
  });

  it('should return false for an invalid ending string', function () {
    chai.expect(v.endsWith('The shadows betray you, because they belong to me!', 'The shadows')).to.be.false;
    chai.expect(v.endsWith('The shadows betray you, because they belong to me!', 'to me')).to.be.false;
    chai.expect(v.endsWith('They belong to me!', 'They belong to me')).to.be.false;
    chai.expect(v.endsWith('They belong to me!', 'belong')).to.be.false;
    chai.expect(v.endsWith('', 'The shadows')).to.be.false;
  });

  it('should return false for an invalid ending string and position', function () {
    chai.expect(v.endsWith('The shadows betray you, because they belong to me!', 'they belong to me!', 5)).to.be.false;
    chai.expect(v.endsWith('They belong to me!', 'They belong to me!', 'They belong to me!'.length - 1)).to.be.false;
    chai.expect(v.endsWith('They belong to me!', 'They', 'They belong to me!'.length)).to.be.false;
    chai.expect(v.endsWith('They belong to me!', 'belong', 'They belong to me!'.length)).to.be.false;
    chai.expect(v.endsWith('They belong to me!', 'to me!', 0)).to.be.false;
    chai.expect(v.endsWith('They belong to me!', 'belong to me!', -100)).to.be.false;
  });

  it('should return false for an invalid ending number', function () {
    chai.expect(v.endsWith(1000, 10)).to.be.false;
    chai.expect(v.endsWith(1250, 55)).to.be.false;
    chai.expect(v.endsWith('916', 18)).to.be.false;
  });

  it('should return false for a NaN position', function () {
    chai.expect(v.endsWith('Hello World!', 'World!', NaN)).to.be.false;
  });

  it('should return false for undefined and null parameters', function () {
    chai.expect(v.endsWith()).to.be.false;
    chai.expect(v.endsWith(undefined)).to.be.false;
    chai.expect(v.endsWith(undefined, undefined)).to.be.false;
    chai.expect(v.endsWith(undefined, undefined, undefined)).to.be.false;
    chai.expect(v.endsWith(undefined, undefined, 0)).to.be.false;
    chai.expect(v.endsWith(undefined, 'Hello World!')).to.be.false;
    chai.expect(v.endsWith(null)).to.be.false;
    chai.expect(v.endsWith(null, null)).to.be.false;
    chai.expect(v.endsWith(null, null, null)).to.be.false;
    chai.expect(v.endsWith(null, null, 0)).to.be.false;
    chai.expect(v.endsWith(null, 'Hello World!')).to.be.false;
  });
});

describe('includes', function () {

  it('should return true for an included string', function () {
    chai.expect(v.includes('mobile infantry', 'mobile')).to.be.true;
    chai.expect(v.includes('mobile infantry', 'infantry')).to.be.true;
    chai.expect(v.includes('mobile infantry', 'mobile infantry')).to.be.true;
    chai.expect(v.includes('mobile infantry', ' ')).to.be.true;
    chai.expect(v.includes('mobile infantry', '')).to.be.true;
    chai.expect(v.includes('', '')).to.be.true;
    chai.expect(v.includes(undefined, '')).to.be.true;
    chai.expect(v.includes('\nwelcome', '\n')).to.be.true;
    chai.expect(v.includes(PRINTABLE_ASCII, '+')).to.be.true;
  });

  it('should return true for an included string and position', function () {
    chai.expect(v.includes('mobile infantry', 'mobile', 0)).to.be.true;
    chai.expect(v.includes('mobile infantry', 'infantry', 7)).to.be.true;
    chai.expect(v.includes('mobile infantry', 'mobile infantry', 0)).to.be.true;
    chai.expect(v.includes('mobile infantry', ' ', 6)).to.be.true;
    chai.expect(v.includes('mobile infantry', '', 0)).to.be.true;
    chai.expect(v.includes('mobile infantry', '', 6)).to.be.true;
    chai.expect(v.includes('', '', 0)).to.be.true;
    chai.expect(v.includes('', '', 6)).to.be.true;
  });

  it('should return true for an included string representation of an object', function () {
    chai.expect(v.includes(['mobile infantry'], 'mobile')).to.be.true;
    chai.expect(v.includes({
      toString: function toString() {
        return 'mobile infantry';
      }
    }, 'infantry')).to.be.true;
    chai.expect(v.includes(['mobile infantry'], ['mobile infantry'])).to.be.true;
  });

  it('should return true for an included number', function () {
    chai.expect(v.includes(155, 55));
    chai.expect(v.includes('1078', 78));
    chai.expect(v.includes(0, 0));
    chai.expect(v.includes(80, ''));
  });

  it('should return false for a not included string', function () {
    chai.expect(v.includes('mobile infantry', 'be mobile')).to.be.false;
    chai.expect(v.includes('mobile infantry', 'infantry ')).to.be.false;
    chai.expect(v.includes('mobile infantry', ' mobile infantry ')).to.be.false;
    chai.expect(v.includes('mobile infantry', '!')).to.be.false;
    chai.expect(v.includes('', 'mobile')).to.be.false;
    chai.expect(v.includes('\nwelcome', '\t')).to.be.false;
  });

  it('should return false for a not included string and position', function () {
    chai.expect(v.includes('mobile infantry', 'mobile', 1)).to.be.false;
    chai.expect(v.includes('mobile infantry', 'infantry', 8)).to.be.false;
    chai.expect(v.includes('mobile infantry', 'mobile infantry', 2)).to.be.false;
    chai.expect(v.includes('mobile infantry', ' ', 7)).to.be.false;
  });

  it('should return false for a not included string representation of an object', function () {
    chai.expect(v.includes(['mobile infantry'], 'mobile number')).to.be.false;
    chai.expect(v.includes({
      toString: function toString() {
        return 'mobile infantry';
      }
    }, 'motorized infantry')).to.be.false;
    chai.expect(v.includes(['mobile infantry'], ['mobile infantry'], 1)).to.be.false;
  });

  it('should return false for a undefined or null search string', function () {
    chai.expect(v.includes('mobile infantry', undefined)).to.be.false;
    chai.expect(v.includes('mobile infantry', null)).to.be.false;
  });
});

describe('isAlpha', function () {

  it('should return true for an alpha string', function () {
    chai.expect(v.isAlpha('HelloWorld')).to.be.true;
    chai.expect(v.isAlpha('JavaScript')).to.be.true;
    chai.expect(v.isAlpha('AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz')).to.be.true;
    chai.expect(v.isAlpha('mañana')).to.be.true;
    chai.expect(v.isAlpha('foõ͜͝͞bar')).to.be.true;
  });

  it('should return true for an alpha russian string', function () {
    chai.expect(v.isAlpha('ПриветМир')).to.be.true;
    chai.expect(v.isAlpha('ЯваСкрипт')).to.be.true;
    chai.expect(v.isAlpha('АаБбВвГгДдЕеЁёЖжЗзИиЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщЪъЫыЬьЭэЮюЯя')).to.be.true;
  });

  it('should return true for an alpha japanese string', function () {
    chai.expect(v.isAlpha('こんにちは世界')).to.be.true;
    chai.expect(v.isAlpha('ジャバスクリプト')).to.be.true;
  });

  it('should return true for a string with diacritics', function () {
    chai.expect(v.isAlpha('áéèêëíîïóôúûýàòüçäöâùÿãõñ')).to.be.true;
  });

  it('should return true for an array with one alpha string item', function () {
    chai.expect(v.isAlpha(['HelloWorld'])).to.be.true;
    chai.expect(v.isAlpha(['ПриветМир'])).to.be.true;
  });

  it('should return true for an alpha string representation of an object', function () {
    chai.expect(v.isAlpha({
      toString: function toString() {
        return 'HelloWorld';
      }
    })).to.be.true;
    chai.expect(v.isAlpha({
      toString: function toString() {
        return 'ПриветМир';
      }
    })).to.be.true;
  });

  it('should return true for a boolean', function () {
    chai.expect(v.isAlpha(true)).to.be.true;
    chai.expect(v.isAlpha(false)).to.be.true;
  });

  it('should return true for a NaN or Infinity number', function () {
    chai.expect(v.isAlpha(NaN)).to.be.true;
    chai.expect(v.isAlpha(Infinity)).to.be.true;
  });

  it('should return false for a non-alpha string', function () {
    chai.expect(v.isAlpha('Hello World!')).to.be.false;
    chai.expect(v.isAlpha('\nHello World!\n')).to.be.false;
    chai.expect(v.isAlpha('ECMAScript 5.1 (ECMA-262)')).to.be.false;
    chai.expect(v.isAlpha(' ')).to.be.false;
    chai.expect(v.isAlpha('\n')).to.be.false;
    chai.expect(v.isAlpha('\t')).to.be.false;
    chai.expect(v.isAlpha('0123456789')).to.be.false;
    chai.expect(v.isAlpha('áéèêëíîïóôúûýàòüçäöâùÿãõñ 0123456789')).to.be.false;
    chai.expect(v.isAlpha(PRINTABLE_ASCII)).to.be.false;
  });

  it('should return false for a non-alpha russian string', function () {
    chai.expect(v.isAlpha('Привет Мир!')).to.be.false;
    chai.expect(v.isAlpha('\nПривет Мир!\n')).to.be.false;
    chai.expect(v.isAlpha('ECMAScript версии 5.1 (ECMA-262)')).to.be.false;
  });

  it('should return false for a non-alpha japanese string', function () {
    chai.expect(v.isAlpha('こんにちは世界!')).to.be.false;
    chai.expect(v.isAlpha('ジャバスクリプト2015')).to.be.false;
  });

  it('should return false for an array with a non-alpha string item', function () {
    chai.expect(v.isAlpha(['Hello World!'])).to.be.false;
    chai.expect(v.isAlpha(['Привет Мир!'])).to.be.false;
  });

  it('should return false for a non-alpha string representation of an object', function () {
    chai.expect(v.isAlpha({
      toString: function toString() {
        return 'Hello World!';
      }
    })).to.be.false;
    chai.expect(v.isAlpha({
      toString: function toString() {
        return 'Привет Мир!';
      }
    })).to.be.false;
  });

  it('should return false for an undefined', function () {
    chai.expect(v.isAlpha(undefined)).to.be.false;
    chai.expect(v.isAlpha()).to.be.false;
  });

  it('should return false for a null', function () {
    chai.expect(v.isAlpha(null)).to.be.false;
  });

  it('should return false for a number or numeric string', function () {
    chai.expect(v.isAlpha(0)).to.be.false;
    chai.expect(v.isAlpha(10)).to.be.false;
    chai.expect(v.isAlpha(-12.05)).to.be.false;
    chai.expect(v.isAlpha(0xFF)).to.be.false;
    chai.expect(v.isAlpha('0')).to.be.false;
    chai.expect(v.isAlpha('10')).to.be.false;
    chai.expect(v.isAlpha('-12.05')).to.be.false;
    chai.expect(v.isAlpha('0xFF')).to.be.false;
  });

  it('should return false for an empty string', function () {
    chai.expect(v.isAlpha('')).to.be.false;
  });
});

describe('isAlphaDigit', function () {

  it('should return true for an alpha and digit string', function () {
    chai.expect(v.isAlphaDigit('HelloWorld')).to.be.true;
    chai.expect(v.isAlphaDigit('HelloWorld007')).to.be.true;
    chai.expect(v.isAlphaDigit('JavaScript6')).to.be.true;
    chai.expect(v.isAlphaDigit('AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz')).to.be.true;
    chai.expect(v.isAlphaDigit('AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789')).to.be.true;
    chai.expect(v.isAlphaDigit('mañana')).to.be.true;
    chai.expect(v.isAlphaDigit('foõ͜͝͞bar')).to.be.true;
  });

  it('should return true for an alpha and digit russian string', function () {
    chai.expect(v.isAlphaDigit('ПриветМир')).to.be.true;
    chai.expect(v.isAlphaDigit('ПриветМир007')).to.be.true;
    chai.expect(v.isAlphaDigit('ЯваСкрипт6')).to.be.true;
    chai.expect(v.isAlphaDigit('АаБбВвГгДдЕеЁёЖжЗзИиЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщЪъЫыЬьЭэЮюЯя')).to.be.true;
    chai.expect(v.isAlphaDigit('АаБбВвГгДдЕеЁёЖжЗзИиЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщЪъЫыЬьЭэЮюЯя0123456789')).to.be.true;
  });

  it('should return true for an alpha and digit japanese string', function () {
    chai.expect(v.isAlphaDigit('こんにちは世界')).to.be.true;
    chai.expect(v.isAlphaDigit('こんにちは世界45')).to.be.true;
    chai.expect(v.isAlphaDigit('12ジャバスクリプト')).to.be.true;
  });

  it('should return true for a string with diacritics', function () {
    chai.expect(v.isAlphaDigit('áéèêëíîïóôúûýàòüçäöâùÿãõñ')).to.be.true;
    chai.expect(v.isAlphaDigit('áéèêëíîïóôúûýàòüçäöâùÿãõñ0123456789')).to.be.true;
  });

  it('should return true for an array with one alpha and digit string item', function () {
    chai.expect(v.isAlphaDigit(['HelloWorld'])).to.be.true;
    chai.expect(v.isAlphaDigit(['HelloWorld007'])).to.be.true;
    chai.expect(v.isAlphaDigit(['ЯваСкрипт6'])).to.be.true;
  });

  it('should return true for an alpha and digit string representation of an object', function () {
    chai.expect(v.isAlphaDigit({
      toString: function toString() {
        return 'HelloWorld';
      }
    })).to.be.true;
    chai.expect(v.isAlphaDigit({
      toString: function toString() {
        return 'ПриветМир';
      }
    })).to.be.true;
    chai.expect(v.isAlphaDigit({
      toString: function toString() {
        return 'JavaScript2016';
      }
    })).to.be.true;
    chai.expect(v.isAlphaDigit({
      toString: function toString() {
        return 'ЯваСкрипт2016';
      }
    })).to.be.true;
  });

  it('should return true for a boolean', function () {
    chai.expect(v.isAlphaDigit(true)).to.be.true;
    chai.expect(v.isAlphaDigit(false)).to.be.true;
  });

  it('should return true for a positive number or numeric string', function () {
    chai.expect(v.isAlphaDigit(0)).to.be.true;
    chai.expect(v.isAlphaDigit(10)).to.be.true;
    chai.expect(v.isAlphaDigit(0xFF)).to.be.true;
    chai.expect(v.isAlphaDigit('0')).to.be.true;
    chai.expect(v.isAlphaDigit('10')).to.be.true;
    chai.expect(v.isAlphaDigit('0xFF')).to.be.true;
    chai.expect(v.isAlphaDigit(NaN)).to.be.true;
    chai.expect(v.isAlphaDigit(Infinity)).to.be.true;
  });

  it('should return false for a non alpha and non digit string', function () {
    chai.expect(v.isAlphaDigit('Hello World!')).to.be.false;
    chai.expect(v.isAlphaDigit('Hello World! It is 2016.')).to.be.false;
    chai.expect(v.isAlphaDigit('\nHello World!\n')).to.be.false;
    chai.expect(v.isAlphaDigit('JavaScript 2015')).to.be.false;
    chai.expect(v.isAlphaDigit(' ')).to.be.false;
    chai.expect(v.isAlphaDigit('\n')).to.be.false;
    chai.expect(v.isAlphaDigit('\t')).to.be.false;
    chai.expect(v.isAlphaDigit(PRINTABLE_ASCII)).to.be.false;
  });

  it('should return false for a non alpha and non digit russian string', function () {
    chai.expect(v.isAlphaDigit('привет мир!')).to.be.false;
    chai.expect(v.isAlphaDigit('Привет Мир! Это 2016')).to.be.false;
    chai.expect(v.isAlphaDigit('\nПривет-Мир\n')).to.be.false;
    chai.expect(v.isAlphaDigit('ЯваСкрипт 2015')).to.be.false;
  });

  it('should return false for a non alpha and non digit japanese string', function () {
    chai.expect(v.isAlphaDigit('こんにちは世界00!')).to.be.false;
    chai.expect(v.isAlphaDigit('ジャバスクリプト 2015(2016)')).to.be.false;
  });

  it('should return false for an array with a non alpha and non digit string item', function () {
    chai.expect(v.isAlphaDigit(['Hello World!'])).to.be.false;
    chai.expect(v.isAlphaDigit(['Ява Скрипт, привет!'])).to.be.false;
  });

  it('should return false for a non alpha and non digit string representation of an object', function () {
    chai.expect(v.isAlphaDigit({
      toString: function toString() {
        return 'Hello World! How are you?';
      }
    })).to.be.false;
    chai.expect(v.isAlphaDigit({
      toString: function toString() {
        return 'Ява Скрипт, Привет!';
      }
    })).to.be.false;
  });

  it('should return false for an undefined', function () {
    chai.expect(v.isAlphaDigit(undefined)).to.be.false;
    chai.expect(v.isAlphaDigit()).to.be.false;
  });

  it('should return false for a null', function () {
    chai.expect(v.isAlphaDigit(null)).to.be.false;
  });

  it('should return false for a negative number or numeric string', function () {
    chai.expect(v.isAlphaDigit(-1)).to.be.false;
    chai.expect(v.isAlphaDigit(-12.05)).to.be.false;
    chai.expect(v.isAlphaDigit('-12.05')).to.be.false;
  });

  it('should return false for an empty string', function () {
    chai.expect(v.isAlphaDigit('')).to.be.false;
  });
});

describe('isBlank', function () {

  it('should return false for a non empty string', function () {
    chai.expect(v.isBlank('Hello World!')).to.be.false;
    chai.expect(v.isBlank('a')).to.be.false;
    chai.expect(v.isBlank(PRINTABLE_ASCII)).to.be.false;
  });

  it('should return false for a non empty string representation of an object', function () {
    chai.expect(v.isBlank(['Hello world'])).to.be.false;
    chai.expect(v.isBlank({
      toString: function toString() {
        return 'Welcome to New York';
      }
    })).to.be.false;
  });

  it('should return false for a boolean', function () {
    chai.expect(v.isBlank(true)).to.be.false;
    chai.expect(v.isBlank(false)).to.be.false;
  });

  it('should return false for a number', function () {
    chai.expect(v.isBlank(0)).to.be.false;
    chai.expect(v.isBlank(100)).to.be.false;
    chai.expect(v.isBlank(-1.5)).to.be.false;
  });

  it('should return true for an empty string', function () {
    chai.expect(v.isBlank('')).to.be.true;
  });

  it('should return true for a string with whitespaces', function () {
    chai.expect(v.isBlank(' ')).to.be.true;
    chai.expect(v.isBlank('   ')).to.be.true;
    chai.expect(v.isBlank(' \n  ')).to.be.true;
    chai.expect(v.isBlank('\f\n\r\t\v')).to.be.true;
  });

  it('should return true for an empty string string representation of an object', function () {
    chai.expect(v.isBlank(['\n\n'])).to.be.true;
    chai.expect(v.isBlank({
      toString: function toString() {
        return ' ';
      }
    })).to.be.true;
  });

  it('should return true for an undefined', function () {
    chai.expect(v.isBlank(undefined)).to.be.true;
    chai.expect(v.isBlank()).to.be.true;
  });

  it('should return true for a null', function () {
    chai.expect(v.isBlank(null)).to.be.true;
  });
});

describe('isDigit', function () {

  it('should return true for a digit string', function () {
    chai.expect(v.isDigit('0')).to.be.true;
    chai.expect(v.isDigit('1000')).to.be.true;
    chai.expect(v.isDigit('1234567890')).to.be.true;
    chai.expect(v.isDigit('00')).to.be.true;
  });

  it('should return true for an array with one digit string item', function () {
    chai.expect(v.isDigit(['00'])).to.be.true;
    chai.expect(v.isDigit(['12'])).to.be.true;
    chai.expect(v.isDigit(['1234567890'])).to.be.true;
  });

  it('should return true for a digit string representation of an object', function () {
    chai.expect(v.isDigit({
      toString: function toString() {
        return '123';
      }
    })).to.be.true;
    chai.expect(v.isDigit({
      toString: function toString() {
        return '567';
      }
    })).to.be.true;
    chai.expect(v.isDigit({
      toString: function toString() {
        return '00';
      }
    })).to.be.true;
  });

  it('should return true for a positive integer number', function () {
    chai.expect(v.isDigit(0)).to.be.true;
    chai.expect(v.isDigit(1000)).to.be.true;
    chai.expect(v.isDigit(0xFF)).to.be.true;
    chai.expect(v.isDigit(Number.MAX_SAFE_INTEGER)).to.be.true;
  });

  it('should return false for a boolean', function () {
    chai.expect(v.isDigit(true)).to.be.false;
    chai.expect(v.isDigit(false)).to.be.false;
  });

  it('should return false for a non-digit string', function () {
    chai.expect(v.isDigit('hell0w0rld!')).to.be.false;
    chai.expect(v.isDigit('hello world! 12')).to.be.false;
    chai.expect(v.isDigit('\nhell0 w0rld!\n')).to.be.false;
    chai.expect(v.isDigit('JavaScript 2015')).to.be.false;
    chai.expect(v.isDigit('isAlpha(0)')).to.be.false;
    chai.expect(v.isDigit('привет0мир!1200')).to.be.false;
    chai.expect(v.isDigit('12.0')).to.be.false;
    chai.expect(v.isDigit('-1')).to.be.false;
    chai.expect(v.isDigit(PRINTABLE_ASCII)).to.be.false;
  });

  it('should return false for an array with a non-digit string item', function () {
    chai.expect(v.isDigit(['Hello 1000000 visitor'])).to.be.false;
    chai.expect(v.isDigit(['0.0'])).to.be.false;
  });

  it('should return false for a non digit string representation of an object', function () {
    chai.expect(v.isDigit({
      toString: function toString() {
        return 'Hello World! 007';
      }
    })).to.be.false;
    chai.expect(v.isDigit({
      toString: function toString() {
        return 'Ява Скрипт, привет 0!';
      }
    })).to.be.false;
  });

  it('should return false for an undefined', function () {
    chai.expect(v.isDigit(undefined)).to.be.false;
    chai.expect(v.isDigit()).to.be.false;
  });

  it('should return false for a null', function () {
    chai.expect(v.isDigit(null)).to.be.false;
  });

  it('should return false for a negative number or negative numeric string', function () {
    chai.expect(v.isDigit(-12)).to.be.false;
    chai.expect(v.isDigit(-100)).to.be.false;
    chai.expect(v.isDigit(-12.05)).to.be.false;
    chai.expect(v.isDigit('-1')).to.be.false;
    chai.expect(v.isDigit('-12.05')).to.be.false;
  });

  it('should return false for float numbers', function () {
    chai.expect(v.isDigit(0.5)).to.be.false;
    chai.expect(v.isDigit(12.05)).to.be.false;
    chai.expect(v.isDigit(100.001)).to.be.false;
  });

  it('should return false for an Infinity number', function () {
    chai.expect(v.isDigit(Infinity)).to.be.false;
  });

  it('should return false for a NaN number', function () {
    chai.expect(v.isDigit(NaN)).to.be.false;
  });

  it('should return false for an empty string', function () {
    chai.expect(v.isDigit('')).to.be.false;
  });
});

describe('isEmpty', function () {

  it('should return true for an empty string', function () {
    chai.expect(v.isEmpty('')).to.be.true;
  });

  it('should return true for an undefined', function () {
    chai.expect(v.isEmpty(undefined)).to.be.true;
    chai.expect(v.isEmpty()).to.be.true;
  });

  it('should return true for a null', function () {
    chai.expect(v.isEmpty(null)).to.be.true;
  });

  it('should return false for a non empty string', function () {
    chai.expect(v.isEmpty('Hello World!')).to.be.false;
    chai.expect(v.isEmpty('a')).to.be.false;
    chai.expect(v.isEmpty(' ')).to.be.false;
    chai.expect(v.isEmpty(PRINTABLE_ASCII)).to.be.false;
  });

  it('should return false for a non empty string representation of an object', function () {
    chai.expect(v.isEmpty(['Hello world'])).to.be.false;
    chai.expect(v.isEmpty({
      toString: function toString() {
        return ' ';
      }
    })).to.be.false;
  });

  it('should return false for a boolean', function () {
    chai.expect(v.isEmpty(true)).to.be.false;
    chai.expect(v.isEmpty(false)).to.be.false;
  });

  it('should return false for a number', function () {
    chai.expect(v.isEmpty(0)).to.be.false;
    chai.expect(v.isEmpty(100)).to.be.false;
    chai.expect(v.isEmpty(-1.5)).to.be.false;
  });
});

describe('isLowerCase', function () {

  it('should return true for a lower case string', function () {
    chai.expect(v.isLowerCase('a')).to.be.true;
    chai.expect(v.isLowerCase('helloworld')).to.be.true;
    chai.expect(v.isLowerCase('welcometoearth')).to.be.true;
    chai.expect(v.isLowerCase('приветземляне')).to.be.true;
    chai.expect(v.isLowerCase('áéèêëíîïóôúûýàòüçäöâùÿãõñ')).to.be.true;
  });

  it('should return true for a lower case string representation of an object', function () {
    chai.expect(v.isLowerCase(['robocop'])).to.be.true;
    chai.expect(v.isLowerCase({
      toString: function toString() {
        return 'batman';
      }
    })).to.be.true;
  });

  it('should return true for a boolean', function () {
    chai.expect(v.isLowerCase(true)).to.be.true;
    chai.expect(v.isLowerCase(false)).to.be.true;
  });

  it('should return false for a string containing upper case characters', function () {
    chai.expect(v.isLowerCase('Helloworld')).to.be.false;
    chai.expect(v.isLowerCase('WELCOMETOEARTH')).to.be.false;
    chai.expect(v.isLowerCase('ПриветЗемляне')).to.be.false;
  });

  it('should return false for a string containing characters different than lower case', function () {
    chai.expect(v.isLowerCase('hello world!')).to.be.false;
    chai.expect(v.isLowerCase('No one cared who I was until I put on the mask.')).to.be.false;
    chai.expect(v.isLowerCase('Привет, Земляне!')).to.be.false;
    chai.expect(v.isLowerCase('\n')).to.be.false;
    chai.expect(v.isLowerCase('\t')).to.be.false;
    chai.expect(v.isLowerCase(' ')).to.be.false;
    chai.expect(v.isLowerCase('')).to.be.false;
    chai.expect(v.isLowerCase(PRINTABLE_ASCII)).to.be.false;
  });

  it('should return false for a non lower case string representation of an object', function () {
    chai.expect(v.isLowerCase(['RoboCop'])).to.be.false;
    chai.expect(v.isLowerCase({
      toString: function toString() {
        return 'Batman';
      }
    })).to.be.false;
  });

  it('should return false for a number or numeric string', function () {
    chai.expect(v.isLowerCase(0)).to.be.false;
    chai.expect(v.isLowerCase(-1500)).to.be.false;
    chai.expect(v.isLowerCase(2017)).to.be.false;
    chai.expect(v.isLowerCase('0')).to.be.false;
    chai.expect(v.isLowerCase('1998')).to.be.false;
  });

  it('should return false for a null', function () {
    chai.expect(v.isLowerCase(null)).to.be.false;
  });

  it('should return false for an undefined', function () {
    chai.expect(v.isLowerCase(undefined)).to.be.false;
    chai.expect(v.isLowerCase()).to.be.false;
  });
});

describe('isNumeric', function () {

  it('should return true for a number', function () {
    chai.expect(v.isNumeric(0)).to.be.true;
    chai.expect(v.isNumeric(+0)).to.be.true;
    chai.expect(v.isNumeric(1000)).to.be.true;
    chai.expect(v.isNumeric(-1000)).to.be.true;
    chai.expect(v.isNumeric(0xFF)).to.be.true;
    chai.expect(v.isNumeric(1.56)).to.be.true;
    chai.expect(v.isNumeric(-10.888)).to.be.true;
    chai.expect(v.isNumeric(125e5)).to.be.true;
    chai.expect(v.isNumeric(125e-3)).to.be.true;
  });

  it('should return true for a numeric string', function () {
    chai.expect(v.isNumeric('0')).to.be.true;
    chai.expect(v.isNumeric('+0')).to.be.true;
    chai.expect(v.isNumeric('0.0')).to.be.true;
    chai.expect(v.isNumeric('1000')).to.be.true;
    chai.expect(v.isNumeric('-1000')).to.be.true;
    chai.expect(v.isNumeric('0xFF')).to.be.true;
    chai.expect(v.isNumeric('1.56')).to.be.true;
    chai.expect(v.isNumeric('-10.888')).to.be.true;
    chai.expect(v.isNumeric('125e5')).to.be.true;
    chai.expect(v.isNumeric('125e-3')).to.be.true;
  });

  it('should return true for a numeric string representation of an object', function () {
    chai.expect(v.isNumeric([0])).to.be.true;
    chai.expect(v.isNumeric(['0'])).to.be.true;
    chai.expect(v.isNumeric(['0.0'])).to.be.true;
    chai.expect(v.isNumeric({
      toString: function toString() {
        return '100';
      }
    })).to.be.true;
  });

  it('should return false for a non numeric string', function () {
    chai.expect(v.isNumeric('FF')).to.be.false;
    chai.expect(v.isNumeric('0FF')).to.be.false;
    chai.expect(v.isNumeric('Hello World!')).to.be.false;
    chai.expect(v.isNumeric('!0')).to.be.false;
    chai.expect(v.isNumeric('1.0 0')).to.be.false;
    chai.expect(v.isNumeric('Infinity')).to.be.false;
    chai.expect(v.isNumeric('NaN')).to.be.false;
    chai.expect(v.isNumeric(' ')).to.be.false;
    chai.expect(v.isNumeric(PRINTABLE_ASCII)).to.be.false;
  });

  it('should return false for a non numeric string representation of an object', function () {
    chai.expect(v.isNumeric(['Hello World!'])).to.be.false;
    chai.expect(v.isNumeric({
      toString: function toString() {
        return 'NaN';
      }
    })).to.be.false;
  });

  it('should return false for a boolean', function () {
    chai.expect(v.isNumeric(true)).to.be.false;
    chai.expect(v.isNumeric(false)).to.be.false;
  });

  it('should return false for an undefined', function () {
    chai.expect(v.isNumeric(undefined)).to.be.false;
    chai.expect(v.isNumeric()).to.be.false;
  });

  it('should return false for a null', function () {
    chai.expect(v.isNumeric(null)).to.be.false;
  });

  it('should return false for an Inifinty', function () {
    chai.expect(v.isNumeric(null)).to.be.false;
  });

  it('should return false for a NaN', function () {
    chai.expect(v.isNumeric(null)).to.be.false;
  });

  it('should return false for an empty string', function () {
    chai.expect(v.isNumeric('')).to.be.false;
  });
});

describe('isString', function () {

  it('should return true for a string', function () {
    chai.expect(v.isString('Hello World!')).to.be.true;
    chai.expect(v.isString('')).to.be.true;
    chai.expect(v.isString('\n')).to.be.true;
    chai.expect(v.isString(PRINTABLE_ASCII)).to.be.true;
  });

  it('should return false for a null', function () {
    chai.expect(v.isString(null)).to.be.false;
  });

  it('should return false for an undefined', function () {
    chai.expect(v.isString(undefined)).to.be.false;
    chai.expect(v.isString()).to.be.false;
  });

  it('should return false for a boolean', function () {
    chai.expect(v.isString(true)).to.be.false;
    chai.expect(v.isString(false)).to.be.false;
  });

  it('should return false for a number', function () {
    chai.expect(v.isString(100)).to.be.false;
    chai.expect(v.isString(-40)).to.be.false;
  });

  it('should return false for an object', function () {
    chai.expect(v.isString([])).to.be.false;
    chai.expect(v.isString({})).to.be.false;
    chai.expect(v.isString(new Date())).to.be.false;
  });
});

describe('isUpperCase', function () {

  it('should return true for an upper case string', function () {
    chai.expect(v.isUpperCase('A')).to.be.true;
    chai.expect(v.isUpperCase('HELLOWORLD')).to.be.true;
    chai.expect(v.isUpperCase('WELCOMETOEARTH')).to.be.true;
    chai.expect(v.isUpperCase('ПРИВЕТЗЕМЛЯНЕ')).to.be.true;
    chai.expect(v.isUpperCase('ÁÉÈÊËÍÎÏÓÔÚÛÝÀÒÜÇÄÖÂÙŸÃÕÑ')).to.be.true;
  });

  it('should return true for a lower case string representation of an object', function () {
    chai.expect(v.isUpperCase(['ROBOCOP'])).to.be.true;
    chai.expect(v.isUpperCase({
      toString: function toString() {
        return 'BATMAN';
      }
    })).to.be.true;
  });

  it('should return false for a string containing lower case characters', function () {
    chai.expect(v.isUpperCase('Helloworld')).to.be.false;
    chai.expect(v.isUpperCase('WeLCOMETOEARTH')).to.be.false;
    chai.expect(v.isUpperCase('ПриветЗемляне')).to.be.false;
  });

  it('should return false for a boolean', function () {
    chai.expect(v.isUpperCase(true)).to.be.false;
    chai.expect(v.isUpperCase(false)).to.be.false;
  });

  it('should return false for a string containing characters different than upper case', function () {
    chai.expect(v.isUpperCase('hello world!')).to.be.false;
    chai.expect(v.isUpperCase('No one cared who I was until I put on the mask.')).to.be.false;
    chai.expect(v.isUpperCase('Привет, Земляне!')).to.be.false;
    chai.expect(v.isUpperCase('\n')).to.be.false;
    chai.expect(v.isUpperCase('\t')).to.be.false;
    chai.expect(v.isUpperCase(' ')).to.be.false;
    chai.expect(v.isUpperCase('')).to.be.false;
    chai.expect(v.isUpperCase(PRINTABLE_ASCII)).to.be.false;
  });

  it('should return false for a non upper case string representation of an object', function () {
    chai.expect(v.isUpperCase(['RoboCop'])).to.be.false;
    chai.expect(v.isUpperCase({
      toString: function toString() {
        return 'Batman';
      }
    })).to.be.false;
  });

  it('should return false for a number or numeric string', function () {
    chai.expect(v.isUpperCase(0)).to.be.false;
    chai.expect(v.isUpperCase(-1500)).to.be.false;
    chai.expect(v.isUpperCase(2017)).to.be.false;
    chai.expect(v.isUpperCase('0')).to.be.false;
    chai.expect(v.isUpperCase('1998')).to.be.false;
  });

  it('should return false for a null', function () {
    chai.expect(v.isUpperCase(null)).to.be.false;
  });

  it('should return false for an undefined', function () {
    chai.expect(v.isUpperCase(undefined)).to.be.false;
    chai.expect(v.isUpperCase()).to.be.false;
  });
});

describe('matches', function () {

  it('should return true for a string that matches a regular expression object', function () {
    chai.expect(v.matches('pacific ocean', /ocean/)).to.be.true;
    chai.expect(v.matches('pacific ocean', /^pacific ocean$/)).to.be.true;
    chai.expect(v.matches(undefined, /.?/)).to.be.true;
    chai.expect(v.matches(null, /.?/)).to.be.true;
  });

  it('should return true for a string that matches a regular expression string', function () {
    chai.expect(v.matches('pacific ocean', 'ocean')).to.be.true;
    chai.expect(v.matches('pacific ocean', '^pacific ocean$')).to.be.true;
    chai.expect(v.matches('pacific ocean', 'PACIFIC', 'i')).to.be.true;
    chai.expect(v.matches('pacific ocean', '\\s')).to.be.true;
    chai.expect(v.matches(undefined, '.?')).to.be.true;
    chai.expect(v.matches(null, '.?')).to.be.true;
    chai.expect(v.matches(PRINTABLE_ASCII, '\s')).to.be.true;
  });

  it('should return true for a string that matches a string representation of an object', function () {
    chai.expect(v.matches(['atlantic ocean'], /atlantic/)).to.be.true;
    chai.expect(v.matches('pacific ocean', ['^pacific ocean$'])).to.be.true;
    chai.expect(v.matches({
      toString: function toString() {
        return 'pacific ocean';
      }
    }, 'PACIFIC', 'i')).to.be.true;
    chai.expect(v.matches(['pacific ocean'], ['\\s'])).to.be.true;
  });

  it('should return true for a number that matches a regular expression', function () {
    chai.expect(v.matches(1500, /\d/)).to.be.true;
    chai.expect(v.matches(685, 68)).to.be.true;
    chai.expect(v.matches(-1.5, /^\-1\.5$/)).to.be.true;
  });

  it('should return true for a boolean that matches a regular expression', function () {
    chai.expect(v.matches(true, /true/)).to.be.true;
    chai.expect(v.matches(false, 'false')).to.be.true;
  });

  it('should return false for a string that does not match a regular expression object', function () {
    chai.expect(v.matches('pacific ocean', /^ocean/)).to.be.false;
    chai.expect(v.matches('pacific ocean', /^atlantic ocean$/)).to.be.false;
    chai.expect(v.matches(undefined, /a/)).to.be.false;
  });

  it('should return false for a string that does not match a regular expression string', function () {
    chai.expect(v.matches('pacific ocean', 'sea')).to.be.false;
    chai.expect(v.matches('pacific ocean', '^atlantic ocean$')).to.be.false;
    chai.expect(v.matches('pacific ocean', 'PACIFIC')).to.be.false;
    chai.expect(v.matches('pacific ocean', '\\n')).to.be.false;
    chai.expect(v.matches(undefined, '\s')).to.be.false;
  });

  it('should return false for a null or undefined pattern', function () {
    chai.expect(v.matches('pacific ocean', undefined)).to.be.false;
    chai.expect(v.matches('pacific ocean', null)).to.be.false;
  });
});

describe('startsWith', function () {

  it('should return true for a valid starting string', function () {
    chai.expect(v.startsWith('Hello World!', '')).to.be.true;
    chai.expect(v.startsWith('Hello World!', 'H')).to.be.true;
    chai.expect(v.startsWith('Hello World!', 'He')).to.be.true;
    chai.expect(v.startsWith('Hello World!', 'Hel')).to.be.true;
    chai.expect(v.startsWith('Hello World!', 'Hell')).to.be.true;
    chai.expect(v.startsWith('Hello World!', 'Hello')).to.be.true;
    chai.expect(v.startsWith('Hello World!', 'Hello ')).to.be.true;
    chai.expect(v.startsWith('Hello World!', 'Hello W')).to.be.true;
    chai.expect(v.startsWith('Hello World!', 'Hello Wo')).to.be.true;
    chai.expect(v.startsWith('Hello World!', 'Hello Wor')).to.be.true;
    chai.expect(v.startsWith('Hello World!', 'Hello Worl')).to.be.true;
    chai.expect(v.startsWith('Hello World!', 'Hello World')).to.be.true;
    chai.expect(v.startsWith('Hello World!', 'Hello World!')).to.be.true;
    chai.expect(v.startsWith('Привет Мир!', 'Привет')).to.be.true;
    chai.expect(v.startsWith('', '')).to.be.true;
    chai.expect(v.startsWith(PRINTABLE_ASCII, ' ')).to.be.true;
  });

  it('should return true for a valid starting string and position', function () {
    chai.expect(v.startsWith('Hello World!', '', 0)).to.be.true;
    chai.expect(v.startsWith('Hello World!', '!', 'Hello World!'.length - 1)).to.be.true;
    chai.expect(v.startsWith('Hello World!', 'd!', 'Hello World!'.length - 2)).to.be.true;
    chai.expect(v.startsWith('Hello World!', 'ld!', 'Hello World!'.length - 3)).to.be.true;
    chai.expect(v.startsWith('Hello World!', 'rld!', 'Hello World!'.length - 4)).to.be.true;
    chai.expect(v.startsWith('Hello World!', 'orld!', 'Hello World!'.length - 5)).to.be.true;
    chai.expect(v.startsWith('Hello World!', 'World!', 'Hello World!'.length - 6)).to.be.true;
    chai.expect(v.startsWith('Hello World!', ' World!', 'Hello World!'.length - 7)).to.be.true;
    chai.expect(v.startsWith('Hello World!', 'o World!', 'Hello World!'.length - 8)).to.be.true;
    chai.expect(v.startsWith('Hello World!', 'lo World!', 'Hello World!'.length - 9)).to.be.true;
    chai.expect(v.startsWith('Hello World!', 'llo World!', 'Hello World!'.length - 10)).to.be.true;
    chai.expect(v.startsWith('Hello World!', 'ello World!', 'Hello World!'.length - 11)).to.be.true;
    chai.expect(v.startsWith('Hello World!', 'Hello World!', 0)).to.be.true;
    chai.expect(v.startsWith('', '', 0)).to.be.true;
    chai.expect(v.startsWith('Hello World!', 'Hello', NaN)).to.be.true;
  });

  it('should return true for a correct downcast of the position', function () {
    chai.expect(v.startsWith('Hello World!', 'ello', '1')).to.be.true;
    chai.expect(v.startsWith('Hello World!', 'ello', 1.1)).to.be.true;
    chai.expect(v.startsWith('Hello World!', 'Hello', -1)).to.be.true;
    chai.expect(v.startsWith('Hello World!', 'Hello', -Infinity)).to.be.true;
  });

  it('should return true for an empty starting string', function () {
    [0, 1, 100, Infinity, undefined, NaN, null].forEach(function (position) {
      chai.expect(v.startsWith('Hello World!', '', position)).to.be.true;
    });
  });

  it('should return true for a valid starting as a number', function () {
    chai.expect(v.startsWith(1000, 100)).to.be.true;
    chai.expect(v.startsWith(1250, 12)).to.be.true;
    chai.expect(v.startsWith('916', 91)).to.be.true;
  });

  it('should return true for a valid ending in a string representation of an object', function () {
    chai.expect(v.startsWith(['Welcome to Earth'], 'Welcome')).to.be.true;
    chai.expect(v.startsWith({
      toString: function toString() {
        return 'Let us not stand on ceremony, Mr. Wayne.';
      }
    }, ['Let us not stand on ceremony'])).to.be.true;
  });

  it('should return false for an invalid starting string', function () {
    chai.expect(v.startsWith('The shadows betray you, because they belong to me!', 'belong to me!')).to.be.false;
    chai.expect(v.startsWith('The shadows betray you, because they belong to me!', 'he shadows')).to.be.false;
    chai.expect(v.startsWith('They belong to me!', 'hey belong to me!')).to.be.false;
    chai.expect(v.startsWith('They belong to me!', 'belong')).to.be.false;
    chai.expect(v.startsWith('', 'The shadows')).to.be.false;
  });

  it('should return false for an invalid starting string and position', function () {
    chai.expect(v.startsWith('The shadows betray you, because they belong to me!', 'The shadows betray you', 1)).to.be.false;
    chai.expect(v.startsWith('They belong to me!', 'They belong to me!', 1)).to.be.false;
    chai.expect(v.startsWith('They belong to me!', 'They', 1)).to.be.false;
    chai.expect(v.startsWith('They belong to me!', 'belong', 2)).to.be.false;
    chai.expect(v.startsWith('They belong to me!', 'to me!', 3)).to.be.false;
    chai.expect(v.startsWith('They belong to me!', 'They belong', 100)).to.be.false;
  });

  it('should return false for an invalid starting number', function () {
    chai.expect(v.startsWith(1000, 11)).to.be.false;
    chai.expect(v.startsWith(1250, 10)).to.be.false;
    chai.expect(v.startsWith('916', 90)).to.be.false;
  });

  it('should return false for undefined and null parameters', function () {
    chai.expect(v.startsWith()).to.be.false;
    chai.expect(v.startsWith(undefined)).to.be.false;
    chai.expect(v.startsWith(undefined, undefined)).to.be.false;
    chai.expect(v.startsWith(undefined, undefined, undefined)).to.be.false;
    chai.expect(v.startsWith(undefined, undefined, 0)).to.be.false;
    chai.expect(v.startsWith(undefined, 'Hello World!')).to.be.false;
    chai.expect(v.startsWith(null)).to.be.false;
    chai.expect(v.startsWith(null, null)).to.be.false;
    chai.expect(v.startsWith(null, null, null)).to.be.false;
    chai.expect(v.startsWith(null, null, 0)).to.be.false;
    chai.expect(v.startsWith(null, 'Hello World!')).to.be.false;
  });
});

describe('chars', function () {

  it('should split a string into characters', function () {
    chai.expect(v.chars('stellar bomb')).to.eql(['s', 't', 'e', 'l', 'l', 'a', 'r', ' ', 'b', 'o', 'm', 'b']);
    chai.expect(v.chars('   ')).to.eql([' ', ' ', ' ']);
    chai.expect(v.chars('\n\t')).to.eql(['\n', '\t']);
    chai.expect(v.chars('')).to.eql([]);
    chai.expect(v.chars(PRINTABLE_ASCII)).to.eql(Array.prototype.slice.call(PRINTABLE_ASCII, 0));
  });

  it('should split a number into characters', function () {
    chai.expect(v.chars(0)).to.eql(['0']);
    chai.expect(v.chars(1560)).to.eql(['1', '5', '6', '0']);
    chai.expect(v.chars(-1.6)).to.eql(['-', '1', '.', '6']);
  });

  it('should split the string representation of an object', function () {
    chai.expect(v.chars(['star'])).to.eql(['s', 't', 'a', 'r']);
    chai.expect(v.chars({
      toString: function toString() {
        return 'Capa';
      }
    })).to.eql(['C', 'a', 'p', 'a']);
  });

  it('should return an empty array of characters for null and undefined', function () {
    chai.expect(v.chars()).to.eql([]);
    chai.expect(v.chars(undefined)).to.eql([]);
    chai.expect(v.chars(null)).to.eql([]);
  });
});

describe('charsCodePoint', function () {

  it('should split a string into characters', function () {
    chai.expect(v.charsCodePoint('stellar bomb')).to.eql(['s', 't', 'e', 'l', 'l', 'a', 'r', ' ', 'b', 'o', 'm', 'b']);
    chai.expect(v.charsCodePoint('   ')).to.eql([' ', ' ', ' ']);
    chai.expect(v.charsCodePoint('\n\t')).to.eql(['\n', '\t']);
    chai.expect(v.charsCodePoint('')).to.eql([]);
    chai.expect(v.charsCodePoint(PRINTABLE_ASCII)).to.eql(Array.prototype.slice.call(PRINTABLE_ASCII, 0));
  });

  it('should split a string into surrogate pairs and diacritical marks characters', function () {
    chai.expect(v.charsCodePoint('mañana')).to.eql(['m', 'a', 'ñ', 'a', 'n', 'a']);
    chai.expect(v.charsCodePoint('é⃝')).to.eql(['é⃝']);
    chai.expect(v.charsCodePoint('𝐀𝐁')).to.eql(['𝐀', '𝐁']);
    chai.expect(v.charsCodePoint('café')).to.eql(['c', 'a', 'f', 'é']);
    chai.expect(v.charsCodePoint('foõ͜͝͞bar')).to.eql(['f', 'o', 'õ͜͝͞', 'b', 'a', 'r']);
    chai.expect(v.charsCodePoint('foo𝌆̃͜͝͞bar')).to.eql(['f', 'o', 'o', '𝌆̃͜͝͞', 'b', 'a', 'r']);
  });

  it('should split a number into characters', function () {
    chai.expect(v.charsCodePoint(0)).to.eql(['0']);
    chai.expect(v.charsCodePoint(1560)).to.eql(['1', '5', '6', '0']);
    chai.expect(v.charsCodePoint(-1.6)).to.eql(['-', '1', '.', '6']);
  });

  it('should split the string representation of an object', function () {
    chai.expect(v.charsCodePoint(['star'])).to.eql(['s', 't', 'a', 'r']);
    chai.expect(v.charsCodePoint({
      toString: function toString() {
        return 'Capa';
      }
    })).to.eql(['C', 'a', 'p', 'a']);
  });

  it('should return an empty array of characters for null and undefined', function () {
    chai.expect(v.charsCodePoint()).to.eql([]);
    chai.expect(v.charsCodePoint(undefined)).to.eql([]);
    chai.expect(v.charsCodePoint(null)).to.eql([]);
  });
});

describe('split', function () {

  it('should split a string into chunks', function () {
    chai.expect(v.split('stellar bomb', ' ')).to.eql(['stellar', 'bomb']);
    chai.expect(v.split('   ', ' ')).to.eql(['', '', '', '']);
    chai.expect(v.split('dying star', /\s/)).to.eql(['dying', 'star']);
    chai.expect(v.split('*dying*star*', /\*/)).to.eql(['', 'dying', 'star', '']);
    chai.expect(v.split('', '')).to.eql([]);
    chai.expect(v.split('star', '')).to.eql(['s', 't', 'a', 'r']);
  });

  it('should split a number into chunks', function () {
    chai.expect(v.split(0)).to.eql(['0']);
    chai.expect(v.split(1560, '6')).to.eql(['15', '0']);
    chai.expect(v.split(-1.6, /\./)).to.eql(['-1', '6']);
  });

  it('should split the string representation of an object', function () {
    chai.expect(v.split('rising star', ' ')).to.eql(['rising', 'star']);
    chai.expect(v.split({
      toString: function toString() {
        return 'rising-star';
      }
    }, /\-/)).to.eql(['rising', 'star']);
  });

  it('should return the string as an item of an array for an empty separator', function () {
    chai.expect(v.split('star')).to.eql(['star']);
    chai.expect(v.split('star', null)).to.eql(['star']);
    chai.expect(v.split('star', undefined)).to.eql(['star']);
  });
});

describe('words', function () {

  it('should split the string into words', function () {
    chai.expect(v.words('123')).to.eql(['123']);
    chai.expect(v.words('hello')).to.eql(['hello']);
    chai.expect(v.words('  hello   ')).to.eql(['hello']);
    chai.expect(v.words('hello world')).to.eql(['hello', 'world']);
    chai.expect(v.words('12+14-18*400')).to.eql(['12', '14', '18', '400']);
    chai.expect(v.words('gravity can cross dimensions')).to.eql(['gravity', 'can', 'cross', 'dimensions']);
    chai.expect(v.words('-gravity-can-cross-dimensions-')).to.eql(['gravity', 'can', 'cross', 'dimensions']);
    chai.expect(v.words('gravity_can_cross_dimensions')).to.eql(['gravity', 'can', 'cross', 'dimensions']);
    chai.expect(v.words('*gravity***can****cross&&dimensions++')).to.eql(['gravity', 'can', 'cross', 'dimensions']);
    chai.expect(v.words('GravityCanCrossDimensions')).to.eql(['Gravity', 'Can', 'Cross', 'Dimensions']);
    chai.expect(v.words('GRAVITYCan')).to.eql(['GRAVITY', 'Can']);
    chai.expect(v.words('GravityCan')).to.eql(['Gravity', 'Can']);
    chai.expect(v.words('GravityCANAttract')).to.eql(['Gravity', 'CAN', 'Attract']);
    chai.expect(v.words('gravityCan')).to.eql(['gravity', 'Can']);
    chai.expect(v.words('Gravity-Can11Cross **Dimensions1Foo')).to.eql(['Gravity', 'Can', '11', 'Cross', 'Dimensions', '1', 'Foo']);
    chai.expect(v.words('Cooper... Cooper... Come in, Cooper.')).to.eql(['Cooper', 'Cooper', 'Come', 'in', 'Cooper']);
    chai.expect(v.words('Newton\'s third law')).to.eql(['Newton', 's', 'third', 'law']);
    chai.expect(v.words('Newton\'s thIrd lAw')).to.eql(['Newton', 's', 'th', 'Ird', 'l', 'Aw']);
    chai.expect(v.words(PRINTABLE_ASCII)).to.eql(['0123456789', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz']);
    chai.expect(v.words('')).to.eql([]);
    chai.expect(v.words()).to.eql([]);
    chai.expect(v.words(' ')).to.eql([]);
    chai.expect(v.words('     ')).to.eql([]);
    chai.expect(v.words('\n')).to.eql([]);
    chai.expect(v.words('***')).to.eql([]);
    chai.expect(v.words('***---')).to.eql([]);
    chai.expect(v.words('***---')).to.eql([]);
    chai.expect(v.words('mañana')).to.eql(['mañana']);
    chai.expect(v.words('maÑana')).to.eql(['ma', 'Ñana']);
    chai.expect(v.words('foõ͜͝͞ bar')).to.eql(['foõ͜͝͞', 'bar']);
    chai.expect(v.words('fo-O-Õ͜͝͞-bar')).to.eql(['fo', 'O', 'Õ͜͝͞', 'bar']);
  });

  it('should split the string with diacritics and non-latin characters into words', function () {
    chai.expect(v.words('Στις αρχές του 21ου αιώνα')).to.eql(['Στις', 'αρχές', 'του', '21', 'ου', 'αιώνα']);
    chai.expect(v.words('Гравитация притягивает все')).to.eql(['Гравитация', 'притягивает', 'все']);
    chai.expect(v.words('ГравитацияПритягиваетВСЕ')).to.eql(['Гравитация', 'Притягивает', 'ВСЕ']);
    chai.expect(v.words('clasificación biológica.')).to.eql(['clasificación', 'biológica']);
  });

  it('should split the string representation of an object', function () {
    chai.expect(v.words(['GravityCanCrossDimensions'])).to.eql(['Gravity', 'Can', 'Cross', 'Dimensions']);
    chai.expect(v.words({
      toString: function toString() {
        return 'Gr4v1ty';
      }
    })).to.eql(['Gr', '4', 'v', '1', 'ty']);
  });

  it('should split the string into words using a pattern', function () {
    chai.expect(v.words('1234567890', /\d/g)).to.eql(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']);
    chai.expect(v.words('gravity', /\w{1,2}/g)).to.eql(['gr', 'av', 'it', 'y']);
    chai.expect(v.words('gravity can cross dimensions', '\\w+(?=\\s?)', 'g')).to.eql(['gravity', 'can', 'cross', 'dimensions']);
    chai.expect(v.words('1234567890', /\s/g)).to.eql([]);
  });

  it('should split the string with default pattern for null and undefined', function () {
    chai.expect(v.words('gravity_can_cross_dimensions', null)).to.eql(['gravity', 'can', 'cross', 'dimensions']);
    chai.expect(v.words('gravity_can_cross_dimensions', undefined)).to.eql(['gravity', 'can', 'cross', 'dimensions']);
  });
});
//# sourceMappingURL=test-bundle.js.map