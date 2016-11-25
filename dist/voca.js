(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.v = factory());
}(this, (function () { 'use strict';

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
 * Converts the `value` to a boolean. If `value` is `undefined` or `null`, returns `defaultValue`.
 *
 * @ignore
 * @function toBoolean
 * @param {*} value The value to convert.
 * @param {boolean} [defaultValue=false] The default value.
 * @return {boolean} Returns the coercion to boolean.
 */
var coerceToBoolean = function (value) {
  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (isNil(value)) {
    return defaultValue;
  }
  return Boolean(value);
};

/**
 * Checks whether `subject` is a string primitive type.
 *
 * @function isString
 * @static
 * @since 1.0.0
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
function isString(subject) {
  return typeof subject === 'string';
}

/**
 * Get the string representation of the `value`.
 * Converts the `value` to string.
 * If `value` is `null` or `undefined`, return `defaultValue`.
 *
 * @ignore
 * @function toString
 * @param {*} value             The value to convert.
 * @param {*} [defaultValue=''] The default value to return.
 * @return {string|null}        Returns the string representation of `value`. Returns `defaultValue` if `value` is
 *                              `null` or `undefined`.
 */
var coerceToString = function (value) {
  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  if (isNil(value)) {
    return defaultValue;
  }
  if (isString(value)) {
    return value;
  }
  return String(value);
};

/**
 * Converts the first character of `subject` to upper case. If `restToLower` is `true`, convert the rest of
 * `subject` to lower case.
 *
 * @function capitalize
 * @static
 * @since 1.0.0
 * @memberOf Case
 * @param  {string}  [subject='']        The string to capitalize.
 * @param  {boolean} [restToLower=false] Convert the rest of `subject` to lower case.
 * @return {string}                      Returns the capitalized string.
 * @example
 * v.capitalize('apple');
 * // => 'Apple'
 *
 * v.capitalize('aPPle', true);
 * // => 'Apple'
 */
function capitalize(subject, restToLower) {
  var subjectString = coerceToString(subject);
  var restToLowerCaseBoolean = coerceToBoolean(restToLower);
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
 * @since 1.0.0
 * @memberOf Case
 * @param  {string} [subject=''] The string to convert to lower case.
 * @return {string}              Returns the lower case string.
 * @example
 * v.lowerCase('Green');
 * // => 'green'
 */
function lowerCase(subject) {
  var subjectString = coerceToString(subject, '');
  return subjectString.toLowerCase();
}

/**
 * A regular expression string that matches lower case letters: LATIN, BASIC GREEK, BASIC CYRILLIC
 *
 * @type {string}
 * @ignore
 */
var lowerCaseLetter = 'a-z\\xB5\\xDF-\\xF6\\xF8-\\xFF\\u0101\\u0103\\u0105\\u0107\\u0109\\u010B\\u010D\\u010F\\u0111\\u0113\\u0115\\u0117\\u0119\\u011B\\u011D\\u011F\\u0121\\u0123\\u0125\\u0127\\u0129\\u012B\\u012D\\u012F\\u0131\\u0133\\u0135\\u0137\\u0138\\u013A\\u013C\\u013E\\u0140\\u0142\\u0144\\u0146\\u0148\\u0149\\u014B\\u014D\\u014F\\u0151\\u0153\\u0155\\u0157\\u0159\\u015B\\u015D\\u015F\\u0161\\u0163\\u0165\\u0167\\u0169\\u016B\\u016D\\u016F\\u0171\\u0173\\u0175\\u0177\\u017A\\u017C\\u017E-\\u0180\\u0183\\u0185\\u0188\\u018C\\u018D\\u0192\\u0195\\u0199-\\u019B\\u019E\\u01A1\\u01A3\\u01A5\\u01A8\\u01AA\\u01AB\\u01AD\\u01B0\\u01B4\\u01B6\\u01B9\\u01BA\\u01BD-\\u01BF\\u01C6\\u01C9\\u01CC\\u01CE\\u01D0\\u01D2\\u01D4\\u01D6\\u01D8\\u01DA\\u01DC\\u01DD\\u01DF\\u01E1\\u01E3\\u01E5\\u01E7\\u01E9\\u01EB\\u01ED\\u01EF\\u01F0\\u01F3\\u01F5\\u01F9\\u01FB\\u01FD\\u01FF\\u0201\\u0203\\u0205\\u0207\\u0209\\u020B\\u020D\\u020F\\u0211\\u0213\\u0215\\u0217\\u0219\\u021B\\u021D\\u021F\\u0221\\u0223\\u0225\\u0227\\u0229\\u022B\\u022D\\u022F\\u0231\\u0233-\\u0239\\u023C\\u023F\\u0240\\u0242\\u0247\\u0249\\u024B\\u024D\\u024F-\\u0293\\u0295-\\u02AF\\u03B1-\\u03C9\\u0430-\\u044F';

/**
 * A regular expression string that matches upper case letters: LATIN, BASIC GREEK, BASIC CYRILLIC
 *
 * @type {string}
 * @ignore
 */
var upperCaseLetter = '\\x41-\\x5a\\xc0-\\xd6\\xd8-\\xde\\u0100\\u0102\\u0104\\u0106\\u0108\\u010a\\u010c\\u010e\\u0110\\u0112\\u0114\\u0116\\u0118\\u011a\\u011c\\u011e\\u0120\\u0122\\u0124\\u0126\\u0128\\u012a\\u012c\\u012e\\u0130\\u0132\\u0134\\u0136\\u0139\\u013b\\u013d\\u013f\\u0141\\u0143\\u0145\\u0147\\u014a\\u014c\\u014e\\u0150\\u0152\\u0154\\u0156\\u0158\\u015a\\u015c\\u015e\\u0160\\u0162\\u0164\\u0166\\u0168\\u016a\\u016c\\u016e\\u0170\\u0172\\u0174\\u0176\\u0178\\u0179\\u017b\\u017d\\u0181\\u0182\\u0184\\u0186\\u0187\\u0189-\\u018b\\u018e-\\u0191\\u0193\\u0194\\u0196-\\u0198\\u019c\\u019d\\u019f\\u01a0\\u01a2\\u01a4\\u01a6\\u01a7\\u01a9\\u01ac\\u01ae\\u01af\\u01b1-\\u01b3\\u01b5\\u01b7\\u01b8\\u01bc\\u01c4\\u01c5\\u01c7\\u01c8\\u01ca\\u01cb\\u01cd\\u01cf\\u01d1\\u01d3\\u01d5\\u01d7\\u01d9\\u01db\\u01de\\u01e0\\u01e2\\u01e4\\u01e6\\u01e8\\u01ea\\u01ec\\u01ee\\u01f1\\u01f2\\u01f4\\u01f6-\\u01f8\\u01fa\\u01fc\\u01fe\\u0200\\u0202\\u0204\\u0206\\u0208\\u020a\\u020c\\u020e\\u0210\\u0212\\u0214\\u0216\\u0218\\u021a\\u021c\\u021e\\u0220\\u0222\\u0224\\u0226\\u0228\\u022a\\u022c\\u022e\\u0230\\u0232\\u023a\\u023b\\u023d\\u023e\\u0241\\u0243-\\u0246\\u0248\\u024a\\u024c\\u024e\\u0391-\\u03A9\\u0410-\\u042F';

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
 * A regular expression to match the base character for a combining mark
 *
 * @type {string}
 * @ignore
 */
var base = '\\0-\\u02FF\\u0370-\\u1AAF\\u1B00-\\u1DBF\\u1E00-\\u20CF\\u2100-\\uD7FF\\uE000-\\uFE1F\\uFE30-\\uFFFF';

/**
 * Regular expression to match combining marks
 *
 * @see http://unicode.org/faq/char_combmark.html
 * @type {RegExp}
 * @ignore
 */
var REGEXP_COMBINING_MARKS = new RegExp('([' + base + ']|[' + highSurrogate + '][' + lowSurrogate + ']|[' + highSurrogate + '](?![' + lowSurrogate + '])|(?:[^' + highSurrogate + ']|^)[' + lowSurrogate + '])([' + diacriticalMark + ']+)', 'g');

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
var REGEXP_UNICODE_CHARACTER = new RegExp('((?:[' + base + ']|[' + highSurrogate + '][' + lowSurrogate + ']|[' + highSurrogate + '](?![' + lowSurrogate + '])|(?:[^' + highSurrogate + ']|^)[' + lowSurrogate + '])(?:[' + diacriticalMark + ']+))|\
([' + highSurrogate + '][' + lowSurrogate + '])|\
([\\n\\r\\u2028\\u2029])|\
(.)', 'g');

/**
 * Regular expression to match whitespaces from the left side
 *
 * @type {RegExp}
 * @ignore
 */
var REGEXP_TRIM_LEFT = new RegExp('^[' + whitespace + ']+');

/**
 * Regular expression to match whitespaces from the right side
 *
 * @type {RegExp}
 * @ignore
 */
var REGEXP_TRIM_RIGHT = new RegExp('[' + whitespace + ']+$');

/**
 * Regular expression to match alpha characters
 *
 * @see http://stackoverflow.com/a/22075070/1894471
 * @type {RegExp}
 * @ignore
 */
var REGEXP_ALPHA = new RegExp('^(?:[' + lowerCaseLetter + upperCaseLetter + '][' + diacriticalMark + ']*)+$');

/**
 * Regular expression to match alpha and digit characters
 *
 * @see http://stackoverflow.com/a/22075070/1894471
 * @type {RegExp}
 * @ignore
 */
var REGEXP_ALPHA_DIGIT = new RegExp('^((?:[' + lowerCaseLetter + upperCaseLetter + '][' + diacriticalMark + ']*)|[' + digit + '])+$');

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
 * Regular expression to match Unicode words
 *
 * @type {RegExp}
 * @ignore
 */
var REGEXP_WORD = new RegExp('(?:(?:[' + upperCaseLetter + '][' + diacriticalMark + ']*)?(?:[' + lowerCaseLetter + '][' + diacriticalMark + ']*)+)|\
(?:(?:[' + upperCaseLetter + '][' + diacriticalMark + ']*)+(?![' + lowerCaseLetter + ']))|\
(?:[' + digit + ']+)', 'g');

/**
 * Regular expression to match words from Basic Latin and Latin-1 Supplement blocks
 *
 * @type {RegExp}
 * @ignore
 */
var REGEXP_LATIN_WORD = /(?:[A-Z\xC0-\xD6\xD8-\xDE]?[a-z\xDF-\xF6\xF8-\xFF]+)|(?:[A-Z\xC0-\xD6\xD8-\xDE]+(?![a-z\xDF-\xF6\xF8-\xFF]))|(?:\d+)/g;

/**
 * Regular expression to match not latin characters
 *
 * @type {RegExp}
 * @ignore
 */
var REGEXP_NON_LATIN = /[\W]/g;

/**
 * Regular expression to match Basic Latin and Latin-1 Supplement blocks
 *
 * @type {RegExp}
 * @ignore
 */
var REGEXP_LATIN = /^[\x00-\xFF]*$/;

/**
 * Regular expression to match HTML special characters.
 *
 * @type {RegExp}
 * @ignore
 */
var REGEXP_HTML_SPECIAL_CHARACTERS = /[<>&"'`]/g;

/**
 * Regular expression to match sprintf format string
 *
 * @type {RegExp}
 * @ignore
 */
var REGEXP_CONVERSION_SPECIFICATION = /(%{1,2})(?:(\d+)\$)?(\+)?([ 0]|'.{1})?(-)?(\d+)?(?:\.(\d+))?([bcdiouxXeEfgGs])?/g;

/**
 * Regular expression to match trailing zeros in a number
 *
 * @type {RegExp}
 * @ignore
 */
var REGEXP_TRAILING_ZEROS = /\.?0+$/g;

/**
 * Regular expression to match flags from a regular expression.
 *
 * @type {RegExp}
 * @ignore
 */
var REGEXP_FLAGS = /[gimuy]*$/;

/**
 * Verifies if `value` is `undefined` or `null` and returns `defaultValue`. In other case returns `value`.
 *
 * @ignore
 * @function nilDefault
 * @param {*} value The value to verify.
 * @param {*} defaultValue The default value.
 * @return {*} Returns `defaultValue` if `value` is `undefined` or `null`, otherwise `defaultValue`.
 */
var nilDefault = function (value, defaultValue) {
  return value == null ? defaultValue : value;
};

/**
 * Get the string representation of the `value`.
 * Converts the `value` to string.
 *
 * @ignore
 * @function toString
 * @param {*} value             The value to convert.
 * @return {string|null}        Returns the string representation of `value`.
 */
var toString = function (value) {
  if (isNil(value)) {
    return null;
  }
  if (isString(value)) {
    return value;
  }
  return String(value);
};

/**
 * Splits `subject` into an array of words.
 *
 * @function words
 * @static
 * @since 1.0.0
 * @memberOf Split
 * @param {string} [subject=''] The string to split into words.
 * @param {string|RegExp} [pattern] The pattern to watch words. If `pattern` is not RegExp, it is transformed to `new RegExp(pattern, flags)`.
 * @param {string} [flags=''] The regular expression flags. Applies when `pattern` is string type.
 * @return {Array} Returns the array of words.
 * @example
 * v.words('gravity can cross dimensions');
 * // => ['gravity', 'can', 'cross', 'dimensions']
 *
 * v.words('GravityCanCrossDimensions');
 * // => ["Gravity", "Can", "Cross", "Dimensions"]
 *
 * v.words('Gravity - can cross dimensions!');
 * // => ["Gravity", "can", "cross", "dimensions"]
 *
 * v.words('gravity', /\w{1,2}/g);
 * // => ['gr', 'av', 'it', 'y']
 */
function words(subject, pattern, flags) {
  var subjectString = coerceToString(subject);
  var patternRegExp = void 0;
  if (isNil(pattern)) {
    patternRegExp = REGEXP_LATIN.test(subjectString) ? REGEXP_LATIN_WORD : REGEXP_WORD;
  } else if (pattern instanceof RegExp) {
    patternRegExp = pattern;
  } else {
    var flagsString = toString(nilDefault(flags, ''));
    patternRegExp = new RegExp(toString(pattern), flagsString);
  }
  return nilDefault(subjectString.match(patternRegExp), []);
}

/**
 * Transforms the `word` into camel case chunk.
 *
 * @param  {string} word  The word string
 * @param  {number} index The index of the word in phrase.
 * @return {string}       The transformed word.
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
 * @since 1.0.0
 * @memberOf Case
 * @param  {string} [subject=''] The string to convert to camel case.
 * @return {string}              The camel case string.
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
function camelCase(subject) {
  var subjectString = coerceToString(subject);
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
 * @since 1.0.0
 * @memberOf Case
 * @param  {string} [subject=''] The string to decapitalize.
 * @return {string}              Returns the decapitalized string.
 * @example
 * v.decapitalize('Sun');
 * // => 'sun'
 */
function decapitalize(subject) {
  var subjectString = coerceToString(subject);
  if (subjectString === '') {
    return subjectString;
  }
  return subjectString.substr(0, 1).toLowerCase() + subjectString.substr(1);
}

/**
 * Converts the `subject` to <a href="https://en.wikipedia.org/wiki/Letter_case#cite_ref-13">kebab case</a>,
 * also called <i>spinal case</i> or <i>lisp case</i>.
 *
 * @function kebabCase
 * @static
 * @since 1.0.0
 * @memberOf Case
 * @param  {string} [subject=''] The string to convert to kebab case.
 * @return {string}              Returns the kebab case string.
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
function kebabCase(subject) {
  var subjectString = coerceToString(subject);
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
 * @since 1.0.0
 * @memberOf Case
 * @param  {string} [subject=''] The string to convert to snake case.
 * @return {string}              Returns the snake case string.
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
function snakeCase(subject) {
  var subjectString = coerceToString(subject);
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
 * @since 1.0.0
 * @memberOf Case
 * @param  {string} [subject=''] The string to convert to upper case.
 * @return {string}              Returns the upper case string.
 * @example
 * v.upperCase('school');
 * // => 'SCHOOL'
 */
function upperCase(subject) {
  var subjectString = coerceToString(subject);
  return subjectString.toUpperCase();
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
var clipNumber = function (value, downLimit, upLimit) {
  if (value <= downLimit) {
    return downLimit;
  }
  if (value >= upLimit) {
    return upLimit;
  }
  return value;
};

/**
 * Max save integer value
 *
 * @ignore
 * @type {number}
 */
var MAX_SAFE_INTEGER = 0x1fffffffffffff;

/**
 * Transforms `value` to an integer.
 *
 * @ignore
 * @function toInteger
 * @param {number} value The number to transform.
 * @returns {number} Returns the transformed integer.
 */
var toInteger = function (value) {
  if (value === Infinity) {
    return MAX_SAFE_INTEGER;
  }
  if (value === -Infinity) {
    return -MAX_SAFE_INTEGER;
  }
  return ~~value;
};

/**
 * Truncates `subject` to a new `length`.
 *
 * @function truncate
 * @static
 * @since 1.0.0
 * @memberOf Chop
 * @param  {string} [subject=''] The string to truncate.
 * @param  {int}    length       The length to truncate the string.
 * @param  {string} [end='...']  The string to be added at the end.
 * @return {string}              Returns the truncated string.
 * @example
 * v.truncate('Once upon a time', 7);
 * // => 'Once...'
 *
 * v.truncate('Good day, Little Red Riding Hood', 14, ' (...)');
 * // => 'Good day (...)'
 *
 * v.truncate('Once upon', 10);
 * // => 'Once upon'
 */
function truncate(subject, length, end) {
  var subjectString = coerceToString(subject);
  var lengthInt = isNil(length) ? subjectString.length : clipNumber(toInteger(length), 0, MAX_SAFE_INTEGER);
  var endString = coerceToString(end, '...');
  if (lengthInt >= subjectString.length) {
    return subjectString;
  }
  return subjectString.substr(0, length - endString.length) + endString;
}

/**
 * Access a character from `subject` at specified `position`.
 *
 * @function charAt
 * @static
 * @since 1.0.0
 * @memberOf Chop
 * @param  {string} [subject=''] The string to extract from.
 * @param  {numbers} position The position to get the character.
 * @return {string} Returns the character at specified position.
 * @example
 * v.charAt('helicopter', 0);
 * // => 'h'
 *
 * v.charAt('helicopter', 1);
 * // => 'e'
 */
function charAt(subject, position) {
  var subjectString = coerceToString(subject);
  return subjectString.charAt(position);
}

var HIGH_SURROGATE_START = 0xD800;
var HIGH_SURROGATE_END = 0xDBFF;
var LOW_SURROGATE_START = 0xDC00;
var LOW_SURROGATE_END = 0xDFFF;

/**
 * Checks if `codePoint` is a high-surrogate number from range 0xD800 to 0xDBFF.
 *
 * @ignore
 * @param {number} codePoint The code point number to be verified
 * @return {boolean} Returns a boolean whether `codePoint` is a high-surrogate number.
 */
function isHighSurrogate(codePoint) {
  return codePoint >= HIGH_SURROGATE_START && codePoint <= HIGH_SURROGATE_END;
}

/**
 * Checks if `codePoint` is a low-surrogate number from range 0xDC00 to 0xDFFF.
 *
 * @ignore
 * @param {number} codePoint The code point number to be verified
 * @return {boolean} Returns a boolean whether `codePoint` is a low-surrogate number.
 */
function isLowSurrogate(codePoint) {
  return codePoint >= LOW_SURROGATE_START && codePoint <= LOW_SURROGATE_END;
}

/**
 * Get the astral code point number based on surrogate pair numbers.
 *
 * @ignore
 * @param {number} highSurrogate The high-surrogate code point number.
 * @param {number} lowSurrogate The low-surrogate code point number.
 * @return {number} Returns the astral symbol number.
 */
function getAstralNumberFromSurrogatePair(highSurrogate, lowSurrogate) {
  return (highSurrogate - HIGH_SURROGATE_START) * 0x400 + lowSurrogate - LOW_SURROGATE_START + 0x10000;
}

/**
 * Get the number representation of the `value`.
 * Converts the `value` to number.
 * If `value` is `null` or `undefined`, return `defaultValue`.
 *
 * @ignore
 * @function toString
 * @param {*} value             The value to convert.
 * @param {*} [defaultValue=''] The default value to return.
 * @return {number|null}        Returns the number representation of `value`. Returns `defaultValue` if `value` is
 *                              `null` or `undefined`.
 */
var coerceToNumber = function (value) {
  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  if (isNil(value)) {
    return defaultValue;
  }
  if (typeof value === 'number') {
    return value;
  }
  return Number(value);
};

/**
 * If `value` is `NaN`, return `defaultValue`. In other case returns `value`.
 *
 * @ignore
 * @function nanDefault
 * @param {*} value The value to verify.
 * @param {*} defaultValue The default value.
 * @return {*} Returns `defaultValue` if `value` is `NaN`, otherwise `defaultValue`.
 */
var nanDefault = function (value, defaultValue) {
  return value !== value ? defaultValue : value;
};

/**
 * Get the Unicode code point value of the character at `position`. <br/>
 * If a valid UTF-16 <a href="https://rainsoft.io/what-every-javascript-developer-should-know-about-unicode/#24surrogatepairs">
 * surrogate pair</a> starts at `position`, the
 * <a href="https://rainsoft.io/what-every-javascript-developer-should-know-about-unicode/#astralplanes">astral code point</a>
 * value at `position` is returned.
 *
 * @function codePointAt
 * @static
 * @since 1.0.0
 * @memberOf Chop
 * @param  {string} [subject=''] The string to extract from.
 * @param  {number} position The position to get the code point number.
 * @return {number} Returns a non-negative number less than or equal to `0x10FFFF`.
 * @example
 * v.codePointAt('rain', 1);
 * // => 97, or 0x0061
 *
 * v.codePointAt('\uD83D\uDE00 is smile', 0); // or '😀 is smile'
 * // => 128512, or 0x1F600
 */
function codePointAt(subject, position) {
  var subjectString = coerceToString(subject);
  var subjectStringLength = subjectString.length;
  var positionNumber = coerceToNumber(position);
  positionNumber = nanDefault(positionNumber, 0);
  if (positionNumber < 0 || positionNumber >= subjectStringLength) {
    return undefined;
  }
  var firstCodePoint = subjectString.charCodeAt(positionNumber);
  var secondCodePoint = void 0;
  if (isHighSurrogate(firstCodePoint) && subjectStringLength > positionNumber + 1) {
    secondCodePoint = subjectString.charCodeAt(positionNumber + 1);
    if (isLowSurrogate(secondCodePoint)) {
      return getAstralNumberFromSurrogatePair(firstCodePoint, secondCodePoint);
    }
  }
  return firstCodePoint;
}

/**
 * Extracts the first `length` characters from `subject`.
 *
 * @function first
 * @static
 * @since 1.0.0
 * @memberOf Chop
 * @param  {string} [subject=''] The string to extract from.
 * @param  {int}    [length=1]   The number of characters to extract.
 * @return {string}              Returns the first characters string.
 * @example
 * v.first('helicopter');
 * // => 'h'
 *
 * v.first('vehicle', 2);
 * // => 've'
 *
 * v.first('car', 5);
 * // => 'car'
 */
function first(subject, length) {
  var subjectString = coerceToString(subject);
  var lengthInt = isNil(length) ? 1 : clipNumber(toInteger(length), 0, MAX_SAFE_INTEGER);
  if (subjectString.length <= lengthInt) {
    return subjectString;
  }
  return subjectString.substr(0, lengthInt);
}

/**
 * Get a grapheme from `subject` at specified `position` taking care of
 * <a href="https://rainsoft.io/what-every-javascript-developer-should-know-about-unicode/#24surrogatepairs">surrogate pairs</a> and
 * <a href="https://rainsoft.io/what-every-javascript-developer-should-know-about-unicode/#25combiningmarks">combining marks</a>.
 *
 * @function graphemeAt
 * @static
 * @since 1.0.0
 * @memberOf Chop
 * @param  {string} [subject=''] The string to extract from.
 * @param  {number} position The position to get the grapheme.
 * @return {string} Returns the grapheme at specified position.
 * @example
 * v.graphemeAt('\uD835\uDC00\uD835\uDC01', 0); // or '𝐀𝐁'
 * // => 'A'
 *
 * v.graphemeAt('cafe\u0301', 3); // or 'café'
 * // => 'é'
 */
function graphemeAt(subject, position) {
  var subjectString = coerceToString(subject);
  var positionNumber = coerceToNumber(position);
  var graphemeMatch = void 0;
  var graphemeMatchIndex = 0;
  positionNumber = nanDefault(positionNumber, 0);
  while ((graphemeMatch = REGEXP_UNICODE_CHARACTER.exec(subjectString)) !== null) {
    if (graphemeMatchIndex === positionNumber) {
      REGEXP_UNICODE_CHARACTER.lastIndex = 0;
      return graphemeMatch[0];
    }
    graphemeMatchIndex++;
  }
  return '';
}

/**
 * Extracts the last `length` characters from `subject`.
 *
 * @function last
 * @static
 * @since 1.0.0
 * @memberOf Chop
 * @param  {string} [subject=''] The string to extract from.
 * @param  {int}    [length=1]   The number of characters to extract.
 * @return {string}              Returns the last characters string.
 * @example
 * v.last('helicopter');
 * // => 'r'
 *
 * v.last('vehicle', 2);
 * // => 'le'
 *
 * v.last('car', 5);
 * // => 'car'
 */
function last(subject, length) {
  var subjectString = coerceToString(subject);
  var lengthInt = isNil(length) ? 1 : clipNumber(toInteger(length), 0, MAX_SAFE_INTEGER);
  if (subjectString.length <= lengthInt) {
    return subjectString;
  }
  return subjectString.substr(subjectString.length - lengthInt, lengthInt);
}

/**
 * Truncates `subject` to a new `length` and does not break the words. Guarantees that the truncated string is no longer
 * than `length`.
 *
 * @static
 * @function prune
 * @since 1.0.0
 * @memberOf Chop
 * @param  {string} [subject=''] The string to prune.
 * @param  {int}    length       The length to prune the string.
 * @param  {string} [end='...']  The string to be added at the end.
 * @return {string}              Returns the pruned string.
 * @example
 * v.prune('Once upon a time', 7);
 * // => 'Once...'
 *
 * v.prune('Good day, Little Red Riding Hood', 16, ' (more)');
 * // => 'Good day (more)'
 *
 * v.prune('Once upon', 10);
 * // => 'Once upon'
 */
function prune(subject, length, end) {
  var subjectString = coerceToString(subject);
  var lengthInt = isNil(length) ? subjectString.length : clipNumber(toInteger(length), 0, MAX_SAFE_INTEGER);
  var endString = coerceToString(end, '...');
  if (lengthInt >= subjectString.length) {
    return subjectString;
  }
  var truncatedLength = 0;
  subjectString.replace(REGEXP_WORD, function (word, offset) {
    var wordInsertLength = offset + word.length;
    if (wordInsertLength <= lengthInt - endString.length) {
      truncatedLength = wordInsertLength;
    }
  });
  return subjectString.substr(0, truncatedLength) + endString;
}

/**
 * Extracts from `subject` a string from `start` position up to `end` position. The character at `end` position is not
 * included.
 *
 * @function slice
 * @static
 * @since 1.0.0
 * @memberOf Chop
 * @param  {string} [subject='']         The string to extract from.
 * @param  {number} start                The position to start extraction. If negative use `subject.length + start`.
 * @param  {number} [end=subject.length] The position to end extraction. If negative use `subject.length + end`.
 * @return {string}                      Returns the extracted string.
 * @note Uses native `String.prototype.slice()`
 * @example
 * v.slice('miami', 1);
 * // => 'iami'
 *
 * v.slice('florida', -4);
 * // => 'rida'
 *
 * v.slice('florida', 1, 4);
 * // => "lor"
 */
function slice(subject, start, end) {
  return coerceToString(subject).slice(start, end);
}

/**
 * Extracts from `subject` a string from `start` position a number of `length` characters.
 *
 * @function substr
 * @static
 * @since 1.0.0
 * @memberOf Chop
 * @param  {string} [subject='']                 The string to extract from.
 * @param  {number} start                        The position to start extraction.
 * @param  {number} [length=subject.endOfString] The number of characters to extract. If omitted, extract to the end of `subject`.
 * @return {string}                              Returns the extracted string.
 * @note Uses native `String.prototype.substr()`
 * @example
 * v.substr('infinite loop', 9);
 * // => 'loop'
 *
 * v.substr('dreams', 2, 2);
 * // => 'ea'
 */
function substr(subject, start, length) {
  return coerceToString(subject).substr(start, length);
}

/**
 * Extracts from `subject` a string from `start` position up to `end` position. The character at `end` position is not
 * included.
 *
 * @function substring
 * @static
 * @since 1.0.0
 * @memberOf Chop
 * @param  {string} [subject='']         The string to extract from.
 * @param  {number} start                The position to start extraction.
 * @param  {number} [end=subject.length] The position to end extraction.
 * @return {string}                      Returns the extracted string.
 * @note Uses native `String.prototype.substring()`
 * @example
 * v.substring('beach', 1);
 * // => 'each'
 *
 * v.substring('ocean', 1, 3);
 * // => 'ea'
 */
function substring(subject, start, end) {
  return coerceToString(subject).substring(start, end);
}

/**
 * Counts the characters in `subject`.<br/>
 *
 * @function count
 * @static
 * @since 1.0.0
 * @memberOf Count
 * @param  {string} [subject=''] The string to count characters.
 * @return {number}              Returns the number of characters in `subject`.
 * @example
 * v.count('rain');
 * // => 4
 */
function count(subject) {
  return coerceToString(subject).length;
}

/**
 * Counts the graphemes in `subject` taking care of
 * <a href="https://rainsoft.io/what-every-javascript-developer-should-know-about-unicode/#24surrogatepairs">surrogate pairs</a> and
 * <a href="https://rainsoft.io/what-every-javascript-developer-should-know-about-unicode/#25combiningmarks">combining marks</a>.
 *
 * @function  countGrapheme
 * @static
 * @since 1.0.0
 * @memberOf Count
 * @param  {string} [subject=''] The string to count graphemes.
 * @return {number}              Returns the number of graphemes in `subject`.
 * @example
 * v.countGrapheme('cafe\u0301'); // or 'café'
 * // => 4
 *
 * v.countGrapheme('\uD835\uDC00\uD835\uDC01'); // or '𝐀𝐁'
 * // => 2
 *
 * v.countGrapheme('rain');
 * // => 4
 */
function countGrapheme(subject) {
  return coerceToString(subject).replace(REGEXP_COMBINING_MARKS, '*').replace(REGEXP_SURROGATE_PAIRS, '*').length;
}

/**
 * Counts the number of `substring` appearances in `subject`.
 *
 * @function countSubstring
 * @static
 * @since 1.0.0
 * @memberOf Count
 * @param  {string} [subject=''] The string where to count.
 * @param  {string} substring    The substring to be counted.
 * @return {number}              Returns the number of `substring` appearances.
 * @example
 * v.countSubstring('bad boys, bad boys whatcha gonna do?', 'boys');
 * // => 2
 *
 * v.countSubstring('every dog has its day', 'cat');
 * // => 0
 */
function countSubstring(subject, substring) {
  var subjectString = coerceToString(subject);
  var substringString = coerceToString(substring);
  var substringLength = substringString.length;
  var count = 0;
  var matchIndex = 0;
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

var reduce = Array.prototype.reduce;

/**
 * Counts the characters in `subject` for which `predicate` returns truthy.
 *
 * @function  countWhere
 * @static
 * @since 1.0.0
 * @memberOf Count
 * @param  {string}   [subject=''] The string to count characters.
 * @param  {Function} predicate    The predicate function invoked on each character with parameters `(character, index, string)`.
 * @param  {Object}   [context]    The context to invoke the `predicate`.
 * @return {number}                Returns the number of characters for which `predicate` returns truthy.
 * @example
 * v.countWhere('hola!', v.isAlpha);
 * // => 4
 *
 * v.countWhere('2022', function(character, index, str) {
 *   return character === '2';
 * });
 * // => 3
 */
function countWhere(subject, predicate, context) {
  var subjectString = coerceToString(subject);
  if (subjectString === '' || typeof predicate !== 'function') {
    return 0;
  }
  var predicateWithContext = predicate.bind(context);
  return reduce.call(subjectString, function (countTruthy, character, index) {
    return predicateWithContext(character, index, subjectString) ? countTruthy + 1 : countTruthy;
  }, 0);
}

/**
 * The current index.
 *
 * @ignore
 * @name ReplacementIndex#index
 * @type {number}
 * @return {ReplacementIndex} ReplacementIndex instance.
 */
function ReplacementIndex() {
  this.index = 0;
}

/**
 * Increment the current index.
 *
 * @ignore
 * @return {undefined}
 */
ReplacementIndex.prototype.increment = function () {
  this.index++;
};

/**
 * Increment the current index by position.
 *
 * @ignore
 * @param {number} [position] The replacement position.
 * @return {undefined}
 */
ReplacementIndex.prototype.incrementOnEmptyPosition = function (position) {
  if (isNil(position)) {
    this.increment();
  }
};

/**
 * Get the replacement index by position.
 *
 * @ignore
 * @param {number} [position] The replacement position.
 * @return {number} The replacement index.
 */
ReplacementIndex.prototype.getIndexByPosition = function (position) {
  return isNil(position) ? this.index : position - 1;
};

var Const = Object.freeze({
  // Type specifiers
  TYPE_INTEGER: 'i',
  TYPE_INTEGER_BINARY: 'b',
  TYPE_INTEGER_ASCII_CHARACTER: 'c',
  TYPE_INTEGER_DECIMAL: 'd',
  TYPE_INTEGER_OCTAL: 'o',
  TYPE_INTEGER_UNSIGNED_DECIMAL: 'u',
  TYPE_INTEGER_HEXADECIMAL: 'x',
  TYPE_INTEGER_HEXADECIMAL_UPPERCASE: 'X',
  TYPE_FLOAT_SCIENTIFIC: 'e',
  TYPE_FLOAT_SCIENTIFIC_UPPERCASE: 'E',
  TYPE_FLOAT: 'f',
  TYPE_FLOAT_SHORT: 'g',
  TYPE_FLOAT_SHORT_UPPERCASE: 'G',
  TYPE_STRING: 's',

  // Simple literals
  LITERAL_PERCENT: '%',
  LITERAL_SINGLE_QUOTE: "'",
  LITERAL_PLUS: '+',
  LITERAL_MINUS: '-',
  LITERAL_PERCENT_SPECIFIER: '%%',

  // Radix constants to format numbers
  RADIX_BINARY: 2,
  RADIX_OCTAL: 8,
  RADIX_DECIMAL: 10,
  RADIX_HEXADECIMAL: 16
});

/**
 * Repeats the `subject` number of `times`.
 *
 * @function repeat
 * @static
 * @since 1.0.0
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
function repeat(subject, times) {
  var subjectString = coerceToString(subject);
  var timesInt = isNil(times) ? 1 : clipNumber(toInteger(times), 0, MAX_SAFE_INTEGER);
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
var buildPadding = function (padCharacters, length) {
  var padStringRepeat = toInteger(length / padCharacters.length);
  var padStringRest = length % padCharacters.length;
  return repeat(padCharacters, padStringRepeat + padStringRest).substr(0, length);
};

/**
 * Pads `subject` from left to a new `length`.
 *
 * @function padLeft
 * @static
 * @since 1.0.0
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to pad.
 * @param {int} [length=0] The length to left pad the string. No changes are made if `length` is less than `subject.length`.
 * @param {string} [pad=' '] The string to be used for padding.
 * @return {string} Returns the left padded string.
 * @example
 * v.padLeft('dog', 5);
 * // => '  dog'
 *
 * v.padLeft('bird', 6, '-');
 * // => '--bird-'
 *
 * v.padLeft('cat', 6, '-=');
 * // => '-=-cat'
 */
function padLeft(subject, length, pad) {
  var subjectString = coerceToString(subject);
  var lengthInt = isNil(length) ? 0 : clipNumber(toInteger(length), 0, MAX_SAFE_INTEGER);
  var padString = coerceToString(pad, ' ');
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
 * @since 1.0.0
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to pad.
 * @param {int} [length=0] The length to right pad the string. No changes are made if `length` is less than `subject.length`.
 * @param {string} [pad=' '] The string to be used for padding.
 * @return {string} Returns the right padded string.
 * @example
 * v.padRight('dog', 5);
 * // => 'dog  '
 *
 * v.padRight('bird', 6, '-');
 * // => 'bird--'
 *
 * v.padRight('cat', 6, '-=');
 * // => 'cat-=-'
 */
function padRight(subject, length, pad) {
  var subjectString = coerceToString(subject);
  var lengthInt = isNil(length) ? 0 : clipNumber(toInteger(length), 0, MAX_SAFE_INTEGER);
  var padString = coerceToString(pad, ' ');
  if (lengthInt <= subjectString.length) {
    return subjectString;
  }
  return subjectString + buildPadding(padString, lengthInt - subjectString.length);
}

/**
 * Aligns and pads `subject` string.
 *
 * @ignore
 * @param {string} subject The subject string.
 * @param {ConversionSpecification} conversion The conversion specification object.
 * @return {string} Returns the aligned and padded string.
 */
var alignAndPad = function (subject, conversion) {
  var width = conversion.width;
  if (isNil(width) || subject.length >= width) {
    return subject;
  }
  var padType = conversion.alignmentSpecifier === Const.LITERAL_MINUS ? padRight : padLeft;
  return padType(subject, width, conversion.getPaddingCharacter());
};

/**
 * Add sign to the formatted number.
 *
 * @ignore
 * @name addSignToFormattedNumber
 * @param  {number} replacementNumber The number to be replaced.
 * @param  {string} formattedReplacement The formatted version of number.
 * @param  {ConversionSpecification} conversion The conversion specification object.
 * @return {string} Returns the formatted number string with a sign.
 */
var addSignToFormattedNumber = function (replacementNumber, formattedReplacement, conversion) {
  if (conversion.signSpecifier === Const.LITERAL_PLUS && replacementNumber >= 0) {
    formattedReplacement = Const.LITERAL_PLUS + formattedReplacement;
  }
  return formattedReplacement;
};

/**
 * Formats a float type according to specifiers.
 *
 * @ignore
 * @param  {string} replacement The string to be formatted.
 * @param  {ConversionSpecification} conversion The conversion specification object.
 * @return {string} Returns the formatted string.
 */

var formatFloat = function (replacement, conversion) {
  var replacementNumber = parseFloat(replacement);
  var formattedReplacement = void 0;
  if (isNaN(replacementNumber)) {
    replacementNumber = 0;
  }
  var precision = coerceToNumber(conversion.precision, 6);
  switch (conversion.typeSpecifier) {
    case Const.TYPE_FLOAT:
      formattedReplacement = replacementNumber.toFixed(precision);
      break;
    case Const.TYPE_FLOAT_SCIENTIFIC:
      formattedReplacement = replacementNumber.toExponential(precision);
      break;
    case Const.TYPE_FLOAT_SCIENTIFIC_UPPERCASE:
      formattedReplacement = replacementNumber.toExponential(precision).toUpperCase();
      break;
    case Const.TYPE_FLOAT_SHORT:
    case Const.TYPE_FLOAT_SHORT_UPPERCASE:
      formattedReplacement = formatFloatAsShort(replacementNumber, precision, conversion);
      break;
  }
  formattedReplacement = addSignToFormattedNumber(replacementNumber, formattedReplacement, conversion);
  return coerceToString(formattedReplacement);
};

/**
 * Formats the short float.
 *
 * @ignore
 * @param  {number} replacementNumber The number to format.
 * @param  {number} precision The precision to format the float.
 * @param  {ConversionSpecification} conversion The conversion specification object.
 * @return {string}  Returns the formatted short float.
 */
function formatFloatAsShort(replacementNumber, precision, conversion) {
  if (replacementNumber === 0) {
    return '0';
  }
  var nonZeroPrecision = precision === 0 ? 1 : precision;
  var formattedReplacement = replacementNumber.toPrecision(nonZeroPrecision).replace(REGEXP_TRAILING_ZEROS, '');
  if (conversion.typeSpecifier === Const.TYPE_FLOAT_SHORT_UPPERCASE) {
    formattedReplacement = formattedReplacement.toUpperCase();
  }
  return formattedReplacement;
}

/**
 * Formats an integer type according to specifiers.
 *
 * @ignore
 * @param  {string} replacement The string to be formatted.
 * @param  {ConversionSpecification} conversion The conversion specification object.
 * @return {string} Returns the formatted string.
 */

var formatIntegerBase = function (replacement, conversion) {
  var integer = parseInt(replacement);
  if (isNaN(integer)) {
    integer = 0;
  }
  integer = integer >>> 0;
  switch (conversion.typeSpecifier) {
    case Const.TYPE_INTEGER_ASCII_CHARACTER:
      integer = String.fromCharCode(integer);
      break;
    case Const.TYPE_INTEGER_BINARY:
      integer = integer.toString(Const.RADIX_BINARY);
      break;
    case Const.TYPE_INTEGER_OCTAL:
      integer = integer.toString(Const.RADIX_OCTAL);
      break;
    case Const.TYPE_INTEGER_HEXADECIMAL:
      integer = integer.toString(Const.RADIX_HEXADECIMAL);
      break;
    case Const.TYPE_INTEGER_HEXADECIMAL_UPPERCASE:
      integer = integer.toString(Const.RADIX_HEXADECIMAL).toUpperCase();
      break;
  }
  return coerceToString(integer);
};

/**
 * Formats a decimal integer type according to specifiers.
 *
 * @ignore
 * @param  {string} replacement The string to be formatted.
 * @param  {ConversionSpecification} conversion The conversion specification object.
 * @return {string} Returns the formatted string.
 */

var formatIntegerDecimal = function (replacement, conversion) {
  var integer = parseInt(replacement);
  if (isNaN(integer)) {
    integer = 0;
  }
  return addSignToFormattedNumber(integer, toString(integer), conversion);
};

/**
 * Formats a string type according to specifiers.
 *
 * @ignore
 * @param {string} replacement The string to be formatted.
 * @param {ConversionSpecification} conversion The conversion specification object.
 * @return {string} Returns the formatted string.
 */
var formatString = function (replacement, conversion) {
  var formattedReplacement = replacement;
  var precision = conversion.precision;
  if (!isNil(precision) && formattedReplacement.length > precision) {
    formattedReplacement = truncate(formattedReplacement, precision, '');
  }
  return formattedReplacement;
};

/**
 * Returns the computed string based on format specifiers.
 *
 * @ignore
 * @name computeReplacement
 * @param {string} replacement The replacement value.
 * @param {ConversionSpecification} conversion The conversion specification object.
 * @return {string} Returns the computed string.
 */
var computeReplacement = function (replacement, conversion) {
  var formatFunction = void 0;
  switch (conversion.typeSpecifier) {
    case Const.TYPE_STRING:
      formatFunction = formatString;
      break;
    case Const.TYPE_INTEGER_DECIMAL:
    case Const.TYPE_INTEGER:
      formatFunction = formatIntegerDecimal;
      break;
    case Const.TYPE_INTEGER_ASCII_CHARACTER:
    case Const.TYPE_INTEGER_BINARY:
    case Const.TYPE_INTEGER_OCTAL:
    case Const.TYPE_INTEGER_HEXADECIMAL:
    case Const.TYPE_INTEGER_HEXADECIMAL_UPPERCASE:
    case Const.TYPE_INTEGER_UNSIGNED_DECIMAL:
      formatFunction = formatIntegerBase;
      break;
    case Const.TYPE_FLOAT:
    case Const.TYPE_FLOAT_SCIENTIFIC:
    case Const.TYPE_FLOAT_SCIENTIFIC_UPPERCASE:
    case Const.TYPE_FLOAT_SHORT:
    case Const.TYPE_FLOAT_SHORT_UPPERCASE:
      formatFunction = formatFloat;
      break;
  }
  var formattedString = formatFunction(replacement, conversion);
  return alignAndPad(formattedString, conversion);
};

/**
 * Construct the new conversion specification object.
 *
 * @ignore
 * @param {Object} properties An object with properties to initialize.
 * @return {ConversionSpecification} ConversionSpecification instance.
 */
function ConversionSpecification(properties) {

  /**
   * The percent characters from conversion specification.
   *
   * @ignore
   * @name ConversionSpecification#percent
   * @type {string}
   */
  this.percent = properties.percent;

  /**
   *  The sign specifier to force a sign to be used on a number.
   *
   * @ignore
   * @name ConversionSpecification#signSpecifier
   * @type {string}
   */
  this.signSpecifier = properties.signSpecifier;

  /**
   * The padding specifier that says what padding character will be used.
   *
   * @ignore
   * @name ConversionSpecification#paddingSpecifier
   * @type {string}
   */
  this.paddingSpecifier = properties.paddingSpecifier;

  /**
   * The alignment specifier that says if the result should be left-justified or right-justified.
   *
   * @ignore
   * @name ConversionSpecification#alignmentSpecifier
   * @type {string}
   */
  this.alignmentSpecifier = properties.alignmentSpecifier;

  /**
   * The width specifier how many characters this conversion should result in.
   *
   * @ignore
   * @name ConversionSpecification#width
   * @type {number}
   */
  this.width = properties.width;

  /**
   * The precision specifier says how many decimal digits should be displayed for floating-point numbers.
   *
   * @ignore
   * @name ConversionSpecification#precision
   * @type {number}
   */
  this.precision = properties.precision;

  /**
   * The type specifier says what type the argument data should be treated as.
   *
   * @ignore
   * @name ConversionSpecification#typeSpecifier
   * @type {string}
   */
  this.typeSpecifier = properties.typeSpecifier;
}

/**
 * Check if the conversion specification is a percent literal "%%".
 *
 * @ignore
 * @return {boolean} Returns true if the conversion is a percent literal, false otherwise.
 */
ConversionSpecification.prototype.isPercentLiteral = function () {
  return Const.LITERAL_PERCENT_SPECIFIER === this.percent;
};

/**
 * Get the padding character from padding specifier.
 *
 * @ignore
 * @returns {string} Returns the padding character.
 */
ConversionSpecification.prototype.getPaddingCharacter = function () {
  var paddingCharacter = nilDefault(this.paddingSpecifier, ' ');
  if (paddingCharacter.length === 2 && paddingCharacter[0] === Const.LITERAL_SINGLE_QUOTE) {
    paddingCharacter = paddingCharacter[1];
  }
  return paddingCharacter;
};

/**
 * Validates the specifier type and replacement position.
 *
 * @ignore
 * @throws {Error} Throws an exception on insufficient arguments or unknown specifier.
 * @param  {number} index The index of the matched specifier.
 * @param  {number} replacementsLength The number of replacements.
 * @param  {ConversionSpecification} conversion The conversion specification object.
 * @return {undefined}
 */
var validateReplacement = function (index, replacementsLength, conversion) {
  if (isNil(conversion.typeSpecifier)) {
    throw new Error('sprintf(): Unknown type specifier');
  }
  if (index > replacementsLength - 1) {
    throw new Error('sprintf(): Too few arguments');
  }
  if (index < 0) {
    throw new Error('sprintf(): Argument number must be greater than zero');
  }
};

/**
 * Return the replacement for regular expression match of the conversion specification.
 *
 * @ignore
 * @name matchReplacement
 * @param {ReplacementIndex} replacementIndex The replacement index object.
 * @param {string[]} replacements The array of replacements.
 * @param {string} conversionSpecification The conversion specification.
 * @param {string} percent The percent characters from conversion specification.
 * @param {string} position The position to insert the replacement.
 * @param {string} signSpecifier The sign specifier to force a sign to be used on a number.
 * @param {string} paddingSpecifier The padding specifier that says what padding character will be used.
 * @param {string} alignmentSpecifier The alignment specifier that says if the result should be left-justified or right-justified.
 * @param {string} widthSpecifier The width specifier how many characters this conversion should result in.
 * @param {string} precisionSpecifier The precision specifier says how many decimal digits should be displayed for floating-point numbers.
 * @param {string} typeSpecifier The type specifier says what type the argument data should be treated as.
 * @return {string} Returns the computed replacement.
 */
var replacementMatch = function (replacementIndex, replacements, conversionSpecification, percent, position, signSpecifier, paddingSpecifier, alignmentSpecifier, widthSpecifier, precisionSpecifier, typeSpecifier) {
  var conversion = new ConversionSpecification({
    percent: percent,
    signSpecifier: signSpecifier,
    paddingSpecifier: paddingSpecifier,
    alignmentSpecifier: alignmentSpecifier,
    width: coerceToNumber(widthSpecifier, null),
    precision: coerceToNumber(precisionSpecifier, null),
    typeSpecifier: typeSpecifier
  });
  if (conversion.isPercentLiteral()) {
    return conversionSpecification.slice(1);
  }
  var actualReplacementIndex = replacementIndex.getIndexByPosition(position);
  replacementIndex.incrementOnEmptyPosition(position);
  validateReplacement(actualReplacementIndex, replacements.length, conversion);
  return computeReplacement(replacements[actualReplacementIndex], conversion);
};

/**
 * Produces a string according to `format`.
 *
 * <div id="sprintf-format" class="smaller">
 * `format` string is composed of zero or more directives: ordinary characters (not <code>%</code>), which are  copied  unchanged
 * to  the  output string and <i>conversion specifications</i>, each of which results in fetching zero or more subsequent
 * arguments. <br/> <br/>
 *
 * Each <b>conversion specification</b> is introduced by the character <code>%</code>, and ends with a <b>conversion
 * specifier</b>. In between there may be (in this order) zero or more <b>flags</b>, an optional <b>minimum field width</b>
 * and an optional <b>precision</b>.<br/>
 * The syntax is: <b>ConversionSpecification</b> = <b>"%"</b> { <b>Flags</b> }
 * [ <b>MinimumFieldWidth</b> ] [ <b>Precision</b> ] <b>ConversionSpecifier</b>, where curly braces { } denote repetition
 * and square brackets [ ] optionality. <br/><br/>
 *
 * By default, the arguments are used in the given order.<br/>
 * For argument numbering and swapping, `%m$` (where `m` is a number indicating the argument order)
 * is used instead of `%` to specify explicitly which argument is taken. For instance `%1$s` fetches the 1st argument,
 * `%2$s` the 2nd and so on, no matter what position  the conversion specification has in `format`.
 * <br/><br/>
 *
 * <b>The flags</b><br/>
 * The character <code>%</code> is followed by zero or more of the following flags:<br/>
 * <table class="light-params">
 *   <tr>
 *     <td><code>+</code></td>
 *     <td>
 *       A  sign (<code>+</code> or <code>-</code>) should always be placed before a number produced by a
 *       signed conversion. By default a sign is used only for negative numbers.
 *     </td>
 *   </tr>
 *   <tr>
 *     <td><code>0</code></td>
 *     <td>The value should be zero padded.</td>
 *   </tr>
 *   <tr>
 *     <td><code>&blank;</code></td>
 *     <td>(a space) The value should be space padded.</td>
 *   </tr>
 *   <tr>
 *    <td><code>'</code></td>
 *    <td>Indicates alternate padding character, specified by prefixing it with a single quote <code>'</code>.</td>
 *   </tr>
 *   <tr>
 *     <td><code>-</code></td>
 *     <td>The converted value is to be left adjusted on the field boundary (the default is right justification).</td>
 *   </tr>
 * </table>
 *
 * <b>The minimum field width</b><br/>
 * An  optional decimal digit string (with nonzero first digit) specifying a minimum field width.  If the converted
 * value has fewer characters than the field width, it will be padded with spaces on the left (or right, if the
 * left-adjustment flag has been given).<br/><br/>
 *
 * <b>The precision</b><br/>
 * An optional precision, in the form of a period `.` followed by an optional decimal digit string.<br/>
 * This gives the number of digits to appear after the radix character for `e`, `E`, `f` and `F` conversions, the
 * maximum number of significant digits for `g` and `G` conversions or the maximum number of characters to be printed
 * from a string for `s` conversion.<br/><br/>
 *
 * <b>The conversion specifier</b><br/>
 * A specifier that mentions what type the argument should be treated as:
 *
 * <table class="light-params">
 *   <tr>
 *     <td>`s`</td>
 *     <td>The string argument is treated as and presented as a string.</td>
 *   </tr>
 *   <tr>
 *     <td>`d` `i`</td>
 *     <td>The integer argument is converted to signed decimal notation.</td>
 *   </tr>
 *   <tr>
 *     <td>`b`</td>
 *     <td>The unsigned integer argument is converted to unsigned binary.</td>
 *   </tr>
 *   <tr>
 *     <td>`c`</td>
 *     <td>The unsigned integer argument is converted to an ASCII character with that number.</td>
 *   </tr>
 *   <tr>
 *     <td>`o`</td>
 *     <td>The unsigned integer argument is converted to unsigned octal.</td>
 *   </tr>
 *   <tr>
 *     <td>`u`</td>
 *     <td>The unsigned integer argument is converted to unsigned decimal.</td>
 *   </tr>
 *   <tr>
 *     <td>`x` `X`</td>
 *     <td>The unsigned integer argument is converted to unsigned hexadecimal. The letters `abcdef` are used for `x`
 *     conversions; the letters `ABCDEF` are used for `X` conversions.</td>
 *   </tr>
 *   <tr>
 *     <td>`f`</td>
 *     <td>
 *      The float argument is rounded and converted to decimal notation in the style `[-]ddd.ddd`, where the number of
 *      digits after the decimal-point character is equal to the precision specification. If the precision is missing,
 *      it is taken as 6; if the precision is explicitly zero, no decimal-point character appears.
 *      If a decimal point appears, at least one digit appears before it.
 *     </td>
 *   </tr>
 *   <tr>
 *     <td>`e` `E`</td>
 *     <td>
 *       The float argument is rounded and converted in the style `[-]d.ddde±dd`, where there is one digit
 *       before the decimal-point character and the number of digits after it is equal to the precision. If
 *       the precision is missing, it is taken as `6`; if the precision is zero, no decimal-point character
 *       appears. An `E` conversion uses the letter `E` (rather than `e`) to introduce the exponent.
 *     </td>
 *   </tr>
 *   <tr>
 *     <td>`g` `G`</td>
 *     <td>
 *       The float argument is converted in style `f` or `e` (or `F` or `E` for `G` conversions). The precision specifies
 *       the number of significant digits. If the precision is missing, `6` digits are given; if the
 *       precision is zero, it is treated as `1`. Style `e` is used if the exponent from its conversion is less
 *       than `-6` or greater than or equal to the precision. Trailing zeros are removed from the fractional
 *       part of the result; a decimal point appears only if it is followed by at least one digit.
 *     </td>
 *   </tr>
 *   <tr>
 *     <td>`%`</td>
 *     <td>A literal `%` is written. No argument is converted. The complete conversion specification is `%%`.</td>
 *   </tr>
 *
 * </table>
 * </div>
 *
 * @function sprintf
 * @static
 * @since 1.0.0
 * @memberOf Format
 * @param  {string} [format=''] The format string.
 * @param  {...*}               replacements The replacements to produce the string.
 * @return {string}             Returns the produced string.
 * @example
 * v.sprintf('%s, %s!', 'Hello', 'World');
 * // => 'Hello World!'
 *
 * v.sprintf('%s costs $%d', 'coffee', 2);
 * // => 'coffee costs $2'
 *
 * v.sprintf('%1$s %2$s %1$s %2$s, watcha gonna %3$s', 'bad', 'boys', 'do')
 * // => 'bad boys bad boys, watcha gonna do'
 *
 * v.sprintf('% 6s', 'bird');
 * // => '  bird'
 *
 * v.sprintf('% -6s', 'crab');
 * // => 'crab  '
 *
 * v.sprintf("%'*5s", 'cat');
 * // => '**cat'
 *
 * v.sprintf("%'*-6s", 'duck');
 * // => 'duck**'
 *
 * v.sprintf('%d %i %+d', 15, -2, 25);
 * // => '15 -2 +25'
 *
 * v.sprintf("%06d", 15);
 * // => '000015'
 *
 * v.sprintf('0b%b 0o%o 0x%X', 12, 9, 155);
 * // => '0b1100 0o11 0x9B'
 *
 * v.sprintf('%.2f', 10.469);
 * // => '10.47'
 *
 * v.sprintf('%.2e %g', 100.5, 0.455);
 * // => '1.01e+2 0.455'
 * 
 */
function sprintf(format) {
  var formatString = coerceToString(format);
  if (formatString === '') {
    return formatString;
  }

  for (var _len = arguments.length, replacements = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    replacements[_key - 1] = arguments[_key];
  }

  var boundReplacementMatch = replacementMatch.bind(undefined, new ReplacementIndex(), replacements);
  return formatString.replace(REGEXP_CONVERSION_SPECIFICATION, boundReplacementMatch);
}

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Produces a string according to `format`. Works exactly like <a href="#sprintf"><code>sprintf()</code></a>,
 * with the only difference that accepts the formatting arguments in an array `values`.<br/>
 * See <a href="#sprintf-format">here</a> `format` string specifications.
 *
 * @function vprintf
 * @static
 * @since 1.0.0
 * @memberOf Format
 * @param  {string}                [format='']  The format string.
 * @param  {Array.<number|string>} replacements The array of replacements to produce the string.
 * @return {string}                             Returns the produced string.
 * @example
 * v.vprintf('%s', ['Welcome'])
 * // => 'Welcome'
 *
 * v.vprintf('%s has %d apples', ['Alexandra', 3]);
 * // => 'Alexandra has 3 apples'
 */
function vprintf(format, replacements) {
  return sprintf.apply(undefined, [format].concat(_toConsumableArray(nilDefault(replacements, []))));
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
 * @param  {string} character The character to be escape.
 * @return {string}           The escaped version of character.
 */
function replaceSpecialCharacter(character) {
  return escapeCharactersMap[character];
}

/**
 * Escapes HTML special characters  <code>< > & ' " `</code> in <code>subject</code>.
 *
 * @function escapeHtml
 * @static
 * @since 1.0.0         
 * @memberOf Escape
 * @param {string} [subject=''] The string to escape.
 * @return {string} Returns the escaped string.
 * @example
 * v.escapeHtml('<p>wonderful world</p>');
 * // => '&lt;p&gt;wonderful world&lt;/p&gt;'
 */
function escapeHtml(subject) {
  return coerceToString(subject).replace(REGEXP_HTML_SPECIAL_CHARACTERS, replaceSpecialCharacter);
}

/**
 * Escapes the regular expression special characters `- [ ] / { } ( ) * + ? . \ ^ $ |` in `subject`.
 *
 * @function escapeRegExp
 * @static
 * @since 1.0.0
 * @memberOf Escape
 * @param {string} [subject=''] The string to escape.
 * @return {string} Returns the escaped string.
 * @example
 * v.escapeRegExp('(hours)[minutes]{seconds}');
 * // => '\(hours\)\[minutes\]\{seconds\}'
 */
function escapeRegExp(subject) {
  return coerceToString(subject).replace(REGEXP_SPECIAL_CHARACTERS, '\\$&');
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
 * @param  {string} string The accumulator string.
 * @param  {string} key    The character.
 * @return {string}        The string with replaced HTML entity
 */
function reduceUnescapedString(string, key) {
  return string.replace(unescapeCharactersMap[key], key);
}

/**
 * Unescapes HTML special characters from <code>&amp;lt; &amp;gt; &amp;amp; &amp;quot; &amp;#x27; &amp;#x60;</code>
 * to corresponding <code>< > & ' " `</code> in <code>subject</code>.
 *
 * @function unescapeHtml
 * @static
 * @since 1.0.0
 * @memberOf Escape
 * @param  {string} [subject=''] The string to unescape.
 * @return {string}              Returns the unescaped string.
 * @example
 * v.unescapeHtml('&lt;p&gt;wonderful world&lt;/p&gt;');
 * // => '<p>wonderful world</p>'
 */
function unescapeHtml(subject) {
  var subjectString = coerceToString(subject);
  return characters.reduce(reduceUnescapedString, subjectString);
}

/**
 * Returns the first occurrence index of `search` in `subject`.
 *
 * @function indexOf
 * @static
 * @since 1.0.0
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
function indexOf(subject, search, fromIndex) {
  var subjectString = coerceToString(subject);
  return subjectString.indexOf(search, fromIndex);
}

/**
 * Returns the last occurrence index of `search` in `subject`.
 *
 * @function lastIndexOf
 * @static
 * @since 1.0.0
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
function lastIndexOf(subject, search, fromIndex) {
  var subjectString = coerceToString(subject);
  return subjectString.lastIndexOf(search, fromIndex);
}

/**
 * Returns the first index of a `pattern` match in `subject`.
 *
 * @function search
 * @static
 * @since 1.0.0
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
function search(subject, pattern, fromIndex) {
  var subjectString = coerceToString(subject);
  var fromIndexNumber = isNil(fromIndex) ? 0 : clipNumber(toInteger(fromIndex), 0, subjectString.length);
  var matchIndex = subjectString.substr(fromIndexNumber).search(pattern);
  if (matchIndex !== -1 && !isNaN(fromIndexNumber)) {
    matchIndex += fromIndexNumber;
  }
  return matchIndex;
}

/**
 * Inserts into `subject` a string `toInsert` at specified `position`.
 *
 * @function insert
 * @static
 * @since 1.0.0
 * @memberOf Manipulate
 * @param {string} [subject=''] The string where to insert.
 * @param {string} [toInsert=''] The string to be inserted.
 * @param {number} [position=0] The position to insert.
 * @return {string} Returns the string after insertion.
 * @example
 * v.insert('ct', 'a', 1);
 * // => 'cat'
 *
 * v.insert('sunny', ' day', 5);
 * // => 'sunny day'
 */
function insert(subject, toInsert, position) {
  var subjectString = coerceToString(subject);
  var toInsertString = coerceToString(toInsert);
  var positionNumber = coerceToNumber(position);
  if (positionNumber < 0 || positionNumber > subjectString.length || toInsertString === '') {
    return subjectString;
  }
  return subjectString.slice(0, positionNumber) + toInsertString + subjectString.slice(positionNumber);
}

/**
 * Generated diacritics map. See bellow the base code.
 * @ignore
 * @see http://stackoverflow.com/a/18391901/1894471
 * @type Object
 */

var diacriticMap = {
  "\u0041": "A",
  "\u0042": "B",
  "\u0043": "C",
  "\u0044": "D",
  "\u0045": "E",
  "\u0046": "F",
  "\u0047": "G",
  "\u0048": "H",
  "\u0049": "I",
  "\u004a": "J",
  "\u004b": "K",
  "\u004c": "L",
  "\u004d": "M",
  "\u004e": "N",
  "\u004f": "O",
  "\u0050": "P",
  "\u0051": "Q",
  "\u0052": "R",
  "\u0053": "S",
  "\u0054": "T",
  "\u0055": "U",
  "\u0056": "V",
  "\u0057": "W",
  "\u0058": "X",
  "\u0059": "Y",
  "\u005a": "Z",
  "\u0061": "a",
  "\u0062": "b",
  "\u0063": "c",
  "\u0064": "d",
  "\u0065": "e",
  "\u0066": "f",
  "\u0067": "g",
  "\u0068": "h",
  "\u0069": "i",
  "\u006a": "j",
  "\u006b": "k",
  "\u006c": "l",
  "\u006d": "m",
  "\u006e": "n",
  "\u006f": "o",
  "\u0070": "p",
  "\u0071": "q",
  "\u0072": "r",
  "\u0073": "s",
  "\u0074": "t",
  "\u0075": "u",
  "\u0076": "v",
  "\u0077": "w",
  "\u0078": "x",
  "\u0079": "y",
  "\u007a": "z",
  "\u008c": "OE",
  "\u009c": "oe",
  "\u00c0": "A",
  "\u00c1": "A",
  "\u00c2": "A",
  "\u00c3": "A",
  "\u00c4": "A",
  "\u00c5": "A",
  "\u00c6": "AE",
  "\u00c7": "C",
  "\u00c8": "E",
  "\u00c9": "E",
  "\u00ca": "E",
  "\u00cb": "E",
  "\u00cc": "I",
  "\u00cd": "I",
  "\u00ce": "I",
  "\u00cf": "I",
  "\u00d1": "N",
  "\u00d2": "O",
  "\u00d3": "O",
  "\u00d4": "O",
  "\u00d5": "O",
  "\u00d6": "O",
  "\u00d8": "O",
  "\u00d9": "U",
  "\u00da": "U",
  "\u00db": "U",
  "\u00dc": "U",
  "\u00dd": "Y",
  "\u00df": "s",
  "\u00e0": "a",
  "\u00e1": "a",
  "\u00e2": "a",
  "\u00e3": "a",
  "\u00e4": "a",
  "\u00e5": "a",
  "\u00e6": "ae",
  "\u00e7": "c",
  "\u00e8": "e",
  "\u00e9": "e",
  "\u00ea": "e",
  "\u00eb": "e",
  "\u00ec": "i",
  "\u00ed": "i",
  "\u00ee": "i",
  "\u00ef": "i",
  "\u00f1": "n",
  "\u00f2": "o",
  "\u00f3": "o",
  "\u00f4": "o",
  "\u00f5": "o",
  "\u00f6": "o",
  "\u00f8": "o",
  "\u00f9": "u",
  "\u00fa": "u",
  "\u00fb": "u",
  "\u00fc": "u",
  "\u00fd": "y",
  "\u00ff": "y",
  "\u0100": "A",
  "\u0101": "a",
  "\u0102": "A",
  "\u0103": "a",
  "\u0104": "A",
  "\u0105": "a",
  "\u0106": "C",
  "\u0107": "c",
  "\u0108": "C",
  "\u0109": "c",
  "\u010a": "C",
  "\u010b": "c",
  "\u010c": "C",
  "\u010d": "c",
  "\u010e": "D",
  "\u010f": "d",
  "\u0110": "D",
  "\u0111": "d",
  "\u0112": "E",
  "\u0113": "e",
  "\u0114": "E",
  "\u0115": "e",
  "\u0116": "E",
  "\u0117": "e",
  "\u0118": "E",
  "\u0119": "e",
  "\u011a": "E",
  "\u011b": "e",
  "\u011c": "G",
  "\u011d": "g",
  "\u011e": "G",
  "\u011f": "g",
  "\u0120": "G",
  "\u0121": "g",
  "\u0122": "G",
  "\u0123": "g",
  "\u0124": "H",
  "\u0125": "h",
  "\u0126": "H",
  "\u0127": "h",
  "\u0128": "I",
  "\u0129": "i",
  "\u012a": "I",
  "\u012b": "i",
  "\u012c": "I",
  "\u012d": "i",
  "\u012e": "I",
  "\u012f": "i",
  "\u0130": "I",
  "\u0131": "i",
  "\u0134": "J",
  "\u0135": "j",
  "\u0136": "K",
  "\u0137": "k",
  "\u0139": "L",
  "\u013a": "l",
  "\u013b": "L",
  "\u013c": "l",
  "\u013d": "L",
  "\u013e": "l",
  "\u013f": "L",
  "\u0140": "l",
  "\u0141": "L",
  "\u0142": "l",
  "\u0143": "N",
  "\u0144": "n",
  "\u0145": "N",
  "\u0146": "n",
  "\u0147": "N",
  "\u0148": "n",
  "\u0149": "n",
  "\u014c": "O",
  "\u014d": "o",
  "\u014e": "O",
  "\u014f": "o",
  "\u0150": "O",
  "\u0151": "o",
  "\u0152": "OE",
  "\u0153": "oe",
  "\u0154": "R",
  "\u0155": "r",
  "\u0156": "R",
  "\u0157": "r",
  "\u0158": "R",
  "\u0159": "r",
  "\u015a": "S",
  "\u015b": "s",
  "\u015c": "S",
  "\u015d": "s",
  "\u015e": "S",
  "\u015f": "s",
  "\u0160": "S",
  "\u0161": "s",
  "\u0162": "T",
  "\u0163": "t",
  "\u0164": "T",
  "\u0165": "t",
  "\u0166": "T",
  "\u0167": "t",
  "\u0168": "U",
  "\u0169": "u",
  "\u016a": "U",
  "\u016b": "u",
  "\u016c": "U",
  "\u016d": "u",
  "\u016e": "U",
  "\u016f": "u",
  "\u0170": "U",
  "\u0171": "u",
  "\u0172": "U",
  "\u0173": "u",
  "\u0174": "W",
  "\u0175": "w",
  "\u0176": "Y",
  "\u0177": "y",
  "\u0178": "Y",
  "\u0179": "Z",
  "\u017a": "z",
  "\u017b": "Z",
  "\u017c": "z",
  "\u017d": "Z",
  "\u017e": "z",
  "\u017f": "l",
  "\u0180": "b",
  "\u0181": "B",
  "\u0182": "B",
  "\u0183": "b",
  "\u0186": "O",
  "\u0187": "C",
  "\u0188": "c",
  "\u0189": "D",
  "\u018a": "D",
  "\u018b": "D",
  "\u018c": "d",
  "\u018e": "E",
  "\u0190": "E",
  "\u0191": "F",
  "\u0192": "f",
  "\u0193": "G",
  "\u0195": "hv",
  "\u0197": "I",
  "\u0198": "K",
  "\u0199": "k",
  "\u019a": "l",
  "\u019c": "M",
  "\u019d": "N",
  "\u019e": "n",
  "\u019f": "O",
  "\u01a0": "O",
  "\u01a1": "o",
  "\u01a2": "OI",
  "\u01a3": "oi",
  "\u01a4": "P",
  "\u01a5": "p",
  "\u01ac": "T",
  "\u01ad": "t",
  "\u01ae": "T",
  "\u01af": "U",
  "\u01b0": "u",
  "\u01b2": "V",
  "\u01b3": "Y",
  "\u01b4": "y",
  "\u01b5": "Z",
  "\u01b6": "z",
  "\u01c4": "DZ",
  "\u01c5": "Dz",
  "\u01c6": "dz",
  "\u01c7": "LJ",
  "\u01c8": "Lj",
  "\u01c9": "lj",
  "\u01ca": "NJ",
  "\u01cb": "Nj",
  "\u01cc": "nj",
  "\u01cd": "A",
  "\u01ce": "a",
  "\u01cf": "I",
  "\u01d0": "i",
  "\u01d1": "O",
  "\u01d2": "o",
  "\u01d3": "U",
  "\u01d4": "u",
  "\u01d5": "U",
  "\u01d6": "u",
  "\u01d7": "U",
  "\u01d8": "u",
  "\u01d9": "U",
  "\u01da": "u",
  "\u01db": "U",
  "\u01dc": "u",
  "\u01dd": "e",
  "\u01de": "A",
  "\u01df": "a",
  "\u01e0": "A",
  "\u01e1": "a",
  "\u01e2": "AE",
  "\u01e3": "ae",
  "\u01e4": "G",
  "\u01e5": "g",
  "\u01e6": "G",
  "\u01e7": "g",
  "\u01e8": "K",
  "\u01e9": "k",
  "\u01ea": "O",
  "\u01eb": "o",
  "\u01ec": "O",
  "\u01ed": "o",
  "\u01f0": "j",
  "\u01f1": "DZ",
  "\u01f2": "Dz",
  "\u01f3": "dz",
  "\u01f4": "G",
  "\u01f5": "g",
  "\u01f8": "N",
  "\u01f9": "n",
  "\u01fa": "A",
  "\u01fb": "a",
  "\u01fc": "AE",
  "\u01fd": "ae",
  "\u01fe": "O",
  "\u01ff": "o",
  "\u0200": "A",
  "\u0201": "a",
  "\u0202": "A",
  "\u0203": "a",
  "\u0204": "E",
  "\u0205": "e",
  "\u0206": "E",
  "\u0207": "e",
  "\u0208": "I",
  "\u0209": "i",
  "\u020a": "I",
  "\u020b": "i",
  "\u020c": "O",
  "\u020d": "o",
  "\u020e": "O",
  "\u020f": "o",
  "\u0210": "R",
  "\u0211": "r",
  "\u0212": "R",
  "\u0213": "r",
  "\u0214": "U",
  "\u0215": "u",
  "\u0216": "U",
  "\u0217": "u",
  "\u0218": "S",
  "\u0219": "s",
  "\u021a": "T",
  "\u021b": "t",
  "\u021e": "H",
  "\u021f": "h",
  "\u0220": "N",
  "\u0222": "OU",
  "\u0223": "ou",
  "\u0224": "Z",
  "\u0225": "z",
  "\u0226": "A",
  "\u0227": "a",
  "\u0228": "E",
  "\u0229": "e",
  "\u022a": "O",
  "\u022b": "o",
  "\u022c": "O",
  "\u022d": "o",
  "\u022e": "O",
  "\u022f": "o",
  "\u0230": "O",
  "\u0231": "o",
  "\u0232": "Y",
  "\u0233": "y",
  "\u023a": "A",
  "\u023b": "C",
  "\u023c": "c",
  "\u023d": "L",
  "\u023e": "T",
  "\u023f": "s",
  "\u0240": "z",
  "\u0243": "B",
  "\u0244": "U",
  "\u0245": "V",
  "\u0247": "e",
  "\u0248": "J",
  "\u0249": "j",
  "\u024a": "Q",
  "\u024b": "q",
  "\u024c": "R",
  "\u024d": "r",
  "\u024e": "Y",
  "\u024f": "y",
  "\u0250": "a",
  "\u0253": "b",
  "\u0254": "o",
  "\u0256": "d",
  "\u0257": "d",
  "\u025b": "e",
  "\u0260": "g",
  "\u0265": "h",
  "\u0268": "i",
  "\u026b": "l",
  "\u026f": "m",
  "\u0271": "m",
  "\u0272": "n",
  "\u0275": "o",
  "\u027d": "r",
  "\u0288": "t",
  "\u0289": "u",
  "\u028b": "v",
  "\u028c": "v",
  "\u1d79": "g",
  "\u1d7d": "p",
  "\u1e00": "A",
  "\u1e01": "a",
  "\u1e02": "B",
  "\u1e03": "b",
  "\u1e04": "B",
  "\u1e05": "b",
  "\u1e06": "B",
  "\u1e07": "b",
  "\u1e08": "C",
  "\u1e09": "c",
  "\u1e0a": "D",
  "\u1e0b": "d",
  "\u1e0c": "D",
  "\u1e0d": "d",
  "\u1e0e": "D",
  "\u1e0f": "d",
  "\u1e10": "D",
  "\u1e11": "d",
  "\u1e12": "D",
  "\u1e13": "d",
  "\u1e14": "E",
  "\u1e15": "e",
  "\u1e16": "E",
  "\u1e17": "e",
  "\u1e18": "E",
  "\u1e19": "e",
  "\u1e1a": "E",
  "\u1e1b": "e",
  "\u1e1c": "E",
  "\u1e1d": "e",
  "\u1e1e": "F",
  "\u1e1f": "f",
  "\u1e20": "G",
  "\u1e21": "g",
  "\u1e22": "H",
  "\u1e23": "h",
  "\u1e24": "H",
  "\u1e25": "h",
  "\u1e26": "H",
  "\u1e27": "h",
  "\u1e28": "H",
  "\u1e29": "h",
  "\u1e2a": "H",
  "\u1e2b": "h",
  "\u1e2c": "I",
  "\u1e2d": "i",
  "\u1e2e": "I",
  "\u1e2f": "i",
  "\u1e30": "K",
  "\u1e31": "k",
  "\u1e32": "K",
  "\u1e33": "k",
  "\u1e34": "K",
  "\u1e35": "k",
  "\u1e36": "L",
  "\u1e37": "l",
  "\u1e38": "L",
  "\u1e39": "l",
  "\u1e3a": "L",
  "\u1e3b": "l",
  "\u1e3c": "L",
  "\u1e3d": "l",
  "\u1e3e": "M",
  "\u1e3f": "m",
  "\u1e40": "M",
  "\u1e41": "m",
  "\u1e42": "M",
  "\u1e43": "m",
  "\u1e44": "N",
  "\u1e45": "n",
  "\u1e46": "N",
  "\u1e47": "n",
  "\u1e48": "N",
  "\u1e49": "n",
  "\u1e4a": "N",
  "\u1e4b": "n",
  "\u1e4c": "O",
  "\u1e4d": "o",
  "\u1e4e": "O",
  "\u1e4f": "o",
  "\u1e50": "O",
  "\u1e51": "o",
  "\u1e52": "O",
  "\u1e53": "o",
  "\u1e54": "P",
  "\u1e55": "p",
  "\u1e56": "P",
  "\u1e57": "p",
  "\u1e58": "R",
  "\u1e59": "r",
  "\u1e5a": "R",
  "\u1e5b": "r",
  "\u1e5c": "R",
  "\u1e5d": "r",
  "\u1e5e": "R",
  "\u1e5f": "r",
  "\u1e60": "S",
  "\u1e61": "s",
  "\u1e62": "S",
  "\u1e63": "s",
  "\u1e64": "S",
  "\u1e65": "s",
  "\u1e66": "S",
  "\u1e67": "s",
  "\u1e68": "S",
  "\u1e69": "s",
  "\u1e6a": "T",
  "\u1e6b": "t",
  "\u1e6c": "T",
  "\u1e6d": "t",
  "\u1e6e": "T",
  "\u1e6f": "t",
  "\u1e70": "T",
  "\u1e71": "t",
  "\u1e72": "U",
  "\u1e73": "u",
  "\u1e74": "U",
  "\u1e75": "u",
  "\u1e76": "U",
  "\u1e77": "u",
  "\u1e78": "U",
  "\u1e79": "u",
  "\u1e7a": "U",
  "\u1e7b": "u",
  "\u1e7c": "V",
  "\u1e7d": "v",
  "\u1e7e": "V",
  "\u1e7f": "v",
  "\u1e80": "W",
  "\u1e81": "w",
  "\u1e82": "W",
  "\u1e83": "w",
  "\u1e84": "W",
  "\u1e85": "w",
  "\u1e86": "W",
  "\u1e87": "w",
  "\u1e88": "W",
  "\u1e89": "w",
  "\u1e8a": "X",
  "\u1e8b": "x",
  "\u1e8c": "X",
  "\u1e8d": "x",
  "\u1e8e": "Y",
  "\u1e8f": "y",
  "\u1e90": "Z",
  "\u1e91": "z",
  "\u1e92": "Z",
  "\u1e93": "z",
  "\u1e94": "Z",
  "\u1e95": "z",
  "\u1e96": "h",
  "\u1e97": "t",
  "\u1e98": "w",
  "\u1e99": "y",
  "\u1e9a": "a",
  "\u1e9b": "s",
  "\u1e9e": "S",
  "\u1ea0": "A",
  "\u1ea1": "a",
  "\u1ea2": "A",
  "\u1ea3": "a",
  "\u1ea4": "A",
  "\u1ea5": "a",
  "\u1ea6": "A",
  "\u1ea7": "a",
  "\u1ea8": "A",
  "\u1ea9": "a",
  "\u1eaa": "A",
  "\u1eab": "a",
  "\u1eac": "A",
  "\u1ead": "a",
  "\u1eae": "A",
  "\u1eaf": "a",
  "\u1eb0": "A",
  "\u1eb1": "a",
  "\u1eb2": "A",
  "\u1eb3": "a",
  "\u1eb4": "A",
  "\u1eb5": "a",
  "\u1eb6": "A",
  "\u1eb7": "a",
  "\u1eb8": "E",
  "\u1eb9": "e",
  "\u1eba": "E",
  "\u1ebb": "e",
  "\u1ebc": "E",
  "\u1ebd": "e",
  "\u1ebe": "E",
  "\u1ebf": "e",
  "\u1ec0": "E",
  "\u1ec1": "e",
  "\u1ec2": "E",
  "\u1ec3": "e",
  "\u1ec4": "E",
  "\u1ec5": "e",
  "\u1ec6": "E",
  "\u1ec7": "e",
  "\u1ec8": "I",
  "\u1ec9": "i",
  "\u1eca": "I",
  "\u1ecb": "i",
  "\u1ecc": "O",
  "\u1ecd": "o",
  "\u1ece": "O",
  "\u1ecf": "o",
  "\u1ed0": "O",
  "\u1ed1": "o",
  "\u1ed2": "O",
  "\u1ed3": "o",
  "\u1ed4": "O",
  "\u1ed5": "o",
  "\u1ed6": "O",
  "\u1ed7": "o",
  "\u1ed8": "O",
  "\u1ed9": "o",
  "\u1eda": "O",
  "\u1edb": "o",
  "\u1edc": "O",
  "\u1edd": "o",
  "\u1ede": "O",
  "\u1edf": "o",
  "\u1ee0": "O",
  "\u1ee1": "o",
  "\u1ee2": "O",
  "\u1ee3": "o",
  "\u1ee4": "U",
  "\u1ee5": "u",
  "\u1ee6": "U",
  "\u1ee7": "u",
  "\u1ee8": "U",
  "\u1ee9": "u",
  "\u1eea": "U",
  "\u1eeb": "u",
  "\u1eec": "U",
  "\u1eed": "u",
  "\u1eee": "U",
  "\u1eef": "u",
  "\u1ef0": "U",
  "\u1ef1": "u",
  "\u1ef2": "Y",
  "\u1ef3": "y",
  "\u1ef4": "Y",
  "\u1ef5": "y",
  "\u1ef6": "Y",
  "\u1ef7": "y",
  "\u1ef8": "Y",
  "\u1ef9": "y",
  "\u1efe": "Y",
  "\u1eff": "y",
  "\u2184": "c",
  "\u24b6": "A",
  "\u24b7": "B",
  "\u24b8": "C",
  "\u24b9": "D",
  "\u24ba": "E",
  "\u24bb": "F",
  "\u24bc": "G",
  "\u24bd": "H",
  "\u24be": "I",
  "\u24bf": "J",
  "\u24c0": "K",
  "\u24c1": "L",
  "\u24c2": "M",
  "\u24c3": "N",
  "\u24c4": "O",
  "\u24c5": "P",
  "\u24c6": "Q",
  "\u24c7": "R",
  "\u24c8": "S",
  "\u24c9": "T",
  "\u24ca": "U",
  "\u24cb": "V",
  "\u24cc": "W",
  "\u24cd": "X",
  "\u24ce": "Y",
  "\u24cf": "Z",
  "\u24d0": "a",
  "\u24d1": "b",
  "\u24d2": "c",
  "\u24d3": "d",
  "\u24d4": "e",
  "\u24d5": "f",
  "\u24d6": "g",
  "\u24d7": "h",
  "\u24d8": "i",
  "\u24d9": "j",
  "\u24da": "k",
  "\u24db": "l",
  "\u24dc": "m",
  "\u24dd": "n",
  "\u24de": "o",
  "\u24df": "p",
  "\u24e0": "q",
  "\u24e1": "r",
  "\u24e2": "s",
  "\u24e3": "t",
  "\u24e4": "u",
  "\u24e5": "v",
  "\u24e6": "w",
  "\u24e7": "x",
  "\u24e8": "y",
  "\u24e9": "z",
  "\u2c60": "L",
  "\u2c61": "l",
  "\u2c62": "L",
  "\u2c63": "P",
  "\u2c64": "R",
  "\u2c65": "a",
  "\u2c66": "t",
  "\u2c67": "H",
  "\u2c68": "h",
  "\u2c69": "K",
  "\u2c6a": "k",
  "\u2c6b": "Z",
  "\u2c6c": "z",
  "\u2c6e": "M",
  "\u2c6f": "A",
  "\u2c72": "W",
  "\u2c73": "w",
  "\u2c75": "H",
  "\u2c76": "h",
  "\u2c7e": "S",
  "\u2c7f": "Z",
  "\ua728": "TZ",
  "\ua729": "tz",
  "\ua732": "AA",
  "\ua733": "aa",
  "\ua734": "AO",
  "\ua735": "ao",
  "\ua736": "AU",
  "\ua737": "au",
  "\ua738": "AV",
  "\ua739": "av",
  "\ua73a": "AV",
  "\ua73b": "av",
  "\ua73c": "AY",
  "\ua73d": "ay",
  "\ua73e": "C",
  "\ua73f": "c",
  "\ua740": "K",
  "\ua741": "k",
  "\ua742": "K",
  "\ua743": "k",
  "\ua744": "K",
  "\ua745": "k",
  "\ua746": "L",
  "\ua747": "l",
  "\ua748": "L",
  "\ua749": "l",
  "\ua74a": "O",
  "\ua74b": "o",
  "\ua74c": "O",
  "\ua74d": "o",
  "\ua74e": "OO",
  "\ua74f": "oo",
  "\ua750": "P",
  "\ua751": "p",
  "\ua752": "P",
  "\ua753": "p",
  "\ua754": "P",
  "\ua755": "p",
  "\ua756": "Q",
  "\ua757": "q",
  "\ua758": "Q",
  "\ua759": "q",
  "\ua75a": "R",
  "\ua75b": "r",
  "\ua75e": "V",
  "\ua75f": "v",
  "\ua760": "VY",
  "\ua761": "vy",
  "\ua762": "Z",
  "\ua763": "z",
  "\ua779": "D",
  "\ua77a": "d",
  "\ua77b": "F",
  "\ua77c": "f",
  "\ua77d": "G",
  "\ua77e": "G",
  "\ua77f": "g",
  "\ua780": "L",
  "\ua781": "l",
  "\ua782": "R",
  "\ua783": "r",
  "\ua784": "S",
  "\ua785": "s",
  "\ua786": "T",
  "\ua787": "t",
  "\ua78d": "H",
  "\ua790": "N",
  "\ua791": "n",
  "\ua7a0": "G",
  "\ua7a1": "g",
  "\ua7a2": "K",
  "\ua7a3": "k",
  "\ua7a4": "N",
  "\ua7a5": "n",
  "\ua7a6": "R",
  "\ua7a7": "r",
  "\ua7a8": "S",
  "\ua7a9": "s",
  "\uff21": "A",
  "\uff22": "B",
  "\uff23": "C",
  "\uff24": "D",
  "\uff25": "E",
  "\uff26": "F",
  "\uff27": "G",
  "\uff28": "H",
  "\uff29": "I",
  "\uff2a": "J",
  "\uff2b": "K",
  "\uff2c": "L",
  "\uff2d": "M",
  "\uff2e": "N",
  "\uff2f": "O",
  "\uff30": "P",
  "\uff31": "Q",
  "\uff32": "R",
  "\uff33": "S",
  "\uff34": "T",
  "\uff35": "U",
  "\uff36": "V",
  "\uff37": "W",
  "\uff38": "X",
  "\uff39": "Y",
  "\uff3a": "Z",
  "\uff41": "a",
  "\uff42": "b",
  "\uff43": "c",
  "\uff44": "d",
  "\uff45": "e",
  "\uff46": "f",
  "\uff47": "g",
  "\uff48": "h",
  "\uff49": "i",
  "\uff4a": "j",
  "\uff4b": "k",
  "\uff4c": "l",
  "\uff4d": "m",
  "\uff4e": "n",
  "\uff4f": "o",
  "\uff50": "p",
  "\uff51": "q",
  "\uff52": "r",
  "\uff53": "s",
  "\uff54": "t",
  "\uff55": "u",
  "\uff56": "v",
  "\uff57": "w",
  "\uff58": "x",
  "\uff59": "y",
  "\uff5a": "z",

  // Additional maps for russian, ukrainian and few other languages
  "\u00d0": "D",
  "\u00de": "TH",
  "\u00f0": "d",
  "\u00fe": "th",
  "\u0386": "A",
  "\u0388": "E",
  "\u0389": "H",
  "\u038a": "I",
  "\u038c": "O",
  "\u038e": "Y",
  "\u038f": "W",
  "\u0390": "i",
  "\u0391": "A",
  "\u0392": "B",
  "\u0393": "G",
  "\u0394": "D",
  "\u0395": "E",
  "\u0396": "Z",
  "\u0397": "H",
  "\u0398": "8",
  "\u0399": "I",
  "\u039a": "K",
  "\u039b": "L",
  "\u039c": "M",
  "\u039d": "N",
  "\u039e": "3",
  "\u039f": "O",
  "\u03a0": "P",
  "\u03a1": "R",
  "\u03a3": "S",
  "\u03a4": "T",
  "\u03a5": "Y",
  "\u03a6": "F",
  "\u03a7": "X",
  "\u03a8": "PS",
  "\u03a9": "W",
  "\u03aa": "I",
  "\u03ab": "Y",
  "\u03ac": "a",
  "\u03ad": "e",
  "\u03ae": "h",
  "\u03af": "i",
  "\u03b0": "y",
  "\u03b1": "a",
  "\u03b2": "b",
  "\u03b3": "g",
  "\u03b4": "d",
  "\u03b5": "e",
  "\u03b6": "z",
  "\u03b7": "h",
  "\u03b8": "8",
  "\u03b9": "i",
  "\u03ba": "k",
  "\u03bb": "l",
  "\u03bc": "m",
  "\u03bd": "n",
  "\u03be": "3",
  "\u03bf": "o",
  "\u03c0": "p",
  "\u03c1": "r",
  "\u03c2": "s",
  "\u03c3": "s",
  "\u03c4": "t",
  "\u03c5": "y",
  "\u03c6": "f",
  "\u03c7": "x",
  "\u03c8": "ps",
  "\u03c9": "w",
  "\u03ca": "i",
  "\u03cb": "y",
  "\u03cc": "o",
  "\u03cd": "y",
  "\u03ce": "w",
  "\u0401": "Yo",
  "\u0404": "Ye",
  "\u0406": "I",
  "\u0407": "Yi",
  "\u0410": "A",
  "\u0411": "B",
  "\u0412": "V",
  "\u0413": "G",
  "\u0414": "D",
  "\u0415": "E",
  "\u0416": "Zh",
  "\u0417": "Z",
  "\u0418": "I",
  "\u0419": "J",
  "\u041a": "K",
  "\u041b": "L",
  "\u041c": "M",
  "\u041d": "N",
  "\u041e": "O",
  "\u041f": "P",
  "\u0420": "R",
  "\u0421": "S",
  "\u0422": "T",
  "\u0423": "U",
  "\u0424": "F",
  "\u0425": "H",
  "\u0426": "C",
  "\u0427": "Ch",
  "\u0428": "Sh",
  "\u0429": "Sh",
  "\u042a": "U",
  "\u042b": "Y",
  "\u042c": "",
  "\u042d": "E",
  "\u042e": "Yu",
  "\u042f": "Ya",
  "\u0430": "a",
  "\u0431": "b",
  "\u0432": "v",
  "\u0433": "g",
  "\u0434": "d",
  "\u0435": "e",
  "\u0436": "zh",
  "\u0437": "z",
  "\u0438": "i",
  "\u0439": "j",
  "\u043a": "k",
  "\u043b": "l",
  "\u043c": "m",
  "\u043d": "n",
  "\u043e": "o",
  "\u043f": "p",
  "\u0440": "r",
  "\u0441": "s",
  "\u0442": "t",
  "\u0443": "u",
  "\u0444": "f",
  "\u0445": "h",
  "\u0446": "c",
  "\u0447": "ch",
  "\u0448": "sh",
  "\u0449": "sh",
  "\u044a": "u",
  "\u044b": "y",
  "\u044c": "",
  "\u044d": "e",
  "\u044e": "yu",
  "\u044f": "ya",
  "\u0451": "yo",
  "\u0454": "ye",
  "\u0456": "i",
  "\u0457": "yi",
  "\u0490": "G",
  "\u0491": "g"
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
 * @since 1.0.0
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to latinise.
 * @return {string} Returns the latinised string.
 * @example
 * v.latinise('cafe\u0301'); // or 'café'
 * // => 'cafe'
 *
 * v.latinise('août décembre');
 * // => 'aout decembre'
 *
 * v.latinise('как прекрасен этот мир');
 * // => 'kak prekrasen etot mir'
 */
function latinise(subject) {
  var subjectString = coerceToString(subject);
  if (subjectString === '') {
    return subjectString;
  }
  return subjectString.replace(REGEXP_NON_BASIC_LATIN, removeDiacritics).replace(REGEXP_COMBINING_MARKS, removeCombiningMarks);
}

/**
 * Pads `subject` to a new `length`.
 *
 * @function pad
 * @static
 * @since 1.0.0
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to pad.
 * @param {int} [length=0] The length to pad the string. No changes are made if `length` is less than `subject.length`.
 * @param {string} [pad=' '] The string to be used for padding.
 * @return {string} Returns the padded string.
 * @example
 * v.pad('dog', 5);
 * // => ' dog '
 *
 * v.pad('bird', 6, '-');
 * // => '-bird-'
 *
 * v.pad('cat', 6, '-=');
 * // => '-cat-='
 */
function pad(subject, length, pad) {
  var subjectString = coerceToString(subject);
  var lengthInt = isNil(length) ? 0 : clipNumber(toInteger(length), 0, MAX_SAFE_INTEGER);
  var padString = coerceToString(pad, ' ');
  if (lengthInt <= subjectString.length) {
    return subjectString;
  }
  var paddingLength = lengthInt - subjectString.length;
  var paddingSideLength = toInteger(paddingLength / 2);
  var paddingSideRemainingLength = paddingLength % 2;
  return buildPadding(padString, paddingSideLength) + subjectString + buildPadding(padString, paddingSideLength + paddingSideRemainingLength);
}

/**
 * Returns a new string where the matches of `pattern` are replaced with `replacement`. <br/>
 *
 * @function replace
 * @static
 * @since 1.0.0
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to verify.
 * @param {string|RegExp} pattern The pattern which match is replaced. If `pattern` is a string,
 * a simple string match is evaluated and only the first occurrence replaced.
 * @param {string|Function} replacement The string or function which invocation result replaces `pattern` match.
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
function replace(subject, pattern, replacement) {
  var subjectString = coerceToString(subject);
  return subjectString.replace(pattern, replacement);
}

/**
 * Get the flags string from a regular expression object.
 *
 * @ignore
 * @param {RegExp} regExp The regular expression object.
 * @return {string} Returns the string with flags chars.
 */
var getRegExpFlags = function (regExp) {
  return regExp.toString().match(REGEXP_FLAGS)[0];
};

/**
 * Checks whether `subject` includes `search` starting from `position`.
 *
 * @function includes
 * @static
 * @since 1.0.0
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
var includes = function (subject, search, position) {
  var subjectString = coerceToString(subject);
  var searchString = toString(search);
  if (searchString === null) {
    return false;
  }
  if (searchString === '') {
    return true;
  }
  position = isNil(position) ? 0 : clipNumber(toInteger(position), 0, subjectString.length);
  return subjectString.indexOf(searchString, position) !== -1;
};

/**
 * Append flag to a regular expression.
 *
 * @ignore
 * @param {RegExp} pattern The pattern to coerce.
 * @param {string} appendFlag The flag to append to regular expression.
 * @return {RegExp} The regular expression with added flag.
 */
var appendFlagToRegularExpression = function (pattern, appendFlag) {
  var regularExpressionFlags = getRegExpFlags(pattern);
  if (!includes(regularExpressionFlags, appendFlag)) {
    return new RegExp(pattern.source, regularExpressionFlags + appendFlag);
  }
  return pattern;
};

/**
 * Returns a new string where all matches of `pattern` are replaced with `replacement`. <br/>
 *
 * @function replaceAll
 * @static
 * @since 1.0.0
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to verify.
 * @param {string|RegExp} pattern The pattern which match is replaced. If `pattern` is a string, a simple string match is evaluated.
 * All matches are replaced.
 * @param {string|Function} replacement The string or function which invocation result replaces `pattern` match.
 * @return {string} Returns the replacement result.
 * @example
 * v.replaceAll('good morning', 'o', '*');
 * // => 'g**d m*rning'
 * v.replaceAll('evening', \n\, 's');
 * // => 'evesisg'
 *
 */
function replaceAll(subject, pattern, replacement) {
  var subjectString = coerceToString(subject);
  var regExp = pattern;
  if (!(pattern instanceof RegExp)) {
    regExp = new RegExp(escapeRegExp(pattern), 'g');
  } else if (!pattern.global) {
    regExp = appendFlagToRegularExpression(pattern, 'g');
  }
  return subjectString.replace(regExp, replacement);
}

/**
 * Reverses the `subject`.
 *
 * @function reverse
 * @static
 * @since 1.0.0
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to reverse.
 * @return {string} Returns the reversed string.
 * @example
 * v.reverse('winter');
 * // => 'retniw'
 */
function reverse(subject) {
  var subjectString = coerceToString(subject);
  return subjectString.split('').reverse().join('');
}

/**
 * Reverses the `subject` taking care of
 * <a href="https://rainsoft.io/what-every-javascript-developer-should-know-about-unicode/#24surrogatepairs">surrogate pairs</a> and
 * <a href="https://rainsoft.io/what-every-javascript-developer-should-know-about-unicode/#25combiningmarks">combining marks</a>.
 *
 * @function reverseGrapheme
 * @static
 * @since 1.0.0
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to reverse.
 * @return {string} Returns the reversed string.
 * @example
 * v.reverseGrapheme('summer');
 * // => 'remmus'
 *
 * v.reverseGrapheme('𝌆 bar mañana mañana');
 * // => 'anañam anañam rab 𝌆'
 */
function reverseGrapheme(subject) {
  var subjectString = coerceToString(subject);
  /**
   * @see https://github.com/mathiasbynens/esrever
   */
  subjectString = subjectString.replace(REGEXP_COMBINING_MARKS, function ($0, $1, $2) {
    return reverseGrapheme($2) + $1;
  }).replace(REGEXP_SURROGATE_PAIRS, '$2$1');
  var reversedString = '';
  var index = subjectString.length;
  while (index--) {
    reversedString += subjectString.charAt(index);
  }
  return reversedString;
}

/**
 * Slugifies the `subject`. Cleans the `subject` by replacing diacritics with corresponding latin characters.
 *
 * @function slugify
 * @static
 * @since 1.0.0
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to slugify.
 * @return {string} Returns the slugified string.
 * @example
 * v.slugify('Italian cappuccino drink');
 * // => 'italian-cappuccino-drink'
 *
 * v.slugify('café latté');
 * // => 'caffe-latte'
 *
 * v.slugify('хорошая погода');
 * // => 'horoshaya-pogoda'
 */
function slugify(subject) {
  var subjectString = coerceToString(subject);
  if (subjectString === '') {
    return '';
  }
  var cleanSubjectString = latinise(subjectString).replace(REGEXP_NON_LATIN, '-');
  return kebabCase(cleanSubjectString);
}

/**
 * Changes `subject` by deleting `deleteCount` of characters starting at position `start`. Places a new string
 * `toAdd` instead of deleted characters.
 *
 * @function splice
 * @static
 * @since 1.0.0
 * @memberOf Manipulate
 * @param {string} [subject=''] The string where to insert.
 * @param {string} start The position to start changing the string. For a negative position will start from the end of
 * the string.
 * @param {number} [deleteCount=subject.length-start] The number of characters to delete from string.
 * @param {string} [toAdd=''] The string to be added instead of deleted characters.
 * @return {string} Returns the modified string.
 * @example
 * v.splice('new year', 0, 4);
 * // => 'year'
 *
 * v.splice('new year', 0, 3, 'happy');
 * // => 'happy year'
 *
 * v.splice('new year', -4, 4, 'day');
 * // => 'new day'
 */
function splice(subject, start, deleteCount, toAdd) {
  var subjectString = coerceToString(subject);
  var toAddString = coerceToString(toAdd);
  var startPosition = coerceToNumber(start);
  if (startPosition < 0) {
    startPosition = subjectString.length + startPosition;
    if (startPosition < 0) {
      startPosition = 0;
    }
  } else if (startPosition > subjectString.length) {
    startPosition = subjectString.length;
  }
  var deleteCountNumber = coerceToNumber(deleteCount, subjectString.length - startPosition);
  if (deleteCountNumber < 0) {
    deleteCountNumber = 0;
  }
  return subjectString.slice(0, startPosition) + toAddString + subjectString.slice(startPosition + deleteCountNumber);
}

/**
 * Removes whitespaces from the left part of the `subject`.
 *
 * @function trimLeft
 * @static
 * @since 1.0.0
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
function trimLeft(subject, whitespace) {
  var subjectString = coerceToString(subject);
  if (whitespace === '' || subjectString === '') {
    return subjectString;
  }
  var whitespaceString = toString(whitespace);
  if (isNil(whitespaceString)) {
    return subjectString.replace(REGEXP_TRIM_LEFT, '');
  }
  var whitespaceStringLength = whitespaceString.length;
  var matchWhitespace = true;
  var totalWhitespaceLength = 0;
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
 * Removes whitespaces from the right part of the `subject`.
 *
 * @function trimRight
 * @static
 * @since 1.0.0
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to trim.
 * @param {string} [whitespace=whitespace] The whitespace characters to trim.
 * @return {string} Returns the trimmed string.
 * @example
 * v.trimRight('the fire rises   ');
 * // => 'the fire rises'
 *
 * v.trimRight('do you feel in charge?!!!', '!');
 * // => 'do you feel in charge?'
 */
function trimRight(subject, whitespace) {
  var subjectString = coerceToString(subject);
  if (whitespace === '' || subjectString === '') {
    return subjectString;
  }
  var whitespaceString = toString(whitespace);
  if (isNil(whitespaceString)) {
    return subjectString.replace(REGEXP_TRIM_RIGHT, '');
  }
  var whitespaceStringLength = whitespaceString.length;
  var valueStringLength = subjectString.length;
  var matchWhitespace = true;
  var totalWhitespaceLength = 0;
  var position = void 0;
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
 * Removes whitespaces from left and right parts of the `subject`.
 *
 * @function trim
 * @static
 * @since 1.0.0
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
function trim(subject, whitespace) {
  var subjectString = coerceToString(subject);
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
 * Checks whether `subject` ends with `end`.
 *
 * @function endsWith
 * @static
 * @since 1.0.0
 * @memberOf Query
 * @param {string} [subject=''] The string to verify.
 * @param {string} end The ending string.
 * @param {number} [position=subject.length] Search within `subject` as if the string were only `position` long.
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
var endsWith = function (subject, end, position) {
  if (isNil(end)) {
    return false;
  }
  var subjectString = coerceToString(subject);
  var endString = coerceToString(end);
  if (endString === '') {
    return true;
  }
  position = isNil(position) ? subjectString.length : clipNumber(toInteger(position), 0, subjectString.length);
  position -= endString.length;
  var lastIndex = subjectString.indexOf(endString, position);
  return lastIndex !== -1 && lastIndex === position;
};

/**
 * Checks whether `subject` contains only alpha characters.
 *
 * @function isAlpha
 * @static
 * @since 1.0.0
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
var isAlpha = function (subject) {
  var subjectString = coerceToString(subject);
  return REGEXP_ALPHA.test(subjectString);
};

/**
 * Checks whether `subject` contains only alpha and digit characters.
 *
 * @function isAlphaDigit
 * @static
 * @since 1.0.0
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
function isAlphaDigit(subject) {
  var subjectString = coerceToString(subject);
  return REGEXP_ALPHA_DIGIT.test(subjectString);
}

/**
 * Checks whether `subject` is empty or contains only whitespaces.
 *
 * @function isBlank
 * @static
 * @since 1.0.0
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
function isBlank(subject) {
  var subjectString = coerceToString(subject);
  return subjectString.trim().length === 0;
}

/**
 * Checks whether `subject` contains only digit characters.
 *
 * @function isDigit
 * @static
 * @since 1.0.0
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
function isDigit(subject) {
  var subjectString = coerceToString(subject);
  return REGEXP_DIGIT.test(subjectString);
}

/**
 * Checks whether `subject` is empty.
 *
 * @function isEmpty
 * @static
 * @since 1.0.0
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
function isEmpty(subject) {
  var subjectString = coerceToString(subject);
  return subjectString.length === 0;
}

/**
 * Checks whether `subject` has only lower case characters.
 *
 * @function isLowerCase
 * @static
 * @since 1.0.0
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
function isLowerCase(subject) {
  var valueString = coerceToString(subject);
  return isAlpha(valueString) && valueString.toLowerCase() === valueString;
}

/**
 * Checks whether `subject` is numeric.
 *
 * @function isNumeric
 * @static
 * @since 1.0.0
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
function isNumeric(subject) {
  var valueNumeric = typeof subject === 'object' && !isNil(subject) ? Number(subject) : subject;
  return (typeof valueNumeric === 'number' || typeof valueNumeric === 'string') && !isNaN(valueNumeric - parseFloat(valueNumeric));
}

/**
 * Checks whether `subject` contains only upper case characters.
 *
 * @function isUpperCase
 * @static
 * @since 1.0.0
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
function isUpperCase(subject) {
  var subjectString = coerceToString(subject);
  return isAlpha(subjectString) && subjectString.toUpperCase() === subjectString;
}

/**
 * Checks whether `subject` matches the regular expression `pattern`.
 *
 * @function matches
 * @static
 * @since 1.0.0
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
function matches(subject, pattern, flags) {
  var subjectString = coerceToString(subject);
  var flagsString = coerceToString(flags);
  var patternString = void 0;
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
 * Checks whether `subject` starts with `start`.
 *
 * @function startsWith
 * @static
 * @since 1.0.0
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
function startsWith(subject, start, position) {
  var subjectString = coerceToString(subject);
  var startString = toString(start);
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
 * @since 1.0.0
 * @memberOf Split
 * @param {string} [subject=''] The string to split into characters.
 * @return {Array} Returns the array of characters.
 * @example
 * v.chars('cloud');
 * // => ['c', 'l', 'o', 'u', 'd']
 */
function chars(subject) {
  var subjectString = coerceToString(subject);
  return subjectString.split('');
}

/**
 * Returns an array of Unicode code point values from characters of `subject`.
 *
 * @function codePoints
 * @static
 * @since 1.0.0
 * @memberOf Split
 * @param  {string} [subject=''] The string to extract from.
 * @return {Array} Returns an array of non-negative numbers less than or equal to `0x10FFFF`.
 * @example
 * v.codePoints('rain');
 * // => [114, 97, 105, 110], or
 * //    [0x72, 0x61, 0x69, 0x6E]
 *
 * v.codePoints('\uD83D\uDE00 smile'); // or '😀 smile'
 * // => [128512, 32, 115, 109, 105, 108, 101], or
 * //    [0x1F600, 0x20, 0x73, 0x6D, 0x69, 0x6C, 0x65]
 */
function codePoints(subject) {
  var subjectString = coerceToString(subject);
  var subjectStringLength = subjectString.length;
  var codePointArray = [];
  var index = 0;
  var codePointNumber = void 0;
  while (index < subjectStringLength) {
    codePointNumber = codePointAt(subjectString, index);
    codePointArray.push(codePointNumber);
    index += codePointNumber > 0xFFFF ? 2 : 1;
  }
  return codePointArray;
}

/**
 * Splits `subject` into an array of graphemes taking care of
 * <a href="https://rainsoft.io/what-every-javascript-developer-should-know-about-unicode/#24surrogatepairs">surrogate pairs</a> and
 * <a href="https://rainsoft.io/what-every-javascript-developer-should-know-about-unicode/#25combiningmarks">combining marks</a>.
 *
 * @function graphemes
 * @static
 * @since 1.0.0
 * @memberOf Split
 * @param {string} [subject=''] The string to split into characters.
 * @return {Array} Returns the array of graphemes.
 * @example
 * v.graphemes('\uD835\uDC00\uD835\uDC01'); // or '𝐀𝐁'
 * // => ['\uD835\uDC00', '\uD835\uDC01'], or
 * //    ['𝐀', '𝐁']
 *
 * v.graphemes('cafe\u0301'); // or 'café'
 * // => ['c', 'a', 'f', 'e\u0301'], or
 * //    ['c', 'a', 'f', 'é']
 */
function graphemes(subject) {
  var subjectString = coerceToString(subject);
  return nilDefault(subjectString.match(REGEXP_UNICODE_CHARACTER), []);
}

/**
 * Splits `subject` into an array of chunks by `separator`.
 *
 * @function split
 * @static
 * @since 1.0.0
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
function split(subject, separator, limit) {
  var subjectString = coerceToString(subject);
  return subjectString.split(separator, limit);
}

var globalObject$1 = null;

function getGlobalObject() {
  if (globalObject$1 !== null) {
    return globalObject$1;
  }
  /* istanbul ignore next */
  // It's hard to mock the global variables. This code surely works fine. I hope :)
  if (typeof global === 'object' && global.Object === Object) {
    // NodeJS global object
    globalObject$1 = global;
  } else if (typeof self === 'object' && self.Object === Object) {
    // self property from Window object
    globalObject$1 = self;
  } else {
    // Other cases. Function constructor always has the context as global object
    globalObject$1 = new Function('return this')();
  }
  return globalObject$1;
}

var globalObject = getGlobalObject();
var previousV = globalObject.v;

/**
 * Restores `v` variable to previous value and returns Voca library instance.
 *
 * @function noConflict
 * @static
 * @since 1.0.0
 * @memberOf Util
 * @return {Object} Returns Voca library instance.
 * @example
 * var voca = v.noConflict();
 * voca.isAlhpa('Hello');
 * // => true
 */
function noConflict() {
  if (this === globalObject.v) {
    globalObject.v = previousV;
  }
  return this;
}

/**
 * A property that contains the library <a href="http://semver.org/">semantic version number</a>.
 * @name version
 * @static
 * @since 1.0.0
 * @memberOf Util
 * @type string
 * @example
 * v.version
 * // => '1.0.0'
 */
var version = '1.0.0';

/* eslint sort-imports: "off" */

/**
 * Functions to change the case
 * @namespace Case
 */
/**
 * Chain functions
 * @namespace Chain
 */

/**
 * Functions to cut a string
 * @namespace Chop
 */
/**
 * Functions to count characters in a string
 * @namespace Count
 */
/**
 * Functions to format
 * @namespace Format
 */
/**
 * Functions to escape RegExp special characters
 * @namespace Escape
 */
/**
 * Functions to find index
 * @namespace Index
 */
/**
 * Functions to manipulate a string
 * @namespace Manipulate
 */
/**
 * Functions to query a string
 * @namespace Query
 */
/**
 * Functions to split a string
 * @namespace Split
 */
/**
 * Util functions and properties
 * @namespace Util
 */
var functions = {
  camelCase: camelCase,
  capitalize: capitalize,
  decapitalize: decapitalize,
  kebabCase: kebabCase,
  lowerCase: lowerCase,
  snakeCase: snakeCase,
  upperCase: upperCase,

  count: count,
  countGrapheme: countGrapheme,
  countSubstring: countSubstring,
  countWhere: countWhere,

  escapeHtml: escapeHtml,
  escapeRegExp: escapeRegExp,
  unescapeHtml: unescapeHtml,

  sprintf: sprintf,
  vprintf: vprintf,

  indexOf: indexOf,
  lastIndexOf: lastIndexOf,
  search: search,

  charAt: charAt,
  codePointAt: codePointAt,
  first: first,
  graphemeAt: graphemeAt,
  last: last,
  prune: prune,
  slice: slice,
  substr: substr,
  substring: substring,
  truncate: truncate,

  insert: insert,
  latinise: latinise,
  pad: pad,
  padLeft: padLeft,
  padRight: padRight,
  repeat: repeat,
  replace: replace,
  replaceAll: replaceAll,
  reverse: reverse,
  reverseGrapheme: reverseGrapheme,
  slugify: slugify,
  splice: splice,
  trim: trim,
  trimLeft: trimLeft,
  trimRight: trimRight,

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
  codePoints: codePoints,
  graphemes: graphemes,
  split: split,
  words: words,

  noConflict: noConflict,
  version: version
};

/**
 * The chain wrapper constructor.
 *
 * @ignore
 * @param  {string}       subject               The string to be wrapped.
 * @param  {boolean}      [explicitChain=false] A boolean that indicates if the chain sequence is explicit or implicit.
 * @return {ChainWrapper}                       Returns a new instance of `ChainWrapper`
 * @constructor
 */
function ChainWrapper(subject, explicitChain) {
  this._wrappedValue = subject;
  this._explicitChain = explicitChain;
}

/**
 * Unwraps the chain sequence wrapped value.
 *
 * @memberof Chain
 * @since 1.0.0
 * @function __proto__value
 * @return {*} Returns the unwrapped value.
 * @example
 * v
 *  .chain('Hello world')
 *  .replace('Hello', 'Hi')
 *  .lowerCase()
 *  .slugify()
 *  .value()
 * // => 'hi-world'
 *
 * v(' Space travel ')
 *  .trim()
 *  .truncate(8)
 *  .value()
 * // => 'Space...'
 */
ChainWrapper.prototype.value = function () {
  return this._wrappedValue;
};

/**
 * Override the default object valueOf().
 *
 * @ignore
 * @return {*} Returns the wrapped value.
 */
ChainWrapper.prototype.valueOf = function () {
  return this.value();
};

/**
 * Returns the wrapped value to be used in JSON.stringify().
 *
 * @ignore
 * @return {*} Returns the wrapped value.
 */
ChainWrapper.prototype.toJSON = function () {
  return this.value();
};

/**
 * Returns the string representation of the wrapped value.
 *
 * @ignore
 * @return {string} Returns the string representation.
 */
ChainWrapper.prototype.toString = function () {
  return String(this.value());
};

/**
 * Creates a new chain object that enables <i>explicit</i> chain sequences.
 * Use `v.prototype.value()` to unwrap the result. <br/>
 * Does not modify the wrapped value.
 *
 * @memberof Chain
 * @since 1.0.0
 * @function __proto__chain
 * @return {Object} Returns the wrapper in <i>explicit</i> mode.
 * @example
 * v('Back to School')
 *  .chain()
 *  .lowerCase()
 *  .words()
 *  .value()
 * // => ['back', 'to', 'school']
 *
 * v(" Back to School ")
 *  .chain()
 *  .trim()
 *  .truncate(7)
 *  .value()
 * // => 'Back...'
 */
ChainWrapper.prototype.chain = function () {
  return new ChainWrapper(this._wrappedValue, true);
};

/**
 * Modifies the wrapped value with the invocation result of `changer` function. The current wrapped value is the
 * argument of `changer` invocation.
 *
 * @memberof Chain
 * @since 1.0.0
 * @function __proto__thru
 * @param  {Function} changer The function to invoke.
 * @return {Object}           Returns the new wrapper that wraps the invocation result of `changer`.
 * @example
 * v
 *  .chain('sun is shining')
 *  .words()
 *  .thru(function(words) {
 *    return words[0];
 *  })
 *  .value()
 * // => 'sun'
 *
 */
ChainWrapper.prototype.thru = function (changer) {
  if (typeof changer === 'function') {
    return new ChainWrapper(changer(this._wrappedValue), this._explicitChain);
  }
  return this;
};

/**
 * A boolean that indicates if the chain sequence is explicit or implicit.
 * @ignore
 * @type {boolean}
 * @private
 */
ChainWrapper.prototype._explicitChain = true;

/**
 * Make a voca function chainable.
 *
 * @ignore
 * @param  {Function} functionInstance The function to make chainable
 * @return {Function}                  Returns the chainable function
 */
function makeFunctionChainable(functionInstance) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var result = functionInstance.apply(undefined, [this._wrappedValue].concat(args));
    if (this._explicitChain || typeof result === 'string') {
      return new ChainWrapper(result, this._explicitChain);
    } else {
      return result;
    }
  };
}

Object.keys(functions).forEach(function (name) {
  ChainWrapper.prototype[name] = makeFunctionChainable(functions[name]);
});

/**
 * Creates a chain object that wraps `subject`, enabling <i>explicit</i> chain sequences. <br/>
 * Use `v.prototype.value()` to unwrap the result.
 *
 * @memberOf Chain
 * @since 1.0.0
 * @function chain
 * @param  {string} subject The string to wrap.
 * @return {Object}         Returns the new wrapper object.
 * @example
 * v
 *  .chain('Back to School')
 *  .lowerCase()
 *  .words()
 *  .value()
 * // => ['back', 'to', 'school']
 */
function chain(subject) {
  return new ChainWrapper(subject, true);
}

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * Creates a chain object that wraps `subject`, enabling <i>implicit</i> chain sequences.<br/>
 * A function that returns `number`, `boolean` or `array` type <i>terminates</i> the chain sequence and returns the unwrapped value.
 * Otherwise use `v.prototype.value()` to unwrap the result.
 *
 * @memberOf Chain
 * @since 1.0.0
 * @function v
 * @param {string} subject The string to wrap.
 * @return {Object}  Returns the new wrapper object.
 * @example
 * v('Back to School')
 *  .lowerCase()
 *  .words()
 * // => ['back', 'to', 'school']
 *
 * v(" Back to School ")
 *  .trim()
 *  .truncate(7)
 *  .value()
 * // => 'Back...'
 */
function Voca(subject) {
  return new ChainWrapper(subject, false);
}

_extends(Voca, functions, {
  chain: chain
});

return Voca;

})));
